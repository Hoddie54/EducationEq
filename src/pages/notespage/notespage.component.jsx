import "./notespage.styles.scss"
import Basepage from "../basepage/basepage.component"
import Feedback from "../../components/feedback/feedback.component"
import SpinnerPage from "../spinner/spinner.component"
import { useEffect, useState } from "react"
import { getAllContentForSubtopic } from "../../utils/firebase/firestore"
import { Link } from "react-router-dom"

function Notespage(props) {
  function listify(texts) {
    const formatted_texts = texts.split("/n")
    if (!formatted_texts) return texts
    return (
      <ul>
        {formatted_texts.map((text) => {
          return <li>{text}</li>
        })}
      </ul>
    )
  }

  function lineify(texts) {
    const formatted_texts = texts.split("/n")
    if (!formatted_texts) return texts
    return formatted_texts.map((text) => {
      return (
        <>
          {text} <br />
        </>
      )
    })
  }

  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      const local_data = await getAllContentForSubtopic(props.match.params.id)
      setData(local_data)
      console.log(local_data)
      setIsLoading(false)
    }
    getData()
  }, [])

  return (
    <Basepage>
      {/* <Feedback /> */}
      {isLoading ? (
        <SpinnerPage />
      ) : (
        <>
          <div className="notes__title">Atomic structure - Notes</div>
          <div className="notes__content">
            {data.map((spec) => {
              return (
                <div key={spec.spec_uid}>
                  <div className="spec__title__container">
                    <div className="spec__number">{`Specpoint: ${spec.spec_description[0].number} `}</div>
                    <div className="spec__title">
                      {" "}
                      {spec.spec_description[0].name}
                    </div>
                    <Link to={`/questions2/${spec.spec_uid}`}>
                      <div className="spec__test">Test yourself</div>
                    </Link>
                  </div>

                  <span className="spec__text">
                    {spec.spec_description[0].text}
                  </span>

                  {spec.content.map((content) => {
                    switch (content.type) {
                      case "text":
                        return (
                          <div key={Math.random()} className="notes__text">
                            {listify(content.content)}
                          </div>
                        )
                      // case "title":
                      //   return (
                      //     <div key={Math.random()} className="notes__titles">
                      //       {content.content}
                      //     </div>
                      //   )
                      case "image":
                        return (
                          <img
                            key={Math.random()}
                            src={`/assets/notes/${content.content}`}
                          />
                        )
                      case "list":
                        return listify(content.content)
                      case "footer":
                    }
                  })}
                  <hr />
                </div>
              )
            })}
          </div>
        </>
      )}
    </Basepage>
  )
}

export default Notespage
