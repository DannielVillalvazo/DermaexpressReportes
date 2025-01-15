/* Llamamos las variables de entorno */
const envConfig = envirement();

/* Variables de storage*/
const user = JSON.parse(localStorage.getItem('user'));
const clinic = JSON.parse(localStorage.getItem('clinic'));
const room = JSON.parse(localStorage.getItem('consultingRoom'));
const turnActive = localStorage.getItem('turnOn')
/* Variables globales */
let rooms = [];

/* Menu Componentes*/
let menu_administration = document.getElementById('menu-administration');
let menu_inventories = document.getElementById('menu-inventories');
let menu_administrationPayments = document.getElementById('menu-administrationPayments');
let menu_administrationCashRegister = document.getElementById('menu-administrationCashRegister');
let menu_administrationReports = document.getElementById('menu-administrationReports');
let menu_administrationDashboard = document.getElementById('menu-administrationDashboard');
let menu_administrationPatients = document.getElementById('menu-administrationPatients');

let menu_dashboard = document.getElementById('menu-dashboard');
let menu_dashboardReports = document.getElementById('menu-dashboardReports');
let menu_dashboardDash = document.getElementById('menu-dashboardDash');

let menu_inventoriesInventory = document.getElementById('menu-inventoriesInventory');
let menu_inventoriesWarehouse = document.getElementById('menu-inventoriesWarehouse');
// let menu_administration = document.getElementById('menu-administration');

let container_newPatient = document.getElementById('container-newPatient');
let container_newAppoiment = document.getElementById('container-newAppoiment');
let turnShope = document.getElementById('turnShope');
let openWaitingList = document.getElementById('openWaitingList');
/* Variables globales */

/* Establecemos en español la libreria de moment */
moment.locale('es-MX');
/* Validamos la ruta */
var URLactual = window.location;
//.split('/')
//alert(URLactual);

/* Validamos si el usuario tiene la sesion activa */
const validateSession = () => {
    return new Promise((resolve, reject) => {
        fetch(`${envConfig.rutes.back}${envConfig.controllers.login}GetIsActive?idUser=${user.id_usuario}`)
        .then(response => response.json())
        .then(result => resolve(result))
        .catch(error => reject(error.message))        
    })
}
/* Validamos si el usuario tiene la sesion activa FIN */

/* Validamos si el navegador ya cuenta con una Sesion Iniciada */
const configuration = () => {
    validateSession()
    .then(({sesion}) => {
        if(!sesion) destroySession();
        const { AgendarCita, RegistroPacientes } = user.permissions;
        
        let sidebar = document.getElementsByClassName("sidebar");
        document.getElementById("nav-username").innerHTML = `${user.nombre} ${user.apellido_paterno} ${user.apellido_materno}`;
        document.getElementById("nav-rol").innerHTML = `${user.Rol.nombre}`;
        document.getElementById("nav-avatar").src = `/Content/Images/avatars/${user.usuario1}.png`;
        
        /* Validación de permisos */
        if(!RegistroPacientes)
        container_newPatient.style.display = 'none'
        if(!AgendarCita)
        container_newAppoiment.style.display = 'none'
        /* Validación de permisos fin */
        if (user.id_rol === 5) {
                if (!room) {
                    fetch(`${envAppoiment.rutes.back}${envAppoiment.controllers.diary}GetSites?idShope=${clinic.id}`)
                    .then(response => response.json())
                    .then(result => {
                        const { sites } = result.Sites[0]
                        rooms = sites;
                        sites.map(element => {
                            let option = document.createElement('option')
                            option.value = `${element.id_sitio}`
                            option.label = `${element.nombre}`
                            document.getElementById('consul-room').append(option)
                        })
                        setTimeout(() => {
                            $('#modalRoomEmployer').modal('show')
                        }, 100)
                    })
                    .catch(error => Alert('error', message.error))
                }
                else {
                    document.getElementById("nav-rol").innerHTML = `${user.Rol.nombre} - ${room.nombre}`;
                }
        }
    })
}

const initialPage = () => {
    /* Configuracion de las opciones del menu */
    const { 
        VerReportes,
        VerInventarios,
        VerPacientes,
        VerAlmacen,
        RealizarPagoDerma,
        RealizarCortesCaja,
        ModificarListaEspera,
        VerPantallaEspera
     } = user.permissions;
     
     //Boton de lista de espera
     openWaitingList.style.display = ModificarListaEspera ? 'inline' : 'none'
     //Vemos el turno actual de la clinica
     document.getElementById('turnCash').checked = turnActive === 'M' ? true : false;
     turnShope.style.display =  RealizarPagoDerma && RealizarCortesCaja ? 'inline' : 'none';
     //Comprobamos si tenemos algo en el menu de administracion
     if(!RealizarPagoDerma)  menu_administration.style.display = 'none';
     if(!VerInventarios && !VerAlmacen) menu_inventories.style.display = 'none';
     if(!VerReportes) menu_dashboard.style.display='none';

     menu_administrationPayments.style.display = RealizarPagoDerma ? 'inline' : 'none';
     menu_administrationCashRegister.style.display = RealizarCortesCaja ? 'inline' : 'none';
     
     menu_dashboardReports.style.display = VerReportes ? 'inline' : 'none';
     menu_dashboardDash.style.display = VerReportes ? 'inline' : 'none';

     menu_administrationPatients.style.display = VerPacientes ? 'inline' : 'none';
     menu_inventoriesInventory.style.display = VerInventarios ? 'inline' : 'none';
     menu_inventoriesWarehouse.style.display = VerAlmacen ? 'inline' : 'none';
    /* Configuracion de las opciones del menu fin */
    console.log(URLactual.pathname);
    // console.log(user.permissions);

    document.getElementById(URLactual.pathname).className = 'nav-link active'
    if(user.id_rol === 11 && VerPantallaEspera){
        window.location.href = "WaitingList";
    }

    if (URLactual.pathname === '/WaitingList/ClinicMultimedia') {
        document.getElementById('main-title').innerHTML = 'Multimedia';
        document.getElementById('main-subtitle').innerHTML = 'Administración de los videos mostrados en clinicas';
    }

    
    if (URLactual.pathname === '/patient' && VerPacientes) {
        document.getElementById('main-title').innerHTML = 'Pacientes';
        document.getElementById('main-subtitle').innerHTML = 'Administración de pacientes';
    }
    else if(URLactual.pathname === '/patient' && !VerPacientes) {        
        window.location.href = "diary";
    }

    if(URLactual.pathname === '/Payments' && RealizarPagoDerma){ 
        document.getElementById('main-title').innerHTML = 'Pago a dermatologos';
        document.getElementById('main-subtitle').innerHTML = 'Administración de pagos a dermatologo';
    }

    if (URLactual.pathname === '/diary') {
        document.getElementById('main-title').innerHTML = 'Calendario';
        document.getElementById('main-subtitle').innerHTML = 'Administración de calendarios';
    }

    if(URLactual.pathname === '/Payments' && RealizarPagoDerma){ 
        document.getElementById('main-title').innerHTML = 'Pago a dermatologos';
        document.getElementById('main-subtitle').innerHTML = 'Administración de pagos a dermatologo';
    }
    else if(URLactual.pathname === '/Payments' && !RealizarPagoDerma) {
        window.location.href = "diary";
    }

    if(URLactual.pathname === '/Payments/CashRegister' && RealizarCortesCaja){ 
        document.getElementById('main-title').innerHTML = 'Corte de caja';
        document.getElementById('main-subtitle').innerHTML = 'Administración del corte de caja';
    }
    else if(URLactual.pathname === '/Payments/CashRegister' && !RealizarCortesCaja) {
        window.location.href = "diary";
    }

    if(URLactual.pathname === '/inventory' && VerInventarios){ 
        document.getElementById('main-title').innerHTML = 'Inventario';
        document.getElementById('main-subtitle').innerHTML = 'Administración de inventario';
    }
    else if(URLactual.pathname === '/inventory' && !VerInventarios) {
        window.location.href = "diary";
    }

    if(URLactual.pathname === '/inventory/Warehouse' && VerAlmacen){ 
        document.getElementById('main-title').innerHTML = 'Almacen';
        document.getElementById('main-subtitle').innerHTML = 'Administración de almacenes';
    }
    else if(URLactual.pathname === '/inventory/Warehouse' && !VerAlmacen) {
        window.location.href = "diary";
    }

    if(URLactual.pathname === '/reports' && VerReportes){ 
        document.getElementById('main-title').innerHTML = 'Reportes';
        document.getElementById('main-subtitle').innerHTML = 'Administración de reportes';
    }
    else if(URLactual.pathname === '/reports' && !VerReportes) {
        window.location.href = "diary";
    }
    if(URLactual.pathname === '/reports/dashboard' && VerReportes){ 
        document.getElementById('main-title').innerHTML = 'Graficas';
        document.getElementById('main-subtitle').innerHTML = 'Estado de negocio';
    }
    else if(URLactual.pathname === '/reports/dashboard' && !VerReportes) {
        window.location.href = "diary";
    }

    configuration();
}

$(document).ready(function () {
    sessionActive("diary");
    initialPage();    
});
 

const assignOffice = () => {
    let error = 0;
    let room = document.getElementById('consul-room')
    room.className = 'form-control'
    if (room.value === '') {
        room.className = 'form-control is-invalid';
        error++;
    }

    if (error > 0) return;
    fetch(`${envAppoiment.rutes.back}${envAppoiment.controllers.diary}PutDataSitesAndUser?idUser=${user.id_usuario}&idSite=${room.value}`, {
        method: 'PUT',
    })
    .then(response => response.json())
    .then(result => {
        let indexRoom = rooms.findIndex(element => element.id_sitio === parseInt(room.value))
        localStorage.setItem('consultingRoom', JSON.stringify(rooms[indexRoom]))
        const { Sites } = result.SuccesDataUpdateSites[0];
        document.getElementById("nav-rol").innerHTML = `${user.Rol.nombre} - ${rooms[indexRoom].nombre} `
        $('#modalRoomEmployer').modal('hide')
    })
}

function updateClock() {
    const { name } = JSON.parse(localStorage.getItem('clinic'));
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    document.getElementById('titleScurusal').innerText = name;
    const timeString = `<div>
                        <h2 class="text-white fs-5">${moment().format('LL')}</h2>
                        <h2 class="text-white text-center fs-5">${hours}:${minutes}:${seconds}</h2>
                        </div>`;

    document.getElementById("clock").innerHTML = timeString;
}

setInterval(updateClock, 1000);


// let navegador = navigator.userAgent;
// if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
//    Alert("warning","Estás usando un dispositivo móvil!!");
// } else {
//    Alert("warning","No estás usando un móvil");
// }

/* Valida la actividad del usuario por 1 hora */
var timeoutID;

// function setup() {
//   this.addEventListener("mousemove", resetTimer, false);
//   this.addEventListener("mousedown", resetTimer, false);
//   this.addEventListener("keypress", resetTimer, false);
//   this.addEventListener("DOMMouseScroll", resetTimer, false);
//   this.addEventListener("mousewheel", resetTimer, false);
//   this.addEventListener("touchmove", resetTimer, false);
//   this.addEventListener("MSPointerMove", resetTimer, false);

//   startTimer();
// }
// setup();

// function startTimer() {
//   // wait 2 seconds before calling goInactive
//   timeoutID = window.setTimeout(goInactive, 216000);
// }

// function resetTimer(e) {
//   window.clearTimeout(timeoutID);

//   goActive();
// }

// function goInactive() {
//   // do something
//   Alert('warning',"Sesion inactiva");
//   destroySession();
//  //window.location.reload();
// }

// function goActive() {
//   // do something

//   startTimer();
// }

/* Valida la actividad del usuario por 1 hora fin */
