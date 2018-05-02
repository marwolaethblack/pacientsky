//GenericList Component
//The "list" prop is an array of objects with properties you want to display
//The "propertiesToDisplay" is an array where each el is a string that is the name of the property in the item object which you want to display
//e.g. const list = [{ name: "John", age: 35}, { name: "Ben", age: 35}]
//     const propertiesToDisplay = ["name"]
//This will display only the name property in the list item and not the age property
//If properties to display is empty it will display all the objects properties
//propertiesToDisplay displays properties in the order that you defined them 
//See propTypes declaration for more info about props for this component

//If a wrapComponent prop is specified, each list item will be wrapped in that component and have all the oitem properties distributed as props
//if not the wrapping el is a div

import React from 'react';
import PropTypes from 'prop-types';
import GenericListItem from './GenericListItem/GenericListItem';


const GenericList = (props) => {
    const { list, propertiesToDisplay, WrapComponent} = props;
    let listItems = null;
    listItems = list.map(li => {
        if (WrapComponent) {
            return (
                <WrapComponent key={li.id} {...li} >
                    <GenericListItem item={li} propertiesToDisplay={propertiesToDisplay} />
                </WrapComponent>
            )
        } else {
            return (
            <div key={li.id}>
                <GenericListItem item={li} propertiesToDisplay={propertiesToDisplay} />
            </div>
            )
        }
    })

    return (
        <ul>
            {listItems}
        </ul>
    )
}


GenericList.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.any
    })).isRequired,
    propertiesToDisplay: PropTypes.arrayOf(PropTypes.string),
    wrapComponent: PropTypes.any
}

export default GenericList;