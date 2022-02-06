import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Index";
import { userRegistrationAction } from "../../store/RegistrStore/actions";
import { getUserData } from "../../store/RegistrStore/selector";

const Registration: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const userData = useSelector(getUserData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userData.firstName && userData.lastName) {
      navigate("/");
    }
  }, [userData.firstName, userData.lastName]);

  const handler = () => {
    if (repeatPassword === password) {
      setTimeout(
        () => dispatch(userRegistrationAction({ lastName, firstName })),
        3000
      );
    } else {
      console.log("Пароли не совпадают");
    }
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setRepeatPassword("");
  };
  return (
    <div>
      <Input
        value={firstName}
        setValue={setFirstName}
        placeholder="Введите имя"
        type="text"
        title="User First Name"
      />
      <Input
        value={lastName}
        setValue={setLastName}
        placeholder="Введите фамилию"
        type="text"
        title="User Last Name"
      />
      <Input
        value={email}
        setValue={setEmail}
        placeholder="Введите почту"
        type="email"
        title="User email"
      />
      <Input
        value={password}
        setValue={setPassword}
        placeholder="Введите пароль"
        type="password"
        title="User password"
      />
      <Input
        value={repeatPassword}
        setValue={setRepeatPassword}
        placeholder="Повторите пароль"
        type="password"
        title="User repeat password"
      />
      <button onClick={handler} type="submit">
        PUSH ME
      </button>
      <button onClick={clearForm} type="button">
        CLEAR FORM
      </button>
    </div>
  );
};

export default Registration;
