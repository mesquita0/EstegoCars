import "../style-car-page.css";
import { Component } from "react";
import logo from '../logo-stego.png';

export class CarPage extends Component {
  componentDidMount() {
    
  }
  render() {
    return (
      <>
        <div className="container__carpage">
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

              <button class="account-circle"><span class="material-symbols-outlined">account_circle</span></button>
              <dialog class="profile">
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
              </dialog>
            </nav>
          </header>

          <main>
            <section>
              <div class="carousel-container" id="carouselContainer">
                <img src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2024/202410/20241003/land-rover-range-rover-velar-2-0-p300-gasolina-rdynamic-se-automatico-wmimagem22333765963.webp?s=fill&w=552&h=414&q=60" alt="Carro 1" class="carousel-image" />
                <img src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2024/202410/20241003/land-rover-range-rover-velar-2-0-p300-gasolina-rdynamic-se-automatico-wmimagem22333800235.webp?s=fill&w=1920&h=1440&q=75" alt="Carro 2" class="carousel-image" />
                <img src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2024/202410/20241003/land-rover-range-rover-velar-2-0-p300-gasolina-rdynamic-se-automatico-wmimagem22333904878.webp?s=fill&w=1920&h=1440&q=75" alt="Carro 3" class="carousel-image" />
              </div>

              <div class="navigation-buttons">
                <button id="prevBtn">&#10094;</button>
                <button id="nextBtn">&#10095;</button>
              </div>

              <div class="fullscreen-img" id="fullscreenImg">
                <span class="close" id="closeFullscreen">&times;</span>
                <img id="fullscreenImage" src="" alt="Fullscreen Image" />
              </div>
            </section>
            <section class="car-information">
              <div class="specifications">
                <div class="car-title">
                  <p>LAND ROVER <span class="color">RANGE ROVER VELAR</span></p>
                </div>
                <div class="informations">
                  <p><span>ano</span>2020</p>
                  <p><span>tipo</span>carro</p>
                  <p><span>km</span>58.000</p>
                  <p><span>câmbio</span>automatico</p>
                  <p><span>combustivel</span>flex</p>
                  <p><span>motor</span>2.0</p>
                </div>
              </div>
              <div class="value-and-contact">
                <div class="value">
                  <h1>R$ 355.000</h1>
                </div>
                <div class="contact">
                  <h4>Entre em contato</h4>
                  <p>(84) 99641-4098</p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </>
    );
  }
}