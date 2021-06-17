import "./subtopicpage.styles.scss"
import VideoCardNew from "../../components/video-card-new/video-card-new.component"
import Basepage from "../basepage/basepage.component"

function SubtopicPage(props) {
  console.log(props.match.params)

  return (
    <>
      <Basepage menu_col={true}>
        <div className="subtopic-title__container">
          <div className="subtopic-title__text blue-text">GCSE Chemistry</div>
          <div className="subtopic-title__exam">EdExcel</div>
        </div>
        <div className="subtopic-main-content">
          <div className="subtopic-header">
            <div className="subtopic-header__text">4.3: Acids and Alkalis</div>
            <div className="button-container">
              <button className="selected">Featured</button>
              <button className="">Extra videos</button>
            </div>
          </div>
          <div className="subtopic-content__container">
            <VideoCardNew />
            <VideoCardNew />
            <VideoCardNew />
            <VideoCardNew />
          </div>
        </div>
      </Basepage>
    </>
  )
}

export default SubtopicPage
