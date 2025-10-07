import { renderPosts, createPost } from "./feed.js";
import { renderStories } from "./stories.js";
import { initLogin } from "./login.js";
import { initTheme } from "./theme.js";
import { initMenu } from "./menu.js";
import { posts } from "./data.js";
import { showToast } from "./toast.js";
import { initSkeletonLoader } from './skeletonLoader.js';
import { initStoryViewer } from './storyManager.js';
// REMOVI a importação do postManager.js que estava causando o conflito.

export function carregarMaisPosts() {
  const novos = [
    { usuario: "Carlos Mendes", texto: "Esse projeto tá ficando bom demais 😎", curtidas: 0, comentarios: [] },
    { usuario: "Ana Paula", texto: "Alguém aí pra jogar mais tarde? 🎮", curtidas: 0, comentarios: [] }
  ];
  posts.push(...novos);
  renderPosts();
}

document.addEventListener("DOMContentLoaded", () => {
  // --- INICIALIZAÇÃO DOS MÓDulos ---
  renderPosts();
  renderStories();
  initLogin();
  initTheme();
  initMenu();
  initSkeletonLoader(); // Corrigido para chamar apenas uma vez
  // REMOVI a chamada initPostPublisher();
  initStoryViewer();

  // (Temporário) Expor a função de Toast para testes no console
  window.showToast = showToast; 

  // --- LÓGICA DE PUBLICAÇÃO RESTAURADA ---
  // Seu código original que já funcionava perfeitamente.
  const btnPublicar = document.getElementById("btn-publicar");
  const inputPublicar = document.getElementById("novo-post-texto");

  if (btnPublicar && inputPublicar) {
    btnPublicar.addEventListener("click", () => {
      const usuario = localStorage.getItem("usuario") || "Usuário Anônimo";
      const texto = inputPublicar.value.trim();
      if (!texto) {
          showToast("Você precisa escrever algo para publicar!", "error"); // Melhorado para usar seu Toast!
          return;
      }
      createPost(usuario, texto); // Sua função principal de criar posts
      inputPublicar.value = "";
      showToast('Publicação criada com sucesso!'); 
    });
  }

  // --- LÓGICA DE SCROLL INFINITO ---
  function debounce(fn, wait) {
    let t;
    return function(...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  const handleScroll = debounce(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
      carregarMaisPosts();
    }
  }, 150);

  window.addEventListener("scroll", handleScroll);
});