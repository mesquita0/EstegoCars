function hasJWT() {
  return localStorage.getItem("token");
}

function setJWT(token) {
  localStorage.setItem("token", token);
}

export { hasJWT, setJWT };
