window.addEventListener('load', () => {
    setTimeout(() => {
        console.log('开始添加');

        let rate = document.querySelector('video').playbackRate
        
        //在b站原有倍速新增
        document.querySelector("#bilibili-player > div > div > div.bpx-player-primary-area > div.bpx-player-video-area > div.bpx-player-control-wrap > div.bpx-player-control-entity > div.bpx-player-control-bottom > div.bpx-player-control-bottom-right > div.bpx-player-ctrl-btn.bpx-player-ctrl-playbackrate > ul").insertAdjacentHTML('afterbegin',`<li class="bpx-player-ctrl-playbackrate-menu-item " data-value="2.5">2.5x</li>`)
        document.querySelector("#bilibili-player > div > div > div.bpx-player-primary-area > div.bpx-player-video-area > div.bpx-player-control-wrap > div.bpx-player-control-entity > div.bpx-player-control-bottom > div.bpx-player-control-bottom-right > div.bpx-player-ctrl-btn.bpx-player-ctrl-playbackrate > ul").insertAdjacentHTML('afterbegin',`<li class="bpx-player-ctrl-playbackrate-menu-item " data-value="3">3.0x</li>`)
        
        // 添加自定义倍速框
        const diybox = document.createElement('div')
        diybox.style.cssText = `
            width: 100px; 
            text-align: center; 
            position:absolute; 
            top: 80px;
            left: -120px;
            background-color:rgb(158, 207, 210);
            padding:10px;
            line-height: 2;
            font-size: 15px;
            
        `
        diybox.innerHTML = `
            <h2>自定义倍速</h2>
            <p>当前: <span id="current" style="color: white; max-width: 55px; white-space: nowrap; overflow:hidden; text-overflow:ellipsis;"> ${rate} </span></p>
            <p><input id="inpRate" type="text" style="width: 25px; height: 18px;"><span> 倍速</span></p>
            <div style="margin-top:6px;"><button id="backToOne" style="margin-right:8px;">还原</button><button id="setRate">应用</button></div>
        `
        document.querySelector("#playerWrap").prepend(diybox)
        console.log('添加完毕');

        //监听点击事件
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
            // 储存当前倍速
            rate = video.playbackRate
        })

        // 监听视频变化，维持原有倍速
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
        
    }, 1000)
})
    

