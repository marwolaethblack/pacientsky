import React from 'react';


//WrapComponent creator for GenericList
//Returns a wrap component that wraps every list item in GenericList with a div with a custom on click handler
//Usually used for adding clickedItem to state as selectedItem
const SelectWrapComponent = (handler, propertyName) => {
    return (props) => {
        return(
            <div className="result-link" onClick={() => handler(propertyName, props)}>
             {props.children}
            </div>
        )
    }
 }

 export default SelectWrapComponent;
