//GenericList Component
//The "list" prop is an array of objects with properties you want to display
//The "propertiesToDisplay" is an array where each el is a string that is the name of the property in the item object which you want to display
//e.g. const list = [{ name: "John", age: 35}, { name: "Ben", age: 35}]
//     const propertiesToDisplay = ["name"]
//This will display only the name property in the list item and not the age property
//If properties to display is empty it will display all the objects properties
//propertiesToDisplay displays properties in the order that you defined them 
//See propTypes declaration for more info about props for this component

import React from 'react';
import PropTypes from 'prop-types';
import GenericListItem from './GenericListItem/GenericListItem';


const GenericList = (props) => {
    const { list, propertiesToDisplay } = props;
    const listItems = list.map(li => {
        return (
        <div key={li.id}>
            <GenericListItem item={li} propertiesToDisplay={propertiesToDisplay} />
        </div>
    )
    })

    return (
        <div>
            { listItems }
        </div>
    )
}


GenericList.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.any
    })).isRequired,
    propertiesToDisplay: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default GenericList;