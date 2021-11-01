import {
  deleteDataFromFirestore,
  getCustomers,
  sendDataToFirebase,
  updateDataFromFirestore,
} from "../../utils/firebase/firestore"
import {
  SubjectNumberArray,
  yearGroupArray,
  abilityArray,
  arrayRemove,
} from "../../utils/helpers/misc"
import { getCollectionFromFirestore } from "../../utils/firebase/firestore"
import { registerTutoringUser } from "../../utils/firebase/auth"
import {
  addNewClass,
  deleteClass,
  addStudentToClass,
  removeStudentFromClass,
} from "../../utils/firebase/cloud"

export const tutorForm = {
  initial_state: {
    name: "",
    email: "",
    experience: "",
    aboutme: "",
    photo_url: "",
    profile_url: "",
    subjects: "",
    availability: [...Array(49).keys()],
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
    const response = await addNewClass(data)
    console.log(response)
    alert(response.data)
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

export const removeTutorForm = {
  initial_state: { tutor: "" },
  onSubmit: async (data) => {
    console.log(data)
    const response = await deleteDataFromFirestore("tutors", data.tutor)
    alert("Done")
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
  form: [],
}

export const updateTutorDetails = {
  form: [
    {
      html_type: "input",
      type: "text",
      required: true,
      placeholder: "Please eneter tutor UID from firebase",
      name: "tutor_id",
    },
    {
      html_type: "input",
      type: "text",
      required: false,
      placeholder: "Full tutor name",
      name: "name",
    },
    {
      html_type: "input",
      type: "email",
      required: false,
      placeholder: "Tutor email",
      name: "email",
    },
    {
      html_type: "textarea",
      required: false,
      placeholder: "What is this tutor's experience",
      name: "experience",
    },
    {
      html_type: "textarea",
      required: false,
      placeholder: "Please enter the 'about me' text for this tutor",
      name: "aboutme",
    },
    {
      html_type: "input",
      type: "url",
      required: false,
      placeholder: "Please enter the URL to their photo",
      name: "photo_url",
    },
    {
      html_type: "input",
      type: "url",
      required: false,
      placeholder: "Please enter the URL to their profile",
      name: "profile_url",
    },
    {
      html_type: "select",
      required: false,
      placeholder: "Which subjects can you do",
      options: SubjectNumberArray,
      name: "subjects",
      multiple: true,
    },
  ],
  onSubmit: async (data) => {
    const real_data = {}
    const keys = Object.keys(data)
    keys.map((key) => {
      if (data[key]) {
        real_data[key] = data[key]
      }
    })
    const uid = real_data["tutor_id"]
    delete real_data.tutor_id
    await updateDataFromFirestore("tutors", uid, real_data).catch((err) => {
      alert(err)
    })
    alert("Done!")
  },
  initial_state: {
    tutor_id: "",
    name: "",
    email: "",
    experience: "",
    aboutme: "",
    photo_url: "",
    profile_url: "",
    subjects: "",
  },
}

export const updateTutorAvailability = {
  form: [
    {
      html_type: "input",
      type: "text",
      required: true,
      placeholder: "Please eneter tutor UID from firebase",
      name: "tutor_id",
    },
    { html_type: "availability", name: "availability" },
  ],
  initial_state: {
    tutor_id: "",
    availability: [...Array(49).keys()],
  },
  onSubmit: async (data) => {
    const uid = data["tutor_id"]
    delete data.tutor_id
    await updateDataFromFirestore("tutors", uid, data).catch((err) => {
      alert(err)
    })
    alert("Done!")
  },
}

export const deleteClassForm = {
  form: [],
  initial_state: { classes: "" },
  onSubmit: async (data) => {
    if (window.confirm("Are you sure") == true) {
      const response = await deleteClass(data.classes)
      alert(response.data)
    }
  },
  getLoadedFormData: async () => {
    const classes = await getCollectionFromFirestore("classes").catch((err) =>
      alert(err)
    )
    const options = classes.map((class_) => {
      return { value: class_.id, text: class_.id }
    })
    return [
      {
        html_type: "select",
        options: options,
        name: "classes",
        multiple: false,
        required: true,
      },
    ]
  },
}

export const addStudentToClassForm = {
  form: [],
  initial_state: {
    class_uid: "",
    student_uid: "",
  },
  onSubmit: async (data) => {
    if (window.confirm("Are you sure") == true) {
      const response = await addStudentToClass(data).catch((err) => {
        alert(err)
      })
      alert(response.data)
    }
  },
  getLoadedFormData: async () => {
    const classes = await getCollectionFromFirestore("classes")
    const customers = await getCustomers()
    const class_options = classes.map((class_) => {
      return { value: class_.id, text: class_.id }
    })
    const customer_options = customers.map((customer) => {
      return {
        value: customer.uid,
        text:
          "Parent:" + customer.parent_name + ". Child: " + customer.child_name,
      }
    })

    return [
      {
        html_type: "select",
        options: class_options,
        multiple: false,
        required: true,
        name: "class_uid",
      },
      {
        html_type: "select",
        options: customer_options,
        multiple: false,
        required: true,
        name: "student_uid",
      },
    ]
  },
}

export const removeStudentFromClassForm = {
  form: [],
  initial_state: {
    class_uid: "",
    student_uid: "",
  },
  onSubmit: async (data) => {
    if (window.confirm("Are you sure") == true) {
      const response = await removeStudentFromClass(data)
      alert(response.data)
    }
  },
  getLoadedFormData: async () => {
    const classes = await getCollectionFromFirestore("classes")
    const customers = await getCustomers()
    const class_options = classes.map((class_) => {
      return { value: class_.id, text: class_.id }
    })
    const customer_options = customers.map((customer) => {
      return {
        value: customer.uid,
        text:
          "Parent:" + customer.parent_name + ". Child: " + customer.child_name,
      }
    })

    return [
      {
        html_type: "select",
        options: class_options,
        multiple: false,
        required: true,
        name: "class_uid",
      },
      {
        html_type: "select",
        options: customer_options,
        multiple: false,
        required: true,
        name: "student_uid",
      },
    ]
  },
}
