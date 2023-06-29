import '../css/index.css'
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    loginForm.addEventListener('submit', loginUser);
  
    async function loginUser(event) {
      event.preventDefault();
  
      const username = document.querySelector('#username').value;
      const password = document.querySelector('#password').value;
  
      const data = {
        username: username,
        password: password
      };
  
      try {
        const response = await fetch('http://172.17.14.51:3000/autote/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        const result = await response.json();
  
        if (response.ok) {
          // Аутентификация прошла успешно, сохраняем токен в localStorage
          localStorage.setItem('token', result.token);
          // console.log(result.message);
          localStorage.setItem('token', result.token);
          // Дополнительные действия после успешной авторизации
          window.location.href = '/admin.html';
        } else {
          // console.log(result.message);
          alert('Не верное имя пользователя или пароль')
        }
      } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
        // Дополнительные действия в случае ошибки
      }
    }
  });