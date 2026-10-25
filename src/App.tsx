import { useEffect, useState, type CSSProperties } from "react"

type Page = "home" | "experience" | "education" | "community" | "projects"

const pages: Page[] = [
  "home",
  "experience",
  "education",
  "community",
  "projects",
]

const Arrow = () => <span aria-hidden="true">↗</span>

function Starfield() {
  const [pointer, setPointer] = useState({ x: -1000, y: -1000 })

  useEffect(() => {
    let frame = 0
    const movePointer = (event: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const scale = Math.max(
          window.innerWidth / 1200,
          window.innerHeight / 800,
        )
        const offsetX = (window.innerWidth - 1200 * scale) / 2
        const offsetY = (window.innerHeight - 800 * scale) / 2
        setPointer({
          x: (event.clientX - offsetX) / scale,
          y: (event.clientY - offsetY) / scale,
        })
      })
    }
    const clearPointer = () => setPointer({ x: -1000, y: -1000 })

    window.addEventListener("pointermove", movePointer)
    window.addEventListener("blur", clearPointer)
    document.documentElement.addEventListener("pointerleave", clearPointer)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", movePointer)
      window.removeEventListener("blur", clearPointer)
      document.documentElement.removeEventListener("pointerleave", clearPointer)
    }
  }, [])

  const scatter = (seed: number) => {
    const value = Math.sin(seed * 12.9898) * 43758.5453
    return value - Math.floor(value)
  }
  const backgroundStars = Array.from({ length: 420 }, (_, index) => ({
    x: scatter(index * 2 + 1) * 1200,
    y: scatter(index * 2 + 2) * 800,
    r: 0.45 + scatter(index * 3 + 4) * 1.05,
    delay: -((index * 0.37) % 5),
    duration: 2.4 + (index % 6) * 0.42,
  }))

  return (
    <svg
      className="starfield"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g className="background-stars">
        {backgroundStars.map((star, index) => {
          const distance = Math.hypot(star.x - pointer.x, star.y - pointer.y)
          const proximity = Math.max(0, 1 - distance / 40)
          return (
            <circle
              key={index}
              cx={star.x}
              cy={star.y}
              r={star.r + proximity * 1.15}
              style={
                {
                  animationDelay: `${star.delay}s`,
                  animationDuration: `${star.duration}s`,
                  "--nearby": proximity,
                } as CSSProperties
              }
            />
          )
        })}
      </g>
    </svg>
  )
}

const experience = [
  {
    period: "Mar 2026 — Present",
    role: "Part-Time Cloud Software Engineer",
    company: "John Deere",
    location: "Ames, IA",
    logo: "/images/experience/john-deere.webp",
    detail:
      "Developing scalable cloud platform solutions for internal users while collaborating with stakeholders on cost, quality, and performance improvements. Using AWS, Docker, CI/CD, Agile, and test-driven development to automate reliable testing and deployment.",
  },
  {
    period: "Jan 2026 — Present",
    role: "Full Stack Developer",
    company: "Crownlabs.ai",
    location: "Remote",
    logo: "/images/experience/crownlabs.webp",
    detail:
      "Building an AI-powered iOS application with Swift, SwiftUI, and CoreML alongside REST APIs and a web dashboard. Implemented onboarding and authentication improvements that increased new-user activation by 25%.",
  },
  {
    period: "May 2025 — Present",
    role: "Crew Member",
    company: "Hawaiian Bros",
    location: "Waukee, IA",
    logo: "/images/experience/hawaiian-bros.webp",
    detail:
      "Managing more than 100 daily orders while balancing customer service, fulfillment, and food preparation. Maintaining 98% order accuracy in a fast-paced, high-volume environment.",
  },
  {
    period: "Jul 2024 — Aug 2024",
    role: "Summer Intern",
    company: "National Inventors Hall of Fame",
    location: "Johnston, IA",
    logo: "/images/experience/inventors-hall.webp",
    detail:
      "Created collaborative activities and strategies that encouraged creativity in others. Practiced structured problem-solving approaches while helping build an engaging team environment.",
  },
  {
    period: "Jun 2024 — Jul 2024",
    role: "Junior Day Camp Counselor",
    company: "Living History Farms",
    location: "Urbandale, IA",
    logo: "/images/experience/living-history.webp",
    detail:
      "Created a positive, inclusive, and engaging environment where campers could learn and have fun. Served as a role model while guiding campers through creative activities and crafts.",
  },
]

const projects = [
  {
    number: "01",
    title: "VACI Lions",
    description:
      "A home for the lion dance team that helps people discover the group, book performances, ask to join, and explore event photos.",
    tags: ["Community", "Web Design", "Responsive"],
    href: "https://vacilions.org/",
  },
  {
    number: "02",
    title: "Note Taking",
    description:
      "A personal organization tool for visualizing class and student organization tasks and remembering upcoming coursework.",
    tags: ["Productivity", "JavaScript", "Web App"],
    href: "https://sarahbui7.github.io/note-taking/",
  },
  {
    number: "03",
    title: "CySearch",
    description:
      "Iowa State’s course search platform with real-time seat availability and full search across 100+ departments.",
    tags: ["Next.js", "React", "REST APIs", "Vercel"],
    href: "https://cysearch.vercel.app",
  },
  {
    number: "04",
    title: "Circuit Mania",
    description:
      "A collaborative GitHub project focused on circuits and hands-on engineering concepts.",
    tags: ["GitHub", "Circuits", "Collaboration"],
    href: "https://github.com/AliciaRus/Circuit-Mania",
  },
]

function Header({
  current,
  navigate,
}: {
  current: Page
  navigate: (page: Page) => void
}) {
  return (
    <header className="site-header">
      <button
        className="wordmark"
        onClick={() => navigate("home")}
        aria-label="Go to home"
      >
        Sarah Bui
      </button>
      <nav aria-label="Primary navigation">
        {pages.slice(1).map((page) => (
          <button
            key={page}
            className={current === page ? "active" : ""}
            onClick={() => navigate(page)}
          >
            {page}
          </button>
        ))}
      </nav>
    </header>
  )
}

function Home() {
  return (
    <main className="home page-shell">
      <section className="hero">
        <div className="eyebrow">
          <span className="status-dot" /> Computer Engineering + Cybersecurity ·
          Iowa State
        </div>
        <h1>
          Hello, I am <em>Sarah Bui!</em>
        </h1>
        <p className="hero-copy">
          I am a Vietnamese-American student at Iowa State University and I love
          to be involved in my community. Whether that is through student
          organizations or through the Vietnamese American Community in Iowa, I
          enjoy being active and connected. In my free time, I enjoy cooking,
          baking, crocheting, and coding!
        </p>
      </section>
      <aside className="portrait-card">
        <img src="/images/sarah.webp" alt="Sarah Bui" />
        <small>AMES, IOWA</small>
      </aside>
      <section className="home-skills">
        <p className="section-label">Skills</p>
        <div className="skills-list">
          <p>
            <strong>Languages:</strong> TypeScript, Java, Python, JavaScript, C,
            C++, Swift, HTML, CSS
          </p>
          <p>
            <strong>Technologies/Frameworks:</strong> AWS, Next.js, React,
            Node.js, SwiftUI, CoreML, REST APIs, PostgreSQL, Docker, Express
          </p>
          <p>
            <strong>Software &amp; Tools:</strong> Git, GitHub, VS Code, Agile
            Methodologies, CI/CD, Test-Driven Development, Full Stack Development
          </p>
          <p>
            <strong>Soft Skills:</strong> Leadership, Communication,
            Collaboration, Problem Solving, Adaptability, Time Management
          </p>
        </div>
      </section>
      <div className="home-footer social-links">
        <span>Connect</span>
        <div>
          <a
            href="https://www.instagram.com/sarahbui7/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram <Arrow />
          </a>
          <a
            href="https://github.com/sarahbui7"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <Arrow />
          </a>
          <a
            href="https://linkedin.com/in/sarahbui7"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <Arrow />
          </a>
        </div>
      </div>
    </main>
  )
}

function PageIntro({ title, copy }: { title: string copy: string }) {
  return (
    <section className="page-intro">
      <h1>{title}</h1>
      <p>{copy}</p>
    </section>
  )
}

function Experience() {
  return (
    <main className="page-shell interior-page">
      <PageIntro
        title="Experience"
        copy="Places where I’ve learned, contributed, and grown as an engineer and teammate."
      />
      <section className="timeline">
        {experience.map((item) => (
          <article className="timeline-item" key={item.role}>
            <div className="timeline-logo">
              <img src={item.logo} alt={`${item.company} logo`} />
            </div>
            <div
              className={`timeline-marker ${item.period.includes("Present") ? "current" : ""}`}
            >
              <span />
            </div>
            <div className="timeline-content">
              <h2>
                {item.role} <span>|</span> {item.company}
              </h2>
              <p className="timeline-meta">
                {item.location} <span>•</span> {item.period}
              </p>
              <p className="detail">{item.detail}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

function Education() {
  return (
    <main className="page-shell interior-page">
      <PageIntro
        title="Education"
        copy="Developing a strong technical foundation, one thoughtful question at a time."
      />
      <section className="education-card">
        <img
          className="education-planet"
          src="/images/planet-iowa-state.webp"
          alt=""
        />
        <div className="education-main">
          <p className="period">Aug 2025 — Dec 2028 · Ames, Iowa</p>
          <h2>Iowa State University</h2>
          <p className="degree">
            B.S. Computer Engineering · Minor in Cybersecurity
          </p>
          <p className="detail">
            <strong>Relevant courses:</strong> Introduction to Data Structures,
            Linux Operating Systems Essentials, Embedded Systems I, and Digital
            Logic.
          </p>
        </div>
        <div className="education-meta">
          <div>
            <strong>3.76</strong>
            <span>GPA</span>
          </div>
          <div>
            <strong>2028</strong>
            <span>Graduation</span>
          </div>
        </div>
      </section>
      <section className="education-card compact">
        <img
          className="education-planet"
          src="/images/planet-dmacc.webp"
          alt=""
        />
        <div className="education-main">
          <p className="period">2021 — 2025 · Ankeny, Iowa</p>
          <h2>Des Moines Area Community College</h2>
          <p className="degree">Liberal Arts · Concurrent Enrollment</p>
          <p className="detail">
            <strong>Relevant courses:</strong> Calculus I, Calculus II,
            Classical Physics I, American National Government, U.S. History to
            1877, U.S. History Since 1877, and Statistics.
          </p>
        </div>
      </section>
      <section className="education-card compact">
        <img
          className="education-planet"
          src="/images/planet-waukee.webp"
          alt=""
        />
        <div className="education-main">
          <p className="period">Graduated May 2025 · Waukee, Iowa</p>
          <h2>Waukee Northwest High School</h2>
          <p className="degree">High School Diploma · 4.207 GPA</p>
          <p className="detail">
            <strong>Relevant courses:</strong> AP Physics I and C, AP Calculus
            AB and BC, Principles of Engineering, and Programming in Python.
          </p>
        </div>
      </section>
      <section className="coursework">
        <p className="section-label">Honors &amp; awards</p>
        <div>
          {[
            "True Scholar",
            "Olga Margaret Thompson Endowment Scholarship",
            "CelebrAsian Scholar",
            "Silver Cord · 200+ service hours",
            "National Honor Society",
          ].map((course) => (
            <span key={course}>{course}</span>
          ))}
        </div>
      </section>
    </main>
  )
}

function Community() {
  return (
    <main className="page-shell interior-page">
      <PageIntro
        title="Community"
        copy="I’m active in student and cultural organizations that help me connect with others and share my passion for service and representation."
      />
      <section className="community-section">
        <div className="community-heading">
          <p className="section-label">Beyond Iowa State</p>
          <h2>Cultural community</h2>
        </div>
        <div className="community-grid">
          <a
            className="community-card"
            href="https://www.instagram.com/vacilions/"
            target="_blank"
            rel="noreferrer"
            aria-label="VACI Lions on Instagram"
          >
            <img
              className="community-photo"
              src="/images/vaci-lions.webp"
              alt="VACI Lions team"
            />
            <div>
              <div className="community-role-row">
                <p className="section-label">Lion Dance Captain</p>
                <span className="card-arrow">↗</span>
              </div>
              <h2>VACI Lions</h2>
              <p className="detail">
                Leading the Vietnamese American Community in Iowa (VACI) lion
                dance team, coaching 10+ junior dancers and performing at 15+
                cultural events each year for 500+ attendees.
              </p>
            </div>
          </a>
          <a
            className="community-card"
            href="https://www.instagram.com/uvsamidwest/"
            target="_blank"
            rel="noreferrer"
            aria-label="UVSA Midwest on Instagram"
          >
            <img
              className="community-photo"
              src="/images/uvsa-midwest.webp"
              alt="UVSA Midwest"
            />
            <div>
              <div className="community-role-row">
                <p className="section-label">Engagement Chair</p>
                <span className="card-arrow">↗</span>
              </div>
              <h2>UVSA Midwest</h2>
              <p className="detail">
                The Union of Vietnamese Student Associations of the Midwest
                represents and empowers Vietnamese student communities through
                cultural preservation, leadership, philanthropy, and
                professional growth.
              </p>
            </div>
          </a>
        </div>
      </section>
      <section className="community-section">
        <div className="community-heading">
          <p className="section-label">At Iowa State</p>
          <h2>Campus leadership</h2>
        </div>
        <div className="community-grid">
          <a
            className="community-card"
            href="https://www.instagram.com/gwc_iastate/"
            target="_blank"
            rel="noreferrer"
            aria-label="Girls Who Code at Iowa State on Instagram"
          >
            <img
              className="community-photo"
              src="/images/girls-who-code.webp"
              alt="Girls Who Code at Iowa State"
            />
            <div>
              <div className="community-role-row">
                <p className="section-label">
                  Treasurer · Former Industry Relations Chair
                </p>
                <span className="card-arrow">↗</span>
              </div>
              <h2>Girls Who Code</h2>
              <p className="detail">
                Managing club finances after securing $2,000 in sponsorships and
                initiating a mentorship program with Casey’s employees.
              </p>
            </div>
          </a>
          <a
            className="community-card"
            href="https://www.instagram.com/isuvsa/"
            target="_blank"
            rel="noreferrer"
            aria-label="Iowa State Vietnamese Student Association on Instagram"
          >
            <img
              className="community-photo"
              src="/images/vsa.webp"
              alt="Vietnamese Student Association at Iowa State"
            />
            <div>
              <div className="community-role-row">
                <p className="section-label">
                  Fundraising Chair · Former Intern
                </p>
                <span className="card-arrow">↗</span>
              </div>
              <h2>Vietnamese Student Association</h2>
              <p className="detail">
                VSA represents Vietnamese students and culture at Iowa State. I
                lead food fundraising logistics with 15+ E-Board members and
                build local partnerships that support the club’s growth.
              </p>
            </div>
          </a>
        </div>
      </section>
    </main>
  )
}

function Projects() {
  return (
    <main className="page-shell interior-page">
      <PageIntro
        title="Projects"
        copy="A few things I’ve designed, built, tested, and learned from along the way."
      />
      <section className="project-list">
        {projects.map((project) => (
          <a
            className="project-row"
            href={project.href}
            target="_blank"
            rel="noreferrer"
            key={project.title}
          >
            <span className="project-number">{project.number}</span>
            <div className="project-title">
              <h2>{project.title}</h2>
              <div className="tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <p>{project.description}</p>
            <span className="project-arrow">
              <Arrow />
            </span>
          </a>
        ))}
      </section>
    </main>
  )
}

export default function App() {
  const getPage = (): Page => {
    const hash = window.location.hash.replace("#/", "") as Page
    return pages.includes(hash) ? hash : "home"
  }
  const [current, setCurrent] = useState<Page>(getPage)

  useEffect(() => {
    const onHashChange = () => setCurrent(getPage())
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])

  const navigate = (page: Page) => {
    window.location.hash = page === "home" ? "/" : `/${page}`
    setCurrent(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="app">
      <Starfield />
      <Header current={current} navigate={navigate} />
      {current === "home" && <Home />}
      {current === "experience" && <Experience />}
      {current === "education" && <Education />}
      {current === "community" && <Community />}
      {current === "projects" && <Projects />}
      <footer className="site-footer">
        <p>Designed &amp; built with care.</p>
        <p>© {new Date().getFullYear()} Sarah Bui</p>
      </footer>
    </div>
  )
}
