
// import { useContext, useState } from 'react';
// import * as Yup from 'yup';
// import AuthContext from '../auth/contex';

// import authApi from "../api/auth";
// import { AppForm, AppFormField, ErrorMessage, SubmitButton } from "../components/forms"


// const validationSchema = Yup.object().shape({
//     phone: Yup.string().required().label("Phone").min(11)
// })
// export default () => {


//     const authContext = useContext(AuthContext);
//     const [loginFailed, setLoginFailed] = useState(false);


//     const handleSubmit = async ({phone}) => {
//         const result = await authApi.verifyPhone(phone);
//         if(!result.ok) return setLoginFailed(true);

//         setLoginFailed(false);
//         // check response.........
//         // if server says user already exists then take the user to password screen
//         // and perform login normally
//         //......else if server says user doesn't exist then take him to sign up page..
//         // and perform signup 
//     }

//     return (
//         <AppForm 
//             initialValues={{phone: ""}}
//             onSubmit={handleSubmit}
//             validationSchema={validationSchema}>
//                 <ErrorMessage error={"Invalid Phone Number"} visible={loginFailed}/>
//                 <AppFormField 
//                     autoCorrenct={false}
//                     autoCapitalize="none"
//                     icon={"phone"}
//                     name={"phone"}
//                     keyboardType="numeric"
//                     placeholder={"Phone"}
//                     style={{flex: 1}}
//                 />
//                 <SubmitButton title={"Login"} />
//             </AppForm>
//     )
// }