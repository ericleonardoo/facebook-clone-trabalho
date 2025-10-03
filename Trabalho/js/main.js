import { renderPosts, createPost } from "./feed.js";
import { renderStories } from "./stories.js";
import { initLogin } from "./login.js";
import { initTheme } from "./theme.js";
import { initMenu } from "./menu.js";
import { posts } from "./data.js";

// Importar funções para atualizar nome do usuário
import { atualizarNomeSidebar, atualizarComposer } from "./login.js";

// Importar otimizações para mobile
import { initMobileOptimizations } from "./mobile.js";

function carregarMaisPosts() {
  const novos = [
    { usuario: "Carlos Mendes", texto: "Esse projeto tá ficando bom demais 😎", curtidas: 0, comentarios: [] },
    { usuario: "Ana Paula", texto: "Alguém aí pra jogar mais tarde? 🎮", curtidas: 0, comentarios: [] }
  ];
  posts.push(...novos);
  renderPosts();
}

document.addEventListener("DOMContentLoaded", () => {
  // Inicializações
  renderPosts();
  renderStories();
  initLogin();
  initTheme();
  initMenu();
  
  // Inicializar otimizações para mobile
  initMobileOptimizations();
  
  // Atualizar nome do usuário nas áreas específicas se já estiver logado
  const savedUser = localStorage.getItem("usuario");
  if (savedUser) {
    atualizarNomeSidebar(savedUser);
    atualizarComposer(savedUser);
  }

  // Botão publicar e funcionalidade Enter
  const btnPublicar = document.getElementById("btn-publicar");
  const inputPublicar = document.getElementById("novo-post-texto");

  function publicarPost() {
    const usuario = localStorage.getItem("usuario") || "Usuário Anônimo";
    const texto = inputPublicar.value.trim();
    if (!texto) {
      alert("Digite algo antes de publicar!");
      return;
    }
    createPost(usuario, texto);
    inputPublicar.value = "";
  }

  if (btnPublicar && inputPublicar) {
    // Botão publicar
    btnPublicar.addEventListener("click", publicarPost);
    
    // Tecla Enter
    inputPublicar.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        publicarPost();
      }
    });
  }

  // Scroll infinito
  window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
      carregarMaisPosts();
    }
  });
});
