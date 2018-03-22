import React from 'react';
import Table from '../table';
import Form from '../form';
import './style.scss';

export default class App extends React.Component {
  constructor(){
    super();
    this.state={
      displayValue: "0"
    }
    this.inputDigit = this.inputDigit.bind(this);
    this.inputDot = this.inputDot.bind(this);
  
  }

  state = {
    value: null,
    value2: null,
    displayValue: '0',
    waitingForOperand: false,
    operator:null,
    resultado: null,
    memory: null,
    history: [],
    historytotal: [],


  }
  inputDigit (digit) {
    const { displayValue, waitingForOperand, value, operator, resultado, memory, history, value2 } = this.state

    if(waitingForOperand && digit === "="){
      if(this.state.operator == "*"){
        
        this.setState({
          value2: this.state.displayValue,
          displayValue: Number(this.state.value * this.state.displayValue),
          resultado: Number(this.state.value * this.state.displayValue),
          waitingForOperand: false,
          history: String(this.state.value) + String(this.state.operator) + String(this.state.displayValue) + "=" + String(Number(this.state.value * this.state.displayValue)),
          
        })
      } else if (this.state.operator == "-") {
        this.setState({
          value2: this.state.displayValue,
          displayValue: Number(this.state.value - this.state.displayValue),
          resultado: Number(this.state.value - this.state.displayValue),
          waitingForOperand: false,
          history: String(this.state.value) + String(this.state.operator) + String(this.state.displayValue) + "=" + String(Number(this.state.value * this.state.displayValue)),

        })
      } else if (this.state.operator == "/") {
        this.setState({
          value2: this.state.displayValue,
          displayValue: Number(this.state.value / this.state.displayValue),
          resultado: Number(this.state.value / this.state.displayValue),
          waitingForOperand: false,
          history: String(this.state.value) + String(this.state.operator) + String(this.state.displayValue) + "=" + String(Number(this.state.value * this.state.displayValue)),

        })
      } else if (this.state.operator == "+") {
        this.setState({
          value2: this.state.displayValue,
          displayValue: Number(this.state.value) + Number(this.state.displayValue),
          resultado: Number(this.state.value) + Number(this.state.displayValue),
          waitingForOperand: false,
          history: String(this.state.value) + String(this.state.operator) + String(this.state.displayValue) + "=" + String(Number(this.state.value * this.state.displayValue)),

        })
      }         
    }else if (digit == "M"){
      this.setState({
        memory: this.state.displayValue
      })
    } else if (digit == "MR"){
      this.setState({
        displayValue: memory,
       })
    }else if (digit == "MD"){
      this.setState({
        memory: "0",
      })

    }else if (digit == "DEL") {
      this.setState({
        displayValue: displayValue.slice(0, -1),
      })
  }
  

    

    if (digit === '.'){
     if (displayValue.indexOf('.') === -1) {
        if(waitingForOperand) {
          this.setState({
            displayValue: String(digit),
            waitingForOperand: false
          })
        }
        this.setState({
          displayValue: displayValue + '.'
        })
      }
    } else if (digit == "M") {
      this.setState({
        memory: this.state.displayValue
      })
    } else if (digit == "MR") {
      this.setState({
        displayValue: memory,
      })
    } else if (digit == "MD") {
      this.setState({
        memory: "0",
      })

    } else if (digit == "DEL") {
      this.setState({
        displayValue: displayValue.slice(0, -1),
      })
    } else if (digit === 'x') {
      this.setState({
        waitingForOperand: true,
        value: displayValue,
        displayValue:"0",
        operator: "*",
        
      })
    } else if (digit === '÷') {
      this.setState({
        waitingForOperand: true,
        value: displayValue,
        displayValue: "0",
        operator: "/",
      })
    } else if (digit === '+') {
      this.setState({
        waitingForOperand: true,
        value: displayValue,
        displayValue: "0",
        operator: "+",
      })
    } else if (digit === '-') {
      this.setState({
        waitingForOperand: true,
        value: displayValue,
        displayValue: "0",
        operator: "-",
      })
    } else if(digit === 'AC'){
      this.setState({
        value: null,
        value2: null,
        displayValue: '0',
        waitingForOperand: false,
        operator: null,
        resultado: null,

      })
    } else if (digit === '±') {
      this.setState({
        displayValue: displayValue.charAt(0) === '-' ? displayValue.substring(1) : '-' + displayValue
      })
    } else if (digit === '%') {
      const value = parseFloat(displayValue)
      this.setState({
        displayValue: String(value / 100)
      
      })
    }

    else if (digit != '=') {
      this.setState({
       displayValue: displayValue === '0' ? String(digit) :displayValue + digit
        })

     }
    }

  inputDot(){
    const { displayValue } = this.state
    if (displayValue.indexOf('.') === -1) {
      this.setState({
        displayValue: displayValue + '.'
      })
    }
  }

  render() {
    const { displayValue } = this.state

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h1 className="displaynumbers">{displayValue}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <Form value="M" clase="boton arriba" inputDigit={this.inputDigit} />
          </div>
          <div className="col-3">
            <Form value="MR" clase="boton arriba" inputDigit={this.inputDigit} />
          </div>
          <div className="col-3">
            <Form value="MD" clase="boton arriba" inputDigit={this.inputDigit} />
          </div>
          <div className="col-3">
            <Form value="DEL" clase="boton arriba" inputDigit={this.inputDigit} />
          </div>
        </div>
        <div className="row">
          <div className="col-3"> 
            <Form value="AC" clase="boton arriba" inputDigit={this.inputDigit}  />
          </div>
          <div className="col-3">
            <Form value="±" clase="boton arriba" inputDigit={this.inputDigit} />
          </div>
          <div className="col-3">
            <Form value="%" clase="boton arriba" inputDigit={this.inputDigit}/>
          </div>
          <div className="col-3">
            <Form value="÷" clase="operadores boton" inputDigit={this.inputDigit}/>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <Form value="7" clase="boton" inputDigit={this.inputDigit}  />
          </div>
          <div className="col-3">
            <Form value="8" clase="boton" inputDigit={this.inputDigit}/>
          </div>
          <div className="col-3">
            <Form value="9" clase="boton" inputDigit={this.inputDigit}/>
          </div>
          <div className="col-3">
            <Form value="x" clase="operadores boton" inputDigit={this.inputDigit}/>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <Form value="4" clase="boton" inputDigit={this.inputDigit}/>
          </div>
          <div className="col-3">
            <Form value="5" clase="boton" inputDigit={this.inputDigit}/>
          </div>
          <div className="col-3">
            <Form value="6" clase="boton" inputDigit={this.inputDigit}/>
          </div>
          <div className="col-3">
            <Form value="-" clase="operadores boton" inputDigit={this.inputDigit}/>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <Form value="1" clase="boton" inputDigit={this.inputDigit}/>
          </div>
          <div className="col-3">
            <Form value="2" clase="boton" inputDigit={this.inputDigit}/>
          </div>
          <div className="col-3">
            <Form value="3" clase="boton"  inputDigit={this.inputDigit} />
          </div>
          <div className="col-3">
            <Form value="+" clase="operadores boton" inputDigit={this.inputDigit}/>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <Form value="0" clase="boton"  inputDigit={this.inputDigit}/>
          </div>
          
          <div className="col-3">
            <Form value="." clase="boton" inputDigit={this.inputDigit}  />
          </div>
          <div className="col-3">
            <Form value="=" clase="operadores boton" inputDigit={this.inputDigit}/>
          </div>
        </div>
        
        </div>
    )
  }
}