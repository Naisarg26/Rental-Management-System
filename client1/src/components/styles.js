import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  navbar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
   backgroundcolor: "#003580",
  },
  maincontainer: {
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    color: 'white',
    textDecoration: 'none',
  },
  
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '1400px',
  },
  
    profile: {
      display: 'flex',
      alignItems: 'center',
    },
    avatar: {
      marginRight: theme.spacing(2), // Add margin to the right of the Avatar
    },
    userName: {
      marginRight: theme.spacing(2), // Add margin to the right of the username
    },
    logoutButton: {
      padding: `${theme.spacing(1)} ${theme.spacing(2)}`, // Add padding to the logout button
    },
  
  
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "#003580",
      },
      
}));