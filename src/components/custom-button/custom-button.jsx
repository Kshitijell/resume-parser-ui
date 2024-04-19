import React from 'react';
import PropTypes from 'prop-types';
import { StyledButton } from './styles';

const CustomSimpleButton = ({ children, ...other }) => (
  <StyledButton {...other}>{children}</StyledButton>
);

export default CustomSimpleButton;

CustomSimpleButton.propTypes = {
  children: PropTypes.node,
};
