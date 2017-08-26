import React from 'react';
import PropTypes from 'prop-types';

export const LoadingIndicator = (props) => {
    return (
        <div className='search-books-results-loading' style={{display: props.display ? 'flex' : 'none'}} />
    );
};

LoadingIndicator.PropTypes = {
    display: PropTypes.bool.isRequired
}

export default LoadingIndicator;