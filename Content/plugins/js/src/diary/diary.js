/* Llamamos las variables de entorno */
const envDiary = envirement();
/* Variables globales */
let showInfo = false;
let statusCycle = false;
let dateSelect = moment(new Date()).format('LL');
let reasonDelete = [];
let Days = ['D','L','M','MI','J','V','S'];
/* Variables globales fin */

//import { Calendar } from '@fullcalendar/core'
//import dayGridPlugin from '@fullcalendar/daygrid'
moment.locale('es-MX');

document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        timeZone: "UTC",
        contentHeight: 240,
        //height: 200,
        locales: 'es',
        eventLimit: true,
        dayMaxEvents: 4,
        header: {
            left: 'title',
            center: '',
            right: 'today prev,next'
        },
        selectable: true,
        dateClick: function (info) {
            searchCalendar(info.dateStr);
        },
        
        initialView: 'dayGridMonth'
    });
    calendar.render();
});

const renameButtonToday = () => {
    let buttonToday = document.getElementsByClassName("fc-today-button");
    buttonToday[0].innerHTML = 'Hoy';
    let titleCalendar = document.getElementsByClassName("fc-header-toolbar")[0];
    let dayCalendar = document.getElementsByClassName("fc-toolbar-title")[0];
    dayCalendar.style.marginTop = '20px';
    dayCalendar.style.fontSize = '20px';
    dayCalendar.style.fontWeight = 'bold';
    titleCalendar.style.display = 'flex';
    titleCalendar.style.flexDirection = 'column';

    let eventDay = document.getElementsByClassName('fc-daygrid-day-events');
    for(let i = 0; i < eventDay.length; i++){
        eventDay[i].style.display = 'none';
    }

    let eventDayP = document.getElementsByClassName('fc-day fc-day-sun fc-day-past fc-daygrid-day');
    for(let i = 0; i < eventDayP.length; i++){
        eventDayP[i].style.height = '2rem';
    }

    let eventDayF = document.getElementsByClassName('fc-day fc-day-sun fc-day-future fc-daygrid-day');
    for(let i = 0; i < eventDayF.length; i++){
        eventDayF[i].style.height = '2rem';
    }

    let nameDay = document.getElementsByClassName('fc-col-header-cell-cushion')
    for(let i = 0; i < nameDay.length; i++){
        nameDay[i].innerHTML = Days[i];
    } 
}
setTimeout(() => renameButtonToday(), 1000)
setTimeout(() => $(".fc-today-button").click(() => {
    searchCalendar(new Date())
    renameButtonToday()
}),1000)
setTimeout(() => $(".fc-prev-button").click(() => {
    renameButtonToday()
}), 1000)
setTimeout(() => $(".fc-next-button").click(() => {
    renameButtonToday()
}), 1000)

setTimeout(() => {
    let eventDay = document.getElementsByClassName('fc-daygrid-day-events');
    for(let i = 0; i < eventDay.length; i++){
        eventDay[i].style.display = 'none';
    }

    let eventDayP = document.getElementsByClassName('fc-day fc-day-sun fc-day-past fc-daygrid-day');
    for(let i = 0; i < eventDayP.length; i++){
        eventDayP[i].style.height = '2rem';
    }

    let eventDayF = document.getElementsByClassName('fc-day fc-day-sun fc-day-future fc-daygrid-day');
    for(let i = 0; i < eventDayF.length; i++){
        eventDayF[i].style.height = '2rem';
    }

    let nameDay = document.getElementsByClassName('fc-col-header-cell-cushion')
    for(let i = 0; i < nameDay.length; i++){
        nameDay[i].innerHTML = Days[i];
    }    
}, 1000)

const showDetail = (id) => {
    if (!showInfo) {
        document.querySelector(`#cardInfo-container${id}`).classList.remove("hide-Container");
        document.querySelector(`#button-showDetail${id}`).classList.add("button-showDetail");
        document.querySelector(`#cardInfo-container${id}`).classList.remove("resetHeigh");
        document.getElementById(`button-showDetail${id}`).setAttribute("data-bs-original-title", 'Ocultar el detalle de la cita.');
        showInfo = true;
    } else {
        document.querySelector(`#cardInfo-container${id}`).classList.add("hide-Container");
        document.querySelector(`#button-showDetail${id}`).classList.remove("button-showDetail");
        setTimeout(() => document.querySelector(`#cardInfo-container${id}`).classList.add("resetHeigh"), 1200)
        document.getElementById(`button-showDetail${id}`).setAttribute("data-bs-original-title", 'Abrir el detalle de la cita.');
        showInfo = false;
    }
}

const deleteAppoiment = (idCita, type) => {
    let options = {};
    reasonDelete.map(({ id_razon, nombre }) => options[id_razon] = nombre)
    ConfirmationDelete(options, idCita)
    .then(result => {
        const { isConfirmed, isDismissed, isDenied } = result;
        if (isDismissed || isDenied) return;
        const { id_usuario } = JSON.parse(localStorage.getItem('user'))
        const { value } = result;
        let NIP = parseInt(value)===6 && document.getElementById('cancelPasswordInput').value || ''; 
        fetch(`${envDiary.rutes.back}${envDiary.controllers.diary}DeleteDatareason?idAppointment=${idCita}&idreason=${value}&Type=${type}&idUser=${id_usuario}&NIP=${NIP}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(result => {
            const { SuccessDataUpdatereason } = result;
            if(SuccessDataUpdatereason[0].reason.includes('consulta')){
                Alert('warning', SuccessDataUpdatereason[0].reason);
            }
            else if(SuccessDataUpdatereason[0].reason.includes('Confirmación')){
                Alert('warning', SuccessDataUpdatereason[0].reason);
                setTimeout(() => {
                    deleteAppoiment(options, idCita)                    
                }, 2000);
            }       
            else{
                Alert('success', SuccessDataUpdatereason[0].reason);
                renderInfo();
            }
        })
    })
}

const consultationPending = name => ToastIDPending(name)

const updateAppoiment = (idAppoiment, idStatus) => {
    const { id_usuario } = JSON.parse(localStorage.getItem('user'))
    
    fetch(`${envDiary.rutes.back}${envDiary.controllers.diary}PutPatientArrived?idAppoiment=${idAppoiment}&idStatus=${idStatus}&idUser=${id_usuario}`,{
        method: 'PUT'
    })
    .then(response => response.json())
    .then(result => {
        const { Appoiment } = result.SuccesDataUpdateAppoiment[0]
        Alert('success',Appoiment)
        renderInfo();
    })

}
const renderInfo = () => {
    const { id } = JSON.parse(localStorage.getItem('clinic'));
    const { id_usuario,id_rol, permissions } = JSON.parse(localStorage.getItem('user'));

    /* Permisos del rol del usuario */
    const {
        EliminarCita,
        GenerarCobros,
        IniciarConsulta,
        ModificarConsulta,
        ModificarCita,
        VerFichaDatos,
        GenerarPagoAnt,
        ConfirmarCita,
        ConfirmarLlegada
    } = permissions;
    /* Permisos del rol del usuario fin */

    const type = document.getElementById('filterTypeAppoiment');
    const containerStatus = document.getElementById('containerStatus');
    const containerStatusTotal = document.getElementById('containerStatusTotal');
    const containerTitleTotal = document.getElementById('containerTitleTotal');
    const containerStatusFinished = document.getElementById('containerStatusFinished');
    const containerStatusPendings = document.getElementById('containerStatusPendings');
    const typeText = type.options[type.selectedIndex].text;
    let container = document.getElementById('container-infoAppoiment');
    
    containerStatus.className = 'd-none flex-row flex-nowrap'
    containerTitleTotal.innerText = typeText;
    containerStatusTotal.innerText = 0;
    containerStatusFinished.innerText = 0;
    containerStatusPendings.innerText = 0;

    const date = dateSelect.split('/')
    document.getElementById('CalendarTitleView').innerHTML = `Agenda - ${typeText}`

    parseInt(type.value) !== 7 ?
    fetch(`${envDiary.rutes.back}${envDiary.controllers.diary}GetDataAppointments?date=${date[2]}-${date[1]}-${date[0]}&idShope=${id}&category=${type.value}&rol=${id_rol}&user=${id_usuario}`)
    .then(response => response.json())
    .then(result => {
        const { conflicts } = result
        if (conflicts !== null) {
            Alert('error', conflicts[0].Description)
            return
        }        
        const { SuccessAppointments } = result;        
        const query = $('#searchDiary').val().toUpperCase();    
        const filter = buscar(SuccessAppointments[0].Detail, query.toUpperCase())
        const AppoimentPending = SuccessAppointments[0].Detail.findIndex(element => parseInt(element.id_estadocita) === 7)
        let namePatientPending = '';
        let finished = 0;
        let pendings = 0;
        if(AppoimentPending !== -1){
            const { nombre, apellido_paterno, apellido_materno} = SuccessAppointments[0].Detail[AppoimentPending]
            namePatientPending = `${nombre} ${apellido_paterno} ${apellido_materno}`
        }
        reasonDelete = SuccessAppointments[0].reason
        let html = '';
        filter.sort((a,b) => b.id_cita - a.id_cita).map(data => {
            const { id_estadocita, idConsulta } = data;
            const dateOld = moment(data.fecha_nacimiento).format('L');

            finished +=  id_estadocita === 1 ? 1 : 0;
            pendings +=  (id_estadocita === 7  || id_estadocita === 5 || id_estadocita === 8 || id_estadocita === 3 ) ? 1 : 0;

            html += `<section class="card" style="border-left: 7px solid var(${id_estadocita === 1 && '--ct-attended' || id_estadocita === 2 && '--ct-cancelled' || id_estadocita === 3 && '--ct-confirm' || id_estadocita === 4 && '--ct-notassist' || id_estadocita === 5 && '--ct-pending' || id_estadocita === 6 && '--ct-rescheduled' || id_estadocita === 7 && '--ct-atention' || id_estadocita === 8 && '--ct-assist'})">
                            <content class="d-flex flex-nowrap">
                                <section class="d-flex">
                                    <section class="d-flex flex-column align-items-center justify-content-center p-3">
                                        <img src="${data.sexo === 'H' ? 'Content/Images/avatars/Patient(H).png' : data.sexo === 'X' ? 'Content/Images/avatars/Patient(X).png' : 'Content/Images/avatars/Patient(M).png'}" alt="User-Profile" class="img-fluid avatar avatar-50 avatar-rounded">
                                        <p class="mb-0 caption-sub-title">Exp: ${data.id_paciente}</p>
                                    </section>
                                    <seciton>
                                        <section class="d-flex flex-row align-items-center p-3 pb-0" style="min-width: 28rem !important;">
                                            <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Nombre: </h6>
                                            <p class="mb-0 caption-sub-title">${data.nombre} ${data.apellido_paterno} ${data.apellido_materno}</p>
                                        </section>
                                        <section class="d-flex flex-row align-items-center p-3 pb-0 pt-0">
                                            <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Sexo: </h6>
                                            <p class="mb-0 caption-sub-title">${data.sexo === 'H' ? 'HOMBRE' : data.sexo === 'X' ? 'NO BINARIO' : 'MUJER'}</p>
                                        </section>
                                        <section class="d-flex flex-row align-items-center p-3 pb-0 pt-0">
                                            <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Fecha de nacimiento: </h6>
                                            <p class="mb-0 caption-sub-title">${dateOld}</p>
                                        </section>
                                        <section class="d-flex flex-row align-items-center p-3 pb-0 pt-0">
                                            <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Edad: </h6>
                                            <p class="mb-0 caption-sub-title">${moment().diff(moment(`${data.fecha_nacimiento}`),'years')} Años</p>
                                        </section>
                                        <section class="d-flex flex-row align-items-center p-3 pb-0 pt-0">
                                            <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Telefono: </h6>
                                            <p class="mb-0 caption-sub-title">${data.telefono ? data.telefono : 'Sin número'}</p>
                                        </section>
                                    </seciton>
                                </section>
                                <section class="d-flex me-5">
                                    <seciton class="p-3">
                                    <section class="d-flex flex-row align-items-center p-3 pb-0 pt-0 ">
                                                    <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Folio: </h6>
                                                    <p class="mb-0 caption-sub-title">${data.id_cita}</p>
                                                </section>
                                        <section class="d-flex flex-row align-items-center p-3 pb-0 pt-0">
                                            <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Producto: </h6>
                                            <p class="mb-0 caption-sub-title">${data.Categoria}</p>
                                        </section>
                                        <section class="d-flex flex-row align-items-center p-3 pb-0 pt-0">
                                            <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Dermatólogo: </h6>
                                            <p class="mb-0 caption-sub-title">${data.Derma} ${data.Derma_ApellidoP} ${data.Derma_ApellidoM}</p>
                                        </section>
                                        <section class="d-flex flex-row align-items-center p-3 pb-0 pt-0">
                                            <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Hora de la cita: </h6>
                                            <p class="mb-0 caption-sub-title">${data.hora.Hours <= 9 ? '0' + data.hora.Hours : data.hora.Hours}:${data.hora.Minutes < 10 ? '0' + data.hora.Minutes : data.hora.Minutes}</p>
                                        </section>
                                        <section class="d-flex flex-row align-items-center p-3 pb-0 pt-0">
                                            <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Pago: </h6>
                                            <span class="badge text-bg-secondary text-uppercase" style="background-color: var(${data.pagado && '--ct-attended' || '--ct-pending' })">${data.pagado ? 'Pagado' : 'Sin pago'}</span>
                                        </section>
                                        ${data.Pago_anticipado ? `<section class="d-flex flex-row align-items-center p-3 pb-0 pt-0">
                                            <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Apartir de: </h6>
                                            <span class="badge text-bg-secondary text-uppercase bg-warning">Pago anticipado</span>
                                        </section>` : ''}
                                    </seciton>
                                </section>
                                <section class="mt-2 mb-5" style="position: absolute; margin-left: 96%;">
                                    <!-- Pendientes a validar -->                                     
                                    ${ id_estadocita === 3 &&  ConfirmarLlegada &&
                                        `<section class="d-flex flex-row align-items-center p-1 pb-0 pt-0">
                                            <div class="tooltipm top">
                                            <span class="tiptext">Cliente llego.</span>
                                            <a class="" style="cursor: pointer" onClick="updateAppoiment(${data.id_cita},8)">
                                            <i class="icon">    
                                            <img width="28" src="/Content/Images/icons/Diary/LLEGO.svg"/>
                                            </i>
                                            </a>
                                            </div>
                                        </section>`
                                        || id_estadocita === 5 && ConfirmarCita &&
                                        `<section class="d-flex flex-row align-items-center p-1 pb-0 pt-0">
                                            <div class="tooltipm top">
                                            <span class="tiptext">Confirmar Cita.</span>
                                            <a class="" style="cursor: pointer" onClick="updateAppoiment(${data.id_cita},3)">
                                            <i class="icon">    
                                            <img width="28" src="/Content/Images/icons/Diary/confirmar.ico" />
                                            </i>
                                            </a>
                                            </div>
                                        </section>`
                                        ||
                                        ''
                                    }          
                                </section>
                                <section class="d-flex flex-column flex-nowrap align-items-center justify-content-center">
                                    <seciton class="d-flex flex-row flex-nowrap p-3 px-sm-0">                                                                        
                                        ${id_estadocita !== 2 && id_estadocita !== 4 && data.pagado === null && ModificarCita &&
                                            `<section class="d-flex flex-row align-items-center p-1 pb-0 pt-0">
                                                <div class="tooltipm top">
                                                    <span class="tiptext">Modificar cita.</span>
                                                    <a class="" style="cursor: pointer" onclick="openEditAppoiment(${data.id_cita},'diary')">
                                                        <i class="icon">
                                                            <svg width="30" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px">
                                                            <path fill="#E57373" d="M42.583,9.067l-3.651-3.65c-0.555-0.556-1.459-0.556-2.015,0l-1.718,1.72l5.664,5.664l1.72-1.718C43.139,10.526,43.139,9.625,42.583,9.067"/><path fill="#FF9800" d="M4.465 21.524H40.471999999999994V29.535H4.465z" transform="rotate(134.999 22.469 25.53)"/><path fill="#B0BEC5" d="M34.61 7.379H38.616V15.392H34.61z" transform="rotate(-45.02 36.61 11.385)"/>
                                                            <path fill="#FFC107" d="M6.905 35.43L5 43 12.571 41.094z"/><path fill="#37474F" d="M5.965 39.172L5 43 8.827 42.035z"/>
                                                            </svg>                           
                                                        </i>
                                                    </a>
                                                </div>
                                            </section>`
                                            || 
                                            ''
                                        }
                                        ${id_estadocita !== 2 && id_estadocita !== 4 && !data.pagado && GenerarCobros && !data.Pago_anticipado &&
                                            `<section class="d-flex flex-row align-items-center p-1 pb-0 pt-0">
                                                <div class="tooltipm top">
                                                <span class="tiptext">Realizar cobro.</span>
                                                <a class="" style="cursor: pointer" onclick="openModalMakePayment('${data.id_cita}','general')">
                                                    <i class="icon">
                                                        <svg width="30" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="48px" height="48px" viewBox="0 0 48 48"><g >
                                                            <path fill="#F2C7AA" d="M31.80859,29.41113c-0.19824-0.27197-0.50488-0.42383-0.85645-0.41016l-21,1
                                                                C9.41895,30.02637,9,30.46631,9,31c0,8.82227,7.17773,16,16,16c0.41699,0,0.79004-0.25879,0.93652-0.64893l6-16
                                                                C32.05469,30.03613,32.00586,29.68311,31.80859,29.41113z"/>
                                                                <path fill="#F2C7AA" d="M8,10V6c0-1.65685,1.34314-3,3-3H11c1.65685,0,3,1.34314,3,3v4"/>
                                                            <path fill="#F2C7AA" d="M16,10V5c0-1.65685,1.34314-3,3-3H19c1.65685,0,3,1.34314,3,3v5"/>
                                                            <path fill="#F2C7AA" d="M32,10V5c0-1.65685,1.34314-3,3-3H35c1.65685,0,3,1.34314,3,3v5"/>
                                                            <path fill="#F2C7AA" d="M24,10V3c0-1.65685,1.34314-3,3-3H27c1.65685,0,3,1.34314,3,3v7"/>
                                                            <path fill="#4DA34D" d="M46,34H2c-0.55225,0-1-0.44775-1-1V9c0-0.55225,0.44775-1,1-1h44c0.55225,0,1,0.44775,1,1v24
                                                                C47,33.55225,46.55225,34,46,34z"/>
                                                            <path fill="#9EDB9E" d="M38,11H10c0,3.31372-2.68628,6-6,6v8c3.31372,0,6,2.68628,6,6h28c0-3.31372,2.68628-6,6-6v-8
                                                            C40.68628,17,38,14.31372,38,11z"/>
                                                            <circle fill="#4DA34D" cx="24" cy="21" r="5"/>
                                                            <path opacity="0.1" d="M33,23.95068V30c-3.16504,0-6.32379,1.49603-8.44073,4h14.1488C38.89362,33.02704,39,32.02618,39,31V17.06183
                                                            C34.52344,16.51318,33,19.63281,33,23.95068z"/>
                                                            <path fill="#F2C7AA" d="M41,17.06181c-4.47653-0.5486-6,2.571-6,6.88888V30c-5.5,0-11,4.5-11,11l0.00001,4.98149
                                                                c0,0.55046,0.43692,1.01804,0.98738,1.01847C33.81543,47.00684,41,39.82647,41,31L41,17.06181z"/>
                                                            </g>
                                                        </svg>                          
                                                    </i>
                                                </a>
                                                </div>
                                            </section>`
                                            || 
                                            ''
                                        }
                                        ${id_estadocita !== 2 && id_estadocita !== 4 && GenerarPagoAnt &&
                                            `<section class="d-flex flex-row align-items-center p-1 pb-0 pt-0">
                                                <div class="tooltipm top">
                                                <span class="tiptext">Pago ancitipado.</span>
                                                <a class="" style="cursor: pointer" onclick="openModalEarlySession(${data.id_paciente},'${data.nombre} ${data.apellido_paterno} ${data.apellido_materno}','${data.sexo}','diary')">
                                                <i class="icon">
                                                    <svg width="45" id="Layer_1" style="enable-background:new 0 0 70 70;" version="1.1" viewBox="0 0 70 70" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><style type="text/css">
                                                        .st0{fill:#A5CEB9;}
                                                        .st1{opacity:0.3;}
                                                        .st2{fill:#FFFFFF;}
                                                        .st3{fill:#F2F6F7;}
                                                        .st4{opacity:0.2;}
                                                        .st5{fill:#B2DDC9;}
                                                        .st6{fill:#EAAAA8;}
                                                        .st7{fill:#D8E3EA;}
                                                        .st8{fill:#E29898;}
                                                        .st9{fill:#FCD786;}
                                                        .st10{fill:#FFE98A;}
                                                        .st11{fill:#99C6DD;}
                                                        .st12{fill:#B0D6EC;}
                                                        .st13{opacity:0.4;}
                                                        .st14{opacity:0.25;}
                                                        .st15{opacity:0.2;fill:#FFFFFF;}
                                                        .st16{opacity:4.000000e-02;}
                                                        </style><g><g><g><path class="st9" d="M54.2,38.1c0,10.6-8.6,19.2-19.2,19.2s-19.2-8.6-19.2-19.2c0-10,7.6-18.2,17.3-19.1v-1.9H31     c-0.8,0-1.5-0.7-1.5-1.5v-2.3c0-0.8,0.7-1.5,1.5-1.5H39c0.8,0,1.5,0.7,1.5,1.5v2.3c0,0.8-0.7,1.5-1.5,1.5h-2.1V19     c3.9,0.4,7.4,1.9,10.3,4.3l0.7-0.7c0.7-0.7,2-0.7,2.7,0c0.7,0.7,0.7,2,0,2.7l-0.7,0.7C52.6,29.2,54.2,33.5,54.2,38.1z"/></g><g><path class="st10" d="M35,57.3c10.6,0,19.2-8.6,19.2-19.2c0-4.6-1.6-8.9-4.4-12.2l0.7-0.7c0.7-0.7,0.7-1.9,0-2.7     c-0.7-0.7-1.9-0.7-2.7,0l-0.7,0.7c-2.9-2.3-6.4-3.9-10.3-4.3v-1.9H39c0.8,0,1.5-0.7,1.5-1.5v-2.3c0-0.8-0.7-1.5-1.5-1.5H31     c-0.8,0-1.5,0.7-1.5,1.5v2.3c0,0.8,0.7,1.5,1.5,1.5h2.1V19c-9.7,1-17.3,9.2-17.3,19.1C15.8,48.7,24.4,57.3,35,57.3z M35,22.7     c8.5,0,15.4,6.9,15.4,15.4S43.5,53.5,35,53.5s-15.4-6.9-15.4-15.4S26.5,22.7,35,22.7z"/><path class="st10" d="M32.9,43.1c-0.4-0.5-0.6-1.1-0.8-1.8l-3.3,0.4c0.3,1.7,0.8,3,1.8,3.9c0.9,0.9,2.1,1.5,3.6,1.6v2.3H36v-2.4     c1.7-0.2,3-0.9,3.9-1.9c0.9-1.1,1.4-2.4,1.4-3.9c0-1.4-0.4-2.5-1.1-3.4C39.4,37,38,36.3,36,35.8v-5c0.8,0.4,1.3,1,1.5,2l3.2-0.4     c-0.2-1.3-0.7-2.3-1.5-3.1c-0.8-0.8-1.9-1.2-3.2-1.4v-1.3h-1.9v1.3c-1.5,0.1-2.6,0.7-3.5,1.6c-0.9,0.9-1.3,2.1-1.3,3.5     c0,1.4,0.4,2.6,1.2,3.5c0.8,1,2,1.7,3.7,2.2v5.4C33.6,43.9,33.2,43.6,32.9,43.1z M36,39.3c0.8,0.2,1.3,0.5,1.7,1     c0.3,0.4,0.5,0.9,0.5,1.5c0,0.6-0.2,1.2-0.6,1.7c-0.4,0.5-0.9,0.8-1.6,0.9V39.3z M32.9,34.2c-0.3-0.4-0.4-0.8-0.4-1.3     c0-0.5,0.1-0.9,0.4-1.4c0.3-0.4,0.7-0.7,1.2-0.9v4.4C33.6,34.9,33.1,34.6,32.9,34.2z"/></g><g class="st4"><path class="st2" d="M35,11.7h-4c-0.8,0-1.5,0.7-1.5,1.5v2.3c0,0.8,0.7,1.5,1.5,1.5h2.1V19c-9.7,1-17.3,9.2-17.3,19.1     c0,10.6,8.6,19.2,19.2,19.2V11.7z"/></g><g class="st4"><path class="st2" d="M35,53.5c-8.5,0-15.4-6.9-15.4-15.4S26.5,22.7,35,22.7v-11h-4c-0.8,0-1.5,0.7-1.5,1.5v2.3     c0,0.8,0.7,1.5,1.5,1.5h2.1V19c-9.7,1-17.3,9.2-17.3,19.1c0,10.6,8.6,19.2,19.2,19.2V53.5z"/><path class="st2" d="M35,49.5V26.7h-0.9v1.3c-1.5,0.1-2.6,0.7-3.5,1.6c-0.9,0.9-1.3,2.1-1.3,3.5c0,1.4,0.4,2.6,1.2,3.5     c0.8,1,2,1.7,3.7,2.2v5.4c-0.5-0.2-0.9-0.6-1.3-1.1c-0.4-0.5-0.6-1.1-0.8-1.8l-3.3,0.4c0.3,1.7,0.8,3,1.8,3.9     c0.9,0.9,2.1,1.5,3.6,1.6v2.3H35z M32.9,34.2c-0.3-0.4-0.4-0.8-0.4-1.3c0-0.5,0.1-0.9,0.4-1.4c0.3-0.4,0.7-0.7,1.2-0.9v4.4     C33.6,34.9,33.1,34.6,32.9,34.2z"/></g></g></g></svg>
                                                        
                                                        </i>   
                                                    </a>
                                                </div>
                                            </section>`
                                            || 
                                            '' 
                                        }
                                        ${VerFichaDatos &&
                                            `<section class="d-flex flex-row align-items-center p-1 pb-0 pt-0">
                                                <div class="tooltipm top">
                                                <span class="tiptext">Ver paciente.</span>
                                                <a class="" style="cursor: pointer" onclick="openModalDetailPatient(${data.id_paciente},'diary')">
                                                <i class="icon">
                                                <svg width="30" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" xml:space="preserve"><style type="text/css">
                                                .st0{fill:#1B3954;}
                                                .st1{fill:#16ADE1;}
                                                </style><g><g><g><path class="st1" d="M418,336.1h-19.1c1.5-0.9,2.9-1.9,4.2-3c11.4-9.1,18.7-23.1,18.7-38.9c0-12.2-4.4-23.4-11.7-32.1     c-9.1-10.8-22.7-17.7-38-17.7c-27.5,0-49.7,22.3-49.7,49.7c0,17.6,9.1,33,22.9,41.9h-19.1c-22.7,0-41,18.4-41,41v82.3h33.1V408     c0-3.9,3.1-7,7-7s7,3.1,7,7v51.4H412V408c0-3.9,3.1-7,7-7s7,3.1,7,7v51.4H459v-82.3C459,354.4,440.7,336.1,418,336.1z"/></g><path class="st0" d="M315.1,322.9c-4.5-8.8-6.9-18.7-6.9-29c0-35.1,28.6-63.7,63.7-63.7c14.6,0,28.6,5,39.7,13.9l8.8-89.4    c0.7-6.9-4.8-12.9-11.7-12.9H348c-5.6,0-10.4,3.9-11.5,9.4l-7.1,35.1c-1.1,5.5-5.9,9.4-11.5,9.4H64.7c-7.1,0-12.5,6.2-11.7,13.2    l24.3,198.6c0.7,5.9,5.7,10.3,11.6,10.3h181.9v-41C270.9,350.2,289.9,328,315.1,322.9z M248.4,331.1h-32v32h-50.4v-32h-32v-50.3    h32v-32h50.4v32h32V331.1z"/><g><g><path class="st1" d="M322.7,148.5c2.4-12,13-20.7,25.2-20.7h34.3V52.6H91.7v76.6h69c3.9,0,7,3.1,7,7c0,3.9-3.1,7-7,7h-69v38.6      H316L322.7,148.5z M203.1,137.6c-0.1,0.4-0.2,0.9-0.4,1.3c-0.2,0.4-0.4,0.8-0.6,1.2c-0.3,0.4-0.5,0.7-0.9,1.1      c-0.3,0.3-0.7,0.6-1.1,0.9c-0.4,0.3-0.8,0.5-1.2,0.6c-0.4,0.2-0.9,0.3-1.3,0.4c-0.4,0.1-0.9,0.1-1.4,0.1c-1.8,0-3.6-0.8-4.9-2.1      c-1.3-1.3-2.1-3.1-2.1-4.9c0-1.8,0.8-3.6,2.1-5c0.3-0.3,0.7-0.6,1.1-0.9c0.4-0.3,0.8-0.5,1.2-0.6c0.4-0.2,0.9-0.3,1.3-0.4      c0.9-0.2,1.8-0.2,2.7,0c0.4,0.1,0.9,0.2,1.3,0.4c0.4,0.2,0.8,0.4,1.2,0.6c0.4,0.3,0.8,0.5,1.1,0.9c1.3,1.3,2,3.1,2,5      C203.2,136.6,203.2,137.1,203.1,137.6z"/></g></g></g></g></svg>
                                                </i>    
                                                </a>
                                                </div>
                                            </section>`
                                        }
                                        ${id_estadocita === 8 && parseInt(type.value) === 1 && IniciarConsulta &&
                                            `<section class="d-flex flex-row align-items-center p-1 pb-0 pt-0">
                                                <div class="tooltipm top">
                                                <span class="tiptext">Iniciar consulta.</span>
                                                <a class="" style="cursor: pointer" ${(AppoimentPending !== -1 && id_rol === 5) ? `onclick="consultationPending('${namePatientPending}')"` : `onClick="openModalAppoiment(${data.id_cita})"`}>
                                                <i class="icon">    
                                                <svg width="30" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g id="flat"><polygon points="216 48 192 48 192 24 160 24 160 48 136 48 136 80 160 80 160 104 192 104 192 80 216 80 216 48" style="fill:#02a437"/><path d="M112,120H96V64a8,8,0,0,1,8-8h16V72h-8Z" style="fill:#b9b9b9"/><path d="M256,120H240V72h-8V56h16a8,8,0,0,1,8,8Z" style="fill:#b9b9b9"/><path d="M232,112v32a56,56,0,0,1-56,56h0a56,56,0,0,1-56-56V120H88v24a88.024,88.024,0,0,0,72,86.545V264h32V230.545A88.024,88.024,0,0,0,264,144V112Z" style="fill:#0094f6"/><path d="M136,376a56,56,0,0,0,0,112h6a50,50,0,0,0,50-50V408H304V376Zm24,55a25,25,0,0,1-25,25h1a24,24,0,0,1,0-48h24Z" style="fill:#0a71cd"/><rect height="32" style="fill:#b9b9b9" width="40" x="272" y="376"/><rect height="144" style="fill:#0a71cd" width="32" x="160" y="264"/><rect height="32" style="fill:#0045c7" width="24" x="136" y="376"/><circle cx="368" cy="392" r="64" style="fill:#e4e4e2"/><path d="M395.112,407.733,368,424l-27.112-16.267A26.545,26.545,0,0,1,328,384.971h0A16.971,16.971,0,0,1,344.971,368h0a16.972,16.972,0,0,1,12,4.971L368,384l11.029-11.029a16.972,16.972,0,0,1,12-4.971h0A16.971,16.971,0,0,1,408,384.971h0A26.545,26.545,0,0,1,395.112,407.733Z" style="fill:#f55648"/><rect height="8" style="fill:#a8a8a8" width="16" x="96" y="112"/><rect height="8" style="fill:#a8a8a8" width="16" x="240" y="104"/></g></svg>
                                                </i>
                                                </a>
                                                </div>
                                            </section>`
                                            || 
                                            ''
                                        }
                                        ${id_estadocita !== 2 && id_estadocita !== 4 && id_estadocita === 1 && parseInt(type.value) === 1 && ModificarConsulta &&
                                            `<section class="d-flex flex-row align-items-center p-1 pb-0 pt-0">
                                                <div class="tooltipm top">
                                                <span class="tiptext">Editar consulta.</span>
                                                <a class="" style="cursor: pointer" onClick="openModalEditAppoiments(${idConsulta[0]})">
                                                <i class="icon">    
                                                <svg width="30" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g id="flat"><polygon points="216 48 192 48 192 24 160 24 160 48 136 48 136 80 160 80 160 104 192 104 192 80 216 80 216 48" style="fill:#02a437"/><path d="M112,120H96V64a8,8,0,0,1,8-8h16V72h-8Z" style="fill:#b9b9b9"/><path d="M256,120H240V72h-8V56h16a8,8,0,0,1,8,8Z" style="fill:#b9b9b9"/><path d="M232,112v32a56,56,0,0,1-56,56h0a56,56,0,0,1-56-56V120H88v24a88.024,88.024,0,0,0,72,86.545V264h32V230.545A88.024,88.024,0,0,0,264,144V112Z" style="fill:#0094f6"/><path d="M136,376a56,56,0,0,0,0,112h6a50,50,0,0,0,50-50V408H304V376Zm24,55a25,25,0,0,1-25,25h1a24,24,0,0,1,0-48h24Z" style="fill:#0a71cd"/><rect height="32" style="fill:#b9b9b9" width="40" x="272" y="376"/><rect height="144" style="fill:#0a71cd" width="32" x="160" y="264"/><rect height="32" style="fill:#0045c7" width="24" x="136" y="376"/><circle cx="368" cy="392" r="64" style="fill:#e4e4e2"/><path d="M395.112,407.733,368,424l-27.112-16.267A26.545,26.545,0,0,1,328,384.971h0A16.971,16.971,0,0,1,344.971,368h0a16.972,16.972,0,0,1,12,4.971L368,384l11.029-11.029a16.972,16.972,0,0,1,12-4.971h0A16.971,16.971,0,0,1,408,384.971h0A26.545,26.545,0,0,1,395.112,407.733Z" style="fill:#f55648"/><rect height="8" style="fill:#a8a8a8" width="16" x="96" y="112"/><rect height="8" style="fill:#a8a8a8" width="16" x="240" y="104"/></g></svg>
                                                </i>
                                                </a>
                                                </div>
                                            </section>`
                                            || 
                                            ''
                                        }
                                        ${id_estadocita !== 2 && id_estadocita !== 4 && id_estadocita !== 1 && EliminarCita &&
                                            `<section class="d-flex flex-row align-items-center p-1 pb-0 pt-0">
                                                <div class="tooltipm top">
                                                <span class="tiptext">Eliminar consulta.</span>
                                                <a class="" style="cursor: pointer" onclick="deleteAppoiment('${data.id_cita}','general')">
                                                <i class="icon">    
                                                <svg width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 64"><defs><style>.cls-1{fill:#ff2400;}.cls-2{fill:#ba1d08;}</style></defs><title>Trash Can</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M42.48,64h-29a6,6,0,0,1-6-5.5L4,16H52L48.46,58.5A6,6,0,0,1,42.48,64Z"/><path class="cls-2" d="M52,8H38V6a6,6,0,0,0-6-6H24a6,6,0,0,0-6,6V8H4a4,4,0,0,0-4,4v4H56V12A4,4,0,0,0,52,8ZM22,6a2,2,0,0,1,2-2h8a2,2,0,0,1,2,2V8H22Z"/><path class="cls-2" d="M28,58a2,2,0,0,1-2-2V24a2,2,0,0,1,4,0V56A2,2,0,0,1,28,58Z"/><path class="cls-2" d="M38,58h-.13A2,2,0,0,1,36,55.88l2-32a2,2,0,1,1,4,.25l-2,32A2,2,0,0,1,38,58Z"/><path class="cls-2" d="M18,58a2,2,0,0,1-2-1.87l-2-32a2,2,0,0,1,4-.25l2,32A2,2,0,0,1,18.13,58Z"/></g></g></svg>                          
                                                </i>
                                                </a>
                                                </div>
                                            </section>` 
                                            || 
                                            ''
                                        }
                                    </seciton>                                    
                                </section>
                            </content>

                            <content class="d-flex justify-content-center">
                                <a id="button-showDetail${data.id_cita}" class="text-primary button-hideDetail" style="cursor: pointer" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Abrir el detalle de la cita." onclick="showDetail(${data.id_cita})">
                                    <svg width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.4" d="M2 7.916V16.084C2 19.623 4.276 22 7.665 22H16.335C19.724 22 22 19.623 22 16.084V7.916C22 4.378 19.723 2 16.334 2H7.665C4.276 2 2 4.378 2 7.916Z" fill="currentColor"></path>
                                        <path d="M7.72033 12.8555L11.4683 16.6205C11.7503 16.9035 12.2493 16.9035 12.5323 16.6205L16.2803 12.8555C16.5723 12.5615 16.5713 12.0865 16.2773 11.7945C15.9833 11.5025 15.5093 11.5025 15.2163 11.7965L12.7493 14.2735V7.91846C12.7493 7.50346 12.4133 7.16846 11.9993 7.16846C11.5853 7.16846 11.2493 7.50346 11.2493 7.91846V14.2735L8.78333 11.7965C8.63633 11.6495 8.44433 11.5765 8.25133 11.5765C8.06033 11.5765 7.86833 11.6495 7.72233 11.7945C7.42933 12.0865 7.42833 12.5615 7.72033 12.8555Z" fill="currentColor"></path>
                                    </svg>
                                </a>
                            </content>
                            <content id="cardInfo-container${data.id_cita}" class="card m-3 shadow-lg hide-Container show-Container" style="border-left: 3px solid var(${id_estadocita === 1 && '--ct-attended' || id_estadocita === 2 && '--ct-cancelled' || id_estadocita === 3 && '--ct-confirm' || id_estadocita === 4 && '--ct-notassist' || id_estadocita === 5 && '--ct-pending' || id_estadocita === 6 && '--ct-rescheduled' || id_estadocita === 7 && '--ct-atention' || id_estadocita === 8 && '--ct-assist'})">
                                <div class="flex-wrap card-header d-flex justify-content-between align-items-center">
                                    <div class="header-title w-100">
                                        <h4 class="card-title text-center">Detalle de la cita</h4>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <content class="d-flex flex-wrap justify-content-around align-items-center">
                                        <section class="d-flex">
                                            <seciton>
                                                <section class="d-flex flex-row align-items-center p-3 pb-0 pt-0">
                                                    <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Agendo: </h6>
                                                    <p class="mb-0 caption-sub-title">${data.Recepcion} ${data.Rece_ApellidoP} ${data.Rece_ApellidoM}</p>
                                                </section>
                                                <section class="d-flex flex-row align-items-center p-3 pb-0 pt-0">
                                                    <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Estado de la cita: </h6>
                                                    <span class="badge text-bg-secondary ${id_estadocita === 1 && 'ct-attended' || id_estadocita === 2 && 'ct-cancelled' || id_estadocita === 3 && 'ct-confirm' || id_estadocita === 4 && 'ct-notassist' || id_estadocita === 5 && 'ct-pending' || id_estadocita === 6 && 'ct-rescheduled' || id_estadocita === 7 && 'ct-atention' || id_estadocita === 8 && 'ct-assist'}">${data.Estado_cita}</span>
                                                </section>
                                                <section class="d-flex flex-row align-items-center p-3 pb-0 pt-0">
                                                    <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Tipo: </h6>
                                                    <p class="mb-0 caption-sub-title">${data.Tipo}</p>
                                                </section>
                                                <section class="d-flex flex-row align-items-center p-3 pb-0 pt-0">
                                                    <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Frecuencia: </h6>
                                                    <p class="mb-0 caption-sub-title">${data.Frecuencia}</p>
                                                </section>
                                                <section class="d-flex flex-row align-items-center p-3 pb-0 pt-0">
                                                    <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Turno: </h6>
                                                    <p class="mb-0 caption-sub-title">${data.turno === 'M' ? 'Matutino' : 'Vespertino'}</p>
                                                </section>
                                                <section class="d-flex flex-row align-items-center p-3 pb-0 pt-0">
                                                    <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Observaciones: </h6>
                                                    <p class="mb-0 caption-sub-title">${data.observaciones === null ? 'Sin comentarios' : data.observaciones }</p>
                                                </section>
                                            </seciton>
                                        </section>
                                        <section class="d-flex">
                                            <seciton class="p-3 px-sm-0">
                                                <section class="d-flex flex-row align-items-center p-3 pb-0 pt-0">
                                                    <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Duración: </h6>
                                                    <p class="mb-0 caption-sub-title">${data.minutos} Minutos</p>
                                                </section>
                                                <section class="d-flex flex-row align-items-center p-3 pb-0 pt-0">
                                                    <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Promotora: </h6>
                                                    <p class="mb-0 caption-sub-title">${data.Promovendedora}</p>
                                                </section>
                                                <section class="d-flex flex-row align-items-center p-3 pb-0 pt-0">
                                                    <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Cosmetóloga: </h6>
                                                    <p class="mb-0 caption-sub-title">${data.Cosme}</p>
                                                </section>
                                                <section class="d-flex flex-row align-items-center p-3 pb-0 pt-0">
                                                    <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Hora de llegada: </h6>
                                                    <p class="mb-0 caption-sub-title">${data.hora_llegada === null ? 'Pendiente' : `${data.hora_llegada.Hours < 10 ? '0' + data.hora_llegada.Hours : data.hora_llegada.Hours}:${data.hora_llegada.Minutes < 10 ? '0' + data.hora_llegada.Minutes : data.hora_llegada.Minutes}`}</p>
                                                </section>
                                                <section class="d-flex flex-row align-items-center p-3 pb-0 pt-0">
                                                    <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Hora de atendido: </h6>
                                                    <p class="mb-0 caption-sub-title">${data.hora_atendido === null ? 'Pendiente' : `${data.hora_atendido.Hours < 10 ? '0' + data.hora_atendido.Hours : data.hora_atendido.Hours}:${data.hora_atendido.Minutes < 10 ? '0' + data.hora_atendido.Minutes : data.hora_atendido.Minutes}`}</p>
                                                </section>
                                                <section class="d-flex flex-row align-items-center p-3 pb-0 pt-0">
                                                    <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Hora de salida: </h6>
                                                    <p class="mb-0 caption-sub-title">${data.hora_salida === null ? 'Pendiente' : `${data.hora_salida.Hours < 10 ? '0' + data.hora_salida.Hours : data.hora_salida.Hours}:${data.hora_salida.Minutes < 10 ? '0' + data.hora_salida.Minutes : data.hora_salida.Minutes}`}</p>
                                                </section>
                                            </seciton>
                                        </section>
                                        <section class="d-flex align-items-end">
                                            <seciton class="p-3 px-sm-0">
                                                <section class="d-flex flex-row align-items-center p-3 pb-0 pt-0">
                                                    <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Precio: </h6>
                                                    <p class="mb-0 caption-sub-title">${data.precio.toLocaleString("en", {
                                                                                                                                style: "currency",
                                                                                                                                currency: "MXN"
                                                                                                                            })}</p>
                                                </section>
                                                <section class="d-flex flex-row align-items-center p-3 pb-0 pt-0">
                                                    <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Total: </h6>
                                                    <p class="mb-0 caption-sub-title">${data.Total.length === 0 ?  "Sin cobro" : data.Total[0].toLocaleString("en", {
                                                        style: "currency",
                                                        currency: "MXN"
                                                    }) }</p>
                                                </section>
                                                <section class="d-flex flex-row align-items-center p-3 pb-0 pt-0">
                                                    <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Forma de pago: </h6>
                                                    <p class="mb-0 caption-sub-title">${data.Forma_pago.length === 0 ? "Sin cobro" : data.Forma_pago.length > 1 ? 'Pago Mixto' : data.Forma_pago[0]}</p>
                                                </section>
                                            </seciton>
                                        </section>
                                    </content>
                                </div>
                            </content>
                        </section>`;

        })
        if(id_rol === 5){
            containerStatus.className = 'd-flex flex-row flex-nowrap'
            containerStatusTotal.innerText = (finished + pendings);
            containerStatusFinished.innerText = finished;
            containerStatusPendings.innerText = pendings;
        }
        container.innerHTML = html;
    })
    .catch(error => Alert('error', error.message))
    :
    fetch(`${envDiary.rutes.back}${envDiary.controllers.diary}GetDataRepresentative?date=${date[2]}-${date[1]}-${date[0]}&idShope=${id}&category=${type.value}&rol=${id_rol}&user=${id_usuario}`)
    .then(response => response.json())
    .then(result => {
        const { conflicts } = result
        if (conflicts !== null) {
            Alert('error', conflicts[0].Description)
            return
        }

        const { SuccessDataRepresentative } = result;
        let html = '';
        SuccessDataRepresentative[0].DetailRepresentative.map(data => {
            html += `<section class="card" style="border-left: 7px solid var(--bs-warning)">
                            <content class="d-flex flex-wrap">
                                <section class="d-flex">
                                    <section class="d-flex flex-column align-items-center justify-content-center p-3">
                                        <img src="Content/Images/avatars/Patient(H).png" alt="User-Profile" class="img-fluid avatar avatar-50 avatar-rounded">
                                        <p class="mb-0 caption-sub-title">Exp: ${data.id_repre}</p>
                                    </section>
                                    <seciton>
                                        <section class="d-flex flex-row align-items-center p-3 pb-0">
                                            <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Folio: </h6>
                                            <p class="mb-0 caption-sub-title">${data.id_repmedico}</p>
                                        </section>
                                        <section class="d-flex flex-row align-items-center p-3 pb-0 pt-0">
                                            <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Nombre: </h6>
                                            <p class="mb-0 caption-sub-title">${data.nombre}</p>
                                        </section>
                                        <section class="d-flex flex-row align-items-center p-3 pb-0 pt-0">
                                            <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Laboratorio: </h6>
                                            <p class="mb-0 caption-sub-title">${data.NombreLab}</p>
                                        </section>
                                        <section class="d-flex flex-row align-items-center p-3 pb-0 pt-0">
                                            <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Linea de producto: </h6>
                                            <p class="mb-0 caption-sub-title">${data.linea_producto}</p>
                                        </section>
                                    </seciton>
                                </section>
                                <section class="d-flex">
                                    <seciton class="p-3">
                                        <section class="d-flex flex-row align-items-center p-3 pb-0 pt-0">
                                            <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Producto: </h6>
                                            <p class="mb-0 caption-sub-title">${typeText}</p>
                                        </section>
                                        <section class="d-flex flex-row align-items-center p-3 pb-0 pt-0">
                                            <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Dermatólogo: </h6>
                                            <p class="mb-0 caption-sub-title">${data.Derma} ${data.apellido_paterno} ${data.apellido_materno}</p>
                                        </section>
                                        <section class="d-flex flex-row align-items-center p-3 pb-0 pt-0">
                                            <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Hora de la cita: </h6>
                                            <p class="mb-0 caption-sub-title">${data.hora.Hours <= 9 ? '0' + data.hora.Hours : data.hora.Hours}:${data.hora.Minutes < 10 ? '0' + data.hora.Minutes : data.hora.Minutes}</p>
                                        </section>
                                        <section class="d-flex flex-row align-items-center p-3 pb-0 pt-0">
                                            <h6 class="mb-0 caption-title text-primary fw-bold" style="margin-right: 4px;">Duración: </h6>
                                            <p class="mb-0 caption-sub-title">${data.minutos} Minutos</p>
                                        </section>
                                    </seciton>
                                </section>
                                <section class="d-flex flex-row flex-wrap">
                                    <seciton class="d-flex flex-row flex-wrap p-3 px-sm-0">
                                            <section class="d-flex flex-row align-items-center p-1 pb-0 pt-0">
                                                <a class="btn btn-soft-primary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Modificar cita.">
                                                   <i class="icon">
                                                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path>
                                                        <path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path>                                <path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path>
                                                    </svg>
                                                   </i>
                                                </a>
                                            </section>
                                            <section class="d-flex flex-row align-items-center p-1 pb-0 pt-0">
                                                <a class="btn btn-soft-danger" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Realizar cobro.">
                                                 <i class="icon">
                                                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.9964 8.37513H17.7618C15.7911 8.37859 14.1947 9.93514 14.1911 11.8566C14.1884 13.7823 15.7867 15.3458 17.7618 15.3484H22V15.6543C22 19.0136 19.9636 21 16.5173 21H7.48356C4.03644 21 2 19.0136 2 15.6543V8.33786C2 4.97862 4.03644 3 7.48356 3H16.5138C19.96 3 21.9964 4.97862 21.9964 8.33786V8.37513ZM6.73956 8.36733H12.3796H12.3831H12.3902C12.8124 8.36559 13.1538 8.03019 13.152 7.61765C13.1502 7.20598 12.8053 6.87318 12.3831 6.87491H6.73956C6.32 6.87664 5.97956 7.20858 5.97778 7.61852C5.976 8.03019 6.31733 8.36559 6.73956 8.36733Z" fill="currentColor"></path>
                                                        <path opacity="0.4" d="M16.0374 12.2966C16.2465 13.2478 17.0805 13.917 18.0326 13.8996H21.2825C21.6787 13.8996 22 13.5715 22 13.166V10.6344C21.9991 10.2297 21.6787 9.90077 21.2825 9.8999H17.9561C16.8731 9.90338 15.9983 10.8024 16 11.9102C16 12.0398 16.0128 12.1695 16.0374 12.2966Z" fill="currentColor"></path>
                                                        <circle cx="18" cy="11.8999" r="1" fill="currentColor"></circle>
                                                    </svg>
                                                 </i>
                                                </a>
                                            </section>
                                            <section class="d-flex flex-row align-items-center p-1 pb-0 pt-0">
                                                <a class="btn btn-soft-success" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Pago ancitipado.">
                                                <i class="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 640 512">
                                                        <path d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 352h8.2c32.3-39.1 81.1-64 135.8-64c5.4 0 10.7 .2 16 .7V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM320 352H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H360.2C335.1 449.6 320 410.5 320 368c0-5.4 .2-10.7 .7-16l-.7 0zm320 16a144 144 0 1 0 -288 0 144 144 0 1 0 288 0zM496 288c8.8 0 16 7.2 16 16v48h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H496c-8.8 0-16-7.2-16-16V304c0-8.8 7.2-16 16-16z" fill="currentColor" />
                                                    </svg>
                                                </i>
                                                </a>
                                            </section>
                                            <section class="d-flex flex-row align-items-center p-1 pb-0 pt-0">
                                                <a class="btn btn-soft-info" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Ver paciente.">
                                                    <i class="icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 448 512">
                                                            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1V362c27.6 7.1 48 32.2 48 62v40c0 8.8-7.2 16-16 16H336c-8.8 0-16-7.2-16-16s7.2-16 16-16V424c0-17.7-14.3-32-32-32s-32 14.3-32 32v24c8.8 0 16 7.2 16 16s-7.2 16-16 16H256c-8.8 0-16-7.2-16-16V424c0-29.8 20.4-54.9 48-62V304.9c-6-.6-12.1-.9-18.3-.9H178.3c-6.2 0-12.3 .3-18.3 .9v65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7V311.2zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" fill="currentColor" />
                                                        </svg>
                                                    </i>
                                                </a>
                                            </section>
                                            <section class="d-flex flex-row align-items-center p-1 pb-0 pt-0">
                                                <a class="btn btn-soft-warning" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Iniciar consulta.">
                                                <i class="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 384 512">
                                                        <path d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM72 272a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm104-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16zM72 368a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm88 0c0-8.8 7.2-16 16-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16z" fill="currentColor" />
                                                    </svg>
                                                </i>
                                                </a>
                                            </section>
                                            <section class="d-flex flex-row align-items-center p-1 pb-0 pt-0">
                                                <a class="btn btn-danger" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Eliminar consulta." onclick="deleteAppoiment('${data.id_repmedico}','medico')">
                                                <i class="icon">    
                                                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                
                                                        <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>                                
                                                        <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>                                
                                                    </svg>                            
                                                </i>
                                                </a>
                                            </section>
                                    </seciton>
                                </section>
                            </content>
                        </section>`;
        })
        container.innerHTML = html;
    })
    .catch(error => Alert('error', error.message))
}

const autoRender = () => {
    renderInfo();
    setTimeout(autoRender, 70000)
}

const searchCalendar = (date) => {
    dateSelect = moment(date).format('L');
    document.getElementById('CalendarDateView').innerHTML = moment(date).format('LL');
    renderInfo();
    if(!statusCycle){
        statusCycle = true;
        setTimeout(autoRender, 70000)
    }
}

searchCalendar(new Date())

const buscar = (array, query) => _.filter(array, (_order) => {
        const newstatus = `${_order.nombre.toUpperCase()} 
                            ${_order.apellido_paterno.toUpperCase()}
                            ${_order.apellido_materno.toUpperCase()}
                            ${_order.Derma.toUpperCase()}
                            ${_order.Derma_ApellidoM.toUpperCase()}
                            ${_order.Derma_ApellidoP.toUpperCase()}
                            ${_order.email}
                            ${_order.telefono}
                            ${_order.id_cita}`
        if(newstatus.indexOf(query) !== -1) return _order
});
