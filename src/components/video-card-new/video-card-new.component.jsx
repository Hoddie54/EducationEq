import { IconSVG } from "../icon-svg"
import "./video-card-new.styles.scss"
import Badge from "../badge/badge.component"

function VideoCardNew(props) {
  return (
    <div className="video-card__container">
      <div className="image-container">
        <div className="icon-container">
          <IconSVG name="play" />
        </div>
        <img src="https://img.youtube.com/vi/0e3h9w9ldaA/0.jpg" />
      </div>
      <div className="video-card__title blue-text">Chemistry</div>
      <div className="video-card__sub-title blue-text">
        Iconic bonding in compounds
      </div>
      <div className="video-card__spec">1.4.3</div>
      <div className="video-card__desc">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      </div>
      <div className="badge-container">
        <Badge number="1.4.2" />
        <Badge number="1.4" />
        <Badge number="1.4.1" />
      </div>
    </div>
  )
}

export default VideoCardNew
