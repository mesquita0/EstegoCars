export default () => {
  return (
    <>
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
    </>
  );
}
