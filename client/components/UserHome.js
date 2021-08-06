import React from 'react'
import { connect } from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  console.log(props)
  const { user } = props

  return (
    <div>
      <h3>Welcome, {user.firstName}!</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.auth
  }
}

export default connect(mapState)(UserHome)
