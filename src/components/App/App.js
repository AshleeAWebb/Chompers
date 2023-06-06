import React from 'react';
import { Route, Switch } from 'react-router-dom';
import '../App/App.css';
import Header from '../Header/Header';
import { fetchData } from '../Api/apiCalls';
import EpisodesGrid from '../EpisodesGrid/EpisodesGrid';
import Home from '../Home/Home';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      episodes: [],
      error: '',
      isLoading: true,
    };
  }

  getEpisodeData = () => {
    fetchData()
      .then(jsonData => {
        this.setState({ episodes: jsonData, isLoading: false });
      })
      .catch(error => this.setState({ error: error.message }));
  };

  componentDidMount() {
    this.getEpisodeData();
  }


  render() {
    const { error, isLoading, episodes } = this.state;

    if (error) {
      return <h2>Error: {error}</h2>;
    }

    if (isLoading) {
      return <h2>Loading...</h2>;
    }

    return (
      <main className="App">
        <div>
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route
              exact
              path="/episodes"
              render={() => (
                <>
                  <Header />
                  <EpisodesGrid episodes={episodes} />
                </>
              )}
            />
            <Route path="*" render={() => <h2>Error: Page not found</h2>} />
          </Switch>
        </div>
      </main>
    );
  }
}

export default App;
