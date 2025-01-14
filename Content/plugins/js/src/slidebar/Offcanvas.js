/* Llamamos las variables de entorno */
const envOffCanvas = envirement();

// Variables globales
const containerConsultationRoom = document.getElementById('containerConsultationRoom');
const containerHealingRoom = document.getElementById('containerHealingRoom');
const containerTratamientRoom = document.getElementById('containerTratamientRoom');
const containerPatientWaiting = document.getElementById('containerPatientWaiting');
const containerTratamientWaiting = document.getElementById('containerTratamientWaiting');
const viewDetailRoom = document.getElementById('viewDetailRoom');
const viewDetailRoomtratamient = document.getElementById('viewDetailRoomtratamient');
const prev_btn_cons = document.getElementById('prev-btn-cons');
const next_btn_cons = document.getElementById('next-btn-cons');
const prev_btn_trat = document.getElementById('prev-btn-trat');
const next_btn_trat = document.getElementById('next-btn-trat');
const prev_btn = document.querySelectorAll('.prev-btn');
const next_btn = document.querySelectorAll('.next-btn');
const waitingListPatient = document.querySelectorAll('.waitingListPatient');
let patientContainer = document.getElementById('containerPatientWaiting')

let totalConsultation = document.getElementById('totalConsultation')
let totalHealing = document.getElementById('totalHealing')
let granTotalConsultation = document.getElementById('granTotalConsultation')
let totalTreatments = document.getElementById('totalTreatments')
let granTotalTreatments = document.getElementById('granTotalTreatments')

// Expresiones regulares
var regexNumberRoom = /(\d+)/g;

let infoWaitingList = {}

/* Abrimos el drawer donde se encuentra la lista de espera */
const openMenuWaitingList = isFirst => { 
    const { name, id } = JSON.parse(localStorage.getItem('clinic'));    
    containerConsultationRoom.innerHTML = '';
    containerHealingRoom.innerHTML = '';    
    containerTratamientRoom.innerHTML = '';
    containerTratamientWaiting.innerHTML = '';
    containerPatientWaiting.innerHTML = '';    

    let htmlConsultation = '';
    let htmlHealing = '';
    let htmlTratamient = '';
    
    let htmlConsultationL = '';
    let htmlTratamientL = '';
    
    fetch(`${envOffCanvas.rutes.back}${envOffCanvas.controllers.waitinglist}Rooms?Shope=${id}`)
    .then(response => response.json())
    .then(result => {
        const { rooms, waitinglist } = result
        // const { listWaiting } = infoWaitingList;
        infoWaitingList = {
            rooms: rooms[0],
            waitinglist: waitinglist[0]
        }
        const consulRoom = rooms[0].CONSULTA.reduce((accumulator,element) => accumulator += element.statusDerma ? 1 : 0,0);
        const healRoom = rooms[0].CURACION.length;
        const consul = waitinglist[0].listWaitingConsultation.length;
        const tratRooms = rooms[0].TRATAMIENTO.length;
        const trat = waitinglist[0].listWaitingTratamient.length;
        totalConsultation.innerText = consulRoom;
        totalHealing.innerText = healRoom;
        granTotalConsultation.innerText = consul;
        totalTreatments.innerText = tratRooms;
        granTotalTreatments.innerText = trat;
        
        //Agregamos el evento a los botones para poder avanzar y ver la lista de espera
        waitingListPatient.forEach((item, i) => {
            // Obtenemos el tamaño del contenedor
            let containerDimensions = patientContainer.getBoundingClientRect();
            let containerWidth = containerDimensions.width;
            next_btn[0].addEventListener('click', () => patientContainer.scroll({
                    left: patientContainer.scrollLeft + containerWidth,
                    top: 0,
                    behavior: "smooth"
                })
            )
            prev_btn[0].addEventListener('click', () => patientContainer.scroll({
                    left: patientContainer.scrollLeft - containerWidth,
                    top: 0,
                    behavior: "smooth"
                })
            )
        })

        rooms[0].CONSULTA.sort((a,b) => a.name.localeCompare(b.name)).map(room => {                        
            const { idPatient, Patient, category } = room
            const numberRoom = room.name.match(regexNumberRoom).join()
            htmlConsultation += room.statusDerma ? `<div id="medicalRoom-${room.idDerma}_${id}_${room.name.toUpperCase()}_${category}" class="medicalRoom border-start border-5 border-${idPatient === 0 ? 'danger' : 'success'}" ondragenter="return enter(event)" ondragover="return over(event)" ondragleave="return leave(event)" ondrop="return drop(event)">
                                            <section class="d-flex flex-row align-items-center">
                                                <section>
                                                    ${ idPatient !== 0 ? 
                                                        `<section class="dropdown options-menu">
                                                            <span class="h5" id="dropdownMenuButton11" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <g>
                                                            <g>
                                                            <circle cx="7" cy="12" r="1" fill="black"/>
                                                            <circle cx="12" cy="12" r="1" fill="black"/>
                                                            <circle cx="17" cy="12" r="1" fill="black"/>
                                                            </g>
                                                            </g>
                                                            </svg>
                                                            </span>
                                                            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton11" style="">
                                                            <a class="dropdown-item" onclick="openModalExitRoom(${room.idSite},false)">                                                                
                                                            <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                
                                                            <path d="M11.9488 14.54C8.49884 14.54 5.58789 15.1038 5.58789 17.2795C5.58789 19.4562 8.51765 20.0001 11.9488 20.0001C15.3988 20.0001 18.3098 19.4364 18.3098 17.2606C18.3098 15.084 15.38 14.54 11.9488 14.54Z" fill="currentColor"></path>                                
                                                            <path opacity="0.4" d="M11.949 12.467C14.2851 12.467 16.1583 10.5831 16.1583 8.23351C16.1583 5.88306 14.2851 4 11.949 4C9.61293 4 7.73975 5.88306 7.73975 8.23351C7.73975 10.5831 9.61293 12.467 11.949 12.467Z" fill="currentColor"></path>                                
                                                            <path opacity="0.4" d="M21.0881 9.21923C21.6925 6.84176 19.9205 4.70654 17.664 4.70654C17.4187 4.70654 17.1841 4.73356 16.9549 4.77949C16.9244 4.78669 16.8904 4.802 16.8725 4.82902C16.8519 4.86324 16.8671 4.90917 16.8895 4.93889C17.5673 5.89528 17.9568 7.0597 17.9568 8.30967C17.9568 9.50741 17.5996 10.6241 16.9728 11.5508C16.9083 11.6462 16.9656 11.775 17.0793 11.7948C17.2369 11.8227 17.3981 11.8371 17.5629 11.8416C19.2059 11.8849 20.6807 10.8213 21.0881 9.21923Z" fill="currentColor"></path>                               
                                                            <path d="M22.8094 14.817C22.5086 14.1722 21.7824 13.73 20.6783 13.513C20.1572 13.3851 18.747 13.205 17.4352 13.2293C17.4155 13.232 17.4048 13.2455 17.403 13.2545C17.4003 13.2671 17.4057 13.2887 17.4316 13.3022C18.0378 13.6039 20.3811 14.916 20.0865 17.6834C20.074 17.8032 20.1698 17.9068 20.2888 17.8888C20.8655 17.8059 22.3492 17.4853 22.8094 16.4866C23.0637 15.9589 23.0637 15.3456 22.8094 14.817Z" fill="currentColor"></path>                                
                                                            <path opacity="0.4" d="M7.04459 4.77973C6.81626 4.7329 6.58077 4.70679 6.33543 4.70679C4.07901 4.70679 2.30701 6.84201 2.9123 9.21947C3.31882 10.8216 4.79355 11.8851 6.43661 11.8419C6.60136 11.8374 6.76343 11.8221 6.92013 11.7951C7.03384 11.7753 7.09115 11.6465 7.02668 11.551C6.3999 10.6234 6.04263 9.50765 6.04263 8.30991C6.04263 7.05904 6.43303 5.89462 7.11085 4.93913C7.13234 4.90941 7.14845 4.86348 7.12696 4.82926C7.10906 4.80135 7.07593 4.78694 7.04459 4.77973Z" fill="currentColor"></path>                                
                                                            <path d="M3.32156 13.5127C2.21752 13.7297 1.49225 14.1719 1.19139 14.8167C0.936203 15.3453 0.936203 15.9586 1.19139 16.4872C1.65163 17.4851 3.13531 17.8066 3.71195 17.8885C3.83104 17.9065 3.92595 17.8038 3.91342 17.6832C3.61883 14.9167 5.9621 13.6046 6.56918 13.3029C6.59425 13.2885 6.59962 13.2677 6.59694 13.2542C6.59515 13.2452 6.5853 13.2317 6.5656 13.2299C5.25294 13.2047 3.84358 13.3848 3.32156 13.5127Z" fill="currentColor"></path>                                
                                                            </svg>                            
                                                            Regresar a la fila
                                                            </a>                                                         
                                                            </div>
                                                        </section>`
                                                        :
                                                        ''
                                                    }
                                                        <img src="/Content/Images/avatars/${room.usernameDerma.trim()}.png" alt="profile-img" class="avatar-30 img-fluid rounded-pill border" loading="lazy">
                                                        </section>
                                                        <section class="h-100">
                                                        <span class="badge text-bg-primary bg-primary rounded-pill">${numberRoom}</span>
                                                        <h2 class="mb-2">${room.Derma}</h2>
                                                    </section>
                                            </section>     
                                            ${idPatient !== 0 ? `<section id="patientView-${room.idDerma}_${id}_${room.name.toUpperCase()}_${category}" class="d-flex flex-column show-Container hide-Container patientView">
                                                <hr class="hr-horizontal">                                        
                                                <h2>Paciente:</h2>
                                                <h3>${Patient.toUpperCase()}</h3>
                                            </section>`:''}               
                                        </div>`
                    :
                    ''            
        })
        rooms[0].CURACION.sort((a,b) => a.name.localeCompare(b.name)).map(room => {   
            const { idPatient, Patient, category } = room
            const numberRoom = room.name.match(regexNumberRoom).join()
            htmlHealing += `<div id="medicalRoom-${room.idDerma}_${id}_${room.name.toUpperCase()}_${category.join().replaceAll(',','').toUpperCase()}" class="medicalRoom border-start border-5 border-${idPatient === 0 ? 'danger' : 'success'}" ondragenter="return enter(event)" ondragover="return over(event)" ondragleave="return leave(event)" ondrop="return drop(event)">
                                            <section class="d-flex flex-row align-items-center">
                                                <section>
                                                    ${ idPatient !== 0 ? 
                                                        `<section class="dropdown options-menu">
                                                            <span class="h5" id="dropdownMenuButton11" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <g>
                                                            <g>
                                                            <circle cx="7" cy="12" r="1" fill="black"/>
                                                            <circle cx="12" cy="12" r="1" fill="black"/>
                                                            <circle cx="17" cy="12" r="1" fill="black"/>
                                                            </g>
                                                            </g>
                                                            </svg>
                                                            </span>
                                                            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton11" style="">
                                                                    <a class="dropdown-item" onclick="openModalExitRoom(${room.idSite},false)">                                                                
                                                                        <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                
                                                                        <path d="M11.9488 14.54C8.49884 14.54 5.58789 15.1038 5.58789 17.2795C5.58789 19.4562 8.51765 20.0001 11.9488 20.0001C15.3988 20.0001 18.3098 19.4364 18.3098 17.2606C18.3098 15.084 15.38 14.54 11.9488 14.54Z" fill="currentColor"></path>                                
                                                                        <path opacity="0.4" d="M11.949 12.467C14.2851 12.467 16.1583 10.5831 16.1583 8.23351C16.1583 5.88306 14.2851 4 11.949 4C9.61293 4 7.73975 5.88306 7.73975 8.23351C7.73975 10.5831 9.61293 12.467 11.949 12.467Z" fill="currentColor"></path>                                
                                                                        <path opacity="0.4" d="M21.0881 9.21923C21.6925 6.84176 19.9205 4.70654 17.664 4.70654C17.4187 4.70654 17.1841 4.73356 16.9549 4.77949C16.9244 4.78669 16.8904 4.802 16.8725 4.82902C16.8519 4.86324 16.8671 4.90917 16.8895 4.93889C17.5673 5.89528 17.9568 7.0597 17.9568 8.30967C17.9568 9.50741 17.5996 10.6241 16.9728 11.5508C16.9083 11.6462 16.9656 11.775 17.0793 11.7948C17.2369 11.8227 17.3981 11.8371 17.5629 11.8416C19.2059 11.8849 20.6807 10.8213 21.0881 9.21923Z" fill="currentColor"></path>                               
                                                                        <path d="M22.8094 14.817C22.5086 14.1722 21.7824 13.73 20.6783 13.513C20.1572 13.3851 18.747 13.205 17.4352 13.2293C17.4155 13.232 17.4048 13.2455 17.403 13.2545C17.4003 13.2671 17.4057 13.2887 17.4316 13.3022C18.0378 13.6039 20.3811 14.916 20.0865 17.6834C20.074 17.8032 20.1698 17.9068 20.2888 17.8888C20.8655 17.8059 22.3492 17.4853 22.8094 16.4866C23.0637 15.9589 23.0637 15.3456 22.8094 14.817Z" fill="currentColor"></path>                                
                                                                        <path opacity="0.4" d="M7.04459 4.77973C6.81626 4.7329 6.58077 4.70679 6.33543 4.70679C4.07901 4.70679 2.30701 6.84201 2.9123 9.21947C3.31882 10.8216 4.79355 11.8851 6.43661 11.8419C6.60136 11.8374 6.76343 11.8221 6.92013 11.7951C7.03384 11.7753 7.09115 11.6465 7.02668 11.551C6.3999 10.6234 6.04263 9.50765 6.04263 8.30991C6.04263 7.05904 6.43303 5.89462 7.11085 4.93913C7.13234 4.90941 7.14845 4.86348 7.12696 4.82926C7.10906 4.80135 7.07593 4.78694 7.04459 4.77973Z" fill="currentColor"></path>                                
                                                                        <path d="M3.32156 13.5127C2.21752 13.7297 1.49225 14.1719 1.19139 14.8167C0.936203 15.3453 0.936203 15.9586 1.19139 16.4872C1.65163 17.4851 3.13531 17.8066 3.71195 17.8885C3.83104 17.9065 3.92595 17.8038 3.91342 17.6832C3.61883 14.9167 5.9621 13.6046 6.56918 13.3029C6.59425 13.2885 6.59962 13.2677 6.59694 13.2542C6.59515 13.2452 6.5853 13.2317 6.5656 13.2299C5.25294 13.2047 3.84358 13.3848 3.32156 13.5127Z" fill="currentColor"></path>                                
                                                                        </svg>                            
                                                                        Regresar a la fila
                                                                        </a>
                                                                        <a class="dropdown-item" onclick="openModalExitRoom(${room.idSite},true)">
                                                                        <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                
                                                                        <path opacity="0.4" d="M2 6.447C2 3.996 4.03024 2 6.52453 2H11.4856C13.9748 2 16 3.99 16 6.437V17.553C16 20.005 13.9698 22 11.4744 22H6.51537C4.02515 22 2 20.01 2 17.563V16.623V6.447Z" fill="currentColor"></path>                                
                                                                        <path d="M21.7787 11.4548L18.9329 8.5458C18.6388 8.2458 18.1655 8.2458 17.8723 8.5478C17.5802 8.8498 17.5811 9.3368 17.8743 9.6368L19.4335 11.2298H17.9386H9.54826C9.13434 11.2298 8.79834 11.5748 8.79834 11.9998C8.79834 12.4258 9.13434 12.7698 9.54826 12.7698H19.4335L17.8743 14.3628C17.5811 14.6628 17.5802 15.1498 17.8723 15.4518C18.0194 15.6028 18.2113 15.6788 18.4041 15.6788C18.595 15.6788 18.7868 15.6028 18.9329 15.4538L21.7787 12.5458C21.9199 12.4008 21.9998 12.2048 21.9998 11.9998C21.9998 11.7958 21.9199 11.5998 21.7787 11.4548Z" fill="currentColor"></path>                                
                                                                        </svg>                            
                                                                        Finalizar
                                                                    </a>                                                         
                                                            </div>
                                                        </section>`
                                                        :
                                                        ''
                                                    }
                                                    <img src="/Content/Images/avatars/${room.usernameDerma.trim()}.png" alt="profile-img" class="avatar-30 img-fluid rounded-pill border" loading="lazy">
                                                </section>
                                                <section class="h-100">
                                                    <span class="badge text-bg-primary bg-primary rounded-pill">${numberRoom}</span>
                                                    <h2 class="mb-2">${room.Derma}</h2>
                                                </section>
                                            </section>     
                                            ${idPatient !== 0 ? `<section id="patientView-${room.idDerma}_${id}_${room.name.toUpperCase()}_${category.join().replaceAll(',','').toUpperCase()}" class="d-flex flex-column show-Container hide-Container patientView">
                                                <hr class="hr-horizontal">                                        
                                                <h2>Paciente:</h2>
                                                <h3>${Patient.toUpperCase()}</h3>
                                            </section>`:''}               
                                        </div>`
            })
    
        rooms[0].TRATAMIENTO.sort((a,b) => a.name.localeCompare(b.name)).map(room => {   
            const { idPatient, Patient, category } = room
            // const numberRoom = room.name.match(regexNumberRoom).join()
            htmlTratamient += `<div id="medicalRoom-${room.idDerma}_${id}_${room.name.toUpperCase()}_${category.join().replaceAll(',','').toUpperCase()}" class="medicalRoom border-start border-5 border-${idPatient === 0 ? 'danger' : 'success'}" ondragenter="return enter(event)" ondragover="return over(event)" ondragleave="return leave(event)" ondrop="return drop(event)">
                                            <section class="d-flex flex-row align-items-center">
                                                <section>
                                                    ${ idPatient !== 0 ?
                                                        `<section class="dropdown options-menu">
                                                            <span class="h5" id="dropdownMenuButton11" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                    <g>
                                                                    <g>
                                                                    <circle cx="7" cy="12" r="1" fill="black"/>
                                                                    <circle cx="12" cy="12" r="1" fill="black"/>
                                                                    <circle cx="17" cy="12" r="1" fill="black"/>
                                                                    </g>
                                                                    </g>
                                                                </svg>
                                                            </span>
                                                            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton11" style="">
                                                                <a class="dropdown-item" onclick="openModalExitRoom(${room.idSite},false)">                                                                
                                                                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                
                                                                        <path d="M11.9488 14.54C8.49884 14.54 5.58789 15.1038 5.58789 17.2795C5.58789 19.4562 8.51765 20.0001 11.9488 20.0001C15.3988 20.0001 18.3098 19.4364 18.3098 17.2606C18.3098 15.084 15.38 14.54 11.9488 14.54Z" fill="currentColor"></path>                                
                                                                        <path opacity="0.4" d="M11.949 12.467C14.2851 12.467 16.1583 10.5831 16.1583 8.23351C16.1583 5.88306 14.2851 4 11.949 4C9.61293 4 7.73975 5.88306 7.73975 8.23351C7.73975 10.5831 9.61293 12.467 11.949 12.467Z" fill="currentColor"></path>                                
                                                                        <path opacity="0.4" d="M21.0881 9.21923C21.6925 6.84176 19.9205 4.70654 17.664 4.70654C17.4187 4.70654 17.1841 4.73356 16.9549 4.77949C16.9244 4.78669 16.8904 4.802 16.8725 4.82902C16.8519 4.86324 16.8671 4.90917 16.8895 4.93889C17.5673 5.89528 17.9568 7.0597 17.9568 8.30967C17.9568 9.50741 17.5996 10.6241 16.9728 11.5508C16.9083 11.6462 16.9656 11.775 17.0793 11.7948C17.2369 11.8227 17.3981 11.8371 17.5629 11.8416C19.2059 11.8849 20.6807 10.8213 21.0881 9.21923Z" fill="currentColor"></path>                               
                                                                        <path d="M22.8094 14.817C22.5086 14.1722 21.7824 13.73 20.6783 13.513C20.1572 13.3851 18.747 13.205 17.4352 13.2293C17.4155 13.232 17.4048 13.2455 17.403 13.2545C17.4003 13.2671 17.4057 13.2887 17.4316 13.3022C18.0378 13.6039 20.3811 14.916 20.0865 17.6834C20.074 17.8032 20.1698 17.9068 20.2888 17.8888C20.8655 17.8059 22.3492 17.4853 22.8094 16.4866C23.0637 15.9589 23.0637 15.3456 22.8094 14.817Z" fill="currentColor"></path>                                
                                                                        <path opacity="0.4" d="M7.04459 4.77973C6.81626 4.7329 6.58077 4.70679 6.33543 4.70679C4.07901 4.70679 2.30701 6.84201 2.9123 9.21947C3.31882 10.8216 4.79355 11.8851 6.43661 11.8419C6.60136 11.8374 6.76343 11.8221 6.92013 11.7951C7.03384 11.7753 7.09115 11.6465 7.02668 11.551C6.3999 10.6234 6.04263 9.50765 6.04263 8.30991C6.04263 7.05904 6.43303 5.89462 7.11085 4.93913C7.13234 4.90941 7.14845 4.86348 7.12696 4.82926C7.10906 4.80135 7.07593 4.78694 7.04459 4.77973Z" fill="currentColor"></path>                                
                                                                        <path d="M3.32156 13.5127C2.21752 13.7297 1.49225 14.1719 1.19139 14.8167C0.936203 15.3453 0.936203 15.9586 1.19139 16.4872C1.65163 17.4851 3.13531 17.8066 3.71195 17.8885C3.83104 17.9065 3.92595 17.8038 3.91342 17.6832C3.61883 14.9167 5.9621 13.6046 6.56918 13.3029C6.59425 13.2885 6.59962 13.2677 6.59694 13.2542C6.59515 13.2452 6.5853 13.2317 6.5656 13.2299C5.25294 13.2047 3.84358 13.3848 3.32156 13.5127Z" fill="currentColor"></path>                                
                                                                    </svg>                            
                                                                    Regresar a la fila
                                                                </a>
                                                                <a class="dropdown-item" onclick="openModalExitRoom(${room.idSite},true)">
                                                                <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                
                                                                    <path opacity="0.4" d="M2 6.447C2 3.996 4.03024 2 6.52453 2H11.4856C13.9748 2 16 3.99 16 6.437V17.553C16 20.005 13.9698 22 11.4744 22H6.51537C4.02515 22 2 20.01 2 17.563V16.623V6.447Z" fill="currentColor"></path>                                
                                                                    <path d="M21.7787 11.4548L18.9329 8.5458C18.6388 8.2458 18.1655 8.2458 17.8723 8.5478C17.5802 8.8498 17.5811 9.3368 17.8743 9.6368L19.4335 11.2298H17.9386H9.54826C9.13434 11.2298 8.79834 11.5748 8.79834 11.9998C8.79834 12.4258 9.13434 12.7698 9.54826 12.7698H19.4335L17.8743 14.3628C17.5811 14.6628 17.5802 15.1498 17.8723 15.4518C18.0194 15.6028 18.2113 15.6788 18.4041 15.6788C18.595 15.6788 18.7868 15.6028 18.9329 15.4538L21.7787 12.5458C21.9199 12.4008 21.9998 12.2048 21.9998 11.9998C21.9998 11.7958 21.9199 11.5998 21.7787 11.4548Z" fill="currentColor"></path>                                
                                                                </svg>                            
                                                                    Finalizar
                                                                </a>                                                         
                                                            </div>
                                                        </section>`
                                                        :
                                                        ''
                                                    }
                                                    <img src="/Content/Images/avatars/${room.usernameDerma.trim()}.png" alt="profile-img" class="avatar-30 img-fluid rounded-pill border" loading="lazy">
                                                </section>
                                                <section class="h-100">
                                                    <span class="badge text-bg-primary bg-primary rounded-pill">${room.name.includes('Camilla') ? room.name.match(regexNumberRoom).join() : room.name}</span>
                                                    <h2 class="mb-2">${room.Derma}</h2>
                                                </section>
                                            </section>     
                                            ${idPatient !== 0 ? `<section id="patientView-${room.idDerma}_${id}_${room.name.toUpperCase()}_${category.join().replaceAll(',','').toUpperCase()}" class="d-flex flex-column show-Container hide-Container patientView">
                                                <hr class="hr-horizontal">                                        
                                                <h2>Paciente:</h2>
                                                <h3>${Patient.toUpperCase()}</h3>
                                            </section>`:''}               
                                        </div>`
        })
        
        if(waitinglist[0].listWaitingConsultation.length < 5){
            prev_btn_cons.style.display = 'none';
            next_btn_cons.style.display = 'none';
        } 
    
        if(waitinglist[0].listWaitingTratamient.length < 5){
            prev_btn_trat.style.display = 'none';
            next_btn_trat.style.display = 'none';
        } 

        waitinglist[0].listWaitingConsultation.map((patient, index) => {   
            const { idAppoiment, name, idFrecuency,idCategory, idDerma, Derma, frecuency, category, hour, comments } = patient
            htmlConsultationL += `<div id="listWaitingConsultation-${idAppoiment}" class="patientWaiting hmr" style="border-left: 7px solid var(${idCategory === 1 ? '--ct-confirm' : '--ct-pending'})" draggable="true" ondragstart="start(event)" ondragend="end(event)">
                                            <section class="d-flex flex-row align-items-center">
                                                <section>
                                                    <img id="avatar-${idAppoiment}" src="/Content/Images/avatars/AWSADM3.png" alt="profile-img" class="avatar-30 img-fluid rounded-pill border" loading="lazy">
                                                </section>
                                                <section class="h-100">
                                                    <span class="badge text-bg-primary bg-primary rounded-pill">${index + 1}</span>
                                                    <span class="badge text-bg-primary bg-primary rounded-pill">${idAppoiment}</span>
                                                    <h2 class="mb-2">${name}</h2>
                                                </section>
                                            </section>
                                            <section class="d-flex flex-column">
                                                <hr class="hr-horizontal"> 
                                                <div>
                                                    <h2>◆ (${frecuency}) ${category} - ${hour}</h2>
                                                    <h2 class="mt-2">◆ ${Derma}</h2>
                                                    <h2 class="mt-2">◆ ${comments ? comments : 'SIN COMENTARIOS' }</h2>
                                                </div>                                       
                                            </section>
                                        </div>`
        })
    
        waitinglist[0].listWaitingTratamient.map((patient, index) => {   
            const { idAppoiment, name, idFrecuency,idCategory, idDerma, Derma, frecuency, category, hour, comments } = patient
            htmlTratamientL += `<div id="listWaitingTratamient-${idAppoiment}" class="patientWaiting hmr" style="border-left: 7px solid var(--ct-confirm)" draggable="true" ondragstart="start(event)" ondragend="end(event)">
                                            <section class="d-flex flex-row align-items-center">
                                                <section>
                                                    <img id="avatar-${idAppoiment}" src="/Content/Images/avatars/AWSADM3.png" alt="profile-img" class="avatar-30 img-fluid rounded-pill border" loading="lazy">
                                                </section>
                                                <section class="h-100">
                                                    <span class="badge text-bg-primary bg-primary rounded-pill">${index + 1}</span>
                                                    <span class="badge text-bg-primary bg-primary rounded-pill">${idAppoiment}</span>
                                                    <h2 class="mb-2">${name}</h2>
                                                </section>
                                            </section>
                                            <section class="d-flex flex-column">
                                                <hr class="hr-horizontal"> 
                                                <div>
                                                    <h2>◆ (PV) ${category} - ${hour}</h2>
                                                    <h2 class="mt-2">◆ ${Derma}</h2>
                                                    <h2 class="mt-2">◆ ${comments ? comments : 'SIN COMENTARIOS' }</h2>
                                                </div>                                       
                                            </section>
                                        </div>`
        })
    
        containerConsultationRoom.innerHTML = htmlConsultation;
        containerHealingRoom.innerHTML = htmlHealing;
        containerTratamientRoom.innerHTML = htmlTratamient;
        containerPatientWaiting.innerHTML = htmlConsultationL;
        containerTratamientWaiting.innerHTML = htmlTratamientL;    
    
        const offWaitingList = document.querySelector('#offWaitingList')
        const offWaitingListInstance = new bootstrap.Offcanvas(offWaitingList)
        if(isFirst) offWaitingListInstance.show()
    })
    .catch(error => Alert('error',error.message))
    
}

const closeMenuWaitingList = () => {
    const offWaitingList = document.querySelector('#offWaitingList')
    bootstrap.Offcanvas.getInstance(offWaitingList).hide()    
}

const detailRoom = (type) => {
    const isView = type === 'CONSULTA' ? viewDetailRoom.checked : viewDetailRoomtratamient.checked
    if(!isView){
        let roomsTaken = document.querySelectorAll('.patientView');
        if(roomsTaken.length === 0) {
            Alert('warning','No tienes habitaciones ocupadas')
            return;
        }
        roomsTaken.forEach(room => {
            const validation = (room.id.includes('CONSULTORIO') || room.id.includes('SALA DE CURACION'));
            if(type === 'CONSULTA' && validation){
                room.classList.remove("hide-Container");
                document.getElementById(`medicalRoom-${room.id.split('-')[1]}`).classList.add("hmr");
            }
            if(type === 'TRATAMIENTO' && !validation){
                room.classList.remove("hide-Container");
                document.getElementById(`medicalRoom-${room.id.split('-')[1]}`).classList.add("hmr");
            }
            
        })
    }else{
        let roomsTaken = document.querySelectorAll('.patientView');
        if(roomsTaken.length === 0) {
            Alert('warning','No tienes habitaciones ocupadas')
            return;
        }
        roomsTaken.forEach(room => {
            const validation = (room.id.includes('CONSULTORIO') || room.id.includes('SALA DE CURACION'));
            if(type === 'CONSULTA' && validation){
                room.classList.add("hide-Container");
                document.getElementById(`medicalRoom-${room.id.split('-')[1]}`).classList.remove("hmr");

            }
            if(type === 'TRATAMIENTO' && !validation){
                room.classList.add("hide-Container");
                document.getElementById(`medicalRoom-${room.id.split('-')[1]}`).classList.remove("hmr");
            }
        })
    }
}

const openModalExitRoom = (id, isFinished) => {
    if(isFinished)
        fetch(`${envOffCanvas.rutes.back}${envOffCanvas.controllers.waitinglist}PutFinishPatient`,{
            method: 'PUT',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                Appoiment:{
                    id_sitio: id
                }
            })
        })
        .then(response => response.json())
        .then(result => {
            const { Description } = result.Success[0];
            Alert('success', Description)
            openMenuWaitingList(false)        
        })
        .catch(error => Alert('error',error.message))
    
    if(!isFinished)
        fetch(`${envOffCanvas.rutes.back}${envOffCanvas.controllers.waitinglist}PutExitPatient`,{
            method: 'PUT',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                Appoiment:{
                    id_sitio: id
                }
            })
        })
        .then(response => response.json())
        .then(result => {
            const { Description } = result.Success[0];
            Alert('success', Description)
            openMenuWaitingList(false)
        })
        .catch(error => Alert('error',error.message))
}

function cambiarColor(e)
{
    console.log(e.type, e.id, e)
    return
    if(e.type=="mouseover"){
        document.querySelector(`#guillermo`).classList.remove("hide-Container");
        document.querySelector(`#medicalRoom-guillermo-1`).classList.add("hmr");
    }
    else{
        document.querySelector(`#guillermo`).classList.add("hide-Container");
        document.querySelector(`#medicalRoom-guillermo-1`).classList.remove("hmr");
    }
}

// let lnk = document.getElementById('medicalRoom-guillermo-1');
// lnk.addEventListener('mouseover', cambiarColor);
// lnk.addEventListener('mouseout', cambiarColor);

contador = 0; // Variable global para tener poder poner un id unico a cada elemento cuando se clona.
function start(e) {
    e.dataTransfer.effecAllowed = 'move'; // Define el efecto como mover (Es el por defecto)
    e.dataTransfer.setData("Data", e.target.id); // Coje el elemento que se va a mover
    e.dataTransfer.setDragImage(e.target, 0, 0); // Define la imagen que se vera al ser arrastrado el elemento y por donde se coje el elemento que se va a mover (el raton aparece en la esquina sup_izq con 0,0)
    e.target.style.opacity = '0.4'; 
}

function end(e){
    e.target.style.opacity = ''; // Pone la opacidad del elemento a 1 			
    e.dataTransfer.clearData("Data");
}

function enter(e) {
    e.target.style.border = '3px dotted #555'; 
}

function leave(e) {
    e.target.style.border = ''; 
}

function over(e) {
    var elemArrastrable = e.dataTransfer.getData("Data"); // Elemento arrastrado
    var id = e.target.id; // Elemento sobre el que se arrastra
    if(id.includes('medicalRoom')) return false        
}

/**
* 
* Mueve el elemento
*
**/
function drop(e){
    // let elementoArrastrado = e.dataTransfer.getData("Data"); // Elemento arrastrado
    const { waitinglist, rooms } = infoWaitingList
    let dataTransfer = e.dataTransfer.getData("Data"); // Elemento arrastrado
    let roomID = e.target.id; //Contenedor donde se solto
    let room = document.getElementById(e.target.id) // Habitacion consultada
    let tarjetPatient = document.getElementById(dataTransfer) // Tarjeta del paciente
    let dataTransferID = dataTransfer.split('-'); // ID de la consulta que se pasara a habitacion
    let roomIDS = roomID.split('-')[1].split('_'); //IDS del cuarto id Derma, id sucursal, nombre habitacion
    
    const currentCategory = roomIDS.at(-1);        
    tarjetPatient.style.opacity = '1'; //Eliminamos el estiolo opaco de la tarjeta
    room.style = ''; //Quitamos el borde en las tarjetas que reciben el paciente
    const infoPatient = waitinglist[dataTransferID[0]].find(element => element.idAppoiment === parseInt(dataTransferID[1])) //Informacion del paciente
    const { idCategory, category, name } = infoPatient;    
    const categoryValidate = roomIDS[2].includes('SALA DE CURACION') ? 'CURACION' : roomIDS[2].includes('CONSULTORIO') ? 'CONSULTA' : 'TRATAMIENTO'
    // const categoryValidate = category !== 'CONSULTA' ? roomID.includes('SALADECURACION') ? 'CURACION' : 'TRATAMIENTO' : category;
    // const infoRoom = rooms[categoryValidate].find(element => element.idDerma === parseInt(roomIDS[0])) //Informacion de la habitacion
    const infoRoom = rooms[categoryValidate].find(element => element.name.toUpperCase() === roomIDS[2].toUpperCase()) //Informacion de la habitacion
    
    if(!currentCategory.includes(category)
    || !infoRoom 
    || !infoRoom.permitted.includes(idCategory)
    ){
        Alert('warning','No pertenece la cita con la habitación');
        return
    } 

    const { statusPatient, permitted} = infoRoom;
    if(!dataTransfer.includes('listWaiting')) {
        Alert('warning','El componente seleccionado no puede ser asignado a consultorio');
        return
    }
    if(!roomID.includes('medicalRoom')) {
        Alert('warning','No puede asignar el paciente aqui');
        return
    }
    if(statusPatient){
        Alert('warning','La habitación ya cuenta con un paciente');
        return
    }
    if(!permitted.includes(idCategory)){
        Alert('warning','No pertenece la cita con la habitación');
        return
    }
    
    fetch(`${envOffCanvas.rutes.back}${envOffCanvas.controllers.waitinglist}PostNotificationsWatingList?idAppoiment=${dataTransferID[1]}&idSite=${infoRoom.idSite}`,{
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json', 
            'Accept':'application/json'
        },
        body: JSON.stringify(
            {
                Appoiment: {
                    id_cita: dataTransferID[1],
                    id_sitio: infoRoom.idSite
                }
            }
        )        
    })
    .then(response => response.json())
    .then(response => {
        const { Description } = response.Success[0]
        Alert('success',Description)
        openMenuWaitingList(false)
        // let div = document.createElement("div");
        // let hr = document.createElement("hr");
        // let title = document.createElement("h2");
        // let patient = document.createElement("h3");
        // div.className = 'd-flex flex-column show-Container hide-Container patientView';
        // div.id = `patientView-${roomID.split('-')[1]}`;
        // hr.className = 'hr-horizontal';
        // title.innerText = 'Paciente:';
        // patient.innerText = name.toUpperCase();
        // div.appendChild(hr);
        // div.appendChild(title);
        // div.appendChild(patient);
        // room.append(div);
        // room.classList.remove('border-danger');
        // room.classList.add('border-success');
        // var divContainer = document.getElementById(dataTransferID[0].includes('Consultation') ? 'containerPatientWaiting' : 'containerTratamientWaiting');
        // divContainer.removeChild(tarjetPatient);
    })
    .catch(error => Alert('error',error.message))

}
