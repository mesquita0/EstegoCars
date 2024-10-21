import React, { useState, useEffect } from 'react';
import { removeJWT } from '../helpers/jwt';
import SellPopup from './SellPopup';
import Popup from 'reactjs-popup';

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

const delete_car = (jwt, id) => {
  fetch(
    '/api/vehicles/' + id, {
      method: "DELETE",
      headers: {
        "Authorization": jwt
      }
    });
}

export default ({ JWT, updateJWT }) => {
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

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user_vehicles]);

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
        <div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
            <a href={"/car/" + vehicle.id} style={{ textDecoration: "none", color: "#000" }}>
              <p style={{ fontSize: "15px", fontWeight: "600", padding: "10px 0px" }}>{vehicle.brand} <span style={{ color: "#f6302f", paddingRight: '10px' }}>{vehicle.model}</span></p>
            </a>
            <p style={{fontSize: '15px', fontWeight: '600', padding: '10px 0px'}}><Popup
              trigger={<button name='edit-car-button'>editar</button>}
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
              overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }}>
                <SellPopup vehicle={vehicle} JWT={JWT} />
              </Popup></p>
            <p style={{fontSize: '15px', fontWeight: '600', padding: '10px 0px'}}><button name='delete-car-button' onClick={() => {delete_car(JWT, vehicle.id); SetUserVehicles(user_vehicles)}}>deletar</button> 
            </p>
          </div>
        </div>
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
        <button name='logout-button' onClick={() => {removeJWT(); updateJWT();}} style={{
          width: "200px",
          padding: "8px",
          border: "none",
          fontWeight: "bolder",
          fontSize: "16px",
          borderRadius: "6px",
          backgroundColor: "#f6302f",
          color: "#fff",
          cursor: "pointer"
        }}>Sair</button> 
      </div>
    </>
  );
}
