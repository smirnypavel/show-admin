// import * as React from "react";
// import { useState } from "react";
// import { useLogin, useNotify, Notification } from "react-admin";

// const MyLoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const login = useLogin();
//   const notify = useNotify();

//   const handleSubmit = (e: { preventDefault: () => void }) => {
//     e.preventDefault();
//     // will call authProvider.login({ email, password })
//     login({ email, password }).catch(() => notify("Invalid email or password"));
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         name="email"
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         name="password"
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//     </form>
//   );
// };

// export default MyLoginPage;
import React from "react";

const login = () => {
  return <div>login</div>;
};

export default login;
