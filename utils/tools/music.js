
/**
 * 音乐播放器，需要改造
 */
export default function () {
	if (!this.data.audioContext) {
		const innerAudioContext = wx.createInnerAudioContext();
		innerAudioContext.autoplay = false;
		innerAudioContext.loop = true;
		innerAudioContext.src = this.data.imageUrl + '/bg.mp3';
		this.data.isPlayMusic = false;
		innerAudioContext.onPlay(() => {
			console.log('music play');
			this.data.isPlayMusic = true;
		});
		innerAudioContext.onPause(() => {
			console.log('music pause');
			this.data.isPlayMusic = false;
		});
		this.data.audioContext = innerAudioContext;
	}
}

