 
const showPassword = (input) => { 
    const password = document.getElementById("password")  
    input.checked === true ? password.type = 'text' : password.type = 'password'
}

// Funci�n que se ejecutar� al enviar el formulario
function handleLogin(event) {
    event.preventDefault(); // Evita que se recargue la p�gina
    const formData = new FormData(event.target); // Obtiene los datos del formulario

    // Accede a los valores  
    const user = formData.get('user-id'); // Usuario
    const password = formData.get('password'); // Contrase�a

    console.log("user", user)
    console.log("password", password)
   
    mymessage("success", "Bienvenido!")
     
}