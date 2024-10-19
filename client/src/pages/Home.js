import "../style.css";
import { Component } from "react";
import Popup from 'reactjs-popup';
import logo from '../logo-stego.png';

export class HomePage extends Component {
  componentDidMount() {

  }
  render() {
    return (
      <>
        <div className="container__homepage">
          <header>
            <nav>
              <div class="logo">
                <a href="#"><img src={logo} alt="" /></a>
              </div>

              <div class="options">
                <button class="op">
                  <p>Comprar</p>
                </button>
                <button class="op sell-button">
                  <p>Vender</p>
                </button>
                <dialog class="sell">
                  <div class="sell-name">
                    <h1>Dados do Veículo</h1>
                  </div>
                  <div class="sell-informations">
                    <p><label for="marca">Marca</label>
                      <input type="text" name="marca" id="marca" required placeholder="Ex: Ford" /></p>

                    <p><label for="modelo">Modelo</label>
                      <input type="text" name="modelo" id="modelo" required placeholder="Ex: Ford" /></p>

                    <p><label for="preco">Preço (R$)</label>
                      <input type="number" name="preco" id="preco" step="0.01" required placeholder="Ex: 45.000" /></p>

                    <p><label for="ano">Ano</label>
                      <input type="number" name="ano" id="ano" min="1886" required placeholder="Ex: 2023" /></p>

                    <p><label for="tipo">Tipo</label>
                      <input type="text" name="tipo" id="tipo" required placeholder="Ex: Carro" /></p>

                    <p><label for="km">Quilometragem</label>
                      <input type="number" name="km" id="km" required placeholder="Ex: 50.000" /></p>

                    <p><label for="cambio">Câmbio</label>
                      <input type="text" name="cambio" id="cambio" required placeholder="Ex: Manual" /></p>

                    <p><label for="combustivel">Combustível</label>
                      <input type="text" name="combustivel" id="combustivel" required placeholder="Ex: Flex" /></p>

                    <p><label for="motor">Motor</label>
                      <input type="text" name="motor" id="motor" required placeholder="Ex: 2.0" /></p>

                  </div>
                  <div class="sell-buttons">
                    <button class="sell-save">Anunciar</button>
                    <button class="sell-close">Cancelar</button>
                  </div>
                </dialog>
                <button class="op">
                  <p>Suporte</p>
                </button>
              </div>
              <Popup trigger={<button class="account-circle"><span class="material-symbols-outlined">account_circle</span></button>} position="right center">
                <div class="profile">
                  <div class="profile-name">
                    <h1>Meu Perfil</h1>
                  </div>
                  <div class="profile-information">
                    <p><span>Nome: </span>Breno</p>
                    <p><span>CPF: </span>999.999.99-99</p>
                    <p><span>Email: </span>breno@gmail.com</p>
                    <p><span>Telefone: </span>(84) 99999-9999</p>
                  </div>
                  <div class="profile-cars">
                    <h3 class="vehicles-advertised">Veículos Anunciados</h3>
                    <a href="car-page.html">
                      <p>LAND ROVER <span class="color">RANGE ROVER VELAR</span></p>
                    </a>
                  </div>
                  <div class="profile-buttons">
                    <button class="profile-close">OK</button>
                    <button class="profile-pdf">Gerar PDF</button>
                  </div>
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
              <div class="car-box">
                <div class="car-image">
                  <a href="car-page.html" target="_blank">
                    <img src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2024/202410/20241003/land-rover-range-rover-velar-2-0-p300-gasolina-rdynamic-se-automatico-wmimagem22333765963.webp?s=fill&w=552&h=414&q=60" alt="" />
                  </a>
                </div>
                <div class="car-name">
                  VELAR
                </div>
                <div class="car-description">
                  <p>LAND ROVER VELAR BLA BLA BLA</p>
                </div>
                <div class="technologies">
                  <img src="" alt="" />
                  <img src="" alt="" />
                </div>
              </div>
            </section>
          </main>
        </div>
      </>
    );
  }
}
