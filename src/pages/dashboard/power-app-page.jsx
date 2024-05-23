import React, { useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PowerAppsPage = () => {
    useEffect(() => {
        const handleMessage = (event) => {
            if (event.origin !== 'https://web.powerapps.com') {
                return;
            }
            // Handle the message from the iframe
            console.log('Received message from iframe:', event.data);
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

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
            <iframe
                width='100%'
                height='750px'
                src="https://web.powerapps.com/webplayer/iframeapp?source=iframe&appId=/providers/Microsoft.PowerApps/apps/504422d8-9483-48d3-8a08-4aa1ccb39087&appsource=react"
                title="PowerApps"
            />
        </div>
    );
};

export default PowerAppsPage;
