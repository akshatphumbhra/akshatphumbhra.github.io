function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" data-aos="fade-down">
      <div className="container">
        <a className="navbar-brand" href="/">Akshat Phumbhra</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample" aria-controls="navbarsExample" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExample">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item"><ReactRouterDOM.NavLink className="nav-link" to="/">Home</ReactRouterDOM.NavLink></li>
            <li className="nav-item"><ReactRouterDOM.NavLink className="nav-link" to="/about">About</ReactRouterDOM.NavLink></li>
            <li className="nav-item"><ReactRouterDOM.NavLink className="nav-link" to="/experience">Experience</ReactRouterDOM.NavLink></li>
            <li className="nav-item"><ReactRouterDOM.NavLink className="nav-link" to="/projects">Projects</ReactRouterDOM.NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function Home() {
  return (
    <section className="hero" data-aos="fade-up">
      <div className="container">
        <h1>Akshat Phumbhra</h1>
        <p className="lead">Software Developer &amp; UX Designer</p>
      </div>
    </section>
  );
}

function About() {
  return (
    <div className="container page-content" data-aos="fade-up">
      <h2 className="mb-3">About Me</h2>
      <p>Hello! I'm Akshat, a user experience designer and software engineer passionate about crafting modern web and mobile experiences. I enjoy merging creative design with robust engineering to build applications that delight users.</p>
    </div>
  );
}

function Experience() {
  const jobs = [
    { role: 'Senior UX Designer', company: 'Creative Tech Inc.', years: '2020-2023', desc: 'Led cross-functional teams to build accessible interfaces for enterprise clients.' },
    { role: 'Software Engineer', company: 'Startup Labs', years: '2018-2020', desc: 'Developed full-stack web applications focusing on usability and performance.' }
  ];
  return (
    <div className="container page-content" data-aos="fade-up">
      <h2 className="mb-3">Professional Experience</h2>
      {jobs.map((job, idx) => (
        <div className="mb-4" key={idx}>
          <h5>{job.role} - {job.company}</h5>
          <p className="text-muted">{job.years}</p>
          <p>{job.desc}</p>
        </div>
      ))}
    </div>
  );
}

function Projects() {
  const [repos, setRepos] = React.useState([]);

  React.useEffect(() => {
    fetch('https://api.github.com/users/akshatphumbhra/repos?sort=updated')
      .then(res => res.json())
      .then(data => setRepos(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container page-content" data-aos="fade-up">
      <h2 className="mb-4">Projects</h2>
      <div className="row">
        {repos.map(repo => (
          <div className="col-md-6 col-lg-4 mb-3" key={repo.id}>
            <div className="card h-100 repo-card">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
                </h5>
                <p className="card-text flex-grow-1">{repo.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <p className="mb-0">&copy; {new Date().getFullYear()} Akshat Phumbhra</p>
    </footer>
  );
}

function App() {
  return (
    <ReactRouterDOM.BrowserRouter>
      <NavBar />
      <ReactRouterDOM.Routes>
        <ReactRouterDOM.Route path="/" element={<Home />} />
        <ReactRouterDOM.Route path="/about" element={<About />} />
        <ReactRouterDOM.Route path="/experience" element={<Experience />} />
        <ReactRouterDOM.Route path="/projects" element={<Projects />} />
      </ReactRouterDOM.Routes>
      <Footer />
    </ReactRouterDOM.BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
