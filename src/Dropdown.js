import React, { Component } from 'react';

class Dropdown extends Component {
  getOptions=(props)=> {
    return (
      this.props.options.map((option, i) => {
        return (<option key={ Date.now() * Math.random() } value={option.value}>{option.text}</option>)
      })
    )
  }

  render() {
    const {userSelect, getUserSelection} = this.props
    return (
      <div className='dropdown'>
        <select className='dropdown-menu' value={userSelect} onChange={(event)=> getUserSelection(event.target.value)}>
          {this.getOptions()}
        </select>
      </div>
    );
  }
}

export default Dropdown;
