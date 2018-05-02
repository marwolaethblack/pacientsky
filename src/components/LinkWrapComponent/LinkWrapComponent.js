import React from 'react';
import { Link } from "react-router-dom";

const LinkWrapComponent = (linkLocation) => {
    return (props) => {
        return(
            <Link to={`${linkLocation}/${props.id}`}>
                {props.children}
            </Link>
        )
    }
}

export default LinkWrapComponent;

