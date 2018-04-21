import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");

const MapConponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBOsol7L5Jtc8EwMaUgF6Xv9SudYwUhpaQ&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `800px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={3}
    defaultCenter={{ lat: -43.000, lng: 76.000 }}
  >
    {props.tweets.map(tweet => (
      <div key={tweet.id} >
        <InfoBox
          defaultPosition={new google.maps.LatLng(tweet.lat, tweet.long)}
          options={{ closeBoxURL: ``, enableEventPropagation: true }}
        >
          <div style={{ backgroundColor: 'white', width: '10rem', height: '5rem', overflowy: 'auto' }}>
            <h2 style={{ padding: '0rem 1rem' }}>{tweet.user.name}</h2>
            <p style={{ backgroundColor: 'white', padding: '0.5rem 1rem', fontSize: '12px', fontColor: '#515151' }}>
              {tweet.content}
            </p>
          </div>
        </InfoBox>
        <Marker position={{ lat: parseFloat(tweet.lat), lng: parseFloat(tweet.long) }} />
      </div>
    ))}
  </GoogleMap>
))

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
      <MapConponent
        isMarkerShown={this.state.isMarkerShown}
        tweets={this.state.tweets}
        />
    )
  }
}

if (document.getElementById('root')) {
    ReactDOM.render(<TwitterMap />, document.getElementById('root'));
}
