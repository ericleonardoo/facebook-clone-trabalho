// ========================================
// OTIMIZAÇÕES PARA DISPOSITIVOS MÓVEIS
// ========================================

// Detectar se é dispositivo móvel
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         window.innerWidth <= 768 ||
         ('ontouchstart' in window);
};

// Detectar orientação
const isLandscape = () => {
  return window.innerWidth > window.innerHeight;
};

// Otimizar viewport para iOS Safari
const optimizeViewport = () => {
  if (isMobile()) {
    // Prevenir zoom em inputs
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        if (window.innerWidth <= 768) {
          document.querySelector('meta[name="viewport"]').setAttribute('content', 
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        }
      });
      
      input.addEventListener('blur', () => {
        document.querySelector('meta[name="viewport"]').setAttribute('content', 
          'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
      });
    });
  }
};

// Otimizar scroll suave
const optimizeScroll = () => {
  if (isMobile()) {
    // Scroll suave para stories
    const storiesContainer = document.querySelector('.stories-row');
    if (storiesContainer) {
      storiesContainer.style.scrollBehavior = 'smooth';
    }
    
    // Scroll infinito otimizado para mobile
    let isLoading = false;
    const loadMorePosts = () => {
      if (isLoading) return;
      
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Carregar mais posts quando estiver próximo do final
      if (scrollTop + windowHeight >= documentHeight - 100) {
        isLoading = true;
        setTimeout(() => {
          if (window.carregarMaisPosts) {
            window.carregarMaisPosts();
          }
          isLoading = false;
        }, 500);
      }
    };
    
    window.addEventListener('scroll', loadMorePosts, { passive: true });
  }
};

// Otimizar interações touch
const optimizeTouch = () => {
  if (isMobile()) {
    // Adicionar feedback visual para toques
    const addTouchFeedback = (element) => {
      element.addEventListener('touchstart', (e) => {
        element.style.transform = 'scale(0.95)';
        element.style.transition = 'transform 0.1s ease';
      });
      
      element.addEventListener('touchend', (e) => {
        setTimeout(() => {
          element.style.transform = 'scale(1)';
        }, 100);
      });
      
      element.addEventListener('touchcancel', (e) => {
        element.style.transform = 'scale(1)';
      });
    };
    
    // Aplicar feedback em botões e elementos clicáveis
    const touchElements = document.querySelectorAll('button, .story-card, .story, .post-btn, .composer-action-btn');
    touchElements.forEach(addTouchFeedback);
  }
};

// Otimizar menu hambúrguer para mobile
const optimizeHamburgerMenu = () => {
  if (isMobile()) {
    const hamburgerToggle = document.getElementById('toggle-menu');
    const hamburgerMenu = document.getElementById('menu-lateral');
    
    if (hamburgerToggle && hamburgerMenu) {
      // Fechar menu ao tocar fora
      document.addEventListener('touchstart', (e) => {
        if (hamburgerMenu.classList.contains('aberto') && 
            !hamburgerMenu.contains(e.target) && 
            !hamburgerToggle.contains(e.target)) {
          hamburgerMenu.classList.remove('aberto');
        }
      });
      
      // Fechar menu ao rolar
      window.addEventListener('scroll', () => {
        if (hamburgerMenu.classList.contains('aberto')) {
          hamburgerMenu.classList.remove('aberto');
        }
      });
    }
  }
};

// Otimizar composer para mobile
const optimizeComposer = () => {
  if (isMobile()) {
    const composerInput = document.getElementById('novo-post-texto');
    const composerActions = document.querySelector('.composer-actions');
    
    if (composerInput && composerActions) {
      // Mostrar ações do composer quando o input estiver focado
      composerInput.addEventListener('focus', () => {
        composerActions.style.display = 'flex';
      });
      
      composerInput.addEventListener('blur', () => {
        // Delay para permitir toque nos botões
        setTimeout(() => {
          if (!composerActions.matches(':hover') && !composerActions.querySelector(':focus')) {
            composerActions.style.display = 'flex'; // Manter sempre visível
          }
        }, 150);
      });
    }
  }
};

// Otimizar imagens para mobile
const optimizeImages = () => {
  if (isMobile()) {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Lazy loading para imagens
      img.setAttribute('loading', 'lazy');
      
      // Otimizar imagens grandes
      if (img.src.includes('post') && img.classList.contains('post-image')) {
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
      }
    });
  }
};

// Detectar mudanças de orientação
const handleOrientationChange = () => {
  if (isMobile()) {
    // Recalcular layout após mudança de orientação
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }
};

// Prevenir zoom duplo toque
const preventDoubleTapZoom = () => {
  if (isMobile()) {
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
      const now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
  }
};

// Otimizar performance para mobile
const optimizePerformance = () => {
  if (isMobile()) {
    // Reduzir animações em dispositivos com baixa performance
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
    
    if (prefersReducedMotion || isLowEndDevice) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
      document.documentElement.style.setProperty('--transition-duration', '0.01ms');
    }
    
    // Otimizar scroll com passive listeners
    const passiveElements = document.querySelectorAll('.stories-row, .stories');
    passiveElements.forEach(element => {
      element.addEventListener('scroll', () => {}, { passive: true });
    });
  }
};

// Inicializar otimizações mobile
const initMobileOptimizations = () => {
  if (isMobile()) {
    optimizeViewport();
    optimizeScroll();
    optimizeTouch();
    optimizeHamburgerMenu();
    optimizeComposer();
    optimizeImages();
    preventDoubleTapZoom();
    optimizePerformance();
    
    // Adicionar classe mobile ao body
    document.body.classList.add('mobile-device');
    
    // Detectar mudanças de orientação
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);
  }
};

// Exportar funções
export {
  isMobile,
  isLandscape,
  initMobileOptimizations,
  optimizeViewport,
  optimizeScroll,
  optimizeTouch,
  optimizeHamburgerMenu,
  optimizeComposer,
  optimizeImages,
  preventDoubleTapZoom,
  optimizePerformance
};

// Auto-inicializar se não for importado como módulo
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initMobileOptimizations);
}
