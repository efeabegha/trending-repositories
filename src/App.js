import { useEffect, useState } from 'react';
import './App.css';

export async function fetchRepos() {
  const today = new Date();
  const month = (today.getMonth()+1) < 10 ? `0${today.getMonth()+1}`: today.getMonth()+1;
  const day = today.getDate() < 10 ? `0${today.getDate() - 7}`: today.getDate();
  const url = `https://api.github.com/search/repositories?q=created:%3E${today.getFullYear()}-${month}-${day}&sort=stars&order=desc`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status: ${response.status}`);
  }

  const data = await response.json();
  return data.items;
}

function App() {
  const [trendingRepoData, setTrendingRepoData] = useState([]);
  const [activeRepo, setActiveRepo] = useState([]);
  const [repo, setRepo] = useState("Repositories");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRepos();
      const repoData = data?.map((item) => {
        return (
          {
            key: item.id,
            name: item.full_name,
            githubUrl: item.html_url,
            description: item.description,
            stars: item.stargazers_count,
          }
        )
      });

      setTrendingRepoData(repoData || []);
      setActiveRepo(repoData || []);
    };
    console.log('>> Before fetch!');
    fetchData();
  }, []);

  useEffect(() => {
    if (repo === "repositories") {
      console.log('>> Inside Repo: ');
      setActiveRepo(trendingRepoData);
    }
    if (repo === "starredRepositories") {
      const starred = trendingRepoData.filter(repoD => 
        repoD.name === localStorage.getItem(repoD.name)
      );
      setActiveRepo(starred);
    }
  }, [repo, trendingRepoData])

  const repos = activeRepo?.map((repoData) => {
    console.log('>> Inside Repos Active: ', repoData);
    return(
      <Repo
        data-testid="repotest"
        key={repoData.key}
        name={repoData.name}
        url={repoData.githubUrl}
        description={repoData.description}
        stars={repoData.stars}
      />
    )
  });

  return (
    <div className="App" data-testid="app">
      <header className="App-header">
        <h1 className="h1">Trending Repositories</h1>
      </header>
      <section className="container">
        <div className="box">
          <div className="box-header">
            <div className="tab">
              <button
                data-testid="repo-button"
                onClick={() => setRepo('repositories')}
              >
                Repositories
              </button>
              <button
                data-testid="starred-repo-button"
                onClick={() => setRepo('starredRepositories')}
              >
                <span>&#9733;</span>
                Repositories
              </button>
            </div>
          </div>
          {repos}
        </div>
      </section>
    </div>
  );
}

export default App;
