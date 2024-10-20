export default () => {
  return(
    <>
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
    </>
  );
}
