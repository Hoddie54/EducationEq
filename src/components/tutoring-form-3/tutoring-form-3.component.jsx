import { registerTutoringUser } from "../../utils/firebase/auth"
import { arrayRemove } from "../../utils/helpers/misc"
import "./tutoring-form-3.styles.scss"
import { timedayToNumber } from "../../utils/helpers/misc"

function TutoringForm3(props) {
  const weekday_timings = [16, 17, 18, 19, 20]
  const weekend_timings = [9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20]

  const weekday_days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  const weekend_days = ["Saturday", "Sunday"]

  const { formDetails } = props
  const { setFormDetails } = props

  async function onSubmit(e) {
    e.preventDefault()
    //DO THE LOGIC and REGISTER
    console.log(formDetails)
    await registerTutoringUser(formDetails)
  }

  function Checkbox(props) {
    const timeday_number = timedayToNumber(props.day_index, props.time)
    const checked = !formDetails.availability.includes(timeday_number)

    function toggle() {
      setFormDetails((state) => {
        // console.log(timeday_number)
        // const new_availability = [...formDetails.availability]
        // new_availability[timeday_number] = !new_availability[timeday_number]
        // return { ...state, availability: new_availability }
        console.log(state)
        let new_availability = [...state.availability]
        if (new_availability.includes(timeday_number)) {
          new_availability = arrayRemove(new_availability, timeday_number)
        } else {
          new_availability.push(timeday_number)
        }
        return { ...state, availability: new_availability }
      })
    }

    return (
      <div className="checkbox" onClick={toggle}>
        {checked ? "X" : ""}
      </div>
    )
  }

  function Day(props) {
    const base_location = {
      gridRowStart: 1,
      gridRowEnd: 2,
      gridColumnStart: props.index + 2,
      growColumnEnd: props.index + 3,
    }

    const day_map_function = (time, index) => {
      const location = {
        gridRowStart: index + 2,
        gridRowEnd: index + 3,
        gridColumnStart: props.index + 2,
        gridColumnEnd: props.index + 3,
      }

      return (
        <div key={time} style={location}>
          <Checkbox time={time} day_index={props.day_number} />
        </div>
      )
    }

    return (
      <>
        <div className="day-label" style={base_location}>
          {props.day}
        </div>

        {props.weekday && weekday_timings.map(day_map_function)}
        {!props.weekday && weekend_timings.map(day_map_function)}
      </>
    )
  }

  return (
    <div className="form-3">
      <div className="weekdays">
        <div className="title-area">
          <div className="title">Weekday timings</div>
          <div className="message">
            Please mark all times you <b>cannot</b> attend
          </div>
        </div>
        <div className="grid weekday">
          {weekday_days.map((day, index) => {
            return (
              <Day
                day={day}
                key={index}
                index={index}
                day_number={index}
                weekday={true}
              />
            )
          })}
          {weekday_timings.map((time, index) => {
            const location = {
              gridRowStart: index + 2,
              gridRowEnd: index + 3,
              gridColumnEnd: 2,
              gridColumnStart: 1,
            }
            return (
              <div className="time-label" key={time} style={location}>
                {`${time}:00 - ${time + 1}:00`}
              </div>
            )
          })}
        </div>
      </div>
      <div className="weekends">
        <div className="title-area">
          <div className="title">Weekend timings</div>
          <div className="message">
            The more times that you leave open, the higher the likelihood that
            we can find you the perfect tutor{" "}
          </div>
        </div>
        <div className="grid weekend">
          {weekend_days.map((day, index) => {
            return (
              <Day
                day={day}
                key={index}
                index={index}
                day_number={index + 5}
                weekday={false}
              />
            )
          })}
          {weekend_timings.map((time, index) => {
            const location = {
              gridRowStart: index + 2,
              gridRowEnd: index + 3,
              gridColumnEnd: 2,
              gridColumnStart: 1,
            }
            return (
              <div className="time-label" key={time} style={location}>
                {`${time}:00 - ${time + 1}:00`}
              </div>
            )
          })}
        </div>{" "}
      </div>
      <form onSubmit={onSubmit}>
        <button>Next</button>
      </form>
    </div>
  )
}

export default TutoringForm3
