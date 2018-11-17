import React, { PureComponent } from 'react';
import c from './YoutubeVideo.module.scss';

class YoutubeVideo extends PureComponent {
  constructor(props){
    super(props);
    this.YT = {...window.YT};
    this.state = {
      player: null
    }
  }

  componentDidMount() {
    this.onYouTubeIframeAPIReady();
  }
  
  // This function creates an <iframe> (and YouTube player) after the API code 
  // downloads.
  onYouTubeIframeAPIReady = () => {
    if(this.YT && !this.state.player) {
      const newPlayer = new this.YT.Player(this.props.playerId, {
        videoId: 'M7lc1UVf-VE',
        events: {
          'onReady': this.onPlayerReady
        }
      });
      this.setState({ player: newPlayer });
    }
  }
  
  // The API will call this function when the video player is ready.
  onPlayerReady = (event) => {
    event.target.playVideo();
  }  

  render() { 
    return ( 
      <div className={c.YoutubeVideo} id={this.props.playerId}></div>
     );
  }
}
 
export default YoutubeVideo;