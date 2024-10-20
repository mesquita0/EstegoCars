import "../style-car-page.css";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../components/Header";

export const CarPage = () => {
  const [data, setData] = useState({images: [], seller: {}});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/vehicles/' + id);
        const result = await response.json();
        result.price = result.price.toLocaleString('pt-BR');
        
        const response_user = await fetch('/api/users/' + result.seller_id);
        const result_user = await response_user.json();
        setData({...result, seller: {...result_user}});

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="container__carpage">
        <Header></Header>

        <main>
          <section>
            <div class="carousel-container" id="carouselContainer">
            {data.images.map((image) => (
              <img src={image} alt="Carro 1" class="carousel-image" />  
            ))}
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
                <p>{data.brand} <span class="color">{data.model}</span></p>
              </div>
              <div class="informations">
                <p><span>ano</span>{data.year}</p>
                <p><span>tipo</span>{data.type}</p>
                <p><span>km</span>{data.mileage}</p>
                <p><span>câmbio</span>{data.transmission}</p>
                <p><span>combustivel</span>{data.fuel_type}</p>
                <p><span>motor</span>{data.engine}</p>
              </div>
            </div>
            <div class="value-and-contact">
              <div class="value">
                <h1>R$ {data.price}</h1>
              </div>
              <div class="contact">
                <h4>Entre em contato</h4>
                <p>{data.seller.phone_number}</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
