import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <nav>
      <AppBar style={{ background: '#D4B8EA' }} position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            {isLoggedIn ? (
              <div>
                {/* The navbar will show these links after you log in */}
                <Link to="/">Rocks!</Link>
                Hello<Link to="/userhome">userName!</Link>
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
                <Link to="/cart">< ShoppingCartIcon /> </Link>

              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Link to="/">Rocks!</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
                <Link to="/cart">< ShoppingCartIcon /> </Link>
              </div>
            )}
          </Typography>
        </Toolbar>
      </AppBar>
    </nav>
    <hr />
  </div >
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
