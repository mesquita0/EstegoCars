import { setJWT } from "../helpers/jwt";
import React, { useState, useEffect } from 'react';

export default (props) => {
  const [CPF, SetCPF] = useState("");
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [phone_number, SetPhoneNumber] = useState("");
  const [pressToggle, SetpressToggle] = useState(false);

  useEffect(() => {
    const register = async ( 
      CPF,
      name,
      email,
      password,
      phone_number
    ) => {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          CPF,
          name,
          email,
          password,
          phone_number
        })
      });
      const result = await response.json();
      if (result.token) {
        setJWT(result.token);
        props.updateJWT();
      }
    } 

    register(CPF, name, email, password, phone_number);
  }, [pressToggle])

  return (
    <>
    <input type="text" value={email} onChange={evt => SetEmail(evt.target.value)} required />
    <input type="text" value={CPF} onChange={evt => SetCPF(evt.target.value)} required />
    <input type="text" value={name} onChange={evt => SetName(evt.target.value)} required />
    <input type="text" value={phone_number} onChange={evt => SetPhoneNumber(evt.target.value)} required />
    <input type="text" value={password} onChange={evt => SetPassword(evt.target.value)} required />
    <button onClick={() => SetpressToggle(!pressToggle)} />
    </>
  );
}
