import React, { Component } from 'react';
import axios from 'axios';

import GenericList from '../../components/GenericList/GenericList';
import GenericForm from '../../components/GenericForm/GenericForm';
import LinkWrapComponent from '../../components/LinkWrapComponent/LinkWrapComponent';
import SearchResults from '../../components/SearchResults/SearchResults';
import SearchForm from '../../components/SearchForm/SearchForm';

class Patients extends Component {

    state = {
        patients: [],
        page: 1,
        pages: 1,
        loading: true,
        searchResults: [],
        searchResultsVisible: false
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
                this.setState(prevState => {
                    return {
                        ...prevState,
                        loading: false
                    }
                });
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

    render() {

        let Lwc = LinkWrapComponent("/patients");
        let list = null;
        if (this.state.loading) {
            list = <p>Loading...</p>
        } else {
            list = <GenericList WrapComponent={Lwc} propertiesToDisplay={["fullName","email", "birthday", "phone"]} list={this.state.patients} />;
        }

        const formConfig = [
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

        return (
            <div >
                <button onClick={() => { this.changePage(1) }}>AAAA</button>
                <h1>Patients</h1>
                <SearchForm config={formConfig} />
                <SearchResults results={this.state.searchResults} WrapComponent={Lwc} visible={this.state.searchResultsVisible} propertiesToDisplay={["fullName", "email", "phone"]}/>
                {list}
            </div>
        )
    }
}

export default Patients;