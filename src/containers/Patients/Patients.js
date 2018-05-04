import React, { Component } from 'react';
import axios from 'axios';  

import GenericList from '../../components/GenericList/GenericList';
import LinkWrapComponent from '../../components/LinkWrapComponent/LinkWrapComponent';
import GenericButton from '../../components/GenericButton/GenericButton';
import PaginationControls from '../../components/PaginationControls/PaginationControls';
import Search from '../../components/Search/Search';
import Loader from '../../components/Loader/Loader';


class Patients extends Component {

    constructor(props) {
        super(props);
        this.state = {
            patients: [],
            page: 1,
            pages: 1,
            loading: true,
            searchResults: [],
            searchResultsVisible: false
        }

    }
    

    fetchPage = (pageToFetch) => {
        this.setState(prevState => {
            return {
                ...prevState,
                loading: true
            }
        });
        axios.get(`/api/patients?page=${pageToFetch}`)
            .then(response => {
                if(response.data == null) {
                    return;
                }
                let patients = response.data.result;
                this.setState(prevState => {
                    return {
                        ...prevState,
                        patients,
                        pages: response.data.pages,
                        page: pageToFetch,
                        loading: false
                    }
                });
            }).catch(err => {
               console.log(err);
            });
    }

    componentDidMount() {
        this.fetchPage(this.state.pages);
    }

    changePage = (pagesToMove) => {
        const currentPage = this.state.page;
        const maxPage = this.state.pages;
        const minPage = 1;
        if (currentPage + pagesToMove > maxPage || currentPage + pagesToMove < minPage) {
            return;
        }

        this.fetchPage(currentPage + pagesToMove);
        window.scrollTo(0,0);
    }

    search = (query) => {
        if (query.length > 2) {
            axios.get(`/api/patients/search?query=${query}`)
                .then(result => {
                    this.setState(prevState => {
                        return {
                            ...prevState,
                            searchResults: result.data
                        }
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        }

    }

    formConfig = [
        {
            property: 'query',
            input: {
                type: 'text',
                placeholder: 'Search patients...',
                onFocus: () => {
                    if(!this.state.searchResultsVisible) {
                        this.setState(prevState => {
                            return {
                                ...prevState,
                                searchResultsVisible: true
                            }
                        })
                    }
                },
                onBlur: () => {
                    if(this.state.searchResultsVisible) {
                        this.setState(prevState => {
                            return {
                                ...prevState,
                                searchResults: [],
                                searchResultsVisible: false
                            }
                        })
                    }
                }
            },
            afterChange: (state) => {
                this.search(state.query);
            }
        }
    ];

    render() {

        let Lwc = LinkWrapComponent("/patients");
        let list = null;
        if (this.state.loading) {
            list = <Loader />
        } else {
            list = <GenericList className="patient-list" WrapComponent={Lwc} propertiesToDisplay={["fullName","email", "phone","birthday"]} list={this.state.patients} />;
        }

        return (
            <div className="header-margin">
                <h1 className="page-heading">Patients  <GenericButton onClick={() => this.props.history.push("/patients/create")}>+ Add a patient</GenericButton></h1>
                <Search config={this.formConfig} 
                        results={this.state.searchResults} 
                        WrapComponent={Lwc} 
                        visible={this.state.searchResultsVisible} 
                        propertiesToDisplay={["fullName", "email", "phone"]} 
                />
                {list}
                <PaginationControls currentPage={this.state.page} maxPages={this.state.pages} changePage={this.changePage} />
            </div>
        )
    }
}

export default Patients;