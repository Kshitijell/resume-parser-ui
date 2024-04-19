import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Selectionpage = () => {
    const navigate = useNavigate(); // Move the hook inside the functional component

    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

    return (
        <Box
            sx={{
                height: '100%',
                width: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Card
                sx={{
                    width: '90%',
                    borderRadius: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    height: '90%',
                }}
            >
                <CardContent>
                    <Typography
                        sx={{
                            margin: '20px',
                            padding: '5px',
                            textAlign: 'center'
                        }}
                        variant='h3'
                        color='white'
                    >
                        Please make a selection
                    </Typography>
                    <Grid container justifyContent="center" spacing={2} sx={{ marginTop: '200px' }}>
                        {userDetails?.isAdmin.includes('True') && (
                            <Grid item>
                                <Card
                                    onClick={() => navigate('/config')}
                                    sx={{
                                        padding: '10px',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        borderRadius: '10px',
                                        boxShadow: 3,
                                        width: '450px',
                                        height: '200px'
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h3" color="primary" style={{ marginTop: '50px ' }}>
                                            Admin
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )}
                        {userDetails?.application.includes('Ranker') && (
                            <Grid item>
                                <Card
                                    onClick={() => navigate('/parser')}
                                    sx={{
                                        padding: '10px',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        borderRadius: '10px',
                                        boxShadow: 3,
                                        width: '450px',
                                        height: '200px'
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h3" color="primary" style={{ marginTop: '50px ' }}>
                                            Resume Ranker
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )}
                        {userDetails?.application.includes('Parse') && (
                            <Grid item>
                                <Card
                                    onClick={() => navigate('/power-apps-dashboard')}
                                    sx={{
                                        padding: '10px',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        borderRadius: '10px',
                                        boxShadow: 3,
                                        width: '450px',
                                        height: '200px'
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h3" color="primary" style={{ marginTop: '50px ' }}>
                                            Resume Parser
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )}
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Selectionpage;
