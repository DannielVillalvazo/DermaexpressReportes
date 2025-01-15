console.log("entro")
//Global
const myUser = JSON.parse(localStorage.getItem("user"));
const whsLS = JSON.parse(localStorage.getItem("whs"));


// Seleccionar enlaces por ID
const dashboardLink = document.getElementById('dashboardLink');
const usersLink = document.getElementById('usersLink');
const taskLink = document.getElementById('taskLink');
const UserCounts = document.getElementById('UserCounts');
const Reports = document.getElementById('Reports');
const History = document.getElementById('ReportsHistory');

// Validar que el usuario este Logeado
if (myUser && window.location.pathname === "/") myUser.id_role !== 2 ? window.location.href = "/home/index" : window.location.href = "/UserCounts/UserCounts";
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
    dashboardLink.classList.remove('active');
    taskLink.classList.remove('active');
    UserCounts.classList.remove('active');
    Reports.classList.remove('active');
    History.classList.remove('active');
}

// cleanClass()  
// Verificar la ruta y agregar el 'active' solo al enlace correspondiente
if (currentPath.includes('/home/index')) {
    // cleanClass() 

    dashboardLink.classList.add('active');
    if (navbarHeader) {
        navbarHeader.style.display = "none";
    } 
}  


const homePage = () => {

    console.log('user', myUser)
    if (!myUser) {
        window.location.href = "/";
        //return
    }


} 

