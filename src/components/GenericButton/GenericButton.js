import React from 'react';

const GenericButton = (props) => {
    return(
        <button className="generic-button" {...props}>{props.children}</button>
    )
}

export default GenericButton;