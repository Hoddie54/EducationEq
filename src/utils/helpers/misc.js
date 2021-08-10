export const getPercentageMark = (markAttained, totalMarks) => {
  return (markAttained / totalMarks) * 100
}

export const lineify = (text) => {
  if (text.includes("/n")) {
    const split_text = text.split("/n")
    return split_text.map((line, index) => {
      if (index === 0) return ""
      return (
        <div key={index} class="lineify">
          {line}
          {index !== split_text.length - 1 ? (
            <>
              <br />
              <br />
            </>
          ) : (
            ""
          )}
        </div>
      )
    })
  }
  return text
}

export function iOS() {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  )
}
