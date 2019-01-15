import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locationText: '',
      lat: null,
      long: null,
    }
  }

componentDidMount() {
  this.getLocation();
}

getLocation = ()=> {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(this.updatePosition, this.handleDecline);
  } else {
    this.handleNoGeo();
  }
}

updatePosition = (position)=> {
  this.setState({
    lat: position.coords.latitude,
    long: position.coords.longitude
  })
  this.getResponse();
}

handleDecline = (error)=> {
  this.setState({locationText: 'We couldn\'t find your location. Please enter city name.'})
}

getResponse() {
  fetch('https://api.foursquare.com/v2/venues/explore?client_id=FKCFZTAEROJJDMGZSLU15CJ4ACT0PO2CNRPIROXIDRS10Q3X&client_secret=2MJEL0S4I31QEIRXBIHFHX5ILUCBFUSIADVZ0C4LJ0YEG3LK&v=20180323&limit=1&ll='+this.state.lat+','+this.state.long+'&query=coffee')
  .then((response)=> {
    return(response.json());
  })
  .then((response)=> {
    console.log(response.response.headerFullLocation)
    this.setState({locationText: 'Welcome to ' + response.response.headerFullLocation})
  })
  .catch(function(error) {
    console.log(error)
  });
}

handleNoGeo = ()=> {
  this.setState({locationText: 'Geolocation is not supported by this browser, please enter city name.'})
}

handleEnter() {
  window.location.href='https://foursquare.com/oauth2/authenticate?client_id=FKCFZTAEROJJDMGZSLU15CJ4ACT0PO2CNRPIROXIDRS10Q3X&response_type=token&redirect_uri=https://devinmarieb.github.io/foursquare/'
}

  render() {
    return (
      <div className="App">
        <h1>Foursquare Code Challenge</h1>
        // <p id="location">{this.state.locationText}</p>
        <button onClick={()=> this.handleEnter()}>Enter</button>
      </div>
    );
  }
}

export default App;
