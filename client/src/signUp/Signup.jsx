// import React, { useState } from "react";
// import PasswordToggle from "../components/PasswordToggle";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import axios from "axios";
// import "../signUp/_signup.scss";

// const SignUp = ({setAuth}) => {
//   const [PasswordInputType, ToggleIcon] = PasswordToggle();
//   const [userName, userNameChange] = useState("");
//   const [email, emailChange] = useState("");
//   const [password, passwordChange] = useState("");
//   const [confirmPassword, confirmPasswordChange] = useState("");
//   const navigate = useNavigate();

//   const isValidate = () => {
//     let isProceed = true;
//     let errormessage = "Please enter the value in";
//     if (userName == null || userName == "") {
//       isProceed = false;
//       errormessage += " userName";
//     }
//     if (email == null || email == "") {
//       isProceed = false;
//       errormessage += " Email";
//     }
//     if (password == null || password == "") {
//       isProceed = false;
//       errormessage += " Password";
//     }
//     if (confirmPassword == null || confirmPassword == "") {
//       isProceed = false;
//       errormessage += " confirmPassword";
//     }

//     if (!isProceed) {
//       toast.warning(errormessage);
//     } else {
//       if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
//         isProceed = true;
//         if (password != confirmPassword) {
//           isProceed = false;
//           toast.warning("Passwords doesn't match");
//         }
//       } else {
//         isProceed = false;
//         toast.warning("Please enter valid email");
//       }
//     }

//     return isProceed;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isValidate()) {
//       try {
//         const userData = {
//           username: userName,
//           email: email,
//           password: password,
//         };
//         console.log(userData);
//         const response = await axios.post(
//           "http://localhost:5000/auth/register",
//           userData
//         );
//         if (response.status === 200) {
//           toast.success("Registered Successfully!");
//           const parseRes = await response.data;   //token is back on client side
//           console.log(parseRes);
//           localStorage.setItem("token",parseRes.token);
//           setAuth(true);
//           // navigate("/");
//         } else if (response.status === 400) {
//           toast.error("User already exists!");
//         } else {
//           toast.error("Registration Failed");
//         }
//       } catch (error) {
//         console.error(error);
//         toast.error("Registration failed");
//       }
//     }
//   };

//   return (
//     <>
//       <div className="signup">
//         <div className="signup_container">
//           <p className="signup_text">Sign up</p>
//           <div className="form">
//             <form onSubmit={handleSubmit}>
//               <div>
//                 <label htmlFor="email">userName</label>
//                 <br />
//                 <input
//                   type="text"
//                   name="userName"
//                   placeholder="userName"
//                   value={userName}
//                   onChange={(e) => userNameChange(e.target.value)}
//                 />
//               </div>
//               <div style={{ marginTop: "1.2rem" }}>
//                 <label htmlFor="email">Email</label>
//                 <br />
//                 <input
//                   type="text"
//                   name="email"
//                   placeholder="Email address"
//                   value={email}
//                   onChange={(e) => emailChange(e.target.value)}
//                 />
//               </div>
//               <div style={{ marginTop: "1.2rem" }}>
//                 <label htmlFor="password">Password</label>
//                 <br />
//                 <input
//                   type={PasswordInputType}
//                   name="password"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => passwordChange(e.target.value)}
//                 />
//                 <span className="password-toggle-icon2">{ToggleIcon}</span>
//               </div>
//               <div style={{ marginTop: "0.5rem" }}>
//                 <label htmlFor="password">CONFIRM PASSWORD</label>
//                 <br />
//                 <input
//                   type={PasswordInputType}
//                   name="confirm password"
//                   placeholder="Confirm Password"
//                   value={confirmPassword}
//                   onChange={(e) => confirmPasswordChange(e.target.value)}
//                 />
//                 <span className="password-toggle-icon2">{ToggleIcon}</span>
//               </div>
//               <input type="submit" value="Log in" />
//             </form>
//             <p>
//               Already have account?{" "}
//               <span className="sign-up">
//                 <Link to="/">Sign in</Link>
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SignUp;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../signUp/_signup.scss";

const Signup = ({ setAuth }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/register", {
        username,
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      setAuth(true);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Signup failed. Please check your inputs.");
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="signup-btn-container">
          <button type="submit" className="btn btn-primary signup-btn">
            Sign Up
          </button>
        </div>
      </form>
      <p className="form-label text-center mt-3">
        Already have an account?{" "}
        <a href="/login" className="login-link">
          Log in here
        </a>
      </p>
    </div>
  );
};

export default Signup;
