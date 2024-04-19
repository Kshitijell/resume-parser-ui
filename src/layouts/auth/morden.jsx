import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';

export default function AuthModernLayout({ children }) {
  const renderContent = children;

  return (
    <Stack component="main" direction="column" sx={{height:1}}>
      {renderContent}
    </Stack>
  );
}

AuthModernLayout.propTypes = {
  children: PropTypes.node,
};
