// const form = document.querySelector('form');
// const emailError = document.querySelector('.email-error');
// const passwordError = document.querySelector('.password-error');

// form.addEventListener('submit', async (e) => {
//   e.preventDefault();


//   // resetar os erros
//   emailError.textContent = '';
//   passwordError.textContent = '';

//   // ler o valores
//   const email = form.email.value;
//   const password = form.password.value;

//   try {
//     const res = await fetch('/login', {
//       method: 'POST', // pedido do tipo POST
//       headers: { 'Content-Type': 'application/json' },
//       credentials: 'include',
//       body: JSON.stringify({ email, password }) // transformar em JSON
//     });
//     const data = await res.json();
//     console.log('Access Token:' + data.accessToken);
//     console.log('Refresh Token:' + data.refreshToken);

//     if (data.errors) {
//       emailError.textContent = data.errors.email;
//       passwordError.textContent = data.errors.password;
//     } else {
//       document.cookie = 'accessToken=' + data.accessToken + ';max-age=60';
//       document.cookie = 'refreshToken=' + data.refreshToken + ';max-age=86400';
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

// function getCookie(name) {
//   var cookieArr = document.cookie.split(";");

//   for (var i = 0; i < cookieArr.length; i++) {
//     var cookiePair = cookieArr[i].split("=");


//     if (name == cookiePair[0].trim()) {
//       // Decode the cookie value and return
//       return decodeURIComponent(cookiePair[1]);
//     }
//   }

//   return null;
// }