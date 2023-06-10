import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import '../App/App.css';
import '../../assets/fonts/font.css';
import Header from '../Header/Header';
import { fetchSeasons } from '../Api/apiCalls';
import EpisodesGrid from '../EpisodesGrid/EpisodesGrid';
import Home from '../Home/Home';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import EpisodeDetail from '../EpisodeDetail/EpisodeDetail';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seasons: [],
      error: '',
    };
  }

  componentDidMount() {
    fetchSeasons()
      .then((seasonsData) => {
        this.setState({ seasons: seasonsData});
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  render() {
    const { seasons, error } = this.state;

    return (
      <>
        {error ? (
          <ErrorPage message={error}/>
        ) : (
          <main className="App">
            <div>
              <Switch>
                <Route exact path="/">
                  <Home seasons={seasons} />
                </Route>
                <Route
                  exact
                  path="/episodes/:seasonId"
                  render={(props) => (
                    <>
                      <Header />
                      <EpisodesGrid {...props} message={error}/>
                    </>
                  )}
                />
                <Route
                  exact
                  path="/episode/:id"
                  render={({ match }) => (
                    <>
                    <Header />
                    <EpisodeDetail id={match.params.id} message={error}/>
                    </>
                  )}
                />
                <Route exact path="/error">
                  <ErrorPage message={error}/>
                </Route>
                <Route path="*">
                  <Redirect to="/error" />
                </Route>
              </Switch>
            </div>
          </main>
        )}
      </>
    );
  }
}

export default App;
