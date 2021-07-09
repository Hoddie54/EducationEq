import "./filtered-cards.styles.scss"
import { useState, useCallback, useEffect } from "react"
import { getVideo, getVideos } from "../../utils/firebase/firestore"
import VideoCardNew from "../video-card-new/video-card-new.component"
import GeneralCard from "../general-card/general-card.compontent"

function FilteredCards(props) {
  const [videos1, setVideos1] = useState([])
  const [videos2, setVideos2] = useState([])

  const getData = useCallback(async () => {
    const videos1 = await getVideos("EDEQ77363436", "EDEQ81971221")
    const videos2 = await getVideos("EDEQ77363436", "EDEQ83612400")
    setVideos1(videos1)
    setVideos2(videos2)
  }, [])

  useEffect(() => {
    getData()
  }, [getData])

  const cards = [
    {
      text1: "EdEq Set",
      text2: "Atomic structure",
      card_count: "11",
      button_text: "Explore pack",
      type: "Flashcards",
      subtopic: "1",
      button_link: "/flashcard/1",
    },
    {
      text1: "Miss Paige",
      text2: "Atomic structure Foundation",
      card_count: "6",
      button_text: "Explore pack",
      button_disabled: true,
      type: "Flashcards",
      subtopic: "1",
    },
    {
      text1: "Miss Paige",
      text2: "Atomic structure Higher",
      card_count: "8",
      button_text: "Explore pack",
      button_disabled: true,
      type: "Flashcards",
      subtopic: "1",
    },
    {
      text1: "Your set",
      text2: "Everything I need to know",
      card_count: "5",
      button_text: "Explore pack",
      button_disabled: true,
      type: "Flashcards",
      subtopic: "1",
    },
    {
      text1: "EdEq Set",
      text2: "The periodic table",
      card_count: "11",
      button_text: "Explore pack",
      type: "Flashcards",
      subtopic: "2",
      button_link: "/flashcard/2",
    },
    {
      text1: "Miss Paige",
      text2: "The periodic table",
      card_count: "15",
      button_text: "Explore pack",
      type: "Flashcards",
      subtopic: "2",
      button_disabled: true,
    },
    {
      text1: "Your set",
      text2: "The periodic table",
      card_count: "9",
      button_text: "Explore pack",
      type: "Flashcards",
      subtopic: "2",
      button_disabled: true,
    },
    {
      text1: "EdEq Set",
      text2: "Atomic structure",
      button_text: "Explore pack",
      type: "Questions",
      subtopic: "1",
      button_link: "/questions/1",
    },
    {
      text1: "Miss Paige",
      text2: "Atomic structure foundation",
      button_text: "Explore pack",
      type: "Questions",
      subtopic: "1",
      button_disabled: true,
    },
    {
      text1: "Miss Paige",
      text2: "Atomic structure Higher",
      button_text: "Explore pack",
      type: "Questions",
      subtopic: "1",
      button_disabled: true,
    },
    {
      text1: "EdEq Set",
      text2: "The periodic table",
      button_text: "Explore pack",
      type: "Questions",
      subtopic: "2",
      button_link: "/questions/2",
    },
    {
      text1: "Miss Paige",
      text2: "The periodic table",
      button_text: "Explore pack",
      type: "Questions",
      subtopic: "2",
      button_disabled: true,
    },
    {
      text1: "EdEq Set",
      text2: "Notes",
      type: "Revision notes",
      button_text: "Explore pack",
      subtopic: "1",
      button_link: "/notes/1",
    },
  ]

  const cardsJSX = cards
    .filter((card_data) => {
      return (
        props.tabActiveStates[card_data.type] &&
        card_data.subtopic === props.subtopic
      )
    })
    .map((card_data) => {
      return (
        <GeneralCard
          key={`${card_data.text1} ${Math.random()}`}
          text1={card_data.text1}
          text2={card_data.text2}
          card_count={card_data.card_count}
          button_text={card_data.button_text}
          button_disabled={card_data.button_disabled}
          button_link={card_data.button_link}
        />
      )
    })

  const videos = props.subtopic === "1" ? videos1 : videos2

  return (
    <div className="card__container">
      {videos.length === 0 || !props.tabActiveStates["Video lessons"]
        ? ""
        : videos.map((video) => {
            return (
              <VideoCardNew
                key={video.uid}
                id={video.uid}
                title={video.title}
                url={video.url}
                specpoints={video.specpoints}
                description={video.description}
              />
            )
          })}
      {props.tabActiveStates["Video lessons"] ? "" : cardsJSX}
    </div>
  )
}

export default FilteredCards
