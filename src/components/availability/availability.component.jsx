import "./availability.styles.scss"
import { arrayRemove, timedayToNumber } from "../../utils/helpers/misc"

function Availability(props) {
  const weekday_timings = [16, 17, 18, 19, 20]
  const weekend_timings = [9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20]

  const weekday_days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  const weekend_days = ["Saturday", "Sunday"]

  const { availabilityDetails } = props
  const { setAvailabilityDetails } = props

  function Checkbox(props) {
    const timeday_number = timedayToNumber(props.day_index, props.time)
    const checked = !availabilityDetails.includes(timeday_number)

    function toggle() {
      setAvailabilityDetails((state) => {
        console.log(state)
        let new_availability = [...state]
        if (new_availability.includes(timeday_number)) {
          return arrayRemove(new_availability, timeday_number)
        } else {
          new_availability.push(timeday_number)
        }
        return new_availability

        // const new_availability = [...state]
        // new_availability[timeday_number] = !new_availability[timeday_number]
        // return new_availability
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
    <div className="avail-form-3">
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
    </div>
  )
}

export default Availability
