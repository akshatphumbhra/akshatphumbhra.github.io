// @ts-check
/**
 * Personal Portfolio Website – Single-file React Implementation
 * -------------------------------------------------------------
 * NOTE:
 * 1. This file is compiled at runtime by Babel (see index.html).
 *    To keep deployment simple we therefore stay in **one file** while
 *    still following component-based best practices.
 * 2. We use JSDoc to provide strict type information without requiring a
 *    TypeScript build step. No `any`, no non-null assertions.
 * 3. Animations are handled via the `useAnimateOnVisible` hook which adds
 *    an `is-visible` class when the element enters the viewport.
 * 4. All styles used here live in `style.css`. New class names have been
 *    added at the bottom of that file – see the corresponding edit.
 */

/** @typedef {import('./types').Repo} Repo */

/* ------------------------------------------------------------------ */
/*                           Utility Hooks                            */
/* ------------------------------------------------------------------ */

/**
 * Hook that toggles a class on a DOM element once it becomes visible in the
 * viewport. Intended for triggering CSS animations on scroll.
 * @param {React.RefObject<HTMLElement>} ref – Element to observe.
 */
function useAnimateOnVisible(ref) {
  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    /** @type {IntersectionObserverCallback} */
    const handler = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handler, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);
}

/**
 * Hook for persisting boolean state to `localStorage`, used here for the
 * dark-mode toggle so the preference survives page refresh.
 * @param {string} key – LocalStorage key.
 * @param {boolean} initial – Initial value when nothing stored.
 * @returns {[boolean, (next: boolean)=>void]}
 */
function usePersistedToggle(key, initial) {
  const [value, setValue] = React.useState(() => {
    const stored = window.localStorage.getItem(key);
    return stored === null ? initial : stored === 'true';
  });

  /** @param {boolean} next */
  const update = next => {
    setValue(next);
    window.localStorage.setItem(key, String(next));
  };

  return [value, update];
}

/* ------------------------------------------------------------------ */
/*                          Re-usable UI bits                          */
/* ------------------------------------------------------------------ */

/**
 * Simple SVG icon component.
 * @param {{path: string, size?: number, title?: string}} props
 */
function Icon({ path, size = 20, title }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-label={title}
      role="img"
    >
      <path d={path} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*                            Main Sections                            */
/* ------------------------------------------------------------------ */

function Navbar({ onToggleTheme, darkMode }) {
  return (
    <header className="navbar fixed-top px-3 justify-content-between align-items-center custom-navbar">
      <a href="#hero" className="navbar-brand fw-bold logo">AP</a>
      <nav className="d-none d-md-flex gap-4">
        <a className="nav-link" href="#experience">Experience</a>
        <a className="nav-link" href="#projects">Projects</a>
        <a className="nav-link" href="#about">About</a>
        <a className="nav-link" href="#contact">Contact</a>
      </nav>
      <button
        className="btn btn-sm theme-toggle"
        onClick={() => onToggleTheme(!darkMode)}
        aria-label="Toggle colour scheme"
      >
        {darkMode ? (
          <Icon
            title="Switch to light mode"
            path="M12 3.1V1a1 1 0 1 1 0 2.1zm5.66 3.24l1.49-1.49a1 1 0 1 1-1.42-1.42l-1.49 1.49a1 1 0 0 1 1.42 1.42zM23 11h-2.1a1 1 0 1 1 0 2H23a1 1 0 1 1 0-2zm-3.1 6.66l1.49 1.49a1 1 0 1 1-1.42 1.42l-1.49-1.49a1 1 0 0 1 1.42-1.42zM12 20.9V23a1 1 0 1 1 0-2.1zm-6.66-3.24l-1.49 1.49a1 1 0 0 1-1.42-1.42l1.49-1.49a1 1 0 0 1 1.42 1.42zM3 13H.9a1 1 0 1 1 0-2H3a1 1 0 1 1 0 2zm3.24-6.66L4.75 4.85a1 1 0 0 1 1.42-1.42l1.49 1.49A1 1 0 0 1 6.24 6.34zM12 6.5A5.5 5.5 0 1 1 6.5 12 5.51 5.51 0 0 1 12 6.5z"
          />
        ) : (
          <Icon
            title="Switch to dark mode"
            path="M17.75 15.5A7.75 7.75 0 0 1 8.5 2.25c0-.41.34-.75.75-.75s.75.34.75.75A6.25 6.25 0 1 0 16.25 16c0 .41.34.75.75.75s.75-.34.75-.75z"
          />
        )}
      </button>
    </header>
  );
}

function Hero() {
  const ref = React.useRef(null);
  useAnimateOnVisible(ref);
  return (
    <section id="hero" ref={ref} className="hero text-center d-flex flex-column justify-content-center align-items-center">
      <h1 className="display-3 fw-bold mb-2">Hi, I'm Akshat Phumbhra</h1>
      <p className="lead hero-tagline">I build things for the web.</p>
      <div className="d-flex gap-3 mt-4">
        <a href="#contact" className="btn btn-primary btn-lg">Get In Touch</a>
        <a
          href="/Akshat_Phumbhra_Resume.pdf"
          className="btn btn-outline-light btn-lg"
          download
        >
          <Icon path="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM13 3.5L18.5 9H14a1 1 0 0 1-1-1V3.5zM12 17.59l-3.29-3.3a1 1 0 1 1 1.42-1.42l1.59 1.6V9a1 1 0 1 1 2 0v5.47l1.59-1.6a1 1 0 1 1 1.42 1.42L12 17.59z" />
          <span className="ms-2">Download Resume</span>
        </a>
      </div>
    </section>
  );
}

function ExperienceCard({ role, company, period, description, tags }) {
  const ref = React.useRef(null);
  useAnimateOnVisible(ref);
  return (
    <article ref={ref} className="card experience-card h-100">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold mb-1">{role}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {company} • <span>{period}</span>
        </h6>
        <p className="card-text flex-grow-1">{description}</p>
        <div className="mt-3 d-flex flex-wrap gap-2">
          {tags.map(tag => (
            <span key={tag} className="badge bg-secondary fw-normal">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function ExperienceSection() {
  const experiences = [
    {
      role: 'Senior Software Engineer',
      company: 'Tech Innovations Inc.',
      period: '2021 – Present',
      description:
        'Led the development of a cloud-based SaaS platform, improving performance by 40%. Mentored junior developers and implemented CI/CD pipelines.',
      tags: ['React', 'Node.js', 'AWS', 'TypeScript', 'GraphQL'],
    },
    {
      role: 'Software Engineer',
      company: 'Digital Solutions Ltd.',
      period: '2018 – 2021',
      description:
        'Developed and maintained multiple web applications for enterprise clients. Collaborated with cross-functional teams to deliver high-quality software.',
      tags: ['JavaScript', 'React', 'Redux', 'Express', 'MongoDB'],
    },
    {
      role: 'Junior Developer',
      company: 'WebTech Startup',
      period: '2016 – 2018',
      description:
        "Built responsive web applications and contributed to the company's core product. Participated in code reviews and agile development processes.",
      tags: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Bootstrap'],
    },
  ];

  return (
    <section id="experience" className="section-wrapper container py-5">
      <div className="text-center mb-5">
        <span className="section-label">Career Path</span>
        <h2 className="display-5 fw-bold">Work Experience</h2>
        <p className="text-muted">My professional journey in software development.</p>
      </div>
      <div className="row g-4">
        {experiences.map(exp => (
          <div className="col-12 col-md-6 col-lg-4" key={exp.role}>
            <ExperienceCard {...exp} />
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * @param {{repo: Repo}} props
 */
function ProjectCard({ repo }) {
  const ref = React.useRef(null);
  useAnimateOnVisible(ref);
  return (
    <article ref={ref} className="card project-card h-100">
      <div className="ratio ratio-16x9 project-thumb bg-light" />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-semibold mb-1">
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="stretched-link">
            {repo.name}
          </a>
        </h5>
        <p className="card-text flex-grow-1 text-muted small">{repo.description}</p>
        <div className="mt-2 d-flex flex-wrap gap-2">
          {(repo.topics || []).slice(0, 5).map(topic => (
            <span key={topic} className="badge bg-secondary-subtle text-secondary-emphasis">
              {topic}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function ProjectsSection() {
  /** @type {[Repo[], React.Dispatch<React.SetStateAction<Repo[]>>]} */
  const [repos, setRepos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    fetch('https://api.github.com/users/akshatphumbhra/repos?sort=updated')
      .then(async res => {
        if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
        /** @type {Repo[]} */
        const data = await res.json();
        setRepos(data.slice(0, 6)); // display a maximum of 6 projects
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="section-wrapper container py-5">
      <div className="text-center mb-5">
        <span className="section-label">Portfolio</span>
        <h2 className="display-5 fw-bold">Featured Projects</h2>
        <p className="text-muted">A collection of my most significant work that showcases my skills and experience.</p>
      </div>

      {loading && <p className="text-center">Loading projects…</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      <div className="row g-4">
        {repos.map(repo => (
          <div className="col-12 col-md-6 col-lg-4" key={repo.id}>
            <ProjectCard repo={repo} />
          </div>
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  const ref = React.useRef(null);
  useAnimateOnVisible(ref);
  const skills = [
    { label: 'JavaScript/TypeScript', value: 95 },
    { label: 'React/Next.js', value: 90 },
    { label: 'Node.js', value: 85 },
    { label: 'HTML/CSS', value: 90 },
    { label: 'UI/UX Design', value: 75 },
  ];

  return (
    <section id="about" ref={ref} className="section-wrapper container py-5">
      <div className="text-center mb-5">
        <span className="section-label">About Me</span>
        <h2 className="display-5 fw-bold">Who I Am</h2>
        <p className="text-muted">Get to know more about me, my background, and what I do.</p>
      </div>
      <div className="row g-5 align-items-center">
        <div className="col-md-7">
          <h3 className="fw-semibold mb-3">My Story</h3>
          <p>
            I'm a passionate software engineer with over 7 years of experience building web applications and digital products.
            I specialise in JavaScript technologies across the full stack and have a strong focus on creating intuitive, performant user experiences.
          </p>
          <p>
            My journey in tech began during college when I built my first website. Since then, I've worked with startups and established companies to deliver solutions that solve real-world problems.
            I'm constantly learning and exploring new technologies to stay at the forefront of web development.
          </p>
          <p>
            When I'm not coding, you can find me hiking, reading tech blogs, or contributing to open-source projects.
            I believe in writing clean, maintainable code and sharing knowledge with the developer community.
          </p>
        </div>
        <div className="col-md-5">
          <div className="skills-wrapper">
            {skills.map(skill => (
              <div key={skill.label} className="skill-bar mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span className="skill-label small fw-semibold">{skill.label}</span>
                  <span className="skill-value small fw-semibold">{skill.value}%</span>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: `${skill.value}%` }}
                    aria-label={skill.label}
                  />
                </div>
              </div>
            ))}
            <div className="years-exp text-center mt-4">
              <span className="display-6 fw-bold">7+</span>
              <span className="d-block small text-muted">Years of Experience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const ref = React.useRef(null);
  useAnimateOnVisible(ref);
  const [form, setForm] = React.useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = React.useState('');

  /**
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e
   */
  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /**
   * Mock submit – in production integrate with a service like EmailJS or
   * a serverless function. We simply show success feedback for now.
   * @param {React.FormEvent} e
   */
  const handleSubmit = e => {
    e.preventDefault();
    // basic validation
    if (!form.name || !form.email || !form.message) {
      setStatus('Please fill in required fields.');
      return;
    }
    setStatus('Sending…');
    setTimeout(() => {
      setStatus('Message sent! I will get back to you shortly.');
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <section id="contact" ref={ref} className="section-wrapper container py-5">
      <div className="text-center mb-5">
        <span className="section-label">Get in Touch</span>
        <h2 className="display-5 fw-bold">Contact Me</h2>
        <p className="text-muted">Have a project in mind or want to discuss opportunities? I'd love to hear from you.</p>
      </div>
      <div className="row g-5">
        {/* Contact Info */}
        <div className="col-md-4">
          <div className="contact-info d-flex flex-column gap-4">
            <div className="d-flex align-items-start gap-3">
              <Icon path="M21 8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8zm-2 0l-7 5-7-5" size={28} />
              <div>
                <h6 className="fw-bold mb-1">Email</h6>
                <a href="mailto:akshat@example.com" className="text-decoration-none">akshat@example.com</a>
              </div>
            </div>
            <div className="d-flex align-items-start gap-3">
              <Icon path="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1.003 1.003 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57.55 0 1 .45 1 1V21c0 .55-.45 1-1 1C10.07 22 2 13.93 2 3c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.46.57 3.58.13.34.05.73-.24 1.01l-2.21 2.2z" size={28} />
              <div>
                <h6 className="fw-bold mb-1">Phone</h6>
                <a href="tel:+15551234567" className="text-decoration-none">+1 (555) 123-4567</a>
              </div>
            </div>
            <div className="d-flex align-items-start gap-3">
              <Icon path="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" size={28} />
              <div>
                <h6 className="fw-bold mb-1">Location</h6>
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>
        {/* Contact Form */}
        <div className="col-md-8">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">
                Name*
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">
                Email*
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12">
              <label htmlFor="subject" className="form-label">
                Subject
              </label>
              <input
                type="text"
                className="form-control"
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="message" className="form-label">
                Message*
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="form-control"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12 d-flex align-items-center gap-3">
              <button type="submit" className="btn btn-primary">
                <Icon path="M2 21l21-9L2 3v7l15 2-15 2z" />
                <span className="ms-2">Send Message</span>
              </button>
              {status && <span className="small text-muted">{status}</span>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-4 text-center footer mt-auto">
      <p className="mb-0 small">
        © {new Date().getFullYear()} Akshat Phumbhra • Built with React
      </p>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*                           Main App Shell                           */
/* ------------------------------------------------------------------ */

function App() {
  const [darkMode, setDarkMode] = usePersistedToggle('dark-mode', true);

  React.useEffect(() => {
    document.body.dataset.theme = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar onToggleTheme={setDarkMode} darkMode={darkMode} />
      <main>
        <Hero />
        <ExperienceSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*                         Bootstrapping React                         */
/* ------------------------------------------------------------------ */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
