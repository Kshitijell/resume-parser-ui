import React from 'react';
import PropTypes from 'prop-types';
import { StyledLoadingButton } from './styles';

const CustomLoadingButton = ({ children ,loading, ...otherProps }) => (
  <StyledLoadingButton {...otherProps} loading={loading}>{!loading && children}</StyledLoadingButton>
);
export default CustomLoadingButton;

CustomLoadingButton.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
};
