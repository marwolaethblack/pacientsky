import React, { Component } from 'react';
import GenericButton from '../GenericButton/GenericButton';


//GenericForm takes in an array of objects as its configuration such as
// [
//     {
//         property: "firstName",
//         label: "First Name: ",
//         input: {
//             type: 'text',
//             placeholder: 'Your first name',
//             onBlur: () => {
//                 console.log("Blur")
//             }
//         }
//     },
//     ....
// ]
// The property field will be the name of the state property of that input
// e.g. property: "firstName" for a text input will have a state of { firstName: "value of input"}
// The input property is distributed as props to the input so you can write in properties as if you would write props to a normal html input
// e.g. input: {
//     type: 'text',
//     placeholder: "Placeholder",
//     onFocus: () => {
//         console.log("Focus")
//     }
// } is the same as <input type="text" placeholder="Placeholder" onFocus={() => console.log("Focus")}
// The input field also takes in a special afterChange property which is a method that is executed every time you type in the input field
// To handle submitting the form just pass in an onSubmit prop same as with a regular form, 
// the method which you pass in as the onSubmit prop will get 2 arguments -the event and the current state of the form
// If no onSubmit prop is passed in, no submit button will appear. Useful for e.g search input.
// initialState prop can also be supplied


class GenericForm extends Component {
    constructor(props) {
        super(props);
        if (this.props.initialState) {
            this.state = props.initialState;
        } else {
            let iState = {};
            props.config.forEach(el => {
                iState[el.property] = "";
            })
            this.state = { ...iState };
        }

    }

    renderForm = () => {
        const { config } = this.props;
        let form = config.map((configObj, i) => {

            let changeHandler = (e, configObj) => {
                const eValue = e.target.value;
                this.setState(prevState => {
                    let newState = { ...prevState };
                    newState[configObj.property] = eValue;
                    if (configObj.afterChange) {
                        configObj.afterChange(newState);
                    }
                    return {
                        ...newState
                    }
                })
                
            }


            return (
                <div key={i}>
                    <label>{configObj.label}
                        <input {...configObj.input} value={this.state[configObj.property]}
                            onChange={(e) => { changeHandler(e, configObj) }} />
                    </label>
                </div>
            )
        })
        return form;
    }

    render() {
        let submit = null;
        if(this.props.onSubmit) {
            submit = (<GenericButton>Submit</GenericButton>)
        }
        return (
            <form className={this.props.className} onSubmit={(e) => this.props.onSubmit(e, this.state)}>
                {this.renderForm()}
                {submit}
            </form>
        )
    }
}

export default GenericForm;