/* Llamamos las variables de entorno */
const envWaiting = envirement();

// Variables globales
let notification = document.getElementById('notification')
let title = document.getElementById('title')
let nameRoom = document.getElementById('nameRoom')
let video = document.getElementById("clinicVideo");
let audio = document.getElementById("audio");
let main_ready = document.getElementById("main-ready");
var notif = $.connection.notificationsHub;

$.connection.hub.logging = true;

// Validamos quien esta accediendo a la pantalla o si cuenta con una sesion activa
$(document).ready(function () {
    const user = JSON.parse(localStorage.getItem('user'));
    sessionActive("WaitingList");
    const { 
        VerPantallaEspera
    } = user.permissions;
    if(!VerPantallaEspera) window.location.href = 'diary'
});

// Se asigna el video de acuerdo a la sucursal y se reproduce
const initialPage = () => {      
    const { id } = JSON.parse(localStorage.getItem('clinic'));
    fetch(`${envWaiting.rutes.back}${envWaiting.controllers.waitinglist}GetVideo?idShope=${id}`)
    .then(response => response.json())
    .then(result => {
        const { URL } = result.Video[0];
        video.src = `${URL}`;
        video.autoplay = true;
        main_ready.style.display = 'none'
    })
    .catch(err => Alert('error', err.message))
}

//Notifica cuando se ha agregado un nuevo paciente en la lista de espera
notif.client.updateNotifications = function (message) {
    const { patient, site, voice } = message.PatientWaiting[0];
    nameRoom.innerText = site;
    title.innerText = patient                
    notification.classList.remove('hide-ad')
    notification.classList.add('show-ad') 
    audio.src = `${envWaiting.Assets.multimediaStoreAudio}${voice}`   
    audio.play()
    console.log(patient, site, voice, `${envWaiting.Assets.multimediaStoreAudio}${voice}`)
    getNotifications();
};


// Método para recibir notificaciones del servidor
notif.client.broadcastMessage = function (message) {
    // Manejar la notificación recibida
    // getNotifications();
    console.log('Notificación recibida: ' + message);
};

$.connection.hub.start({ transport: ['serverSentEvents', 'longPolling'] }).done(() => {
    const { id } = JSON.parse(localStorage.getItem('clinic'))
    console.log('Notification hub startd');
    // Unirse a un grupo específico
    getNotifications();

    notif.server.joinGroup(id);
}).fail(function (e) {
    console.log(e);
});

function getNotifications() {
    $.post('/WaitingList/GetNotifications/', res => {

    });
}
