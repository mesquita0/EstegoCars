function getJWT() {
  return localStorage.getItem("token");
}

function setJWT(token) {
  localStorage.setItem("token", token);
}

function removeJWT() {
  localStorage.removeItem("token");
}

export { getJWT, setJWT, removeJWT };
