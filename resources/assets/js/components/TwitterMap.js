import React, { Component } from "react";
import ReactDOM from 'react-dom';
const { Map } = require('./Map');

class TwitterMap extends Component {
  constructor() {
    super();
    this.state = {
        isMarkerShown: true,
        tweets: []
    };
    this.refreshTweets = this.refreshTweets.bind(this);
  }

  componentDidMount() {
      fetch('/api/tweets')
          .then(response => {
              return response.json();
          })
          .then(tweets => {
              this.setState({ tweets });
          });
  }

  refreshTweets() {
      fetch('/api/refresh_tweets')
          .then(response => {
              return response.json();
          })
          .then(tweets => {
              this.setState({ tweets });
          });
  }

  render() {
    return (
      <div>
        <Map
          isMarkerShown={this.state.isMarkerShown}
          tweets={this.state.tweets}
          />
        <button style={{fontSize: '18px', margin: '2rem'}} onClick={this.refreshTweets}>Refresh</button>
      </div>
    )
  }
}

if (document.getElementById('root')) {
    ReactDOM.render(<TwitterMap />, document.getElementById('root'));
}
