/* Calculator App */

import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

import NumberButton from './NumberButton';

const buttons = [
  ['7', '8', '9', '/'],
  ['4', '5', '6', '*'],
  ['1', '2', '3', '+'],
  ['C', '0', '=', '-']
];

export default class App extends React.Component {

  constructor() {
    super()
    this.initialState = {
      displayValue: '0',
      operator: null,
      nilai1: '',
      nilai2: '',
      nilaiNext: false
    }
    this.state = this.initialState;
  }

  handleInput = (input) => {
    const { displayValue, operator, nilai1, nilai2, nilaiNext } = this.state;

    switch (input) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        this.setState({
          displayValue: (displayValue === '0') ? input : displayValue + input
        })
        if(!nilaiNext) {
          this.setState({
            nilai1: nilai1 + input
          })
        } else {
          this.setState({
            nilai2: nilai2 + input
          })
        }
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        this.setState({
          nilaiNext: true,
          operator: input,
          displayValue: (operator !== null ? displayValue.substr(0, displayValue.length - 1) : displayValue) + input
        })
        break;

        case '=':
          let hasil = eval(nilai1 + operator + nilai2)
          this.setState({
            displayValue: hasil,
            nilai1: '',
            nilai2: '',
            operator: null,
            nilaiNext: false
          })
          break;

        case 'C':
          this.setState(this.initialState);
          break;
    }

  }

  renderButtons() {
    let layouts = buttons.map((buttonRows, index) => {
      let rowItem = buttonRows.map((buttonItems, buttonIndex) => {
        return <NumberButton
          value={buttonItems}
          handleOnPress={this.handleInput.bind(this, buttonItems)}
          key={'btn-' + buttonIndex} />
      });
      return <View style={styles.inputRow} key={'row-' + index}>{rowItem}</View>
    });

    return layouts;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            {this.state.displayValue}
          </Text>
        </View>

        <View style={styles.inputContainer}>
          {this.renderButtons()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  resultContainer: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  inputContainer: {
    flex: 5,
    backgroundColor: '#3D0075'
  },
  resultText: {
    fontSize: 35,
    color: 'black',
    fontWeight: 'bold',
    padding: 25,
    textAlign: 'right'
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row'
  }
});