import { useState, useEffect } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtAvatar, AtImagePicker } from 'taro-ui'
import './style.scss'

function Me() {
  const [userInfo, setUserInfo] = useState({});
  const [files, setFiles] = useState([]);

  useEffect(() => {
    Taro.getUserInfo().then(res => {
      console.log(res);
      setUserInfo(res.userInfo)
    })
  },[])


  const onChange = (files) => {
    console.log(files);
    setFiles(files)
  }
  const onFail = (mes) => {
    console.log(mes)
  }
  const onImageClick = (_, file) => {
    Taro.previewImage({
      current: file.url,
      urls: files.map(i => i.url),
    })
  }

  return (
    <View className="me">
      {/* <View className='at-row at-row__justify--center'> */}
      <View className="top">
        <View className="avatar">
          <AtAvatar circle size="large" image={userInfo.avatarUrl}></AtAvatar>
        </View>
        <View className="info">
          <Text>{userInfo.nickName}</Text>
          <Text>{userInfo.province} {userInfo.city}</Text>
        </View>
      </View>
      <View>
      <AtImagePicker
        length={5}
        files={files}
        onChange={onChange}
        onFail={onFail}
        onImageClick={onImageClick}
      />
      </View>
    </View>
  );
}

export default Me
