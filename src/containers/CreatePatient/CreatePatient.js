import React, { Component } from 'react';
import axios from 'axios';
import GenericForm from '../../components/GenericForm/GenericForm';

class CreatePatient extends Component {

    formConfig = [
        {
            property: "firstName",
            label: "First Name: ",
            input: {
                type: 'text'
            }
        },
        {
            property: "lastName",
            label: "Last Name: ",
            input: {
                type: 'text'
            }
        },
        {
            property: "fullName",
            label: "Full Name: ",
            input: {
                type: 'text',
                placeholder: "Middlenames included here"
            }
        },
        {
            property: "email",
            label: "Email: ",
            input: {
                type: 'email'
            }
        },
        {
            property: "phone",
            label: "Phone: ",
            input: {
                type: 'tel'
            }
        },
        {
            property: "birthday",
            label: "Birthdate: ",
            input: {
                type: 'date'
            }
        },

    ]

    handleSubmit = async (e, state) => {
        e.preventDefault();
        console.log(state);
        try {
            let newPatient = await axios.post('/api/patients', state);
            this.props.history.push(`/patients/${newPatient.data.id}/details`);
        }
        catch(err) {
            console.log(err);
        }
    }


    render() {
        

        return(
        <div className="header-margin" >
            <h1 className="page-heading">Create a patient</h1>
            <GenericForm config={this.formConfig} onSubmit={this.handleSubmit} />
        </div>)
    }
}

export default CreatePatient;