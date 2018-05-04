import React from 'react';
import GenericForm from '../GenericForm/GenericForm';
import SearchResults from './SearchResults/SearchResults';

const Search = (props) => {
    return (
        <div>
            <GenericForm className="search-form flex-column-center" {...props}/>
            <SearchResults {...props}/>
        </div>
    )
}

export default Search;