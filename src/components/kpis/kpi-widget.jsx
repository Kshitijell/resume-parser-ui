import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import CountUp from 'react-countup';

export default function KpiWidget({ title, icon, color, loading, price }) {
  return (
    <Stack
      spacing={2.5}
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ width: 1, minWidth: 200 }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ position: 'relative' }}>
        {icon && (
          <Box sx={{ width: 50, color, position: 'absolute' }}>
            <img alt="icon" src={icon} />
          </Box>
        )}
        <CircularProgress
          variant={loading ? 'indeterminate' : 'determinate'}
          value={loading ? undefined : 100}
          size={70}
          thickness={2}
          sx={{ color }}
        />
      </Stack>

      <Stack
        container={loading ? 'true' : 'false'}
        spacing={0.5}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 3,
          marginTop: 4,
        }}
      >
        <CountUp start={0} end={price} duration={2}>
          {({ countUpRef }) => <Typography variant="h2" ref={countUpRef} />}
        </CountUp>
        {typeof title === 'string' ? <Typography variant="subtitle2">{title}</Typography> : title}
      </Stack>
    </Stack>
  );
}

KpiWidget.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  loading: PropTypes.bool,
  price: PropTypes.number,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};
