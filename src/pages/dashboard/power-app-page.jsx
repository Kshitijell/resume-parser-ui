import React, { useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PowerAppsPage = () => {

    const goBack = () => {
        window.history.back();
    };

    return (
        <div>
            <IconButton
                sx={{ padding: '5px', margin: '10px' }}
                onClick={goBack}
                aria-label="back"
                title='Back to selection'
            >
                <ArrowBackIcon />
            </IconButton>
            
            {/* Box component for styling */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', marginTop: '20px' }}>
                <iframe 
                    src="https://web.powerapps.com/webplayer/iframeapp?source=iframe&appId=/providers/Microsoft.PowerApps/apps/504422d8-9483-48d3-8a08-4aa1ccb39087&appsource=react" 
                    style={{ width: '100%', height: '100%', border: 'none' }} 
                    title="PowerApps"
                />
            </Box>
        </div>
    );
};

export default PowerAppsPage;
