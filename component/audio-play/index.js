// pages/ceshi/ceshi.js
const innerAudioContext = wx.createInnerAudioContext()
Component({
  properties:{
    url:{
      type:String,
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
    innerAudioContext.onTimeUpdate((res)=>{
      this.setData({
        totalTime:Math.ceil(innerAudioContext.duration),
        currentTime:Math.ceil(innerAudioContext.currentTime)
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
  }
})