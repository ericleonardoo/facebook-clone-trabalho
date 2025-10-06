export function initLogin() {
  const loginContainer = document.createElement("div");
  loginContainer.id = "login-container";
  loginContainer.innerHTML = `
    <div class="login-box">
      <h2>Entrar</h2>
      <input type="text" id="login-usuario" placeholder="Digite seu nome">
      <button id="btn-login">Entrar</button>
    </div>
  `;
  document.body.prepend(loginContainer);

  const savedUser = localStorage.getItem("usuario");
  if (savedUser) {
    loginContainer.style.display = "none";
    mostrarUsuarioLogado(savedUser);
  }

  document.getElementById("btn-login").addEventListener("click", () => {
    const nome = document.getElementById("login-usuario").value.trim();
    if (nome !== "") {
      localStorage.setItem("usuario", nome);
      loginContainer.style.display = "none";
      mostrarUsuarioLogado(nome);
    } else {
      alert("Digite um nome válido!");
    }
  });
}

function mostrarUsuarioLogado(nome) {
  // Atualizar saudação no menu hambúrguer
  const greeting = document.querySelector(".hamburger__greeting");
  if (greeting) {
    greeting.innerHTML = `Olá, <b>${nome}</b>`;
  }
  
  // Configurar logout no menu hambúrguer
  const bindLogout = (el) => el && el.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("usuario");
    localStorage.removeItem("darkMode");
    location.href = "index.html";
  });
  const menuLogout = document.getElementById("btn-logout");
  bindLogout(menuLogout);
}
