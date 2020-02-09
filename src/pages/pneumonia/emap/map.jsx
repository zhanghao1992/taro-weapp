import { useState, useEffect } from '@tarojs/taro'
import {getProvinces} from '../request.js'
import { View, Text, Picker } from '@tarojs/components'
import './style.scss'
import dayjs from 'dayjs'

function EMap(props) {
    const [provinceName, setProvinceName] = useState([])
    const [provinces, setProvince] = useState([])
    const [selectorName, setSelectorName] = useState('')
    // const {desc: {confirmedCount}} = props
    useEffect(async() => {
        const {data: {code, newslist}}= await getProvinces()
        const provinceName = newslist.map(i => i.provinceShortName)
        if(code === 200) {
            setProvince(newslist)
            setProvinceName(provinceName)
        }
    }, [])

    const cityChange = (e) => {
        setSelectorName(provinces[e.detail.value]['provinceShortName'])
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
              <Picker mode='selector' range={provinceName} onChange={cityChange}>
                <View className='picker'>
                    <Text>地区: </Text>
                    <Text>{selectorName}</Text>
                </View>
              </Picker>
            </View>
        </View>
    ): null
}
export default EMap;