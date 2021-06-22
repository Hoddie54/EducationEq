import { IconSVG } from "../icon-svg"
import SearchSVG from "../../assets/search-svg"
import "./edeq-search.styles.scss"
import { useState } from "react"

function EdeqSearch() {
  const [searchValue, setSearchValue] = useState("")
  const [chosenSubject, setChosenSubject] = useState("")
  //TODO: Implement subject state below

  function handleSearchChange(event) {
    setSearchValue(event.target.value)
  }

  return (
    <>
      <div className="search__title blue-text">
        <SearchSVG />
        <div className="search__title-text">EdEq Search</div>
      </div>
      <div className="search-form">
        <form>
          <div className="search-form__options1">
            <input
              className="search-form__text"
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
            />
            <div className="search-form__options-container">
              <select className="search-form__options">
                <option>Chemistry</option>
              </select>

              <select className="search-form__options">
                <option>AQA</option>
              </select>
            </div>
          </div>
          <button className="search-button">
            <div className="blue-text text-format search-button-click">
              Search now
            </div>
          </button>
        </form>
      </div>
    </>
  )
}

export default EdeqSearch
