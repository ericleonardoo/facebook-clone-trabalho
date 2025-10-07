export function initMenu() {
  const menu = document.getElementById("menu-lateral");
  const toggle = document.getElementById("toggle-menu");
  const darkToggle = document.getElementById("dark-toggle");
  const logoutBtn = document.getElementById("btn-logout");

  // Atualizar saudação com nome do usuário se estiver logado
  const updateGreeting = () => {
    const greeting = document.querySelector(".hamburger__greeting");
    const savedUser = localStorage.getItem("usuario");
    if (greeting && savedUser) {
      greeting.innerHTML = `Olá, <b>${savedUser}</b>`;
    }
  };

  // Atualizar saudação na inicialização
  updateGreeting();

  // Toggle do menu hambúrguer
  if (menu && toggle) {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      menu.classList.toggle("aberto");
      menu.classList.toggle("active");
      const isOpen = menu.classList.contains("aberto");
      menu.setAttribute("aria-hidden", isOpen ? "false" : "true");
      // marcar estado acessível no botão
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      
      // Atualizar saudação quando abrir o menu
      if (isOpen) {
        updateGreeting();
      }
    });
  }

  // Fechar menu ao clicar fora dele
  document.addEventListener("click", (e) => {
    if (menu && menu.classList.contains("aberto")) {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove("aberto");
        menu.classList.remove("active");
        menu.setAttribute("aria-hidden", "true");
        toggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // Fechar menu com a tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu && menu.classList.contains('aberto')) {
      menu.classList.remove('aberto');
      menu.classList.remove('active');
      menu.setAttribute('aria-hidden', 'true');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Dark mode toggle
  if (darkToggle) {
    darkToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      localStorage.setItem("darkMode", isDark);
      
      // Atualizar texto do botão
      darkToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
    });

    // Carregar preferência salva
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    if (savedDarkMode) {
      document.body.classList.add("dark");
      darkToggle.textContent = "☀️ Light Mode";
    }
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (confirm("Tem certeza que deseja sair?")) {
        localStorage.removeItem("usuario");
        localStorage.removeItem("darkMode");
        window.location.href = "index.html";
      }
    });
  }
}
