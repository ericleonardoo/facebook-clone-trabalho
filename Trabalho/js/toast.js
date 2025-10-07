/**
 * Módulo de Notificação (Toast)
 * Exporta uma função para exibir uma mensagem de notificação na tela.
 */

// Função para mostrar a notificação
export function showToast(message, type = 'success') {
  // Pega o contêiner onde as notificações aparecerão
  const container = document.getElementById('toast-container');
  if (!container) {
    console.error('Elemento #toast-container não encontrado no HTML.');
    return;
  }

  // Cria o elemento da notificação
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = message;

  // Adiciona uma classe para estilização opcional (ex: sucesso, erro)
  toast.classList.add(`toast--${type}`);

  // Adiciona a notificação ao contêiner
  container.appendChild(toast);

  // Adiciona a classe 'show' para iniciar a animação de entrada
  // Usamos um pequeno timeout para garantir que a transição do CSS seja acionada
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);

  // Define um tempo para remover a notificação
  setTimeout(() => {
    toast.classList.remove('show');
    
    // Adiciona um listener para remover o elemento do DOM DEPOIS que a animação de saída terminar
    toast.addEventListener('transitionend', () => {
      if (toast.parentElement) {
        toast.remove();
      }
    });
  }, 3000); // A notificação some após 3 segundos
}