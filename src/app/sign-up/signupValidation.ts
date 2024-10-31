import * as Yup  from "yup";


export const signupValidation =Yup.object({
    firstName :Yup.string().min(3).required("Please enter first name"),
    lastName :Yup.string().min(3).required("Please enter last name"),
    email :Yup.string().email("please enter valid email").required("Please enter email"),
    password: Yup.string().min(6).required("please enter password"),
    cPassword : Yup.string().oneOf([Yup.ref("password")],"password not matched")


})