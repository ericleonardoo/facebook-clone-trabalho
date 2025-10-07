/**
 * Módulo Skeleton Loader
 * Simula um tempo de carregamento e depois revela o conteúdo dos posts.
 */

// Tempo de espera em milissegundos (2 segundos)
const FAKE_LOADING_TIME = 2000; 

export function initSkeletonLoader() {
  // Seleciona todos os posts que estão no modo esqueleto
  const skeletonPosts = document.querySelectorAll('.post.skeleton');

  // Se não houver nenhum, não faz nada
  if (skeletonPosts.length === 0) {
    return;
  }

  // Simula o carregamento com setTimeout
  setTimeout(() => {
    // Para cada post, remove a classe .skeleton
    skeletonPosts.forEach(post => {
      post.classList.remove('skeleton');
    });
  }, FAKE_LOADING_TIME);
}