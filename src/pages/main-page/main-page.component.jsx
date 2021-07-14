import "./main-page.styles.scss"
import Basepage from "../basepage/basepage.component"
import SpecPointCard from "../../components/specpointcard/specpointcard.component"
import Feedback from "../../components/feedback/feedback.component"

function MainPage() {
  const initial_data = [0, 0, 0, 0, 0]

  return (
    <Basepage>
      <Feedback />
      <div className="main-page__selector">
        <div className="main-page__topic">
          <span>Topic: </span>
          <select>
            <option>Topic 1</option>
            <option>Topic 2</option>
          </select>
        </div>
        <div className="main-page__topic">
          <span>Subtopic: </span>
          <select>
            <option>Subtopic 1</option>
            <option>Subtopic 2</option>
          </select>
        </div>
      </div>
      <div className="main-page__content">
        {initial_data.map((data) => {
          return (
            <SpecPointCard
              key={Math.random()}
              title="Dalton model"
              number="1.1.1"
              text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
            />
          )
        })}
      </div>
    </Basepage>
  )
}

export default MainPage
