import "./videopage2.styles.scss"
import Basepage from "../basepage/basepage.component"
import { IconSVG } from "../../components/icon-svg"
import RelatedSpecpoints from "../../components/related-specpoints/related-specpoints.components"

function VideoPage2(props) {
  function PenTool() {
    return (
      <svg
        width="75"
        height="75"
        viewBox="0 0 117 117"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M58.5 92.625L92.625 58.5L107.25 73.125L73.125 107.25L58.5 92.625Z"
          stroke="#3889FF"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M87.75 63.375L80.4375 26.8125L9.75 9.75L26.8125 80.4375L63.375 87.75L87.75 63.375Z"
          stroke="#3889FF"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9.75 9.75L46.7318 46.7318"
          stroke="#3889FF"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M53.625 63.375C59.0098 63.375 63.375 59.0098 63.375 53.625C63.375 48.2402 59.0098 43.875 53.625 43.875C48.2402 43.875 43.875 48.2402 43.875 53.625C43.875 59.0098 48.2402 63.375 53.625 63.375Z"
          stroke="#3889FF"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    )
  }

  function OpenBook() {
    return (
      <svg
        width="75"
        height="75"
        viewBox="0 0 117 117"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.75 14.625H39C44.1717 14.625 49.1316 16.6795 52.7886 20.3364C56.4455 23.9934 58.5 28.9533 58.5 34.125V102.375C58.5 98.4962 56.9592 94.7763 54.2164 92.0336C51.4737 89.2908 47.7538 87.75 43.875 87.75H9.75V14.625Z"
          stroke="#3889FF"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M107.25 14.625H78C72.8283 14.625 67.8684 16.6795 64.2114 20.3364C60.5545 23.9934 58.5 28.9533 58.5 34.125V102.375C58.5 98.4962 60.0408 94.7763 62.7836 92.0336C65.5263 89.2908 69.2462 87.75 73.125 87.75H107.25V14.625Z"
          stroke="#3889FF"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    )
  }

  const specpoints = [0, 0, 0]

  return (
    <Basepage>
      <div className="video__title-container">
        <div className="video__back-button blue-text">
          <div>
            <IconSVG name="arrow-down" />
          </div>
          Back
        </div>
        <div className="video__title blue-text">GCSE Chemistry</div>
        <div className="video__exam-board">EdExcel</div>
      </div>
      <div className="video__content-container">
        <div className="video__content">
          <div className="video">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/rhgwIhB58PA"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen={true}
            ></iframe>
          </div>
          <div className="other-content-container">
            <div className="other-content">
              <PenTool />
              <div className="blue-text">Test yourself</div>
            </div>
            <div className="other-content">
              <OpenBook />
              <div className="blue-text">Learn with notes</div>
            </div>
          </div>
          <div className="buttons">
            <div className="button blue-text">Back</div>
            <div className="button next">Next</div>
          </div>
        </div>
        <RelatedSpecpoints specpoints={specpoints} />
      </div>
    </Basepage>
  )
}

export default VideoPage2