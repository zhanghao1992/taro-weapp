import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import {AtTabBar} from 'taro-ui'
import Me from '../me'
const tabList = [
  { 
    title: '列表', 
    iconType: 'bullet-list',
  },
  { 
    title: '拍照', 
    iconType: 'camera' 
  },
  { 
    title: '我的', 
    iconType: 'folder',
  }
]
const mapStateToProps = (state) => {
  const { user } = state
  return {
    user
  }
}
const mapDispatchToProps = (dispatch) => ({})
@connect(mapStateToProps, mapDispatchToProps)
class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      current: 0
    }
  }

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props.user, nextProps)
  }

  componentWillMount() {
    Taro.getSetting()
      .then(res => {
        console.log(res);
        if(res.authSetting["scope.userInfo"]){
          return true;
        } else {
          Taro.redirectTo({url: '/pages/login/index'})
          throw new Error('没有授权')
        }
      })
      .then(res=>{
        return Taro.getUserInfo();
      })
      .then(res=>{
        Taro.setStorage({
          key: 'userInfo',
          data: res.userInfo
        })
      })
      .catch(err=>{
        console.log(err)
      })

  }

  componentWillUnmount () { }

  componentDidShow () {
    
   }

  componentDidHide () { }

  onHandleClick = (key) => {
    this.setState({
      current: key,
    })
  }

  render () {
    const {current} = this.state
    return (
      <View className='index'>
        {current == 2 && <Me/>}
        <AtTabBar
          fixed
          tabList={tabList}
          onClick={this.onHandleClick}
          current={current}
        />
      </View>
    )
  }
}

export default Index
