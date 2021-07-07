import "./filtered-cards.styles.scss"
import { useState, useCallback, useEffect } from "react"
import { getVideos } from "../../utils/firebase/firestore"
import VideoCardNew from "../video-card-new/video-card-new.component"
import GeneralCard from "../general-card/general-card.compontent"

function FilteredCards(props) {
  const [videos, setVideos] = useState([])

  const getData = useCallback(async () => {
    const videos = await getVideos("EDEQ77363436", "EDEQ81971221")
    setVideos(videos)
  }, [])

  useEffect(() => {
    getData()
  }, [getData])

  const cards = [
    {
      text1: "Pack 1",
      text2: "Atomic structure",
      card_count: "15",
      button_text: "Explore pack",
    },
    {
      text1: "Pack 1",
      text2: "Atomic structure",
      card_count: "12",
      button_text: "Explore pack",
    },
    {
      text1: "Pack 1",
      text2: "Atomic structure",
      card_count: "11",
      button_text: "Explore pack",
    },
    {
      text1: "Pack 1",
      text2: "Atomic structure",
      card_count: "11",
      button_text: "Explore pack",
      button_disabled: true,
    },
  ]

  const cardsJSX = cards.map((card_data) => {
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
