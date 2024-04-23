import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ item_1, item_2, item_3 }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getTabStyle = (index) => {
    if (index === value) {
      return {
        fontSize: '35px', 
        color: '#2596be',
      };
    } else {
      return {
        fontSize: '20px', 
        color: '#2596be',
      };
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          sx={{ padding: '15px' }}
        >
          <Tab
            label="Organization"
            {...a11yProps(0)}
            sx={{ ...getTabStyle(0), '&:hover': { backgroundColor: 'transparent' } }}
          />
          <Tab
            label="User"
            {...a11yProps(1)}
            sx={{ ...getTabStyle(1), '&:hover': { backgroundColor: 'transparent' } }}
          />
          <Tab
            label="Agency"
            {...a11yProps(2)}
            sx={{ ...getTabStyle(2), '&:hover': { backgroundColor: 'transparent' } }}
          />
        </Tabs>

      </Box>
      <CustomTabPanel value={value} index={0}>
        {item_1}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {item_2}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {item_3}
      </CustomTabPanel>
    </Box>
  );
}
