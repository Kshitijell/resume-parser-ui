import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardContent, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { adminBackgroundImage } from 'src/assets/images';
import { CustomTabPanel } from 'src/components/custom-tab-panel';
import Organizationform from './organization';
import Userform from './user';
import Agencyform from './agency';
import Overview from './overview';


const Configpage = () => {
    const window_1 = <Organizationform />
    const window_3 = <Agencyform />
    const window_2 = <Userform />
    // const overview = <Overview />

    return (
        <>
            <Box
                sx={{
                    height: '-webkit-fill-available',
                    backgroundImage: `url(${adminBackgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    padding: '15px',
                }}
            >
                <Box sx={{
                    height: '100%',
                    borderRadius: '11px',
                    borderradius: '11px',
                    background: 'rgba(246, 248, 253, 0.65)',
                    boxShadow: ' 0px 4px 34.3px 2px rgba(30, 45, 87, 0.24)',
                    display: 'flex',
                    padding: '20px',
                    justifyContent: "space-evenly",
                }}>

                    <Card
                        sx={{
                            padding: '10px',
                            borderRadius: '10px',
                            boxShadow: 3,
                            width: '100%',
                            height: '100%',
                        }} >
                        <CardContent sx={{ padding: 0 }}>
                            <IconButton onClick={() => window.history.back()} aria-label="back" title='Back to selection'>
                                <ArrowBackIcon />
                            </IconButton>
                            <CustomTabPanel item_1={window_1} item_2={window_2} item_3={window_3} />
                        </CardContent>
                    </Card>
                </Box>
            </Box >
        </>
    );
};

export default Configpage;
