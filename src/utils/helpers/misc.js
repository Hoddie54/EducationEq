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

export function timedayToNumber(day_number, time) {
  if (day_number <= 4) {
    return (time - 16) * 5 + day_number
  } else {
    return (time - 9) * 2 + (day_number - 5) + 25
  }
}

export function numberToTimeday(number) {
  let day_number = 0
  let time = 0

  if (number <= 24) {
    day_number = number % 5
    time = (number - day_number) / 5 + 16
  } else {
    day_number = ((number + 1) % 2) + 5
    let time = number
    if (time % 2 === 1) time = time + 1
    time = time / 2 - 4
  }

  return { time: time, day_number: day_number }
}

export function dayNumberToDay(day_number) {
  switch (day_number) {
    case 0:
      return "Monday"
    case 1:
      return "Tuesday"
    case 2:
      return "Wednesday"
    case 3:
      return "Thursday"
    case 4:
      return "Friday"
    case 5:
      return "Saturday"
    case 6:
      return "Sunday"
  }
}

export const SubjectNumberArray = [
  { value: 0, text: "Maths Foundation" },
  { value: 1, text: "Maths GCSE" },
  { value: 2, text: "Maths Alevel" },
  { value: 3, text: "Physics Foundation" },
  { value: 4, text: "Physics GCSE" },
  { value: 5, text: "Physics Alevel" },
  { value: 6, text: "Chemistry Foundation" },
  { value: 7, text: "Chemistry GCSE" },
  { value: 8, text: "Chemistry Alevel" },
  { value: 9, text: "Biology Foundation" },
  { value: 10, text: "Biology GCSE" },
  { value: 11, text: "Biology Alevel" },
]

export const yearGroupArray = [
  { value: 9, text: "Year 9" },
  { value: 10, text: "Year 10" },
  { value: 11, text: "Year 11" },
  { value: 12, text: "Year 12" },
  { value: 13, text: "Year 13" },
]

export const abilityArray = [
  { value: 1, text: "Grades A*/A or 9/8" },
  { value: 2, text: "Grades B/C or 7/6/5" },
  { value: 3, text: "Grades D or 4 or below" },
]
