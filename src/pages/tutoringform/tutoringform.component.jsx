import { useState } from "react"
import TutoringForm1 from "../../components/tutoring-form-1/tutoring-form-1.component"
import TutoringForm2 from "../../components/tutoring-form-2/tutoring-form-2.component"
import "./tutoringform.styles.scss"

function TutoringForm() {
  const [formStage, setFormStage] = useState(1)

  const initialFormState = {
    email: "",
    password: "",
    parent_name: "",
    package: "",
    phone_number: "",
    qualification: "",
    year_group: "",
    child_name: "",
    additional_info: "",
    Physics: {
      active: false,
      exam_board: "",
      working_grade: "",
    },
    Chemistry: {
      active: false,
      exam_board: "",
      working_grade: "",
    },
    Mathematics: {
      active: false,
      exam_board: "",
      working_grade: "",
    },
    Biology: {
      active: false,
      exam_board: "",
      working_grade: "",
    },
  }

  const [formDetails, setFormDetails] = useState(initialFormState)

  function formChange(e) {
    setFormDetails((state) => {
      return {
        ...state,
        [e.target.name]: e.target.value,
      }
    })
  }

  return (
    <>
      <div className="t-form-content">
        <div className="form-title">
          Welcome - let's get your lessons set up in 2 minutes
        </div>
        <div className="stage-indicators">
          <div className={formStage === 1 ? "active" : ""}></div>
          <div className={formStage === 2 ? "active" : ""}></div>
          <div className={formStage === 3 ? "active" : ""}></div>
        </div>
        <div className="form-form">
          {formStage === 1 ? (
            <TutoringForm1
              formDetails={formDetails}
              formChange={formChange}
              setFormStage={setFormStage}
            />
          ) : (
            ""
          )}
          {formStage === 2 ? (
            <TutoringForm2
              formDetails={formDetails}
              formChange={formChange}
              setFormStage={setFormStage}
              setFormDetails={setFormDetails}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  )
}

export default TutoringForm
