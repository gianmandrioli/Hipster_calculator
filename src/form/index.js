import React from 'react'
import './style.scss';

export default class Form extends React.Component {
  constructor(props){
    super(props)
  }
    handleClick = () => {
      this.props.clickHandler(this.props.value);
    }


  render() {

  
    return (
  
      <button onClick={() => this.props.inputDigit(this.props.value)} className={this.props.clase} >{this.props.value}</button>
     
    )
  }
} 