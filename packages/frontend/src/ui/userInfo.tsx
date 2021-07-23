import React, { Component } from 'react'
import { connect } from 'react-redux'
import { USERINFO_REQUEST } from '../config/actionTypes'

import './header-styles.less'

class UserInfo extends Component<Props, {}> {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({ type: USERINFO_REQUEST })
  }

  render() {
    return <div className="userInfo">{this.props.userName}</div>
  }
}

type Props = {
  dispatch: Function
  userName: String
}

const mapStateToProps = (state) => {
  return {
    userName: state.userInfo.userName,
  }
}

export default connect(mapStateToProps)(UserInfo)
