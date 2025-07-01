# 倍速插件
功能：  
-在原有b站倍速增加了2.5倍速和3倍速  
-自定义倍速 （除非刷新，否则可以持久化保存）参考以下
```javascript
const vobserver = new MutationObserver((mutations) => {
  if (mutations[0]) {
      video.playbackRate = rate  // 加载原有倍速
  }
})
vobserver.observe(video, {
    attributes: true,
    attributeFilter: ['src']
})
```
## 使用方法  
1.下载文件并解压  
2.打开浏览器扩展页面，打开开发者模式  
3.加载extension文件夹并启用  
### 参考  
![chrome使用方法](loadExtension.png "使用方法")
### 其他说明  
可能有bug，不生效就多刷新几次

