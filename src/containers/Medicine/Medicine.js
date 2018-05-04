import React, { Component } from 'react'
import axios from 'axios';
import Search from '../../components/Search/Search';

class Medicine extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            searchResultsVisible: false
        }

    }

    formConfig = [
        {
            property: 'query',
            input: {
                type: 'text',
                placeholder: 'Search medicine...',
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

    search = (query) => {
        if (query.length > 2) {
            axios.get(`https://fest-searcher.herokuapp.com/api/fest/s/${query}`)
                .then(result => {
                    console.log(result);
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
        const config = [
            {
                property: 'firstName',
                label: 'First Name',
                input : {
                    type: 'text',
                    placeholder: 'Your first name'
                }
            },
            {
                property: 'lastName',
                label: 'Last Name',
                input: {
                    type: 'text'
                }
            }
        ]

        return(
            <div className="header-margin">
                <h1 className="page-heading">Medicine</h1>
                <Search config={this.formConfig} 
                        results={this.state.searchResults} 
                        visible={this.state.searchResultsVisible}
                        propertiesToDisplay={["productName", "substanceName"]} 
                />
            </div>
        )
    }
}

export default Medicine;