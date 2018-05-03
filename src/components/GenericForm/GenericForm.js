import React, { Component } from 'react';

// }
//     property,
//     label,
//     input :{
//          type: text
//      }
// }

class GenericForm extends Component {
    constructor(props) {
        super(props);
        if(this.props.initialState) {
            this.state = props.initialState;
        } else {
            let iState = {};
            props.config.forEach(el => {
                iState[el.property] = "";
            })
            this.state = {...iState};
        }
        
    }

    renderForm = () => {
        const { config } = this.props;
        let form = config.map((configObj, i) => {
            return (
                <div key={i}>
                    <label>{configObj.label} 
                    <input {...configObj.input} value={this.state[configObj.property]} 
                    onChange={(e) => {
                        const eValue = e.target.value;
                        this.setState(prevState => {
                        let newState = {...prevState};
                        newState[configObj.property] = eValue;
                        return {
                            ...newState
                        }
                    })}}/>
                    </label>
                </div>
            )
        })
        return form;
    }

    render() {
        return(
            <form>
                {this.renderForm()}
            </form>
        )
    }
}

export default GenericForm;