import React, { Component } from 'react';
import axios from 'axios';

import GenericForm from '../../components/GenericForm/GenericForm';

class PatientDetails extends Component {

    state = {
        patient: {},
        loading: false
    }

     getPatientDetails = async () => {
        const { id } = this.props.match.params;
        try {
            this.setState(prevState => {
                return {
                    ...prevState,
                    loading: true,
                }
            })
            const patient = await axios.get(`/api/patients/${id}`);
            this.setState(prevState => {
                return {
                    ...prevState,
                    patient: patient.data,
                    loading: false
                }
            })
        }
        catch(err) {
            console.log(err);
        }
    }

    async componentDidMount() {
      await this.getPatientDetails();
    }

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

     editPatient = async (e, state) => {
        e.preventDefault();
        console.log(state.birthday);
        try {
            let updated = await axios.put("/api/patients", state);
            console.log(updated.data);
            if(updated.data[0] === 1) {
                await this.getPatientDetails();
            }
        }
        catch(err) {
            console.log(err);
        }

    }

    render() {
        let form = null;
        if(this.state.loading) {
            form = (<p>Loading...</p>)
        } else {
            const initialState = this.state.patient;
            form = (<GenericForm  config={this.formConfig} initialState={initialState} onSubmit={this.editPatient}/>);
        }
        return(
            <div className="header-margin">
             <h1 className="page-heading">Edit Patient</h1>
                {form}
            </div>
        )
    }
}

export default PatientDetails;