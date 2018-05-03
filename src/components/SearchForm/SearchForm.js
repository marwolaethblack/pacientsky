import React from 'react';
import GenericForm from '../GenericForm/GenericForm';

const SearchForm = (props) => {
    return (<div className="search-form flex-column-center">
        <GenericForm  {...props} />
    </div>
    )

}

export default SearchForm;
