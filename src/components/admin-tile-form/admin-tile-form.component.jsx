import "./admin-tile-form.styles.scss"
import Availability from "../availability/availability.component"
import { useState, useEffect } from "react"

function AdminTileForm(props) {
  function onSubmit(e) {
    e.preventDefault()
    props.onSubmit(formData)
  }

  async function loadFormData() {
    const data = await props.getLoadedFormData()
    setLoadedForm(data)
    setLoading(false)
  }

  const [isLoading, setLoading] = useState(props.getLoadedFormData)
  const [loadedForm, setLoadedForm] = useState([])
  const [formData, setFormData] = useState(props.initial_state)

  const form = Array.prototype.concat(props.form, loadedForm)

  function onChange(e) {
    setFormData((state) => {
      return {
        ...state,
        [e.target.name]: e.target.value,
      }
    })
  }

  function onChangeSelect(e) {
    setFormData((state) => {
      let value = Array.from(e.target.selectedOptions, (option) => option.value)
      return {
        ...state,
        [e.target.name]: value,
      }
    })
  }

  return (
    <div className="admin-form">
      <div className="title">
        <b>{props.title}</b>
        {isLoading ? (
          <>
            <br />
            LOADING
            <button onClick={loadFormData}>Load data</button>
          </>
        ) : (
          ""
        )}
      </div>
      <form onSubmit={onSubmit}>
        {form.map((input, index) => {
          switch (input.html_type) {
            case "input":
              return (
                <input
                  key={index}
                  type={input.type}
                  onChange={onChange}
                  required={input.required}
                  placeholder={input.placeholder}
                  name={input.name}
                  value={formData[input.name]}
                  min={input.min}
                  max={input.max}
                />
              )
            case "textarea":
              return (
                <textarea
                  key={index}
                  onChange={onChange}
                  name={input.name}
                  value={formData[input.name]}
                  required={input.required}
                  placeholder={input.placeholder}
                  rows={3}
                  cols={3}
                />
              )
            case "select":
              return (
                <select
                  key={index}
                  onChange={input.multiple ? onChangeSelect : onChange}
                  name={input.name}
                  value={formData[input.name]}
                  required={input.required}
                  multiple={input.multiple}
                  size={input.options.length}
                >
                  {input.options.map((option, index) => {
                    return (
                      <option key={index} value={option.value}>
                        {option.text}
                      </option>
                    )
                  })}
                </select>
              )
            case "availability":
              return (
                <Availability
                  key={index}
                  availabilityDetails={formData[input.name]}
                  setAvailabilityDetails={(new_state) => {
                    setFormData((state) => {
                      return {
                        ...state,
                        [input.name]: new_state(state[input.name]),
                      }
                    })
                  }}
                />
              )
          }
        })}
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AdminTileForm
