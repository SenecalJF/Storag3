import React, { useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';

import ItemList from './ItemList';

const Navbar = (props) => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '25%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label='lab API tabs example'>
            <Tab label='List items' value='1' />
            <Tab label='Item Two' value='2' />
          </TabList>
        </Box>
        <TabPanel value='1'>
          {' '}
          <ItemList />{' '}
        </TabPanel>
        <TabPanel value='2'></TabPanel>
      </TabContext>
    </Box>
  );
};

export default Navbar;
