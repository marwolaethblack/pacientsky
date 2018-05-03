//Used with GenericList component
import React from 'react';
import PropTypes from 'prop-types';



const GenericListItem = (props) => {
    const { item, propertiesToDisplay } = props;
    let properties = (<p>Nothing to see here</p>);
    if (propertiesToDisplay) {
        properties = Object.keys(item).map( objKey => {
            if (propertiesToDisplay.includes(objKey)) {
                return (<p key={item.id + Math.random()}><strong>{item[objKey]}</strong></p>)
            }
        })
    } else {
        properties = Object.keys(item).map( objKey => {
            return (<p key={item.id + Math.random()}>{item[objKey].toString()}</p>)
        }) 
    }
    
    return (<li>{properties}</li>)

}


GenericListItem.propTypes = {
    propertiesToDisplay: PropTypes.arrayOf(PropTypes.string),
    item: PropTypes.shape({
        id: PropTypes.any
    }).isRequired
}

export default GenericListItem;