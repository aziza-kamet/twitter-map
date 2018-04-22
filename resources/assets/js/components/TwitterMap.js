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

  render() {
    return (
      <Map
        isMarkerShown={this.state.isMarkerShown}
        tweets={this.state.tweets}
        />
    )
  }
}

if (document.getElementById('root')) {
    ReactDOM.render(<TwitterMap />, document.getElementById('root'));
}
