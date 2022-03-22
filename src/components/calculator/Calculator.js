import React, { Component } from 'react';

import dataButtons from './dataButtons.json';


// Calculator

export default class Calculator extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            result: "",
            data: dataButtons,
            buttonState: false
        }
    }

    handleClick(e) {
        let buttonDataValue = e.target.attributes[2].value;
        let buttonValue = e.target.textContent;


        if (buttonDataValue === 'number')
            this.setState({
                result: this.state.result.concat(buttonValue),
                buttonState: true
            });

        if (buttonDataValue === 'operator' && this.state.buttonState)
            this.setState({
                result: this.state.result.concat(` ${buttonValue} `), 
                buttonState: false 
            });

        if (buttonDataValue === 'point' && this.state.buttonState)
            this.setState({
                result: this.state.result.concat(buttonValue),
                buttonState: false
            });

        if (buttonDataValue === 'result') 
            this.setState({
                result: eval(this.state.result).toString(),
                buttonState: true
            });

        if (buttonDataValue === 'clear')
            this.setState({
                result: "",
                buttonState: false
            });

        

    }

    onChange(e) {
        
    }

    render() {
        return(
            <div className='calculator'>
                <form className='calculator__form'>
                    <input 
                        type='text' 
                        className='calculator__input' 
                        value={this.state.result} 
                        onChange={this.onChange.bind(this)}
                        />
                </form>
                <CalculatorButtons 
                    data={this.state.data} 
                    handleClick={this.handleClick.bind(this)} 
                    />
            </div>
        );
    }
}

// Calculator Buttons

class CalculatorButtons extends Component {
    render() {
        const { data , handleClick } = this.props;
        return(
            <div className='calculator__buttons'>
                {data.map(value => (
                    <CalculatorButton 
                        value={value} 
                        key={value.id} 
                        handleClick={handleClick} 
                        />
                ))}
            </div>
        );
    }
}

// Calculator Button

class CalculatorButton extends Component {
    render() {
        const { value, handleClick } = this.props;
        return (
            <button 
                className='calculator__button' 
                type='button' 
                data-type={value.dataType}
                onClick={handleClick}
                >
                {value.title}
                </button>
        )
    }
}

