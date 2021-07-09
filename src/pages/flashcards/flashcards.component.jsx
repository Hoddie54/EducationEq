import "./flashcards.styles.scss"
import "../basepage/basepage.component"
import Basepage from "../basepage/basepage.component"
import Feedback from "../../components/feedback/feedback.component"
import { IconSVG } from "../../components/icon-svg"
import { useEffect, useState } from "react"

function Flashcards(props) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [currentCard, setCurrentCard] = useState(0)

  let flashcards = [
    {
      content1: "What is the charge of a Proton",
      content2: "+1",
      subtopic: "1",
    },
    {
      content1: "What is the charge of a electron",
      content2: "-1",
      subtopic: "1",
    },
    {
      content1: "What is the charge of a neutron",
      content2: "0",
      subtopic: "1",
    },
    {
      content1: "What is the atomic number?",
      content2: "Number of protons",
      subtopic: "1",
    },
    {
      content1: "What is the mass number?",
      content2: "Number of protons and neutrons",
      subtopic: "1",
    },
    {
      content1: "What are isotopes?",
      content2: "Atoms of the same element with different numbers of neutrons",
      subtopic: "1",
    },
    {
      content1: "Who discovered the plum pudding model?",
      content2: "JJ Thompson",
      subtopic: "1",
    },
    {
      content1: "What is an Atom",
      content2:
        "Smallest particle of an element - consists of nucleus with protons and neutrons surrounded by electrons",
      subtopic: "1",
    },
    {
      content1: "What is the Atomic number of Sodium",
      content2: "11",
      subtopic: "1",
    },
    {
      content1: "What is the Mass number of Sodium",
      content2: "23",
      subtopic: "1",
    },
    {
      content1: "What is the symbol for Sodium",
      content2: "Na",
      subtopic: "1",
    },
    {
      content1: "What did Mendeleev do?",
      content2:
        "Organised his table based on the elements atomic mass but had the immense foresight to leave spaces where he thought an élément was missing",
      subtopic: "2",
    },
    {
      content1: "Current table",
      content2:
        "Organised based on atomic number (n# of p+ and neutrons) - organised into périods and groups",
      subtopic: "2",
    },
    {
      content1: "Périods",
      content2: "Represent the maximum number of occupied Energy levels",
      subtopic: "2",
    },
    {
      content1: "Groups",
      content2:
        "Represent elements that share the same number of électrons in their outermost Energy level (valence Energy level) valence Shell occupied by 8 électrons is referred to as a stable octet.",
      subtopic: "2",
    },
    {
      content1: "Group 1",
      content2: "Alkali metals",
      subtopic: "2",
    },
    {
      content1: "Group 7",
      content2: "Halogens",
      subtopic: "2",
    },
    {
      content1: "Molecule",
      content2: "A group of atoms bonded together",
      subtopic: "2",
    },
    {
      content1: "Halide",
      content2:
        "A compound formed from a halogen and an element from another group",
      subtopic: "2",
    },
    {
      content1: "Symbol for calcium",
      content2: "Ca",
      subtopic: "2",
    },
    {
      content1: "Symbol for fluorine",
      content2: "F",
      subtopic: "2",
    },
    {
      content1: "Symbol for Sodium Chloride",
      content2: "NaCl",
      subtopic: "2",
    },
  ]

  flashcards = flashcards.filter((flashcard) => {
    return parseInt(flashcard["subtopic"]) === parseInt(props.match.params.id)
  })

  const initial_ratings = flashcards.map(() => {
    return ""
  })

  const [ratings, setRatings] = useState(initial_ratings)

  let flashcard_html = ""

  useEffect(() => {
    flashcard_html = document.getElementsByClassName("flashcard__container")[0]
  })

  const current_flashcard = flashcards[currentCard]

  function flipCard() {
    flashcard_html.classList.add("animate")
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
    setRatings((state) => {
      const new_state = [...state]
      new_state[current] = rating
      return new_state
    })
  }

  function getCount(rating) {
    let count = 0
    ratings.map((my_rating) => {
      if (my_rating === rating) count++
    })
    return count
  }

  function getCompletion() {
    let completed = 0
    ratings.map((my_rating) => {
      if (my_rating !== "") completed++
    })
    return Math.round((completed * 100) / flashcards.length)
  }

  const completion = getCompletion()

  return (
    <Basepage>
      <Feedback />
      <div className="flashcard__page">
        <div
          className="flashcard__container"
          onAnimationEnd={() => {
            flashcard_html.classList.remove("animate")
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
          {
            <>
              <div className="status__bar">
                <div style={{ width: `${completion}%` }}></div>
              </div>
              <div className="status__completion">
                {`${completion}%`} completion
              </div>
            </>
          }
          <div className="status__card-total">
            {flashcards.length} card deck
          </div>
          <hr />
          <div className="status__deck-overview">Deck overview</div>
          <div className="status__score red">
            <span>Don't know - </span>
            <span>{getCount("red")}</span>
          </div>
          <div className="status__score amber">
            <span>Somewhat - </span>
            <span>{getCount("amber")}</span>
          </div>
          <div className="status__score green">
            <span>Perfect - </span>
            <span>{getCount("green")}</span>
          </div>
        </div>
      </div>
    </Basepage>
  )
}

export default Flashcards
