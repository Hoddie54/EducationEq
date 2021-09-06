import { useEffect, useState } from "react"
import SpinnerPage from "../../pages/spinner/spinner.component"
import { getAllMyClasses } from "../../utils/firebase/firestore"
import "./upcoming-bookings.styles.scss"
import { getClassURL } from "../../utils/firebase/cloud"

function UpcomingBookings(props) {
  const [myClasses, setMyClasses] = useState([])

  useEffect(() => {
    async function getAllMyClassesAsync() {
      const result = await getAllMyClasses(props.currentUser.uid)
      console.log(result)
      setMyClasses(result)
    }
    getAllMyClassesAsync()
  }, [])

  function Booking(props) {
    const clock = (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.0001 18.3333C14.6025 18.3333 18.3334 14.6023 18.3334 9.99996C18.3334 5.39759 14.6025 1.66663 10.0001 1.66663C5.39771 1.66663 1.66675 5.39759 1.66675 9.99996C1.66675 14.6023 5.39771 18.3333 10.0001 18.3333Z"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10 5V10L13.3333 11.6667"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    )
    const calendar = (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.8333 3.33337H4.16667C3.24619 3.33337 2.5 4.07957 2.5 5.00004V16.6667C2.5 17.5872 3.24619 18.3334 4.16667 18.3334H15.8333C16.7538 18.3334 17.5 17.5872 17.5 16.6667V5.00004C17.5 4.07957 16.7538 3.33337 15.8333 3.33337Z"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M13.3333 1.66663V4.99996"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6.66675 1.66663V4.99996"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2.5 8.33337H17.5"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    )

    async function launch() {
      const result = await getClassURL(props.data.class_id)
      console.log(result)
      window.open(result.data.launchurl, "_blank")
    }

    return (
      <div className="booking-wrapper">
        <div className="information">
          <div>{props.data.subject}</div>
          <div>
            {calendar}
            {props.data.date}
          </div>
          <div>{props.data.topic}</div>
          <div>
            {clock}
            {props.data.start_time}
          </div>
        </div>
        <div onClick={launch} className="launch-button">
          Launch
        </div>
      </div>
    )
  }

  return (
    <div className="upcoming-wrapper">
      <div className="upcoming-title">Upcoming bookings</div>
      <hr />
      {!myClasses ? (
        <SpinnerPage />
      ) : (
        myClasses.map((my_class, index) => {
          return <Booking data={my_class} key={index} />
        })
      )}
      <div className="no-classes">
        {myClasses.length === 0 ? "No classes founded" : ""}
      </div>
    </div>
  )
}

export default UpcomingBookings
