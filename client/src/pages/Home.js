import "../style.css";
import React, { useState, useEffect } from 'react';
import Header from "../components/Header";

export const HomePage = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [mileage, setMileage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/vehicles/?brand=${search}&year=${year}&price=${price}&mileage=${mileage}`
        );
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [search, year, price, mileage]);

  return (
    <>
      <div className="container__homepage">
        <Header></Header>

        <main>
          <section class="container">
            <div class="search-bar">
              <div class="search-icon"><button><span class="material-symbols-outlined">search</span></button></div>
              <input type="text" value={search} onChange={evt => setSearch(evt.target.value)} class="search" autofocus placeholder="Digite marca ou modelo do veículo" />
            </div>
          </section>
          <section class="car-list">
            <div class="filter-selector">
              <div class="year">
                <p>Selecione o Ano:</p>
                <input type="number" value={year} onChange={evt => setYear(evt.target.value)} min="1900" max="2025" placeholder="Ex: 2023" />
              </div>
              <div class="value">
                <p>Selecione o Preço:</p>
                <input type="number" value={price} onChange={evt => setPrice(evt.target.value)} min="0" step="0.01" placeholder="Ex: 50000.00" inputmode="decimal" />
              </div>
              <div class="km">
                <p>Selecione a Quilometragem:</p>
                <input type="number" value={mileage} onChange={evt => setMileage(evt.target.value)} min="0" placeholder="Ex: 58000" />
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
