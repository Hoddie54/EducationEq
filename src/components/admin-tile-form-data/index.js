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
  addStudent,
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
    class_name: "",
    subject: "0",
    year_group: "9",
    ability: "1",
    first_lesson_date: "",
    time: "",
    max_size: "",
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
      html_type: "input",
      required: true,
      type: "text",
      placeholder: "Class name",
      name: "class_name",
    },
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
    {
      html_type: "input",
      type: "number",
      min: 1,
      name: "max_size",
      required: true,
      placeholder: "Maximum class size",
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
      if (class_.class_name) {
        return { value: class_.id, text: class_.class_name + ": " + class_.id }
      } else {
        return { value: class_.id, text: class_.id }
      }
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
      if (class_.class_name) {
        return { value: class_.id, text: class_.class_name + ": " + class_.id }
      } else {
        return { value: class_.id, text: class_.id }
      }
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

export const addNewStudentForm = {
  initial_state: {
    parent_name: "",
    phone_number: "",
    email: "",
    student_email: "",
    student_phone_number: "",
    child_name: "",
    package: "",
    year_group: "",
    qualification: "",
    reason_for_tutoring: "",
    additional_info: "",
  },

  form: [
    {
      html_type: "input",
      type: "text",
      name: "parent_name",
      required: true,
      placeholder: "Parent name",
    },
    {
      html_type: "input",
      type: "tel",
      name: "phone_number",
      required: true,
      placeholder: "Phone number (Parent)",
    },
    {
      html_type: "input",
      type: "email",
      name: "email",
      required: true,
      placeholder: "Email (Parent)",
    },
    {
      html_type: "input",
      type: "text",
      name: "child_name",
      required: true,
      placeholder: "Child name",
    },
    {
      html_type: "input",
      type: "email",
      name: "student_email",
      required: false,
      placeholder: "Email (Student)",
    },
    {
      html_type: "input",
      type: "tel",
      name: "student_phone_number",
      required: false,
      placeholder: "Phone number (Student)",
    },
    {
      html_type: "input",
      type: "number",
      name: "package",
      min: 1,
      max: 30,
      required: true,
      placeholder: "Number of lessons bought in package",
    },
    {
      html_type: "select",
      multiple: false,
      name: "year_group",
      required: true,
      options: [
        { value: 9, text: "Year 9" },
        { value: 10, text: "Year 10" },
        { value: 11, text: "Year 11" },
        { value: 12, text: "Year 12" },
        { value: 13, text: "Year 13" },
      ],
    },
    {
      html_type: "select",
      multiple: false,
      name: "qualification",
      required: true,
      options: [
        { value: "GCSE", text: "GCSE" },
        { value: "A-level", text: "A-level" },
        { value: "Foundation", text: "Foundation" },
      ],
    },
    {
      html_type: "textarea",
      name: "reason_for_tutoring",
      placeholder: "What is their reason for purchasing tutoring?",
      required: true,
    },
    {
      html_type: "textarea",
      name: "additional_info",
      placeholder: "Additional information",
      required: false,
    },
  ],

  onSubmit: async (data) => {
    if (window.confirm("Are you sure") == true) {
      const response = await addStudent(data)
      console.log(response.data)
      alert(response.data)
    }
  },
}
