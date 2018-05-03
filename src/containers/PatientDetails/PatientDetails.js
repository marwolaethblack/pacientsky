import React, { Component } from 'react';
import axios from 'axios';

class PatientDetails extends Component {

    state = {
        patient: {},
        loading: false
    }

    async componentDidMount() {
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

    render() {
        return(
            <div className="header-margin">
                <p>{this.state.patient.fullName}</p>
            </div>
        )
    }
}

export default PatientDetails;