import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { adminBackgroundImage } from 'src/assets/images';
import { CustomTabPanel } from 'src/components/custom-tab-panel';
import Organizationform from './organization';
import Userform from './user';
import Agencyform from './agency';


const Configpage = () => {
    const window_1 = <Organizationform />
    const window_3 = <Agencyform />
    const window_2 = <Userform />

    return (
        <>
            <Box
                sx={{
                    height: '-webkit-fill-available',
                    backgroundImage: `url(${adminBackgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    padding: '2%'
                }}
            >
                <Box sx={{
                    height: '100%',
                    borderRadius: '11px',
                    borderradius: '11px',
                    // opacity: '0.11',
                    background: 'rgba(246, 248, 253, 0.65)',
                    boxShadow: ' 0px 4px 34.3px 2px rgba(30, 45, 87, 0.24)',
                    display: 'flex',
                    padding: '25px',
                    justifyContent: "space-evenly",
                }}>

                    <Card sx={{
                        padding: '10px',
                        borderRadius: '10px',
                        boxShadow: 3,
                        width: '100%',
                        height: '100%',
                        marginRight: '10px',
                        paddingTop: "20px"
                    }} style={{ marginBottom: '10px' }}>
                        <div >
                            <IconButton onClick={() => window.history.back()} aria-label="back" title='Back to selection'>
                                <ArrowBackIcon />
                            </IconButton>
                        </div>
                        {/*
                       <Card sx={{
                        padding: '10px',
                        cursor: 'pointer',
                        borderRadius: '10px',
                        boxShadow: 3,
                        width: '450px',
                        height: '100%',
                        marginRight: '10px',
                        paddingTop: "20px"
                    }} style={{ marginBottom: '10px' }}>
                        <div style={{ height: '90%', padding: "10%", display: "flex" }}>
                            <img src={orgnizationImage} alt='admin' />
                        </div>
                        <Button
                            variant="contained"
                            sx={{ width: '100%' }}
                            onClick={handleCreateOrganization}
                        >
                            Create Organization
                        </Button>
                    </Card>
                    <Card sx={{
                        padding: '10px',
                        cursor: 'pointer',
                        borderRadius: '10px',
                        boxShadow: 3,
                        width: '450px',
                        height: '100%',
                        marginRight: '10px',
                        paddingTop: "20px"
                    }} style={{ marginBottom: '10px' }}>

                        <div style={{ height: '90%', padding: "10%", display: "flex" }}>
                            <img src={createUserImage} alt='admin' />
                        </div>
                        <Button
                            variant="contained"
                            sx={{ width: '100%' }}
                            onClick={handleCreateUser}
                        >
                            Create User
                        </Button>
                    </Card>
                    <Card sx={{
                        padding: '10px',
                        cursor: 'pointer',
                        borderRadius: '10px',
                        boxShadow: 3,
                        width: '450px',
                        height: '100%',
                        marginRight: '10px',
                        paddingTop: "20px"
                    }}
                    > <div style={{ height: '90%', padding: "10%", display: "flex" }}>
                            <img src={agencyImage} alt='admin' />
                        </div>
                        <Button
                            variant="contained"
                            sx={{ width: '100%' }}
                            onClick={handleCreateAgency}
                        >
                            Create Agency
                        </Button> 
                        </Card>
                        */}
                        <CustomTabPanel item_1={window_1} item_2={window_2} item_3={window_3} />
                    </Card>

                </Box>
            </Box >
        </>
    );
};

export default Configpage;
