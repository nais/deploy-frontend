'use strict'
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b
          }) ||
        function (d, b) {
          for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]
        }
      return extendStatics(d, b)
    }
    return function (d, b) {
      extendStatics(d, b)
      function __() {
        this.constructor = d
      }
      d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __())
    }
  })()
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k]
          },
        })
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        o[k2] = m[k]
      })
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v })
      }
    : function (o, v) {
        o['default'] = v
      })
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod
    var result = {}
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k)
    __setModuleDefault(result, mod)
    return result
  }
exports.__esModule = true
var react_1 = __importStar(require('react'))
var react_redux_1 = require('react-redux')
var actionTypes_1 = require('../config/actionTypes')
require('./header-styles.less')
var UserInfo = /** @class */ (function (_super) {
  __extends(UserInfo, _super)
  function UserInfo(props) {
    return _super.call(this, props) || this
  }
  UserInfo.prototype.componentDidMount = function () {
    var dispatch = this.props.dispatch
    dispatch({ type: actionTypes_1.USERINFO_REQUEST })
  }
  UserInfo.prototype.render = function () {
    return react_1['default'].createElement('div', { className: 'userInfo' }, this.props.userName)
  }
  return UserInfo
})(react_1.Component)
var mapStateToProps = function (state) {
  return {
    userName: state.userInfo.userName,
  }
}
exports['default'] = react_redux_1.connect(mapStateToProps)(UserInfo)
