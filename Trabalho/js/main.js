import { renderPosts, createPost } from "./feed.js";
import { renderStories } from "./stories.js";
import { initLogin } from "./login.js";
import { initTheme } from "./theme.js";
import { initMenu } from "./menu.js";
import { posts } from "./data.js";

export function carregarMaisPosts() {
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

  // Botão publicar
  const btnPublicar = document.getElementById("btn-publicar");
  const inputPublicar = document.getElementById("novo-post-texto");

  if (btnPublicar && inputPublicar) {
    btnPublicar.addEventListener("click", () => {
      const usuario = localStorage.getItem("usuario") || "Usuário Anônimo";
      const texto = inputPublicar.value.trim();
      if (!texto) return alert("Digite algo antes de publicar!");
      createPost(usuario, texto);
      inputPublicar.value = "";
    });
  }

  // Scroll infinito com debounce
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
