import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

export default function CompactLayout({ children }) {
  return (
    <Container component="main">
      <Stack
        sx={{
          pt: 3,
          m: 'auto',
          maxWidth: 600,
          height: 1,
          textAlign: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </Stack>
    </Container>
  );
}

CompactLayout.propTypes = {
  children: PropTypes.node,
};
