import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import './Login.css';
import { useAuthContext } from 'src/auth/hooks';
import { useRouter } from 'src/routes/hooks';
import { logo_black_emergys } from 'src/assets/images';

const Login = () => {
  const { login } = useAuthContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await login({ username, password });
    if (res) {
      setLoggedIn(true);
      router.push('/home');
    } else {
      setError('Invalid username or password');
    }
  };

  const wordsToStream = ['Smart Recruitment.', 'Quick Hiring', 'Talent Acquisition.', 'Easy Screening.'];
  const [streamedText, setStreamedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allWordsStreamed, setAllWordsStreamed] = useState(false);
  const [currentColor, setCurrentColor] = useState('')
  const colors = ['#19B1BF', '#8BBABB', '#29B9AD', '#19B1BF'];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!allWordsStreamed) {
        if (currentIndex < wordsToStream[currentWordIndex].length) {
          setStreamedText(prevStreamedText =>
            prevStreamedText + wordsToStream[currentWordIndex].charAt(currentIndex)
          );
          setCurrentIndex(prevIndex => prevIndex + 1);
        } else if (streamedText.length > 0 && currentWordIndex !== wordsToStream.length - 1) {
          setStreamedText(prevStreamedText => prevStreamedText.slice(0, -1));
        } else {
          setCurrentIndex(0);
          setCurrentWordIndex(prevWordIndex => (prevWordIndex + 1) % wordsToStream.length);
          if (currentWordIndex === wordsToStream.length - 1) {
            setAllWordsStreamed(true);
          }
        }
      }
    }, 150);

    setCurrentColor(colors[currentWordIndex % colors.length]);

    return () => clearInterval(interval);
  }, [currentIndex, currentWordIndex, streamedText, allWordsStreamed]);

  return (
    <div className="main-container">
      <Grid container justifyContent="center" alignItems="center" className="header-container">
        <Typography variant='h1' sx={{ color: '#3ec0b5', textAlign: 'center', bottom: '300px', right: '350px', position: 'relative' }}>AccuHire</Typography>
        <img src={logo_black_emergys} alt="black_emergys" className="logo" style={{ bottom: '250px', right: '475px', position: 'relative', width: '155px', height: '40px' }} />
      </Grid>
      <form className="login-form" onSubmit={handleSubmit}>
        <Grid container justifyContent="center" alignItems="center">
          <Card sx={{ height: '500px', width: { xs: '100%', md: '100%' }, padding: '1rem' }}>
            <CardContent>
              <Grid container direction="column" alignItems="center">
                <Typography variant="h5" padding='10px' align="center">Take the next step towards</Typography>
                <Typography variant="h3" padding='10px' color={currentColor} align="center" className="streamed-text">
                  {streamedText}
                </Typography>
                <Grid container direction="column" gap={2} sx={{ marginTop: '1rem', width: '100%' }}>
                  <TextField
                    type="text"
                    id="userID"
                    label="User ID"
                    name="userID"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.trim())}
                    required
                    fullWidth
                  />
                  <TextField
                    type="password"
                    id="password"
                    label="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value.trim())}
                    required
                    fullWidth
                  />
                  {error && <div className="error-message">{error}</div>}
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button type="submit" sx={{ marginTop: '1rem' }} size="large" variant="contained">
                      LOGIN
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </form>
      {loggedIn && <Link to="/home" className="home-link">Go to Home</Link>}
    </div>
  );
};

export default Login;
