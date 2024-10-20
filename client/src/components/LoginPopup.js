import { setJWT } from "../helpers/jwt";
import React, { useState, useEffect } from 'react';



export default (props) => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [pressToggle, SetpressToggle] = useState(false);

  useEffect(() => {
    const login = async ( email, password ) => {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email, password
        })
      });
      const result = await response.json();
      if (result.token) {
        setJWT(result.token);
        props.updateJWT();
      }
    } 

    login(email, password);
  }, [pressToggle])

  return (
    <>
    <input type="text" value={email} onChange={evt => SetEmail(evt.target.value)} required />
    <input type="text" value={password} onChange={evt => SetPassword(evt.target.value)} required />
    <button onClick={() => SetpressToggle(!pressToggle)} />
    </>
  );
}
