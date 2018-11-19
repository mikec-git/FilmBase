import React from 'react';
import Play from '../../../../assets/img/play-button.svg';
import Pause from '../../../../assets/img/pause-button.svg';
import c from './VideoState.module.scss';

const videoState = (props) => {
  const classNames = props.className ? 
    [c.VideoState, props.className].join(' ') : c.VideoState;
    
  return props.playerState === 1 ? 
    <img className={classNames} src={Play} alt="Playing"/> : 
    <img className={classNames} src={Pause} alt="Paused"/>;
}
 
export default videoState;