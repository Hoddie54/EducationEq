import "./pseudoclass-resolver.styles.scss"
import { useState, useEffect } from "react"
import { getDataFromFirestore } from "../../utils/firebase/firestore"
import {
  SubjectNumberArray,
  abilityArray,
  numberToTimeday,
  dayNumberToDay,
} from "../../utils/helpers/misc"
import {
  resolvePseudoclass,
  getPseudoclassAvailability,
} from "../../utils/firebase/cloud"

function PseudoClassResolver(props) {
  //psuedoclass_uid and tutor_uid in the header

  const [isLoading, setIsLoading] = useState(true)
  const [classData, setClassData] = useState()

  const initial_form_details = { time_selected: "" }
  const [formData, setFormData] = useState(initial_form_details)

  const tutor_uid = props.match.params.tutor_uid
  const pseudoclass_uid = props.match.params.pseudoclass_uid

  useEffect(async () => {
    const data = await getDataFromFirestore("pseudoclasses", pseudoclass_uid)
    const availability = await getPseudoclassAvailability({
      student_availability_uid: data.student_availability_uid,
    })
    console.log(data, availability.data)
    setClassData({ ...data, availability: availability.data })
    setIsLoading(false)
  }, [])

  function onChange(e) {
    setFormData((state) => {
      return {
        ...state,
        [e.target.name]: e.target.value,
      }
    })
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (formData.time_selected === "") {
      alert("Please select a time")
      return
    }
    if (
      window.confirm(
        "Are you sure you can commit to at least 10 weeks of lessons"
      )
    ) {
      const response = await resolvePseudoclass({
        tutor_uid: tutor_uid,
        pseudoclass_uid: pseudoclass_uid,
        time: formData.time_selected,
      })
      if (response.data) {
        alert(response.data)
      } else {
        console.log(response)
        alert(response)
      }
    }
  }

  return (
    <div className="psuedo-resolver">
      <div className="psuedo-content">
        <div className="title">
          {!isLoading && classData.resolved
            ? "THIS CLASS ALREADY HAS A TUTOR"
            : "Book your new class"}
        </div>
        <hr />
        <div className="form">
          {isLoading ? (
            "LOADING - Please wait"
          ) : (
            <>
              <div className="info">
                Subject: {SubjectNumberArray[Number(classData.subject)].text}
              </div>
              <div className="info">Year group: {classData.year_group}</div>
              <div className="info">
                Ability: {abilityArray[Number(classData.ability)].text}
              </div>
              <form onSubmit={onSubmit}>
                <select
                  value={formData.time_selected}
                  name={"time_selected"}
                  onChange={onChange}
                  required
                >
                  <option value="">
                    Please select the time that works for you
                  </option>
                  {classData.availability.map((time, index) => {
                    return (
                      <option value={time} key={index}>
                        {dayNumberToDay(numberToTimeday(time).day_number) +
                          " " +
                          numberToTimeday(time).time +
                          ":00"}
                      </option>
                    )
                  })}
                </select>
                <button type="submit">Confirm</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default PseudoClassResolver
