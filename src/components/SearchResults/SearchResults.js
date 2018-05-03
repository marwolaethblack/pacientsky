import React from 'react';
import GenericList from '../GenericList/GenericList';
import { Link } from "react-router-dom";


const SearchResults = (props) => {
    const { results, visible, WrapComponent, propertiesToDisplay } = props;
    let hiddenClass = visible ? "" : "hidden";
    const classes = `${hiddenClass} flex-column-center search-results`
    return (
    <div className={classes} >
        <GenericList WrapComponent={WrapComponent} list={results} propertiesToDisplay={propertiesToDisplay}/>
    </div>
    )
}

export default SearchResults;