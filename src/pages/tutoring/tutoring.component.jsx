import "./tutoring.styles.scss"
import Basepage from "../basepage/basepage.component"
import { IconSVG } from "../../components/icon-svg"
import { useState } from "react"
import { useEffect } from "react"
import { getAllClasses } from "../../utils/firebase/firestore"
import ClassCard from "../../components/class-card/class-card.component"
import SpinnerPage from "../spinner/spinner.component"
import TutoringOffer from "../../components/tutoring-offer/tutoring-offer.component"

function Tutoring(props) {
  const [classes, setClasses] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getClasses() {
      const new_classes = await getAllClasses()
      setClasses(new_classes)
      setIsLoading(false)
    }
    getClasses()
  }, [])

  const [allClassCounter, setAllClassCounter] = useState(0)
  const [myClassCounter, setMyClassCounter] = useState(0)

  function updateAllClassCounter(increment) {
    setAllClassCounter((state) => {
      if (filteredAllClasses.length <= 3) return 0
      if (state + increment <= 0) return 0
      if (state + increment >= filteredAllClasses.length - 3)
        return filteredAllClasses.length - 3
      return state + increment
    })
  }

  function updateMyClassCounter(increment) {
    setMyClassCounter((state) => {
      if (myClasses.length <= 3) return 0
      if (state + increment <= 0) return 0
      if (state + increment >= myClasses.length - 3) return myClasses.length - 3
      return state + increment
    })
  }

  const [filter, setFilter] = useState({ subject: "", yearGroup: "", date: "" })

  function updateFilter(event) {
    setFilter((state) => {
      return { ...state, [event.target.name]: event.target.value }
    })
    setAllClassCounter(0)
  }

  const myClasses = classes.filter((my_class) => {
    if (!my_class.students) return false
    return my_class.students.includes(props.currentUser.uid)
  })

  const filteredAllClasses = classes
    .filter((my_class) => {
      if (filter.subject === "") return true
      if (filter.subject === my_class.subject) return true
      return false
    })
    .filter((my_class) => {
      if (filter.yearGroup === "") return true
      if (filter.yearGroup === my_class.year_group) return true
      return false
    })
    .filter((my_class) => {
      if (filter.date === "") return true
      const today_dt = new Date(Date.now())
      const today = new Date(
        `${today_dt.getFullYear()}-${
          today_dt.getMonth() + 1
        }-${today_dt.getDate()}`
      )
      const class_date = new Date(my_class.date + " 00:00:00")
      const time_difference = class_date - today
      const days_difference = time_difference / 86400000

      console.log(days_difference)

      if (filter.date === "0" && time_difference === 0) return true
      if (filter.date !== "0" && days_difference <= filter.date) return true
      return false
    })
    .filter((my_class) => {
      if (!my_class.students) return true
      return !my_class.students.includes(props.currentUser.uid)
    })

  const filteredClassesToDisplay = filteredAllClasses.slice(
    allClassCounter,
    allClassCounter + 3
  )

  const myClassesToDisplay = myClasses.slice(myClassCounter, myClassCounter + 3)

  return (
    <Basepage>
      {isLoading && <SpinnerPage />}
      <div className="tutoring-wrapper">
        <div className="tutoring-title">My upcoming lessons</div>
        {myClasses.length === 0 ? (
          <div className="offer-container">
            {" "}
            <TutoringOffer />
          </div>
        ) : (
          <>
            <div className="tutoring-lessons-wrapper">
              <div
                className="arrow-left"
                onClick={() => updateMyClassCounter(-1)}
              >
                <IconSVG name="arrow-down" />
              </div>
              <div className="tutoring-lessons">
                {myClassesToDisplay.map((my_class, index) => {
                  const data = {
                    ...my_class,
                  }
                  return (
                    <ClassCard
                      key={my_class.class_id}
                      data={data}
                      launch={true}
                    />
                  )
                })}
              </div>
              <div
                className="arrow-right"
                onClick={() => updateMyClassCounter(1)}
              >
                <IconSVG name="arrow-down" />
              </div>
            </div>
            <div className="tutoring-counter">
              {myClassCounter + 1}/{myClasses.length}
            </div>
          </>
        )}
        <div className="tutoring-title">All available lessons</div>
        <div className="tutoring-filter">
          <select name="subject" value={filter.subject} onChange={updateFilter}>
            <option value="">Subject filter</option>
            <option value="GCSE Maths">GCSE Maths</option>
            <option value="GCSE Physics">GCSE Physics</option>
            <option value="GCSE Chemistry">GCSE Chemistry</option>
            <option value="A-level Maths">A-level Maths</option>
            <option value="A-level Physics">A-level Physics</option>
          </select>
          <select
            name="yearGroup"
            value={filter.yearGroup}
            onChange={updateFilter}
          >
            <option value="">Year group filter</option>
            <option value="Y12">Year 12</option>
            <option value="Y13">Year 13</option>
            <option value="GCSE">GCSE</option>
          </select>
          <select name="date" value={filter.date} onChange={updateFilter}>
            <option value="">Date filter</option>
            <option value="0">Today only</option>
            <option value="3">Within next 3 days</option>
            <option value="7">Within next week</option>
          </select>
        </div>
        <div className="tutoring-lessons-wrapper">
          <div className="arrow-left" onClick={() => updateAllClassCounter(-1)}>
            <IconSVG name="arrow-down" />
          </div>
          <div className="tutoring-lessons">
            {filteredClassesToDisplay.map((my_class, index) => {
              const data = {
                ...my_class,
              }
              return (
                <ClassCard key={my_class.class_id} data={data} launch={false} />
              )
            })}
          </div>
          <div className="arrow-right" onClick={() => updateAllClassCounter(1)}>
            <IconSVG name="arrow-down" />
          </div>
        </div>
        <div className="tutoring-counter">
          {allClassCounter + 1}/{filteredAllClasses.length}
        </div>
      </div>
    </Basepage>
  )
}

export default Tutoring
