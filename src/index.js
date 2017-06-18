import React from 'react';
import ReactDOM from 'react-dom';

function ResultDisplay(props) {
  const resultContainerStyle = {
      height: 100,
      width: 300,
      backgroundColor: "#292929"
    };
  
  return (<div className="result-container" style={resultContainerStyle}>
          {props.result}
          </div>
        );
}

class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  
 
  render() {
    
    const buttonStyle = {
      backgroundColor: "#E0E0E0",
      width: 75,
      height: 60,
      border: "0.5px solid #8E8E8E",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    };
    
    return (<button className="button" style={buttonStyle} onClick={() => this.props.onClick(this.props.value)}>
        <span>{this.props.display}</span>
            </button>
    )
  }
}

class Calculator extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.handleDigit = this.handleDigit.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.handleDot = this.handleDot.bind(this);
    this.handleSign = this.handleSign.bind(this);
    this.handlePercent = this.handlePercent.bind(this);
    this.executeOperation = this.executeOperation.bind(this);
    
    this.state = {
      value: null,
      displayValue : "0",
      waitingForOperand: false,
      operator: null
      
    }
  }
  
  clearDisplay() {
    this.setState({
      displayValue: "0"
    })  
  }
  
  handleDigit(digit) {
    const { displayValue, waitingForOperand } = this.state;
    
    if (waitingForOperand) {
       this.setState({
          displayValue: digit,
          waitingForOperand: false
       });
    }
    else {
      this.setState({
        displayValue: displayValue === "0" ? digit: displayValue + digit
      });
    }
  }
  
  handleDot(dot) {
    const { displayValue, waitingForOperand }  = this.state;
    
    if (waitingForOperand) {
      this.setState({
        displayValue: dot,
        waitingForOperand: false
      })
    } else if (displayValue.indexOf(dot) === -1) {
      this.setState({
        displayValue: displayValue + dot,
        waitingForOperand: false
      })
    }
    
  }
  
  handleSign() {
    const { displayValue } = this.state;
    
    this.setState({
      displayValue: displayValue.charAt(0) === "-" ? displayValue.substr(1) : '-' + displayValue
    })
    
  }
  
  handlePercent() {
    const { displayValue } = this.state;
    const value = parseFloat(displayValue);
    
    this.setState({
      displayValue: String(value / 100)
    })
  }
  
  executeOperation(nextOperator) {
   const { displayValue, operator, value } = this.state;
   const nextValue = parseFloat(displayValue);
    
   const operations = {
     "/" : (prevValue, nextValue) => prevValue / nextValue,
     "*" : (prevValue, nextValue) => prevValue * nextValue,
     "-" : (prevValue, nextValue) => prevValue - nextValue,
     "+" : (prevValue, nextValue) => prevValue + nextValue,
     "=" : (prevValue, nextValue) => nextValue
   };
    
    if (value === null) {
      this.setState({
        value: nextValue
      });
    } else if (operator) {
          const prevValue = value || 0;
          const result = operations[operator](prevValue, nextValue);

          this.setState({
            value: result,
            displayValue: result
          });
      }
    
    this.setState({
        waitingForOperand: true,
        operator: nextOperator
      });
  }
  
  
  render() {
    const calculatorContainerStyle = {
      height: 400,
      width: 300,
      backgroundColor: "#E0E0E0"
    }
    const { displayValue } = this.state;
    
    return ( <div className="calculator-container" style={calculatorContainerStyle}>
              <ResultDisplay result={displayValue}/>
              <div className="buttons">
                <div className="rowOfButtons">
                  <Button value="AC" display="AC" onClick={this.clearDisplay}/>
                  <Button value="+/-" display="&plusmn;" onClick={this.handleSign}/>
                  <Button value="%" display="&#37;" onClick={this.handlePercent}/>
                  <Button value="/" display="&divide;" onClick={this.executeOperation}/>
                </div>
                <div className="rowOfButtons">
                  <Button value="7" display="7" onClick={this.handleDigit}/>
                  <Button value="8" display="8" onClick={this.handleDigit}/>
                  <Button value="9" display="9" onClick={this.handleDigit}/>
                  <Button value="*" display="x" onClick={this.executeOperation}/>
                </div>
                <div className="rowOfButtons">
                  <Button value="4" display="4" onClick={this.handleDigit}/>
                  <Button value="5" display="5" onClick={this.handleDigit}/>
                  <Button value="6" display="6" onClick={this.handleDigit}/>
                  <Button value="-" display="-" onClick={this.executeOperation}/>
                </div>
                <div className="rowOfButtons">
                  <Button value="1" display="1" onClick={this.handleDigit}/>
                  <Button value="2" display="2" onClick={this.handleDigit}/>
                  <Button value="3" display="3" onClick={this.handleDigit}/>
                  <Button value="+" display="+" onClick={this.executeOperation}/>
                </div>
                <div className="rowOfButtons">
                  <Button value="0" display="0" onClick={this.handleDigit}/>
                  <Button value="." display="." onClick={this.handleDot}/>
                  <Button value="=" display="=" onClick={this.executeOperation}/>
                </div>
              </div>
            </div>
        );
  }
}

ReactDOM.render(<Calculator />, document.getElementById('app'));
