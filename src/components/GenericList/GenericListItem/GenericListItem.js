//Used with GenericList component
import React from 'react';
import PropTypes from 'prop-types';



const GenericListItem = (props) => {
    const { item, propertiesToDisplay } = props;
    let properties = null;
    if (propertiesToDisplay) {
        properties = Object.keys(item).map( objKey => {
            if (propertiesToDisplay.includes(objKey)) {
                return (<li key={item.id + Math.random()}>{item[objKey]}</li>)
            }
        })
    } else {
        properties = Object.keys(item).map( objKey => {
             return (<li key={item.id + Math.random()}>{item[objKey]}</li>)
        }) 
    }
    
    return (<ul>{properties}</ul>)

}


GenericListItem.propTypes = {
    propertiesToDisplay: PropTypes.arrayOf(PropTypes.string).isRequired,
    item: PropTypes.shape({
        id: PropTypes.any
    }).isRequired
}

export default GenericListItem;