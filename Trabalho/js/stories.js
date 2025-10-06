import { stories as initialStories } from "./data.js";

const storiesContainer = document.getElementById("stories");
let storiesVistos = JSON.parse(localStorage.getItem("storiesVistos")) || [];

export function renderStories() {
  storiesContainer.innerHTML = "";

  initialStories.forEach((story, index) => {
    const storyElement = document.createElement("div");
    storyElement.classList.add("story");
    storyElement.innerHTML = `
      <img src="${story.imagem}" alt="${story.usuario}" />
      <p>${story.usuario}</p>
    `;
    storiesContainer.appendChild(storyElement);

    storyElement.addEventListener("click", () => abrirModalStory(index));
  });
}

function abrirModalStory(index) {
  const modal = document.createElement("div");
  modal.id = "story-modal";
  modal.innerHTML = `
    <div class="modal-content">
      <span id="close-modal">&times;</span>
      <h2>${initialStories[index].usuario}</h2>
      <img src="${initialStories[index].imagem}" alt="${initialStories[index].usuario}">
    </div>
  `;
  // Acessibilidade: role dialog e aria-modal
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  document.body.appendChild(modal);
  
  const closeBtn = document.getElementById("close-modal");
  if (closeBtn) closeBtn.addEventListener("click", () => modal.remove());

  // Focar no modal e permitir fechar com Escape
  modal.tabIndex = -1;
  modal.focus();
  document.addEventListener('keydown', function escListener(e) {
    if (e.key === 'Escape') {
      modal.remove();
      document.removeEventListener('keydown', escListener);
    }
  });

  // Contador de stories vistos
  if (!storiesVistos.includes(index)) storiesVistos.push(index);
  localStorage.setItem("storiesVistos", JSON.stringify(storiesVistos));
}
