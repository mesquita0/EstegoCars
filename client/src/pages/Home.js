import "../style.css";
import { Component } from "react";
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import logo from '../logo-stego.png';

export const HomePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/vehicles/');
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="container__homepage">
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
                <div style={{ paddingBottom: "20px", textAlign: "center" }}>
                  <h1>Dados do Veículo</h1>
                </div>

                <div style={{
                  margin: "20px 60px 40px 60px",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between"
                }}>
                  <p style={{ padding: "20px 0px", width: "26%", boxSizing: "border-box", fontWeight: "700" }}>
                    <label htmlFor="marca" style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "500",
                      color: "#a1a1a1",
                      fontSize: "14px"
                    }}>Marca</label>
                    <input type="text" name="marca" id="marca" required placeholder="Ex: Ford" style={{
                      padding: "5px",
                      border: "1px solid #a1a1a1",
                      color: "#a1a1a150",
                      borderRadius: "5px"
                    }} />
                  </p>

                  <p style={{ padding: "20px 0px", width: "26%", boxSizing: "border-box", fontWeight: "700" }}>
                    <label htmlFor="modelo" style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "500",
                      color: "#a1a1a1",
                      fontSize: "14px"
                    }}>Modelo</label>
                    <input type="text" name="modelo" id="modelo" required placeholder="Ex: Focus" style={{
                      padding: "5px",
                      border: "1px solid #a1a1a1",
                      color: "#a1a1a150",
                      borderRadius: "5px"
                    }} />
                  </p>

                  <p style={{ padding: "20px 0px", width: "26%", boxSizing: "border-box", fontWeight: "700" }}>
                    <label htmlFor="preco" style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "500",
                      color: "#a1a1a1",
                      fontSize: "14px"
                    }}>Preço (R$)</label>
                    <input type="number" name="preco" id="preco" step="0.01" required placeholder="Ex: 45.000" style={{
                      padding: "5px",
                      border: "1px solid #a1a1a1",
                      color: "#a1a1a150",
                      borderRadius: "5px"
                    }} />
                  </p>

                  <p style={{ padding: "20px 0px", width: "26%", boxSizing: "border-box", fontWeight: "700" }}>
                    <label htmlFor="ano" style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "500",
                      color: "#a1a1a1",
                      fontSize: "14px"
                    }}>Ano</label>
                    <input type="number" name="ano" id="ano" min="1886" required placeholder="Ex: 2023" style={{
                      padding: "5px",
                      border: "1px solid #a1a1a1",
                      color: "#a1a1a150",
                      borderRadius: "5px"
                    }} />
                  </p>

                  <p style={{ padding: "20px 0px", width: "26%", boxSizing: "border-box", fontWeight: "700" }}>
                    <label htmlFor="tipo" style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "500",
                      color: "#a1a1a1",
                      fontSize: "14px"
                    }}>Tipo</label>
                    <input type="text" name="tipo" id="tipo" required placeholder="Ex: Carro" style={{
                      padding: "5px",
                      border: "1px solid #a1a1a1",
                      color: "#a1a1a150",
                      borderRadius: "5px"
                    }} />
                  </p>

                  <p style={{ padding: "20px 0px", width: "26%", boxSizing: "border-box", fontWeight: "700" }}>
                    <label htmlFor="km" style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "500",
                      color: "#a1a1a1",
                      fontSize: "14px"
                    }}>Quilometragem</label>
                    <input type="number" name="km" id="km" required placeholder="Ex: 50.000" style={{
                      padding: "5px",
                      border: "1px solid #a1a1a1",
                      color: "#a1a1a150",
                      borderRadius: "5px"
                    }} />
                  </p>

                  <p style={{ padding: "20px 0px", width: "26%", boxSizing: "border-box", fontWeight: "700" }}>
                    <label htmlFor="cambio" style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "500",
                      color: "#a1a1a1",
                      fontSize: "14px"
                    }}>Câmbio</label>
                    <input type="text" name="cambio" id="cambio" required placeholder="Ex: Manual" style={{
                      padding: "5px",
                      border: "1px solid #a1a1a1",
                      color: "#a1a1a150",
                      borderRadius: "5px"
                    }} />
                  </p>

                  <p style={{ padding: "20px 0px", width: "26%", boxSizing: "border-box", fontWeight: "700" }}>
                    <label htmlFor="combustivel" style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "500",
                      color: "#a1a1a1",
                      fontSize: "14px"
                    }}>Combustível</label>
                    <input type="text" name="combustivel" id="combustivel" required placeholder="Ex: Flex" style={{
                      padding: "5px",
                      border: "1px solid #a1a1a1",
                      color: "#a1a1a150",
                      borderRadius: "5px"
                    }} />
                  </p>

                  <p style={{ padding: "20px 0px", width: "26%", boxSizing: "border-box", fontWeight: "700" }}>
                    <label htmlFor="motor" style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "500",
                      color: "#a1a1a1",
                      fontSize: "14px"
                    }}>Motor</label>
                    <input type="text" name="motor" id="motor" required placeholder="Ex: 2.0" style={{
                      padding: "5px",
                      border: "1px solid #a1a1a1",
                      color: "#a1a1a150",
                      borderRadius: "5px"
                    }} />
                  </p>
                </div>

                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px" }}>
                  <button style={{
                    width: "200px",
                    padding: "8px",
                    border: "none",
                    fontWeight: "bolder",
                    fontSize: "16px",
                    borderRadius: "6px",
                    backgroundColor: "#f6302f",
                    color: "#fff",
                    cursor: "pointer"
                  }}>Anunciar</button>
                  <button style={{
                    width: "200px",
                    padding: "8px",
                    border: "none",
                    fontWeight: "bolder",
                    fontSize: "16px",
                    borderRadius: "6px",
                    backgroundColor: "#f6302f",
                    color: "#fff",
                    cursor: "pointer"
                  }}>Cancelar</button>
                </div>
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
              <div style={{ paddingBottom: "20px", textAlign: "center" }}>
                <h1>Meu Perfil</h1>
              </div>
              <div style={{ color: "#a1a1a1" }}>
                <p style={{ padding: "10px 0px" }}><span style={{ color: "#000" }}>Nome: </span>Breno</p>
                <p style={{ padding: "10px 0px" }}><span style={{ color: "#000" }}>CPF: </span>999.999.99-99</p>
                <p style={{ padding: "10px 0px" }}><span style={{ color: "#000" }}>Email: </span>breno@gmail.com</p>
                <p style={{ padding: "10px 0px" }}><span style={{ color: "#000" }}>Telefone: </span>(84) 99999-9999</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <h3 style={{ padding: "30px 0px 20px 0px" }}>Veículos Anunciados</h3>
                <a href="car-page.html" style={{ textDecoration: "none", color: "#000" }}>
                  <p style={{ fontSize: "15px", fontWeight: "600", padding: "10px 0px" }}>LAND ROVER <span style={{ color: "#f6302f" }}>RANGE ROVER VELAR</span></p>
                </a>
              </div>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", paddingTop: "40px" }}>
                <button style={{
                  width: "200px",
                  padding: "8px",
                  border: "none",
                  fontWeight: "bolder",
                  fontSize: "16px",
                  borderRadius: "6px",
                  backgroundColor: "#f6302f",
                  color: "#fff",
                  cursor: "pointer"
                }}>OK</button>
                <button style={{
                  width: "200px",
                  padding: "8px",
                  border: "none",
                  fontWeight: "bolder",
                  fontSize: "16px",
                  borderRadius: "6px",
                  backgroundColor: "#f6302f",
                  color: "#fff",
                  cursor: "pointer"
                }}>Gerar PDF</button>
              </div>
            </Popup>
          </nav>
        </header>

        <main>
          <section class="container">
            <div class="search-bar">
              <div class="search-icon"><button><span class="material-symbols-outlined">search</span></button></div>
              <input type="text" class="search" autofocus placeholder="Digite marca ou modelo do veículo" />
            </div>
          </section>
          <section class="car-list">
            <div class="filter-selector">
              <div class="year">
                <p>Selecione o Ano:</p>
                <input type="number" min="1900" max="2025" placeholder="Ex: 2023" />
              </div>
              <div class="value">
                <p>Selecione o Preço:</p>
                <input type="number" step="0.01" placeholder="Ex: 50000.00" inputmode="decimal" />
              </div>
              <div class="km">
                <p>Selecione a Quilometragem:</p>
                <input type="number" min="0" placeholder="Ex: 58000" />
              </div>
            </div>
            {data.map((item) => (
              <a href={"/car/" + item.id} target="_self">
              <div class="car-box">
                <div class="car-image">
                    <img src={item.images[0]} alt="" />
                </div>
                <div class="car-name">
                  {item.name}
                </div>
                <div class="car-description">
                  <p>{item.engine}</p>
                </div>
                <div class="technologies">
                  <img src="" alt="" />
                  <img src="" alt="" />
                </div>
              </div>
              </a>
            ))}
          </section>
        </main>
      </div>
    </>
  );
}
