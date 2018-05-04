import React from 'react';
import { Link } from "react-router-dom";

//WrapComponent creator for GenericList
//Returns a wrap component that wraps every list item in GenericList with a link with configurable location
const LinkWrapComponent = (linkLocation) => {
    return (props) => {
        return(
            <Link className="result-link" to={`${linkLocation}/${props.id}/details`}>
                {props.children}
            </Link>
        )
    }
}

export default LinkWrapComponent;

