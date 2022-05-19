
const innerAudioContext = wx.createInnerAudioContext()
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
    currentTime:0
  },
  ready() {
    innerAudioContext.autoplay = false
    innerAudioContext.src = this.data.url
    // innerAudioContext.src = 'https://v.dyjyzyk.dtdjzx.gov.cn/resource-mydzb/2222.mp3'
    // innerAudioContext.src = 'https://v.dyjyzyk.dtdjzx.gov.cn/resource-mydzb/王佳杨-孤独.flac'
    innerAudioContext.onTimeUpdate((res)=>{
      console.log(res,'======>');
      this.setData({
        totalTime:Math.ceil(innerAudioContext.duration),
        currentTime:Math.ceil(innerAudioContext.currentTime)
      })
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
      this.setData({
        currentTime:0,
        isplay:false
      })
      wx.showToast({
        title: res.errMsg,
        icon:"none"
      })
    })
  },
  methods:{
    slider1change(e){
      this.setData({
        currentTime:e.detail.value
      })
      innerAudioContext.seek(e.detail.value)
      this.playHanlder()
    },
    playHanlder(){
      innerAudioContext.play()
      this.setData({isplay:true})
    },
    pauseHanlder(){
      innerAudioContext.pause()
      this.setData({isplay:false})
    },
  },
  detached(){
    innerAudioContext.destroy()
  },
})