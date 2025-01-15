/* Llamamos las variables de entorno */
const envAppoiment = envirement();

/* Variables globales*/
let $modalAppoimet = $('#modalAppoiment');

$tableModalVitalSign = $('#tableModalVitalSign');

let currentDateAppoiment = document.getElementById('currentDateAppoiment');
let updateActive = false;
let idAppoimentOpen = [];
let idEditAppoimentOpen = [];
let updateActiveAll = false;
let idAppoimentOpenAll = [];
let idUpdateActive = -1;
let infoTratamient = [];
let infoModalOpen = [];
let historyClinic = [];
let prescribedGeneral = [];
let prescribedAll = [];
/* Variables globales fin */

/* Variables de formulario */
let list_cie = document.getElementById('list-cie11');
let list_Topography = document.getElementById('list-Topography');
let list_medicine = document.getElementById('list-medicine');
let list_administration = document.getElementById('list-administration');

let start_dose = document.getElementById('start-dose')
let finish_dose = document.getElementById('finish-dose')
let prescribed_dose = document.getElementById('prescribed-dose')
let frequency_dose = document.getElementById('frequency-dose')
let comment_prescribed = document.getElementById('comment-prescribed')

let addAppoimentButton = document.getElementById('addAppoiment');
/* Variables de formulario fin */

/* DATOS PERSONALES */
let appoiment_exp = document.getElementById('appoiment-exp');
let appoiment_name = document.getElementById('appoiment-name');
let appoiment_year = document.getElementById('appoiment-year');
let appoiment_stateCivil = document.getElementById('appoiment-stateCivil');
let appoiment_ocupation = document.getElementById('appoiment-ocupation');
let appoiment_phone = document.getElementById('appoiment-phone');
let appoiment_city = document.getElementById('appoiment-city');
/* DATOS PERSONALES fin */

/* HEREDOFAMILIARES */
let elements_heredo = document.getElementById('elements-heredo');
/* HEREDOFAMILIARES FIN */

/* Variables consulta general */
let motive_consult = document.getElementById('motive-consult');
let inter_consult = document.getElementById('inter-consult');
let pronostic_consult = document.getElementById('pronostic-consult');
let proxAppoiment_consult = document.getElementById('proxAppoiment-consult');
/* Variables consulta general fin */

/* Variables receta */
let medicine = document.getElementById('medicine')
let reciped_tratamient = document.getElementById('reciped-tratamient')
let update_tratamient = document.getElementById('update-tratamient')
let cancelUpdate_tratamient = document.getElementById('cancelUpdate-tratamient')
let finished_tratamient = document.getElementById('finished-tratamient')
let cancel_tratamient = document.getElementById('cancel-tratamient')
/* Variables receta fin */

/**************************************************[ VALIDACION DEL MODAL ]*****************************************************************************/
const onKeyboardEscnAppoiment = () => event.keyCode === 27 && closeModalAppoiment();
const onKeyboardEscPersonHist = () => event.keyCode === 27 && closeModalHistory();
const onKeyboardEscVitalSign = () => event.keyCode === 27 && closeModalSignal();
const onKeyboardEscTratamient = () => event.keyCode === 27 && closeModalRecipe();

const onKeyboardEscnEditAppoiment  = () => event.keyCode === 27 && closeModalEditAppoiment();
// const onKeyboardEscEditPersonHist = () => event.keyCode === 27 && closeModalHistory();
// const onKeyboardEscEditVitalSign = () => event.keyCode === 27 && closeModalSignal();
const onKeyboardEscEditTratamient = () => event.keyCode === 27 && editcloseModalRecipe();
/**************************************************[ VALIDACION DEL MODAL FIN ]*****************************************************************************/

/* Abre el modal de la receta */
const openModalAppoiment = (id) => { 
    fetch(`${envAppoiment.rutes.back}${envAppoiment.controllers.historyappoiment}GetConsultationAndAppoiment?idAppoiment=${id}`)
    .then(response => response.json())
    .then(result => {
        const { CIE, DataPerson, Topography } = result.ConsultationAndAppoiment[0]
        idAppoimentOpen = id;
        infoModalOpen = result.ConsultationAndAppoiment[0];
        historyClinic = result.ConsultationAndAppoiment[0];
        appoiment_exp.innerHTML = DataPerson.id_paciente
        appoiment_name.innerHTML = DataPerson.Nombre
        appoiment_year.innerHTML = moment().diff(moment(`${DataPerson.Fecha}`), 'years') + 'Años' 
        appoiment_stateCivil.innerHTML = DataPerson.Estado_Civil
        appoiment_ocupation.innerHTML = DataPerson.ocupacion === null ? 'Sin información' : DataPerson.ocupacion
        appoiment_phone.innerHTML = DataPerson.telefono
        appoiment_city.innerHTML = `${DataPerson.Municipio},${DataPerson.Estado}`
        CIE.map(element => {
            let option = document.createElement('option')
            option.value = `${element.id_cie11} - ${element.codigo} - ${element.nombre}`
            option.label = `${element.codigo} - ${element.nombre}`
            list_cie.append(option)
        })
        Topography.map(element => {
            let option = document.createElement('option')
            option.value = `${element.id_zona} - ${element.nombre}`
            option.label = `${element.id_zona} - ${element.nombre}`
            list_Topography.append(option)
        })
            currentDateAppoiment.innerText = moment().format('LL');
            const date = moment().add(10, 'days').format('L').split('/')
            proxAppoiment_consult.value = `${date[2]}-${date[1]}-${date[0]}`
        $('#modalAppoiment').modal('show')
    })
    .catch(error => Alert('error',error.message))
}

const closeModalAppoiment = () => {
    /* Eliminamos todo los formularios adicionales agregados */
    document.getElementById('topography-container').innerHTML = '';
    document.getElementById('approbided-appoiment').innerHTML = '';
    document.getElementById('cie-container').innerHTML = '';
    document.getElementById('morf-comment-1').value = '';
    document.getElementById('diag-comments-1').value = '';
    document.getElementById('diag-section-1').value = '';

    let morfComponent = document.querySelectorAll('.morf-section')
    morfComponent.forEach((element, index) => index !== 0 && deleteComponent(element.id))

    let diagComponent = document.querySelectorAll('.diag-section')
    diagComponent.forEach((element, index) => index !== 0 && deleteComponent(element.id))
    fetch(`${envAppoiment.rutes.back}${envAppoiment.controllers.historyappoiment}PutConsultationPending?idAppoiment=${idAppoimentOpen}`,{
        method: 'PUT'
    })
    .then(response => response.json())
    .then(result => {
        const pathname = window.location.pathname
        if(pathname === '/diary') renderInfo();

        updateActive = false;
        idAppoimentOpen = [];
        idEditAppoimentOpen = [];
        updateActiveAll = false;
        idAppoimentOpenAll = [];
        idUpdateActive = -1;
        infoTratamient = [];
        infoModalOpen = [];
        historyClinic = [];
        prescribedGeneral = [];
        prescribedAll = [];
    
        motive_consult.value = '';
        inter_consult.value = '';
        pronostic_consult.value = '';
        proxAppoiment_consult.value = '';
    })    
    /* Eliminamos todo los formularios adicionales agregados fin */

    $('#modalAppoiment').modal('hide')
}

const closeModalAppoimentManul = () => {
    /* Eliminamos todo los formularios adicionales agregados */
    document.getElementById('topography-container').innerHTML = '';
    document.getElementById('approbided-appoiment').innerHTML = '';
    document.getElementById('cie-container').innerHTML = '';
    document.getElementById('morf-comment-1').value = '';
    document.getElementById('diag-comments-1').value = '';
    document.getElementById('diag-section-1').value = '';

    let morfComponent = document.querySelectorAll('.morf-section')
    morfComponent.forEach((element, index) => index !== 0 && deleteComponent(element.id))

    let diagComponent = document.querySelectorAll('.diag-section')
    diagComponent.forEach((element, index) => index !== 0 && deleteComponent(element.id))

    const pathname = window.location.pathname
    if(pathname === '/diary') renderInfo();
    
    updateActive = false;
    idAppoimentOpen = [];
    idEditAppoimentOpen = [];
    updateActiveAll = false;
    idAppoimentOpenAll = [];
    idUpdateActive = -1;
    infoTratamient = [];
    infoModalOpen = [];
    historyClinic = [];
    prescribedGeneral = [];
    prescribedAll = [];

    motive_consult.value = '';
    inter_consult.value = '';
    pronostic_consult.value = '';
    proxAppoiment_consult.value = '';
    /* Eliminamos todo los formularios adicionales agregados fin */

    $('#modalAppoiment').modal('hide')
}

const addAppoiment = () => {
    addAppoimentButton.disabled = true;
    let jsonAdd = {
        Consultations: [],
        Topographys: [],
        Morphologys: [],
        diagnosis: [],
        Cie11: [],
        Recipes: []
    };
    
    jsonAdd['Consultations'].push({
        id_cita: idAppoimentOpen,
        fecha: new Date().toLocaleString(),
        motivo: motive_consult.value,
        interrogatorio: inter_consult.value,
        pronostico: pronostic_consult.value,
        prox_consulta: proxAppoiment_consult.value
    })

    let topographyComponent = document.querySelectorAll('.topography-section');
    let morfComponent = document.querySelectorAll('.morf-section')
    let diagComponent = document.querySelectorAll('.diag-section')
    let cieComponent = document.querySelectorAll('.cie-section');

    topographyComponent.forEach(element => {
        let idTopology = parseInt(element.id.split('-')[2]);
        let idRealTopology = document.getElementById(`topography-id-${idTopology}`).innerHTML;
        let commentTopology = document.getElementById(`topography-comment-${idTopology}`).value;
        jsonAdd['Topographys'].push({
            id_zona: idRealTopology,
            comentario: commentTopology
        })
    })

    morfComponent.forEach(element => {
        let idMorf = parseInt(element.id.split('-')[2]);
        let commentMorf = document.getElementById(`morf-comment-${idMorf}`).value;
        jsonAdd['Morphologys'].push({
            comentario: commentMorf
        })
    })

    diagComponent.forEach(element => {
        let idDiag = parseInt(element.id.split('-')[2]);
        let commentDiag = document.getElementById(`diag-comments-${idDiag}`).value;
        jsonAdd['diagnosis'].push({
            comentario: commentDiag
        })
    })

    cieComponent.forEach(element => {
        let idCie = parseInt(element.id.split('-')[2]);
        let idRealCie = document.getElementById(`cie-idInternal-${idCie}`).innerHTML;
        let commentCie = document.getElementById(`cie-comment-${idCie}`).value;
        jsonAdd['Cie11'].push({
            id_cie11: idRealCie,
            comentario_cie11: commentCie
        })
    })

    prescribedAll.map(({ idMain, items },indexMain) => {
        items.map((item) => {
            jsonAdd['Recipes'].push({...item, Numero_receta: (indexMain+1)})
        })
        // jsonAdd['Recipes'].push(...items)
    })
    fetch(`${envAppoiment.rutes.back}${envAppoiment.controllers.historyappoiment}PostConsultation`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonAdd)
    })
    .then(response => response.json())
    .then(response => {
        const { Consultation } = response.CreateConsultation[0]
        Alert('success', Consultation)
        addAppoimentButton.disabled = false;
        closeModalAppoimentManul();
    })
    .catch(error => Alert('error', error.message))
    
}               

const printRecipe = (id) => {
    const { id_usuario } = JSON.parse(localStorage.getItem('user'))
    let Recipes = []
    prescribedAll.map(({ idMain, items }) => {
        if (idMain === id) {
            let arrayItems = [];
            items.map(it => {
                moment(it.fin_trt).diff(it.inicio_trt, 'days')
                let indexAdministration = infoTratamient.via_administration.findIndex(({ id_via }) => id_via === parseInt(it.id_via));
                arrayItems.push({ ...it, via: infoTratamient.via_administration[indexAdministration].nombre, indicaciones: it.indicaciones === '' ? 'Sin indicaciones' : it.indicaciones, dias: moment(it.fin_trt).diff(it.inicio_trt, 'days') })
            })
            Recipes.push(...arrayItems)
        }
    })
    fetch(`${envAppoiment.rutes.back}${envAppoiment.controllers.historyappoiment}pdf_json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            idDerma: id_usuario,
            idPaciente: infoModalOpen.DataPerson.id_paciente,
            proxAppoiment: proxAppoiment_consult.value,
            recipe: Recipes,
            idAppoiment: idAppoimentOpen
        })
    })
    .then(response => response.json())
    .then(result => {
        fetch(`${envAppoiment.rutes.back}${envAppoiment.controllers.historyappoiment}recipePDF?Datos=${result}`)
            .then(response2 => {
                window.open(response2.url,'_blank')

            })
    })
}

const deleteComponent = (id) => {
    let element = document.getElementById(id)
    element.parentNode.removeChild(element);
}
/* MORFOLOGIA */
const addMorf = () => {
    let morfComponent = document.querySelectorAll('.morf-section')
    let nextID = parseInt(morfComponent[morfComponent.length - 1].id.split('-')[2]) + 1

    let component = `<section class="w-100 morf-section" id="morf-section-${nextID}">
                            <section class="border border-2 p-2 d-flex flex-row flex-nowrap justify-content-end align-items-center ">
                                <h2 class="fs-5 text-uppercase text-center fw-bold me-0 w-100">Morfologia <span class="badge bg-primary">Adicional</span></h2>
                                <section class="d-flex flex-row flex-nowrap">
                                    <a onclick="addMorf()" style="cursor: pointer;">
                                        <img src="Content/Images/icons/sisde_circulos/add.svg" alt="Add" width="32" />
                                    </a>
                                    <a onclick="deleteComponent('morf-section-${nextID}')" class="ms-2" style="cursor: pointer;">
                                        <img src="Content/Images/icons/sisde_circulos/close.svg" alt="Close" width="32" />
                                    </a>
                                </section>
                            </section>
                            <section class="w-100">
                                <textarea class="w-100" rows="5" placeholder="Comentarios..."  id="morf-comment-${nextID}"></textarea>
                            </section>
                        </section>`
    $("#morf-container").append(component);
}
/* MORFOLOGIA FIN */

/* DIAGNOSTICO PRESUNTIVO Y ANALISIS */
const addDiag = () => {
    let diagComponent = document.querySelectorAll('.diag-section')
    let nextID = parseInt(diagComponent[diagComponent.length - 1].id.split('-')[2]) + 1
    let component = `<section class="w-100 diag-section" id="diag-section-${nextID}">
                            <section class="border border-2 p-2 d-flex flex-row flex-nowrap justify-content-end align-items-center ">
                                <h2 class="fs-5 text-uppercase text-center fw-bold me-0 w-100">Diagnostico presuntivo y analisis <span class="badge bg-primary">Adicional</span></h2>
                                <section class="d-flex flex-row flex-nowrap">
                                    <a onclick="addDiag()" style="cursor: pointer;">
                                        <img src="Content/Images/icons/sisde_circulos/add.svg" alt="Add" width="32" />
                                    </a>
                                    <a onclick="deleteComponent('diag-section-${nextID}')" class="ms-2" style="cursor: pointer;">
                                        <img src="Content/Images/icons/sisde_circulos/close.svg" alt="Close" width="32" />
                                    </a>
                                </section>
                            </section>
                            <section class="w-100">
                                <textarea class="w-100" rows="5" placeholder="Comentario..." id="diag-comments-${nextID}"></textarea>
                            </section>
                        </section>`
    $("#diag-container").append(component);
}
/* DIAGNOSTICO PRESUNTIVO Y ANALISIS FIN */

/* CIE-11 */
const addCie = () => {
    let cieSelect = document.getElementById('cie11');
    let cieComponent = document.querySelectorAll('.cie-section');
    let nextID = cieComponent.length === 0 ? cieComponent.length + 1 : parseInt(cieComponent[cieComponent.length - 1].id.split('-')[2]) + 1

    if (cieSelect.value === '' || !cieSelect.value.includes('-')) {
        Alert('warning', 'Fromato incorrecto o campo vacio');
        return
    }

    let cieParts = cieSelect.value.split('-')

    let component = `<section class="card cie-section" id="cie-section-${nextID}">
                                        <section class="card-body">
                                            <section class="d-flex flex-row justify-content-between">
                                                <section>
                                                    <span class="badge bg-secondary fs-6" id="cie-idInternal-${nextID}" hidden>${cieParts[0]}</span>
                                                    <span class="badge bg-secondary fs-6" id="cie-id-${nextID}">${cieParts[1]}</span>
                                                    <span class="badge bg-secondary fs-6" id="cie-description-${nextID}">${cieParts[2]}</span>
                                                </section>
                                                <section>
                                                    <a onclick="deleteComponent('cie-section-${nextID}')" style="cursor: pointer;">
                                                        <img src="Content/Images/icons/sisde_circulos/close.svg" alt="Close" width="32" />
                                                    </a>
                                                </section>
                                            </section>
                                            <textarea class="w-100" rows="3" placeholder="Comentario..." id="cie-comment-${nextID}"></textarea>
                                        </section>
                                    </section>`
    $("#cie-container").append(component);
    cieSelect.value = '';
}
/* CIE-11 FIN */

/* TOPOGRAFIA */
const addTopography = () => {    
    let topographySelect = document.getElementById('Topography');
    let topographyComponent = document.querySelectorAll('.topography-section');
    let nextID = topographyComponent.length === 0 ? topographyComponent.length + 1 : parseInt(topographyComponent[topographyComponent.length - 1].id.split('-')[2]) + 1

    if (topographySelect.value === '' || !topographySelect.value.includes('-')) {
        Alert('warning', 'Fromato incorrecto o campo vacio');
        return
    }

    let topographyParts = topographySelect.value.split('-')

    let component = `<section class="card topography-section" id="topography-section-${nextID}">
                                        <section class="card-body">
                                            <section class="d-flex flex-row justify-content-between">
                                                <section>
                                                    <label class="text-upercase" id="topography-id-${nextID}" hidden>${topographyParts[0].toUpperCase()}</label>
                                                    <label class="text-upercase" id="topography-name-${nextID}" >${topographyParts[1].toUpperCase()}</label>
                                                </section>
                                                <section class="mb-2">
                                                    <a onclick="deleteComponent('topography-section-${nextID}')" style="cursor: pointer;">
                                                        <img src="Content/Images/icons/sisde_circulos/close.svg" alt="Close" width="32" />
                                                    </a>
                                                </section>
                                            </section>
                                            <textarea class="w-100" rows="2" placeholder="Comentario..." id="topography-comment-${nextID}"></textarea>
                                        </section>
                                    </section>`
    $("#topography-container").append(component);
    topographySelect.value = '';
}
/* TOPOGRAFIA FIN */
/* Abre el modal de la receta fin */

/* Modal de los antecedentes personales */
const openModalHsitory = () => {
    const { Background, Nopathological, pathological } = historyClinic;
    Background.map(({ Enfermedad, Familiar }) => {
        let element = `<ul class="fs-5 mb-2">${Enfermedad} - ${Familiar}</ul>`
        $('#elements-heredo').append(element)
    })

    Nopathological.map(element => {
        let key = Object.keys(element)
        let h2 = `<ul class="fs-5 mb-2">${key[0]} - ${element[key]}</ul>`
        $('#elements-noPatology').append(h2)
    })

    let patKeys = Object.keys(pathological[0])
    let h2;
    patKeys.map(keyPaths => {
        pathological[0][keyPaths].map(element => {
            let SinKeys = Object.keys(element)

            h2 = `<h2 class="fs-6 mb-2 fw-bold text-uppercase">${keyPaths}</h2>`
            $('#elements-patology').append(h2)

            SinKeys.map(elem => {
                if (element[elem]) {
                    elem === 'Otros' ? h2 = `<ul class="fs-5 mb-2">${elem}: ${element[elem]} </ul>` : h2 = `<ul class="fs-5 mb-2">${elem.replace('_',' ')}</ul>`
                    $('#elements-patology').append(h2)
                }
            })
        })
    })
    $('#modalPersonalHistory').modal('show')
}

const closeModalHistory = () => {
    document.getElementById('elements-heredo').innerHTML = ''
    document.getElementById('elements-noPatology').innerHTML = ''
    document.getElementById('elements-patology').innerHTML = ''
    $('#modalPersonalHistory').modal('hide')
} 
/* Modal de los antecedentes personales fin */

/* Modal de los signos vitales */
const openModalSignal = () => {
    const { Sings } = historyClinic;
    let data = [];
    Sings.map(element => {
        const { Fecha,
            altura,
            cancelado,
            frecuencia_car,
            frecuencia_resp,
            hora,
            id_paciente,
            id_usuario,
            imc,
            peso,
            temperatura,
            tension_arterial } = element;
        data.push({
            ...element,
            hora: element.hora === null ? '' : `${element.hora.Hours}:${element.hora.Minutes}`,
            Fecha: moment(element.fecha).format('L'),
            temperatura: `${temperatura}°`,
            peso: `${peso}Kg`,
            altura: `${altura}m`
        })
    })
    $tableModalVitalSign.bootstrapTable({ data })
    $('#modalSignVitals').modal('show')
}

const closeModalSignal = () => {
    $tableModalVitalSign.bootstrapTable('destroy');
    $('#modalSignVitals').modal('hide')
}
/* Modal de los signos vitales fin */
/* Modal tratamiento */
const openModalTratamient = () => {
    fetch(`${envAppoiment.rutes.back}${envAppoiment.controllers.historyappoiment}GetProducts`)
    .then(response => response.json())
    .then(result => {
        const { Product, via_administration, Fuente } = result.Products[0];
        infoTratamient = result.Products[0];     
        document.getElementById('errorConnect').innerText = Fuente === 'Base Interna' ?  '.' : '';
        Product.map(element => {
            let option = document.createElement('option')
            option.value = `${element.Descripcion} ~ SKU: ${element.Sku.trim()}`
            option.label = `Ex: F: ${element.ExisistenciaFed} O: ${element.ExisistenciaOcci} M: ${element.ExisistenciaMan} - ${element.Descripcion} - ${element.Sku}`
            list_medicine.append(option)
        })
        via_administration.map(({ id_via, nombre }) => {
            let option = document.createElement('option')
            option.value = `${id_via}`
            option.label = `${nombre}`
            list_administration.append(option)
        })

        const date = moment().format('L').split('/')
        const date1 = moment().add(1, 'days').format('L').split('/')
        start_dose.min = `${date[2]}-${date[1]}-${date[0]}`
        finish_dose.min = `${date[2]}-${date[1]}-${date[0]}`
        // start_dose.value = `${date[2]}-${date[1]}-${date[0]}`
        // finish_dose.value = `${date1[2]}-${date1[1]}-${date1[0]}`
        start_dose.value = ``
        finish_dose.value = ``
        list_administration.value = 10;
        $('#modalTratamient').modal('show')
    })
    .catch(error => Alert('error', error.message))
}

const openModalTratamientEdit = (id) => {
    fetch(`${envAppoiment.rutes.back}${envAppoiment.controllers.historyappoiment}GetProducts`)
        .then(response => response.json())
        .then(result => {
            let indexItems = prescribedAll.findIndex(({ idMain }) => idMain === id);
            const { Product, via_administration } = result.Products[0]
            infoTratamient = result.Products[0];
            Product.map(element => {
                let option = document.createElement('option')
                option.value = `${element.Descripcion} ~ SKU: ${element.Sku.trim()}`
                option.label = `Ex: F: ${element.ExisistenciaFed} O: ${element.ExisistenciaOcci} M: ${element.ExisistenciaMan} - ${element.Descripcion} - ${element.Sku}`
                list_medicine.append(option)
            })
            via_administration.map(({ id_via, nombre }) => {
                let option = document.createElement('option')
                option.value = `${id_via}`
                option.label = `${nombre}`
                list_administration.append(option)
            })

            const date = moment().format('L').split('/')
            const date1 = moment().add(1, 'days').format('L').split('/')
            start_dose.min = `${date[2]}-${date[1]}-${date[0]}`
            finish_dose.min = `${date[2]}-${date[1]}-${date[0]}`
            // start_dose.value = `${date[2]}-${date[1]}-${date[0]}`
            // finish_dose.value = `${date1[2]}-${date1[1]}-${date1[0]}`
            start_dose.value = ``
            finish_dose.value = ``
            list_administration.value = 10

            prescribedGeneral = prescribedAll[indexItems].items;
            prescribedAll[indexItems].items.map(element => {
                let indexAdministration = infoTratamient.via_administration.findIndex(elementSearch => elementSearch.id_via === parseInt(element.id_via));
                let component = `<section class="card" id="prescribedAdd${element.id}">
                                <section class="card-body p-3">
                                    <section class="">
                                        <h6 class="fw-bold">Medicamento: <span class="fw-normal">${element.medicine}</span></h6>
                                        ${element.dosis !== '' ? `<h6 class="fw-bold">Dosis: <span class="fw-normal">${element.dosis}</span></h6>` : ''}
                                        ${element.frecuencia !== '' ? `<h6 class="fw-bold">Frecuencia: <span class="fw-normal">${element.frecuencia}</span></h6>` : ''}
                                        ${parseInt(element.id_via) !== 10 ? `<h6 class="fw-bold">Vía de administración: <span class="fw-normal">${infoTratamient.via_administration[indexAdministration].nombre}</span></h6>` : ''}
                                        ${(element.inicio_trt !== '' && element.fin_trt !== '') ? `<h6 class="fw-bold">Periodo: <span class="fw-normal">${moment(element.inicio_trt).format('L')} - ${moment(element.fin_trt).format('L')}</span ></h6 >` : ''}
                                        <h6 class="fw-bold">Indicaciones: <span class="fw-normal">${element.indicaciones === '' ? 'Sin indicaciones' : element.indicaciones}</span></h6>
                                        <hr />  
                                        <button class="btn btn-primary btn-sm" onclick="editRecipe('${element.id}')">Editar</button>
                                        <button class="btn btn-danger btn-sm" onclick="deleteRecipe('${element.id}')">Eliminar</button>
                                    </section>
                                </section>
                            </section>`
                $("#view-prescribed").append(component);
            })
            updateActiveAll = true;
            idAppoimentOpenAll = prescribedAll[indexItems];
            prescribedAll.splice(indexItems,1)
            deleteComponent(`appoiment-finish-${id}`)
            $('#modalTratamient').modal('show')
        })
        .catch(error => Alert('error', error.message))
}

const closeModalRecipe = () => {
    if (prescribedGeneral.length === 0 && updateActiveAll) {
        Alert('warning', 'Debes agregar medicamentos')
        return
    }
    if (updateActiveAll) {
        let idMain = idAppoimentOpenAll.idMain
        prescribedAll.push(idAppoimentOpenAll)
        let container = `<section class="p-2 border border-2 m-2" id="appoiment-finish-${idMain}">
                                            <section class="border border-2 p-2 d-flex flex-row flex-nowrap justify-content-end align-items-center">
                                            <h2 class="fs-5 text-uppercase text-center fw-bold me-0 w-100">Receta</h2>
                                            <a style="cursor: pointer;" onclick="printRecipe('${idMain}')">
                                                <img src="Content/Images/icons/sisde_circulos/print.svg" alt="Print" width="32" />
                                            </a>
                                        </section>
                                        <hr />`

        idAppoimentOpenAll.items.map(element => {
            let indexAdministration = infoTratamient.via_administration.findIndex(({ id_via }) => id_via === parseInt(element.id_via));
            container += `<section class="border border-2 p-2">
                            <h6 class="fw-bold">Medicamento: <span class="fw-normal">${element.medicine}</span></h6>
                            ${element.dosis !== '' ? `<h6 class="fw-bold">Dosis: <span class="fw-normal">${element.dosis}</span></h6>` : ''}
                            ${element.frecuencia !== '' ? `<h6 class="fw-bold">Frecuencia: <span class="fw-normal">${element.frecuencia}</span></h6>` : ''}
                            ${parseInt(element.id_via) !== 10 ? `<h6 class="fw-bold">Vía de administración: <span class="fw-normal">${infoTratamient.via_administration[indexAdministration].nombre}</span></h6>` : ''}
                            ${(element.inicio_trt !== '' && element.fin_trt !== '') ? `<h6 class="fw-bold">Periodo: <span class="fw-normal">${moment(element.inicio_trt).format('L')} - ${moment(element.fin_trt).format('L')}</span></h6>` : ''}
                            <h6 class="fw-bold">Indicaciones: <span class="fw-normal">${element.indicaciones === '' ? 'Sin indicaciones' : element.indicaciones}</span></h6>
                        </section>`
        })

        container += `<section class="d-flex flex-row justify-content-center">
                                            <button class="btn btn-primary btn-sm m-1" onclick="openModalTratamientEdit('${idMain}')">Editar</button>
                                            <button class="btn btn-danger btn-sm m-1" onclick="deleteRecipeFinish('${idMain}')">Eliminar</button>
                                        </section>
                                    </section>`
        $('#approbided-appoiment').append(container)
    }

    updateActiveAll = false
    idAppoimentOpenAll = []
    prescribedGeneral = []
    start_dose.value = ``
    finish_dose.value = ``
    medicine.value = ''
    prescribed_dose.value = ''
    frequency_dose.value = ''
    list_administration.value = 10
    comment_prescribed.value = ''
    var options = document.querySelectorAll('#list-medicine option');
    options.forEach((o, index) => o.remove());
    var options = document.querySelectorAll('#list-administration option');
    options.forEach((o, index) => index !== 0 && o.remove());
    document.getElementById('view-prescribed').innerHTML = '';
    $('#modalTratamient').modal('hide')
}

const addRecipe = () => {
    let errors = 0;
    medicine.className = 'form-control'
    start_dose.className = 'form-control'
    finish_dose.className = 'form-control'
    prescribed_dose.className = 'form-control'
    frequency_dose.className = 'form-control'
    list_administration.className = 'form-control'

    if (medicine.value === '') {
        medicine.className = 'form-control is-invalid'
        errors++;
    }    
    if (list_administration.value === '') {
        list_administration.className = 'form-control is-invalid'
        errors++;
    }
    if (errors > 0) return
    if (!medicine.value.includes('~ SKU:')) medicine.value += `~ SKU: Sin existencia en farmacia`;

    // const id = crypto.randomUUID().replaceAll('-','')
    let id = Math.random().toString(36).substring(2, 18);

    let medicament = medicine.value.split('~ SKU:');
    prescribedGeneral.push({
        id, 
        medicine: medicament[0],
        sku: medicament[1],
        inicio_trt: start_dose.value,
        fin_trt: finish_dose.value,
        dosis: prescribed_dose.value,
        frecuencia: frequency_dose.value,
        id_via: list_administration.value,
        indicaciones: comment_prescribed.value
    })
    let indexAdministration = infoTratamient.via_administration.findIndex(element => element.id_via === parseInt(list_administration.value));
    let component = `<section class="card" id="prescribedAdd${id}">
                                <section class="card-body p-3">
                                    <section class="">
                                        <h6 class="fw-bold">Medicamento: <span class="fw-normal">${medicament[0]}</span></h6>
                                        ${prescribed_dose.value !== '' ? `<h6 class="fw-bold">Dosis: <span class="fw-normal">${prescribed_dose.value}</span></h6>` : ''}
                                        ${frequency_dose.value !== '' ? `<h6 class="fw-bold">Frecuencia: <span class="fw-normal">${frequency_dose.value}</span></h6>`  : ''}
                                        ${parseInt(list_administration.value) !== 10 ? `<h6 class="fw-bold">Vía de administración: <span class="fw-normal">${infoTratamient.via_administration[indexAdministration].nombre}</span></h6>` : ''}
                                        ${(start_dose.value !== '' && finish_dose.value !== '') ? `<h6 class="fw-bold">Periodo: <span class="fw-normal">${moment(start_dose.value).format('L')} - ${moment(finish_dose.value).format('L')}</span ></h6 >` : ''}
                                        <h6 class="fw-bold">Indicaciones: <span class="fw-normal">${comment_prescribed.value === '' ? 'Sin indicaciones' : comment_prescribed.value }</span></h6>
                                        <hr />  
                                        <button class="btn btn-primary btn-sm" onclick="editRecipe('${id}')">Editar</button>
                                        <button class="btn btn-danger btn-sm" onclick="deleteRecipe('${id}')">Eliminar</button>
                                    </section>
                                </section>
                            </section>`
    $("#view-prescribed").append(component);
    const date = moment().format('L').split('/')
    const date1 = moment().add(1, 'days').format('L').split('/')
    // start_dose.value = `${date[2]}-${date[1]}-${date[0]}`
    // finish_dose.value = `${date1[2]}-${date1[1]}-${date1[0]}`
    start_dose.value = ``
    finish_dose.value = ``
    medicine.value = ''
    prescribed_dose.value = ''
    frequency_dose.value = ''
    list_administration.value = 10
    comment_prescribed.value = ''

}

const editRecipe = (id) => {
    if (updateActive) {
        Alert('warning', 'Debes Terminar/Cancelar la actualización')
        return;
    }
    updateActive = true;
    idUpdateActive = id;
    let index = prescribedGeneral.findIndex(element => element.id === id);
    
    idAppoimentOpenAll = prescribedGeneral[index];
    medicine.value = `${prescribedGeneral[index].medicine} ~ SKU: ${prescribedGeneral[index].sku}`
    start_dose.value = prescribedGeneral[index].inicio_trt
    finish_dose.value = prescribedGeneral[index].fin_trt
    prescribed_dose.value = prescribedGeneral[index].dosis
    frequency_dose.value = prescribedGeneral[index].frecuencia
    list_administration.value = prescribedGeneral[index].id_via
    comment_prescribed.value = prescribedGeneral[index].indicaciones

    reciped_tratamient.hidden = true;
    update_tratamient.hidden = false;
    cancelUpdate_tratamient.hidden = false;

    finished_tratamient.disabled = true
    cancel_tratamient.disabled = true

    prescribedGeneral.splice(index,1)
    deleteComponent(`prescribedAdd${id}`)
}

const cancelUpdate = () => {
    let indexAdministration = infoTratamient.via_administration.findIndex(element => element.id_via === parseInt(idAppoimentOpenAll.id_via));
    prescribedGeneral.push(idAppoimentOpenAll)
    let component = `<section class="card" id="prescribedAdd${idAppoimentOpenAll.id}">
                                <section class="card-body p-3">
                                    <section class="">
                                        <h6 class="fw-bold">Medicamento: <span class="fw-normal">${idAppoimentOpenAll.medicine}</span></h6>
                                        ${idAppoimentOpenAll.dosis !== '' ? `<h6 class="fw-bold">Dosis: <span class="fw-normal">${idAppoimentOpenAll.dosis}</span></h6>` : ''}
                                        ${idAppoimentOpenAll.frecuencia !== '' ? `<h6 class="fw-bold">Frecuencia: <span class="fw-normal">${idAppoimentOpenAll.frecuencia}</span></h6>` : ''}
                                        ${parseInt(idAppoimentOpenAll.id_via) !== 10 ? `<h6 class="fw-bold">Vía de administración: <span class="fw-normal">${infoTratamient.via_administration[indexAdministration].nombre}</span></h6>` : ''}
                                        ${(idAppoimentOpenAll.inicio_trt !== '' && idAppoimentOpenAll.fin_trt !== '') ? `<h6 class="fw-bold">Periodo: <span class="fw-normal">${moment(idAppoimentOpenAll.inicio_trt).format('L')} - ${moment(idAppoimentOpenAll.fin_trt).format('L')}</span ></h6 >` : ''}
                                        <h6 class="fw-bold">Indicaciones: <span class="fw-normal">${idAppoimentOpenAll.indicaciones === '' ? 'Sin indicaciones' : idAppoimentOpenAll.indicaciones}</span></h6>
                                        <hr />  
                                        <button class="btn btn-primary btn-sm" onclick="editRecipe('${idAppoimentOpenAll.id}')">Editar</button>
                                        <button class="btn btn-danger btn-sm" onclick="deleteRecipe('${idAppoimentOpenAll.id}')">Eliminar</button>
                                    </section>
                                </section>
                            </section>`
    $("#view-prescribed").append(component);
    const date = moment().format('L').split('/')
    const date1 = moment().add(1, 'days').format('L').split('/')
    // start_dose.value = `${date[2]}-${date[1]}-${date[0]}`
    // finish_dose.value = `${date1[2]}-${date1[1]}-${date1[0]}`
    start_dose.value = ``
    finish_dose.value = ``
    medicine.value = ''
    prescribed_dose.value = ''
    frequency_dose.value = ''
    list_administration.value = 10
    comment_prescribed.value = ''

    updateActive = false;
    idAppoimentOpenAll = [];
    reciped_tratamient.hidden = false;
    update_tratamient.hidden = true;
    cancelUpdate_tratamient.hidden = true;

    finished_tratamient.disabled = false;
    cancel_tratamient.disabled = false;
}

const updateRecipe = () => {
    let errors = 0;
    medicine.className = 'form-control'
    start_dose.className = 'form-control'
    finish_dose.className = 'form-control'
    prescribed_dose.className = 'form-control'
    frequency_dose.className = 'form-control'
    list_administration.className = 'form-control'

    if (medicine.value === '') {
        medicine.className = 'form-control is-invalid'
        errors++;
    }
    if (list_administration.value === '') {
        list_administration.className = 'form-control is-invalid'
        errors++;
    }
    if (errors > 0) return
    if (!medicine.value.includes('~ SKU:')) medicine.value += `~ SKU: Sin existencia en farmacia`;

    let id = idUpdateActive;
    let medicament = medicine.value.split('~ SKU:');
    prescribedGeneral.push({
        id,
        medicine: medicament[0],
        sku: medicament[1],
        inicio_trt: start_dose.value,
        fin_trt: finish_dose.value,
        dosis: prescribed_dose.value,
        frecuencia: frequency_dose.value,
        id_via: list_administration.value,
        indicaciones: comment_prescribed.value
    })
    let indexAdministration = infoTratamient.via_administration.findIndex(element => element.id_via === parseInt(list_administration.value));
    let component = `<section class="card" id="prescribedAdd${id}">
                                <section class="card-body p-3">
                                    <section class="">
                                        <h6 class="fw-bold">Medicamento: <span class="fw-normal">${medicament[0]}</span></h6>
                                        ${prescribed_dose.value !== '' ? `<h6 class="fw-bold">Dosis: <span class="fw-normal">${prescribed_dose.value}</span></h6>` : ''}
                                        ${frequency_dose.value !== '' ? `<h6 class="fw-bold">Frecuencia: <span class="fw-normal">${frequency_dose.value}</span></h6>` : ''}
                                        ${parseInt(list_administration.value) !== 10 ? `<h6 class="fw-bold">Vía de administración: <span class="fw-normal">${infoTratamient.via_administration[indexAdministration].nombre}</span></h6>` : ''}
                                        ${(start_dose.value !== '' && finish_dose.value !== '') ? `<h6 class="fw-bold">Periodo: <span class="fw-normal">${moment(start_dose.value).format('L')} - ${moment(finish_dose.value).format('L')}</span ></h6 >` : ''}
                                        <h6 class="fw-bold">Indicaciones: <span class="fw-normal">${comment_prescribed.value === '' ? 'Sin indicaciones' : comment_prescribed.value}</span></h6>
                                        <hr />  
                                        <button class="btn btn-primary btn-sm" onclick="editRecipe('${id}')">Editar</button>
                                        <button class="btn btn-danger btn-sm" onclick="deleteRecipe('${id}')">Eliminar</button>
                                    </section>
                                </section>
                            </section>`
    $("#view-prescribed").append(component);
    const date = moment().format('L').split('/')
    const date1 = moment().add(1, 'days').format('L').split('/')
    // start_dose.value = `${date[2]}-${date[1]}-${date[0]}`
    // finish_dose.value = `${date1[2]}-${date1[1]}-${date1[0]}`
    start_dose.value = ``
    finish_dose.value = ``
    medicine.value = ''
    prescribed_dose.value = ''
    frequency_dose.value = ''
    list_administration.value = 10
    comment_prescribed.value = ''

    updateActive = false;
    idUpdateActive = -1;
    reciped_tratamient.hidden = false;
    update_tratamient.hidden = true;
    cancelUpdate_tratamient.hidden = true;

    finished_tratamient.disabled = false;
    cancel_tratamient.disabled = false;
}

const deleteRecipe = (id) => {
    if (updateActive) {
        Alert('warning', 'Debes Terminar/Cancelar la actualización')
        return;
    }
    let index = prescribedGeneral.findIndex(element => element.id === id);
    prescribedGeneral.splice(index, 1);
    let element = document.getElementById(`prescribedAdd${id}`)
    element.parentNode.removeChild(element);
}

const deleteRecipeFinish = (id) => {
    let index = prescribedAll.findIndex(element => element.idMain === id);
    prescribedAll.splice(index, 1);
    let element = document.getElementById(`appoiment-finish-${id}`)
    element.parentNode.removeChild(element);
}

const finishRecipe = () => {
    if (prescribedGeneral.length === 0 && !updateActive) {
        Alert('warning', 'Debes agregar medicamentos')
        return
    }

    // let idMain = updateActiveAll ? idAppoimentOpenAll.idMain : prescribedAll.length;
    // const idMain = crypto.randomUUID().replaceAll('-','')
    let idMain = Math.random().toString(36).substring(2, 18);

    let copyItems = [];
    prescribedGeneral.map(element => {
        copyItems.push({ ...element, Numero_receta: idMain });
    })
    prescribedAll.push({ items: copyItems, idMain})
    document.getElementById('view-prescribed').innerHTML = '';

    let container = `<section class="p-2 border border-2 m-2" id="appoiment-finish-${idMain}">
                                        <section class="border border-2 p-2 d-flex flex-row flex-nowrap justify-content-end align-items-center">
                                            <h2 class="fs-5 text-uppercase text-center fw-bold me-0 w-100">Receta</h2>
                                            <a style="cursor: pointer;" onclick="printRecipe('${idMain}')">
                                                <img src="Content/Images/icons/sisde_circulos/print.svg" alt="Print" width="32" />
                                            </a>
                                        </section>
                                        <hr />`
                                        
    prescribedGeneral.map(element => {
        let indexAdministration = infoTratamient.via_administration.findIndex(({ id_via }) => id_via === parseInt(element.id_via));
        container += `<section class="border border-2 p-2">
                            <h6 class="fw-bold">Medicamento: <span class="fw-normal">${element.medicine}</span></h6>
                            ${element.dosis !== '' ? `<h6 class="fw-bold">Dosis: <span class="fw-normal">${element.dosis}</span></h6>` : ''}
                            ${element.frecuencia !== '' ? `<h6 class="fw-bold">Frecuencia: <span class="fw-normal">${element.frecuencia}</span></h6>` : ''}
                            ${parseInt(element.id_via) !== 10 ? `<h6 class="fw-bold">Vía de administración: <span class="fw-normal">${infoTratamient.via_administration[indexAdministration].nombre}</span></h6>` : ''}
                            ${(element.inicio_trt !== '' && element.fin_trt !== '') ? `<h6 class="fw-bold">Periodo: <span class="fw-normal">${moment(element.inicio_trt).format('L')} - ${moment(element.fin_trt).format('L')}</span></h6>` : ''}
                            <h6 class="fw-bold">Indicaciones: <span class="fw-normal">${element.indicaciones === '' ? 'Sin indicaciones' : element.indicaciones}</span></h6>
                        </section>`
    })

    container += `<section class="d-flex flex-row justify-content-center">
                                            <button class="btn btn-primary btn-sm m-1" onclick="openModalTratamientEdit('${idMain}')">Editar</button>
                                            <button class="btn btn-danger btn-sm m-1" onclick="deleteRecipeFinish('${idMain}')">Eliminar</button>
                                        </section>
                                    </section>`
    $('#approbided-appoiment').append(container)
    prescribedGeneral = []
    updateActiveAll = false
    idAppoimentOpenAll = []
    closeModalRecipe();
}
/* Modal tratamiento fin */



/* Editar consulta */

/* Variables de formulario */
let list_editcie = document.getElementById('list-editcie11');
let list_editTopography = document.getElementById('list-editTopography');
let list_editmedicine = document.getElementById('list-editmedicine');
let list_editadministration = document.getElementById('list-editadministration');

let editstart_dose = document.getElementById('editstart-dose')
let editfinish_dose = document.getElementById('editfinish-dose')
let editprescribed_dose = document.getElementById('editprescribed-dose')
let editfrequency_dose = document.getElementById('editfrequency-dose')
let editcomment_prescribed = document.getElementById('editcomment-prescribed')
/* Variables de formulario fin */


/* DATOS PERSONALES */
let currentDateEditAppoiment = document.getElementById('currentDateEditAppoiment');
let editappoiment_exp = document.getElementById('editappoiment-exp');
let editappoiment_name = document.getElementById('editappoiment-name');
let editappoiment_year = document.getElementById('editappoiment-year');
let editappoiment_stateCivil = document.getElementById('editappoiment-stateCivil');
let editappoiment_ocupation = document.getElementById('editappoiment-ocupation');
let editappoiment_phone = document.getElementById('editappoiment-phone');
let editappoiment_city = document.getElementById('editappoiment-city');
/* DATOS PERSONALES fin */

/* HEREDOFAMILIARES */
let editelements_heredo = document.getElementById('editelements-heredo');
/* HEREDOFAMILIARES FIN */

/* Variables consulta general */
let editmotive_consult = document.getElementById('editmotive-consult');
let editinter_consult = document.getElementById('editinter-consult');
let editpronostic_consult = document.getElementById('editpronostic-consult');
let editproxAppoiment_consult = document.getElementById('editproxAppoiment-consult');
/* Variables consulta general fin */

/* Variables receta */
let editmedicine = document.getElementById('editmedicine')
let editreciped_tratamient = document.getElementById('editreciped-tratamient')
let editupdate_tratamient = document.getElementById('editupdate-tratamient')
let editcancelUpdate_tratamient = document.getElementById('editcancelUpdate-tratamient')
let editfinished_tratamient = document.getElementById('editfinished-tratamient')
let editcancel_tratamient = document.getElementById('editcancel-tratamient')
/* Variables receta fin */

const openModalEditAppoiments = (id) => {
    fetch(`${envAppoiment.rutes.back}${envAppoiment.controllers.historyappoiment}GetConsultation?idConsultations=${id}`)
    .then(response => response.json())
    .then(result => {
        fetch(`${envAppoiment.rutes.back}${envAppoiment.controllers.historyappoiment}GetVia_administration`)
        .then(response => response.json())
        .then(info => {
            const { Via_Administration } = info.viaAdministrations[0];                
            infoTratamient = { via_administration: Via_Administration, Product: [] };
            const { CIE, Consultation, DataPerson, Topography } = result.Consultations[0];
            idEditAppoimentOpen = id;
            idAppoimentOpen = Consultation[0].id_cita;
            infoModalOpen = result.Consultations[0];
            historyClinic = result.Consultations[0];
            editappoiment_exp.innerHTML = DataPerson.id_paciente
            editappoiment_name.innerHTML = DataPerson.Nombre
            editappoiment_year.innerHTML = moment().diff(moment(`${DataPerson.Fecha}`), 'years') + 'Años'
            editappoiment_stateCivil.innerHTML = DataPerson.Estado_Civil ? DataPerson.Estado_Civil : 'Sin infromación';
            editappoiment_ocupation.innerHTML = !DataPerson.ocupacion ? 'Sin información' : DataPerson.ocupacion
            editappoiment_phone.innerHTML = DataPerson.telefono
            editappoiment_city.innerHTML = `${DataPerson.Municipio},${DataPerson.Estado}`

            editmotive_consult.value = Consultation[0].motivo
            editinter_consult.value = Consultation[0].interrogatorio
            editpronostic_consult.value = Consultation[0].pronostico
            editproxAppoiment_consult.value = Consultation[0].ProximaConsulta

            restoreTopography(Consultation[0].Topografia)
            restoreMorf(Consultation[0].Morfologia)
            restoreDiag(Consultation[0].Presntivo)
            restoreCie(Consultation[0].C11)
            restoreRecipe(Consultation[0].Receta)

            currentDateEditAppoiment.innerText = moment().format('LL');
            CIE.map(element => {
                let option = document.createElement('option')
                option.value = `${element.id_cie11} - ${element.codigo} - ${element.nombre}`
                option.label = `${element.codigo} - ${element.nombre}`
                list_editcie.append(option)
            })           
            Topography.map(element => {
                let option = document.createElement('option')
                option.value = `${element.id_zona} - ${element.nombre}`
                option.label = `${element.id_zona} - ${element.nombre}`
                list_editTopography.append(option)
            })
        
            $('#modalEditAppoiment').modal('show')
            })
        })
        .catch(error => Alert('error', error.message))
}

const closeModalEditAppoiment = () => {
    /* Eliminamos todo los formularios adicionales agregados */
    document.getElementById('edittopography-container').innerHTML = '';
    document.getElementById('editapprobided-appoiment').innerHTML = '';
    document.getElementById('editcie-container').innerHTML = '';
    document.getElementById('editmorf-comment-1').value = '';
    document.getElementById('editdiag-section-1').value = '';

    let morfComponent = document.querySelectorAll('.editmorf-section')
    morfComponent.forEach((element, index) => index !== 0 && deleteComponent(element.id))

    let diagComponent = document.querySelectorAll('.editdiag-section')
    diagComponent.forEach((element, index) => index !== 0 && deleteComponent(element.id))

    updateActive = false;
    idAppoimentOpen = [];
    idEditAppoimentOpen = [];
    updateActiveAll = false;
    idAppoimentOpenAll = [];
    idUpdateActive = -1;
    infoTratamient = [];
    infoModalOpen = [];
    historyClinic = [];
    prescribedGeneral = [];
    prescribedAll = [];

    editmotive_consult.value = '';
    editinter_consult.value = '';
    editpronostic_consult.value = '';
    editproxAppoiment_consult.value = '';
    /* Eliminamos todo los formularios adicionales agregados fin */
    viewnElectronicPrescription();
    $('#modalEditAppoiment').modal('hide')
}

const updateEditAppoiment = () => {
    const { id_usuario } = JSON.parse(localStorage.getItem('user'))
    let jsonAdd = {
        Consultations: [],
        Topographys: [],
        Morphologys: [],
        diagnosis: [],
        Cie11: [],
        Recipes: []
    };

    jsonAdd['Consultations'].push({
        id_usuario,
        id_consultaderma: idEditAppoimentOpen,
        id_cita: idAppoimentOpen,
        fecha: new Date().toLocaleString(),
        motivo: editmotive_consult.value,
        interrogatorio: editinter_consult.value,
        pronostico: editpronostic_consult.value,
        prox_consulta: editproxAppoiment_consult.value
    })

    let topographyComponent = document.querySelectorAll('.edittopography-section');
    let morfComponent = document.querySelectorAll('.editmorf-section')
    let diagComponent = document.querySelectorAll('.editdiag-section')
    let cieComponent = document.querySelectorAll('.editcie-section');


    topographyComponent.forEach(element => {
        let idTopology = parseInt(element.id.split('-')[2]);
        let idRealTopology = document.getElementById(`edittopography-id-${idTopology}`).innerHTML;
        let commentTopology = document.getElementById(`edittopography-comment-${idTopology}`).value;
        jsonAdd['Topographys'].push({
            id_zona: idRealTopology,
            comentario: commentTopology
        })
    })

    morfComponent.forEach(element => {
        let idMorf = parseInt(element.id.split('-')[2]);
        let commentMorf = document.getElementById(`editmorf-comment-${idMorf}`).value;
        jsonAdd['Morphologys'].push({
            comentario: commentMorf
        })
    })

    diagComponent.forEach(element => {
        let idDiag = parseInt(element.id.split('-')[2]);
        let commentDiag = document.getElementById(`editdiag-comments-${idDiag}`).value;
        jsonAdd['diagnosis'].push({
            comentario: commentDiag
        })
    })

    cieComponent.forEach(element => {
        let idCie = parseInt(element.id.split('-')[2]);
        let idRealCie = document.getElementById(`editcie-idInternal-${idCie}`).innerHTML;
        let commentCie = document.getElementById(`editcie-comment-${idCie}`).value;
        jsonAdd['Cie11'].push({
            id_cie11: idRealCie,
            comentario_cie11: commentCie
        })
    })

    prescribedAll.map(({ idMain, items }, indexMain) => {
        items.map((item) => {
            jsonAdd['Recipes'].push({...item, Numero_receta: (indexMain+1)})
        })
        // jsonAdd['Recipes'].push(...items)
    })
    const pathname = window.location.pathname

    fetch(`${envAppoiment.rutes.back}${envAppoiment.controllers.historyappoiment}PutConsultation`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonAdd)
    })
        .then(response => response.json())
        .then(response => {
            const { consultation } = response.Consultation[0]
            Alert('success', consultation)
            if(pathname === '/diary') renderInfo();
            closeModalEditAppoiment();
        })
        .catch(error => Alert('error', error.message))

}               

const printEditRecipe = (id) => {
    const { id_usuario } = JSON.parse(localStorage.getItem('user'))

    let Recipes = []
    prescribedAll.map(({ idMain, items }) => {
        if (idMain === id) {
            let arrayItems = [];
            items.map(it => {
                moment(it.fin_trt).diff(it.inicio_trt, 'days')
                let indexAdministration = infoTratamient.via_administration.findIndex(({ id_via }) => id_via === parseInt(it.id_via));
                arrayItems.push({ ...it, via: infoTratamient.via_administration[indexAdministration].nombre, indicaciones: it.indicaciones === '' || it.indicaciones === null ? 'Sin indicaciones' : it.indicaciones, dias: moment(it.fin_trt).diff(it.inicio_trt, 'days') })
            })
            Recipes.push(...arrayItems)
        }
    })
    fetch(`${envAppoiment.rutes.back}${envAppoiment.controllers.historyappoiment}pdf_json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            idDerma: id_usuario,
            idPaciente: infoModalOpen.DataPerson.id_paciente,
            proxAppoiment: editproxAppoiment_consult.value,
            recipe: Recipes,
            idAppoiment: idAppoimentOpen
        })
    })
    .then(response => response.json())
    .then(result => {
        fetch(`${envAppoiment.rutes.back}${envAppoiment.controllers.historyappoiment}recipePDF?Datos=${result}`)
            .then(response2 => {
                window.open(response2.url, '_blank')

            })
    })
}
/* CIE-11 */
const restoreCie = CIES => {
    CIES.map(element => {
        let cieComponent = document.querySelectorAll('.editcie-section');
        let nextID = cieComponent.length === 0 ? cieComponent.length + 1 : parseInt(cieComponent[cieComponent.length - 1].id.split('-')[2]) + 1

        let component = `<section class="card editcie-section" id="editcie-section-${nextID}">
                                            <section class="card-body">
                                                <section class="d-flex flex-row justify-content-between">
                                                    <section>
                                                        <span class="badge bg-secondary fs-6" id="editcie-idInternal-${nextID}" hidden>${element.id_diagnosticocie11}</span>
                                                        <span class="badge bg-secondary fs-6" id="editcie-id-${nextID}">${element.codigo}</span>
                                                        <span class="badge bg-secondary fs-6" id="editcie-description-${nextID}">${element.nombre}</span>
                                                    </section>
                                                    <section>
                                                        <a onclick="deleteComponent('editcie-section-${nextID}')" style="cursor: pointer;">
                                                            <img src="Content/Images/icons/sisde_circulos/close.svg" alt="Close" width="32" />
                                                        </a>
                                                    </section>
                                                </section>
                                                <textarea class="w-100" rows="3" placeholder="Comentario..." id="editcie-comment-${nextID}"></textarea>
                                            </section>
                                        </section>`
        $("#editcie-container").append(component);
        document.getElementById(`editcie-comment-${nextID}`).value = element.comentario_cie11
    })
}

const addEditCie = () => {
    let editcieSelect = document.getElementById('editcie11');
    let editcieComponent = document.querySelectorAll('.editcie-section');
    let nextID = editcieComponent.length === 0 ? editcieComponent.length + 1 : parseInt(editcieComponent[editcieComponent.length - 1].id.split('-')[2]) + 1

    if (editcieSelect.value === '' || !editcieSelect.value.includes('-')) {
        Alert('warning', 'Fromato incorrecto o campo vacio');
        return
    }

    let cieParts = editcieSelect.value.split('-')

    let component = `<section class="card editcie-section" id="editcie-section-${nextID}">
                                        <section class="card-body">
                                            <section class="d-flex flex-row justify-content-between">
                                                <section>
                                                    <span class="badge bg-secondary fs-6" id="editcie-idInternal-${nextID}" hidden>${cieParts[0]}</span>
                                                    <span class="badge bg-secondary fs-6" id="editcie-id-${nextID}">${cieParts[1]}</span>
                                                    <span class="badge bg-secondary fs-6" id="editcie-description-${nextID}">${cieParts[2]}</span>
                                                </section>
                                                <section>
                                                    <a onclick="deleteComponent('editcie-section-${nextID}')" style="cursor: pointer;">
                                                        <img src="Content/Images/icons/sisde_circulos/close.svg" alt="Close" width="32" />
                                                    </a>
                                                </section>
                                            </section>
                                            <textarea class="w-100" rows="3" placeholder="Comentario..." id="editcie-comment-${nextID}"></textarea>
                                        </section>
                                    </section>`
    $("#editcie-container").append(component);
    editcieSelect.value = '';
}
/* CIE-11 FIN */


/* DIAGNOSTICO PRESUNTIVO Y ANALISIS */
const restoreDiag = diagnosis => {
    diagnosis.map((element, index) => {
        if (index === 0) {
            document.getElementById(`editdiag-comments-1`).value = element.comentario
            return;
        }

        let editdiagComponent = document.querySelectorAll('.editdiag-section')
        let nextID = parseInt(editdiagComponent[editdiagComponent.length - 1].id.split('-')[2]) + 1
        let component = `<section class="w-100 editdiag-section" id="editdiag-section-${nextID}">
                                <section class="border border-2 p-2 d-flex flex-row flex-nowrap justify-content-end align-items-center ">
                                    <h2 class="fs-5 text-uppercase text-center fw-bold me-0 w-100">Diagnostico presuntivo y analisis <span class="badge bg-primary">Adicional</span></h2>
                                    <section class="d-flex flex-row flex-nowrap">
                                        <a onclick="addDiag()" style="cursor: pointer;">
                                            <img src="Content/Images/icons/sisde_circulos/add.svg" alt="Add" width="32" />
                                        </a>
                                        <a onclick="deleteComponent('editdiag-section-${nextID}')" class="ms-2" style="cursor: pointer;">
                                            <img src="Content/Images/icons/sisde_circulos/close.svg" alt="Close" width="32" />
                                        </a>
                                    </section>
                                </section>
                                <section class="w-100">
                                    <textarea class="w-100" rows="5" placeholder="Comentario..." id="editdiag-comments-${nextID}"></textarea>
                                </section>
                            </section>`
        $("#editdiag-container").append(component);
        document.getElementById(`editdiag-comments-${nextID}`).value = element.comentario;
    })
}

const addEditDiag = () => {
    let editdiagComponent = document.querySelectorAll('.editdiag-section')
    let nextID = parseInt(editdiagComponent[editdiagComponent.length - 1].id.split('-')[2]) + 1
    let component = `<section class="w-100 editdiag-section" id="editdiag-section-${nextID}">
                            <section class="border border-2 p-2 d-flex flex-row flex-nowrap justify-content-end align-items-center ">
                                <h2 class="fs-5 text-uppercase text-center fw-bold me-0 w-100">Diagnostico presuntivo y analisis <span class="badge bg-primary">Adicional</span></h2>
                                <section class="d-flex flex-row flex-nowrap">
                                    <a onclick="addDiag()" style="cursor: pointer;">
                                        <img src="Content/Images/icons/sisde_circulos/add.svg" alt="Add" width="32" />
                                    </a>
                                    <a onclick="deleteComponent('editdiag-section-${nextID}')" class="ms-2" style="cursor: pointer;">
                                        <img src="Content/Images/icons/sisde_circulos/close.svg" alt="Close" width="32" />
                                    </a>
                                </section>
                            </section>
                            <section class="w-100">
                                <textarea class="w-100" rows="5" placeholder="Comentario..." id="editdiag-comments-${nextID}"></textarea>
                            </section>
                        </section>`
    $("#editdiag-container").append(component);
}
/* DIAGNOSTICO PRESUNTIVO Y ANALISIS FIN */

/* MORFOLOGIA */
const restoreMorf = morphology => {
    morphology.map((element,index) => {
        if (index === 0) {
            document.getElementById(`editmorf-comment-1`).value = element.comentario
            return;
        }
        let editmorfComponent = document.querySelectorAll('.editmorf-section')
        let nextID = parseInt(editmorfComponent[editmorfComponent.length - 1].id.split('-')[2]) + 1


        let component = `<section class="w-100 editmorf-section" id="editmorf-section-${element.id_morfologia}">
                                <section class="border border-2 p-2 d-flex flex-row flex-nowrap justify-content-end align-items-center ">
                                    <h2 class="fs-5 text-uppercase text-center fw-bold me-0 w-100">Morfologia <span class="badge bg-primary">Adicional</span></h2>
                                    <section class="d-flex flex-row flex-nowrap">
                                        <a onclick="addEditMorf()" style="cursor: pointer;">
                                            <img src="Content/Images/icons/sisde_circulos/add.svg" alt="Add" width="32" />
                                        </a>
                                        <a onclick="deleteComponent('editmorf-section-${element.id_morfologia}')" class="ms-2" style="cursor: pointer;">
                                            <img src="Content/Images/icons/sisde_circulos/close.svg" alt="Close" width="32" />
                                        </a>
                                    </section>
                                </section>
                                <section class="w-100">
                                    <textarea class="w-100" rows="5" placeholder="Comentarios..."  id="editmorf-comment-${element.id_morfologia}"></textarea>
                                </section>
                            </section>`
        $("#editmorf-container").append(component);
        document.getElementById(`editmorf-comment-${element.id_morfologia}`).value = element.comentario
    })
}

const addEditMorf = () => {
    let editmorfComponent = document.querySelectorAll('.editmorf-section')
    let nextID = parseInt(editmorfComponent[editmorfComponent.length - 1].id.split('-')[2]) + 1

    let component = `<section class="w-100 editmorf-section" id="editmorf-section-${nextID}">
                            <section class="border border-2 p-2 d-flex flex-row flex-nowrap justify-content-end align-items-center ">
                                <h2 class="fs-5 text-uppercase text-center fw-bold me-0 w-100">Morfologia <span class="badge bg-primary">Adicional</span></h2>
                                <section class="d-flex flex-row flex-nowrap">
                                    <a onclick="addEditMorf()" style="cursor: pointer;">
                                        <img src="Content/Images/icons/sisde_circulos/add.svg" alt="Add" width="32" />
                                    </a>
                                    <a onclick="deleteComponent('editmorf-section-${nextID}')" class="ms-2" style="cursor: pointer;">
                                        <img src="Content/Images/icons/sisde_circulos/close.svg" alt="Close" width="32" />
                                    </a>
                                </section>
                            </section>
                            <section class="w-100">
                                <textarea class="w-100" rows="5" placeholder="Comentarios..."  id="editmorf-comment-${nextID}"></textarea>
                            </section>
                        </section>`
    $("#editmorf-container").append(component);
}
/* MORFOLOGIA FIN */

/* TOPOGRAFIA */
const restoreTopography = topography => {
    topography.map(element => {
        let topographyComponent = document.querySelectorAll('.edittopography-section');
        let nextID = topographyComponent.length === 0 ? topographyComponent.length + 1 : parseInt(topographyComponent[topographyComponent.length - 1].id.split('-')[2]) + 1        

        let component = `<section class="card edittopography-section" id="edittopography-section-${nextID}">
                                            <section class="card-body">
                                                <section class="d-flex flex-row justify-content-between">
                                                    <section>
                                                        <label class="text-upercase" id="edittopography-id-${nextID}" hidden>${element.id_zona}</label>
                                                        <label class="text-upercase" id="edittopography-name-${nextID}" >${element.Zona}</label>
                                                    </section>
                                                    <section>
                                                        <a onclick="deleteComponent('edittopography-section-${nextID}')" style="cursor: pointer;">
                                                            <img src="Content/Images/icons/sisde_circulos/close.svg" alt="Close" width="32" />
                                                        </a>
                                                    </section>
                                                </section>
                                                <textarea class="w-100" rows="2" placeholder="Comentario..." id="edittopography-comment-${nextID}"></textarea>
                                            </section>
                                        </section>`
        $("#edittopography-container").append(component);

        document.getElementById(`edittopography-comment-${nextID}`).value = element.comentario
    })
}

const addEditTopography = () => {
    let topographySelect = document.getElementById('editTopography');
    let topographyComponent = document.querySelectorAll('.edittopography-section');
    let nextID = topographyComponent.length === 0 ? topographyComponent.length + 1 : parseInt(topographyComponent[topographyComponent.length - 1].id.split('-')[2]) + 1

    if (topographySelect.value === '' || !topographySelect.value.includes('-')) {
        Alert('warning', 'Fromato incorrecto o campo vacio');
        return
    }

    let topographyParts = topographySelect.value.split('-')

    let component = `<section class="card edittopography-section" id="edittopography-section-${nextID}">
                                        <section class="card-body">
                                            <section class="d-flex flex-row justify-content-between">
                                                <section>
                                                    <label class="text-upercase" id="edittopography-id-${nextID}" hidden>${topographyParts[0].toUpperCase()}</label>
                                                    <label class="text-upercase" id="edittopography-name-${nextID}" >${topographyParts[1].toUpperCase()}</label>
                                                </section>
                                                <section>
                                                    <a onclick="deleteComponent('edittopography-section-${nextID}')" style="cursor: pointer;">
                                                        <img src="Content/Images/icons/sisde_circulos/close.svg" alt="Close" width="32" />
                                                    </a>
                                                </section>
                                            </section>
                                            <textarea class="w-100" rows="2" placeholder="Comentario..." id="edittopography-comment-${nextID}"></textarea>
                                        </section>
                                    </section>`
    $("#edittopography-container").append(component);
    topographySelect.value = '';
}
/* TOPOGRAFIA FIN */
/* Editar consulta fin*/


/* Modal editar tratamiento */
const restoreRecipe = recipes => {
    recipes.map(element => {
        // let idMain = crypto.randomUUID().replaceAll('-','');
        let idMain = Math.random().toString(36).substring(2, 18);
        let copyItems = [];
        let newItems = [];
        copyItems.push({ ...element });

        prescribedGeneral = element;        
       
        let container = `<section class="p-2 border border-2 m-2" id="appoiment-finish-${idMain}">
                                        <section class="border border-2 p-2 d-flex flex-row flex-nowrap justify-content-end align-items-center">
                                            <h2 class="fs-5 text-uppercase text-center fw-bold me-0 w-100">Receta</h2>
                                            <a style="cursor: pointer;" onclick="printEditRecipe('${idMain}')">
                                                <img src="Content/Images/icons/sisde_circulos/print.svg" alt="Print" width="32" />
                                            </a>
                                        </section>
                                        <hr />`
     
        prescribedGeneral.map(item => {            
            newItems.push({
                Numero_receta: item.Numero_receta,
                id: Math.random().toString(36).substring(2, 18),
                dosis: item.dosis === null ? '' : item.dosis,
                fin_trt: item.fin_trt === null ? '' : item.fin_trt,
                frecuencia: item.frecuencia === null ? '' : item.frecuencia,
                id_receta: item.id_receta,
                id_via: item.id_via,
                indicaciones: item.indicaciones === null ? '' : item.indicaciones,
                inicio_trt: item.inicio_trt === null ? '' : item.inicio_trt,
                medicine: item.medicine,
                sku: item.sku
            })
            let indexAdministration = infoTratamient.via_administration.findIndex(({ id_via }) => id_via === parseInt(item.id_via));
            container += `<section class="border border-2 p-2">
                            <h6 class="fw-bold">Medicamento: <span class="fw-normal">${item.medicine}</span></h6>
                            ${(item.dosis !== null || item.dosis === '') ? `<h6 class="fw-bold">Dosis: <span class="fw-normal">${item.dosis}</span></h6>` : ''}
                            ${(item.frecuencia !== null || item.frecuencia === '') ? `<h6 class="fw-bold">Frecuencia: <span class="fw-normal">${item.frecuencia}</span></h6>` : ''}
                            ${parseInt(item.id_via) !== 10 ? `<h6 class="fw-bold">Vía de administración: <span class="fw-normal">${infoTratamient.via_administration[indexAdministration].nombre}</span></h6>` : ''}
                            ${(item.inicio_trt !== '' && item.fin_trt !== '') ? `<h6 class="fw-bold">Periodo: <span class="fw-normal">${moment(item.inicio_trt).format('L')} - ${moment(item.fin_trt).format('L')}</span></h6>` : ''}
                            <h6 class="fw-bold">Indicaciones: <span class="fw-normal">${item.indicaciones === '' || item.indicaciones === null ? 'Sin indicaciones' : item.indicaciones}</span></h6>
                        </section>`;
        })

        container += `<section class="d-flex flex-row justify-content-center">
                                            <button class="btn btn-primary btn-sm m-1" onclick="editopenModalTratamientEdit('${idMain}')">Editar</button>
                                            <button class="btn btn-danger btn-sm m-1" onclick="editdeleteRecipeFinish('${idMain}')">Eliminar</button>
                                        </section>
                                    </section>`
        $('#editapprobided-appoiment').append(container)
        
        prescribedAll.push({ items: newItems, idMain })
        prescribedGeneral = []
        updateActiveAll = false
        idAppoimentOpenAll = []
    })
}

const editopenModalTratamient = () => {
    fetch(`${envAppoiment.rutes.back}${envAppoiment.controllers.historyappoiment}GetProducts`)
        .then(response => response.json())
        .then(result => {
            const { Product, via_administration } = result.Products[0]
            infoTratamient = result.Products[0];
            Product.map(element => {
                let option = document.createElement('option')
                option.value = `${element.Descripcion} ~ SKU: ${element.Sku.trim()}`
                option.label = `Ex: F: ${element.ExisistenciaFed} O: ${element.ExisistenciaOcci} M: ${element.ExisistenciaMan} - ${element.Descripcion} - ${element.Sku}`
                list_editmedicine.append(option)
            })
            via_administration.map(({ id_via, nombre }) => {
                let option = document.createElement('option')
                option.value = `${id_via}`
                option.label = `${nombre}`
                list_editadministration.append(option)
            })

            const date = moment().format('L').split('/')
            const date1 = moment().add(1, 'days').format('L').split('/')
            editstart_dose.min = `${date[2]}-${date[1]}-${date[0]}`
            editfinish_dose.min = `${date[2]}-${date[1]}-${date[0]}`
            // editstart_dose.value = `${date[2]}-${date[1]}-${date[0]}`
            // editfinish_dose.value = `${date1[2]}-${date1[1]}-${date1[0]}`
            editstart_dose.value = ``
            editfinish_dose.value = ``
            list_editadministration.value = 10
            $('#modalEditTratamient').modal('show')
        })
        .catch(error => Alert('error', error.message))
}

const editopenModalTratamientEdit = (id) => {
    fetch(`${envAppoiment.rutes.back}${envAppoiment.controllers.historyappoiment}GetProducts`)
        .then(response => response.json())
        .then(result => {
            let indexItems = prescribedAll.findIndex(({ idMain }) => idMain === id);
            const { Product, via_administration } = result.Products[0]
            infoTratamient = result.Products[0];
            Product.map(element => {
                let option = document.createElement('option')
                option.value = `${element.Descripcion} ~ SKU: ${element.Sku.trim()}`
                option.label = `Ex: F: ${element.ExisistenciaFed} O: ${element.ExisistenciaOcci} M: ${element.ExisistenciaMan} - ${element.Descripcion} - ${element.Sku}`
                list_editmedicine.append(option)
            })
            via_administration.map(({ id_via, nombre }) => {
                let option = document.createElement('option')
                option.value = `${id_via}`
                option.label = `${nombre}`
                list_editadministration.append(option)
            })

            const date = moment().format('L').split('/')
            const date1 = moment().add(1, 'days').format('L').split('/')
            editstart_dose.min = `${date[2]}-${date[1]}-${date[0]}`
            editfinish_dose.min = `${date[2]}-${date[1]}-${date[0]}`
            // editstart_dose.value = `${date[2]}-${date[1]}-${date[0]}`
            // editfinish_dose.value = `${date1[2]}-${date1[1]}-${date1[0]}`
            editstart_dose.value = ``
            editfinish_dose.value = ``
            list_editadministration.value = 10

            prescribedGeneral = prescribedAll[indexItems].items;
            prescribedAll[indexItems].items.map(element => {
                let indexAdministration = infoTratamient.via_administration.findIndex(elementSearch => elementSearch.id_via === parseInt(element.id_via));
                let component = `<section class="card" id="prescribedEditAdd${element.id}">
                                <section class="card-body p-3">
                                    <section class="">
                                        <h6 class="fw-bold">Medicamento: <span class="fw-normal">${element.medicine}</span></h6>
                                        ${element.dosis !== '' ? `<h6 class="fw-bold">Dosis: <span class="fw-normal">${element.dosis}</span></h6>` : ''}
                                        ${element.frecuencia !== '' ? `<h6 class="fw-bold">Frecuencia: <span class="fw-normal">${element.frecuencia}</span></h6>` : ''}
                                        ${parseInt(element.id_via) !== 10 ? `<h6 class="fw-bold">Vía de administración: <span class="fw-normal">${infoTratamient.via_administration[indexAdministration].nombre}</span></h6>` : ''}
                                        ${(element.inicio_trt !== '' && element.fin_trt !== '') ? `<h6 class="fw-bold">Periodo: <span class="fw-normal">${moment(element.inicio_trt).format('L')} - ${moment(element.fin_trt).format('L')}</span ></h6 >` : ''}
                                        <h6 class="fw-bold">Indicaciones: <span class="fw-normal">${(element.indicaciones === '' || element.indicaciones === null ) ? 'Sin indicaciones' : element.indicaciones}</span></h6>
                                        <hr />  
                                        <button class="btn btn-primary btn-sm" onclick="editeditRecipe('${element.id}')">Editar</button>
                                        <button class="btn btn-danger btn-sm" onclick="editdeleteRecipe('${element.id}')">Eliminar</button>
                                    </section>
                                </section>
                            </section>`
                $("#editview-prescribed").append(component);
            })
            updateActiveAll = true;
            idAppoimentOpenAll = prescribedAll[indexItems];
            prescribedAll.splice(indexItems, 1)
            deleteComponent(`appoiment-finish-${id}`)
            $('#modalEditTratamient').modal('show')
        })
        .catch(error => Alert('error', error.message))
}

const editcloseModalRecipe = () => {
    if (prescribedGeneral.length === 0 && updateActiveAll) {
        Alert('warning', 'Debes agregar medicamentos')
        return
    }
    if (updateActiveAll) {
        let idMain = idAppoimentOpenAll.idMain
        prescribedAll.push(idAppoimentOpenAll)
        let container = `<section class="p-2 border border-2 m-2" id="appoiment-finish-${idMain}">
                                        <section class="border border-2 p-2 d-flex flex-row flex-nowrap justify-content-end align-items-center">
                                            <h2 class="fs-5 text-uppercase text-center fw-bold me-0 w-100">Receta</h2>
                                            <a style="cursor: pointer;" onclick="printEditRecipe('${idMain}')">
                                                <img src="Content/Images/icons/sisde_circulos/print.svg" alt="Print" width="32" />
                                            </a>
                                        </section>
                                        <hr />`

        idAppoimentOpenAll.items.map(element => {
            let indexAdministration = infoTratamient.via_administration.findIndex(({ id_via }) => id_via === parseInt(element.id_via));
            container += `<section class="border border-2 p-2">
                            <h6 class="fw-bold">Medicamento: <span class="fw-normal">${element.medicine}</span></h6>
                            ${element.dosis !== '' ? `<h6 class="fw-bold">Dosis: <span class="fw-normal">${element.dosis}</span></h6>` : ''}
                            ${element.frecuencia !== '' ? `<h6 class="fw-bold">Frecuencia: <span class="fw-normal">${element.frecuencia}</span></h6>` : ''}
                            ${parseInt(element.id_via) !== 10 ? `<h6 class="fw-bold">Vía de administración: <span class="fw-normal">${infoTratamient.via_administration[indexAdministration].nombre}</span></h6>` : ''}
                            ${(element.inicio_trt !== '' && element.fin_trt !== '') ? `<h6 class="fw-bold">Periodo: <span class="fw-normal">${moment(element.inicio_trt).format('L')} - ${moment(element.fin_trt).format('L')}</span></h6>` : ''}
                            <h6 class="fw-bold">Indicaciones: <span class="fw-normal">${element.indicaciones === '' ? 'Sin indicaciones' : element.indicaciones}</span></h6>
                        </section>`
        })

        container += `<section class="d-flex flex-row justify-content-center">
                                            <button class="btn btn-primary btn-sm m-1" onclick="editopenModalTratamientEdit('${idMain}')">Editar</button>
                                            <button class="btn btn-danger btn-sm m-1" onclick="editdeleteRecipeFinish('${idMain}')">Eliminar</button>
                                        </section>
                                    </section>`
        $('#editapprobided-appoiment').append(container)
    }

    updateActiveAll = false
    idAppoimentOpenAll = []
    prescribedGeneral = []
    editstart_dose.value = ``
    editfinish_dose.value = ``
    editmedicine.value = ''
    editprescribed_dose.value = ''
    editfrequency_dose.value = ''
    list_editadministration.value = 10
    editcomment_prescribed.value = ''
    var options = document.querySelectorAll('#list-editmedicine option');
    options.forEach((o, index) => o.remove());
    var options = document.querySelectorAll('#list-editadministration option');
    options.forEach((o, index) => index !== 0 && o.remove());
    document.getElementById('editview-prescribed').innerHTML = '';
    $('#modalEditTratamient').modal('hide')
}

const editaddRecipe = () => {
    let errors = 0;
    editmedicine.className = 'form-control'
    editstart_dose.className = 'form-control'
    editfinish_dose.className = 'form-control'
    editprescribed_dose.className = 'form-control'
    editfrequency_dose.className = 'form-control'
    list_editadministration.className = 'form-control'

    if (editmedicine.value === '') {
        editmedicine.className = 'form-control is-invalid'
        errors++;
    }
    if (list_editadministration.value === '') {
        list_editadministration.className = 'form-control is-invalid'
        errors++;
    }
    if (errors > 0) return
    if (!medicine.value.includes('~ SKU:')) medicine.value += `~ SKU: Sin existencia en farmacia`;

    // let id = prescribedGeneral.length + 1;
    // let id = crypto.randomUUID().replaceAll('-','');
    let id = Math.random().toString(36).substring(2, 18);


    let medicament = editmedicine.value.split('~ SKU:');
    prescribedGeneral.push({
        id,
        medicine: medicament[0],
        sku: medicament[1],
        inicio_trt: editstart_dose.value,
        fin_trt: editfinish_dose.value,
        dosis: editprescribed_dose.value,
        frecuencia: editfrequency_dose.value,
        id_via: list_editadministration.value,
        indicaciones: editcomment_prescribed.value
    })    
    let indexAdministration = infoTratamient.via_administration.findIndex(element => element.id_via === parseInt(list_editadministration.value));
    let component = `<section class="card" id="prescribedEditAdd${id}">
                                <section class="card-body p-3">
                                    <section class="">
                                        <h6 class="fw-bold">Medicamento: <span class="fw-normal">${medicament[0]}</span></h6>
                                        ${editprescribed_dose.value !== '' ? `<h6 class="fw-bold">Dosis: <span class="fw-normal">${editprescribed_dose.value}</span></h6>` : ''}
                                        ${editfrequency_dose.value !== '' ? `<h6 class="fw-bold">Frecuencia: <span class="fw-normal">${editfrequency_dose.value}</span></h6>` : ''}
                                        ${parseInt(list_editadministration.value) !== 10 ? `<h6 class="fw-bold">Vía de administración: <span class="fw-normal">${infoTratamient.via_administration[indexAdministration].nombre}</span></h6>` : ''}
                                        ${(editstart_dose.value !== '' && editfinish_dose.value !== '')  ? `<h6 class="fw-bold">Periodo: <span class="fw-normal">${moment(editstart_dose.value).format('L')} - ${moment(editfinish_dose.value).format('L')}</span ></h6 >` : ''}
                                        <h6 class="fw-bold">Indicaciones: <span class="fw-normal">${editcomment_prescribed.value === '' ? 'Sin indicaciones' : editcomment_prescribed.value}</span></h6>
                                        <hr />  
                                        <button class="btn btn-primary btn-sm" onclick="editeditRecipe('${id}')">Editar</button>
                                        <button class="btn btn-danger btn-sm" onclick="editdeleteRecipe('${id}')">Eliminar</button>
                                    </section>
                                </section>
                            </section>`
    $("#editview-prescribed").append(component);
    const date = moment().format('L').split('/')
    const date1 = moment().add(1, 'days').format('L').split('/')
    // editstart_dose.value = `${date[2]}-${date[1]}-${date[0]}`
    // editfinish_dose.value = `${date1[2]}-${date1[1]}-${date1[0]}`
    editstart_dose.value = ``
    editfinish_dose.value = ``
    editmedicine.value = ''
    editprescribed_dose.value = ''
    editfrequency_dose.value = ''
    list_editadministration.value = 10
    editcomment_prescribed.value = ''

}

const editeditRecipe = (id) => {
    if (updateActive) {
        Alert('warning', 'Debes Terminar/Cancelar la actualización')
        return;
    }
    updateActive = true;
    idUpdateActive = id;

    let index = prescribedGeneral.findIndex(element => element.id === id);
    idAppoimentOpenAll = prescribedGeneral[index];
    editmedicine.value = `${prescribedGeneral[index].medicine} ~ SKU: ${prescribedGeneral[index].sku}`
    editstart_dose.value = prescribedGeneral[index].inicio_trt
    editfinish_dose.value = prescribedGeneral[index].fin_trt
    editprescribed_dose.value = prescribedGeneral[index].dosis
    editfrequency_dose.value = prescribedGeneral[index].frecuencia
    list_editadministration.value = prescribedGeneral[index].id_via
    editcomment_prescribed.value = prescribedGeneral[index].indicaciones

    editreciped_tratamient.hidden = true;
    editupdate_tratamient.hidden = false;
    editcancelUpdate_tratamient.hidden = false;

    editfinished_tratamient.disabled = true
    editcancel_tratamient.disabled = true

    prescribedGeneral.splice(index, 1)
    deleteComponent(`prescribedEditAdd${id}`)
}

const editcancelUpdate = () => {
    let indexAdministration = infoTratamient.via_administration.findIndex(element => element.id_via === parseInt(idAppoimentOpenAll.id_via));
    prescribedGeneral.push(idAppoimentOpenAll)

    let component = `<section class="card" id="prescribedEditAdd${idAppoimentOpenAll.id}">
                                <section class="card-body p-3">
                                    <section class="">
                                        <h6 class="fw-bold">Medicamento: <span class="fw-normal">${idAppoimentOpenAll.medicine}</span></h6>
                                        ${idAppoimentOpenAll.dosis !== '' ? `<h6 class="fw-bold">Dosis: <span class="fw-normal">${idAppoimentOpenAll.dosis}</span></h6>` : ''}
                                        ${idAppoimentOpenAll.frecuencia !== '' ? `<h6 class="fw-bold">Frecuencia: <span class="fw-normal">${idAppoimentOpenAll.frecuencia}</span></h6>` : ''}
                                        ${parseInt(idAppoimentOpenAll.id_via) !== 10 ? `<h6 class="fw-bold">Vía de administración: <span class="fw-normal">${infoTratamient.via_administration[indexAdministration].nombre}</span></h6>` : ''}
                                        ${(idAppoimentOpenAll.inicio_trt !== '' && idAppoimentOpenAll.fin_trt !== '') ? `<h6 class="fw-bold">Periodo: <span class="fw-normal">${moment(idAppoimentOpenAll.inicio_trt).format('L')} - ${moment(idAppoimentOpenAll.fin_trt).format('L')}</span ></h6 >` : ''}
                                        <h6 class="fw-bold">Indicaciones: <span class="fw-normal">${idAppoimentOpenAll.indicaciones === '' ? 'Sin indicaciones' : idAppoimentOpenAll.indicaciones}</span></h6>
                                        <hr />  
                                        <button class="btn btn-primary btn-sm" onclick="editeditRecipe('${idAppoimentOpenAll.id}')">Editar</button>
                                        <button class="btn btn-danger btn-sm" onclick="editdeleteRecipe('${idAppoimentOpenAll.id}')">Eliminar</button>
                                    </section>
                                </section>
                            </section>`
    $("#editview-prescribed").append(component);
    const date = moment().format('L').split('/')
    const date1 = moment().add(1, 'days').format('L').split('/')
    // editstart_dose.value = `${date[2]}-${date[1]}-${date[0]}`
    // editfinish_dose.value = `${date1[2]}-${date1[1]}-${date1[0]}`
    editstart_dose.value = ``
    editfinish_dose.value = ``
    editmedicine.value = ''
    editprescribed_dose.value = ''
    editfrequency_dose.value = ''
    list_editadministration.value = 10
    editcomment_prescribed.value = ''

    updateActive = false;
    idAppoimentOpenAll = [];
    editreciped_tratamient.hidden = false;
    editupdate_tratamient.hidden = true;
    editcancelUpdate_tratamient.hidden = true;

    editfinished_tratamient.disabled = false;
    editcancel_tratamient.disabled = false;
}

const editupdateRecipe = () => {
    let errors = 0;
    editmedicine.className = 'form-control'
    editstart_dose.className = 'form-control'
    editfinish_dose.className = 'form-control'
    editprescribed_dose.className = 'form-control'
    editfrequency_dose.className = 'form-control'
    list_editadministration.className = 'form-control'

    if (editmedicine.value === '') {
        editmedicine.className = 'form-control is-invalid'
        errors++;
    }
    if (list_editadministration.value === '') {
        list_editadministration.className = 'form-control is-invalid'
        errors++;
    }
    if (errors > 0) return
    if (!editmedicine.value.includes('~ SKU:')) editmedicine.value += `~ SKU: Sin existencia en farmacia`;
    let id = idUpdateActive;
    let medicament = editmedicine.value.split('~ SKU:');
    prescribedGeneral.push({
        id,
        medicine: medicament[0],
        sku: medicament[1],
        inicio_trt: editstart_dose.value,
        fin_trt: editfinish_dose.value,
        dosis: editprescribed_dose.value,
        frecuencia: editfrequency_dose.value,
        id_via: list_editadministration.value,
        indicaciones: editcomment_prescribed.value
    })
    let indexAdministration = infoTratamient.via_administration.findIndex(element => element.id_via === parseInt(list_editadministration.value));
    let component = `<section class="card" id="prescribedEditAdd${id}">
                                <section class="card-body p-3">
                                    <section class="">
                                        <h6 class="fw-bold">Medicamento: <span class="fw-normal">${medicament[0]}</span></h6>
                                        ${editprescribed_dose.value !== '' ? `<h6 class="fw-bold">Dosis: <span class="fw-normal">${editprescribed_dose.value}</span></h6>` : ''}
                                        ${editfrequency_dose.value !== '' ? `<h6 class="fw-bold">Frecuencia: <span class="fw-normal">${editfrequency_dose.value}</span></h6>` : ''}
                                        ${parseInt(list_editadministration.value) !== 10 ? `<h6 class="fw-bold">Vía de administración: <span class="fw-normal">${infoTratamient.via_administration[indexAdministration].nombre}</span></h6>` : ''}
                                        ${(editstart_dose.value !== '' && editfinish_dose.value !== '') ? `<h6 class="fw-bold">Periodo: <span class="fw-normal">${moment(editstart_dose.value).format('L')} - ${moment(editfinish_dose.value).format('L')}</span ></h6 >` : ''}
                                        <h6 class="fw-bold">Indicaciones: <span class="fw-normal">${editcomment_prescribed.value === '' ? 'Sin indicaciones' : editcomment_prescribed.value}</span></h6>
                                        <hr />  
                                        <button class="btn btn-primary btn-sm" onclick="editeditRecipe('${id}')">Editar</button>
                                        <button class="btn btn-danger btn-sm" onclick="editdeleteRecipe('${id}')">Eliminar</button>
                                    </section>
                                </section>
                            </section>`
    $("#editview-prescribed").append(component);
    const date = moment().format('L').split('/')
    const date1 = moment().add(1, 'days').format('L').split('/')
    // editstart_dose.value = `${date[2]}-${date[1]}-${date[0]}`
    // editfinish_dose.value = `${date1[2]}-${date1[1]}-${date1[0]}`
    editstart_dose.value = ``
    editfinish_dose.value = ``
    editmedicine.value = ''
    editprescribed_dose.value = ''
    editfrequency_dose.value = ''
    list_editadministration.value = 10
    editcomment_prescribed.value = ''

    updateActive = false;
    idUpdateActive = -1;
    editreciped_tratamient.hidden = false;
    editupdate_tratamient.hidden = true;
    editcancelUpdate_tratamient.hidden = true;

    editfinished_tratamient.disabled = false;
    editcancel_tratamient.disabled = false;
}

const editdeleteRecipe = (id) => {
    if (updateActive) {
        Alert('warning', 'Debes Terminar/Cancelar la actualización')
        return;
    }
    let index = prescribedGeneral.findIndex(element => element.id === id);
    prescribedGeneral.splice(index, 1);
    let element = document.getElementById(`prescribedEditAdd${id}`)
    element.parentNode.removeChild(element);
}

const editdeleteRecipeFinish = (id) => {
    let index = prescribedAll.findIndex(element => element.idMain === id);
    prescribedAll.splice(index, 1);
    let element = document.getElementById(`appoiment-finish-${id}`)
    element.parentNode.removeChild(element);
}

const editfinishRecipe = () => {
    if (prescribedGeneral.length === 0 && !updateActive) {
        Alert('warning', 'Debes agregar medicamentos')
        return
    }

    // const idMain = crypto.randomUUID().replaceAll('-','')
    let idMain = Math.random().toString(36).substring(2, 18);

    let copyItems = [];
    prescribedGeneral.map(element => {
        copyItems.push({ ...element, Numero_receta: idMain });
    })
    prescribedAll.push({ items: copyItems, idMain })
    document.getElementById('editview-prescribed').innerHTML = '';


    let container = `<section class="p-2 border border-2 m-2" id="appoiment-finish-${idMain}">
                                        <section class="border border-2 p-2 d-flex flex-row flex-nowrap justify-content-end align-items-center">
                                            <h2 class="fs-5 text-uppercase text-center fw-bold me-0 w-100">Receta</h2>
                                            <a style="cursor: pointer;" onclick="printEditRecipe('${idMain}')">
                                                <img src="Content/Images/icons/sisde_circulos/print.svg" alt="Print" width="32" />
                                            </a>
                                        </section>
                                        <hr />`

    prescribedGeneral.map(element => {
        let indexAdministration = infoTratamient.via_administration.findIndex(({ id_via }) => id_via === parseInt(element.id_via));
        container += `<section class="border border-2 p-2">
                            <h6 class="fw-bold">Medicamento: <span class="fw-normal">${element.medicine}</span></h6>
                            ${element.dosis !== '' ? `<h6 class="fw-bold">Dosis: <span class="fw-normal">${element.dosis}</span></h6>` : ''}
                            ${element.frecuencia !== '' ? `<h6 class="fw-bold">Frecuencia: <span class="fw-normal">${element.frecuencia}</span></h6>` : ''}
                            ${parseInt(element.id_via) !== 10 ? `<h6 class="fw-bold">Vía de administración: <span class="fw-normal">${infoTratamient.via_administration[indexAdministration].nombre}</span></h6>` : ''}
                            ${(element.inicio_trt !== '' && element.fin_trt !== '') ? `<h6 class="fw-bold">Periodo: <span class="fw-normal">${moment(element.inicio_trt).format('L')} - ${moment(element.fin_trt).format('L')}</span></h6>` : ''}
                            <h6 class="fw-bold">Indicaciones: <span class="fw-normal">${element.indicaciones === '' ? 'Sin indicaciones' : element.indicaciones}</span></h6>
                        </section>`
    })

    container += `<section class="d-flex flex-row justify-content-center">
                                            <button class="btn btn-primary btn-sm m-1" onclick="editopenModalTratamientEdit('${idMain}')">Editar</button>
                                            <button class="btn btn-danger btn-sm m-1" onclick="editdeleteRecipeFinish('${idMain}')">Eliminar</button>
                                        </section>
                                    </section>`
    $('#editapprobided-appoiment').append(container)
    prescribedGeneral = []
    updateActiveAll = false
    idAppoimentOpenAll = []
    editcloseModalRecipe();
}
/* Modal editar tratamiento fin */