import React, { Component } from 'react';
import axios from 'axios';

import GenericForm from '../../components/GenericForm/GenericForm';
import GenericButton from '../../components/GenericButton/GenericButton';
import GenericList from '../../components/GenericList/GenericList';
import Loader from '../../components/Loader/Loader';

class PatientDetails extends Component {

    state = {
        patient: {},
        loading: false,
        error : ""
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
            this.setState(prevState => {
                return {
                    ...prevState,
                    loading: false,
                    error: "Patient not found"
                }
            })
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
            if(updated.data[0] === 1) {
                await this.getPatientDetails();
            }
        }
        catch(err) {
            console.log(err);
        }

    }

    deletePatient = async () => {
        const { id } = this.props.match.params;
        try {
            let nOfDeleted = await axios.delete(`/api/patients/${id}`);
            if(nOfDeleted.data === 1) {
                this.props.history.push('/');
            }
        }
        catch(err) {
          console.log(err);
          this.setState(prevState => {
              return {
                  ...prevState,
                  error: "Could not delete patient"
              }
          })
        }
        
    }

    WrapComponent = (props) => {
        return (
            <div className="medicine-info">
                {props.children}
            </div>
        )
    }

    render() {
        let form = null;
        if(this.state.loading) {
            form = (<Loader />)
        } else if(!this.state.loading && !this.state.error.length) {
            const initialState = this.state.patient;
            form = (<GenericForm className="generic-form"  config={this.formConfig} initialState={initialState} onSubmit={this.editPatient}/>);
        } else {
            form = (<p>{this.state.error}</p>);
        }
        return(
            <div className="header-margin patient-details-page">
                <h1 className="page-heading">Patient Details</h1>
                <h2 className="page-heading">Edit Patient</h2>
                    {form}
                <h2 className="page-heading">Delete Patient</h2>
                <div className="delete-button-container">
                    <GenericButton onClick={this.deletePatient} className=" generic-button delete-button">Delete</GenericButton>
                </div>
                <h2 className="page-heading">Patient Medication</h2>
                {Object.keys(this.state.patient).length && this.state.patient.medicine.length ? <GenericList WrapComponent={this.WrapComponent} list={this.state.patient.medicine}  propertiesToDisplay={["productName", "substanceName", "atcCatName"]}/> : ""}
            </div>
        )
    }
}

export default PatientDetails;