import { useState, useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtCard } from "taro-ui"
import dayjs from 'dayjs'
import './style.scss'

function News(props) {
    const {newslist} = props
    return (
        <View className="box">
            {
                newslist && newslist.map(item => {
                    return (
                        <View className="card" key={item.id}>
                            <View className="top">
                                <Text>{dayjs(item.pubDate).format('YYYY年MM月DD日 HH:ss')}</Text>
                                <Text>({item.pubDateStr})</Text>
                            </View>
                            <AtCard
                                note={`来源：${item.infoSource}`}
                                extra={`地区：${item.provinceName || '--'}`}
                                title={item.title}
                            >
                                {item.summary}
                            </AtCard>
                        </View>
                    )
                })
            }
        </View>
    )
}

export default News