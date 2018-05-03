import React, { Component } from 'react'
import GenericForm from '../../components/GenericForm/GenericForm';

class Medicine extends Component {
    render() {
        const config = [
            {
                property: 'firstName',
                label: 'First Name',
                input : {
                    type: 'text',
                    placeholder: 'Your first name'
                }
            },
            {
                property: 'lastName',
                label: 'Last Name',
                input: {
                    type: 'text'
                }
            }
        ]

        return(
            <div className="header-margin">
                Medicine
                <GenericForm config={config} />
            </div>
        )
    }
}

export default Medicine;