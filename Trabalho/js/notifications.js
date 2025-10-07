// Dados fictícios para as notificações
const notificationData = [
    {
        id: 1,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
        name: 'Ana Silva',
        action: 'curtiu sua foto',
        time: '2 min',
        read: false
    },
    {
        id: 2,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        name: 'João Oliveira',
        action: 'comentou em sua publicação',
        time: '15 min',
        read: false
    },
    {
        id: 3,
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face',
        name: 'Lucas Mendes',
        action: 'compartilhou sua publicação',
        time: '1 h',
        read: false
    },
    {
        id: 4,
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
        name: 'Mariana Costa',
        action: 'marcou você em uma foto',
        time: '3 h',
        read: true
    },
    {
        id: 5,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        name: 'Pedro Santos',
        action: 'enviou uma solicitação de amizade',
        time: '1 d',
        read: true
    }
];

// Possíveis ações para notificações aleatórias
const possibleActions = [
    'curtiu sua foto',
    'comentou em sua publicação',
    'compartilhou sua publicação',
    'marcou você em uma foto',
    'enviou uma solicitação de amizade',
    'respondeu ao seu comentário',
    'adicionou uma nova foto',
    'está transmitindo ao vivo',
    'atualizou seu status',
    'convidou você para um evento'
];

// Possíveis nomes para notificações aleatórias
const possibleNames = [
    'Ana Silva', 'João Oliveira', 'Lucas Mendes', 'Mariana Costa', 'Pedro Santos',
    'Carla Souza', 'Rafael Almeida', 'Juliana Lima', 'Gustavo Pereira', 'Fernanda Oliveira',
    'Bruno Castro', 'Camila Rodrigues', 'Diego Martins', 'Aline Ferreira', 'Thiago Ribeiro'
];

// Possíveis avatares para notificações aleatórias
const possibleAvatars = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face'
];

// Possíveis tempos para notificações aleatórias
const possibleTimes = ['agora', '1 min', '2 min', '5 min', '10 min', '15 min', '30 min', '1 h', '2 h', '3 h', '5 h', '1 d'];

// Função para gerar uma notificação aleatória
function generateRandomNotification() {
    const randomId = Date.now();
    const randomAvatar = possibleAvatars[Math.floor(Math.random() * possibleAvatars.length)];
    const randomName = possibleNames[Math.floor(Math.random() * possibleNames.length)];
    const randomAction = possibleActions[Math.floor(Math.random() * possibleActions.length)];
    const randomTime = possibleTimes[Math.floor(Math.random() * possibleTimes.length)];
    
    return {
        id: randomId,
        avatar: randomAvatar,
        name: randomName,
        action: randomAction,
        time: randomTime,
        read: false
    };
}

// Inicializar o sistema de notificações
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const notificationBtn = document.querySelector('.notification-btn');
    const notificationDropdown = document.querySelector('.notification-dropdown');
    const notificationList = document.querySelector('.notification-list');
    const notificationBadge = document.querySelector('.notification-badge');
    const markAllReadBtn = document.querySelector('.notification-actions button:first-child');
    
    // Estado das notificações
    let notifications = [...notificationData];
    let unreadCount = notifications.filter(n => !n.read).length;
    
    // Atualizar o contador de notificações
    function updateNotificationBadge() {
        notificationBadge.textContent = unreadCount;
        if (unreadCount > 0) {
            notificationBadge.classList.add('new');
            setTimeout(() => {
                notificationBadge.classList.remove('new');
            }, 1000);
        } else {
            notificationBadge.style.display = 'none';
        }
    }
    
    // Renderizar as notificações
    function renderNotifications() {
        notificationList.innerHTML = '';
        
        if (notifications.length === 0) {
            notificationList.innerHTML = '<div class="notification-empty">Nenhuma notificação</div>';
            return;
        }
        
        notifications.forEach(notification => {
            const notificationItem = document.createElement('div');
            notificationItem.className = `notification-item ${notification.read ? '' : 'unread'}`;
            notificationItem.dataset.id = notification.id;
            
            notificationItem.innerHTML = `
                <div class="notification-avatar">
                    <img src="${notification.avatar}" alt="${notification.name}" loading="lazy">
                </div>
                <div class="notification-content">
                    <div class="notification-text">
                        <strong>${notification.name}</strong> ${notification.action}
                    </div>
                    <div class="notification-time">${notification.time}</div>
                </div>
                ${notification.read ? '' : '<div class="notification-dot"></div>'}
            `;
            
            notificationItem.addEventListener('click', () => {
                markAsRead(notification.id);
            });
            
            notificationList.appendChild(notificationItem);
        });
    }
    
    // Marcar notificação como lida
    function markAsRead(id) {
        const index = notifications.findIndex(n => n.id === id);
        if (index !== -1 && !notifications[index].read) {
            notifications[index].read = true;
            unreadCount--;
            updateNotificationBadge();
            renderNotifications();
        }
    }
    
    // Marcar todas as notificações como lidas
    function markAllAsRead() {
        notifications.forEach(notification => {
            notification.read = true;
        });
        unreadCount = 0;
        updateNotificationBadge();
        renderNotifications();
    }
    
    // Adicionar uma nova notificação
    function addNotification() {
        const newNotification = generateRandomNotification();
        notifications.unshift(newNotification);
        unreadCount++;
        updateNotificationBadge();
        
        if (notificationDropdown.classList.contains('show')) {
            renderNotifications();
        }
    }
    
    // Alternar a exibição do dropdown de notificações
    notificationBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        notificationDropdown.classList.toggle('show');
        renderNotifications();
    });
    
    // Fechar o dropdown ao clicar fora dele
    document.addEventListener('click', function(e) {
        if (!notificationDropdown.contains(e.target) && !notificationBtn.contains(e.target)) {
            notificationDropdown.classList.remove('show');
        }
    });
    
    // Marcar todas as notificações como lidas
    markAllReadBtn.addEventListener('click', function() {
        markAllAsRead();
    });
    
    // Inicializar o contador de notificações
    updateNotificationBadge();
    
    // Gerar notificações aleatórias periodicamente
    setInterval(addNotification, 30000); // A cada 30 segundos
    
    // Gerar uma notificação após 5 segundos para demonstração
    setTimeout(addNotification, 5000);
});