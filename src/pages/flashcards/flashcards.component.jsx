import "./flashcards.styles.scss"
import "../basepage/basepage.component"
import Basepage from "../basepage/basepage.component"
import Feedback from "../../components/feedback/feedback.component"
import { IconSVG } from "../../components/icon-svg"
import { useState } from "react"

function Flashcards(props) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [currentCard, setCurrentCard] = useState(0)

  const initial_flashcards = [
    {
      content1: "Mass number",
      content2: "Some other tex2st",
      rating: "",
      completed: false,
    },
    {
      content1: "Mass foofufu",
      content2: "Some fooffuf text",
      rating: "",
      completed: false,
    },
    {
      content1: "Amir eats cheese",
      content2: "Il aime Brie et Comte",
      rating: "",
      completed: false,
    },
  ]

  const [flashcards, setFlashcards] = useState(initial_flashcards)

  const flashcard = document.getElementsByClassName("flashcard__container")[0]

  const current_flashcard = flashcards[currentCard]

  function flipCard() {
    flashcard.classList.add("animate")
    setIsFlipped((state) => {
      return !state
    })
  }

  function incrementUp() {
    setCurrentCard((state) => {
      if (state < flashcards.length - 1) {
        return state + 1
      } else {
        return state
      }
    })
  }

  function incrementDown() {
    setCurrentCard((state) => {
      if (state >= 1) {
        return state - 1
      } else {
        return state
      }
    })
  }

  function setRating(current, rating) {
    setFlashcards((state) => {
      return {
        ...state,
        [state[current].rating]: rating,
      }
    })
  }

  //WORK ON THIS
  const ratings = { red: 0, amber: 0, green: 0 }
  flashcards.map((flash) => {
    ratings[[flash.rating]] += 1
    console.log(ratings)
  })

  return (
    <Basepage>
      <Feedback />
      <div className="flashcard__page">
        <div
          className="flashcard__container"
          onAnimationEnd={() => {
            flashcard.classList.remove("animate")
          }}
        >
          <div className="flashcard">
            <div className="flashcard__flip">
              Click on the card to flip to the other side
            </div>
            <div className="flashcard__content" onClick={flipCard}>
              {!isFlipped
                ? current_flashcard.content1
                : current_flashcard.content2}
            </div>
            <hr />
            <div className="flashcard__buttons">
              <div
                className="flashcard__button red"
                onClick={() => {
                  setRating(currentCard, "red")
                }}
              >
                Don't know
              </div>
              <div
                className="flashcard__button amber"
                onClick={() => {
                  setRating(currentCard, "amber")
                }}
              >
                Somewhat
              </div>
              <div
                className="flashcard__button green"
                onClick={() => {
                  setRating(currentCard, "green")
                }}
              >
                Perfect
              </div>
            </div>
          </div>
          <div className="flashcard__arrows">
            <div id="left" onClick={incrementDown}>
              <IconSVG id="left" name="arrow-down" />
            </div>
            <span>{`${currentCard + 1}/${flashcards.length}`}</span>
            <div id="right" onClick={incrementUp}>
              <IconSVG id="right" name="arrow-down" />
            </div>
          </div>
        </div>
        <div className="flashcard__status">
          <div className="status__title">Atomic structure</div>
          <div className="status__bar">
            <div></div>
          </div>
          <div className="status__completion">20% completion</div>
          <div className="status__card-total">20 card deck</div>
          <hr />
          <div className="status__deck-overview">Deck overview</div>
          <div className="status__score red">
            <span>Don't know - </span>
            <span>{ratings.red}</span>
          </div>
          <div className="status__score amber">
            <span>Somewhat - </span>
            <span>{ratings.amber}</span>
          </div>
          <div className="status__score green">
            <span>Perfect - </span>
            <span>{ratings.green}</span>
          </div>
        </div>
      </div>
    </Basepage>
  )
}

export default Flashcards
