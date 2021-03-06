import React from 'react'
import ReactDOM from 'react-dom'

import './style.scss'

import Button from './components/Button'

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.reset = this.reset.bind(this);
        this.calculate = this.calculate.bind(this);
        this.addDecimal = this.addDecimal.bind(this);
        this.handleKeys = this.handleKeys.bind(this);

        this.state = {
            number: 0,
            operation: '',
            screen: '0',
            firstNull: true,
            isDecimal: false,
            isCalculated: false
        };
    }

    componentDidMount() {
        document.addEventListener("keypress", this.handleKeys, false);
    }

    handleKeys(e) {
        switch (e.keyCode) {
            case 99:
            case 27:
                this.resetButton.click();
                break;
            case 188:
            case 110:
            case 46:
                this.commaButton.click();
                break;
            case 43:
            case 107:
                this.plusButton.click();
                break;
            case 45:
            case 109:
                this.minusButton.click();
                break;
            case 42:
            case 106:
                this.mulButton.click();
                break;
            case 47:
            case 111:
                this.divideButton.click();
                break;
            case 13:
                this.calculateButton.click();
                break;
        }

        if ( e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105 ) {
            this[`buttonNumber_${e.key}`].click();
        }
    }

    handleClick(num) {
        const strNum = num.toString();

        this.setState({
            operation: '',
            isCalculated: false
        });

        this.setState((prevState, props) => {
            if (prevState.number === 0 && this.state.screen === '0' || this.state.isCalculated) {
                return {
                    number: num,
                    screen: strNum,
                }
            }

            if (prevState.number) {
                if (this.state.isDecimal) {
                    return {
                        number: prevState.number + num / 10,
                        screen: this.state.screen += strNum
                    }
                }

                return {
                    number: prevState.number * 10 + num,
                    screen: this.state.screen += strNum
                }
            }

            return {
                number: num,
                screen: this.state.screen += strNum
            }
        });
    }

    prepareOperation(operator) {
        this.setState({
            isCalculated: false
        });

        this.setState((prevState, props) => {
            if (this.state.firstNull && !prevState.screen) {
                this.setState((prevState, props) => {
                    return {
                        number: num,
                        screen: strNum,
                        firstNull: false,

                    }
                })
            }

            if (prevState.operation === operator) {
                return {
                    operation: operator,
                    number: 0,
                    firstNull: true,
                    isDecimal: false,
                }
            } else {
                let string = this.state.screen;

                if (this.state.operation) {
                    string = this.state.screen.slice(0, -1);
                }

                return {
                    operation: operator,
                    screen: string + operator,
                    number: 0,
                    firstNull: true,
                    isDecimal: false,
                }
            }
        });
    }

    addDecimal() {
        if (!this.state.isDecimal) {
            this.setState({
                screen: this.state.screen += '.',
                isDecimal: true
            })
        }
    }

    reset() {
        this.setState({
            number: 0,
            operation: '',
            screen: '0',
            firstNull: true,
            isDecimal: false
        })
    }

    calculate() {
        this.setState({
            screen: +eval(this.state.screen).toFixed(10),
            isCalculated: true
        });
    }

    render() {
        let buttons = [];
        for (let i = 1; i <= 9; i++) {
            buttons.push(
            <Button
                passedRef={(ref) => this[`buttonNumber_${i}`] = ref}
                key={i}
                value={i}
                operation={this.state.operation}
                handleClick={this.handleClick}
              />
            )
        }

        return (
          <div className="calculator">
              <div className="calculator__screen">{ this.state.screen }</div>
              <div className="calculator__buttons">
                  <div className="buttons">
                      <div className="buttons__numbers">
                          {buttons}
                      </div>
                      <div className="buttons__other">
                          <Button
                            value={0}
                            operation={this.state.operation}
                            handleClick={this.handleClick}
                          />
                          <button
                            ref={(ref) => { this.resetButton = ref; }}
                            className="operation_reset"
                            onClick={this.reset}>
                              C
                          </button>
                      </div>
                      <div className="buttons__operations">
                          <button
                            ref={(ref) => { this.plusButton = ref; }}
                            onClick={() => this.prepareOperation('+')}>
                              +
                          </button>
                          <button
                            ref={(ref) => { this.minusButton = ref; }}
                            onClick={() => this.prepareOperation('-')}>
                              -
                          </button>
                          <button
                            ref={(ref) => { this.mulButton = ref; }}
                            onClick={() => this.prepareOperation('*')}>
                              *
                          </button>
                          <button
                            ref={(ref) => { this.divideButton = ref; }}
                            onClick={() => this.prepareOperation('/')}>
                              /
                          </button>
                          <button
                            ref={(ref) => { this.calculateButton = ref; }}
                            className="operation_calculate"
                            onClick={this.calculate}>
                              =
                          </button>
                          <button
                            ref={(ref) => { this.commaButton = ref; }}
                            onClick={this.addDecimal}>
                              .
                          </button>
                      </div>
                  </div>
              </div>
          </div>
        );
    }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);
