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
  
  // Atualizar nome do usuário no sidebar esquerdo
  atualizarNomeSidebar(nome);
  
  // Atualizar placeholder do composer
  atualizarComposer(nome);
  
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

export function atualizarNomeSidebar(nome) {
  // Atualizar o nome no sidebar esquerdo
  const sidebarName = document.querySelector(".sidebar-text");
  if (sidebarName) {
    sidebarName.textContent = nome;
  }
  
  // Atualizar o alt da imagem do avatar
  const sidebarAvatar = document.querySelector(".sidebar-icon.profile-icon img");
  if (sidebarAvatar) {
    sidebarAvatar.alt = nome;
  }
}

export function atualizarComposer(nome) {
  // Atualizar o placeholder do input do composer
  const composerInput = document.getElementById("novo-post-texto");
  if (composerInput) {
    composerInput.placeholder = `O que você está pensando, ${nome}?`;
  }
  
  // Atualizar o alt da imagem do avatar do composer
  const composerAvatar = document.querySelector(".composer-avatar img");
  if (composerAvatar) {
    composerAvatar.alt = nome;
  }
}
