import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

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
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Link to="/">Rocks!</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
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
