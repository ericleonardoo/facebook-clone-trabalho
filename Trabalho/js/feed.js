import { posts as initialPosts } from "./data.js";

// Ler posts salvos ou usar os iniciais
let feedPosts = JSON.parse(localStorage.getItem("posts")) || initialPosts;

const feed = document.getElementById("feed");

// -------------------------
// RENDERIZAR POSTS
// -------------------------
export function renderPosts() {
  if (!feed) return;
  feed.innerHTML = "";

  feedPosts.forEach((post, index) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");

    postElement.innerHTML = `
      <h3>${post.usuario}</h3>
      <p>${post.texto}</p>
      ${post.imagem ? `<img src="${post.imagem}" alt="Imagem do post" onclick="abrirModalImagem('${post.imagem}')">` : ""}
      
      <div class="acoes">
        <button onclick="curtir(${index})"><i class="fi fi-sr-thumbs-up"></i></button>
        <span id="curtidas-${index}">${post.curtidas || 0} curtidas</span>
        <button onclick="compartilhar(${index})"><i class="fi fi-rr-share-square"></i></button>
        <button onclick="deletePost(${index})"><i class="fi fi-rr-trash"></i></button>
      </div>

      <div class="comentarios">
        <input type="text" id="comentario-${index}" placeholder="Escreva um comentário...">
        <button onclick="comentar(${index})">Comentar</button>
        <ul id="lista-comentarios-${index}"></ul>
      </div>
    `;

    // Inserir no DOM antes de manipular elementos internos
    feed.appendChild(postElement);

    // Preencher lista de comentários com botões de ação
    const ul = postElement.querySelector(`#lista-comentarios-${index}`);
    if (ul) {
      const comentarios = post.comentarios || [];
      const comentariosVisiveis = comentarios.slice(0, 3);
      const temMaisComentarios = comentarios.length > 3;
      
      ul.innerHTML = comentariosVisiveis.map((cmt, ci) => {
        const usuarioLogado = localStorage.getItem("usuario") || "Usuário Anônimo";
        return `<li>
           <div class="comment-content">
             <div class="comment-name">${usuarioLogado}</div>
             <div class="comment-text">${cmt}</div>
             <div class="comment-actions">
               <a href="#" onclick="curtirComentario(${index}, ${ci}); return false;">Curtir</a>
               <a href="#" onclick="return false;">Responder</a>
               <span>1 d</span>
             </div>
           </div>
         </li>`;
      }).join("");
      
      // Adicionar botão "Ver mais" se houver mais de 3 comentários
      if (temMaisComentarios) {
        const verMaisBtn = document.createElement("button");
        verMaisBtn.className = "ver-mais-btn";
        verMaisBtn.textContent = "Ver mais";
        verMaisBtn.onclick = () => abrirModalComentarios(index, post);
        ul.parentNode.appendChild(verMaisBtn);
      }
    }

    // Forçar animação fade-in para este post
      setTimeout(() => {
      postElement.classList.add("mostrar");
    }, 50);
  });

  // Atualizar localStorage
  localStorage.setItem("posts", JSON.stringify(feedPosts));
}


// -------------------------
// FUNÇÕES CRUD E INTERAÇÕES
// -------------------------
export function createPost(usuario, texto, imagem = null) {
  const novoPost = {
    usuario,
    texto,
    imagem,
    curtidas: 0,
    comentarios: []
  };
  feedPosts.unshift(novoPost);
  localStorage.setItem("posts", JSON.stringify(feedPosts));
  renderPosts();
}

export function deletePost(i) {
  feedPosts.splice(i, 1);
  localStorage.setItem("posts", JSON.stringify(feedPosts));
  renderPosts();
}

export function curtir(i) {
  feedPosts[i].curtidas = (feedPosts[i].curtidas || 0) + 1;
  renderPosts();
  const span = document.getElementById(`curtidas-${i}`);
  if (span) span.style.color = "blue"; // feedback visual simples
}

export function comentar(i) {
  const input = document.getElementById(`comentario-${i}`);
  if (!input) return;
  const texto = input.value.trim();
  if (texto) {
    if (!feedPosts[i].comentarios) feedPosts[i].comentarios = [];
    feedPosts[i].comentarios.push(texto);
    input.value = "";
    renderPosts();
  }
}

export function compartilhar(i) {
  const postOriginal = feedPosts[i];
  const novoPost = {
    usuario: "Você compartilhou",
    texto: `Compartilhou o post de ${postOriginal.usuario}: "${postOriginal.texto}"`,
    imagem: postOriginal.imagem,
    curtidas: 0,
    comentarios: []
  };
  feedPosts.unshift(novoPost);
  renderPosts();
}

// -------------------------
// SCROLL INFINITO (opcional)
// -------------------------
export function carregarMaisPosts() {
  const novos = [
    { usuario: "Carlos Mendes", texto: "Scroll infinito animado 😎", imagem: "img/post1.jpeg", curtidas: 0, comentarios: [] },
    { usuario: "Ana Paula", texto: "Mais posts chegando! 🚀", imagem: "img/post2.jpeg", curtidas: 0, comentarios: [] },
    { usuario: "Pedro Costa", texto: "Aprendendo desenvolvimento web! 💻", imagem: "img/post3.jpeg", curtidas: 0, comentarios: [] }
  ];

  feedPosts.push(...novos);
  renderPosts();
}

export function editarPost(i) {
  const novoTexto = prompt("Editar post:", feedPosts[i].texto);
  if (novoTexto && novoTexto.trim() !== "") {
    feedPosts[i].texto = novoTexto.trim();
    renderPosts();
  }
}

export function curtirComentario(postIndex, cmtIndex) {
  // Aqui você pode adicionar um contador se quiser
  alert("Curtida no comentário! (simulação)");
}

export function excluirComentario(postIndex, cmtIndex) {
  feedPosts[postIndex].comentarios.splice(cmtIndex, 1);
  renderPosts();
}

export function filtrarPosts(texto) {
  return feedPosts.filter(p => p.texto.toLowerCase().includes(texto.toLowerCase()));
}

// ======== MODAL DE COMENTÁRIOS ========
function abrirModalComentarios(postIndex, post) {
  const modal = document.createElement("div");
  modal.className = "comments-modal";
  modal.innerHTML = `
    <div class="comments-modal-content">
      <div class="comments-modal-header">
        <h3 class="comments-modal-title">Comentários</h3>
        <button class="comments-modal-close" onclick="this.closest('.comments-modal').remove()">×</button>
      </div>
      <div class="comments-modal-body">
        <div class="post">
          <h3>${post.usuario}</h3>
          <p>${post.texto}</p>
          ${post.imagem ? `<img src="${post.imagem}" alt="Imagem do post" onclick="abrirModalImagem('${post.imagem}')">` : ""}
        </div>
        <div class="comentarios">
          <ul id="modal-comentarios-${postIndex}"></ul>
          <input type="text" id="modal-comentario-${postIndex}" placeholder="Escreva um comentário...">
          <button onclick="adicionarComentarioModal(${postIndex})">Comentar</button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Preencher comentários no modal
  const modalUl = modal.querySelector(`#modal-comentarios-${postIndex}`);
  const comentarios = post.comentarios || [];
  modalUl.innerHTML = comentarios.map((cmt, ci) => {
    const usuarioLogado = localStorage.getItem("usuario") || "Usuário Anônimo";
    return `<li>
       <div class="comment-content">
         <div class="comment-name">${usuarioLogado}</div>
         <div class="comment-text">${cmt}</div>
         <div class="comment-actions">
           <a href="#" onclick="curtirComentario(${postIndex}, ${ci}); return false;">Curtir</a>
           <a href="#" onclick="return false;">Responder</a>
           <span>1 d</span>
         </div>
       </div>
     </li>`;
  }).join("");
  
  // Fechar modal ao clicar fora
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

function adicionarComentarioModal(postIndex) {
  const input = document.getElementById(`modal-comentario-${postIndex}`);
  const texto = input.value.trim();
  if (texto) {
    comentar(postIndex);
    input.value = "";
    // Fechar modal após adicionar comentário
    document.querySelector('.comments-modal').remove();
  }
}

// ======== MODAL DE IMAGEM ========
function abrirModalImagem(src) {
  const modal = document.createElement("div");
  modal.className = "image-modal";
  modal.innerHTML = `
    <div class="image-modal-content">
      <button class="image-modal-close" onclick="this.closest('.image-modal').remove()">×</button>
      <img src="${src}" alt="Imagem ampliada" class="image-modal-img">
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Fechar modal ao clicar fora
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

// Expor função globalmente
if (typeof window !== "undefined") {
  window.abrirModalComentarios = abrirModalComentarios;
  window.adicionarComentarioModal = adicionarComentarioModal;
  window.abrirModalImagem = abrirModalImagem;
}


// Expor funções ao escopo global para compatibilidade com handlers inline (onclick="...")
if (typeof window !== "undefined") {
  window.createPost = createPost;
  window.deletePost = deletePost;
  window.curtir = curtir;
  window.comentar = comentar;
  window.compartilhar = compartilhar;
  window.carregarMaisPosts = carregarMaisPosts;
  window.editarPost = editarPost;
  window.curtirComentario = curtirComentario;
  window.excluirComentario = excluirComentario;
  window.filtrarPosts = filtrarPosts;
}


window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
    carregarMaisPosts();
  }
});
