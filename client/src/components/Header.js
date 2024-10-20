import Popup from 'reactjs-popup';
import logo from '../logo-stego.png';
import { getJWT } from '../helpers/jwt';
import SellPopup from "../components/SellPopup";
import ProfilePopup from './ProfilePopup';
import LoginPopup from './LoginPopup';
import React, { useState, useEffect } from 'react';
import RegisterPopup from './RegisterPopup';

const Header = () => {
  const [jwt, SetJWTState] = useState(false);

  useEffect(() => {
    SetJWTState(getJWT());
  }, [jwt]);

  const updateJWT = () => {
    SetJWTState(getJWT());
  }

  return (
    <>
    <header>
          <nav>
            <div class="logo">
              <a href="/"><img src={logo} alt="" /></a>
            </div>

              <div class="options">
                <a href="/">
                <button class="op">
                  <p>Comprar</p>
                </button>
                </a>
                <Popup
                  trigger={<button class="op sell-button"><p>Vender</p></button>}
                  modal
                  contentStyle={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "900px",
                    padding: "40px",
                    boxShadow: "0px 0px 10px 6px #a1a1a150",
                    border: "none",
                    backgroundColor: "#fff",
                    borderRadius: "10px"
                  }}
                  overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
                >
                  {jwt ? <SellPopup updateJWT={updateJWT} JWT={jwt} /> : <LoginPopup updateJWT={updateJWT} />}
                </Popup>
                <button class="op">
                  <p>Suporte</p>
                </button>
              </div>
            { jwt ? 
            <Popup
              trigger={<button class="account-circle"><span class="material-symbols-outlined">account_circle</span></button>}
              modal
              contentStyle={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "600px",
                padding: "40px",
                boxShadow: "0px 0px 10px 6px #a1a1a150",
                border: "none",
                backgroundColor: "#fff",
                borderRadius: "10px"
              }}
              overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
            >
              <ProfilePopup updateJWT={updateJWT} JWT={jwt} />
            </Popup>
            :
            <div class="connect">
              <Popup trigger={<button class="login">Entrar</button>}><LoginPopup updateJWT={updateJWT} /></Popup>
              <Popup trigger={<button class="register">Criar Conta</button>}><RegisterPopup updateJWT={updateJWT}></RegisterPopup></Popup>
            </div>
            }
          </nav>
        </header>
    </>
  );
}

export default Header;
