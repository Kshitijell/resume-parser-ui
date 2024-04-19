import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';
import { Grid, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Configpage = () => {
    const navigate = useNavigate()
    const handleCreateUser = () => {
        navigate('/config/create-user')
    };

    const handleCreateOrganization = () => {
        navigate('/config/create-organization')
    };

    const handleCreateAgency = () => {
        navigate('/config/create-agency')
    };

    return (
        <>
            <Grid>
                <IconButton sx={{ padding: '5px', margin: '10px' }} onClick={() => window.history.back()} aria-label="back" title='Back to selection'>
                    <ArrowBackIcon />
                </IconButton>
            </Grid>
            <Box
                sx={{
                    height: '100%',
                    width: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#E0FFFF'
                }}
            >
                <Card sx={{
                    width: '90%',
                    borderRadius: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    height: '90%',
                    backgroundColor: '#81D8D0'
                }}>
                    <CardContent>
                        <Grid container justifyContent="center" spacing={2} sx={{ marginTop: '200px' }}>
                            <Grid item>
                                <Card sx={{
                                    padding: '10px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    borderRadius: '10px',
                                    boxShadow: 3,
                                    width: '450px',
                                    height: '200px'
                                }} onClick={handleCreateUser} style={{ marginBottom: '10px' }}>
                                    <CardContent>
                                        <Typography variant="h3" color="primary" style={{ marginTop: '55px' }}>
                                            Create User
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card sx={{
                                    padding: '10px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    borderRadius: '10px',
                                    boxShadow: 3,
                                    width: '450px',
                                    height: '200px'
                                }} onClick={handleCreateOrganization} style={{ marginBottom: '10px' }}>
                                    <CardContent>
                                        <Typography variant="h3" color="primary" style={{ marginTop: '55px' }}>
                                            Create Organization
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card sx={{
                                    padding: '10px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    borderRadius: '10px',
                                    boxShadow: 3,
                                    width: '450px',
                                    height: '200px'
                                }}
                                    onClick={handleCreateAgency}>
                                    <CardContent>
                                        <Typography variant="h3" color="primary" style={{ marginTop: '55px' }}>
                                            Create Agency
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};

export default Configpage;
