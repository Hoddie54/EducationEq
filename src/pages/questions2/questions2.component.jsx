import Basepage from "../basepage/basepage.component"
import "./questions2.styles.scss"
import { IconSVG } from "../../components/icon-svg/index"
import RelatedSpecpoints from "../../components/related-specpoints/related-specpoints.components"

function Questions2() {
  return (
    <Basepage>
      <div className="questions2__title-container">
        <div className="button blue-text">
          <div>
            <IconSVG name="arrow-down" />
          </div>
          Back
        </div>
        <div className="questions2__title blue-text">
          Questions: Dalton model
        </div>
        <div className="questions2__exam-board">EdExcel</div>
      </div>
      <div className="questions2__content-container">
        <div className="main-content">
          <div className="questions2__question">
            <div className="question__number blue-text">Question 1</div>
            <div className="question__text">Lorem ipsum cheese cheese</div>
          </div>
          <div className="options__container">
            <div className="option">
              <div className="option__title blue-text">Option A</div>
              <div className="option__text">I am a cheese</div>
            </div>
            <div className="option correct">
              <div className="option__title blue-text">Option B</div>
              <div className="option__text">
                I am a cheese the correct answer
              </div>
            </div>
            <div className="option">
              <div className="option__title blue-text">Option C</div>
              <div className="option__text">I am a cheese</div>
            </div>
            <div className="option incorrect">
              <div className="option__title blue-text">Option D</div>
              <div className="option__text">
                I am a cheese the incorrect answer
              </div>
            </div>
          </div>
          <div className="questions2__explanation">
            <div className="title blue-text">Explanation: </div>
            <div className="explanation">
              I am the reason why. I am the captain now
            </div>
          </div>
          <div className="questions2__buttons blue-text">
            <div className="button">Previous</div>
            <div>4/20</div>
            <div className="button">Next</div>
          </div>
        </div>
        <RelatedSpecpoints specpoints={[0, 0, 0]} />
      </div>
    </Basepage>
  )
}

export default Questions2
