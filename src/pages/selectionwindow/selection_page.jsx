import React from 'react';
import Card from '@mui/material/Card';
import { Box, Button, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { adminLogo, parserLogo, rankerLogo, selectionBackgroundImage } from 'src/assets/images';
import './SelectionPage.css';

const Selectionpage = () => {
  const navigate = useNavigate(); // Move the hook inside the functional component
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));

  return (
    <>
      <Box
        className="container"
        sx={{
          backgroundImage: `url(${selectionBackgroundImage})`
        }}
      >
        <Box className="cardContainer">
          {userDetails?.isAdmin.includes('true') && (
            <Card className="card">
              <CardContent className="cardContent">
                <div className='imageContainer'>
                  <img src={adminLogo} alt="admin" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    size="large"
                    className="cardButton"
                    onClick={() => navigate('/admin')}
                  >
                    Admin
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          {userDetails?.application.includes('Ranker') && (
            <Card className="card">
              <CardContent className="cardContent">
                <div className='imageContainer'>
                  <img src={rankerLogo} alt="ranker" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    size="large"
                    className="cardButton"
                    onClick={() => navigate('/ranker')}
                  >
                    Ranker
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          {userDetails?.application.includes('Parse') && (
            <Card className="card">
              <CardContent className="cardContent">
                <div className='imageContainer'>
                  <img src={parserLogo} alt="parser" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    size="large"
                    className="cardButton"
                    onClick={() => window.open(
                      'https://apps.powerapps.com/play/e/228140fb-0529-e4b8-b3ca-4d1613a7c5da/a/504422d8-9483-48d3-8a08-4aa1ccb39087?tenantId=b7182a97-d832-4b3a-ab2d-6848149387a3&hint=6dafd70b-a94a-4508-b21c-7cf3a1c5d3af&sourcetime=1714472671911',
                      '_self'
                    )}
                    // onClick={() => navigate('/parser')}
                  >
                    Parser
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Selectionpage;
