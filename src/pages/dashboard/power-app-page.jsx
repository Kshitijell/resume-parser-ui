import React from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PowerAppsPage = () => (
    <div>
        <IconButton sx={{ padding: '5px', margin: '10px' }} onClick={() => window.history.back()} aria-label="back" title='Back to selection'>
            <ArrowBackIcon />
        </IconButton>
        <iframe
            width='100%' height='750px' src="https://web.powerapps.com/webplayer/iframeapp?source=iframe&appId=/providers/Microsoft.PowerApps/apps/504422d8-9483-48d3-8a08-4aa1ccb39087&appsource=react"
        />
    </div>
);

export default PowerAppsPage;
