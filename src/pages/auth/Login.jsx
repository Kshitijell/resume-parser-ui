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
  // const [currentWordIndex, setCurrentWordIndex] = useState(0);
  // const [currentCharIndex, setCurrentCharIndex] = useState(0);



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
    }, 150); // Adjust the interval as needed

    setCurrentColor(colors[currentWordIndex % colors.length]);

    // Cleanup function to clear interval when component unmounts or when all words are streamed
    return () => clearInterval(interval);
  }, [currentIndex, currentWordIndex, streamedText, allWordsStreamed]);


  return (
    <div className="main-container">
      <div>
        <Typography variant='h1' sx={{ padding: '17px', color: '#3ec0b5', right: '600px', bottom: '275px', position: 'relative' }}>AccuHire</Typography>
        <img src={logo_black_emergys} alt="black_emergys" style={{ width: '200px', bottom: '250px', position: 'relative', right: '500px' }} />
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="card-container">
          <Card sx={{ height: '540px', width: '140%', left: '300px' }}>
            <CardContent>
              <br />
              <Grid>
                <Typography variant='h5'>Take the next step towards</Typography>
                <br />
                <Typography variant='h3' color={currentColor}>{streamedText}</Typography>
              </Grid>
              <Grid container gap={5} direction="column" sx={{ marginTop: '50px' }}>
                <TextField
                  type="text"
                  id="userID"
                  label="User ID"
                  name="userID"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.trim())}
                  required
                />
                <TextField
                  type="password"
                  id="password"
                  label="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value.trim())}
                  required
                />
                {error && <div className="error-message">{error}</div>}
              </Grid>
              <Button type="submit" style={{ marginTop: '50px' }}>
                Login
              </Button>
            </CardContent>
          </Card>
        </div>

      </form >

      {loggedIn && <Link to="/main">Go to Home</Link>}
    </div >

  );
};

export default Login;
