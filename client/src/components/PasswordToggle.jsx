import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const PasswordToggle = () => {
  const [visible, setVisiblity] = useState(false);

  const Icon = (
    <FontAwesomeIcon
      icon={visible ? faEye : faEyeSlash}
      onClick={() => setVisiblity((visiblity) => !visiblity)}
    />
  );

  const InputType = visible ? "text" : "password";

  return [InputType, Icon];
};

export default PasswordToggle;



// .password-toggle-icon2 {
//   position: relative;
//   top: -30px;
//   left: 295px;
//   cursor: pointer;
//   color: #9fa2b4;
// }


// span a {
//   letter-spacing: 0.2px;
//   color: #3751ff;
// }