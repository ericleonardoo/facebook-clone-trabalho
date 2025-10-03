import { stories as initialStories } from "./data.js";

const storiesContainer = document.getElementById("stories");
let storiesVistos = JSON.parse(localStorage.getItem("storiesVistos")) || [];

export function renderStories() {
  storiesContainer.innerHTML = "";

  initialStories.forEach((story, index) => {
    const storyElement = document.createElement("div");
    storyElement.classList.add("story");
    
    // Criar avatar SVG baseado no nome do usuário
    const avatarInitial = story.usuario.charAt(0).toUpperCase();
    const avatarColor = getAvatarColor(story.usuario);
    
    storyElement.innerHTML = `
      <img src="${story.imagem}" alt="${story.usuario}" />
      <div class="story-avatar" style="background: ${avatarColor};">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="16" fill="${avatarColor}"/>
          <text x="16" y="20" text-anchor="middle" fill="white" font-family="Arial" font-size="14" font-weight="bold">${avatarInitial}</text>
        </svg>
      </div>
      <p>${story.usuario}</p>
    `;
    storiesContainer.appendChild(storyElement);

    storyElement.addEventListener("click", () => abrirModalStory(index));
  });
}

function getAvatarColor(name) {
  const colors = ['#FF6347', '#45BD62', '#1877f2', '#8B5CF6', '#F7B928', '#FF8C00', '#E91E63', '#00BCD4'];
  const index = name.length % colors.length;
  return colors[index];
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
  document.body.appendChild(modal);

  document.getElementById("close-modal").addEventListener("click", () => modal.remove());

  // Contador de stories vistos
  if (!storiesVistos.includes(index)) storiesVistos.push(index);
  localStorage.setItem("storiesVistos", JSON.stringify(storiesVistos));
}
