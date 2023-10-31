// import React, { useState } from "react";
// import { useTranslate, TextInput, Button, useAuthProvider } from "react-admin";

// const Login = () => {
//   const [credentials, setCredentials] = useState({
//     username: "", // Изменили ключ с username на email
//     password: "",
//   });
//   const translate = useTranslate();
//   const authProvider = useAuthProvider();

//   const handleSubmit = (e: { preventDefault: () => void }) => {
//     e.preventDefault();
//     authProvider
//       .login({ username: credentials.username, password: credentials.password }) // Используем email вместо username
//       .then(() => {
//         console.log("Успешная аутентификация");
//       })
//       .catch(() => {
//         console.error("Ошибка аутентификации");
//       });
//   };

//   return (
//     <div>
//       <h2>{translate("auth.sign_in")}</h2>
//       <form onSubmit={handleSubmit}>
//         <TextInput
//           label={translate("auth.email")} // Изменили название поля на "Email"
//           type="email" // Используем тип "email"
//           onChange={(e) =>
//             setCredentials({ ...credentials, username: e.target.value })
//           } // Изменили ключ с username на email
//           source={""}
//         />
//         <TextInput
//           label={translate("auth.password")}
//           type="password"
//           onChange={(e) =>
//             setCredentials({ ...credentials, password: e.target.value })
//           }
//           source={""}
//         />
//         <Button
//           type="submit"
//           label={translate("auth.sign_in")}
//         />
//       </form>
//     </div>
//   );
// };

// export default Login;
import React from "react";

const index = () => {
  return <div>index</div>;
};

export default index;
