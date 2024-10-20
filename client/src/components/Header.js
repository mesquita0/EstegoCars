import Popup from 'reactjs-popup';
import logo from '../logo-stego.png';
import { hasJWT } from '../helpers/jwt';
import SellPopup from "../components/SellPopup";
import ProfilePopup from './ProfilePopup';
import LoginPopup from './LoginPopup';
import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isLoggedIn, SetLoggedIn] = useState(false);

  useEffect(() => {
    SetLoggedIn(hasJWT());
  }, [isLoggedIn]);

  return (
    <>
    <header>
          <nav>
            <div class="logo">
              <a href="#"><img src={logo} alt="" /></a>
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
                  {isLoggedIn ? <SellPopup /> : <LoginPopup />}
                </Popup>
                <button class="op">
                  <p>Suporte</p>
                </button>
              </div>

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
              {isLoggedIn ? <ProfilePopup /> : <LoginPopup />}
            </Popup>
          </nav>
        </header>
    </>
  );
}

export default Header;
