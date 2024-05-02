import React from 'react';
import Card from '@mui/material/Card';
import { Box, Button, CardContent, } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { adminLogo, parserLogo, rankerLogo, selectionBackgroundImage } from 'src/assets/images';


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
            // minHeight:'100%',
            height: 'auto',
            borderRadius: '11px',
            borderradius: '11px',
            // opacity: '0.11',
            background: 'rgba(246, 248, 253, 0.65)',

            boxShadow: ' 0px 4px 34.3px 2px rgba(30, 45, 87, 0.24)',

            display: 'flex',
            padding: '20px',
            justifyContent: "space-evenly"
          }}
        >
          {userDetails?.isAdmin.includes('true') && (
            <Card
              sx={{
                padding: '10px',
                cursor: 'pointer',
                borderRadius: '10px',
                boxShadow: 3,
                width: '450px',
                height: 'auto',
                marginRight: '10px',
                paddingTop: "20px"
              }}
            >
              {/* <CardContent >
                <div style={{ height: '100%', padding: "10%", display: "flex" }}>
                  <img src={adminLogo} alt='admin' />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    size='large'
                    variant="contained"
                    sx={{ width: '50%', fontSize: '1.2rem' }}
                    onClick={() => navigate('/admin')}
                  >
                    Admin
                  </Button>
                </div>
              </CardContent> */}
              <CardContent>
                <div style={{ height: '100%', padding: "10%", display: "flex" }}>
                  <img src={adminLogo} alt='admin' /></div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8%' }}>
                  <Button
                    size='large'
                    sx={{ width: '50%', fontSize: '1.2rem', backgroundColor: '#264393' }}
                    onClick={() => navigate('/admin')}
                  >
                    Admin
                  </Button>
                </div>
              </CardContent>
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
                height: 'auto',
                marginRight: '10px',
                paddingTop: "20px"
              }}
            >
              <CardContent>
                <div style={{ height: '100%', padding: "10%", display: "flex" }}>
                  <img src={rankerLogo} alt='ranker' /></div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    size='large'
                    sx={{ width: '60%', fontSize: '1.2rem', backgroundColor: '#264393' }}
                    onClick={() => navigate('/ranker')}
                  >
                    Resume Ranker
                  </Button>
                </div>
              </CardContent>
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
                height: 'auto',
                paddingTop: "20px"
              }}
            >
              <CardContent>
                <div style={{ height: '100%', padding: "10%", display: "flex" }}>
                  <img src={parserLogo} alt='parser' />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    size='large'
                    sx={{ width: '66%', fontSize: '1.2rem', backgroundColor: '#264393' }}
                    onClick={() => window.open('https://apps.powerapps.com/play/e/228140fb-0529-e4b8-b3ca-4d1613a7c5da/a/504422d8-9483-48d3-8a08-4aa1ccb39087?tenantId=b7182a97-d832-4b3a-ab2d-6848149387a3&hint=6dafd70b-a94a-4508-b21c-7cf3a1c5d3af&sourcetime=1714472671911', '_blank')}
                  >
                    Resume Parser
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box >
    </>
  );
};

export default Selectionpage;
