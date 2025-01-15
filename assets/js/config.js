//Global 
const myUser = JSON.parse(localStorage.getItem("myUser")); 

// Seleccionar enlaces por ID
const reportLink = document.getElementById('reportLink'); 

// Validar que el usuario este Logeado
if (myUser && window.location.pathname === "/") window.location.href = "/home/index";
if (!myUser && window.location.pathname !== "/") window.location.href = "/";

// Obtener la URL actual
const currentPath = window.location.pathname;

// Obtener el header de la navbar 
const navbarHeader = document.querySelector(".iq-navbar-header");
// Titulo del header
const textHeader = document.getElementById("titleHeader")
// Titulo del header
const textDescription = document.getElementById("descriptionHeader")


const cleanClass = () => {
    usersLink.classList.remove('active'); 
}
 
// Verificar la ruta y agregar el 'active' solo al enlace correspondiente
if (currentPath.includes('/home/index') || currentPath.includes('/Home/Index') || currentPath.includes("/Home/index")) {  
    textHeader.textContent = "Administraci\u00f3n del Reporte" 
    textDescription.textContent = "En este modulo podr\u00e1s visualizar el reporte generado por el aplicativo."

    reportLink.classList.add('active');
     
}  
 
