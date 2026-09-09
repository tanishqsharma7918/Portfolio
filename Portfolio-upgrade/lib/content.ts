export const profile = {
    name: "Tanishq Sharma",
    firstName: "Tanishq",
    lastName: "Sharma",
    role: "Machine Learning Engineer",
    roles: [
        "LLM & Agentic Systems",
        "Text-to-SQL Engines",
        "RAG & Vector Retrieval",
        "Production AI Platforms",
    ],
    tagline: "AI systems that answer in one second, not thirty.",
    // Longer form, used for search engines and link previews only
    metaDescription:
        "Machine Learning Engineer building production LLM systems — agentic pipelines, text-to-SQL engines and retrieval that hold up under real traffic and real cost.",
    location: "Lucknow, Uttar Pradesh, India",
    shortLocation: "Lucknow, India",
    timezone: "Asia/Kolkata",
    email: "tanishq.career@gmail.com",
    phone: "+91 92644 36795",
    github: "https://github.com/tanishqsharma7918",
    linkedin: "https://www.linkedin.com/in/tanishq-sharma-/",
    photo: "/profile.jpg",
    status: "Open to new roles",
}

export const loader = {
    /** Echoes the hero tagline, so the intro sets up the line the hero pays off. */
    lines: ["Systems that", "answer"],
    /** Cycled beneath the counter while the page loads. */
    disciplines: [
        "LLM orchestration",
        "Retrieval & vector search",
        "Text-to-SQL engines",
        "Production services",
    ],
}

export const intro = {
    lines: [
        "I build machine learning systems that have to answer correctly, quickly, and at a cost someone is willing to pay.",
        "At Culinda I lead two AI platforms that let people query eleven database systems in plain English — FastAPI services with GPT-4o and Claude behind a provider-agnostic orchestration layer, semantic caching, and a validation layer that refuses to run anything destructive.",
        "Before that, an MSc in Business Analytics at Birmingham and a Computer Science degree, then analytics and data engineering across consulting, workforce reporting and healthcare in the UK and India.",
    ],
}

export type Stat = {
    value: number
    prefix?: string
    suffix: string
    label: string
    note: string
}

export const stats: Stat[] = [
    { value: 30, suffix: "×", label: "Faster query response", note: "30s → 1s via three-layer semantic caching" },
    { value: 95, suffix: "%", label: "Smaller prompts", note: "80K+ → ~4K tokens per query" },
    { value: 11, suffix: "+", label: "Database systems", note: "queried in plain English through one engine" },
    { value: 90, suffix: "%", label: "Manual review removed", note: "80K+ support tickets classified automatically" },
]

export type Project = {
    id: string
    index: string
    title: string
    subtitle: string
    year: string
    summary: string
    highlights: string[]
    stack: string[]
    metrics: { value: string; label: string }[]
    repo?: string
    live?: string
    /** Shown in place of a repo button when the source is not public. */
    linkNote?: string
    accent: string
}

export const projects: Project[] = [
    {
        id: "agentic-rag",
        index: "01",
        title: "Agentic RAG System",
        subtitle: "Multi-tool orchestration across fragmented data",
        year: "2025",
        summary:
            "A retrieval system that plans its own multi-step workflows across trade-lifecycle data spread over disconnected systems, instead of expecting one clean source of truth.",
        highlights: [
            "Architected an agentic RAG pipeline on FAISS, LangGraph, Redis and AWS, coordinating multi-step workflows across fragmented trade-lifecycle systems.",
            "Implemented multi-tool orchestration so the agent selects and sequences the right retrieval and computation tools per question.",
            "Validated high-volume SQL transactions in the loop, improving data consistency and cutting reconciliation time per transaction by over 40%.",
            "Used Redis as a shared working memory across steps, keeping intermediate state out of the prompt window.",
        ],
        stack: ["Python", "LangGraph", "FAISS", "Redis", "AWS", "SQL"],
        linkNote: "Built under NDA — source not public",
        metrics: [
            { value: "40%", label: "Less reconciliation time" },
            { value: "Multi", label: "Step orchestration" },
            { value: "High", label: "Transaction volume" },
        ],
        accent: "139 92 246",
    },
    {
        id: "ai-daily-digest",
        index: "02",
        title: "AI Daily Digest",
        subtitle: "Hunter Bot — autonomous briefing pipeline",
        year: "2025",
        summary:
            "An end-to-end pipeline that collects the day's AI and technology reporting, reads it, and delivers a structured briefing by email without anyone curating it.",
        highlights: [
            "Built the full pipeline: RSS ingestion, BeautifulSoup scraping, GPT-4o-mini summarisation and SendGrid delivery.",
            "Designed modular agent workflows so scraping, LLM processing, validation and delivery are separate, testable stages rather than one script.",
            "Handles blocked and malformed sources without failing the run, so the briefing arrives whether or not every source cooperates.",
            "Secrets are supplied through environment variables, keeping credentials out of the codebase and safe for CI/CD.",
        ],
        stack: ["Python", "GPT-4o-mini", "BeautifulSoup", "SendGrid", "LangChain"],
        metrics: [
            { value: "8", label: "Live sources" },
            { value: "Daily", label: "Unattended runs" },
            { value: "0", label: "Manual curation" },
        ],
        repo: "https://github.com/tanishqsharma7918/AI-Daily-Digest",
        accent: "34 211 238",
    },
    {
        id: "competitor-analysis-engine",
        index: "03",
        title: "Competitor Analysis Engine",
        subtitle: "Market intelligence without the consulting invoice",
        year: "2025",
        summary:
            "A multi-stage LLM pipeline that turns three to five days of manual competitor research into a briefing in under ten minutes — live web research, feature extraction, and exports people can actually circulate.",
        highlights: [
            "Modular multi-agent pipeline — Hunter, Categorizer, Analyst, Reporter — built on async Python with four GPT-4o stages.",
            "Finds 15–24 competitors per run across market leaders, niche players, emerging startups and open-source alternatives.",
            "Search fallback logic improved data quality by 50% and discovery output by 70% when primary results came back thin.",
            "Response caching cut API spend by roughly 60%, landing full reports at $0.01–0.05 each.",
            "Exports multi-sheet Excel workbooks and formatted PowerPoint decks for offline review.",
        ],
        stack: ["Python", "GPT-4o", "Streamlit", "Plotly", "Pandas", "OpenPyXL"],
        metrics: [
            { value: "95%", label: "Time saved" },
            { value: "99%", label: "Cost reduction" },
            { value: "50+", label: "Features tracked" },
        ],
        repo: "https://github.com/tanishqsharma7918/Competitor-Analysis-Engine",
        live: "https://competitor-analysis-engine.streamlit.app/",
        accent: "228 207 168",
    },
    {
        id: "rag-mcp-chatbot",
        index: "04",
        title: "RAG-MCP Chatbot",
        subtitle: "Grounded answers for ML and data engineering",
        year: "2025",
        summary:
            "An assistant that answers machine learning and data engineering questions from retrieved context rather than from confident guessing.",
        highlights: [
            "Multi-agent retrieval architecture orchestrated with LangGraph over FAISS vector stores.",
            "Modular pipelines for document chunking, semantic search and context-memory management across turns.",
            "Streamlit interface supporting multi-turn conversation with visible API response tracing.",
        ],
        stack: ["Python", "LangGraph", "FAISS", "OpenAI", "Streamlit"],
        metrics: [
            { value: "Multi", label: "Turn context" },
            { value: "Cited", label: "Grounded recall" },
            { value: "Live", label: "Response tracing" },
        ],
        repo: "https://github.com/tanishqsharma7918/RAG-MCP-chatbot",
        accent: "56 189 248",
    },
    {
        id: "nhs-dashboards",
        index: "05",
        title: "NHS Dashboard Suite",
        subtitle: "Two audiences, one data model",
        year: "2024",
        summary:
            "NHS and UK Government sources blended into two dashboards: an operational view of hospital patient care activity, and a public view of mental health in England.",
        highlights: [
            "Cleaned and joined NHS with UK Government datasets across Excel, Power BI and Tableau Prep.",
            "Operational view tracks admissions by specialty, length of stay and waiting times for service directors.",
            "Public view presents age- and gender-specific prevalence for a non-technical audience.",
            "Consistent visual grammar, filters and tooltips throughout; published to Tableau Public.",
        ],
        stack: ["Tableau", "Power BI", "Advanced Excel"],
        linkNote: "Dashboards published to Tableau Public",
        metrics: [
            { value: "2", label: "Audiences" },
            { value: "25%", label: "Accuracy gain" },
            { value: "Public", label: "Published" },
        ],
        accent: "244 114 182",
    },
]

export type Experience = {
    role: string
    company: string
    location: string
    period: string
    current?: boolean
    points: string[]
    tags: string[]
}

export const experience: Experience[] = [
    {
        role: "Machine Learning Engineer",
        company: "Culinda Inc.",
        location: "Hyderabad, India",
        period: "Jan 2026 — Present",
        current: true,
        points: [
            "Lead development of two enterprise AI platforms, MagixDB and Nighthawk, providing text-to-SQL and natural language querying across 11+ database systems on FastAPI with GPT-4o and Claude.",
            "Built an orchestration layer that switches between OpenAI and Anthropic models through environment configuration alone, so provider changes need no code changes.",
            "Designed a three-layer semantic cache — in-memory, Redis, then PostgreSQL with pgvector — matching at 0.85 cosine similarity. Query latency fell from 30 seconds to 1 second and LLM calls dropped from 10–11 per request to 1–2.",
            "Built a five-agent pipeline that answers questions across structured MySQL and unstructured MongoDB data, routing through multi-call classifiers and generating Plotly visualisations from the result.",
            "Added Weaviate-backed semantic table selection to narrow schema scope from 120+ tables to the 5–10 relevant to each query, cutting prompt size from 80K+ tokens to roughly 4K.",
            "Hardened the system with Tenacity retries, circuit breakers, regex-based PII detection, and a SQL validation layer that blocks DROP, DELETE, INSERT and UPDATE from ever reaching a database.",
        ],
        tags: ["FastAPI", "GPT-4o", "Claude", "Weaviate", "pgvector", "Redis", "sqlglot"],
    },
    {
        role: "Data Analyst Intern",
        company: "Unified Mentors",
        location: "Noida, India",
        period: "Oct 2025 — Dec 2025",
        points: [
            "Engineered SQL and PySpark pipelines over large structured datasets, improving data refresh efficiency by 22% and shortening the path to downstream analysis.",
            "Developed Python anomaly-detection models and automated validation workflows to catch inconsistencies before they reached production pipelines.",
            "Deployed automated data quality frameworks that kept accuracy consistent across analytics workflows.",
        ],
        tags: ["PySpark", "SQL", "Python", "Data quality"],
    },
    {
        role: "Data Analyst Intern — Reporting & Workforce Insights",
        company: "Victoria Solutions",
        location: "Birmingham, United Kingdom",
        period: "Jul 2025 — Aug 2025",
        points: [
            "Built SQL-driven Tableau dashboards tracking workforce and marketing KPIs, shortening decision cycles by 30% and giving stakeholders a clearer view of operational performance.",
            "Developed predictive models in XGBoost and advanced SQL that improved sales forecasting accuracy by 50%, plus churn models over 500K+ records targeting an 18% reduction.",
            "Automated reporting workflows and built spaCy and LDA pipelines to analyse 80K+ customer support tickets, cutting manual analysis effort by up to 90%.",
        ],
        tags: ["Tableau", "XGBoost", "spaCy", "SQL", "NLP"],
    },
    {
        role: "Data Engineer (Contract)",
        company: "Blackmont Consulting",
        location: "Birmingham, United Kingdom",
        period: "Jan 2025 — Jun 2025",
        points: [
            "Optimised SQL forecasting and time-series models supporting multi-region operational planning, improving resource and capacity utilisation by 40%.",
            "Designed and standardised data reconciliation and reporting workflows, improving governance, consistency and reliability across enterprise analytics pipelines.",
        ],
        tags: ["SQL", "Time series", "Data governance"],
    },
]

export const education = [
    {
        degree: "MSc Business Analytics",
        school: "University of Birmingham",
        period: "2024",
        grade: "Merit",
        modules: "Data Management Strategies, Predictive Modelling, Supply Chain & Logistics",
    },
    {
        degree: "BTech Computer Science & Engineering",
        school: "Guru Gobind Singh Indraprastha University",
        period: "2022",
        grade: "Distinction",
        modules: "Statistical Methods in Computing, Machine Learning, Algorithms & Data Structures",
    },
]

export const certifications = [
    { name: "Building with the Claude API", issuer: "Anthropic", date: "Mar 2026" },
    { name: "Introduction to Model Context Protocol", issuer: "Anthropic", date: "Mar 2026" },
    { name: "Introduction to Agent Skills", issuer: "Anthropic", date: "Mar 2026" },
    { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", date: "Apr 2025" },
]

export const skillGroups = [
    {
        title: "LLM & agent systems",
        blurb: "Model routing, tool orchestration and the caching that keeps inference affordable.",
        items: [
            "OpenAI GPT-4o", "Claude Sonnet", "Gemini 2.5 Flash", "LangChain", "LangGraph",
            "Model Context Protocol", "RAG", "Semantic caching", "Whisper",
        ],
    },
    {
        title: "Backend & data",
        blurb: "The services and stores the models sit behind, and the pipelines that feed them.",
        items: [
            "Python", "FastAPI", "AsyncIO", "Pydantic", "PySpark", "Pandas",
            "PostgreSQL", "MySQL", "MongoDB", "Redis", "sqlglot",
        ],
    },
    {
        title: "Retrieval & infrastructure",
        blurb: "Vector search, containers and the telemetry that shows what production is doing.",
        items: [
            "Weaviate", "pgvector", "FAISS", "Docker", "AWS", "Supabase",
            "Sentry", "Prometheus", "OpenTelemetry",
        ],
    },
    {
        title: "Analytics & reporting",
        blurb: "Where the numbers go once they are trustworthy — dashboards people actually open.",
        items: ["Tableau", "Power BI", "Plotly", "Advanced Excel"],
    },
]

export const proficiency = [
    {
        name: "Python & FastAPI services",
        value: 95,
        level: "Daily",
        note: "Async services, Pydantic contracts, retries and circuit breakers in production.",
    },
    {
        name: "LLM orchestration & agent design",
        value: 92,
        level: "Daily",
        note: "Provider-agnostic routing across OpenAI and Anthropic; five-agent pipelines.",
    },
    {
        name: "SQL & data modelling",
        value: 92,
        level: "Daily",
        note: "Text-to-SQL generation and validation across 11+ engines, dialects transpiled with sqlglot.",
    },
    {
        name: "RAG & vector retrieval",
        value: 90,
        level: "Daily",
        note: "Weaviate, pgvector and FAISS; semantic table selection to keep prompts small.",
    },
    {
        name: "Cloud, Docker & observability",
        value: 82,
        level: "Regular",
        note: "AWS, containerised deploys, Sentry and OpenTelemetry on the request path.",
    },
]

export const marqueeItems = [
    "Python", "FastAPI", "GPT-4o", "Claude", "LangGraph", "Weaviate", "pgvector",
    "FAISS", "Redis", "PostgreSQL", "PySpark", "Docker", "AWS", "Tableau", "sqlglot",
]

export type Testimonial = {
    name: string
    role: string
    initials: string
    /** The line that earns the reader's attention on its own. */
    pull: string
    body: string[]
    accent: string
}

export const testimonials: Testimonial[] = [
    {
        name: "Juan Yanes",
        role: "Founder & CEO, Blackmont Consulting",
        initials: "JY",
        pull: "He not only took full ownership of his responsibilities but also actively supported and guided his peers throughout the project.",
        body: [
            "I had the pleasure of supervising Tanishq during his time at Blackmont Consulting, where he consistently stood out as a highly proactive and dependable team member. From day one, Tanishq demonstrated strong leadership qualities — he not only took full ownership of his responsibilities but also actively supported and guided his peers throughout the project.",
            "His ability to stay organised, focused and solution-oriented made a significant impact on our team's performance. Tanishq consistently met and exceeded his objectives, delivering high-quality work under tight deadlines. His strategic thinking, initiative and collaborative spirit contributed to a positive and productive working environment.",
            "Tanishq's work ethic and professionalism are exemplary, and I'm confident he will bring tremendous value to any team or organisation he joins.",
        ],
        accent: "167 139 250",
    },
    {
        name: "Shahrukh Hasnine",
        role: "Business Analyst & Market Operations Director, Nagad",
        initials: "SH",
        pull: "His strong analytical skills and attention to detail were evident as he quickly tackled complex problems, providing insights that drove our project forward.",
        body: [
            "I am thrilled to highly recommend Tanishq, with whom I had the pleasure of collaborating during our MSc Business Analytics programme. Tanishq consistently demonstrated exceptional proactiveness and a remarkable team-player attitude throughout our capstone project.",
            "From the outset, Tanishq took the initiative to ensure the project was well organised and that every team member was aligned with our objectives. He contributed ideas and encouraged open communication, fostering an environment where everyone felt comfortable sharing their thoughts.",
            "His strong analytical skills and attention to detail were evident as he quickly tackled complex problems, providing insights that drove our project forward. I have no doubt that Tanishq will excel in any endeavour he pursues.",
        ],
        accent: "228 207 168",
    },
]

export const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Work", href: "#work" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Praise", href: "#praise" },
    { name: "Contact", href: "#contact" },
]
