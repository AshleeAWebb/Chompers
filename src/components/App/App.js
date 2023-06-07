import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import '../App/App.css';
import '../../assets/fonts/font.css';
import Header from '../Header/Header';
import { fetchSeasons } from '../Api/apiCalls';
import EpisodesGrid from '../EpisodesGrid/EpisodesGrid';
import Home from '../Home/Home';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seasons: [],
      error: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    fetchSeasons()
      .then((seasonsData) => {
        this.setState({ seasons: seasonsData, isLoading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  render() {
    const { seasons, error, isLoading } = this.state;

    return (
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
                  <EpisodesGrid {...props}/>
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
