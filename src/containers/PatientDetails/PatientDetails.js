import React, { Component } from 'react';
import axios from 'axios';

class PatientDetails extends Component {

    state = {
        patient: {}
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        try {
            const patient = await axios.get(`/api/patients/${id}`);
            this.setState(prevState => {
                return {
                    ...prevState,
                    patient
                }
            })
        }
        catch(err) {
            console.log(err);
        }

    }

    render() {
        return(
            <div className="header-margin">{this.state.patient.toString()}</div>
        )
    }
}

export default PatientDetails;