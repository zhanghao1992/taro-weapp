import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import {TAB_NV} from './const.js'
import News from './news/news.jsx'
import EMap from './emap/map.jsx'
import {getNews} from './request.js'

class Pneumonia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            newslist: [],
            desc: {
                modifyTime: 0,
                confirmedCount: 0,
                confirmedIncr: 0,
                suspectedCount: 0,
                suspectedIncr: 0,
                seriousCount: 0,
                suspectedIncr: 0,
                deadCount: 0,
                deadIncr: 0,
                curedCount: 0,
                curedIncr: 0,
            }
        }
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     // console.log('getDerivedStateFromProps')

    //     return null
    // }
    
    componentDidMount() {
        this.getNews()
    }

    getNews = async() => {
        try {
            const response = await getNews()
            const {data: {code, newslist: [{ news, desc }]}} = response
            if(code === 200) {
                this.setState({newslist: news, desc})
            } 
        } catch(err) {
            Taro.showToast({
                title: err,
            })
        }
    }

    tabChange = (key) => {
        this.setState({current: key})
    }

    render() {
        const {current, newslist, desc} = this.state
        return(
            <View>
                <AtTabBar
                    tabList={TAB_NV}
                    onClick={this.tabChange}
                    current={current}
                />
                {current == 0 && <News newslist={newslist}/>}
                {current == 1 && <EMap desc={desc}/>}
            </View>
        )
    }
}

export default Pneumonia