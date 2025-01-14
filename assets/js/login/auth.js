 
const showPassword = (input) => { 
    const password = document.getElementById("password")  
    input.checked === true ? password.type = 'text' : password.type = 'password'
}

// Función que se ejecutará al enviar el formulario
function handleLogin(event) {
    event.preventDefault(); // Evita que se recargue la página
    const formData = new FormData(event.target); // Obtiene los datos del formulario

    // Accede a los valores  
    const user = formData.get('user-id'); // Usuario
    const password = formData.get('password'); // Contraseña

    console.log("user", user)
    console.log("password", password)

    userAuth(user, password)
        .then(data => { 
            if (!data.Success) {
                console.log("Data recibida:", data)
                mymessage("error", data.Result.Description)
                return 
            } 

            const userJson = {
                user,
            }

            // Almacenar Usuario en LocalStorage
            localStorage.setItem("myUser", JSON.stringify(userJson))
            mymessage("success", "Bienvenido!")
            // Redireccionar al Home
            window.location.href = "/Home/Index";
             
            
        })
        .catch(error => console.error("Error:", error));
   

    
     
}