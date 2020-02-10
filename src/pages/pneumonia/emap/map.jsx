import { useState, useEffect } from '@tarojs/taro'

// import ReactEcharts from 'echarts-for-react/lib/core'
// import echarts from 'echarts/lib/echarts'
// import 'echarts/lib/chart/map'
// import 'echarts/lib/component/visualMap'
// import 'echarts/lib/component/tooltip'

import {getProvinces, getChinaJson, getProvinceJson} from '../request.js'
import { View, Text, Picker } from '@tarojs/components'
import { 
    AtList,
    AtListItem,
    AtModal, 
    AtModalHeader, 
    AtModalContent, 
    AtModalAction
} from "taro-ui"
import './style.scss'
import dayjs from 'dayjs'

function EMap(props) {
    // 选择地区的下拉
    const [provinceList, setProvinceList] = useState([])
    // 省份列表数据
    const [provinceDetail, setProvinceDetail] = useState([])
    // 省份详情模态框
    
    const [isOpened, setModalIsOpend] = useState(false)
    const [ProvinceDetailForModal, setProvinceDetailForModal] = useState({})

    const [selectorName, setSelectorName] = useState('')

    // const {desc: {confirmedCount}} = props
    useEffect(async() => {
        const {data: {code, newslist}}= await getProvinces()
        const provinceList = newslist.map(i => i.provinceShortName)
        if(code === 200) {
            provinceList.unshift('全国')
            setProvinceList(provinceList)
            setProvinceDetail(newslist)
        }

        // const xx = await getChinaJson()
        // console.log(xx);
    }, [])

    const cityChange = (e) => {
        setSelectorName(provinces[e.detail.value]['provinceShortName'])
    }

    const itemClickHandler = (locationId) => {
        const detail = provinceDetail.filter(i => i.locationId === locationId)[0]
        console.log(detail);
        setModalIsOpend((pre) => !pre)
        setProvinceDetailForModal(detail)
    }

    const modalClose = () => {
        setModalIsOpend((pre) => !pre)
    }

    return props.desc ? (
        <View className="emap">
            <Text className="title">全国截止{dayjs(props.desc.modifyTime).format('YYYY年MM月DD日 HH:ss')}(北京时间)统计</Text>
            <View className="top">
                <View className="item">
                    <Text>确诊</Text>
                    <Text className="smaller">{props.desc.confirmedCount}例</Text>
                    <Text className="small">
                        <Text className="color-grey">较昨日</Text>
                        <Text>+{props.desc.confirmedIncr}</Text>
                    </Text>
                </View>
                <View className="item">
                    <Text>疑似</Text>
                    <Text className="smaller">{props.desc.suspectedCount}例</Text>
                    <Text className="small">
                        <Text>较昨日</Text>
                        <Text>+{props.desc.suspectedIncr}</Text>
                    </Text>
                </View>
                <View className="item">
                    <Text>重症</Text>
                    <Text className="smaller">{props.desc.seriousCount}例</Text>
                    <Text className="small">
                        <Text>较昨日</Text>
                        <Text>+{props.desc.seriousIncr}</Text>
                    </Text>
                </View>
                <View className="item">
                    <Text>死亡</Text>
                    <Text className="smaller">{props.desc.deadCount}例</Text>
                    <Text className="small">
                        <Text>较昨日</Text>
                        <Text>+{props.desc.deadIncr}</Text>
                    </Text>
                </View>
                <View className="item">
                    <Text>治愈</Text>
                    <Text className="smaller">{props.desc.curedCount}例</Text>
                    <Text className="small">
                        <Text>较昨日</Text>
                        <Text>+{props.desc.curedIncr}</Text>
                    </Text>
                </View>
            </View>
            <View>
              {/* <Picker mode='selector' range={provinceList} onChange={cityChange}>
                <View className='picker'>
                    <Text>地区: </Text>
                    <Text>{selectorName}</Text>
                </View>
              </Picker> */}
            </View>

            <View>
                <AtList>
                    {provinceDetail.map(item => 
                        <AtListItem 
                            key={item.locationId}
                            title={`${item.provinceShortName}`}
                            note={`确诊：${item.confirmedCount} 死亡：${item.deadCount} 治愈：${item.curedCount}`} 
                            arrow="right"
                            onClick={() => itemClickHandler(item.locationId)} />
                    )}
                    
                </AtList>
            </View>

            <AtModal isOpened={isOpened} closeOnClickOverlay onClose={modalClose}>
                <AtModalHeader>{ProvinceDetailForModal.provinceName}</AtModalHeader>
                <AtModalContent>
                    <View className="header">
                        <View className="item">城市</View>
                        <View className="item">确诊</View>
                        <View className="item">死亡</View>
                        <View className="item">治愈</View>
                    </View>
                    {ProvinceDetailForModal.cities.map(item => 
                        <View  className="header" key={item.locationId}>
                            <View className="item">{item.cityName}</View>
                            <View className="item">{item.confirmedCount}</View>
                            <View className="item">{item.deadCount}</View>
                            <View className="item">{item.curedCount}</View>
                        </View>
                    )}
                </AtModalContent>
            </AtModal>
        </View>
    ): null
}
export default EMap;