import React from 'react';
import PropTypes from 'prop-types';

const ImageFlow = props => {
  const { imageAddrs } = props;
  return (
    <div>
      {imageAddrs.map(addr => (
        <div key={addr}>
          <img src={addr} alt="" />
        </div>
      ))}
    </div>
  )
}

ImageFlow.propTypes = {
  imageAddrs: PropTypes.arrayOf(
    PropTypes.string,
  )
}

ImageFlow.defaultProps = {
  imageAddrs: [],
}

export default ImageFlow;