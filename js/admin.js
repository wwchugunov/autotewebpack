import '../css/admin.css'

document.addEventListener('DOMContentLoaded', () => {
  let timer; // Переменная для хранения таймера

  checkAuthorization();

  function checkAuthorization() {
    const token = localStorage.getItem('token');

    if (token) {
      // Пользователь авторизован
      console.log('Токен:', token);
      // Дополнительные действия для авторизованного пользователя

      // Отправить токен на сервер для проверки
      fetch('http://172.17.14.51:3000/autote/verify-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.valid) {
            // Токен валидный, продолжить выполнение действий

            // Сбросить таймер и запустить новый
            clearTimeout(timer);
            startTimer();
          } else {
            // Токен недействителен, перенаправить на страницу входа
            redirectToLogin();
          }
        })
        .catch(error => {
          console.error('Ошибка при проверке токена:', error);
          // Дополнительные действия в случае ошибки
        });
    } else {
      // Пользователь не авторизован
      redirectToLogin();
    }
  }

  function redirectToLogin() {
    window.location.href = '/index.html';
  }

  function startTimer() {
    // Устанавливаем таймер на выход из админки через 20 секунд бездействия
    timer = setTimeout(() => {
      logout();
    }, 90000);

    // Добавляем обработчики событий для сброса таймера при активности пользователя
    document.addEventListener('mousemove', resetTimer);
    document.addEventListener('keydown', resetTimer);
    document.addEventListener('click', resetTimer);
  }

  function resetTimer() {
    // Сбросить таймер и запустить новый
    clearTimeout(timer);
    startTimer();
  }

  function logout() {
    localStorage.removeItem('token');
    redirectToLogin();
  }
});


