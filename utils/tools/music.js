
/**
 * 音乐播放器
 */
export default function (path = null) {
	if (!this.data.audioContext) {
    console.log(' begain create audio context ');
		const innerAudioContext = wx.createInnerAudioContext();
		innerAudioContext.autoplay = true;
		innerAudioContext.loop = true;
		innerAudioContext.src = path;
    this.data.audioPlay = false;
    this.data.auidoLoad = false;
		innerAudioContext.onPlay(() => {
      console.log(' music begain play ');
      if(!this.data.audioPlay) {
        this.data.audioPlay = true;
        this.update();
      }
		});
		innerAudioContext.onPause(() => {
			console.log(' music begain pause ');
      if(this.data.audioPlay) {
        this.data.audioPlay = false;
        this.update();
      }
    });
    innerAudioContext.onCanplay(()=>{
      console.log(' music can play ');
      if (!this.data.auidoLoad) {
        this.data.auidoLoad = true;
        this.update();
      }
    })
    this.data.audioContext = innerAudioContext;
	} else {
    console.log(' change play status current status ', this.data.audioPlay);
    if (this.data.audioPlay) {
      this.data.audioContext.pause();
    } else  {
      this.data.audioContext.play();
    }
  }
}

