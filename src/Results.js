import React, { Component } from 'react';

class Results extends Component {
  getOptions=(props)=> {
    if(this.props.data) {
      return (
        this.props.data.map((option, i) => {
          return (<li className='list-item' key={ Date.now() * Math.random() }>{option.venue.name}</li>)
        })
      )
    }
  }

  render() {
    return (
      <div className='results'>
        <ul className='list'>
          {this.getOptions()}
        </ul>
      </div>
    );
  }
}

export default Results;
