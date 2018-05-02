import React, { Component } from 'react'
import GenericList from '../components/GenericList/GenericList';

class Medicine extends Component {
    render() {
        const list = [{name: "bob", age: 20, id: 5}, {name: "Ben", age: 55, id:6}]
        const propertiesToDisplay = ["name", "age"]
        return(
            <div>
                Medicine
                <GenericList list={list} propertiesToDisplay={propertiesToDisplay}/>
            </div>
        )
    }
}

export default Medicine;