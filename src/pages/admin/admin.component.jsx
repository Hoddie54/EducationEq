import { useEffect } from "react"
import { useState } from "react"
import { addClass, addMeToClass } from "../../utils/firebase/cloud"
import { getAllClasses } from "../../utils/firebase/firestore"
import { getClassURL, removeMeFromClass } from "../../utils/firebase/cloud"
import "./admin.styles.scss"

function Admin() {
  const defaultform = {
    title: "",
    date: "",
    subject: "GCSE Maths",
    start_time: "",
    end_time: "",
    teacher_name: "",
    year_group: "Y12",
    topic: "",
    learning_objectives: "",
    cost: "",
  }
  const [formdata, setFormdata] = useState(defaultform)

  const [status, setStatus] = useState("Default")

  function changeForm(event) {
    const name = event.target.name
    setFormdata((state) => {
      return { ...state, [name]: event.target.value }
    })
  }

  function submit(event) {
    event.preventDefault()

    const start_time_and_date = new Date(
      `${formdata.date} ${formdata.start_time}`
    ).getTime()

    addClass({ ...formdata, start_time_and_date }).then((res) => {
      console.log(res)
      setStatus(JSON.stringify(res))
    })
    setFormdata(defaultform)
  }

  //CLASSES GETTING

  const [classes, setClasses] = useState()

  const [selectedClass, setSelectedClass] = useState()

  useEffect(() => {
    async function getClasses() {
      const classes = await getAllClasses()
      setClasses(classes)
      setSelectedClass(classes[0].id)
    }
    getClasses()
  }, [])

  async function getClassURLAsync(class_id) {
    const result = await getClassURL(class_id)
    setStatus(JSON.stringify(result))
  }

  async function addMeToClassAsync(selectedClass) {
    const result = await addMeToClass(selectedClass)
    setStatus(JSON.stringify(result))
  }

  async function removeMeFromClassAsync(selectedClass) {
    const result = await removeMeFromClass(selectedClass)
    setStatus(JSON.stringify(result))
  }

  return (
    <div>
      <div className="admin_header">Admin panel</div>
      <div>
        <div className="admin_form">
          <div>Add new lesson</div>
          <form onSubmit={submit}>
            <input
              type="text"
              name="title"
              placeholder="Enter class title"
              value={formdata.title}
              onChange={changeForm}
              required
            />
            {/* <input
              type="text"
              name="subject"
              placeholder="Enter subject"
              value={formdata.subject}
              onChange={changeForm}
              required
            /> */}
            <select
              name="subject"
              value={formdata.subject}
              onChange={changeForm}
            >
              <option value="GCSE Maths" selected>
                GCSE Maths
              </option>
              <option value="GCSE Physics">GCSE Physics</option>
              <option value="GCSE Chemistry">GCSE Chemistry</option>
              <option value="A-level Maths">A-level Maths</option>
              <option value="A-level Physics">A-level Physics</option>
            </select>
            <input
              type="date"
              name="date"
              required
              value={formdata.date}
              onChange={changeForm}
            />
            <input
              type="time"
              name="start_time"
              required
              value={formdata.start_time}
              onChange={changeForm}
            />
            <input
              type="time"
              name="end_time"
              required
              value={formdata.end_time}
              onChange={changeForm}
            />
            <input
              type="text"
              name="teacher_name"
              placeholder="Teacher name"
              required
              value={formdata.teacher_name}
              onChange={changeForm}
            />
            {/* <input
              type="text"
              name="year_group"
              placeholder="Year group (String)"
              required
              value={formdata.year_group}
              onChange={changeForm}
            /> */}
            <select
              value={formdata.year_group}
              name="year_group"
              onChange={changeForm}
            >
              <option value="Y12" selected>
                Year 12
              </option>
              <option value="Y13">Year 13</option>
              <option value="GCSE">GCSE</option>
            </select>
            <input
              type="text"
              name="topic"
              placeholder="Topic"
              required
              value={formdata.topic}
              onChange={changeForm}
            />
            <textarea
              name="learning_objectives"
              placeholder="Learning objectives"
              required
              value={formdata.learning_objectives}
              onChange={changeForm}
            />
            <input
              type="number"
              name="cost"
              placeholder="Cost"
              required
              value={formdata.cost}
              onChange={changeForm}
            />
            <button type="submit">Add lesson</button>
          </form>
        </div>
        <div className="admin_status">
          <div>
            <b>Status</b>
          </div>
          <hr />
          <div>{status}</div>
        </div>
      </div>
      <div className="admin-classes">
        {classes &&
          classes.map((my_class, index) => {
            return (
              <div key={index}>
                <div>Properties: {JSON.stringify(my_class)}</div>
                <hr />
              </div>
            )
          })}
      </div>
      `{" "}
      <div className="admin-classes">
        <select
          value={selectedClass}
          onChange={(event) => {
            setSelectedClass(event.target.value)
          }}
        >
          {classes &&
            classes.map((my_class, index) => (
              <option key={index} value={my_class.id}>
                {my_class.title}
              </option>
            ))}
        </select>
        <button onClick={() => addMeToClassAsync(selectedClass)}>
          Add me to this class
        </button>
        <button onClick={() => removeMeFromClassAsync(selectedClass)}>
          Cancel me from this class
        </button>
      </div>
      <div className="admin-classes">
        {classes &&
          classes.map((my_class, index) => {
            return (
              <button
                key={index}
                onClick={() => getClassURLAsync(my_class.class_id)}
              >
                Get {my_class.title} URL
              </button>
            )
          })}
      </div>
    </div>
  )
}

export default Admin
