import { useEffect, useState } from "react"
import SpinnerPage from "../../pages/spinner/spinner.component"
import { getAllMyClasses } from "../../utils/firebase/firestore"
import "./upcoming-bookings.styles.scss"

function UpcomingBookings(props) {
  const [myClasses, setMyClasses] = useState([])

  useEffect(() => {
    async function getAllMyClassesAsync() {
      const result = await getAllMyClasses(props.currentUser.uid)
      setMyClasses(result)
    }
    getAllMyClassesAsync()
  }, [])

  function Booking(props) {
    return (
      <div className="booking-wrapper">
        <div className="information">
          <div>{props.data.subject}</div>
          <div>{props.data.date}</div>
          <div>{props.data.topic}</div>
          <div>{props.data.time}</div>
        </div>
        <div className="launch-button">Launch</div>
      </div>
    )
  }

  return (
    <div className="upcoming-wrapper">
      <div className="upcoming-title">Upcoming bookings</div>
      <hr />
      {myClasses ? (
        <SpinnerPage />
      ) : (
        myClasses.map((my_class, index) => {
          return <Booking data={my_class} key={index} />
        })
      )}
    </div>
  )
}

export default UpcomingBookings
