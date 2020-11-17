module.exports = {
	lintOnSave: false,
	devServer: {
		proxy: {
			'/api': {
				target: 'https://api.ydxyh.cn/', //设置你调用的接口域名
				changeOrigin: true,
				pathRewrite: {
					'^/api': '/' //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://m.kugou.com/rank/info/?rankid=23784&page=1&json=true'，直接写‘/api/rank/info/?rankid=23784&page=1&json=true’即可  
				}
			}
		}
	}
}