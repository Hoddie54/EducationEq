import { useState } from "react"
import "./tutoring-form-2.styles.scss"

function TutoringForm2(props) {
  function onSubmit(e) {
    e.preventDefault()
    if (
      !formDetails.Physics.active &&
      !formDetails.Chemistry.active &&
      !formDetails.Mathematics.active &&
      !formDetails.Biology.active
    ) {
      setInvalid(true)
      return
    }
    props.setFormStage(3)
  }

  const { formDetails } = props
  const { formChange } = props
  const { setFormDetails } = props

  const [invalid, setInvalid] = useState(false)

  const subjects = ["Mathematics", "Biology", "Chemistry", "Physics"]

  function Subject(props) {
    function toggleActive() {
      setInvalid(false)
      setFormDetails((state) => {
        return {
          ...state,
          [props.subject]: {
            active: !state[props.subject].active,
            exam_board: state[props.subject].exam_board,
            working_grade: state[props.subject].working_grade,
            approved: false,
          },
        }
      })
    }

    function setWorkingGrade(e) {
      setFormDetails((state) => {
        return {
          ...state,
          [props.subject]: {
            active: state[props.subject].active,
            exam_board: state[props.subject].exam_board,
            working_grade: e.target.value,
            approved: false,
          },
        }
      })
    }

    function setExamBoard(e) {
      setFormDetails((state) => {
        return {
          ...state,
          [props.subject]: {
            active: state[props.subject].active,
            exam_board: e.target.value,
            working_grade: state[props.subject].working_grade,
            approved: false,
          },
        }
      })
    }

    const active = formDetails[props.subject].active

    return (
      <div className="subject">
        <div
          className={`name ${active ? "active" : ""} ${
            invalid ? "invalid" : ""
          }`}
          onClick={toggleActive}
        >
          {props.subject}
        </div>
        <select
          name={`subject_grade_${props.subject}`}
          value={formDetails[props.subject].working_grade}
          onChange={setWorkingGrade}
        >
          {!active ? (
            <option>Not active</option>
          ) : (
            <>
              {formDetails.qualification === "GCSE" ? (
                <>
                  <option value={3}>Grade 3</option>
                  <option value={4}>Grade 4</option>
                  <option value={5}>Grade 5</option>
                  <option value={6}>Grade 6</option>
                  <option value={7}>Grade 7</option>
                  <option value={8}>Grade 8</option>
                  <option value={9}>Grade 9</option>
                  <option value="na">I don't know</option>
                </>
              ) : (
                <>
                  <option value="E">Grade E</option>
                  <option value="D">Grade D</option>
                  <option value="C">Grade C</option>
                  <option value="B">Grade B</option>
                  <option value="A">Grade A</option>
                  <option value="A*">Grade A*</option>
                  <option value="na">I don't know</option>
                </>
              )}
            </>
          )}
        </select>
        <select
          value={formDetails[props.subject].exam_board}
          onChange={setExamBoard}
        >
          {!active ? (
            <option>Not active</option>
          ) : (
            <>
              <option value="edexcel">Edexcel</option>
              <option value="ocr">OCR</option>
              <option value="aqa">AQA</option>
              <option value="wjec">WJEC</option>
              <option value="other">Other</option>
              <option value="na">I don't know</option>
            </>
          )}
        </select>
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-2">
          <div className="form-lhs">
            <label>What qualifications is your child studying?</label>
            <select
              name="qualification"
              value={formDetails.qualification}
              onChange={(ev) => {
                setFormDetails((state) => {
                  return {
                    ...state,
                    Physics: {
                      active: false,
                      exam_board: "edexcel",
                      working_grade: ev.target.value === "GCSE" ? "3" : "E",
                      approved: false,
                    },
                    Chemistry: {
                      active: false,
                      exam_board: "edexcel",
                      working_grade: ev.target.value === "GCSE" ? "3" : "E",
                      approved: false,
                    },
                    Mathematics: {
                      active: false,
                      exam_board: "edexcel",
                      working_grade: ev.target.value === "GCSE" ? "3" : "E",
                      approved: false,
                    },
                    Biology: {
                      active: false,
                      exam_board: "edexcel",
                      working_grade: ev.target.value === "GCSE" ? "3" : "E",
                      approved: false,
                    },
                  }
                })
                formChange(ev)
              }}
              required
            >
              <option value="GCSE">GCSEs</option>
              <option value="A-level">A-levels</option>
            </select>
            <label>What year group is your child in?</label>
            <select
              name="year_group"
              value={formDetails.year_group}
              onChange={formChange}
              required
            >
              <option value={9}>Year 9</option>
              <option value={10}>Year 10</option>
              <option value={11}>Year 11</option>
              <option value={12}>Year 12</option>
              <option value={13}>Year 13</option>
            </select>
            <input
              name="child_name"
              type="text"
              placeholder="What is your child's name?"
              value={formDetails.child_name}
              onChange={formChange}
              required
            />
            <textarea
              name="reason_for_tutoring"
              placeholder="Is there any particular reason you have purchases tutoring / do you have any particular goal in mind?"
              value={formDetails.reason_for_tutoring}
              rows={3}
              onChange={formChange}
            />
            <textarea
              name="additional_info"
              type="text"
              placeholder="Any additional information you'd like to tell us"
              value={formDetails.additional_info}
              onChange={formChange}
            />
          </div>
          <div className="form-rhs">
            <label>Which subjects would you like tutoring in?</label>
            <label>
              <small>
                Select all of the below that apply and add details to help us
                set-up lessons
              </small>
            </label>
            <div className="subject-selection">
              <div className="titles">
                <div>Subject</div>
                <div>Working grade</div>
                <div>Exam board</div>
              </div>
              {subjects.map((subject, index) => {
                return <Subject subject={subject} key={index} />
              })}
            </div>
            <div className="disclaimer">
              Your child will receive 1 lesson per week for each of the subjects
              that you selected for the question above
            </div>
          </div>
        </div>
        <button type="submit">Next</button>
      </form>
    </div>
  )
}

export default TutoringForm2
