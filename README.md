# 倍速插件
功能：  
-在原有b站倍速增加了2.5倍速和3倍速  
-自定义倍速 （除非刷新，否则可以持久化保存）参考以下
```javascript
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
      if (mutation.attributeName === 'src') {
          video.playbackRate = rate
      }
  })
})
observer.observe(video, {
    attributes: true,
    attributeFilter: ['src']
})
```
## 使用方法  
1.下载整个extension文件  
2.打开浏览器扩展，打开开发者模式  
3.加载extension文件  
### 参考  
！[chrome使用方法](loadExtension.png "使用方法")

