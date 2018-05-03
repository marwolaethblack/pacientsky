import React from 'react';
import PropTypes from 'prop-types';
import GenericButton from '../GenericButton/GenericButton';

const PaginationControls = (props) => {
    const { changePage, currentPage } = props;
    return(
        <div className="pagination-controls">
            <GenericButton onClick={() => changePage(-5)}><strong>&lt; &lt;</strong></GenericButton>
            <GenericButton onClick={() => changePage(-1)}><strong>&lt;</strong></GenericButton>
            <span className="page-number">{currentPage}</span>
            <GenericButton onClick={() => changePage(1)}><strong>&gt;</strong></GenericButton>
            <GenericButton onClick={() => changePage(5)}><strong>&gt; &gt;</strong></GenericButton>
        </div>
    );
}

PaginationControls.propTypes = {
    changePage: PropTypes.func.isRequired,
    currentPage: PropTypes.number

}


export default PaginationControls;