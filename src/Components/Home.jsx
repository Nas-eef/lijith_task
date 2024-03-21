import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Card, CardContent, CardMedia, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home'; // Import the HomeIcon component
import axios from 'axios';
import MyProfile from './Profile';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: 'linear-gradient(45deg, #303030 30%, #434343 90%)',
  },
  title: {
    flexGrow: 1,
  },
  card: {
    maxWidth: 300,
    margin: theme.spacing(2),
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    transition: '0.3s',
    '&:hover': {
      boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.2)',
    },
  },
  cardContent: {
    textAlign: 'center',
  },
  media: {
    height: 200,
  },
  readMore: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
}));

const Home = () => {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('https://interview-plus.onrender.com/api/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login")
  };

  const handleShowProfile = () => {
    setShowProfile(true);
  };
  const handleShowHome = () => {
    setShowProfile(false);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>

          <Typography variant="h6" className={classes.title}>
            My App
          </Typography>
          <IconButton edge="start" color="inherit" aria-label="home" onClick={handleShowHome} >
            <HomeIcon />
          </IconButton>
          <IconButton color="inherit" aria-label="My Profile" onClick={handleShowProfile}>
            <AccountCircleIcon />
          </IconButton>
          <Button color="inherit" onClick={handleLogout} startIcon={<ExitToAppIcon />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {showProfile ? <MyProfile /> :
        <div style={{ padding: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Welcome to My App!
          </Typography>
          <Grid container spacing={3}>
            {items.map(item => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={item.image}
                    title={item.title}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {truncateText(item.description, 100)} {/* Truncate description text */}
                      {item.description.length > 100 && (
                        <span className={classes.readMore}>Read More</span> // Add "Read More" option
                      )}
                    </Typography>
                    <Typography variant="body1">${item.price}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      }
    </div>
  );
};

export default Home;
