import React, { Component } from 'react';

class PatientDetails extends Component {
    render() {
        return(
            <div>{this.props.match.params.id}</div>
        )
    }
}

export default PatientDetails;