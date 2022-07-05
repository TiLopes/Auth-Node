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
//     const res = await fetch('/signup', {
//       method: 'POST', // pedido do tipo POST
//       body: JSON.stringify({ email, password }), // transformar em JSON
//       headers: { 'Content-Type': 'application/json' } // tipo do conteúdo
//     });

//     const data = await res.json();
//     console.log(data);

//     if (data.errors) {
//       emailError.textContent = data.errors.email;
//       passwordError.textContent = data.errors.password;
//     } else {
//       location.assign('/login'); // ir para o login
//     }

//   } catch (error) {
//     console.log(error);
//   }
// });   