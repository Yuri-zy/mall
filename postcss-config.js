module.exports = {
    plugins: {
        autoprefixer: {},
        'postcss-px-to-viewport': {
            viewportWidth: 375,  // 视窗的宽度, 对应的是我们设计稿的宽度
            viewportHeight: 667,  // 视窗的高度, 对应的是我们设计稿的高度(也可以不配置)
            unitPrecision: 5,  // 指定`px`转换为视窗单位值得小数位数(很多时候无法整除)
            viewportUnit: 'vw',  // 指定需要转换成得视窗单位, 建议使用vw
            selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'],  // 指定不需要转换的类
            minPixelValue: 1,  // 小于或等于`1px`不转换为视窗单位
            mediaQueery: false  // 允许在媒体查询中转换`px`
            // exclude: [/TabBar/]
        }
    }
}

// 1.在js中使用正则: /正则相关规则/
// 2.exclude中存放得元素必须是正则表达式
// 3.按照排除得文件写对应得正则
// 正则得规则
// 1> ^abc: 表示匹配得内容, 必须以什么内容开头(此处表示以abc开头)
// 2> abc$: 表示匹配得内容, 必须以什么内容结尾(此处表示以abc结尾)