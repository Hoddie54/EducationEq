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

export function convertTo12HourTime(time) {
  // console.log(time)
  // const answer = new Date("1970-01-01T" + time + ":00" + "Z")
  // return answer.toLocaleTimeString("en-gb", {
  //   timezone: "UTC+1",
  //   hour12: true,
  //   hour: "numeric",
  //   minute: "numeric",
  // })
  const [hour, minute] = time.split(":")
  const new_hour = hour % 12 || 12
  if (hour < 12) {
    return `${new_hour}:${minute}AM`
  } else {
    return `${new_hour}:${minute}PM`
  }
}
