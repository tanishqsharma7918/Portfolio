"use client"

import { useEffect, useState } from "react"

/**
 * Returns false on the server and on the first client render, so markup
 * matches during hydration and only then adapts.
 */
export function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const mql = window.matchMedia(query)
        const onChange = () => setMatches(mql.matches)
        onChange()
        mql.addEventListener("change", onChange)
        return () => mql.removeEventListener("change", onChange)
    }, [query])

    return matches
}
