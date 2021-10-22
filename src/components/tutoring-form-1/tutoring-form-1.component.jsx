import { useState } from "react"
import "./tutoring-form-1.styles.scss"

function TutoringForm1(props) {
  const { formDetails } = props
  const { formChange } = props
  const passwordTooShort = formDetails.password.length < 6

  function onSubmit() {
    if (formDetails.password.length < 6) return
    props.setFormStage(2)
  }

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
        {passwordTooShort && formDetails.password.length > 0
          ? "Please enter a password with at least 7 characters"
          : ""}
        <input
          name="password"
          type="password"
          value={formDetails.password}
          onChange={formChange}
          required
        />
        <input
          name="parent_name"
          type="text"
          placeholder="What is your name?"
          value={formDetails.parent_name}
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
          <option value={60}>£60 - 5 lessons</option>
          <option value={100}>£100 - 10 lessons</option>
          <option value={200}>£200 - 20 lessons</option>
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
