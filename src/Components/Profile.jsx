import React, { useEffect, useState } from 'react';
import { Typography, Avatar, Button, IconButton, TextField, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: 'auto',
    marginBottom: theme.spacing(2),
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const MyProfile = () => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()

  const handleUpdateProfile = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await axios.put(
        'https://interview-plus.onrender.com/api/update-user',
        { name, password },
        { headers: { 'x-access-token': token } }
      );
      if(response.status ==200){
          alert(response.data)
          console.log(response,'Update');
      }
    } catch (error) {
      console.error('Error updating profile:', error.response);
      alert("Updation Failed")
    }
  };
  const handleGetProfile = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      console.log(token);
      const response = await axios.get(
        'https://interview-plus.onrender.com/api/protected',
        { headers: 
            {'x-access-token': token }
         }
      );
      console.log(response);
    } catch (error) {
      console.error('Error getting profile:', error);
    }
  };

  useEffect(() => {
  handleGetProfile()
  }, [])
  const handleDeleteAccount = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await axios.delete(
        'https://interview-plus.onrender.com/api/delete-user',
        { headers: { 'x-access-token': token } }
      );
      if(response.status==200){
        alert(response.data)
        navigate('/login')
      }
      console.log(response.data);
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom align="center">
        My Profile
      </Typography>
      <Paper className={classes.paper}>
        <Avatar alt="Profile Picture" src="/avatar.png" className={classes.avatar} />
        <form className={classes.form}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Grid container justify="center">
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              className={classes.button}
              onClick={handleUpdateProfile}
            >
              Update Profile
            </Button>
            <IconButton
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={handleDeleteAccount}
            >
              Delete Account <DeleteIcon />
            </IconButton>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default MyProfile;
