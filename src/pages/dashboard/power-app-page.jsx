import React from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PowerAppsPage = () => (
    <Box>

        <IconButton sx={{ padding: '5px', margin: '10px' }} onClick={() => window.history.back()} aria-label="back" title='Back to selection'>
            <ArrowBackIcon />
        </IconButton>
        {/* <iframe
            src="https://apps.powerapps.com/play/e/228140fb-0529-e4b8-b3ca-4d1613a7c5da/a/504422d8-9483-48d3-8a08-4aa1ccb39087?tenantId=b7182a97-d832-4b3a-ab2d-6848149387a3&hint=6dafd70b-a94a-4508-b21c-7cf3a1c5d3af&sourcetime=1711695855614"
            title="HR Onboarding"
            width="100%"
            height="750px"
            frameBorder="0"
        /> */}
        <a target='_blank' href='https://apps.powerapps.com/play/e/228140fb-0529-e4b8-b3ca-4d1613a7c5da/a/504422d8-9483-48d3-8a08-4aa1ccb39087?tenantId=b7182a97-d832-4b3a-ab2d-6848149387a3&hint=6dafd70b-a94a-4508-b21c-7cf3a1c5d3af&sourcetime=1711695855614"
        '>power </a>

    </Box>
);

export default PowerAppsPage;
