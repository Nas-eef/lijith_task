import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, Typography, Button, TextField, Link, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    width:"100%",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(4),
    width:"600px",
    textAlign: 'center',
    borderRadius: 10,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
  },
  formControl: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
    background: 'linear-gradient(45deg, #303030 30%, #434343 90%)',
    border: 0,
    borderRadius: 10,
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.3)',
    color: 'white',
    height: 40,
    padding: '0 30px',
  },
  title: {
    marginBottom: theme.spacing(4),
    fontWeight: 'bold',
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const [isSignIn, setIsSignIn] = useState(true);
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (username.trim() === '' || password.trim() === '') {
      return;
    }
    try {
      const res = await axios.post(`https://interview-plus.onrender.com/api/login`, { email: username, password });
     
      console.log(res,"login");
      if(res.status ==200){
      localStorage.setItem('token', JSON.stringify(res.data.token));
      alert("Login Successfull")
      navigate('/Home')
       }

    } catch (error) {
      console.error('Error during login:', error);
      alert(error)
    }
  };

  const handleSignUp = async () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
      return;
    }
    if (name.trim().length < 4) {
      alert('Name must be at least 4 characters long');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email address');
      return;
    }



    try {
      let formData = { name, email, password };
      const res = await axios.post(`https://interview-plus.onrender.com/api/register`, formData);
      if(res.status == 200 )
      alert("Registration Successfull");
      localStorage.setItem("token",res.data.token)
      navigate('/Home')
      console.log(res);
    } catch (error) {
      console.error('Error during registration:', error);
      alert(error);
    }
  };

  const handleToggleForm = () => {
    setIsSignIn(!isSignIn);
  };


  return (
    <div className={classes.root}>
      <Container component="main" style={{display:'flex',alignItems:"center",justifyContent:"center"}}>
        <Paper className={classes.paper} elevation={4}>

          <Typography component="h2" variant="h5">
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </Typography>
          <Grid container spacing={2}>
            {isSignIn ? (
              <>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    className={classes.button}
                    onClick={handleSignIn}
                  >
                    Sign In
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    Don't have an account? <Link onClick={handleToggleForm}>Sign Up</Link>
                  </Typography>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    className={classes.button}
                    onClick={handleSignUp}
                  >
                    Sign Up
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    Already have an account? <Link onClick={handleToggleForm}>Sign In</Link>
                  </Typography>
                </Grid>
              </>
            )}
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default LoginPage;
