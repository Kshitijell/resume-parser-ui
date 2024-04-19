import PropTypes from 'prop-types';
import React from 'react';
import { BootstrapTooltip } from './styles';

const CustomTooltip = (props) => (
  <BootstrapTooltip {...props}>{props?.children}</BootstrapTooltip>
);


export default CustomTooltip;
CustomTooltip.propTypes = {
  children: PropTypes.node,
};
