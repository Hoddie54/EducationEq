import Basepage from "../basepage/basepage.component"
import "./videopage.styles.scss"
import Badge from "../../components/badge/badge.component"

function VideoPage() {
  return (
    <Basepage menu_col={true}>
      <div className="subtopic-title__container">
        <div className="subtopic-title__text blue-text">GCSE Chemistry</div>
        <div className="subtopic-title__exam">EdExcel</div>
      </div>
      <div className="videopage__container">
        <div className="videopage__video">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/Onif1UmyiTQ"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div className="videopage__info">
          <div className="blue-text videopage__spec">1.43</div>
          <div className="videopage__text">
            <div>Iconic bonding in Compounds</div>
            <div>
              {" "}
              elit, sed do eiusmod tempor incididunt ut lab...Lorem ipsum dolor
              sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut lab.
            </div>
          </div>
          <div className="videopage__badges">
            <Badge number="1.2" />
            <Badge number="1.2.3" />
            <Badge number="1.2.3" />
          </div>
        </div>
      </div>
    </Basepage>
  )
}

export default VideoPage
