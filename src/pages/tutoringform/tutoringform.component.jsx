import { useState } from "react"
import TutoringForm1 from "../../components/tutoring-form-1/tutoring-form-1.component"
import TutoringForm2 from "../../components/tutoring-form-2/tutoring-form-2.component"
import TutoringForm3 from "../../components/tutoring-form-3/tutoring-form-3.component"
import "./tutoringform.styles.scss"

function TutoringForm() {
  const [formStage, setFormStage] = useState(1)

  const initialFormState = {
    email: "",
    password: "",
    parent_name: "",
    package: "60",
    phone_number: "",
    qualification: "GCSE",
    year_group: "9",
    child_name: "",
    additional_info: "",
    Physics: {
      active: false,
      exam_board: "edexcel",
      working_grade: "3",
      approved: false,
    },
    Chemistry: {
      active: false,
      exam_board: "edexcel",
      working_grade: "3",
      approved: false,
    },
    Mathematics: {
      active: false,
      exam_board: "edexcel",
      working_grade: "3",
      approved: false,
    },
    Biology: {
      active: false,
      exam_board: "edexcel",
      working_grade: "3",
      approved: false,
    },
    availability: [...Array(49).keys()],
  }

  const [formDetails, setFormDetails] = useState(initialFormState)

  function formChange(e) {
    setFormDetails((state) => {
      console.log(formDetails)
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
          {formStage === 3 ? (
            <TutoringForm3
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
