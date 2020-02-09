import fly from '../../util/fly.js'
// 获取新闻列表
const getNews = () => {
    return fly.get({
        url: 'https://api.tianapi.com/txapi/ncov/index?key=9a4ab8ec328de7fb7a675e4c2e936110',
    })
}

// 获取省份列表
const getProvinces = () => {
    return fly.get({
        url: 'https://api.tianapi.com/txapi/ncovcity/index?key=9a4ab8ec328de7fb7a675e4c2e936110',
    })
}

export {
    getNews,
    getProvinces
}