import React from 'react'
import ReactPlayer from 'react-player'
import './video-player.styles.scss'

export default class Videoplayer extends React.Component {
  render() {
    const { videoLink } = this.props
    return (
      <div className="video-player-wrapper">
        {videoLink 
          ? <ReactPlayer 
              url={videoLink}
              width="100%"
              height="100%" />
          : <ReactPlayer 
              url='https://www.dailymotion.com/video/x7obe3'
              width="100%"
              height="100%" />}
      </div>
    )
  }
}
