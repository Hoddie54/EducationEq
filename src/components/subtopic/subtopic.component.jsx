import MyCourseNewTopicModal from "../myCourseNewTopicModal/myCourseNewTopicModal.component"
import "./subtopic.styles.scss"
import { useState } from "react"

function Subtopic(props) {
  const { first, last } = props
  const { moveUp, moveDown } = props
  const { points } = props

  const [showModal, setShowModal] = useState(false)

  return (
    <div className="subtopic">
      <div className="edeq-topic">
        <div>
          <div>{`${props.topic_index + 1}.${props.index + 1}`}</div>
          <div className="edeq-heading">{props.title}</div>
        </div>
        <div>
          <div
            className={`up-down ${first ? "blurred" : ""}`}
            onClick={() => {
              if (first) return
              moveUp()
            }}
          >
            ▲
          </div>
          <div
            className={`up-down ${last ? "blurred" : ""}`}
            onClick={() => {
              if (last) return
              moveDown()
            }}
          >
            ▼
          </div>
        </div>
      </div>
      <div className="point-holder">
        {points
          .sort((a, b) => {
            return a.order < b.order
          })
          .map((point, index) => {
            const first = index === 0
            const last = index === points.length - 1

            return (
              <div className="point edeq-topic" key={index}>
                <div>
                  <div>{`${props.topic_index + 1}.${props.index + 1}.${
                    index + 1
                  }`}</div>
                  <div className="edeq-heading">{point.title}</div>
                </div>
                <div>
                  <div
                    className={`up-down ${first ? "blurred" : ""}`}
                    onClick={() => {
                      if (first) return
                      props.movePointUp(props.index, index)
                    }}
                  >
                    ▲
                  </div>
                  <div
                    className={`up-down ${last ? "blurred" : ""}`}
                    onClick={() => {
                      if (last) return
                      props.movePointDown(props.index, index)
                    }}
                  >
                    ▼
                  </div>
                </div>
              </div>
            )
          })}

        <div
          className="edeq-button"
          onClick={() => {
            setShowModal(true)
          }}
        >
          Add new learning point
        </div>
      </div>
      <MyCourseNewTopicModal
        showModal={showModal}
        setShowModal={setShowModal}
        title="Learning point"
        addNewTopic={props.addLearningPoint}
      />
    </div>
  )
}

export default Subtopic
