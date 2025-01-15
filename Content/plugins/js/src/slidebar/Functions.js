/* Llamamos las variables de entorno */
const { rutes, controllers } = envirement();

/* Variables globales */
let formActive = "";
let currentPrice = 0;
let currentServices = [];
let dataGeneral = [];
let cpInfo = [];
let pacientesExpress = [];
let calendarInfo = [];
let currentTratamient = [];
let patientExpress = false;
//Variables globales pagos anticipados
let allEarlySessions = [];
let activeEarly = false;
let idEarly = 0;

//Variables globales nuevo paciente
let infoPostalNewPatient = []

/* Componentes del formulario */
let button_consultation = document.getElementById('catRadios1');
let button_face = document.getElementById('catRadios2');
let button_appliances = document.getElementById('catRadios3');
let button_dermapen = document.getElementById('catRadios4');
let button_healing = document.getElementById('catRadios5');
let button_esthetic = document.getElementById('catRadios6');
let button_representative = document.getElementById('catRadios7');

let container_category = document.getElementById('container-categoryCalendar');
let container_channel = document.getElementById('container-chanelCalendar');
let container_service = document.getElementById('container-serviceCalendar');
let container_prometer = document.getElementById('container-promoterCalendar');
let container_status = document.getElementById('container-statusCalendar');
let container_dermaCalendar = document.getElementById('container-dermaCalendar');
let container_frecuencyCalendar = document.getElementById('container-frecuencyCalendar');
let container_patientCalendar = document.getElementById('container-list-patientCalendar');
let container_duration = document.getElementById('container-timeCalendar');
let container_methodPayCalendar = document.getElementById('container-methodPayCalendar');
let container_bankCalenda = document.getElementById('container-bankCalendar');
let container_typePayCalendar = document.getElementById('container-typePayCalendar');
let container_digitTarjetCalendar = document.getElementById('container-digitTarjetCalendar');
let container_observationCalendar = document.getElementById('container-observationCalendar');
let container_cosmetoCalendar = document.getElementById('container-cosmetoCalendar');
let container_typeCalendar = document.getElementById('container-typeCalendar');
let container_tratamientCalendar = document.getElementById('container-tratamientCalendar');
let container_areaCalendar = document.getElementById('container-areaCalendar');
let container_costCalendar = document.getElementById('container-costCalendar');
let container_representativeCalendar = document.getElementById('container-representativeCalendar');
let container_patientListCalendar = document.getElementById('container-patientListCalendar');
let container_laboratoryRepresentative = document.getElementById('container-laboratoryRepresentative');
let container_lineProductRepresentative = document.getElementById('container-lineProductRepresentative');

//Pagos anticipados
let container_earlyAppoiment = document.getElementById('container-earlyAppoiment');
let list_earlyAppoiment = document.getElementById('list-earlyAppoiment');



let dateCalendar = document.getElementById('dateCalendar');
let timeCalendar = document.getElementById('timeCalendar');
let patient  = document.getElementById('patientCalendar');
let buttonPatientCalendar = document.getElementById('buttonPatientCalendar');
let representativeCalendar = document.getElementById('representativeCalendar');
let representativeCalendarList = document.getElementById('list-representativeCalendar');
let patientCalendar = document.getElementById('list-patientCalendar');
let category = document.getElementById('categoryCalendar');
let channel = document.getElementById('chanelCalendar');
let service = document.getElementById('serviceCalendar');
let prometer = document.getElementById('promoterCalendar');
let status = document.getElementById('statusCalendar');
let dermaCalendar = document.getElementById('dermaCalendar');
let frecuencyCalendar = document.getElementById('frecuencyCalendar');
let duration = document.getElementById('timeCalendar');
let methodPayCalendar = document.getElementById('methodPayCalendar');
let bankCalenda = document.getElementById('bankCalendar');
let typePayCalendar = document.getElementById('typePayCalendar');
let digitTarjetCalendar = document.getElementById('digitTarjetCalendar');
let observationCalendar = document.getElementById('observationCalendar');
let cosmetoCalendar = document.getElementById('cosmetoCalendar');
let priceCalendar = document.getElementById('priceCalendar');
let typeCalendar = document.getElementById('typeCalendar');
let tratamientCalendar = document.getElementById('tratamientCalendar');
let areaCalendar = document.getElementById('areaCalendar');
let costCalendar = document.getElementById('costCalendar');
let label_costCalendar = document.getElementById('label-costCalendar');
let laboratoryRepresentative = document.getElementById('laboratoryRepresentative');
let lineProductRepresentative = document.getElementById('lineProductRepresentative');

let cpUser = document.getElementById('cpUser');

let dateUser = document.getElementById('dateUser');
let dateUserCalenadr = document.getElementById('dateUserCalenadr')
/* Componentes del formulario fin */


/* expresiones regulares */
const regexRFCF = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/
const regexEmailF = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const regexPhoneF = /^\(?(\d{3})\)?[-]?(\d{3})[-]?(\d{4})$/
const regexOnlyLetra = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g
/* expresiones regulares fin */


/**************************************************[ VALIDACION DEL MODAL ]*****************************************************************************/
const onKeyboardEscnewPatient = () => event.keyCode === 27 && closeModalNewPatient();
const onKeyboardEscnewAppoiment = () => event.keyCode === 27 && closeModalCalendar();
const onKeyboardEscPatientExpress = () => event.keyCode === 27 && closeModalPatient();
/**************************************************[ VALIDACION DEL MODAL FIN ]*****************************************************************************/

const openModal = () => {
    fetch(`${rutes.back}${controllers.patient}GetMainDataUser`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(result => {
        const { conflicts } = result;
        if (conflicts !== null) {
            Alert('error', 'Hubo un problema cargando los datos');
            return
        }
        const { SuccessMaindata } = result;
        /* Formulario paciente */
        let country = document.getElementById('countryUser');
        let countryList = document.getElementById('list-countrys');
        let razaList = document.getElementById('razaUser');
        let religionList = document.getElementById('religionUser');
        let sexList = document.getElementById('selectSex');
        let stateList = document.getElementById('stateUser');
        let billingList = document.getElementById('list-cfdiBilling');
        let regimenList = document.getElementById('list-regimenBilling');
        let civilUser = document.getElementById('civilUser');

        SuccessMaindata[0].Estado_Civil.map(({ id_estadocivil, nombre }) => {
            let option = document.createElement('option')
            option.value = `${id_estadocivil}`
            option.label = `${nombre}`
            civilUser.append(option)
        })

        SuccessMaindata[0].Estado.map(({ id_estado, nombre }) => {
            let option = document.createElement('option')
            option.value = `${id_estado}`
            option.label = `${nombre}`
            stateList.append(option)
        })
        
        SuccessMaindata[0].Regimen.map(({ id_regimen_fiscal, descripcion }) => {
            let option = document.createElement('option')
            option.value = `${id_regimen_fiscal}-${descripcion}`
            option.label = `${id_regimen_fiscal}-${descripcion}`
            regimenList.append(option)
        })
        
        SuccessMaindata[0].UsoCFDI.map(({ id_cfdi, descripcion }) => {
            let option = document.createElement('option')
            option.value = `${id_cfdi}-${descripcion}`
            option.label = `${id_cfdi}-${descripcion}`
            billingList.append(option)
        })
        
        SuccessMaindata[0].pais.map(({ id_pais, nombre }) => {
            let option = document.createElement('option')
            option.value = `${nombre}`
            option.label = `${id_pais}-${nombre}`
            countryList.append(option)
        })

        SuccessMaindata[0].raza.map(({ id_raza, nombre }) => {
            let option = document.createElement('option')
            option.value = `${id_raza}`
            option.label = `${nombre}`
            razaList.append(option)
        })
        
        SuccessMaindata[0].religion.map(({ id_religion, nombre }) => {
            let option = document.createElement('option')
            option.value = `${id_religion}`
            option.label = `${nombre}`
            religionList.append(option)
        })

        SuccessMaindata[0].Genero.map(({ id, Description }) => {
            let option = document.createElement('option')
            option.value = `${id}`
            option.label = `${Description}`
            sexList.append(option)
        })
        /* Inicializamos variables */
        country.value = 'MEXICO (ESTADOS UNIDOS MEXICANOS)';
        stateList.value = '14';
        /* Inicializamos variables fin */
        dateUser.min = '1800-01-01';
        dateUser.max = moment().format('YYYY-MM-DD');
        dataGeneral.push(SuccessMaindata[0])
        viewDataGeneral()
        $('#modalAddUser').modal('show')
    })
    .catch(error => Alert('error', error.message))
}
const openModalCalendar = () => {
    const { id } = JSON.parse(localStorage.getItem('clinic'));
    fetch(`${rutes.back}${controllers.diary}GetDataAppointment?idShope=${id}`)
    .then(response => response.json())
    .then(result => {
        const { conflicts } = result

        if (conflicts !== null) {
            Alert('error', 'Hubo un problema al consultar la información')
            return
        }

        const { SuccessAppointment } = result;

        //Cita
        container_category.style.display = 'none';
        container_channel.style.display = 'none';
        container_service.style.display = 'none';
        container_prometer.style.display = 'none';
        container_status.style.display = 'none';
        container_dermaCalendar.style.display = 'none';
        container_frecuencyCalendar.style.display = 'none';

        container_methodPayCalendar.style.display = 'none';
        container_bankCalenda.style.display = 'none';
        container_typePayCalendar.style.display = 'none';
        container_digitTarjetCalendar.style.display = 'none';
        container_observationCalendar.style.display = 'none';
        container_cosmetoCalendar.style.display = 'none';
        container_typeCalendar.style.display = 'none';
        container_tratamientCalendar.style.display = 'none';
        container_areaCalendar.style.display = 'none';
        container_areaCalendar.className = 'd-none';
        container_costCalendar.style.display = 'none';

        container_earlyAppoiment.style.display = 'none';

        priceCalendar.innerHTML = 0;
        costCalendar.value = 0;
        buttonPatientCalendar.disabled = true;

        //Representante medico
        container_representativeCalendar.style.display = 'none';
        container_laboratoryRepresentative.style.display = 'none';
        container_lineProductRepresentative.style.display = 'none';


        dateCalendar.min = moment().format('YYYY-MM-DDThh:mm:ss');
        dateCalendar.max = moment().add(365, 'days').format('YYYY-MM-DDThh:mm:ss');
        dateCalendar.value = moment().format('YYYY-MM-DDThh:mm:ss');

        SuccessAppointment[0].Category.map(({ idCategoria, Categoria },index) => {
            let menu_appoiment = document.getElementById('menu-appoiment');
            let input_appoiment = document.createElement('input')
            let label_appoiment = document.createElement('label')

            input_appoiment.type = "radio";
            input_appoiment.className = "btn-check";
            input_appoiment.name = `catRadios`;
            input_appoiment.type = `radio`;
            input_appoiment.id = `catRadios${idCategoria}`;
            input_appoiment.autocomplete = "off";
            //input_appoiment.onClick = changeCategory(idCategoria);
            //menu_appoiment.append(input_appoiment)
            
            label_appoiment.className = "btn btn-outline-primary";
            label_appoiment.htmlFor = `catRadios${idCategoria}`;
            label_appoiment.innerHTML = Categoria;
            //menu_appoiment.append(label_appoiment)
            let option = document.createElement('option')
            option.value = `${idCategoria}`
            option.label = `${Categoria}`
            category.append(option)
        })   
        SuccessAppointment[0].laboratory.map(({ id_laboratorio, nombre }) => {
            let option = document.createElement('option')
            option.value = `${id_laboratorio}`
            option.label = `${nombre}`
            laboratoryRepresentative.append(option)
        })
        SuccessAppointment[0].cosmetologist.map(({ id_usuario, nombre, apellido_paterno, apellido_materno }) => {
            let option = document.createElement('option')
            option.value = `${id_usuario}`
            option.label = `${nombre} ${apellido_paterno} ${apellido_materno}`
            cosmetoCalendar.append(option)
        })
        SuccessAppointment[0].Type.map(({ id_tipo, nombre }, index) => {
            if(index === 0){
                let option = document.createElement('option')
                option.value = `${id_tipo}`
                option.label = `${nombre}`            
                typeCalendar.append(option)
            }
        })
        SuccessAppointment[0].TypePay.map(({ id_forma_pago, descripcion }) => {
            let option = document.createElement('option')
            option.value = `${id_forma_pago}`
            option.label = `${descripcion}`
            methodPayCalendar.append(option)
        })
        SuccessAppointment[0].banks.map(({ id_bancos, nombre }) => {
            let option = document.createElement('option')
            option.value = `${id_bancos}`
            option.label = `${nombre}`
            bankCalenda.append(option)
        })
        
        SuccessAppointment[0].duration.map(({ id_duracion, minutos }) => {
            let option = document.createElement('option')
            option.value = `${id_duracion}`
            option.label = `${minutos} min`
            duration.append(option)
        })
        timeCalendar.value = 1;
        SuccessAppointment[0].patient.map(({ id_paciente, nombre, apellido_materno, apellido_paterno, email, telefono }) => {
            let option = document.createElement('option')
            option.value = `${id_paciente}-${nombre} ${apellido_paterno} ${apellido_materno}`
            option.label = `${id_paciente}-${nombre} ${apellido_paterno} ${apellido_materno} ${email ? email : ''} ${telefono ? telefono : ''}`
            patientCalendar.append(option)
        })
        pacientesExpress.push(SuccessAppointment[0].patient)
        SuccessAppointment[0].status.map(({ id_estadocita, nombre }) => {
            let option = document.createElement('option')
            option.value = `${id_estadocita}`
            option.label = `${nombre}`
            status.append(option)
        })
        SuccessAppointment[0].promoter.map(({ id_provendedora, nombre }) => {
            let option = document.createElement('option')
            option.value = `${id_provendedora}`
            option.label = `${nombre}`
            prometer.append(option)
        })

        SuccessAppointment[0].frequency.map(({ id_frecuencia, nombre }) => {
            let option = document.createElement('option')
            option.value = `${id_frecuencia}`
            option.label = `${nombre}`
            frecuencyCalendar.append(option)
        })
        SuccessAppointment[0].channel.map(({ id_canal, nombre }) => {
            let option = document.createElement('option')
            option.value = `${id_canal}`
            option.label = `${nombre}`
            channel.append(option)
        })
        SuccessAppointment[0].dermatologist.map(({ id_usuario, nombre, apellido_paterno, apellido_materno }) => {
            let option = document.createElement('option')
            option.value = `${id_usuario}`
            option.label = `${nombre} ${apellido_paterno} ${apellido_materno}`
            dermaCalendar.append(option)
        })
        SuccessAppointment[0].representative.map(({ id_repre, nombre }) => {
            let option = document.createElement('option')
            option.value = `${id_repre} - ${nombre}`
            option.label = `${id_repre} - ${nombre}`
            representativeCalendarList.append(option)
        })
        
        calendarInfo.push(SuccessAppointment[0]);
        $('#modalCalendar').modal('show');
    })
    .catch(error => Alert('error', error.message))

}
const openSearchPatient = () => {
    fetch(`${rutes.back}${controllers.patient}GetMainDataUser`, {
        method: 'POST'
    })
        .then(response => response.json())
        .then(result => {
            const { conflicts } = result;
            if (conflicts !== null) {
                Alert('error', 'Hubo un problema cargando los datos');
                return
            }

            const { SuccessMaindata } = result;
            /* Formulario paciente */
            let countryList = document.getElementById('list-countrysCalenadr');
            let sexList = document.getElementById('selectSexCalenadr');
            let stateList = document.getElementById('selectStateUserCalenadr');
            let country = document.getElementById('countryUserCalenadr');

            SuccessMaindata[0].Estado.map(({ id_estado, nombre }) => {
                let option = document.createElement('option')
                option.value = `${id_estado}`
                option.label = `${nombre}`
                stateList.append(option)
            })
            SuccessMaindata[0].pais.map(({ id_pais, nombre }) => {
                let option = document.createElement('option')
                option.value = `${nombre}`
                option.label = `${id_pais}-${nombre}`
                countryList.append(option)
            })


            SuccessMaindata[0].Genero.map(({ id, Description }) => {
                let option = document.createElement('option')
                option.value = `${id}`
                option.label = `${Description}`
                sexList.append(option)
            })

            /* Inicializamos variables */
            country.value = 'MEXICO (ESTADOS UNIDOS MEXICANOS)';
            stateList.value = '14';
            dateUserCalenadr.min = '1800-01-01';
            dateUserCalenadr.max = moment().format('YYYY-MM-DD');
            /* Inicializamos variables fin */
            dataGeneral.push(SuccessMaindata[0]);
            $('#searchPatient').modal('show')
        })
        .catch(error => Alert('error', error.message))
}
/* Activa formulario paciente */
const viewDataGeneral = () => {
    document.getElementById('subgroup-data').style.display = "flex";
    document.getElementById('form-generalData').style.display = "inline";
    document.getElementById('form-adress').style.display = "none";
    document.getElementById('form-billing').style.display = "none";
    document.getElementById('form-responsible').style.display = "none";
    document.getElementById('btnradios3').checked = true;
    document.getElementById('btnradios4').checked = false;
    document.getElementById('btnradios5').checked = false;
    document.getElementById('btnradios6').checked = false;
    document.getElementById('btnradio1').checked = true;
    document.getElementById('btnradio2').checked = false;
}
const addPatient = () => {
    /* Patient */
    let name = document.getElementById('nameUser');
    let lastnamePather = document.getElementById('lastnamePUser');
    let lastnameMother = document.getElementById('lastnameMUser');
    let date = document.getElementById('dateUser');
    let sex = document.getElementById('selectSex');
    let job = document.getElementById('jobUser');
    let country = document.getElementById('countryUser');
    let state = document.getElementById('stateUser');
    let email = document.getElementById('emailUser');
    let raza = document.getElementById('razaUser');
    let religion = document.getElementById('religionUser');
    let phone = document.getElementById('phoneUser');
    let addPatient = document.getElementById('addPatient');    
    /* Patient */

    let errorUser = 0;

    name.className = 'form-control'
    lastnamePather.className = 'form-control'
    lastnameMother.className = 'form-control'
    date.className = 'form-control'
    sex.className = 'form-select'
    //job.className = 'form-control'
    country.className = 'form-control'
    state.className = 'form-control'
    email.className = 'form-control'
    raza.className = 'form-control'
    religion.className = 'form-control'
    phone.className = 'form-control'

    if (!phone.value.match(regexPhoneF) && phone.value !== '') {
        phone.className = 'form-control is-invalid'
        errorUser++;
    }
    if (!email.value.match(regexEmailF) && email.value !== '') {
        email.className = 'form-control is-invalid'
        errorUser++;
    }
    if (name.value.trimEnd() === "" || !name.value.trimEnd().match(regexOnlyLetra)) {
        name.className = 'form-control is-invalid'
        errorUser++;

    }
    if (lastnamePather.value.trimEnd() === "" || !lastnamePather.value.trimEnd().match(regexOnlyLetra)) {
        lastnamePather.className = 'form-control is-invalid'
        errorUser++;

    }
    if (lastnameMother.value.trimEnd() === "" || !lastnameMother.value.trimEnd().match(regexOnlyLetra)) {
        lastnameMother.className = 'form-control is-invalid'
        errorUser++;
    }
    if (date.value === "") 
    {
        date.className = 'form-control is-invalid'
        errorUser++;
    }
    if (sex.value === "") {
        sex.className = 'form-control is-invalid'
        errorUser++;
    }
    if (country.value === "") {
        country.className = 'form-control is-invalid'
        errorUser++;
    }
    if (state.value === "") {
        state.className = 'form-control is-invalid'
        errorUser++;
    }
    if (errorUser > 0) return
    jsonPatient = {
        patient: [
            {
                nombre: name.value.trimEnd().toUpperCase(),
                apellido_paterno: lastnamePather.value.trimEnd().toUpperCase(),
                apellido_materno: lastnameMother.value.trimEnd().toUpperCase(),
                fecha_nacimiento: date.value,
                sexo: sex.value,
                ocupacion: job.value.toUpperCase(),
                pais_nacimiento: dataGeneral[0].pais[dataGeneral[0].pais.findIndex(element => element.nombre === country.value)].id_pais,
                email: email.value.toUpperCase(),
                id_raza: raza.value,
                id_religion: religion.value,
                entidad_federativa: state.value,
                telefono: phone.value,
                id_estadocivil: civilUser.value
            }
        ],
        Direction: [
            {
                id_codigo_postal: infoPostalNewPatient.length === 0 ? "" : infoPostalNewPatient.id_codigo_postal,
                id_colonia: infoPostalNewPatient.length === 0 ? "" : infoPostalNewPatient.id_colonia,
                id_estado: infoPostalNewPatient.length === 0 ? "" : infoPostalNewPatient.id_estado,
                id_municipio: infoPostalNewPatient.length === 0 ? "" : infoPostalNewPatient.id_municipio,
                id_pais: infoPostalNewPatient.length === 0 ? "" : infoPostalNewPatient.id_pais,
            }
        ]
    }

    addPatient.disabled = true;
    fetch(`${rutes.back}${controllers.patient}CreatePatient`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(jsonPatient)
    })
    .then(response => response.json())
    .then(result => {
        const { conflicts } = result
        if (conflicts !== null) {
            Alert('error', conflicts[0].Description);
            return
        }
        const { SuccessCreatePatient } = result
        const idpatient = SuccessCreatePatient[0].Patient;
        ToastID(idpatient)
        closeModalNewPatient();
    })
    .catch(error => Alert('error', error.message))
    .finally(() => addPatient.disabled = false)
}
const changeSatePatient = () => {
    const state = document.getElementById('stateUser');
    let lastnameMother = document.getElementById('lastnameMUser');
    if(parseInt(state.value) === 33){
        lastnameMother.readOnly = true;
        lastnameMother.value = 'XXXXX';
    } else {
        lastnameMother.readOnly = false;
        lastnameMother.value = '';
    }
}
const searchInfoPostalPaient = () => {
    cpUser.className = 'form-control'
    infoPostalNewPatient = [];
    if (cpUser.value.length !== 5) {
        cpUser.className = 'form-control is-invalid'
        cpUser.value = '';
        // Alert('warning', 'Formato de codigo incorrecto');
        return
    }
    
    fetch(`${rutes.back}${controllers.patient}GetDataZipCode`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ ZipCode: cpUser.value })    
    })
    .then(response => response.json())
    .then(result => {
        
        const { conflicts } = result
        if (conflicts !== null) {
            Alert('error', 'Hubo un problema al buscar el CP');
            cpUser.value = '';
            return
        }
        const { Postal } = result.SuccessDataZipCode[0]
        
        if (Postal.length === 0) {
            Alert('warning', 'CP Invalido')
            return
        }
        
        cpUser.className = 'form-control is-valid'
        infoPostalNewPatient = Postal[0]        
    })
    .catch(error => Alert('error', error.message))
}

/* Activa formulario paciente fin */

/* Activa formulario domicilio */
const viewAddress = () => {
    document.getElementById('subgroup-data').style.display = "flex";
    document.getElementById('form-adress').style.display = "inline";
    document.getElementById('form-generalData').style.display = "none";
    document.getElementById('form-billing').style.display = "none";
    document.getElementById('form-responsible').style.display = "none";    


    document.getElementById('btnradios4').checked = true;
    document.getElementById('btnradios3').checked = false;
    document.getElementById('btnradios5').checked = false;
    document.getElementById('btnradios6').checked = false;
    document.getElementById('btnradio1').checked = true;
    document.getElementById('btnradio2').checked = false;
}
const searchInfoPostal = () => {
    let city = document.getElementById('cityAddress');
    let state = document.getElementById('stateAddress');
    let inneigh = document.getElementById('neighAddress');
    let neigh = document.getElementById('list-neighAddress');
    let countryAddress = document.getElementById('countryAddress');
    
    city.value = "";
    state.value = "";
    inneigh.value = "";
    countryAddress.value = "";
    inneigh.readOnly = true;
    var options = document.querySelectorAll('#list-neighAddress option');
    options.forEach((o, index) => o.remove());
    if (ZipCode.length !== 5) {
        Alert('warning', 'Formato de codigo incorrecto');
        return
    }
    
    fetch(`${rutes.back}${controllers.patient}GetDataZipCode`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        body: JSON.stringify({ ZipCode })    
    })
    .then(response => response.json())
    .then(result => {
        const { conflicts } = result
        if (conflicts !== null) {
            Alert('error', 'Hubo un problema al buscar el CP');
            return
        }
        const { Postal } = result.SuccessDataZipCode[0]

        if (Postal.length === 0) {
            Alert('warning', 'CP Invalido')
            return
        }
        cpInfo.push(Postal)
        Postal.map(({ Colonia, Estado, Pais, id_colonia, id_estado, id_municipio, id_pais, nombre }, index) => {
            if (index === 0) {
                city.value = nombre;
                state.value = Estado;
                countryAddress.value = Pais;
            }
            let option = document.createElement('option')
            option.value = `${Colonia}`
            option.label = `${id_colonia}-${Colonia}`
            neigh.append(option)
        })

        inneigh.readOnly = false;
    })
    .catch(error => Alert('error', error.message))
}   
/* Activa formulario domicilio fin */

/* Activa formulario facturacion */
const viewBilling = () => {
document.getElementById('subgroup-data').style.display = "flex";
document.getElementById('form-adress').style.display = "none";
document.getElementById('form-generalData').style.display = "none";
document.getElementById('form-billing').style.display = "inline"
document.getElementById('form-responsible').style.display = "none";    

document.getElementById('btnradios5').checked = true;
document.getElementById('btnradios3').checked = false;
document.getElementById('btnradios4').checked = false;
document.getElementById('btnradios6').checked = false;
document.getElementById('btnradio1').checked = true;
document.getElementById('btnradio2').checked = false;
}
/* Activa formulario facturacion fin */

/* Activa formulario responsable */
const viewResponsible = () => {
document.getElementById('subgroup-data').style.display = "flex";
document.getElementById('form-adress').style.display = "none";
document.getElementById('form-generalData').style.display = "none";
document.getElementById('form-billing').style.display = "none"
document.getElementById('form-responsible').style.display = "inline";    


document.getElementById('btnradios6').checked = true;
document.getElementById('btnradios3').checked = false;
document.getElementById('btnradios4').checked = false;
document.getElementById('btnradios5').checked = false;
document.getElementById('btnradio1').checked = true;
document.getElementById('btnradio2').checked = false;
}
/* Activa formulario responsable fin*/

/* Cierra formulario paciente nuevo */
const closeModalNewPatient = () => {
    document.getElementById('nameUser').value = "";
    document.getElementById('lastnamePUser').value = "";
    document.getElementById('lastnameMUser').value = "";
    document.getElementById('lastnameMUser').readOnly = false;
    document.getElementById('dateUser').value = "";
    document.getElementById('selectSex').value = "";
    document.getElementById('jobUser').value = "";
    document.getElementById('countryUser').value = "";
    document.getElementById('stateUser').value = "";
    document.getElementById('emailUser').value = "";
    document.getElementById('razaUser').value = "";
    document.getElementById('religionUser').value = "";
    document.getElementById('phoneUser').value = "";

    
    document.getElementById('regimenBilling').value = "";
    document.getElementById('cfdiBilling').value = "";


    document.getElementById('nameUser').className = 'form-control';
    document.getElementById('lastnamePUser').className = 'form-control';
    document.getElementById('lastnameMUser').className = 'form-control';
    document.getElementById('dateUser').className = 'form-control';
    document.getElementById('selectSex').className = 'form-select';
    cpUser.className = 'form-control';;

    cpUser.value = '';
    infoPostalNewPatient = [];

    var options = document.querySelectorAll('#stateUser option');
    options.forEach((o, index) => index !== 0 && o.remove());
    
    var options = document.querySelectorAll('#selectSex option');
    options.forEach((o, index) => index !== 0 && o.remove());

    var options = document.querySelectorAll('#list-countrys option');
    options.forEach((o, index) => o.remove());

    var options = document.querySelectorAll('#list-regimenBilling option');
    options.forEach((o, index) => o.remove());

    var options = document.querySelectorAll('#list-cfdiBilling option');
    options.forEach((o, index) => o.remove());
        
    var options = document.querySelectorAll('#razaUser option');
    options.forEach((o, index) => index !== 0 && o.remove());

    var options = document.querySelectorAll('#religionUser option');
    options.forEach((o, index) => index !== 0 && o.remove());

    var options = document.querySelectorAll('#civilUser option');
    options.forEach((o, index) => index !== 0 && o.remove());

    $('#modalAddUser').modal('hide');
}
/* Cierra formulario paciente nuevo fin */

/* Agendar Cita */
const closeModalCalendar = () => {
    button_consultation.checked = false;
    button_face.checked = false;
    button_appliances.checked = false;
    button_dermapen.checked = false;
    button_healing.checked = false;
    button_esthetic.checked = false;
    button_representative.checked = false;

    container_channel.style.display = 'none';
    container_service.style.display = 'none';
    container_prometer.style.display = 'none';
    container_status.style.display = 'none';
    container_dermaCalendar.style.display = 'none';
    container_frecuencyCalendar.style.display = 'none';
    container_methodPayCalendar.style.display = 'none';
    container_bankCalenda.style.display = 'none';
    container_typePayCalendar.style.display = 'none';
    container_digitTarjetCalendar.style.display = 'none';
    container_observationCalendar.style.display = 'none';
    container_cosmetoCalendar.style.display = 'none';
    container_typeCalendar.style.display = 'none';
    container_tratamientCalendar.style.display = 'none';
    container_areaCalendar.style.display = 'none';
    container_areaCalendar.className = 'd-none';
    container_costCalendar.style.display = 'none';
    //Representante medico
    container_representativeCalendar.style.display = 'none';
    container_laboratoryRepresentative.style.display = 'none';
    container_lineProductRepresentative.style.display = 'none';
    representativeCalendar.value = "";
    laboratoryRepresentative.value = "";
    lineProductRepresentative.value = "";


    dateCalendar.value = '';
    timeCalendar.value = '';
    patient.value = '';
    costCalendar.value = 0;
    priceCalendar.innerHTML = 0;
    category.value = "";
    channel.value = "";
    service.value = "";
    prometer.value = "";
    status.value = "";
    dermaCalendar.value = "";
    frecuencyCalendar.value = "";
    patientCalendar.value = "";
    duration.value = "";
    methodPayCalendar.value = "";
    bankCalenda.value = "";
    typePayCalendar.value = "";
    digitTarjetCalendar.value = "";
    observationCalendar.value = "";
    cosmetoCalendar.value = "";
    priceCalendar.value = "";
    typeCalendar.value = '';
    tratamientCalendar.value = '';
    areaCalendar.value = '';

    currentTratamient = [];
    formActive = ''

    var options = document.querySelectorAll('#list-patientCalendar option');
    options.forEach((o, index) => o.remove());
    var options = document.querySelectorAll('#list-representativeCalendar option');
    options.forEach((o, index) => o.remove());
    var options = document.querySelectorAll('#categoryCalendar option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#timeCalendar option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#frecuencyCalendar option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#dermaCalendar option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#statusCalendar option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#promoterCalendar option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#serviceCalendar option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#chanelCalendar option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#methodPayCalendar option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#bankCalendar option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#typePayCalendar option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#cosmetoCalendar option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#typeCalendar option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#tratamientCalendar option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#areaCalendar option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#laboratoryRepresentative option');
    options.forEach((o, index) => index !== 0 && o.remove());

    $('#modalCalendar').modal('hide');
}
const closeModalPatient = () => {
    document.getElementById('nameUserCalenadr').value = '';
    document.getElementById('lastnamePUserCalenadr').value = '';
    document.getElementById('lastnameMUserCalenadr').value = '';
    document.getElementById('dateUserCalenadr').value = '';
    document.getElementById('selectSexCalenadr').value = '';
    document.getElementById('countryUserCalenadr').value = '';
    document.getElementById('selectStateUserCalenadr').value = '';
    document.getElementById('emailUserCalenadr').value = '';
    document.getElementById('phoneUserCalenadr').value = '';

    
    var options = document.querySelectorAll('#list-countrysCalenadr option');
    options.forEach((o, index) => o.remove());
    var options = document.querySelectorAll('#selectSexCalenadr option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#selectStateUserCalenadr option');
    options.forEach((o, index) => index !== 0 && o.remove());
    
    $('#searchPatient').modal('hide');
}
const addExpressAddPatient = () => {
    /* Patient */
    let name = document.getElementById('nameUserCalenadr');
    let lastnamePather = document.getElementById('lastnamePUserCalenadr');
    let lastnameMother = document.getElementById('lastnameMUserCalenadr');
    let date = document.getElementById('dateUserCalenadr');
    let sex = document.getElementById('selectSexCalenadr');
    //let job = document.getElementById('jobUser');
    let country = document.getElementById('countryUserCalenadr');
    let state = document.getElementById('selectStateUserCalenadr');
    let email = document.getElementById('emailUserCalenadr');
    let phone = document.getElementById('phoneUserCalenadr');
    let addExpressAddPatient = document.getElementById('addExpressAddPatient');    
    /* Patient */

    let errorUser = 0;

    name.className = 'form-control'
    lastnamePather.className = 'form-control'
    lastnameMother.className = 'form-control'
    lastnameMother.readOnly = false;
    date.className = 'form-control'
    sex.className = 'form-select'
    //job.className = 'form-control'
    country.className = 'form-control'
    state.className = 'form-control'
    email.className = 'form-control'
    phone.className = 'form-control'

    if (phone.value !== '' &&  !phone.value.match(regexPhoneF)) {
        phone.className = 'form-control is-invalid'
        errorUser++;
    }
    if (email.value !== '' && !email.value.match(regexEmailF)) {
        email.className = 'form-control is-invalid'
        errorUser++;
    }

    if (name.value.trimEnd() === "" || !name.value.trimEnd().match(regexOnlyLetra)) {
        name.className = 'form-control is-invalid'
        errorUser++;

    }
    if (lastnamePather.value.trimEnd() === "" || !lastnamePather.value.trimEnd().match(regexOnlyLetra)) {
        lastnamePather.className = 'form-control is-invalid'
        errorUser++;

    }
    if (lastnameMother.value.trimEnd() === "" || !lastnameMother.value.trimEnd().match(regexOnlyLetra)) {
        lastnameMother.className = 'form-control is-invalid'
        errorUser++;

    }
    if (date.value === "") {
        date.className = 'form-control is-invalid'
        errorUser++;

    }
    if (sex.value === "") {
        sex.className = 'form-control is-invalid'
        errorUser++;
    }
    if (country.value === "") {
        country.className = 'form-control is-invalid'
        errorUser++;
    }
    if (state.value === "") {
        state.className = 'form-control is-invalid'
        errorUser++;
    }
    
    
    if (errorUser > 0) return
    jsonPatient = {
        patient: [
            {
                nombre: name.value.trimEnd().toUpperCase(),
                apellido_paterno: lastnamePather.value.trimEnd().toUpperCase(),
                apellido_materno: lastnameMother.value.trimEnd().toUpperCase(),
                fecha_nacimiento: date.value,
                sexo: sex.value,
                pais_nacimiento: dataGeneral[0].pais[dataGeneral[0].pais.findIndex(element => element.nombre === country.value)].id_pais,
                email: email.value.toUpperCase(),
                entidad_federativa: state.value,
                telefono: phone.value.toUpperCase()
            }
        ]
    }
    addExpressAddPatient.disabled = true;
    fetch(`${rutes.back}${controllers.patient}CreatePatient`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(jsonPatient)
    })
    .then(response => response.json())
    .then(result => {
        const { conflicts } = result
        if (conflicts !== null) {
            const { Description } = conflicts[0];
            Alert('error', Description);
            return
        }
        const { SuccessCreatePatient } = result
        const idpatient = SuccessCreatePatient[0].Patient;

        
        pacientesExpress[0].push(jsonPatient.patient[0])

        document.getElementById('patientCalendar').value = `${idpatient}-${jsonPatient.patient[0].nombre} ${jsonPatient.patient[0].apellido_paterno} ${jsonPatient.patient[0].apellido_materno}`;
        let patientCalendar = document.getElementById('list-patientCalendar');
        patientExpress = true;
        closeModalPatient();
    })
    .catch(error => Alert('error', error.message))
    .finally(() => addExpressAddPatient.disabled = false)
}
const changeSateExpressPatient = () => {
    const state = document.getElementById('selectStateUserCalenadr');
    let lastnameMother = document.getElementById('lastnameMUserCalenadr');
    if(parseInt(state.value) === 33){
        lastnameMother.readOnly = true;
        lastnameMother.value = 'XXXXX';
    } else {
        lastnameMother.readOnly = false;
        lastnameMother.value = '';
    }
}
const changeDermaAppoiment = () => {
    const { Type } = calendarInfo[0];
    
    var options = document.querySelectorAll('#typeCalendar option');
    options.forEach((o, index) => index !== 0 && o.remove());
    typeCalendar.value = "";
    
    if(parseInt(dermaCalendar.value) === 9){
        Type.map(({ id_tipo, nombre }, index) => {
            if(index === 0){
                let option = document.createElement('option')
                option.value = `${id_tipo}`
                option.label = `${nombre}`            
                typeCalendar.append(option)
            }
        })
    } else {
        Type.map(({ id_tipo, nombre }, index) => {
            if(index !== 0){
                let option = document.createElement('option')
                option.value = `${id_tipo}`
                option.label = `${nombre}`            
                typeCalendar.append(option)
            }
        })
    }
}
/* Agregar cita */
const addAppointment = () => {
    dateCalendar.className = 'form-control';
    timeCalendar.className = 'form-control';
    patient.className = 'form-control';
    category.className = 'form-control'
    costCalendar.className = 'form-control';
    channel.className = 'form-control'
    //services.className = 'form-control'
    prometer.className = 'form-control'
    status.className = 'form-control'
    dermaCalendar.className = 'form-control'
    frecuencyCalendar.className = 'form-control'
    duration.className = 'form-control'
    methodPayCalendar.className = 'form-control'
    bankCalenda.className = 'form-control'
    typePayCalendar.className = 'form-control'
    digitTarjetCalendar.className = 'form-control'
    observationCalendar.className = 'form-control'
    cosmetoCalendar.className = 'form-control'
    typeCalendar.className = 'form-control'
    tratamientCalendar.className = 'form-control'
    //areaCalendar.className = 'form-control'
    representativeCalendar.className = 'form-control'
    laboratoryRepresentative.className = 'form-control'
    lineProductRepresentative.className = 'form-control'

    const { id_usuario, id_rol } = JSON.parse(localStorage.getItem('user'));
    const { id } = JSON.parse(localStorage.getItem('clinic'));

    const pathname = window.location.pathname

    let error = 0;

    if (formActive === "" || formActive === 0) {
        Alert('warning', 'Tienes que seleccionar una categoria');
        return;
    }


    if (dateCalendar.value === '') {
        dateCalendar.className = 'form-control is-invalid';
        error++;
    }
    if (timeCalendar.value === '') {
        timeCalendar.className = 'form-control is-invalid';
        error++;
    }
    if (formActive !== 7 && patient.value === '') {
        patient.className = 'form-control is-invalid';
        error++;
    }   
    if(patient.value.length < 7 || !patient.value.includes('-') || isNaN(parseInt(patient.value))){
        Alert('warning','Formato incorrecto en el paciente')
        error++;
    }
    const existPatient = calendarInfo[0].patient.findIndex(({id_paciente}) => id_paciente === parseInt(patient.value))
    if(existPatient === -1 && !patientExpress){
        Alert('warning','No hubo coincidencias con el id del usuario ingresado')
        error++;
    }

    if (error > 0) return

    if(!activeEarly){
        //Consulta
        if (formActive === 1) {
            if (frecuencyCalendar.value === '') {
                frecuencyCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (dermaCalendar.value === '') {
                dermaCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (promoterCalendar.value === '') {
                promoterCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (channel.value === '') {
                channel.className = 'form-control is-invalid';
                error++;
            }
            if (error > 0) return

            const jsonData = {
                Appointment: {
                    Cita: {
                        id_paciente: patient.value.split('-')[0],
                        id_participantes: id_usuario,
                        id_sucursal: id,
                        id_categoria: formActive,
                        precio: currentServices.area[0].Precio,
                        hora: dateCalendar.value.split('T')[1],
                        turno: 'M',
                        id_estadocita: 5,
                        id_provendedora: promoterCalendar.value,
                        id_canal: channel.value,
                        id_frecuencia: frecuencyCalendar.value,
                        fecha: dateCalendar.value.split('T')[0],
                        observaciones: observationCalendar.value,
                        id_duracion: timeCalendar.value,
                        id_servicio: currentServices.idServicio,
                        id_derma: dermaCalendar.value,
                        id_tipo: null
                    },
                    Citareas: [
                        { id_area: currentServices.area[0].idarea }
                    ],
                },
            }

            fetch(`${rutes.back}${controllers.diary}PostDataAppointment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(jsonData)
            })
            .then(response => response.json())
            .then(result => {
                const { conflicts } = result
                if (conflicts !== null) {
                    Alert('error',conflicts[0].Description)
                    return;
                }
                const { Appointment, id_Cita } = result.SuccesCreateAppointment[0]
                Alert('success', Appointment);
                if(pathname === '/diary') renderInfo();
                closeModalCalendar();
                if(moment(jsonData.Appointment.Cita.fecha).format('L').substring(0,2) === moment().format('L').substring(0,2) && id_rol !== 7) setTimeout(() => {
                        PaymentInstant('¿Desea realizar el cobro?')
                        .then(confirmation => {
                            if(confirmation){
                                openModalMakePayment(id_Cita)
                            }
                        })
                    },1500)
            })
            .catch(error => Alert('error',error.message))
        }
        //Facial
        if (formActive === 2) {
            if (frecuencyCalendar.value === '') {
                frecuencyCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (dermaCalendar.value === '') {
                dermaCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (promoterCalendar.value === '') {
                promoterCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (channel.value === '') {
                channel.className = 'form-control is-invalid';
                error++;
            }
            if (tratamientCalendar.value === '') {
                tratamientCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (areaCalendar.value === '') {
                Alert('warning','El area no puede ser vacia')
                error++;
            }
            if(typeCalendar.value === ''){
                Alert('warning','El tipo no puede ser vacio')
                error++;
            }
            if (error > 0) return
            let Citareas = []
            let currenPriceSelect = 0;
            $("#areaCalendar").val().map(element => {
                currenPriceSelect += parseInt(element.split("-")[1])
                Citareas.push({ id_area: element.split("-")[0] })
            })        
            let infoArea = areaCalendar.value.split('-')
            const jsonData = {
                Appointment: {
                Cita: {
                        id_paciente: patient.value.split('-')[0],
                        id_participantes: id_usuario,
                        id_sucursal: id,
                        id_categoria: formActive,
                        precio: currenPriceSelect,
                        hora: dateCalendar.value.split('T')[1],
                        turno: 'M',
                        id_estadocita: 5,
                        id_provendedora: promoterCalendar.value,
                        id_canal: channel.value,
                        id_frecuencia: frecuencyCalendar.value,
                        fecha: dateCalendar.value.split('T')[0],
                        observaciones: observationCalendar.value,
                        id_duracion: timeCalendar.value,
                        id_forma_pago: methodPayCalendar.value,
                        id_servicio: tratamientCalendar.value,
                        id_banco: bankCalenda.value,
                        digitos: digitTarjetCalendar.value,
                        id_derma: dermaCalendar.value,
                        id_cosme: cosmetoCalendar.value,
                        id_tipo: typeCalendar.value
                    },
                    Citareas
                },
            }        
            fetch(`${rutes.back}${controllers.diary}PostDataAppointment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(jsonData)
            })
            .then(response => response.json())
            .then(result => {
                const { conflicts } = result
                if (conflicts !== null) {
                    Alert('error', conflicts[0].Description)
                    return;
                }
                const { Appointment, id_Cita } = result.SuccesCreateAppointment[0]
                Alert('success', Appointment);
                if(pathname === '/diary') renderInfo();
                closeModalCalendar();
                if(moment(jsonData.Appointment.Cita.fecha).format('L').substring(0,2) === moment().format('L').substring(0,2) && id_rol !== 7) setTimeout(() => {
                    PaymentInstant('¿Desea realizar el cobro?')
                    .then(confirmation => {
                        if(confirmation){
                            openModalMakePayment(id_Cita)
                        }
                    })
                },1500)
            })
            .catch(error => Alert('error', error.message))

        }
        //Aparatología
        if (formActive === 3) {
            if (frecuencyCalendar.value === '') {
                frecuencyCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (dermaCalendar.value === '') {
                dermaCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (promoterCalendar.value === '') {
                promoterCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (channel.value === '') {
                channel.className = 'form-control is-invalid';
                error++;
            }
            if (tratamientCalendar.value === '') {
                tratamientCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (areaCalendar.value === '' && parseInt(tratamientCalendar.value) !== 23) {
                Alert('warning', 'El area no puede ser vacia')
                error++;
            }
            if(typeCalendar.value === ''){
                Alert('warning','El tipo no puede ser vacio')
                error++;
            }
            if (error > 0) return
            let Citareas = []
            let currenPriceSelect = 0;
            if (parseInt(tratamientCalendar.value) !== 23) {
                $("#areaCalendar").val().map(element => {
                    currenPriceSelect += parseInt(element.split("-")[1])
                    Citareas.push({ id_area: element.split("-")[0] })
                })
            } else {
                currenPriceSelect = costCalendar.value
                Citareas.push({ id_area: 53 })
            }

            let infoArea = areaCalendar.value.split('-')
            const jsonData = {
                Appointment: {
                    Cita: {
                        id_paciente: patient.value.split('-')[0],
                        id_participantes: id_usuario,
                        id_sucursal: id,
                        id_categoria: formActive,
                        precio: currenPriceSelect,
                        hora: dateCalendar.value.split('T')[1],
                        turno: 'M',
                        id_estadocita: 5,
                        id_provendedora: promoterCalendar.value,
                        id_canal: channel.value,
                        id_frecuencia: frecuencyCalendar.value,
                        fecha: dateCalendar.value.split('T')[0],
                        observaciones: observationCalendar.value,
                        id_duracion: timeCalendar.value,
                        id_forma_pago: methodPayCalendar.value,
                        id_servicio: tratamientCalendar.value,
                        id_banco: bankCalenda.value,
                        digitos: digitTarjetCalendar.value,
                        id_derma: dermaCalendar.value,
                        id_cosme: cosmetoCalendar.value,
                        id_tipo: typeCalendar.value
                    },
                    Citareas
                }
            }
            fetch(`${rutes.back}${controllers.diary}PostDataAppointment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(jsonData)
            })
            .then(response => response.json())
            .then(result => {
                const { conflicts } = result
                if (conflicts !== null) {
                    Alert('error', conflicts[0].Description)
                    return;
                }
                const { Appointment, id_Cita } = result.SuccesCreateAppointment[0]
                Alert('success', Appointment);
                if(pathname === '/diary') renderInfo();
                closeModalCalendar();
                if(moment(jsonData.Appointment.Cita.fecha).format('L').substring(0,2) === moment().format('L').substring(0,2) && id_rol !== 7) setTimeout(() => {
                    PaymentInstant('¿Desea realizar el cobro?')
                    .then(confirmation => {
                        if(confirmation){
                            openModalMakePayment(id_Cita)
                        }
                    })
                },1500)
            })
            .catch(error => Alert('error', error.message))
        }
        //Dermapen
        if (formActive === 4) {
            if (frecuencyCalendar.value === '') {
                frecuencyCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (dermaCalendar.value === '') {
                dermaCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (promoterCalendar.value === '') {
                promoterCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (channel.value === '') {
                channel.className = 'form-control is-invalid';
                error++;
            }
            if (tratamientCalendar.value === '') {
                tratamientCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (costCalendar.value === '' || parseFloat(costCalendar.value) <= 0) {
                costCalendar.className = 'form-control is-invalid';
                error++;
            }
            if(typeCalendar.value === ''){
                Alert('warning','El tipo no puede ser vacio')
                error++;
            }
            if (error > 0) return

            const jsonData = {
                Appointment: {
                    Cita: {
                        id_paciente: patient.value.split('-')[0],
                        id_participantes: id_usuario,
                        id_sucursal: id,
                        id_categoria: formActive,
                        precio: costCalendar.value,
                        hora: dateCalendar.value.split('T')[1],
                        turno: 'M',
                        id_estadocita: 5,
                        id_provendedora: promoterCalendar.value,
                        id_canal: channel.value,
                        id_frecuencia: frecuencyCalendar.value,
                        fecha: dateCalendar.value.split('T')[0],
                        observaciones: observationCalendar.value,
                        id_duracion: timeCalendar.value,
                        id_forma_pago: methodPayCalendar.value,
                        id_servicio: tratamientCalendar.value,
                        id_banco: bankCalenda.value,
                        digitos: digitTarjetCalendar.value,
                        id_derma: dermaCalendar.value,
                        id_cosme: cosmetoCalendar.value,
                        id_tipo: typeCalendar.value
                    },
                    Citareas: [
                        {
                            id_area: 53
                        }
                    ]
                }
            }
            fetch(`${rutes.back}${controllers.diary}PostDataAppointment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(jsonData)
            })
                .then(response => response.json())
                .then(result => {
                    const { conflicts } = result
                    if (conflicts !== null) {
                        Alert('error', conflicts[0].Description)
                        return;
                    }
                    const { Appointment, id_Cita } = result.SuccesCreateAppointment[0]
                    Alert('success', Appointment);
                    if(pathname === '/diary') renderInfo();
                    closeModalCalendar();
                    if(moment(jsonData.Appointment.Cita.fecha).format('L').substring(0,2) === moment().format('L').substring(0,2) && id_rol !== 7) setTimeout(() => {
                        PaymentInstant('¿Desea realizar el cobro?')
                        .then(confirmation => {
                            if(confirmation){
                                openModalMakePayment(id_Cita)
                            }
                        })
                    },1500)
                })
                .catch(error => Alert('error', error.message))
        }
        //Curación
        if (formActive === 5) {
            if (frecuencyCalendar.value === '') {
                frecuencyCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (dermaCalendar.value === '') {
                dermaCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (channel.value === '') {
                channel.className = 'form-control is-invalid';
                error++;
            }
            if (costCalendar.value === '' || parseFloat(costCalendar.value) <= 0) {
                costCalendar.className = 'form-control is-invalid';
                error++;
            }

            if (error > 0) return

            const jsonData = {
                Appointment: {
                    Cita: {
                        id_paciente: patient.value.split('-')[0],
                        id_participantes: id_usuario,
                        id_sucursal: id,
                        id_categoria: formActive,
                        precio: costCalendar.value,
                        hora: dateCalendar.value.split('T')[1],
                        id_tipo: null,
                        turno: 'M',
                        id_estadocita: 5,
                        id_provendedora: null,
                        id_canal: channel.value,
                        id_frecuencia: frecuencyCalendar.value,
                        fecha: dateCalendar.value.split('T')[0],
                        observaciones: observationCalendar.value,
                        id_duracion: timeCalendar.value,
                        id_forma_pago: methodPayCalendar.value,
                        id_servicio: currentServices.idServicio,
                        id_area: currentServices.area[0].idarea,
                        id_banco: bankCalenda.value,
                        digitos: digitTarjetCalendar.value,
                        id_derma: dermaCalendar.value,
                        id_tipo: null
                    },
                    Citareas: [
                        {
                            id_area: currentServices.area[0].idarea
                        }
                    ]
                }
            }
            fetch(`${rutes.back}${controllers.diary}PostDataAppointment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(jsonData)
            })
            .then(response => response.json())
            .then(result => {
                const { conflicts } = result
                if (conflicts !== null) {
                    Alert('error', conflicts[0].Description)
                    return;
                }
                const { Appointment, id_Cita } = result.SuccesCreateAppointment[0]
                Alert('success', Appointment);
                if(pathname === '/diary') renderInfo();
                closeModalCalendar();
                if(moment(jsonData.Appointment.Cita.fecha).format('L').substring(0,2) === moment().format('L').substring(0,2) && id_rol !== 7) setTimeout(() => {
                    PaymentInstant('¿Desea realizar el cobro?')
                    .then(confirmation => {
                        if(confirmation){
                            openModalMakePayment(id_Cita)
                        }
                    })
                },1500)
            })
            .catch(error => Alert('error', error.message))
        }
        //Estética
        if (formActive === 6) {
            if (frecuencyCalendar.value === '') {
                frecuencyCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (dermaCalendar.value === '') {
                dermaCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (promoterCalendar.value === '') {
                promoterCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (channel.value === '') {
                channel.className = 'form-control is-invalid';
                error++;
            }
            if (tratamientCalendar.value === '') {
                tratamientCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (costCalendar.value === '' || parseFloat(costCalendar.value) <= 0) {
                costCalendar.className = 'form-control is-invalid';
                error++;
            }
            if(typeCalendar.value === ''){
                Alert('warning','El tipo no puede ser vacio')
                error++;
            }
            if (error > 0) return

            const jsonData = {
                Appointment: {
                    Cita: {
                        id_paciente: patient.value.split('-')[0],
                        id_participantes: id_usuario,
                        id_sucursal: id,
                        id_categoria: formActive,
                        precio: costCalendar.value,
                        hora: dateCalendar.value.split('T')[1],
                        turno: 'M',
                        id_estadocita: 5,
                        id_provendedora: promoterCalendar.value,
                        id_canal: channel.value,
                        id_frecuencia: frecuencyCalendar.value,
                        fecha: dateCalendar.value.split('T')[0],
                        observaciones: observationCalendar.value,
                        id_duracion: timeCalendar.value,
                        id_forma_pago: methodPayCalendar.value,
                        id_servicio: tratamientCalendar.value,
                        id_area: 53,
                        id_banco: bankCalenda.value,
                        digitos: digitTarjetCalendar.value,
                        id_derma: dermaCalendar.value,
                        id_cosme: cosmetoCalendar.value,
                        id_tipo: typeCalendar.value
                    },
                    Citareas: [
                        {
                            id_area: 53
                        }
                    ]
                }
            }
            fetch(`${rutes.back}${controllers.diary}PostDataAppointment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(jsonData)
            })
            .then(response => response.json())
            .then(result => {
                const { conflicts } = result
                if (conflicts !== null) {
                    Alert('error', conflicts[0].Description)
                    return;
                }
                const { Appointment, id_Cita } = result.SuccesCreateAppointment[0]
                Alert('success', Appointment);
                if(pathname === '/diary') renderInfo();
                closeModalCalendar();
                if(moment(jsonData.Appointment.Cita.fecha).format('L').substring(0,2) === moment().format('L').substring(0,2) && id_rol !== 7) setTimeout(() => {
                    PaymentInstant('¿Desea realizar el cobro?')
                    .then(confirmation => {
                        if(confirmation){
                            openModalMakePayment(id_Cita)
                        }
                    })
                },1500)
            })
            .catch(error => Alert('error', error.message))
        }
        //Representante Medico
        if (formActive === 7) {
            if (representativeCalendar.value === '') {
                representativeCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (laboratoryRepresentative.value === '') {
                laboratoryRepresentative.className = 'form-control is-invalid';
                error++;
            }
            if (lineProductRepresentative.value === '') {
                lineProductRepresentative.className = 'form-control is-invalid';
                error++;
            }
            if (dermaCalendar.value === '') {
                dermaCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (error > 0) return;
            const jsonData = {
                representative: [
                    {
                        id_repre: representativeCalendar.value.split('-')[0],
                        hora: dateCalendar.value.split('T')[1],
                        laboratorio: laboratoryRepresentative.value,
                        linea_producto: lineProductRepresentative.value,
                        fecha: dateCalendar.value.split('T')[0],
                        id_sucursal: id,
                        id_participantes: id_usuario,
                        id_derma: dermaCalendar.value,
                        id_laboratorio: laboratoryRepresentative.value,
                        id_duracion: timeCalendar.value

                    }
                ]
            }
            fetch(`${rutes.back}${controllers.diary}PostDataRepresentative`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(jsonData)
            })
            .then(response => response.json())
            .then(result => {
                const { conflicts } = result
                if (conflicts !== null) {
                    Alert('error', conflicts[0].Description)
                    return;
                }
                const { representative } = result.SuccesCreateRepresentative[0]
                Alert('success', representative);
                if(pathname === '/diary') renderInfo();
                resetForms();

            })
            .catch(error => Alert('error', error.message))
        }
    } else {
        const indexEarly = allEarlySessions.findIndex(({id_sesion_ant}) => id_sesion_ant === idEarly);
        const currentEarly = allEarlySessions[indexEarly];
        //Consulta
        if (formActive === 1) {
            if (frecuencyCalendar.value === '') {
                frecuencyCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (dermaCalendar.value === '') {
                dermaCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (promoterCalendar.value === '') {
                promoterCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (channel.value === '') {
                channel.className = 'form-control is-invalid';
                error++;
            }
            if (error > 0) return

            const jsonData = {
                Appointment: {
                    Cita: {
                        id_paciente: patient.value.split('-')[0],
                        id_participantes: id_usuario,
                        id_sucursal: id,
                        id_categoria: formActive,
                        precio: currentEarly.Total,
                        hora: dateCalendar.value.split('T')[1],
                        turno: 'M',
                        id_estadocita: 5,
                        id_provendedora: promoterCalendar.value,
                        id_canal: channel.value,
                        id_frecuencia: frecuencyCalendar.value,
                        fecha: dateCalendar.value.split('T')[0],
                        observaciones: observationCalendar.value,
                        id_duracion: timeCalendar.value,
                        id_servicio: currentEarly.id_servicio,
                        id_derma: dermaCalendar.value,
                        id_tipo: null
                    },
                    id_sesion_ant: idEarly,
                },
            }

            fetch(`${rutes.back}${controllers.payments}PostAppoimentAnticipated`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(jsonData)
            })
            .then(response => response.json())
            .then(result => {
                const { conflicts } = result
                if (conflicts !== null) {
                    Alert('error',conflicts[0].Description)
                    return;
                }
                const { Appointment, id_Cita } = result.SuccesCreateAppointment[0]
                Alert('success', Appointment);
                if(pathname === '/diary') renderInfo();
                closeModalCalendar();
            })
            .catch(error => Alert('error',error.message))
        }
        //Facial
        if (formActive === 2) {
            if (frecuencyCalendar.value === '') {
                frecuencyCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (dermaCalendar.value === '') {
                dermaCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (promoterCalendar.value === '') {
                promoterCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (channel.value === '') {
                channel.className = 'form-control is-invalid';
                error++;
            }
            if(typeCalendar.value === ''){
                Alert('warning','El tipo no puede ser vacio')
                error++;
            }
            if (error > 0) return
            
            const jsonData = {
                Appointment: {
                Cita: {
                        id_paciente: patient.value.split('-')[0],
                        id_participantes: id_usuario,
                        id_sucursal: id,
                        id_categoria: formActive,
                        precio: currentEarly.Total,
                        hora: dateCalendar.value.split('T')[1],
                        turno: 'M',
                        id_estadocita: 5,
                        id_provendedora: promoterCalendar.value,
                        id_canal: channel.value,
                        id_frecuencia: frecuencyCalendar.value,
                        fecha: dateCalendar.value.split('T')[0],
                        observaciones: observationCalendar.value,
                        id_duracion: timeCalendar.value,
                        id_forma_pago: methodPayCalendar.value,
                        id_servicio: currentEarly.id_servicio,
                        id_banco: bankCalenda.value,
                        digitos: digitTarjetCalendar.value,
                        id_derma: dermaCalendar.value,
                        id_cosme: cosmetoCalendar.value,
                        id_tipo: typeCalendar.value
                    },
                    id_sesion_ant: idEarly,
                },
            }      
            fetch(`${rutes.back}${controllers.payments}PostAppoimentAnticipated`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(jsonData)
            })
            .then(response => response.json())
            .then(result => {
                const { conflicts } = result
                if (conflicts !== null) {
                    Alert('error', conflicts[0].Description)
                    return;
                }
                const { Appointment, id_Cita } = result.SuccesCreateAppointment[0]
                Alert('success', Appointment);
                if(pathname === '/diary') renderInfo();
                closeModalCalendar();
            })
            .catch(error => Alert('error', error.message))

        }
        //Aparatología
        if (formActive === 3) {
            if (frecuencyCalendar.value === '') {
                frecuencyCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (dermaCalendar.value === '') {
                dermaCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (promoterCalendar.value === '') {
                promoterCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (channel.value === '') {
                channel.className = 'form-control is-invalid';
                error++;
            }     
            if(typeCalendar.value === ''){
                Alert('warning','El tipo no puede ser vacio')
                error++;
            }       
            if (error > 0) return
            const jsonData = {
                Appointment: {
                    Cita: {
                        id_paciente: patient.value.split('-')[0],
                        id_participantes: id_usuario,
                        id_sucursal: id,
                        id_categoria: formActive,
                        precio: currentEarly.Total,
                        hora: dateCalendar.value.split('T')[1],
                        turno: 'M',
                        id_estadocita: 5,
                        id_provendedora: promoterCalendar.value,
                        id_canal: channel.value,
                        id_frecuencia: frecuencyCalendar.value,
                        fecha: dateCalendar.value.split('T')[0],
                        observaciones: observationCalendar.value,
                        id_duracion: timeCalendar.value,
                        id_forma_pago: methodPayCalendar.value,
                        id_servicio: currentEarly.id_servicio,
                        id_banco: bankCalenda.value,
                        digitos: digitTarjetCalendar.value,
                        id_derma: dermaCalendar.value,
                        id_cosme: cosmetoCalendar.value,
                        id_tipo: typeCalendar.value
                    },
                    id_sesion_ant: idEarly,
                }
            }
            fetch(`${rutes.back}${controllers.payments}PostAppoimentAnticipated`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(jsonData)
            })
            .then(response => response.json())
            .then(result => {
                const { conflicts } = result
                if (conflicts !== null) {
                    Alert('error', conflicts[0].Description)
                    return;
                }
                const { Appointment, id_Cita } = result.SuccesCreateAppointment[0]
                Alert('success', Appointment);
                if(pathname === '/diary') renderInfo();
                closeModalCalendar();
            })
            .catch(error => Alert('error', error.message))
        }
        //Dermapen
        if (formActive === 4) {
            if (frecuencyCalendar.value === '') {
                frecuencyCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (dermaCalendar.value === '') {
                dermaCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (promoterCalendar.value === '') {
                promoterCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (channel.value === '') {
                channel.className = 'form-control is-invalid';
                error++;
            }
            if(typeCalendar.value === ''){
                Alert('warning','El tipo no puede ser vacio')
                error++;
            }
            if (error > 0) return

            const jsonData = {
                Appointment: {
                    Cita: {
                        id_paciente: patient.value.split('-')[0],
                        id_participantes: id_usuario,
                        id_sucursal: id,
                        id_categoria: formActive,
                        precio: currentEarly.Total,
                        hora: dateCalendar.value.split('T')[1],
                        turno: 'M',
                        id_estadocita: 5,
                        id_provendedora: promoterCalendar.value,
                        id_canal: channel.value,
                        id_frecuencia: frecuencyCalendar.value,
                        fecha: dateCalendar.value.split('T')[0],
                        observaciones: observationCalendar.value,
                        id_duracion: timeCalendar.value,
                        id_forma_pago: methodPayCalendar.value,
                        id_servicio: currentEarly.id_servicio,
                        id_banco: bankCalenda.value,
                        digitos: digitTarjetCalendar.value,
                        id_derma: dermaCalendar.value,
                        id_cosme: cosmetoCalendar.value,
                        id_tipo: typeCalendar.value
                    },
                    id_sesion_ant: idEarly,
                }
            }
            fetch(`${rutes.back}${controllers.payments}PostAppoimentAnticipated`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(jsonData)
            })
                .then(response => response.json())
                .then(result => {
                    const { conflicts } = result
                    if (conflicts !== null) {
                        Alert('error', conflicts[0].Description)
                        return;
                    }
                    const { Appointment, id_Cita } = result.SuccesCreateAppointment[0]
                    Alert('success', Appointment);
                    if(pathname === '/diary') renderInfo();
                    closeModalCalendar();
                })
                .catch(error => Alert('error', error.message))
        }
        //Curación
        if (formActive === 5) {
            if (frecuencyCalendar.value === '') {
                frecuencyCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (dermaCalendar.value === '') {
                dermaCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (channel.value === '') {
                channel.className = 'form-control is-invalid';
                error++;
            }
            if (error > 0) return

            const jsonData = {
                Appointment: {
                    Cita: {
                        id_paciente: patient.value.split('-')[0],
                        id_participantes: id_usuario,
                        id_sucursal: id,
                        id_categoria: formActive,
                        precio: currentEarly.Total,
                        hora: dateCalendar.value.split('T')[1],
                        id_tipo: null,
                        turno: 'M',
                        id_estadocita: 5,
                        id_provendedora: null,
                        id_canal: channel.value,
                        id_frecuencia: frecuencyCalendar.value,
                        fecha: dateCalendar.value.split('T')[0],
                        observaciones: observationCalendar.value,
                        id_duracion: timeCalendar.value,
                        id_forma_pago: methodPayCalendar.value,
                        id_servicio: currentEarly.id_servicio,
                        id_area: currentServices.area[0].idarea,
                        id_banco: bankCalenda.value,
                        digitos: digitTarjetCalendar.value,
                        id_derma: dermaCalendar.value,
                        id_tipo: null
                    },
                    id_sesion_ant: idEarly,
                }
            }
            fetch(`${rutes.back}${controllers.payments}PostAppoimentAnticipated`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(jsonData)
            })
            .then(response => response.json())
            .then(result => {
                const { conflicts } = result
                if (conflicts !== null) {
                    Alert('error', conflicts[0].Description)
                    return;
                }
                const { Appointment, id_Cita } = result.SuccesCreateAppointment[0]
                Alert('success', Appointment);
                if(pathname === '/diary') renderInfo();
                closeModalCalendar();
            })
            .catch(error => Alert('error', error.message))
        }
        //Estética
        if (formActive === 6) {
            if (frecuencyCalendar.value === '') {
                frecuencyCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (dermaCalendar.value === '') {
                dermaCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (promoterCalendar.value === '') {
                promoterCalendar.className = 'form-control is-invalid';
                error++;
            }
            if (channel.value === '') {
                channel.className = 'form-control is-invalid';
                error++;
            }      
            if(typeCalendar.value === ''){
                Alert('warning','El tipo no puede ser vacio')
                error++;
            }      
            if (error > 0) return

            const jsonData = {
                Appointment: {
                    Cita: {
                        id_paciente: patient.value.split('-')[0],
                        id_participantes: id_usuario,
                        id_sucursal: id,
                        id_categoria: formActive,
                        precio: currentEarly.Total,
                        hora: dateCalendar.value.split('T')[1],
                        turno: 'M',
                        id_estadocita: 5,
                        id_provendedora: promoterCalendar.value,
                        id_canal: channel.value,
                        id_frecuencia: frecuencyCalendar.value,
                        fecha: dateCalendar.value.split('T')[0],
                        observaciones: observationCalendar.value,
                        id_duracion: timeCalendar.value,
                        id_forma_pago: methodPayCalendar.value,
                        id_servicio: currentEarly.id_servicio,
                        id_area: 53,
                        id_banco: bankCalenda.value,
                        digitos: digitTarjetCalendar.value,
                        id_derma: dermaCalendar.value,
                        id_cosme: cosmetoCalendar.value,
                        id_tipo: typeCalendar.value
                    },
                    id_sesion_ant: idEarly,
                }
            }
            fetch(`${rutes.back}${controllers.payments}PostAppoimentAnticipated`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(jsonData)
            })
            .then(response => response.json())
            .then(result => {
                const { conflicts } = result
                if (conflicts !== null) {
                    Alert('error', conflicts[0].Description)
                    return;
                }
                const { Appointment, id_Cita } = result.SuccesCreateAppointment[0]
                Alert('success', Appointment);
                if(pathname === '/diary') renderInfo();
                closeModalCalendar();
            })
            .catch(error => Alert('error', error.message))
        }
    }

    button_consultation.checked = false;
    button_face.checked = false;
    button_appliances.checked = false;
    button_dermapen.checked = false;
    button_healing.checked = false;
    button_esthetic.checked = false;
    button_representative.checked = false;
}
/* Agregar cita fin */
const resetForms = () => {
    dateCalendar.className = 'form-control';
    timeCalendar.className = 'form-control';
    patient.className = 'form-control';
    category.className = 'form-control'
    channel.className = 'form-control'
    //services.className = 'form-control'
    prometer.className = 'form-control'
    status.className = 'form-control'
    dermaCalendar.className = 'form-control'
    frecuencyCalendar.className = 'form-control'
    duration.className = 'form-control'
    methodPayCalendar.className = 'form-control'
    bankCalenda.className = 'form-control'
    typePayCalendar.className = 'form-control'
    digitTarjetCalendar.className = 'form-control'
    observationCalendar.className = 'form-control'
    cosmetoCalendar.className = 'form-control'
    typeCalendar.className = 'form-control'
    tratamientCalendar.className = 'form-control'
    //areaCalendar.className = 'form-control'
    representativeCalendar.className = 'form-control'
    laboratoryRepresentative.className = 'form-control'
    lineProductRepresentative.className = 'form-control'

    container_channel.style.display = 'none';
    container_service.style.display = 'none';
    container_prometer.style.display = 'none';
    container_status.style.display = 'none';
    container_dermaCalendar.style.display = 'none';
    container_frecuencyCalendar.style.display = 'none';
    container_methodPayCalendar.style.display = 'none';
    container_bankCalenda.style.display = 'none';
    container_typePayCalendar.style.display = 'none';
    container_digitTarjetCalendar.style.display = 'none';
    container_observationCalendar.style.display = 'none';
    container_cosmetoCalendar.style.display = 'none';
    container_typeCalendar.style.display = 'none';
    container_tratamientCalendar.style.display = 'none';
    container_areaCalendar.style.display = 'none';
    container_areaCalendar.className = 'd-none';
    container_costCalendar.style.display = 'none';

    costCalendar.value = 0;
    priceCalendar.innerHTML = 0;
    currentPrice = 0;
    dateCalendar.value = '';
    timeCalendar.value = '';
    patient.value = '';
    category.value = "";
    channel.value = "";
    service.value = "";
    prometer.value = "";
    status.value = "";
    dermaCalendar.value = "";
    frecuencyCalendar.value = "";
    patientCalendar.value = "";
    duration.value = "";
    methodPayCalendar.value = "";
    bankCalenda.value = "";
    typePayCalendar.value = "";
    digitTarjetCalendar.value = "";
    observationCalendar.value = "";
    cosmetoCalendar.value = "";
    priceCalendar.value = "";
    typeCalendar.value = '';
    tratamientCalendar.value = '';
    areaCalendar.value = '';
    currentTratamient = [];
    currentServices = [];
    var options = document.querySelectorAll('#tratamientCalendar option');
    options.forEach((o, index) => index !== 0 && o.remove());
    //var options = document.querySelectorAll('#areaCalendar option');
    //options.forEach((o, index) => index !== 0 && o.remove());
    timeCalendar.value = 1;
    //Representante medico
    container_patientListCalendar.style.display = 'inline';
    container_representativeCalendar.style.display = 'none';
    container_laboratoryRepresentative.style.display = 'none';
    container_lineProductRepresentative.style.display = 'none';
    representativeCalendar.value = "";
    laboratoryRepresentative.value = "";
    lineProductRepresentative.value = "";

    $('#modalCalendar').modal('hide');
}
const changePayMethod = () => {
    const { TypePay } = calendarInfo[0];
    const indexPay = TypePay.findIndex(element => element.id_forma_pago === parseInt(methodPayCalendar.value))
    const { id_forma_pago, descripcion } = TypePay[indexPay]; 

    if (descripcion === 'Tarjeta de débito' || descripcion === 'Tarjeta de crédito') {
        //container_typePayCalendar.style.display = 'inline';
        container_digitTarjetCalendar.style.display = 'inline';     
        container_bankCalenda.style.display = 'inline';     
    }
    else {
        container_typePayCalendar.style.display = 'none';
        container_digitTarjetCalendar.style.display = 'none';
        container_bankCalenda.style.display = 'none';     

    }
}
const changeTratamient = () => {
    var options = document.querySelectorAll('#areaCalendar option');
    options.forEach((o, index) => index !== 0 && o.remove());
    areaCalendar.value = '';
    priceCalendar.innerHTML = 0;
    currentPrice = 0;
    const { Servicio, idCategoria } = currentTratamient
    if (idCategoria === 4 || idCategoria === 6) return;
    const indexServices = Servicio.findIndex(element => element.idServicio === parseInt(tratamientCalendar.value))
    const { idServicio } = Servicio[indexServices]
    if (idServicio === 23) {
        container_areaCalendar.style.display = 'none';
        container_areaCalendar.className = 'd-none';
        container_costCalendar.style.display = 'inline';
        return
    } else if (idCategoria === 3) {
        container_costCalendar.style.display = 'none'
    }
    let data = [];
    $('#areaCalendar').select2("destroy")
    Servicio[indexServices].area.map(({ Precio, area, idarea }) => {
        data.push({ id: `${idarea}-${Precio}`, text: area})
        //let option = document.createElement('option')
        //option.value = `${idarea}-${Precio}`
        //option.label = `${area}`
        //areaCalendar.append(option)
    })
    $('#areaCalendar').select2({
        dropdownParent: $('#modalCalendar'),
        placeholder: 'Selecciona el/las area',
        language: "es",
        data
    });    
    container_areaCalendar.style.display = 'inline';
    container_areaCalendar.className = 'd-flex flex-column m-1';
}
const changeArea = () => {
    let currenPriceSelect = 0;

    $("#areaCalendar").val().map(element => currenPriceSelect += parseInt(element.split("-")[1]))

    currentPrice = currenPriceSelect;
    priceCalendar.innerHTML = `${currentPrice.toLocaleString("en", {
        style: "currency",
        currency: "MXN"
    })}`;
}
const changeCost = () => {
    if(costCalendar.value === ''){
        costCalendar.value = 0;
    }
    const Price = costCalendar.value === '' ? 0 : parseInt(costCalendar.value)
    priceCalendar.innerHTML = Price.toLocaleString("en", {
        style: "currency",
        currency: "MXN"
    });
}
const changeCategory = (id) => {
    container_patientListCalendar.style.display = 'inline';
    container_channel.style.display = 'none';
    container_service.style.display = 'none';
    container_prometer.style.display = 'none';
    container_status.style.display = 'none';
    container_dermaCalendar.style.display = 'none';
    container_frecuencyCalendar.style.display = 'none';
    container_methodPayCalendar.style.display = 'none';
    container_bankCalenda.style.display = 'none';
    container_typePayCalendar.style.display = 'none';
    container_digitTarjetCalendar.style.display = 'none';
    container_observationCalendar.style.display = 'none';
    container_cosmetoCalendar.style.display = 'none';
    container_typeCalendar.style.display = 'none';
    container_tratamientCalendar.style.display = 'none';
    container_areaCalendar.style.display = 'none';
    container_areaCalendar.className = 'd-none';
    container_costCalendar.style.display = 'none';
    container_earlyAppoiment.style.display = 'none';

    costCalendar.value = 0;
    priceCalendar.innerHTML = 0;
    currentPrice = 0;
    category.value = "";
    channel.value = 1;
    service.value = "";
    prometer.value = 7;
    status.value = "";
    dermaCalendar.value = 9;
    frecuencyCalendar.value = 1;
    patientCalendar.value = "";
    duration.value = "";
    methodPayCalendar.value = "";
    bankCalenda.value = "";
    typePayCalendar.value = "";
    digitTarjetCalendar.value = "";
    observationCalendar.value = "";
    cosmetoCalendar.value = 2;
    priceCalendar.value = "";
    typeCalendar.value = '';
    tratamientCalendar.value = '';
    areaCalendar.value = '';
    currentTratamient = [];
    currentServices = [];
    var options = document.querySelectorAll('#tratamientCalendar option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#areaCalendar option');
    options.forEach((o, index) => index !== 0 && o.remove());
    timeCalendar.value = 1;
    //Representante medico
    container_representativeCalendar.style.display = 'none';
    container_laboratoryRepresentative.style.display = 'none';
    container_lineProductRepresentative.style.display = 'none';
    representativeCalendar.value = "";
    laboratoryRepresentative.value = "";
    lineProductRepresentative.value = "";

    patient.readOnly = false;
    if(patient.value.length < 5) buttonPatientCalendar.disabled = true;

    //Pago anticipado
    activeEarly = false;
    idEarly = 0;

    const categorySelect = parseInt(category.value)

    const { Category } = calendarInfo[0];
    let indexCat = false;
    
    changeDermaAppoiment();
    //consulta
    if (id === 1) {
        indexCat = Category.findIndex(element => element.idCategoria === id);
        const { Precio } = Category[indexCat].Servicio[0].area[0];
        currentServices = Category[indexCat].Servicio[0];
        container_frecuencyCalendar.style.display = 'inline';
        container_dermaCalendar.style.display = 'inline';
        container_channel.style.display = 'inline';
        container_prometer.style.display = 'inline';
        container_observationCalendar.style.display = 'inline';

        //container_methodPayCalendar.style.display = 'inline';
        priceCalendar.innerHTML = `${Precio.toLocaleString("en", {
            style: "currency",
            currency: "MXN"
        })}`;
        formActive = 1;
        changePatient();
        return
    }
    //facial
    if (id === 2) {
        container_frecuencyCalendar.style.display = 'inline';
        container_dermaCalendar.style.display = 'inline';
        container_channel.style.display = 'inline';
        container_prometer.style.display = 'inline';
        container_cosmetoCalendar.style.display = 'inline'
        container_typeCalendar.style.display = 'inline'
        container_observationCalendar.style.display = 'inline';

        //container_methodPayCalendar.style.display = 'inline';
        indexCat = Category.findIndex(element => element.idCategoria === id);
        Category[indexCat].Servicio.map(({ idServicio, servicios }) => {
            let option = document.createElement('option')
            option.value = `${idServicio}`
            option.label = `${servicios}`
            tratamientCalendar.append(option)
        })
        currentTratamient = Category[indexCat];
        container_tratamientCalendar.style.display = 'inline';
        formActive = 2;
        changePatient();
        return
    }
    //aparatologia
    if (id === 3) {
        container_frecuencyCalendar.style.display = 'inline';
        container_dermaCalendar.style.display = 'inline';
        container_channel.style.display = 'inline';
        container_prometer.style.display = 'inline';
        container_cosmetoCalendar.style.display = 'inline'
        container_typeCalendar.style.display = 'inline'
        container_observationCalendar.style.display = 'inline';

        //container_methodPayCalendar.style.display = 'inline';
        indexCat = Category.findIndex(element => element.idCategoria === id);
        Category[indexCat].Servicio.map(({ idServicio, servicios }) => {
            let option = document.createElement('option')
            option.value = `${idServicio}`
            option.label = `${servicios}`
            tratamientCalendar.append(option)
        })
        currentTratamient = Category[indexCat];
        container_tratamientCalendar.style.display = 'inline';
        formActive = 3;
        changePatient();
        return
    }
    //dermapen
    if (id === 4) {
        container_frecuencyCalendar.style.display = 'inline';
        container_dermaCalendar.style.display = 'inline';
        container_channel.style.display = 'inline';
        container_prometer.style.display = 'inline';
        container_cosmetoCalendar.style.display = 'inline'
        container_typeCalendar.style.display = 'inline'
        container_observationCalendar.style.display = 'inline';

        //container_methodPayCalendar.style.display = 'inline';
        container_costCalendar.style.display = 'inline';
        label_costCalendar.innerHTML = 'Total dermapen'

        indexCat = Category.findIndex(element => element.idCategoria === id);
        Category[indexCat].Servicio.map(({ idServicio, servicios }) => {
            let option = document.createElement('option')
            option.value = `${idServicio}`
            option.label = `${servicios}`
            tratamientCalendar.append(option)
        })
        currentTratamient = Category[indexCat];
        container_tratamientCalendar.style.display = 'inline';
        formActive = 4;
        changePatient();
        return
    }
    //curacion
    if (id === 5) {
        indexCat = Category.findIndex(element => element.idCategoria === id);
        currentServices = Category[indexCat].Servicio[0];
        container_frecuencyCalendar.style.display = 'inline';
        container_dermaCalendar.style.display = 'inline';
        container_channel.style.display = 'inline';
        //container_methodPayCalendar.style.display = 'inline'
        container_observationCalendar.style.display = 'inline';
        container_costCalendar.style.display = 'inline';
        label_costCalendar.innerHTML = 'Total curación';
        formActive = 5;
        changePatient();
        return
    }
    //estetica
    if (id === 6) {
        container_frecuencyCalendar.style.display = 'inline';
        container_dermaCalendar.style.display = 'inline';
        container_channel.style.display = 'inline';
        container_prometer.style.display = 'inline';
        container_cosmetoCalendar.style.display = 'inline'
        container_typeCalendar.style.display = 'inline'
        container_observationCalendar.style.display = 'inline';

        //container_methodPayCalendar.style.display = 'inline';
        container_costCalendar.style.display = 'inline';
        label_costCalendar.innerHTML = 'Total estética'

        indexCat = Category.findIndex(element => element.idCategoria === id);
        Category[indexCat].Servicio.map(({ idServicio, servicios }) => {
            let option = document.createElement('option')
            option.value = `${idServicio}`
            option.label = `${servicios}`
            tratamientCalendar.append(option)
        })
        currentTratamient = Category[indexCat];
        container_tratamientCalendar.style.display = 'inline';
        formActive = 6;
        changePatient();
        return
    }
    //representante medico
    if (id === 7) {
        container_patientListCalendar.style.display = 'none';
        container_representativeCalendar.style.display = 'inline';
        container_laboratoryRepresentative.style.display = 'inline';
        container_lineProductRepresentative.style.display = 'inline';
        container_dermaCalendar.style.display = 'inline';
        formActive = 7;
        return
    }
}
const changePatient = () => { 
    if(patient.value.length > 4)  buttonPatientCalendar.disabled = false;
    else buttonPatientCalendar.disabled = true;
    if(patient.value !== '' && patient.value.length > 7 && patient.value.includes('-') && !isNaN(parseInt(patient.value)) && formActive){
        const idPatient = patient.value.split('-')[0];
        fetch(`${rutes.back}${controllers.payments}GetEarlySessionsPackage?idPatient=${idPatient}&idCategory=${formActive}`)
        .then(response => response.json())
        .then(result => {
            const { EarlySessionsPackage } = result.EarlySessions[0];
            container_earlyAppoiment.style.display = EarlySessionsPackage.length > 0  &&  'block' || 'none';
            allEarlySessions = EarlySessionsPackage;
            let html = '';
            EarlySessionsPackage.map(early => {
                const  {
                    Servicio,
                    Areas,
                    Total,
                    id_sesion_ant,
                    Sesion
                } = early;
                html += `<section class="d-flex flex-row flex-nowrap justify-content-between">
                            <section class="d-flex flex-column p-2">
                                <h2 class="fw-bold" style="font-size: 12px;">Tratamiento</h2>
                                <h2 class="text-center" style="font-size: 12px;">${Servicio}</h2>
                            </section>
                            <section class="d-flex flex-column p-2">
                                <h2 class="fw-bold text-center" style="font-size: 12px;">Area/s</h2>
                                <section class="d-flex flex-row flex-wrap m-1 w-100">
                                    ${Areas.map(area => `<span class="badge text-bg-primary bg-primary m-1" style="max-width: 80%; font-size: 9px !important;">${area}</span>`)}
                                </section>
                            </section>
                            <section class="d-flex flex-column p-2">
                                <h2 class="fw-bold" style="font-size: 12px;">Precio</h2>
                                <h2 class="text-center" style="font-size: 12px;">$${Total}</h2>
                            </section>
                            <section class="d-flex flex-column p-2">
                                <h2 class="fw-bold" style="font-size: 12px;">Tomar</h2>
                                <div class="d-flex flex-row align-items-center">
                                <div class="checkbox-wrapper-12 ms-0 m-2">
                                        <div class="cbx">
                                            <input id="cbx-take-${id_sesion_ant}" type="checkbox" onclick="takeSession(${id_sesion_ant})">
                                            <label for="cbx-traumatic"></label>
                                            <svg width="11" height="14" viewBox="0 0 15 14" fill="none">
                                                <path d="M2 8.36364L6.23077 12L13 2"></path>
                                            </svg>
                                        </div>

                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                                            <defs>
                                                <filter id="goo-12">
                                                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"></feGaussianBlur>
                                                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" result="goo-12"></feColorMatrix>
                                                    <feBlend in="SourceGraphic" in2="goo-12"></feBlend>
                                                </filter>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>
                            </section>
                        </section>
                        <hr />`
            })

            list_earlyAppoiment.innerHTML = html;
        })
        .catch(error => Alert('error', error.message))
    }
}
const takeSession = (id) => {
    // activeEarly
    // idEarly
    allEarlySessions.map(session => {
        const { 
            Sesion,
            id_sesion_ant,
            Total,
            id_derma,
            id_cosme,
            id_frecuencia,
            id_tipo,
            id_canal
        } = session       
        if(id_sesion_ant !== parseInt(id)) document.getElementById(`cbx-take-${id_sesion_ant}`).checked = false;
        if(id_sesion_ant === parseInt(id)){
            let checked = document.getElementById(`cbx-take-${id_sesion_ant}`).checked
            if(!checked){
                activeEarly = false;
                idEarly = 0;
                changeCategory(formActive)
            }else{
                activeEarly = true;
                idEarly = id_sesion_ant;

                container_areaCalendar.className = 'd-none';
                container_tratamientCalendar.style.display = 'none';
                container_costCalendar.style.display = 'none';

                patient.readOnly = true;
                buttonPatientCalendar.disabled = true;

                priceCalendar.innerHTML = Total.toLocaleString("en", {
                    style: "currency",
                    currency: "MXN"
                })
                frecuencyCalendar.value = id_frecuencia;
                dermaCalendar.value = id_derma;
                typeCalendar.value = id_tipo ? id_tipo : '';
                cosmetoCalendar.value = id_cosme ? id_cosme : 2;
                channel.value = id_canal ? id_canal : 1;
                changeDermaAppoiment();
            }
        }
    })
}
/* Agendar Cita Fin */

$('#areaCalendar').select2({
    dropdownParent: $('#modalFinish'),
    placeholder: 'Selecciona el/las area',
    language: "es",
    data: [
        { id: 'title', text: '-- Areas --', disabled: true}
    ]
});
$('#areaCalendarEdit').select2({
    dropdownParent: $('#modalFinish'),
    placeholder: 'Selecciona el/las area',
    language: "es",
    data: [
        { id: 'titles', text: '-- Areas --', disabled: true }
    ]
});
$('#areaCalendarEarlySession').select2({
    dropdownParent: $('#modalFinish'),
    placeholder: 'Selecciona el/las area',
    language: "es",
    data: [
        { id: 'titles', text: '-- Areas --', disabled: true }
    ]
});
$('#paymentsDerma').select2({
    dropdownParent: $('#modalFinish'),
    placeholder: 'Selecciona el dermatologo',
    language: "es",
    data: [
        { id: 'titles', text: '-- Dermatologo --', disabled: true }
    ]
});