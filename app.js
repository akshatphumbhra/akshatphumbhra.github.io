function App() {
  const [repos, setRepos] = React.useState([]);

  React.useEffect(() => {
    fetch('https://api.github.com/users/akshatphumbhra/repos?sort=updated')
      .then(res => res.json())
      .then(data => setRepos(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>Akshat Phumbhra</h1>
          <p className="lead">Software Developer &amp; Tech Enthusiast</p>
        </div>
      </section>

      <section id="about" className="container my-5">
        <h2 className="mb-3">About Me</h2>
        <p>Hello! I'm Akshat, a software developer who enjoys crafting web and mobile experiences. Below are some of my open-source projects.</p>
      </section>

      <section id="projects" className="container my-5">
        <h2 className="mb-4">Projects</h2>
        <div className="row">
          {repos.map(repo => (
            <div className="col-md-6 col-lg-4 mb-3" key={repo.id}>
              <div className="card h-100">
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
      </section>

      <footer>
        <p className="mb-0">&copy; {new Date().getFullYear()} Akshat Phumbhra</p>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
