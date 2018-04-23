import React from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");

export const Map = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBOsol7L5Jtc8EwMaUgF6Xv9SudYwUhpaQ&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `700px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={2}
    defaultCenter={{ lat: -43.000, lng: 76.000 }}
  >
    {props.tweets.map(tweet => (
      <div key={tweet.id} >
          <InfoBox
            defaultPosition={new google.maps.LatLng(tweet.lat, tweet.lng)}
            options={{ closeBoxURL: ``, enableEventPropagation: true }}
          >
            <div style={{ backgroundColor: 'white', width: '15rem', height: '8rem', overflowy: 'auto' }}>
              <h3 style={{ padding: '0.5rem 1rem 0 1rem', margin: '0' }}>{tweet.username}</h3>
              <small style={{ padding: '0rem 1rem' }}>@{tweet.login}</small>
              <p style={{ backgroundColor: 'white', padding: '0 1rem', fontSize: '12px', fontColor: '#515151' }}>
                {tweet.content}
              </p>
            </div>
          </InfoBox>
        <Marker position={{ lat: parseFloat(tweet.lat), lng: parseFloat(tweet.lng) }} />
      </div>
    ))}
  </GoogleMap>
))
