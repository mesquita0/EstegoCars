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
      else if (email && password) {
        alert("email ou senha incorretos");
      }
    } 

    login(email, password);
  }, [pressToggle])

  return (
    <>
    
    <div style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "450px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        padding: "40px",
        boxShadow: "0px 0px 10px 6px #a1a1a150",
        border: "none"
      }}>
        <div style={{ paddingBottom: "20px", textAlign: "center" }}>
          <h1>Entrar</h1>
        </div>

        <div style={{
          color: "#a1a1a1",
          paddingBottom: "20px",
          textAlign: "center"
        }}>
          <p style={{
            padding: "10px 0px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <span style={{ color: "#000" }}>Email:</span>
            <input
              type="text"
              value={email}
              onChange={evt => SetEmail(evt.target.value)}
              required
              style={{
                padding: "5px",
                border: "1px solid #a1a1a1",
                color: "#a1a1a1",
                borderRadius: "5px",
                width: "250px"
              }}
            />
          </p>

          <p style={{
            padding: "10px 0px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <span style={{ color: "#000" }}>Senha:</span>
            <input
              type="password"
              value={password}
              onChange={evt => SetPassword(evt.target.value)}
              required
              style={{
                padding: "5px",
                border: "1px solid #a1a1a1",
                color: "#a1a1a1",
                borderRadius: "5px",
                width: "250px"
              }}
            />
          </p>
        </div>

        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          paddingTop: "40px"
        }}>
          <button
            onClick={() => SetpressToggle(!pressToggle)}
            style={{
              width: "200px",
              padding: "8px",
              border: "none",
              fontWeight: "bolder",
              fontSize: "16px",
              borderRadius: "6px",
              backgroundColor: "#f6302f",
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              cursor: "pointer"
            }}
          >
            Entrar
          </button>
        </div>
      </div>
    </>
  );
}
