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
                    onClick={() => navigate('/parser')}
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
