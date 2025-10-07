// Duração de cada story em milissegundos
const STORY_DURATION = 5000; // 5 segundos

// Nossos dados de exemplo para os stories
const storiesData = [
  {
    user: 'Pedro',
    avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop&crop=face',
    image: '/img/post1.jpeg' // Imagem de carro
  },
  {
    user: 'Carla',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    image: '/img/post2.jpeg' // Imagem de comida
  },
  {
    user: 'Lucas',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    image: '/img/post3.jpeg' // Imagem de academia
  }
];

// Variáveis para controlar o estado do visualizador
let storyViewer, storyImage, authorAvatar, authorName, progressBarsContainer, closeButton;
let currentStoryIndex = 0;
let storyInterval;


// --- FUNÇÃO CORRIGIDA COM O SELETOR CERTO ---
export function initStoryViewer() {
  storyViewer = document.getElementById('story-viewer');
  storyImage = document.getElementById('story-image');
  authorAvatar = document.getElementById('story-author-avatar');
  authorName = document.getElementById('story-author-name');
  progressBarsContainer = document.querySelector('.story-viewer__progress-bars');
  closeButton = document.getElementById('story-viewer-close');
  
  const storiesContainer = document.querySelector('.stories-row'); 
  if (!storiesContainer) return; 

  storiesContainer.addEventListener('click', (event) => {
    // AJUSTE 1: Procuramos pela classe ".story" agora!
    const clickedCard = event.target.closest('.story');

    if (!clickedCard) return;

    // AJUSTE 2: Pegamos todos os elementos com a classe ".story" para saber o índice
    const allStoryCards = Array.from(storiesContainer.querySelectorAll('.story'));
    const index = allStoryCards.indexOf(clickedCard);

    if (index !== -1) {
      openStoryViewer(index);
    }
  });

  closeButton.addEventListener('click', closeStoryViewer);
}


// O resto do código permanece exatamente igual
function openStoryViewer(startIndex) {
  currentStoryIndex = startIndex;
  storyViewer.classList.add('show');
  playStory();
}

function closeStoryViewer() {
  storyViewer.classList.remove('show');
  clearInterval(storyInterval);
  progressBarsContainer.innerHTML = '';
}

function playStory() {
  clearInterval(storyInterval);

  const story = storiesData[currentStoryIndex];
  storyImage.src = story.image;
  authorAvatar.src = story.avatar;
  authorName.innerText = story.user;

  createProgressBars();
  
  setTimeout(() => {
    const currentProgressBarFill = document.querySelector(`.progress-bar[data-index='${currentStoryIndex}'] .progress-bar__fill`);
    if(currentProgressBarFill) {
        currentProgressBarFill.style.width = '100%';
    }
  }, 10);

  storyInterval = setInterval(nextStory, STORY_DURATION);
}

function nextStory() {
  const finishedProgressBarFill = document.querySelector(`.progress-bar[data-index='${currentStoryIndex}'] .progress-bar__fill`);
  if(finishedProgressBarFill) finishedProgressBarFill.style.width = '100%';

  currentStoryIndex++;

  if (currentStoryIndex >= storiesData.length) {
    closeStoryViewer();
  } else {
    playStory();
  }
}

function createProgressBars() {
    progressBarsContainer.innerHTML = '';
    storiesData.forEach((_, index) => {
        const bar = document.createElement('div');
        bar.className = 'progress-bar';
        bar.dataset.index = index;
        const fill = document.createElement('div');
        fill.className = 'progress-bar__fill';
        if (index < currentStoryIndex) {
            fill.style.width = '100%';
        }
        bar.appendChild(fill);
        progressBarsContainer.appendChild(bar);
    });
}