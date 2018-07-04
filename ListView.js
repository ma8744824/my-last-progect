import React, { Component } from 'react';
import poweredByFoursquare from '../images/foursquare.png';
import sortBy from 'sort-by';

class ListView extends Component {
  constructor(props) {
    super(props);
    this.openMarker = this.openMarker.bind(this);
    this.state = {
      query: ''
    };
  }

  
  openMarker(e) {
      this.props.markers.map(marker => {
        if (e.target.value === marker.name) {
          this.props.infoWindows.map(infoWindow => {
            if (marker.name === infoWindow.name) {
              console.log(infoWindow.name);
              infoWindow.open(this.props.map, marker);
              if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
              } else {
                marker.setAnimation(window.google.maps.Animation.BOUNCE);
                setTimeout(() => {marker.setAnimation(null);}, 300)
              }
            }
          })
        }
      })
  }
  render() {
    const {places, settingQuery} = this.props;

    
    places.sort(sortBy('name'));
    return (
      <div className="list-view">
        <h1>Manhattan's Museums</h1>
        <input
          type="text"
          placeholder="Search Museums"
          value={ this.state.query }
          onChange={(event) => {
            this.setState({ query: event.target.value });
            settingQuery(event.target.value)}
          }
          role="search"
          aria-labelledby="Search museums"/>
        <ul id="list">
          {places ? (
            places.map(place => {
              return (
                <li key={place.id}>
                  <button
                    className='button'
                    type="button"
                    onClick={this.openMarker}
                    value={place.name}>{place.name}</button>
                </li>
              )
            })
          ): (
            <li>loading</li>
          )}
        </ul>
        <img src={poweredByFoursquare} alt="Powered by foursquare, logo"/>
      </div>
    )
  }
}

export default ListView;
