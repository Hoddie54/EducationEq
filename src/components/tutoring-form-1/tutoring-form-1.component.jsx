import "./tutoring-form-1.styles.scss"

function TutoringForm1(props) {
  function onSubmit() {
    props.setFormStage(2)
  }

  const { formDetails } = props
  const { formChange } = props
  
  return (
    <div className="form-1">
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Please enter your email"
          value={formDetails.email}
          onChange={formChange}
          required
        />
        <label>Please select a password</label>
        <input
          name="password"
          type="password"
          value={formDetails.password}
          onChange={formChange}
          required
        />
        <input
          name="name"
          type="text"
          placeholder="What is your name?"
          value={formDetails.name}
          onChange={formChange}
          required
        />
        <label>Which package did you purchase?</label>
        <select
          name="package"
          value={formDetails.package}
          onChange={formChange}
          required
        >
          {/* <option>Which package have you purchased?</option> */}
          <option value={5}>£60 - 5 lessons</option>
          <option value={10}>£100 - 10 lessons</option>
          <option value={20}>£200 - 20 lessons</option>
        </select>
        <input
          name="phone_number"
          type="tel"
          placeholder="What is your phone number?"
          value={formDetails.phone_number}
          onChange={formChange}
          required
        />
        <button type="submit">Next</button>
      </form>
    </div>
  )
}

export default TutoringForm1
