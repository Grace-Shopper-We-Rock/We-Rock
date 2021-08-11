import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import HomeIcon from '@material-ui/icons/Home'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: [
      'Hanalei Fill',
      'cursive',
    ].join(','),
  },
  rightNav: {
    display: 'flex',
  },
  link: {
    color: "#373736",
  },
}));

const Navbar = ({ user, handleClick, isLoggedIn }) => {
  const classes = useStyles()

  return (
    <div>
      <nav>
        <AppBar style={{ background: '#8ea2de' }} position="relative">
          <Toolbar>
            <Link to="/">< HomeIcon style={{ fill: "#373736" }} /> </Link>
            <Typography className={classes.title} variant="h6" noWrap>
              <Link className={classes.link} to="/products" >Meet Our Rocks! </Link>
            </Typography>
            {isLoggedIn ? (
              <div className={classes.rightNav}>
                <Link className={classes.link} to="/home">Hi {user.firstName}!</Link>
                <a href="#" className={classes.link} onClick={handleClick}> Logout </a>
              </div>
            ) : (
              <div className={classes.rightNav} >
                <Link className={classes.link} to="/login">Login</Link>
                <Link className={classes.link} to="/signup">Sign Up</Link>
              </div>
            )}
            <div className={classes.rightNav}>
              <Link to="/cart">< ShoppingCartIcon style={{ fill: "#373736" }} /> </Link>
            </div>

          </Toolbar>
        </AppBar>
      </nav>
      <hr />
    </div >
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    user: state.auth
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
  }
}

export default connect(mapState, mapDispatch)(Navbar)
