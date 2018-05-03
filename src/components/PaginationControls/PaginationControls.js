import React from 'react';
import GenericButton from '../GenericButton/GenericButton';

const PaginationControls = (props) => {
    const { maxPages, changePage, currentPage } = props;
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

export default PaginationControls;