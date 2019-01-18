import React, { Component } from 'react'
import './App.css'
import Dropdown from './Dropdown.js'
import Results from './Results.js'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locationText: 'Finding your location...',
      data: '',
      lat: '',
      long: '',
      section: 'food',
      radius: 1000,
      inputValue: ''
    }
  }

  componentDidMount() {
    this.getLocation()
  }

  getLocation=()=> {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.updatePosition, this.handleDecline)
    } else {
      this.handleNoGeo()
    }
  }

  updatePosition=(position)=> {
    this.setState({
      lat: position.coords.latitude,
      long: position.coords.longitude
    })
    this.getResponse()
  }

  handleDecline=(error)=> {
    this.setState({locationText: 'We couldn\'t find your location. Please enter city name.'})
  }

  getResponse() {
    fetch('https://api.foursquare.com/v2/venues/explore?client_id=Z2LMK4D5LJHTVCMEO2G0OGOLBLSUMSV1BQNPLK45XP4TT0JV&client_secret=NHOLAPTGQ2S1GDWBMZDWVYIATTWUBJGMPE4TPMBTEJCJWR23&v=20180323&limit=10&ll='+this.state.lat+','+this.state.long+'&intent=browse&radius='+ this.state.radius +'&section='+this.state.section)
    .then((response)=> {
      return(response.json());
    })
    .then((response)=> {
      this.setState({
        locationText: 'Welcome to ' + response.response.headerFullLocation,
        data: response.response.groups[0].items
      })
    })
    .catch(function(error) {
      console.log(error)
    });
  }

  updateResponse() {
    fetch('https://api.foursquare.com/v2/venues/explore?client_id=Z2LMK4D5LJHTVCMEO2G0OGOLBLSUMSV1BQNPLK45XP4TT0JV&client_secret=NHOLAPTGQ2S1GDWBMZDWVYIATTWUBJGMPE4TPMBTEJCJWR23&v=20180323&limit=10&near='+this.state.inputValue+'&intent=browse&radius='+ this.state.radius +'&section='+this.state.section)
    .then((response)=> {
      return(response.json());
    })
    .then((response)=> {
      this.setState({
        locationText: 'Welcome to ' + response.response.headerFullLocation,
        data: response.response.groups[0].items
      })
    })
    .catch(function(error) {
      console.log(error)
    });
  }

  handleNoGeo=()=> {
    this.setState({locationText: 'Geolocation is not supported by this browser, please enter city name.'})
  }

  updateUserType=(event)=> {
    this.setState({section: event})
  }

  updateUserRadius=(event)=> {
    this.setState({radius: event})
    console.log(this.state.radius)
  }

  updateValue=(event)=> {
    this.setState({inputValue: event.target.value})
  }


  render() {
    const { locationText, inputValue, data } = this.state
    return (
      <div className='app'>
        <div className='container'>
          <h1 className='title'>{locationText}</h1>
          <p className='subtitle'>Search your location or choose another city:</p>
          <input className='input' value={inputValue} onChange={this.updateValue}/>
          <div className='dropdown-container'>
            <p className='dropdown-category'>Category:</p>
            <Dropdown
              userSelect={this.state.section}
              getUserSelection={this.updateUserType.bind(this)}
              options={[{text: 'Food', value: 'food'}, {text: 'Drinks', value: 'drinks'}, {text: 'Coffee', value: 'coffee'}, {text: 'Shops', value: 'shops'}, {text: 'Arts', value: 'arts'}, {text: 'Outdoors', value: 'outdoors'}, {text: 'Sights', value: 'sights'}, {text: 'Trending', value: 'trending'}, {text: 'Top Picks', value: 'topPicks'}]}
            />
            <p className='dropdown-category'>Distance:</p>
            <Dropdown
              userSelect={this.state.radius}
              getUserSelection={this.updateUserRadius.bind(this)}
              options={[{text: '1,000m', value: 1000}, {text: '5,000m', value: 5000}, {text: '10,000m', value: 10000}]}
            />
            <input className='button' type='button' value='Search' onClick={()=> this.updateResponse()}/>
          </div>
          <Results data={data}/>
        </div>
      </div>
    )
  }
}

export default App;
