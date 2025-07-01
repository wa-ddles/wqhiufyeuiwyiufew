console.log('脚本运行');

// 监听主要组件生成
const observer = new MutationObserver((mutations, obs) => {
    
    if (document.querySelector('#app') || document.querySelector("#__next")) {
        obs.disconnect()

        // 等待直至目标元素出现
        let timer = setInterval(() => {
            const rateBox = document.querySelector("div.bpx-player-ctrl-btn.bpx-player-ctrl-playbackrate > ul")
            console.log(rateBox);
            
            if (rateBox) {
                clearInterval(timer)

                // 添加自定义倍速框
                let rate = document.querySelector('video').playbackRate
                const diybox = document.createElement('div')
                diybox.style.cssText = `
                    width: 100px; 
                    text-align: center; 
                    position:absolute; 
                    top: 80px;
                    left: -120px;
                    background-color:rgb(158, 207, 210);
                    padding:8px;
                    line-height: 1.8;
                    font-size: 15px;
                    
                `
                diybox.innerHTML = `
                    <h2 style="font-size: 20px;">自定义</h2>
                    <p>当前: <span id="current" style="color: white;"> ${rate} </span></p>
                    <p><input id="inpRate" type="text" style="width: 25px; height: 18px;"><span> 倍速</span></p>
                    <div style="margin-top:6px;"><button id="backToOne" style="margin-right:8px;">还原</button><button id="setRate">应用</button></div>
                `

                const target = document.querySelector("#playerWrap") || document.querySelector("#bilibili-player-wrap > div")
                target.appendChild(diybox)

                console.log('添加完毕');
                
                rateBox.insertAdjacentHTML('afterbegin',`<li class="bpx-player-ctrl-playbackrate-menu-item " data-value="2.5">2.5x</li>`)
                rateBox.insertAdjacentHTML('afterbegin',`<li class="bpx-player-ctrl-playbackrate-menu-item " data-value="3.0">3.0x</li>`)
                const video = document.querySelector('video')

                document.querySelector('#setRate').addEventListener('click', () => {
                    const newRate = document.querySelector('#inpRate').value
                    if (newRate > 16 || newRate <= 0 || isNaN(newRate)) {
                        return
                    }
                    video.playbackRate = +newRate
                })

                document.querySelector('#backToOne').addEventListener('click', () => {
                    document.querySelector('video').playbackRate = 1
                    document.querySelector('#inpRate').value = ""
                })

                // 倍速改变，更新当前倍速值
                video.addEventListener('ratechange', () => {
                    document.querySelector('#current').innerHTML = video.playbackRate
                    rate = video.playbackRate  // 储存当前倍速
                })          
                // 监听视频变化
                const vobserver = new MutationObserver((mutations) => {
                    if (mutations[0]) {
                        video.playbackRate = rate  // 加载原有倍速
                    }
                })
                vobserver.observe(video, {
                    attributes: true,
                    attributeFilter: ['src']
                })

            }

        },500)
        
    }
})
observer.observe(document.body, {
    childList: true
})


