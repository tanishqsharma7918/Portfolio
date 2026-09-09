"use client"

import { useEffect, useRef } from "react"

/* ------------------------------------------------------------------ */
/*  Tunables                                                           */
/* ------------------------------------------------------------------ */
const ARMS = 3
const ARM_TWIST = 3.1          // how tightly the spiral winds
const ARM_SCATTER = 0.29       // how loosely stars hug their arm
const DISK_THICKNESS = 0.07
const FOV = 1.35
const BASE_ROTATION = 0.046    // radians / second at the rim
const ALPHA_STEPS = 18

type Star = {
    r: number          // normalised radius 0..1
    a: number          // base angle
    z: number          // height above the disk
    size: number
    lum: number        // base luminance 0..1
    tw: number         // twinkle phase
    twSpeed: number
    tint: 0 | 1 | 2 | 3 // 0 = star, 1 = violet, 2 = cyan, 3 = gold
    // pointer displacement, springs back to zero
    dx: number
    dy: number
}

type Nebula = {
    x: number
    y: number
    r: number
    tint: 0 | 1
    drift: number
    phase: number
}

type Shooter = {
    x: number
    y: number
    vx: number
    vy: number
    life: number
    max: number
}

function readToken(styles: CSSStyleDeclaration, name: string, fallback: string) {
    const v = styles.getPropertyValue(name).trim()
    return v || fallback
}

export function Galaxy() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        const el = canvasRef.current
        if (!el) return
        const context = el.getContext("2d", { alpha: true })
        if (!context) return

        // Aliased to plain consts so the null checks above hold inside every
        // closure below without a forest of non-null assertions.
        const cv = el
        const ctx = context

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

        let width = 0
        let height = 0
        let dpr = 1
        let spread = 1
        let stars: Star[] = []
        let nebulae: Nebula[] = []
        let shooters: Shooter[] = []
        let raf = 0
        let running = true

        /* -------------------------------------------------------- */
        /*  Colour palette, re-read whenever the theme flips          */
        /* -------------------------------------------------------- */
        let palette: string[][] = []
        let glowSprites: HTMLCanvasElement[] = []
        let coreColor = "255 255 255"
        let nebulaColors = ["139 92 246", "34 211 238"]
        let nebulaStrength = 0.24
        let isDark = true

        function buildPalette() {
            const styles = getComputedStyle(document.documentElement)
            isDark = document.documentElement.classList.contains("dark")
            const star = readToken(styles, "--star", "255 255 255")
            const na = readToken(styles, "--nebula-a", "139 92 246")
            const nb = readToken(styles, "--nebula-b", "34 211 238")
            nebulaStrength = parseFloat(readToken(styles, "--nebula-strength", "0.24"))
            coreColor = star
            nebulaColors = [na, nb]

            const gold = readToken(styles, "--gold", "228 207 168")
            const tints = [star, na, nb, gold]
            palette = tints.map((rgb) => {
                const row: string[] = []
                for (let i = 0; i <= ALPHA_STEPS; i++) {
                    row.push(`rgba(${rgb.split(" ").join(",")},${(i / ALPHA_STEPS).toFixed(3)})`)
                }
                return row
            })

            // Pre-rendered bokeh discs. Blitting a cached sprite is far
            // cheaper than building a radial gradient per star per frame,
            // and it is what gives the near field a sense of focus.
            const SPRITE = 64
            glowSprites = tints.map((rgb) => {
                const c = document.createElement("canvas")
                c.width = SPRITE
                c.height = SPRITE
                const g2 = c.getContext("2d")
                if (!g2) return c
                const half = SPRITE / 2
                const grad = g2.createRadialGradient(half, half, 0, half, half, half)
                const csv = rgb.split(" ").join(",")
                grad.addColorStop(0, `rgba(${csv},0.85)`)
                grad.addColorStop(0.28, `rgba(${csv},0.34)`)
                grad.addColorStop(0.62, `rgba(${csv},0.08)`)
                grad.addColorStop(1, `rgba(${csv},0)`)
                g2.fillStyle = grad
                g2.fillRect(0, 0, SPRITE, SPRITE)
                return c
            })
        }

        /* -------------------------------------------------------- */
        /*  Population                                                */
        /* -------------------------------------------------------- */
        function gauss() {
            // Box–Muller, clipped — gives arms soft, believable edges
            let u = 0
            let v = 0
            while (u === 0) u = Math.random()
            while (v === 0) v = Math.random()
            return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
        }

        function populate() {
            const area = width * height
            // Scale the field with the viewport, but keep phones honest.
            const target = Math.round(Math.min(3600, Math.max(650, area / 620)))
            stars = new Array(target)

            for (let i = 0; i < target; i++) {
                // Bias toward the outside so the core does not clog up
                const r = Math.pow(Math.random(), 0.62)
                const arm = Math.floor(Math.random() * ARMS)
                const armAngle = (arm / ARMS) * Math.PI * 2
                const scatter = gauss() * ARM_SCATTER * (0.35 + r)
                const a = armAngle + r * ARM_TWIST * Math.PI + scatter

                // 12% of stars live outside the arms as halo dust
                const halo = Math.random() < 0.12

                const tintRoll = Math.random()
                const tint: 0 | 1 | 2 | 3 =
                    tintRoll > 0.955 ? 1 : tintRoll > 0.9 ? 2 : tintRoll > 0.86 ? 3 : 0

                // Stars sitting on an arm's spine read brighter than the ones
                // scattered off it, which is what makes the arms legible.
                const spine = 1 - Math.min(1, Math.abs(scatter) / (ARM_SCATTER * 1.6))

                stars[i] = {
                    r: halo ? 0.35 + Math.random() * 0.85 : r,
                    a: halo ? Math.random() * Math.PI * 2 : a,
                    z: gauss() * DISK_THICKNESS * (halo ? 2.4 : 1),
                    size: 0.5 + Math.pow(Math.random(), 2.2) * 2.3,
                    lum: (0.4 + Math.random() * 0.5) * (halo ? 0.8 : 1 + spine * 0.45),
                    tw: Math.random() * Math.PI * 2,
                    twSpeed: 0.4 + Math.random() * 1.5,
                    tint,
                    dx: 0,
                    dy: 0,
                }
            }

            nebulae = [
                { x: -0.22, y: -0.12, r: 0.62, tint: 0, drift: 0.06, phase: 0 },
                { x: 0.3, y: 0.18, r: 0.55, tint: 1, drift: 0.045, phase: 2.1 },
                { x: 0.05, y: -0.32, r: 0.44, tint: 0, drift: 0.075, phase: 4.4 },
            ]
        }

        /* -------------------------------------------------------- */
        /*  Sizing                                                    */
        /* -------------------------------------------------------- */
        function resize() {
            dpr = Math.min(window.devicePixelRatio || 1, 2)
            width = window.innerWidth
            height = window.innerHeight
            cv.width = Math.floor(width * dpr)
            cv.height = Math.floor(height * dpr)
            cv.style.width = `${width}px`
            cv.style.height = `${height}px`
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            // The disk should overflow the viewport so there is no visible rim
            spread = Math.hypot(width, height) * 0.66
            maxScroll = Math.max(1, document.documentElement.scrollHeight - height)
            populate()
        }

        /* -------------------------------------------------------- */
        /*  Pointer + scroll state (all spring-smoothed)              */
        /* -------------------------------------------------------- */
        const pointer = { x: 0, y: 0, hasMoved: false }
        const eased = { x: 0, y: 0, scroll: 0 }
        let targetScroll = 0
        let maxScroll = 1

        function onPointerMove(e: PointerEvent) {
            pointer.x = (e.clientX / width) * 2 - 1
            pointer.y = (e.clientY / height) * 2 - 1
            pointer.hasMoved = true
        }
        function onPointerLeave() {
            pointer.x = 0
            pointer.y = 0
        }
        function onScroll() {
            targetScroll = window.scrollY || 0
            // Cached here rather than per-frame: the read is cheap during a
            // scroll (layout is already clean) and free of thrash.
            maxScroll = Math.max(1, document.documentElement.scrollHeight - height)
        }

        /* -------------------------------------------------------- */
        /*  Frame                                                     */
        /* -------------------------------------------------------- */
        let last = performance.now()
        let elapsed = 0

        // Fixed-size scratch buffer, written in place each frame so the
        // animation loop never allocates.
        const GLOW_LIMIT = 130
        const glowBuf = Array.from({ length: GLOW_LIMIT }, () => ({
            x: 0,
            y: 0,
            r: 0,
            a: 0,
            tint: 0 as 0 | 1 | 2 | 3,
        }))

        function drawNebulae(t: number) {
            const cx = width / 2
            const cy = height / 2
            const prev = ctx.globalCompositeOperation
            ctx.globalCompositeOperation = isDark ? "lighter" : "source-over"

            for (const n of nebulae) {
                const wobbleX = Math.cos(t * n.drift + n.phase) * 0.06
                const wobbleY = Math.sin(t * n.drift * 1.3 + n.phase) * 0.05
                const x = cx + (n.x + wobbleX) * width
                const y = cy + (n.y + wobbleY) * height
                const radius = n.r * Math.max(width, height) * 0.62

                const g = ctx.createRadialGradient(x, y, 0, x, y, radius)
                const rgb = nebulaColors[n.tint].split(" ").join(",")
                g.addColorStop(0, `rgba(${rgb},${nebulaStrength})`)
                g.addColorStop(0.45, `rgba(${rgb},${nebulaStrength * 0.34})`)
                g.addColorStop(1, `rgba(${rgb},0)`)
                ctx.fillStyle = g
                ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2)
            }

            ctx.globalCompositeOperation = prev
        }

        function drawCore(t: number) {
            const cx = width / 2
            const cy = height / 2 - height * 0.04
            const pulse = 1 + Math.sin(t * 0.4) * 0.06
            const radius = Math.min(width, height) * 0.34 * pulse
            const rgb = coreColor.split(" ").join(",")
            const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
            const peak = isDark ? 0.19 : 0.06
            g.addColorStop(0, `rgba(${rgb},${peak})`)
            g.addColorStop(0.35, `rgba(${rgb},${peak * 0.32})`)
            g.addColorStop(1, `rgba(${rgb},0)`)
            const prev = ctx.globalCompositeOperation
            ctx.globalCompositeOperation = isDark ? "lighter" : "source-over"
            ctx.fillStyle = g
            ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2)
            ctx.globalCompositeOperation = prev
        }

        function spawnShooter() {
            const fromLeft = Math.random() > 0.5
            const speed = 620 + Math.random() * 420
            const angle = (fromLeft ? 0.32 : Math.PI - 0.32) + (Math.random() - 0.5) * 0.22
            shooters.push({
                x: fromLeft ? -60 : width + 60,
                y: Math.random() * height * 0.55,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 0,
                max: 1.1 + Math.random() * 0.5,
            })
        }

        function drawShooters(dt: number) {
            if (!shooters.length) return
            const rgb = coreColor.split(" ").join(",")
            const prev = ctx.globalCompositeOperation
            ctx.globalCompositeOperation = isDark ? "lighter" : "source-over"

            for (let i = shooters.length - 1; i >= 0; i--) {
                const s = shooters[i]
                s.life += dt
                s.x += s.vx * dt
                s.y += s.vy * dt
                if (s.life > s.max) {
                    shooters.splice(i, 1)
                    continue
                }
                const p = s.life / s.max
                const fade = Math.sin(p * Math.PI)
                const tailX = s.x - s.vx * 0.085
                const tailY = s.y - s.vy * 0.085
                const g = ctx.createLinearGradient(s.x, s.y, tailX, tailY)
                g.addColorStop(0, `rgba(${rgb},${0.75 * fade})`)
                g.addColorStop(1, `rgba(${rgb},0)`)
                ctx.strokeStyle = g
                ctx.lineWidth = 1.6
                ctx.lineCap = "round"
                ctx.beginPath()
                ctx.moveTo(s.x, s.y)
                ctx.lineTo(tailX, tailY)
                ctx.stroke()
            }
            ctx.globalCompositeOperation = prev
        }

        function frame(now: number) {
            raf = requestAnimationFrame(frame)
            if (!running) return

            const dt = Math.min((now - last) / 1000, 0.05)
            last = now
            elapsed += reduced ? 0 : dt

            // Springs — nothing in this scene ever snaps
            eased.x += (pointer.x - eased.x) * Math.min(1, dt * 2.4)
            eased.y += (pointer.y - eased.y) * Math.min(1, dt * 2.4)
            eased.scroll += (targetScroll - eased.scroll) * Math.min(1, dt * 3.2)

            ctx.clearRect(0, 0, width, height)
            drawNebulae(elapsed)
            drawCore(elapsed)

            const cx = width / 2
            // Scrolling flies the camera through the field rather than
            // sliding a flat image — the parallax is what sells the depth.
            // Normalised against the whole document so the journey lasts
            // exactly one page, however long the page happens to be.
            const progress = Math.min(1, Math.max(0, eased.scroll / maxScroll))
            const cy = height / 2 - height * 0.04 + progress * height * 0.14

            const yaw = eased.x * 0.44 + progress * 0.36
            const tilt = 0.96 + eased.y * 0.27 - progress * 0.42
            const sinYaw = Math.sin(yaw)
            const cosYaw = Math.cos(yaw)
            const sinTilt = Math.sin(tilt)
            const cosTilt = Math.cos(tilt)

            // Camera dolly: descends toward the disk as the page advances,
            // so the field opens up rather than draining away.
            const camZ = 2.02 - progress * 0.88

            const px = pointer.hasMoved ? (eased.x * 0.5 + 0.5) * width : -9999
            const py = pointer.hasMoved ? (eased.y * 0.5 + 0.5) * height : -9999
            const repelRadius = 152
            const repelRadiusSq = repelRadius * repelRadius

            let lastStyle = ""
            // Near, bright stars are collected and blitted as soft discs after
            // the main pass, so the foreground falls out of focus the way a
            // fast lens would render it.
            let glowCount = 0

            for (let i = 0; i < stars.length; i++) {
                const s = stars[i]

                // Differential rotation — inner stars orbit faster, exactly
                // like a real disk. This is what stops it looking like a
                // spinning JPEG.
                const omega = BASE_ROTATION / Math.max(0.16, Math.sqrt(s.r))
                const a = s.a + elapsed * omega

                const x0 = Math.cos(a) * s.r
                const y0 = Math.sin(a) * s.r
                const z0 = s.z

                // yaw about Y
                const x1 = x0 * cosYaw + z0 * sinYaw
                const z1 = -x0 * sinYaw + z0 * cosYaw
                // tilt about X
                const y2 = y0 * cosTilt - z1 * sinTilt
                const z2 = y0 * sinTilt + z1 * cosTilt

                const depth = z2 + camZ
                if (depth <= 0.05) continue

                const persp = FOV / depth
                let sx = cx + x1 * persp * spread
                let sy = cy + y2 * persp * spread

                // Pointer repulsion with a spring back to rest
                if (pointer.hasMoved) {
                    const ddx = sx - px
                    const ddy = sy - py
                    const distSq = ddx * ddx + ddy * ddy
                    if (distSq < repelRadiusSq && distSq > 0.01) {
                        const dist = Math.sqrt(distSq)
                        const force = (1 - dist / repelRadius) ** 2 * 42
                        s.dx += (ddx / dist) * force * dt * 6
                        s.dy += (ddy / dist) * force * dt * 6
                    }
                }
                s.dx *= 1 - Math.min(1, dt * 3)
                s.dy *= 1 - Math.min(1, dt * 3)
                sx += s.dx
                sy += s.dy

                const size = s.size * persp * 0.86
                if (sx < -40 || sx > width + 40 || sy < -40 || sy > height + 40 || size < 0.12) continue

                // Depth fade keeps far stars from flattening the image
                const depthFade = Math.min(1, (3.1 - depth) / 1.7)
                if (depthFade <= 0) continue

                const twinkle = 0.72 + Math.sin(elapsed * s.twSpeed + s.tw) * 0.28
                let alpha = s.lum * twinkle * depthFade
                if (!isDark) alpha = Math.min(1, alpha * 1.22)
                if (alpha <= 0.02) continue

                const step = Math.min(ALPHA_STEPS, Math.max(0, Math.round(alpha * ALPHA_STEPS)))
                const style = palette[s.tint][step]
                if (style !== lastStyle) {
                    ctx.fillStyle = style
                    lastStyle = style
                }

                if (size < 1.4) {
                    // fillRect is markedly cheaper than arc() and at this
                    // size the difference is invisible
                    ctx.fillRect(sx, sy, size, size)
                } else {
                    ctx.beginPath()
                    ctx.arc(sx, sy, size * 0.5, 0, Math.PI * 2)
                    ctx.fill()
                }

                if (glowCount < GLOW_LIMIT && size > 1.75 && depth < 1.85) {
                    const g = glowBuf[glowCount++]
                    g.x = sx
                    g.y = sy
                    // Closer stars bloom wider — that gradient of blur across
                    // depth is the whole point.
                    g.r = size * (2.6 + (1.85 - depth) * 3.4)
                    g.a = alpha * (isDark ? 0.5 : 0.26) * Math.min(1, (1.85 - depth) / 0.9)
                    g.tint = s.tint
                }
            }

            if (glowCount) {
                const prevOp = ctx.globalCompositeOperation
                ctx.globalCompositeOperation = isDark ? "lighter" : "source-over"
                for (let i = 0; i < glowCount; i++) {
                    const g = glowBuf[i]
                    if (g.a <= 0.01) continue
                    ctx.globalAlpha = g.a
                    ctx.drawImage(glowSprites[g.tint], g.x - g.r, g.y - g.r, g.r * 2, g.r * 2)
                }
                ctx.globalAlpha = 1
                ctx.globalCompositeOperation = prevOp
            }

            if (!reduced) {
                if (Math.random() < dt * 0.14) spawnShooter()
                drawShooters(dt)
            }
        }

        /* -------------------------------------------------------- */
        /*  Wiring                                                    */
        /* -------------------------------------------------------- */
        function onVisibility() {
            running = !document.hidden
            if (running) last = performance.now()
        }

        const themeObserver = new MutationObserver(buildPalette)
        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class", "style"],
        })

        buildPalette()
        resize()
        onScroll()

        window.addEventListener("resize", resize)
        window.addEventListener("scroll", onScroll, { passive: true })
        window.addEventListener("pointermove", onPointerMove, { passive: true })
        window.addEventListener("pointerleave", onPointerLeave)
        document.addEventListener("visibilitychange", onVisibility)

        raf = requestAnimationFrame(frame)

        return () => {
            cancelAnimationFrame(raf)
            themeObserver.disconnect()
            window.removeEventListener("resize", resize)
            window.removeEventListener("scroll", onScroll)
            window.removeEventListener("pointermove", onPointerMove)
            window.removeEventListener("pointerleave", onPointerLeave)
            document.removeEventListener("visibilitychange", onVisibility)
        }
    }, [])

    return (
        <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
            <canvas ref={canvasRef} className="block h-full w-full" />
            {/* Vignette: pulls the eye to the centre and keeps text legible */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(140% 105% at 50% 42%, transparent 48%, rgb(var(--bg) / var(--vignette-mid)) 78%, rgb(var(--bg) / var(--vignette-edge)) 100%)",
                }}
            />
        </div>
    )
}
