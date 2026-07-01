import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef, type FormEvent } from "react";
import { Toaster, toast } from "sonner";
import resumeFileUrl from "@/assets/Mohammad Saad Resume.pdf";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mohammad Saad — Full Stack Developer" },
      { name: "description", content: "MERN stack developer building scalable, well-crafted web applications. View projects, skills, and download resume." },
      { property: "og:title", content: "Mohammad Saad — Full Stack Developer" },
      { property: "og:description", content: "MERN stack developer. Projects, skills, and resume." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

const SKILL_GROUPS = [
  {
    title: "Frontend",
    items: [
      { name: "React.js", level: 92 },
      { name: "Next.js", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Redux", level: 78 },
      { name: "HTML5 / CSS3", level: 95 },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", level: 88 },
      { name: "Express.js", level: 86 },
      { name: "JWT / bcrypt", level: 82 },
      { name: "MongoDB", level: 85 },
      { name: "SQL", level: 70 },
    ],
  },
  {
    title: "Languages & Core",
    items: [
      { name: "JavaScript (ES6+)", level: 92 },
      { name: "C++", level: 80 },
      { name: "DSA", level: 85 },
      { name: "OOP / DBMS", level: 80 },
      { name: "Generative AI", level: 65 },
    ],
  },
];

const TOOLS = ["Git", "GitHub", "Postman", "Razorpay", "Vercel", "Render", "VS Code", "n8n", "Prompt Engineering"];

const PROJECTS = [
  {
    title: "B2B Trading Platform",
    status: "Live",
    summary:
      "Full-stack B2B marketplace with product discovery, order management, secure transactions, role-based access, and Razorpay payments.",
    stack: ["React", "Node", "Express", "MongoDB", "Tailwind", "JWT", "Razorpay"],
    href: "https://b2b-trading-platform.vercel.app",
    accent: "primary",
  },
  {
    title: "Quick Note",
    status: "Live",
    summary:
      "MERN note management app with JWT auth, protected routes, and full CRUD. Reusable React components, deployed on Vercel + Render.",
    stack: ["React", "Node", "Express", "MongoDB", "JWT"],
    href: "https://quicknote-mern.vercel.app",
    accent: "accent",
  },
  {
    title: "DIET Forbesganj Portal",
    status: "Internship",
    summary:
      "10+ production-ready pages for a large-scale institutional website. Reusable UI system, responsive across all devices.",
    stack: ["Next.js", "React", "Tailwind"],
    href: "https://github.com/mohammadsaad79",
    accent: "primary",
  },
];

function Portfolio() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState("home");
  const [showTop, setShowTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("theme")) as "dark" | "light" | null;
    const initial = stored ?? "dark";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
    const t = setTimeout(() => setLoaded(true), 450);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 600);
      const offsets = NAV.map((n) => {
        const el = document.getElementById(n.id);
        if (!el) return { id: n.id, top: Infinity };
        return { id: n.id, top: Math.abs(el.getBoundingClientRect().top - 100) };
      });
      offsets.sort((a, b) => a.top - b.top);
      setActive(offsets[0].id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  };

  if (!loaded) return <BootLoader />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster richColors theme={theme} position="bottom-right" />
      <Nav active={active} theme={theme} onToggle={toggleTheme} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <ScrollTop visible={showTop} />
    </div>
  );
}

function BootLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">initializing</div>
        <div className="h-1 w-48 overflow-hidden rounded-full bg-surface">
          <div className="h-full w-1/2 loading-shimmer" />
        </div>
        <div className="font-display text-2xl font-semibold">
          <span className="text-glow">MS</span>
          <span className="cursor-blink h-5" />
        </div>
      </div>
    </div>
  );
}

function Nav({
  active,
  theme,
  onToggle,
  menuOpen,
  setMenuOpen,
}: {
  active: string;
  theme: "dark" | "light";
  onToggle: () => void;
  menuOpen: boolean;
  setMenuOpen: (b: boolean) => void;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#home" className="flex items-center gap-2 font-display text-lg font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary font-mono text-sm text-primary-foreground">MS</span>
          <span className="hidden sm:inline">Mohammad Saad</span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`rounded-md px-3 py-2 text-sm transition-colors ${
                active === n.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggle}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-md border border-border bg-surface text-foreground transition hover:border-primary/50 hover:text-primary"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded-md border border-border bg-surface md:hidden"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="border-t border-border bg-background md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-2">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setMenuOpen(false)}
                className={`rounded-md px-3 py-3 text-sm ${active === n.id ? "text-primary" : "text-muted-foreground"}`}
              >
                {n.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
    >
      {children}
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative section-pad overflow-hidden">
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" aria-hidden />
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="chip mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Open to opportunities
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl md:text-8xl">
            Hello, I&apos;m <br />
            <span className="text-glow">Mohammad Saad</span>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 max-w-2xl font-mono text-sm uppercase tracking-[0.18em] text-muted-foreground">
            Full Stack Developer · MERN · React · Node
          </p>
        </Reveal>
        <Reveal delay={300}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            I build responsive, production-ready web applications with{" "}
            <span className="text-foreground">React.js, Node.js, Express, MongoDB,</span> and Tailwind CSS — with a strong foundation in DSA and system design.
          </p>
        </Reveal>
        <Reveal delay={400}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground shadow-glow transition hover:translate-y-[-2px]"
            >
              View Projects <ArrowIcon />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 font-medium text-foreground transition hover:border-primary/50 hover:text-primary"
            >
              Get in touch
            </a>
            <a
              href={resumeFileUrl}
              download="Mohammad Saad Resume.pdf"
              className="inline-flex items-center gap-2 rounded-full px-4 py-3 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition hover:text-primary"
            >
              <DownloadIcon /> Resume.pdf
            </a>
          </div>
        </Reveal>
        <Reveal delay={500}>
          <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
            {[
              { k: "300+", v: "DSA Problems" },
              { k: "10+", v: "Pages Shipped" },
              { k: "8.54", v: "CGPA / 10" },
              { k: "6 mo", v: "Internship" },
            ].map((s) => (
              <div key={s.v} className="bg-background p-6">
                <div className="font-display text-3xl font-semibold text-primary">{s.k}</div>
                <div className="mt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-pad border-t border-border">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeader index="01" title="About me" />
        <div className="mt-12 grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                I&apos;m a <span className="text-foreground">Computer Science undergraduate</span> at Maulana Azad National Urdu University and a Full Stack Developer specializing in the <span className="text-foreground">MERN stack</span>.
              </p>
              <p>
                I&apos;m currently a Frontend Developer Intern at Intment Technology, where I&apos;ve shipped 10+ production pages for the DIET Forbesganj portal — building reusable component systems and responsive layouts.
              </p>
              <p>
                I love turning complex problems into clean, scalable products. Right now I&apos;m deepening my skills in <span className="text-foreground">Generative AI, n8n automation, System Design, and advanced DSA</span>.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Currently</div>
              <div className="mt-3 space-y-4">
                <Row k="Role" v="Frontend Dev Intern" />
                <Row k="Company" v="Intment Technology" />
                <Row k="Stack" v="React · Next · Tailwind" />
                <Row k="Learning" v="GenAI · n8n · System Design" />
                <Row k="Location" v="India" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-3 last:border-0 last:pb-0">
      <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{k}</span>
      <span className="text-right text-sm text-foreground">{v}</span>
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="section-pad border-t border-border bg-surface/40">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeader index="02" title="Skills & tooling" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SKILL_GROUPS.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 100}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold">{g.title}</h3>
                  <span className="font-mono text-xs text-muted-foreground">0{gi + 1}</span>
                </div>
                <div className="space-y-4">
                  {g.items.map((s) => (
                    <SkillBar key={s.name} name={s.name} level={s.level} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div className="mt-10 rounded-2xl border border-border bg-card p-6">
            <div className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">Tools & Platforms</div>
            <div className="flex flex-wrap gap-2">
              {TOOLS.map((t) => (
                <span key={t} className="chip" style={{ background: "transparent", color: "var(--foreground)", borderColor: "var(--border)" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SkillBar({ name, level }: { name: string; level: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShown(true), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref}>
      <div className="mb-1.5 flex items-baseline justify-between text-sm">
        <span className="text-foreground">{name}</span>
        <span className="font-mono text-xs text-muted-foreground">{level}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
          style={{ width: shown ? `${level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" className="section-pad border-t border-border">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeader index="03" title="Selected projects" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <ProjectCard {...p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  title,
  status,
  summary,
  stack,
  href,
}: {
  title: string;
  status: string;
  summary: string;
  stack: string[];
  href: string;
  accent: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
    >
      <div className="mb-6 flex h-32 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface">
        <div className="grid-bg absolute inset-x-6 h-32 rounded-xl opacity-60" aria-hidden />
        <span className="relative font-display text-5xl font-semibold text-glow">
          {title
            .split(" ")
            .map((w) => w[0])
            .slice(0, 2)
            .join("")}
        </span>
      </div>
      <div className="mb-2 flex items-center justify-between">
        <span className="chip">{status}</span>
        <ArrowIcon className="text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
      </div>
      <h3 className="font-display text-xl font-semibold">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{summary}</p>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {stack.map((s) => (
          <span key={s} className="rounded-md border border-border bg-surface px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
            {s}
          </span>
        ))}
      </div>
    </a>
  );
}

function Resume() {
  return (
    <section id="resume" className="section-pad border-t border-border bg-surface/40">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeader index="04" title="Resume" />
        <Reveal>
          <div className="mt-12 grid items-center gap-8 rounded-3xl border border-border bg-card p-8 shadow-card md:grid-cols-[1fr_auto] md:p-12">
            <div>
              <h3 className="font-display text-3xl font-semibold sm:text-4xl">
                The full picture, <span className="text-glow">on one page.</span>
              </h3>
              <p className="mt-4 max-w-xl text-muted-foreground">
                Experience, projects, education, achievements — packaged as a PDF. Updated regularly.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                <span>· PDF</span>
                <span>· 1 page</span>
                <span>· Updated 2026</span>
              </div>
            </div>
            <a
              href={resumeFileUrl}
              download="Mohammad Saad Resume.pdf"
              className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 font-medium text-primary-foreground shadow-glow transition hover:translate-y-[-2px]"
            >
              <DownloadIcon /> Download Resume
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || name.length < 2) return toast.error("Please enter your name (min 2 characters).");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error("Please enter a valid email address.");
    if (!message || message.length < 10) return toast.error("Message should be at least 10 characters.");
    if (message.length > 1000) return toast.error("Message must be under 1000 characters.");

    setSending(true);
    await new Promise((r) => setTimeout(r, 700));
    setSending(false);
    toast.success("Message ready! Opening your email client…");
    const subject = encodeURIComponent(`Portfolio contact — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:mohammadsaad79.ms@gmail.com?subject=${subject}&body=${body}`;
    form.reset();
  };

  return (
    <section id="contact" className="section-pad border-t border-border">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeader index="05" title="Get in touch" />
        <div className="mt-12 grid gap-8 md:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div>
              <h3 className="font-display text-3xl font-semibold leading-tight">
                Let&apos;s build something <span className="text-glow">together.</span>
              </h3>
              <p className="mt-4 text-muted-foreground">
                Have a project, role, or collaboration in mind? Drop a message and I&apos;ll reply within 24 hours.
              </p>
              <div className="mt-8 space-y-3">
                <ContactLine icon={<MailIcon />} label="mohammadsaad79.ms@gmail.com" href="mailto:mohammadsaad79.ms@gmail.com" />
                <ContactLine icon={<PhoneIcon />} label="+91 8542929798" href="tel:+918542929798" />
                <ContactLine icon={<GithubIcon />} label="github.com/mohammadsaad79" href="https://github.com/mohammadsaad79" />
                <ContactLine icon={<LinkedinIcon />} label="linkedin.com/in/mohammadsaad79" href="https://www.linkedin.com/in/mohammadsaad79" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
              <Field name="name" label="Name" placeholder="Your name" />
              <Field name="email" label="Email" placeholder="you@email.com" type="email" />
              <Field name="message" label="Message" placeholder="What would you like to build?" textarea />
              <button
                type="submit"
                disabled={sending}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-medium text-primary-foreground shadow-glow transition hover:translate-y-[-1px] disabled:opacity-60"
              >
                {sending ? "Sending…" : "Send message"} <ArrowIcon />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  textarea,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  textarea?: boolean;
}) {
  const cls =
    "w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground placeholder:text-muted-foreground/70 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";
  return (
    <label className="mb-4 block">
      <span className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      {textarea ? (
        <textarea name={name} placeholder={placeholder} rows={5} className={cls} maxLength={1000} required />
      ) : (
        <input name={name} type={type} placeholder={placeholder} className={cls} maxLength={255} required />
      )}
    </label>
  );
}

function ContactLine({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="group flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 transition hover:border-primary/50 hover:text-primary"
    >
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-background text-primary">{icon}</span>
      <span className="font-mono text-sm">{label}</span>
    </a>
  );
}

function SectionHeader({ index, title }: { index: string; title: string }) {
  return (
    <Reveal>
      <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary">/ {index}</div>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-5xl">{title}</h2>
        </div>
      </div>
    </Reveal>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 sm:flex-row sm:items-center">
        <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          © {new Date().getFullYear()} Mohammad Saad · Built with React + Tailwind
        </div>
        <div className="flex items-center gap-2">
          <SocialIcon href="https://github.com/mohammadsaad79" icon={<GithubIcon />} label="GitHub" />
          <SocialIcon href="https://www.linkedin.com/in/mohammadsaad79" icon={<LinkedinIcon />} label="LinkedIn" />
          <SocialIcon href="mailto:mohammadsaad79.ms@gmail.com" icon={<MailIcon />} label="Email" />
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-md border border-border bg-surface text-muted-foreground transition hover:border-primary/50 hover:text-primary"
    >
      {icon}
    </a>
  );
}

function ScrollTop({ visible }: { visible: boolean }) {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-30 grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowIcon className="-rotate-90" />
    </button>
  );
}

/* ============ ICONS ============ */
function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-4 w-4 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}
function SunIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  );
}
function GithubIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.73-1.53-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.77.11 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.07.78 2.15v3.19c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}
function LinkedinIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.44v6.3zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
