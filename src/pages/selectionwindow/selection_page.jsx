import React from 'react';
import Card from '@mui/material/Card';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import selectionBackgroundImage from '../../assets/images/selectionPageBackgorund.jpg';
import { adminLogo,parserLogo,rankerLogo } from 'src/assets/images';


const Selectionpage = () => {
  const navigate = useNavigate(); // Move the hook inside the functional component

  const userDetails = JSON.parse(localStorage.getItem('userDetails'));

  return (
    <>
      <Box
        sx={{
          height: '-webkit-fill-available',
          backgroundImage: `url(${selectionBackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          padding: '6% 12%',
        }}
      >
        <Box
          sx={{
            height: '100%',
            borderRadius: '11px',
            borderradius: '11px',
            // opacity: '0.11',
            background: 'rgba(246, 248, 253, 0.65)',

            boxShadow: ' 0px 4px 34.3px 2px rgba(30, 45, 87, 0.24)',

            display: 'flex',
            padding: '25px',
            justifyContent:"space-evenly"
          }}
        >
          {userDetails?.isAdmin.includes('True') && (
            <Card
              sx={{
                padding: '10px',
                cursor: 'pointer',
                borderRadius: '10px',
                boxShadow: 3,
                width: '450px',
                height: '100%',
                marginRight: '10px',
                paddingTop:"20px"
              }}
            >
              {/* <Logo/> */}
              <div style={{ height: '90%',padding:"10%",display:"flex" }}>
              <img src={adminLogo} alt='admin'/>
              </div>
              <Button
                variant="contained"
                sx={{ width: '100%' }}
                onClick={() => navigate('/config')}
              >
                Admin's Area
              </Button>
            </Card>
          )}
          {userDetails?.application.includes('Ranker') && (
            <Card
              sx={{
                padding: '10px',
                cursor: 'pointer',
                borderRadius: '10px',
                boxShadow: 3,
                width: '450px',
                height: '100%',
                marginRight: '10px',
                paddingTop:"20px"
              }}
            >
              <div style={{ height: '90%',padding:"10%",display:"flex" }}>
              <img src={rankerLogo} alt='admin' />

                {/* <img src={'../../assets/adminLogo.svg'} /> */}
              </div>
              <Button
                variant="contained"
                sx={{ width: '100%' }}
                onClick={() => navigate('/parser')}
              >
                Resume Ranker
              </Button>
            </Card>
          )}
          {userDetails?.application.includes('Parse') && (
            <Card
              sx={{
                padding: '10px',
                cursor: 'pointer',
                borderRadius: '10px',
                boxShadow: 3,
                width: '450px',
                height: '100%',
                paddingTop:"20px"
              }}
            >
              <div style={{ height: '90%',padding:"10%",display:"flex" }}>
                <img src={parserLogo} alt='admin'/>
              </div>
              <Button
                variant="contained"
                sx={{ width: '100%' }}
                onClick={() => navigate('/power-apps-dashboard')}
              >
                Resume Parser
              </Button>
            </Card>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Selectionpage;
