import React, { Component } from 'react'
import axios from 'axios';
import Search from '../../components/Search/Search';
import GenericButton from '../../components/GenericButton/GenericButton';
import SelectWrapComponent from '../../components/WrapComponents/SelectWrapComponent/SelectWrapComponent';

class Medicine extends Component {

    constructor(props) {
        super(props);
        this.state = {
            medicineSearchResults: [],
            medicineSearchResultsVisible: false,
            selectedMedicine: {},
            patientSearchResults: [],
            patientSearchResultsVisible: false,
            selectedPatient: {}

        }

        this.PatientWrapComponent = SelectWrapComponent(this.selectHandler, "selectedPatient");
        this.MedicineWrapComponent = SelectWrapComponent(this.selectHandler, "selectedMedicine");

    }

    medicineFormConfig = [
        {
            property: 'query',
            input: {
                type: 'text',
                placeholder: 'Search medicine...',
                onFocus: () => {
                    if (!this.state.medicineSearchResultsVisible) {
                        this.setState(prevState => {
                            return {
                                ...prevState,
                                medicineSearchResultsVisible: true
                            }
                        })
                    }
                },
                onBlur: () => {
                    //Hide the search results
                    setTimeout(() => {
                        if (this.state.medicineSearchResultsVisible) {
                            this.setState(prevState => {
                                return {
                                    ...prevState,
                                    medicineSearchResultsVisible: false
                                }
                            })
                        }
                    }, 200)
                }
            },
            afterChange: (state) => {
                this.searchMedicine(state.query);
            }
        }
    ];

    searchMedicine = (query) => {
        if (query.length > 2) {
            axios.get(`https://fest-searcher.herokuapp.com/api/fest/s/${query}`)
                .then(result => {
                    this.setState(prevState => {
                        return {
                            ...prevState,
                            medicineSearchResults: result.data
                        }
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        }

    }

    patientFormConfig = [
        {
            property: 'query',
            input: {
                type: 'text',
                placeholder: 'Search patients...',
                onFocus: () => {
                    if (!this.state.patientSearchResultsVisible) {
                        this.setState(prevState => {
                            return {
                                ...prevState,
                                patientSearchResultsVisible: true
                            }
                        })
                    }
                },
                onBlur: () => {
                    //Hide the search results
                    setTimeout(() => {
                        if (this.state.patientSearchResultsVisible) {
                            this.setState(prevState => {
                                return {
                                    ...prevState,
                                    patientSearchResultsVisible: false
                                }
                            })
                        }
                    }, 200)
                }
            },
            afterChange: (state) => {
                this.searchPatients(state.query);
            }
        }
    ];

    searchPatients = (query) => {
        if (query.length > 2) {
            axios.get(`/api/patients/search?query=${query}`)
                .then(result => {
                    this.setState(prevState => {
                        return {
                            ...prevState,
                            patientSearchResults: result.data
                        }
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    selectHandler = (propertyName, props) => {
        this.setState(prevState => {
            const newState = {};
            newState[propertyName] = { ...props };
            return {
                ...prevState,
                ...newState
            }
        })
    }

    addMedicineToPatient = async () => {

        try {   
            if (this.state.selectedPatient.id && this.state.selectedMedicine.   id) {
                let patient = await axios.get(`/api/patients/${this.state.selectedPatient.id}`);
                if (patient.data) {
                    let updatedPatient = {...patient.data};
                    let medicine = {...this.state.selectedMedicine};
                    //Delete children to avoid circular referrence
                    delete medicine.children;
                    updatedPatient.medicine.push(medicine);
                    const numOfUpdate = await axios.put(`/api/patients`, updatedPatient);
                    this.props.history.push(`/patients/${updatedPatient.id}/details`);
                } else {
                    throw new Error("Patient not found");
                }
            } else {
                throw new Error("Please selet a patient and medicine");
            }
        }
        catch (err) {
            console.log(err);
        }

    }



    render() {
        return (
            <div className="header-margin">
                <h1 className="page-heading">Search and add medicine to patient</h1>
                <h2 className="page-heading">Select Medicine</h2>
                <Search config={this.medicineFormConfig}
                    results={this.state.medicineSearchResults}
                    visible={this.state.medicineSearchResultsVisible}
                    propertiesToDisplay={["productName", "substanceName"]}
                    WrapComponent={this.MedicineWrapComponent}
                />
                {this.state.selectedMedicine.productName ? <p><strong>Selected medicine: </strong>{this.state.selectedMedicine.productName}</p> : ""}
                <h2 className="page-heading">Select Patient</h2>
                <Search config={this.patientFormConfig}
                    results={this.state.patientSearchResults}
                    visible={this.state.patientSearchResultsVisible}
                    propertiesToDisplay={["fullName", "email", "phone"]}
                    WrapComponent={this.PatientWrapComponent}
                />
                {this.state.selectedPatient.fullName ? <p><strong>Selected patient: </strong>{this.state.selectedPatient.fullName + "\n" + this.state.selectedPatient.email}</p> : ""}
                <div className="delete-button-container add-button">
                    <GenericButton onClick={() => {this.addMedicineToPatient()}}>+ Add medicine to patient</GenericButton>
                </div>
            </div>
        )
    }
}

export default Medicine;