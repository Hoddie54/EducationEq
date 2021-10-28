import { sendDataToFirebase } from "../../utils/firebase/firestore"
import {
  SubjectNumberArray,
  yearGroupArray,
  abilityArray,
} from "../../utils/helpers/misc"
import { getCollectionFromFirestore } from "../../utils/firebase/firestore"
import { registerTutoringUser } from "../../utils/firebase/auth"

export const tutorForm = {
  initial_state: {
    name: "",
    email: "",
    experience: "",
    aboutme: "",
    photo_url: "",
    profile_url: "",
    subjects: "",
    availability: Array.from({ length: 49 }, (i) => (i = true)),
  },
  onSubmit: async (data) => {
    console.log(data)
    await sendDataToFirebase("tutors", data)
    alert("Done")
  },
  form: [
    {
      html_type: "input",
      type: "text",
      required: true,
      placeholder: "Full tutor name",
      name: "name",
    },
    {
      html_type: "input",
      type: "email",
      required: true,
      placeholder: "Tutor email",
      name: "email",
    },
    {
      html_type: "textarea",
      required: true,
      placeholder: "What is this tutor's experience",
      name: "experience",
    },
    {
      html_type: "textarea",
      required: true,
      placeholder: "Please enter the 'about me' text for this tutor",
      name: "aboutme",
    },
    {
      html_type: "input",
      type: "url",
      required: true,
      placeholder: "Please enter the URL to their photo",
      name: "photo_url",
    },
    {
      html_type: "input",
      type: "url",
      required: true,
      placeholder: "Please enter the URL to their profile",
      name: "profile_url",
    },
    {
      html_type: "select",
      required: true,
      placeholder: "Which subjects can you do",
      options: SubjectNumberArray,
      name: "subjects",
      multiple: true,
    },
    { html_type: "availability", name: "availability" },
  ],
}

export const addNewClassForm = {
  initial_state: {
    subject: "0",
    year_group: "9",
    ability: "1",
    first_lesson_date: "",
    time: 0,
    tutor: "",
  },
  onSubmit: async (data) => {
    console.log(data)
  },
  getLoadedFormData: async () => {
    const tutors = await getCollectionFromFirestore("tutors")
    const options = tutors.map((tutor) => {
      return { value: tutor.id, text: tutor.name }
    })
    return [
      {
        html_type: "select",
        multiple: false,
        required: true,
        name: "tutor",
        options: options,
      },
    ]
  },
  form: [
    {
      html_type: "select",
      required: true,
      options: SubjectNumberArray,
      multiple: false,
      name: "subject",
    },
    {
      html_type: "select",
      required: true,
      options: yearGroupArray,
      multiple: false,
      name: "year_group",
    },
    {
      html_type: "select",
      required: true,
      options: abilityArray,
      multiple: false,
      name: "ability",
    },
    {
      html_type: "input",
      required: true,
      type: "date",
      name: "first_lesson_date",
      placeholder: "Please select first lesson date",
    },
    {
      html_type: "input",
      type: "number",
      min: 0,
      max: 48,
      name: "time",
      required: true,
      placeholder: "Start time (please use 0-48 code)",
    },
  ],
}
