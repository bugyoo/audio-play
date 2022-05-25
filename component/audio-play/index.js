
Component({
  properties :{
    url:{
      type:String,
      value:null
    }
  },
  data: {
    isplay:false,
    totalTime:0,
    currentTime:0,
    innerAudioContext:null,
    changing:false
  },
  ready() {
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = false
    innerAudioContext.src = this.data.url
    // innerAudioContext.src = 'https://v.dyjyzyk.dtdjzx.gov.cn/resource-mydzb/2222.mp3'
    // innerAudioContext.src = 'https://v.dyjyzyk.dtdjzx.gov.cn/resource-mydzb/王佳杨-孤独.flac'
    innerAudioContext.onTimeUpdate((res)=>{
      if(!this.data.changing){
        this.setData({
          totalTime:Math.ceil(innerAudioContext.duration),
          currentTime:Math.ceil(innerAudioContext.currentTime)
        })
      }
    })
    innerAudioContext.onCanplay(()=>{
      this.setData({

      })
    })
    innerAudioContext.onEnded((res)=>{
      this.setData({
        currentTime:0,
        isplay:false
      })
    })
    innerAudioContext.onError((res) => {
      console.log(res,'错误');
      this.setData({
        currentTime:0,
        isplay:false
      })
      wx.showToast({
        title: '该格式音频暂不支持播放',
        icon:"none"
      })
    })

    this.setData({innerAudioContext})
  },
  methods:{
    bindchanging(){
      this.setData({
        changing:true
      })
    },
    slider1change(e){
      this.setData({
        changing:false,
        currentTime:e.detail.value
      })
      this.data.innerAudioContext.seek(e.detail.value)
      this.playHanlder()
    },
    playHanlder(){
      this.data.innerAudioContext.play()
      this.setData({isplay:true})
    },
    pauseHanlder(){
      this.data.innerAudioContext.pause()
      this.setData({isplay:false})
    },
  },
  detached(){
    if(this.data.innerAudioContext){
      this.data.innerAudioContext.offTimeUpdate()
      this.data.innerAudioContext.offCanplay()
      this.data.innerAudioContext.offEnded()
      this.data.innerAudioContext.offError()
      this.data.innerAudioContext.destroy()
      this.data.innerAudioContext = null
    }
  },
})