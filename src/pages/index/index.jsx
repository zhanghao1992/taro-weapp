import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtTabBar } from 'taro-ui'
import Me from '../me'
import Pneumonia from '../pneumonia'
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
  },
  { 
    title: '肺炎', 
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
      current: 3
    }
  }

  config = {
    navigationBarTitleText: '首页'
  }

  // componentWillReceiveProps (nextProps) {
  //   console.log(this.props.user, nextProps)
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('getDerivedStateFromProps')
    return null
  }

  // componentDidMount() {
  //   console.log(process.env.TARO_ENV,'TARO_ENV');
  //   console.log(process.env.NODE_ENV,'NODE_ENV');
  // }

  // componentWillUnmount () { }

  componentDidShow () {
    
   }

  componentDidHide () { }

  onHandleClick = (key) => {
    const titleText = {
      0: '首页',
      1: 'ss',
      2: '我的资料',
      3: '肺炎最新消息'
    }
    Taro.setNavigationBarTitle({title: titleText[key]})
    this.setState({
      current: key,
    })
  }

  render () {
    const {current} = this.state
    return (
      <View className='index'>
        {current == 2 && <Me/>}
        {current == 3 && <Pneumonia/>}
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
