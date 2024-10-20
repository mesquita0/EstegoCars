import React, { useState, useEffect } from 'react';

const downloadPDF = async (jwt) => {
  fetch(
    '/api/pdf', {
      headers: {
        "Authorization": jwt
      }
    })
  .then( res => res.blob() )
  .then( blob => {
    var file = window.URL.createObjectURL(blob);
    window.location.assign(file);
  });
}

export default ({ JWT }) => {
  const [profile_info, SetProfileInfo] = useState(false);
  const [user_vehicles, SetUserVehicles] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          '/api/users/info', {
            headers: {
              "Authorization": JWT
            }
          }
        );
        const result = await response.json();
        SetProfileInfo(result);

        const response_vehicles = await fetch(
          '/api/users/vehicles', {
            headers: {
              "Authorization": JWT
            }
          }
        );
        const result_vehicles = await response_vehicles.json();
        SetUserVehicles(result_vehicles.vehicles);
        console.log(result_vehicles.vehicles)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div style={{ paddingBottom: "20px", textAlign: "center" }}>
        <h1>Meu Perfil</h1>
      </div>
      <div style={{ color: "#a1a1a1" }}>
        <p style={{ padding: "10px 0px" }}><span style={{ color: "#000" }}>Nome: </span>{profile_info.name}</p>
        <p style={{ padding: "10px 0px" }}><span style={{ color: "#000" }}>CPF: </span>{profile_info.cpf}</p>
        <p style={{ padding: "10px 0px" }}><span style={{ color: "#000" }}>Email: </span>{profile_info.email}</p>
        <p style={{ padding: "10px 0px" }}><span style={{ color: "#000" }}>Telefone: </span>{profile_info.phone_number}</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <h3 style={{ padding: "30px 0px 20px 0px" }}>Veículos Anunciados</h3>
        {user_vehicles.map((vehicle) => (
        <a href={"/car/" + vehicle.id} style={{ textDecoration: "none", color: "#000" }}>
          <p style={{ fontSize: "15px", fontWeight: "600", padding: "10px 0px" }}>{vehicle.brand} <span style={{ color: "#f6302f" }}>{vehicle.model}</span></p>
        </a>
        ))}
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
        <button onClick={() => downloadPDF(JWT)} style={{
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
    </>
  );
}
