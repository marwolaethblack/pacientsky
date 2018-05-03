import React, { Component } from 'react';
import axios from 'axios';

import GenericList from '../../components/GenericList/GenericList';
import GenericForm from '../../components/GenericForm/GenericForm';
import LinkWrapComponent from '../../components/LinkWrapComponent/LinkWrapComponent';

class Patients extends Component {

    state = {
        patients: [],
        page: 1,
        pages: 1,
        loading: true,
        searchResults: []
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
                this.setState(prevState => {
                    return {
                        ...prevState,
                        patients: response.data.result,
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
        } else {
            this.setState(prevState => {
                return {
                    ...prevState,
                    searchResults: []
                }
            })
        }


    }

    render() {

        let Lwc = LinkWrapComponent("/patients");
        let list = null;
        if (this.state.loading) {
            list = <p>Loading...</p>
        } else {
            list = <GenericList WrapComponent={Lwc} propertiesToDisplay={["firstName", "lastName", "birthday", "phone"]} list={this.state.patients} />;
        }

        const formConfig = [
            {
                property: 'query',
                label: 'search',
                input: {
                    type: 'text',
                    placeholder: 'Your search query here'
                },
                afterChange: (state) => {
                    this.search(state.query);
                }
            }
        ];

        let sResults = null;
        if(this.state.searchResults.length) {
            sResults = <GenericList WrapComponent={Lwc} list={this.state.searchResults} />
        }


        return (
            <div>
                <button onClick={() => { this.changePage(1) }}>AAAA</button>
                <h1>Patients</h1>
                <GenericForm config={formConfig} />
                {sResults}
                {list}
            </div>
        )
    }
}

export default Patients;