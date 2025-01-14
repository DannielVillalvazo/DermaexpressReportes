/* Llamamos las variables de entorno */
const envPatient = envirement();

/* Elementos globales */
let $tablePatient = $('#tableUsers');
let $tableVitalSign = $('#tableVitalSign');
let $tableResultsData = $('#tableResultsFiles');
let $tableHistoryAppoiments = $('#tableHistoryAppoiments');
let $tableElectronicPrescription = $('#tableElectronicPrescription');
let $tablePrepaid = $('#tablePrepaid');
let $tablePrepaidAnt = $('#tablePrepaidAnt');

let infoPatient = [];
let infoGeneral = [];

let cpInfoAddress = [];
let cpInfoBilling = [];
let cpInfoResponsible = [];

let backInfo = [];
let backAddress = [];
let backBilling = [];
let backAntecedentes = [];
let backNoAntecedentes = [];
let backResponsible = [];
let backHereditary = [];
let backAllergies = [];

let idUser = 0;
let lastExpanded = false
let historyAppoimetnActive = 0;
let reasonDeleteEdit = [];
let notesEvolutions = [];
let openDirection = null;
/*SubMenus*/
let dataSheet = document.getElementById('dataSheet');

let clinicHistory = document.getElementById('clinicHistory');
let subgroup_historyClinic = document.getElementById('subgroup-historyClinic');
let form_clinicHistoryPatologiss = document.getElementById('form-clinicHistoryPatologis');
let form_clinicHistoryNoPatologis = document.getElementById('form-clinicHistoryNoPatologis');
let form_hereditary = document.getElementById('form-hereditary');
let form_vitalSigns = document.getElementById('form-vitalSigns');
let form_allergies = document.getElementById('form-allergies');
let form_results = document.getElementById('form-results');

let electronicPrescription = document.getElementById('electronicPrescription');

let appoimentHistory = document.getElementById('appoimentHistory');
let subgroup_appoimentHistory = document.getElementById('subgroup-appoimentHistory');

let Prepaid = document.getElementById('Prepaid');
let subgroup_Prepaid = document.getElementById('subgroup-Prepaid');
/*SubMenus*/

/* Menu historial clinica */
let btnHistoryClinic1 = document.getElementById('btnHistoryClinic1');
let btnHistoryClinic2 = document.getElementById('btnHistoryClinic2');
let btnHistoryClinic3 = document.getElementById('btnHistoryClinic3');
let btnHistoryClinic4 = document.getElementById('btnHistoryClinic4');
let btnHistoryClinic5 = document.getElementById('btnHistoryClinic5');
let btnHistoryClinic6 = document.getElementById('btnHistoryClinic6');
/* Menu historial clinica */

/*Datos generales*/
let infoExp = document.getElementById('expInfoUser');
let infoCurp = document.getElementById('curpInfoUser');
let infoName = document.getElementById('nameInfoUser');
let infolastpather = document.getElementById('lastnamePInfoUser');
let infolastmother = document.getElementById('lastnameMInfoUser');
let infodate = document.getElementById('dateInfoUser');
let yearsInfoUser = document.getElementById('yearsInfoUser');
let infosex = document.getElementById('selectSexInfoUser');
let infojob = document.getElementById('jobInfoUser');
let infostate = document.getElementById('stateInfoUser');
let infocountry = document.getElementById('countryInfoUser');
let infoemail = document.getElementById('emailInfoUser');
let inforaza = document.getElementById('razaInfoUser');
let inforeligion = document.getElementById('religionInfoUser');
let infophone = document.getElementById('phoneInfoUser');
let civilStatusInfoUser = document.getElementById('civilStatusInfoUser');
/*Datos generales fin*/

/*Datos direccion*/
let street = document.getElementById('streetInfoAddress');
let extnumber = document.getElementById('neNumberInfoAddress');
let innumber = document.getElementById('inNumberInfoAddresst');
let postalcode = document.getElementById('postalcodeInfoAddress');
let neigh = document.getElementById('neighInfoAddress');
let state = document.getElementById('stateInfoAddress');
let city = document.getElementById('cityInfoAddress');
let country = document.getElementById('countryInfoAddress');
/*Datos direccion fin*/

/*Datos Facturacion*/
let rfcBilling = document.getElementById('rfcBilling');
let cfdiBilling = document.getElementById('cfdiBilling');
let regimenBilling = document.getElementById('regimenBilling');
let reasonBilling = document.getElementById('reasonBilling');
let numberBilling = document.getElementById('numberBilling');
let emailBilling = document.getElementById('emailBilling');
let streetBilling = document.getElementById('streetBilling');
let neNumberBilling = document.getElementById('neNumberBilling');
let inNumberBilling = document.getElementById('inNumberBilling');
let stateBilling = document.getElementById('stateBilling');
let cityBilling = document.getElementById('cityBilling');
let localBilling = document.getElementById('localBilling');
let ngBilling = document.getElementById('ngBilling');
let postalcodeBilling = document.getElementById('postalcodeBilling');
let countryBilling = document.getElementById('countryBilling');
/*Datos Facturacion fin*/

/*Datos Responsable */
let nameResponsible = document.getElementById('nameResponsible');
let lastPaResponsible = document.getElementById('lastPaResponsible');
let lastMoResponsible = document.getElementById('lastMoResponsible');
let streetResponsible = document.getElementById('streetResponsible');
let neNumberResponsible = document.getElementById('neNumberResponsible');
let inNumberResponsible = document.getElementById('inNumberResponsible');
let postalcodeResponsible = document.getElementById('postalcodeResponsible');
let ngResponsible = document.getElementById('ngResponsible');
let cityResponsible = document.getElementById('cityResponsible');
let stateResponsible = document.getElementById('stateResponsible');
let countryResponsible = document.getElementById('countryResponsible');
let phoneResponsible = document.getElementById('phoneResponsible');
let emailResponsible = document.getElementById('emailResponsible');
/*Datos Responsable fin*/

/*Despegables */
let countryList = document.getElementById('list-infocountrys');
let razaList = document.getElementById('razaInfoUser');
let religionList = document.getElementById('religionInfoUser');
let sexList = document.getElementById('selectSexInfoUser');
let stateList = document.getElementById('stateInfoUser');
let billingList = document.getElementById('cfdiBilling');
let regimenList = document.getElementById('regimenBilling');
/*Despegables fin*/


/* expresiones regulares */
const regexRFC = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const regexPhone = /^\(?(\d{3})\)?[-]?(\d{3})[-]?(\d{4})$/
const regexOnlyChart = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g
/* expresiones regulares fin */

/* Antecedentes patologicos */
let cbx_hospitalitation = document.getElementById('cbx-hospitalitation');
let cbx_surgical = document.getElementById('cbx-surgical');
let cbx_traumatic = document.getElementById('cbx-traumatic');
let cbx_transfusionales = document.getElementById('cbx-transfusionales');
let cbx_Exantema = document.getElementById('cbx-Exantema');
let cbx_escarlatina = document.getElementById('cbx-escarlatina');
let cbx_Rubeola = document.getElementById('cbx-Rubeola');
let cbx_Sarampion = document.getElementById('cbx-Sarampion');
let cbx_Varicela = document.getElementById('cbx-Varicela');
let cbx_otherPatology = document.getElementById('cbx-otherPatology');
let cbx_infectocontagiosas = document.getElementById('cbx-infectocontagiosas');
let cbx_Fiebre = document.getElementById('cbx-Fiebre');
let cbx_Hepatitis = document.getElementById('cbx-Hepatitis');
let cbx_Parasitosis = document.getElementById('cbx-Parasitosis');
let cbx_Tifoidea = document.getElementById('cbx-Tifoidea');
let cbx_sexual = document.getElementById('cbx-sexual');
let cbx_Tuberculosis = document.getElementById('cbx-Tuberculosis');
let cbx_Diabetes = document.getElementById('cbx-Diabetes');
let cbx_arterial = document.getElementById('cbx-arterial');
let cbx_Dislipidemias = document.getElementById('cbx-Dislipidemias');
let cbx_Obesidad = document.getElementById('cbx-Obesidad');
let cbx_Neoplasicas = document.getElementById('cbx-Neoplasicas');
let cbx_reumatologicas = document.getElementById('cbx-reumatologicas');
let cbx_nephropathy = document.getElementById('cbx-nephropathy');
let cbx_heartdisease = document.getElementById('cbx-heartdisease');
let cbx_hepatopathy = document.getElementById('cbx-hepatopathy');
let cbx_neuropathy = document.getElementById('cbx-neuropathy');
let cbx_gastrointestinaldisease = document.getElementById('cbx-gastrointestinaldisease');
let cbx_autoimmunedisease = document.getElementById('cbx-autoimmunedisease');
let cbx_ovarysyndrome = document.getElementById('cbx-ovarysyndrome');


let cbx_others = document.getElementById('cbx-others');
/* Antecedentes patologicos fin */

/* Antecedentes no patologicos */
let info_smoking = document.getElementById('info-smoking');
let info_alcoholism = document.getElementById('info-alcoholism');
let info_drugaddiction = document.getElementById('info-drugaddiction');
let info_feeding = document.getElementById('info-feeding');
let info_sports = document.getElementById('info-sports');
let info_immunizations = document.getElementById('info-immunizations');
let info_hypersensitivity = document.getElementById('info-hypersensitivity');
let info_sexualactivity = document.getElementById('info-sexualactivity');
let info_hygiene = document.getElementById('info-hygiene');
let info_lastmenstruation = document.getElementById('info-lastmenstruation');
let info_contraceptivemethods = document.getElementById('info-contraceptivemethods');
let info_pregnancy = document.getElementById('info-pregnancy');
/* Antecedentes no patologicos fin */

/* heredofamiliares */
//Atopia
let cbx_hfatf = document.getElementById('cbx-hfatf');
let cbx_hfatm = document.getElementById('cbx-hfatm');
let cbx_hfatgf = document.getElementById('cbx-hfatgf');
let cbx_hfatgm = document.getElementById('cbx-hfatgm');
let cbx_hfats = document.getElementById('cbx-hfats');

//Acné
let cbx_hfacf = document.getElementById('cbx-hfacf');
let cbx_hfacm = document.getElementById('cbx-hfacm');
let cbx_hfacgf = document.getElementById('cbx-hfacgf');
let cbx_hfacgm = document.getElementById('cbx-hfacgm');
let cbx_hfacs = document.getElementById('cbx-hfacs');

//Psoriasis
let cbx_hfpsf = document.getElementById('cbx-hfpsf');
let cbx_hfpsm = document.getElementById('cbx-hfpsm');
let cbx_hfpsgf = document.getElementById('cbx-hfpsgf');
let cbx_hfpsgm = document.getElementById('cbx-hfpsgm');
let cbx_hfpss = document.getElementById('cbx-hfpss');

//Vitíligo
let cbx_hfvif = document.getElementById('cbx-hfvif');
let cbx_hfvim = document.getElementById('cbx-hfvim');
let cbx_hfvigf = document.getElementById('cbx-hfvigf');
let cbx_hfvigm = document.getElementById('cbx-hfvigm');
let cbx_hfvis = document.getElementById('cbx-hfvis');

//Alopecia androgénica 
let cbx_hfalf = document.getElementById('cbx-hfalf');
let cbx_hfalm = document.getElementById('cbx-hfalm');
let cbx_hfalgf = document.getElementById('cbx-hfalgf');
let cbx_hfalgm = document.getElementById('cbx-hfalgm');
let cbx_hfals = document.getElementById('cbx-hfals');

//Alopecia areata 
let cbx_hfalof = document.getElementById('cbx-hfalof');
let cbx_hfalom = document.getElementById('cbx-hfalom');
let cbx_hfalogf = document.getElementById('cbx-hfalogf');
let cbx_hfalogm = document.getElementById('cbx-hfalogm');
let cbx_hfalos = document.getElementById('cbx-hfalos');

//Cáncer de piel no melanoma 
let cbx_hfcanf = document.getElementById('cbx-hfcanf');
let cbx_hfcanm = document.getElementById('cbx-hfcanm');
let cbx_hfcangf = document.getElementById('cbx-hfcangf');
let cbx_hfcangm = document.getElementById('cbx-hfcangm');
let cbx_hfcans = document.getElementById('cbx-hfcans');

//Melanoma
let cbx_hfmelf = document.getElementById('cbx-hfmelf');
let cbx_hfmelm = document.getElementById('cbx-hfmelm');
let cbx_hfmelgf = document.getElementById('cbx-hfmelgf');
let cbx_hfmelgm = document.getElementById('cbx-hfmelgm');
let cbx_hfmels = document.getElementById('cbx-hfmels');

//Enfermedad autoinmune
let cbx_hfautf = document.getElementById('cbx-hfautf');
let cbx_hfautm = document.getElementById('cbx-hfautm');
let cbx_hfautgf = document.getElementById('cbx-hfautgf');
let cbx_hfautgm = document.getElementById('cbx-hfautgm');
let cbx_hfauts = document.getElementById('cbx-hfauts');

//Cardiopatía
let cbx_hfcarf = document.getElementById('cbx-hfcarf');
let cbx_hfcarm = document.getElementById('cbx-hfcarm');
let cbx_hfcargf = document.getElementById('cbx-hfcargf');
let cbx_hfcargm = document.getElementById('cbx-hfcargm');
let cbx_hfcars = document.getElementById('cbx-hfcars');

//Diabetes
let cbx_hfdif = document.getElementById('cbx-hfdif');
let cbx_hfdim = document.getElementById('cbx-hfdim');
let cbx_hfdigf = document.getElementById('cbx-hfdigf');
let cbx_hfdigm = document.getElementById('cbx-hfdigm');
let cbx_hfdis = document.getElementById('cbx-hfdis');

//Hipertension
let cbx_hfhif = document.getElementById('cbx-hfhif');
let cbx_hfhim = document.getElementById('cbx-hfhim');
let cbx_hfhigf = document.getElementById('cbx-hfhigf');
let cbx_hfhigm = document.getElementById('cbx-hfhigm');
let cbx_hfhis = document.getElementById('cbx-hfhis');

//Dislipidemias
let cbx_hfdisf = document.getElementById('cbx-hfdisf');
let cbx_hfdism = document.getElementById('cbx-hfdism');
let cbx_hfdisgf = document.getElementById('cbx-hfdisgf');
let cbx_hfdisgm = document.getElementById('cbx-hfdisgm');
let cbx_hfdiss = document.getElementById('cbx-hfdiss');

//Neoplasis
let cbx_hfnef = document.getElementById('cbx-hfnef');
let cbx_hfnem = document.getElementById('cbx-hfnem');
let cbx_hfnegf = document.getElementById('cbx-hfnegf');
let cbx_hfnegm = document.getElementById('cbx-hfnegm');
let cbx_hfnes = document.getElementById('cbx-hfnes');

//Enfermedades tiroides
let cbx_hftirf = document.getElementById('cbx-hftirf');
let cbx_hftirm = document.getElementById('cbx-hftirm');
let cbx_hftirgf = document.getElementById('cbx-hftirgf');
let cbx_hftirgm = document.getElementById('cbx-hftirgm');
let cbx_hftirs = document.getElementById('cbx-hftirs');
/* heredofamiliares fin */

/* Variables signo vitales */
let info_bloodPressure = document.getElementById('info-bloodPressure');
let info_breathingFrequency = document.getElementById('info-breathingFrequency');
let info_heartRate = document.getElementById('info-heartRate');
let info_temperature = document.getElementById('info-temperature');
let info_weightPatient = document.getElementById('info-weightPatient');
let info_sizePatient = document.getElementById('info-sizePatient');
let info_imc = document.getElementById('info-imc');
let new_vitals = document.getElementById('new-vitals');
let create_vitals = document.getElementById('create-vitals');
let edit_vitals = document.getElementById('edit-vitals');
let cancel_vitals = document.getElementById('cancel-vitals');
/* Variables signo vitales fin */

/* Variables Alergias */
let cbx_alnone = document.getElementById('cbx-alnone');
let cbx_alaca = document.getElementById('cbx-alaca');
let cbx_alali = document.getElementById('cbx-alali');
let cbx_alcho = document.getElementById('cbx-alcho');
let cbx_alfru = document.getElementById('cbx-alfru');
let cbx_alhon = document.getElementById('cbx-alhon');
let cbx_alhum = document.getElementById('cbx-alhum');
let cbx_allat = document.getElementById('cbx-allat');
let cbx_almar = document.getElementById('cbx-almar');
let cbx_almasc = document.getElementById('cbx-almasc');
let cbx_almoho = document.getElementById('cbx-almoho');
let cbx_alniqu = document.getElementById('cbx-alniqu');
let cbx_alpic = document.getElementById('cbx-alpic');
let cbx_alpolen = document.getElementById('cbx-alpolen');
let cbx_alpolvo = document.getElementById('cbx-alpolvo');
let cbx_alsol = document.getElementById('cbx-alsol');
let cbx_alnote = document.getElementById('cbx-alnote');
/* Variables alergias fin */

/* Variables resultados fin */
const dropContainer = document.getElementById("dropcontainer")
const fileInput = document.getElementById("documents")
const filecomment = document.getElementById("filecomment")
let upload_documents = document.getElementById('upload-documents');
let view_documents = document.getElementById('view-documents');
let button_documents = document.getElementById('button-documents');
/* Variables resultados fin */

/* Variables Historia de citas */
let btnAppoimentHistory1 = document.getElementById('btnAppoimentHistory1');
let btnAppoimentHistory2 = document.getElementById('btnAppoimentHistory2');
let btnAppoimentHistory3 = document.getElementById('btnAppoimentHistory3');
let btnAppoimentHistory4 = document.getElementById('btnAppoimentHistory4');
let btnAppoimentHistory5 = document.getElementById('btnAppoimentHistory5');
let btnAppoimentHistory6 = document.getElementById('btnAppoimentHistory6');
/* Variables Historia de citas fin */

/* Variables Recetas electronicas */
let evolution_analysis = document.getElementById('evolution-analysis');
let evolution_diagnosis = document.getElementById('evolution-diagnosis');
let evolution_objective = document.getElementById('evolution-objective');
let evolution_plan = document.getElementById('evolution-plan');
let evolution_forecast = document.getElementById('evolution-forecast');
let evolution_subjective = document.getElementById('evolution-subjective');

let editevolution_analysis = document.getElementById('editevolution-analysis');
let editevolution_diagnosis = document.getElementById('editevolution-diagnosis');
let editevolution_objective = document.getElementById('editevolution-objective');
let editevolution_plan = document.getElementById('editevolution-plan');
let editevolution_forecast = document.getElementById('editevolution-forecast');
let editevolution_subjective = document.getElementById('editevolution-subjective');
/* Variables Recetas electronicas fin */

/* Variables Pagos */
let btnPrepaid1 = document.getElementById('btnPrepaid1');
let btnPrepaid2 = document.getElementById('btnPrepaid2');

let container_tablePrepaid = document.getElementById('container-tablePrepaid');
let container_PrepaidAnt = document.getElementById('container-PrepaidAnt');

let subgroup_categoryEarly = document.getElementById('subgroup-categoryEarly');
let btncategoryEarly1 = document.getElementById('btncategoryEarly1');
let btncategoryEarly2 = document.getElementById('btncategoryEarly2');
let btncategoryEarly3 = document.getElementById('btncategoryEarly3');
let btncategoryEarly4 = document.getElementById('btncategoryEarly4');
let btncategoryEarly5 = document.getElementById('btncategoryEarly5');
let btncategoryEarly6 = document.getElementById('btncategoryEarly6');

/* Variables Pagos fin */

/**************************************************[ VALIDACION DEL MODAL ]*****************************************************************************/
const onKeyboardEscEvolution = () => event.keyCode === 27 && closeModalAddEvolution();
const onKeyboardEscEditEvolution = () => event.keyCode === 27 && closeEditNoteEvolution();
const onKeyboardEscInfoPatient = () => event.keyCode === 27 && closeModalInfoPatient();
const onKeyboardEscDetailFile = () => event.keyCode === 27 && closeModalDetailFile();
/**************************************************[ VALIDACION DEL MODAL FIN ]*****************************************************************************/


/* Descargar expediente del usuario */
const downloadRecord = () => {
    fetch(`${envPatient.rutes.back}${envPatient.controllers.historyappoiment}pdf_record?idpatient=${infoPatient[0].patient[0].id_paciente}`)
        .then(response => response.json())
        .then(result => {
            const { pdfRecord } = result
            fetch(`${envPatient.rutes.back}${envPatient.controllers.historyappoiment}RecordPDF?idpatient=${infoPatient[0].patient[0].id_paciente}`)   
            .then(response2 => window.open(response2.url, '_blank'))
        })
        .catch(error => Alert('error', error.message))
}
/* Descargar expediente del usuario fin */

/* Obtiene toda la informacion de pacientes para la tabla de pacientes */
const getPatient = () => {
    fetch(`${envPatient.rutes.back}${envPatient.controllers.patient}GetDataPatient`)
    .then(response => response.json())
    .then(result => {
        const { SuccessDataPatient } = result
        let patients = [];
        SuccessDataPatient[0].GetPatient.map(({ id_paciente, nombre, apellido_paterno, apellido_materno, telefono, email, fecha_nacimiento, sexo }) => patients.push({
            id: id_paciente,
            name: `${nombre} ${apellido_paterno} ${apellido_materno}`,
            phone: telefono, email,
            date: new Date(`${fecha_nacimiento.split('-')[0]}/${fecha_nacimiento.split('-')[1]}/${fecha_nacimiento.split('-')[2]}`).toLocaleString("es-ES", { day: "2-digit", month: "long", year: "numeric" }),
            sex: sexo === 'H' ? 'Hombre' : 'Mujer'
        }))
        setTimeout(() => $tablePatient.bootstrapTable({ data: patients }), 500)
    })
    .catch(error => Alert('error', error.message))
}

getPatient()
/* Obtiene toda la informacion de pacientes para la tabla de pacientes fin */

/* Admin Submenus */
const activeDataSheet = () => {
    dataSheet.style.display = 'inline';
    clinicHistory.style.display = 'none';
    electronicPrescription.style.display = 'none'
    appoimentHistory.style.display = 'none'
    Prepaid.style.display = 'none'
    viewInfoPatient();
}
const activeHistory = () => {
    dataSheet.style.display = 'none';
    clinicHistory.style.display = 'inline';
    electronicPrescription.style.display = 'none'
    appoimentHistory.style.display = 'none'
    Prepaid.style.display = 'none'
    viewpathological();
}
const activeElectronic = () => {
    dataSheet.style.display = 'none';
    clinicHistory.style.display = 'none';
    electronicPrescription.style.display = 'inline'
    appoimentHistory.style.display = 'none'
    Prepaid.style.display = 'none'
    viewnElectronicPrescription();
}
const activeAppoiment = () => {
    dataSheet.style.display = 'none';
    clinicHistory.style.display = 'none';
    electronicPrescription.style.display = 'none'
    appoimentHistory.style.display = 'inline'
    Prepaid.style.display = 'none'
    viewnAppoimentsUser(1);
}
const activePrepaid = () => {
    dataSheet.style.display = 'none';
    clinicHistory.style.display = 'none';
    electronicPrescription.style.display = 'none'
    appoimentHistory.style.display = 'none'
    Prepaid.style.display = 'inline'
    viewnPaymentsHist(1);
}
/* Admin Submenus */
function operateCancelVitals(value, row, index) {
    return [
        '<div class="d-flex justify-content-center">',
        '<a class="" style="cursor: pointer;" onclick="canelVitalSigns(\'' + row.id_signos + '\')"  disabled>',
        '<span class="my-2 text-uppercase text-secondary" style="font-size: 13px;"><svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path></svg></span>',
        '</a>',
        '</div>'
    ].join('')
}
function operateResult(value, row, index) {
    const { nombre, id_resultados, extension } = row
    return [
        `<div class="d-flex flex-row flex-nowrap justify-content-around">`,
        '<div class="d-flex justify-content-center text-primary">',
        `<a class="text-danger" style="cursor: pointer;" onclick="downloadDocument('${id_resultados}','${nombre}','${extension}')">`,
        '<span class="my-2 text-uppercase text-secondary" style="font-size: 13px;"><svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                <path opacity="0.4" d="M17.554 7.29614C20.005 7.29614 22 9.35594 22 11.8876V16.9199C22 19.4453 20.01 21.5 17.564 21.5L6.448 21.5C3.996 21.5 2 19.4412 2 16.9096V11.8773C2 9.35181 3.991 7.29614 6.438 7.29614H7.378L17.554 7.29614Z" fill="currentColor"></path>                                <path d="M12.5464 16.0374L15.4554 13.0695C15.7554 12.7627 15.7554 12.2691 15.4534 11.9634C15.1514 11.6587 14.6644 11.6597 14.3644 11.9654L12.7714 13.5905L12.7714 3.2821C12.7714 2.85042 12.4264 2.5 12.0004 2.5C11.5754 2.5 11.2314 2.85042 11.2314 3.2821L11.2314 13.5905L9.63742 11.9654C9.33742 11.6597 8.85043 11.6587 8.54843 11.9634C8.39743 12.1168 8.32142 12.3168 8.32142 12.518C8.32142 12.717 8.39743 12.9171 8.54643 13.0695L11.4554 16.0374C11.6004 16.1847 11.7964 16.268 12.0004 16.268C12.2054 16.268 12.4014 16.1847 12.5464 16.0374Z" fill="currentColor"></path></svg></span>',
        '</a>',
        '</div>',
        '<div class="d-flex justify-content-center">',
        `<a class="text-danger" style="cursor: pointer;" onclick="deleteResults(${row.id_resultados} ,'general')"  disabled>`,
        '<span class="my-2 text-uppercase text-secondary" style="font-size: 13px;"><svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path></svg></span>',
        '</a>',
        '</div>',
        '</div>'
    ].join('')
}
function operateResultName(value, row, index) {
    const { nombre, id_resultados, extension } = row
    return [
        `<div class="d-flex flex-row align-items-center">`,
        `<img style="margin-right: 15px !important; cursor: pointer;" width="30" alt="file" src="Content/Images/icons/files/${extension.replace('.','')}.svg" onclick="viewDeatilFile('${id_resultados}','${nombre}','${extension}')" />`,
        `<h2 style="font-size: 15px;">${nombre}</h2>`,
        `</div>`
    ].join('')
}
function operateEditAppoiments(value, row, index) {
    const { id_usuario,id_rol, permissions } = JSON.parse(localStorage.getItem('user'));
    const { id_estadocita, id_cita } = row;
    const {
        EliminarCita,
        IniciarConsulta,
    } = permissions;
    return [
        `${ id_estadocita !== 2 && id_estadocita !== 4 && id_estadocita !== 1 && IniciarConsulta && `<div class="d-flex flex-row flex-nowrap">
        <div class="d-flex justify-content-center">
        <a class="" style="cursor: pointer;" onclick="openEditAppoiment(${id_cita})"  disabled>
        <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path><path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path><path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path></svg>
        </a>
        </div>` 
        ||
        ''}`,
        `${id_estadocita !== 2 && id_estadocita !== 4 && id_estadocita !== 1 && EliminarCita &&
        `<div class="d-flex justify-content-center">
        <a class="text-danger" style="cursor: pointer;" onclick="deleteAppoiments(${id_cita} ,'general')"  disabled>
        <span class="my-2 text-uppercase text-secondary" style="font-size: 13px;"><svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path></svg></span>
        </a>
        </div>
        </div>`
        ||
        ''}`
    ].join('')
}
function operateStatusAppoiments(value, row, index){
    const { id_estadocita, id_cita, Estado } = row;
    return [
        `<span class="badge text-bg-secondary ${id_estadocita === 1 && 'ct-attended' || id_estadocita === 2 && 'ct-cancelled' || id_estadocita === 3 && 'ct-confirm' || id_estadocita === 4 && 'ct-notassist' || id_estadocita === 5 && 'ct-pending' || id_estadocita === 6 && 'ct-rescheduled' || id_estadocita === 7 && 'ct-atention' || id_estadocita === 8 && 'ct-assist'}">${Estado}</span>`
    ].join('')
}
function operateAddEvolution(value, row, index) {
    return [
        '<div class="d-flex flex-row flex-nowrap">',
        '<div class="d-flex justify-content-center">',
        '<a class="" style="cursor: pointer;" onclick="openModalAddEvolution(\'' + row.id_consultaderma + '\')">',
        '<svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" d="M16.6667 2H7.33333C3.92889 2 2 3.92889 2 7.33333V16.6667C2 20.0622 3.92 22 7.33333 22H16.6667C20.0711 22 22 20.0622 22 16.6667V7.33333C22 3.92889 20.0711 2 16.6667 2Z" fill="currentColor"></path><path d="M15.3205 12.7083H12.7495V15.257C12.7495 15.6673 12.4139 16 12 16C11.5861 16 11.2505 15.6673 11.2505 15.257V12.7083H8.67955C8.29342 12.6687 8 12.3461 8 11.9613C8 11.5765 8.29342 11.2539 8.67955 11.2143H11.2424V8.67365C11.2824 8.29088 11.6078 8 11.996 8C12.3842 8 12.7095 8.29088 12.7495 8.67365V11.2143H15.3205C15.7066 11.2539 16 11.5765 16 11.9613C16 12.3461 15.7066 12.6687 15.3205 12.7083Z" fill="currentColor"></path></svg>',
        '</a>',
        '</div>',

        '<div class="d-flex justify-content-center">',
        '<a class="" style="cursor: pointer;" onclick="openModalEditAppoiments(\'' + row.id_consultaderma + '\')">',
        '<svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path><path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path><path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path></svg>',
        '</a>',
        '</div>',

        '</div>'
    ].join('')
}
function operatePaymentHist(value, row, index) {
    const { id_cita, id_cobro, cancelado, eliminado } = row
    return (!cancelado && !eliminado ) ? [
        '<div class="d-flex flex-row flex-nowrap">',
        '<div class="d-flex justify-content-center">',
        `<a class="" style="cursor: pointer;" onclick="openModalMakePaymentEdit('${id_cobro}',${id_cita},'${openDirection}')"  disabled>`,
        '<svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path><path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path><path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path></svg>',
        '</a>',
        '</div>',
        '<div class="d-flex justify-content-center">',
        `<a class="text-danger" style="cursor: pointer;" onclick="deletePaymentsHist(${id_cobro})"  disabled>`,
        '<span class="my-2 text-uppercase text-secondary" style="font-size: 13px;"><svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path></svg></span>',
        '</a>',
        '</div>',
        '</div>'
    ].join('')
    :
    ""
}
function operateStatusPaymentHist(value, row, index) {
    const { cancelado, eliminado } = row
    return [
        `<div class="d-flex justify-content-center">
            <span class="badge text-bg-primary bg-${eliminado ? 'danger' : cancelado ? 'warning' : 'success'}">${eliminado ? 'Eliminado' : cancelado ? 'Cancelado' : 'Pagado' }</span>
        </div>`
    ].join('')
}
/* Modal pagos */
const viewnPaymentsHist = (idApp) => {
    container_tablePrepaid.style.display = 'none';
    container_PrepaidAnt.style.display = 'none';
    subgroup_Prepaid.style.display = 'flex';

    btnPrepaid1.checked = false;
    btnPrepaid2.checked = false;


    idApp === 1 ? btnPrepaid1.checked = true 
    : btnPrepaid2.checked = true

    idApp === 1 ? container_tablePrepaid.style.display = 'block'
    : container_PrepaidAnt.style.display = 'block'

    if(idApp === 1){
        fetch(`${envPatient.rutes.back}${envPatient.controllers.payments}GetPaymentsHistory?idPatient=${idUser}`)
        .then(response => response.json())
        .then(result => {
            const { payments } = result.PaymentHistory[0];
            let data = [];
            payments.map(element => {
                data.push({
                    ...element,
                    id: element.id_cobro,
                    date: moment(element.Fecha_cobro).format('L'),  
                    derma: element.Dematologo[0].derma,   
                    method: element.FormaPago[0]            
                })
            })
            $tablePrepaid.bootstrapTable('refreshOptions',{data})
            return
        })
        .catch(error => Alert('error', error.message))
    }

    if(idApp === 2){
        changeViewEarly(1)
    }
}
const changeViewEarly = idCat => {
    btncategoryEarly1.checked = false;
    btncategoryEarly2.checked = false;
    btncategoryEarly3.checked = false;
    btncategoryEarly4.checked = false;
    btncategoryEarly5.checked = false;
    btncategoryEarly6.checked = false;
    
    idCat === 1 ? btncategoryEarly1.checked = true
    : idCat === 2 ? btncategoryEarly2.checked = true
    : idCat === 3 ? btncategoryEarly3.checked = true
    : idCat === 4 ? btncategoryEarly4.checked = true
    : idCat === 5 ? btncategoryEarly5.checked = true
    : btncategoryEarly6.checked = true

    fetch(`${envPatient.rutes.back}${envPatient.controllers.payments}GetEarlyPays?idPatient=${idUser}&idCategory=${idCat}`)
    .then(response => response.json())
    .then(result => {

        const { EarlyPackage } = result.EarlyPays[0];
        let data = [];
        EarlyPackage.map(element => {
            const { Fecha } = element;
            data.push({
                ...element,
                fecha: moment(Fecha).format('L'),
                Total: `$${element.Total.toLocaleString("en", {
                    minimumFractionDigits: 2,
                })}`,
                InfoGneral: `${element.Sesiones_Disponibles}/${element.N_sesiones}`
            })
        })
        $tablePrepaidAnt.bootstrapTable('refreshOptions',{data})
        return
    })
    .catch(error => Alert('error', error.message))

}
function detailFormatterEarly(index, row) {
    const { sesiones } = row;
    if (lastExpanded !== false && lastExpanded !== index) $tablePrepaidAnt.bootstrapTable('collapseRow', lastExpanded)
    lastExpanded = index;
    var html = []
    html.push(`<h2 class="text-center fw-bold fs-5">Información de sesiones</h2>`)
    
    sesiones.length === 0 ? html.push(`<p class="text-center"><b>No cuenta con notas de evolución</b></p>`) : html.push(`<div class="d-flex flex-row flex-nowrap">
                    <div class="d-flex flex-column flex-nowrap border border-2" style="min-width: 7rem !important; max-width: 10rem !important;">
                    <p class="text-center"><b>Estado</b></p>
                    </div>
                    <div class="d-flex flex-column flex-nowrap border border-2" style="min-width: 12rem !important; max-width: 10rem !important;">
                    <p class="text-center"><b>Servicio</b></p>
                    </div>
                    <div class="d-flex flex-column flex-nowrap border border-2" style="min-width: 25rem !important; max-width: 10rem !important;">
                    <p class="text-center"><b>Areas</b></p>
                    </div>
                    <div class="d-flex flex-column flex-nowrap border border-2" style="min-width: 10rem !important; max-width: 10rem !important;">
                    <p class="text-center"><b>Total</b></p>
                    </div>
                    
                   </div>`)
        sesiones.map(element => {
            const { Estatus, Servicio, total, Areas } = element
        html.push(`<div class="d-flex flex-row flex-nowrap">
                    <div class="d-flex flex-column flex-nowrap align-items-center justify-content-center border border-2" style="min-width: 7rem !important; max-width: 10rem !important;">
                        <span class="badge text-bg-primary bg-${Estatus === 'PENDIENTE' ? 'warning' : Estatus === 'VENCIDO' ? 'danger' : 'success'}" style="max-width: 80%;">${Estatus}</span>
                    </div>
                    <div class="d-flex flex-column flex-nowrap border border-2" style="min-width: 12rem !important; max-width: 10rem !important; padding-left: 0.5rem !important;">
                    <p>${Servicio}</p>
                    </div>
                    <div class="d-flex flex-row flex-wrap align-items-baseline border border-2" style="min-width: 25rem !important; max-width: 10rem !important; padding-left: 0.5rem !important;">
                        ${Areas.map(area => `<span class="badge text-bg-primary bg-primary" style="max-width: 80%;">${area}</span>`)}
                    </div>
                    <div class="d-flex flex-column flex-nowrap align-items-center justify-content-center border border-2" style="min-width: 10rem !important; max-width: 10rem !important; padding-left: 0.5rem !important;">
                    <p>$${total}</p>
                    </div>
                    
                   </div>`)

    })
    return html.join('')
}
/* Historial de pagos */
const editPaymentsHist = () => {
    backAllergies = [];

    document.getElementById('editallergies').style.display = 'none';
    document.getElementById('updateallergies').style.display = 'inline';
    document.getElementById('cancelallergies').style.display = 'inline';

    cbx_alnone.disabled = false;
    cbx_alaca.disabled = false;
    cbx_alali.disabled = false;
    cbx_alcho.disabled = false;
    cbx_alfru.disabled = false;
    cbx_alhon.disabled = false;
    cbx_alhum.disabled = false;
    cbx_allat.disabled = false;
    cbx_almar.disabled = false;
    cbx_almasc.disabled = false;
    cbx_almoho.disabled = false;
    cbx_alniqu.disabled = false;
    cbx_alpic.disabled = false;
    cbx_alpolen.disabled = false;
    cbx_alpolvo.disabled = false;
    cbx_alsol.disabled = false;
    cbx_alnote.readOnly = false;

    backAllergies.push({
        cbx_alnone: cbx_alnone.checked,
        cbx_alaca: cbx_alaca.checked,
        cbx_alali: cbx_alali.checked,
        cbx_alcho: cbx_alcho.checked,
        cbx_alfru: cbx_alfru.checked,
        cbx_alhon: cbx_alhon.checked,
        cbx_alhum: cbx_alhum.checked,
        cbx_allat: cbx_allat.checked,
        cbx_almar: cbx_almar.checked,
        cbx_almasc: cbx_almasc.checked,
        cbx_almoho: cbx_almoho.checked,
        cbx_alniqu: cbx_alniqu.checked,
        cbx_alpic: cbx_alpic.checked,
        cbx_alpolen: cbx_alpolen.checked,
        cbx_alpolvo: cbx_alpolvo.checked,
        cbx_alsol: cbx_alsol.checked,
        cbx_alnote: cbx_alnote.value
    })
}
const cancelPaymentsHist = () => {
    document.getElementById('editallergies').style.display = 'inline';
    document.getElementById('updateallergies').style.display = 'none';
    document.getElementById('cancelallergies').style.display = 'none';

    cbx_alnone.disabled = true;
    cbx_alaca.disabled = true;
    cbx_alali.disabled = true;
    cbx_alcho.disabled = true;
    cbx_alfru.disabled = true;
    cbx_alhon.disabled = true;
    cbx_alhum.disabled = true;
    cbx_allat.disabled = true;
    cbx_almar.disabled = true;
    cbx_almasc.disabled = true;
    cbx_almoho.disabled = true;
    cbx_alniqu.disabled = true;
    cbx_alpic.disabled = true;
    cbx_alpolen.disabled = true;
    cbx_alpolvo.disabled = true;
    cbx_alsol.disabled = true;
    cbx_alnote.readOnly = true;


    cbx_alnone.checked = backAllergies[0].cbx_alnone;
    cbx_alaca.checked = backAllergies[0].cbx_alaca;
    cbx_alali.checked = backAllergies[0].cbx_alali;
    cbx_alcho.checked = backAllergies[0].cbx_alcho;
    cbx_alfru.checked = backAllergies[0].cbx_alfru;
    cbx_alhon.checked = backAllergies[0].cbx_alhon;
    cbx_alhum.checked = backAllergies[0].cbx_alhum;
    cbx_allat.checked = backAllergies[0].cbx_allat;
    cbx_almar.checked = backAllergies[0].cbx_almar;
    cbx_almasc.checked = backAllergies[0].cbx_almasc;
    cbx_almoho.checked = backAllergies[0].cbx_almoho;
    cbx_alniqu.checked = backAllergies[0].cbx_alniqu;
    cbx_alpic.checked = backAllergies[0].cbx_alpic;
    cbx_alpolen.checked = backAllergies[0].cbx_alpolen;
    cbx_alpolvo.checked = backAllergies[0].cbx_alpolvo;
    cbx_alsol.checked = backAllergies[0].cbx_alsol;
    cbx_alnote.value = backAllergies[0].cbx_alnote;
}
const updatePaymentsHist = () => {
    fetch(`${envPatient.rutes.back}${envPatient.controllers.patient}CreateAllergys`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "Allergys": [
                {
                    id_paciente: idUser,
                    alergias_negadas: cbx_alnone.checked,
                    acaros: cbx_alaca.checked,
                    alimentos: cbx_alali.checked,
                    chocolate: cbx_alcho.checked,
                    frutos_secos: cbx_alfru.checked,
                    hongos: cbx_alhon.checked,
                    humedad: cbx_alhum.checked,
                    latex: cbx_allat.checked,
                    mariscos: cbx_almar.checked,
                    mascotas: cbx_almasc.checked,
                    moho: cbx_almoho.checked,
                    niquel: cbx_alniqu.checked,
                    picadura: cbx_alpic.checked,
                    polen: cbx_alpolen.checked,
                    polvo: cbx_alpolvo.checked,
                    sol: cbx_alsol.checked,
                    medicamentos: cbx_alnote.value
                }
            ]
        })
    })
        .then(response => response.json())
        .then(result => {
            const { conflicts } = result
            if (conflicts !== null) {
                Alert('error', conflicts[0].Description);
                return
            }
            const { Description } = result.SuccesCreateAllergys[0]
            Alert('success', Description)

            backAllergies = [];
            backAllergies.push({
                cbx_alnone: cbx_alnone.checked,
                cbx_alaca: cbx_alaca.checked,
                cbx_alali: cbx_alali.checked,
                cbx_alcho: cbx_alcho.checked,
                cbx_alfru: cbx_alfru.checked,
                cbx_alhon: cbx_alhon.checked,
                cbx_alhum: cbx_alhum.checked,
                cbx_allat: cbx_allat.checked,
                cbx_almar: cbx_almar.checked,
                cbx_almasc: cbx_almasc.checked,
                cbx_almoho: cbx_almoho.checked,
                cbx_alniqu: cbx_alniqu.checked,
                cbx_alpic: cbx_alpic.checked,
                cbx_alpolen: cbx_alpolen.checked,
                cbx_alpolvo: cbx_alpolvo.checked,
                cbx_alsol: cbx_alsol.checked,
                cbx_alnote: cbx_alnote.value
            })
            cancelallergies();
        })
        .catch(error => Alert('error', error.message))
}
const deletePaymentsHist = (idPayment) => {
    ConfirmationDeletePayments()
        .then(result => {
            const { isConfirmed, isDismissed, isDenied } = result;
            if (isDismissed || isDenied) return;

            const { value } = result;
            const { id_usuario } = JSON.parse(localStorage.getItem('user'))
            fetch(`${envPatient.rutes.back}${envPatient.controllers.payments}DeletePayments?idPayments=${idPayment}&NIP=${value}`, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(result => {
                    const { Description } = result.Success[0];
                    if(Description.includes('consulta')){
                        Alert('warning', Description);
                    }
                    else if(Description.includes('Confirmación')){
                        Alert('warning', Description);
                        setTimeout(() => {
                            deletePaymentsHist(idPayment)                    
                        }, 2000);
                    }       
                    else{
                        Alert('success', Description);
                        viewnPaymentsHist(1);
                        if (openDirection === 'diary') renderInfo();
                    }
                })
        })
}
/* Historial de pagos fin */

/* Pagos anticipados */
const newEarlySession = () =>{
    const { patient } = infoPatient[0];
    openModalEarlySession(patient[0].id_paciente, `${patient[0].nombre} ${patient[0].apellido_paterno} ${patient[0].apellido_materno}`, patient[0].sexo, 'record')
}
/* Pagos anticipados fin */
/* Modal pagos  fin */

/* Modal Recetas Electronicas */
const viewnElectronicPrescription = () => {
    fetch(`${envPatient.rutes.back}${envPatient.controllers.historyappoiment}GetHistoryConsultation?idPatient=${idUser}&idCategory=1`)
    .then(response => response.json())
        .then(result => {
            const { HistoryConsultation } = result.HistoryConsultations[0]
            let data = [];
            HistoryConsultation.map(element => {
                data.push({
                    ...element,
                    Derma: `${element.Derma.nombre} ${element.Derma.apellido_paterno} ${element.Derma.apellido_materno}`,
                    Fecha: moment(element.Fecha).format('L'),
                    ProximaCita: moment(element.ProximaCita).format('L'),
                    hora_llegada: element.hora_llegada ? `${element.hora_llegada.Hours > 9 ? element.hora_llegada.Hours : '0' +  element.hora_llegada.Hours}:${element.hora_llegada.Minutes > 9 ? element.hora_llegada.Minutes : '0' + element.hora_llegada.Minutes}` : 'Sin hora',
                    hora_atendido: element.hora_atendido ? `${element.hora_atendido.Hours > 9 ? element.hora_atendido.Hours : '0' +  element.hora_atendido.Hours}:${element.hora_atendido.Minutes > 9 ? element.hora_atendido.Minutes : '0' + element.hora_atendido.Minutes}` : 'Sin hora',
                    hora_Salida: element.hora_Salida ? `${element.hora_Salida.Hours > 9 ? element.hora_Salida.Hours : '0' +  element.hora_Salida.Hours}:${element.hora_Salida.Minutes > 9 ? element.hora_Salida.Minutes : '0' + element.hora_Salida.Minutes}` : 'Sin hora'
                })
            })

            $tableElectronicPrescription.bootstrapTable('refreshOptions', { data })
        })
    .catch(error => Alert('error', error.message))
}
const openModalAddEvolution = (idConsulta) => {
    evolution_analysis.value = '';
    evolution_diagnosis.value = '';
    evolution_objective.value = '';
    evolution_plan.value = '';
    evolution_forecast.value = '';
    evolution_subjective.value = '';
    document.getElementById('title-evolution').innerHTML = `NOTA DE EVOLUCIÓN - CONSULTA ${idConsulta}`
    const direction = infoPatient[0].address[0];
    const person = infoPatient[0].patient[0];
    document.getElementById('paevolution-exp').innerHTML = person.id_paciente;
    document.getElementById('paevolution-name').innerHTML = `${person.nombre} ${person.apellido_paterno} ${person.apellido_materno}`;
    document.getElementById('paevolution-year').innerHTML = moment().diff(moment(`${person.fecha_nacimiento}`), 'years') + ' Años';
    document.getElementById('paevolution-stateCivil').innerHTML = !person.id_estadocivil ? 'Sin infromación' :  infoGeneral[0].Estado_Civil[infoGeneral[0].Estado_Civil.findIndex(element => element.id_estadocivil === person.id_estadocivil)].nombre;
    document.getElementById('paevolution-ocupation').innerHTML = person.ocupacion ? person.ocupacion : 'Sin infromación';
    document.getElementById('paevolution-phone').innerHTML = person.telefono;
    document.getElementById('paevolution-city').innerHTML = direction ? `${direction.Municipio}, ${direction.Estado}.` : 'Sin dirección';
    $('#modalAddEvolution').modal('show');
}
const closeModalAddEvolution = (idConsulta) => {
    evolution_analysis.value = '';
    evolution_diagnosis.value = '';
    evolution_objective.value = '';
    evolution_plan.value = '';
    evolution_forecast.value = '';
    evolution_subjective.value = '';
    document.getElementById('title-evolution').innerHTML = `NOTA DE EVOLUCIÓN`
    $('#modalAddEvolution').modal('hide');
}
function detailFormatter(index, row) {
    const { Evolucion } = row
    notesEvolutions = Evolucion;
    if (lastExpanded !== false && lastExpanded !== index) $tableElectronicPrescription.bootstrapTable('collapseRow', lastExpanded)
    lastExpanded = index;
    var html = []
    html.push(`<h2 class="text-center fw-bold fs-5">Nota de evolucion</h2>`)
    Evolucion.length === 0 ? html.push(`<p class="text-center"><b>No cuenta con notas de evolución</b></p>`) : html.push(`<div class="d-flex flex-row flex-nowrap">
                    <div class="d-flex flex-column flex-nowrap border border-2" style="min-width: 15rem !important; max-width: 10rem !important;">
                    <p class="text-center"><b>Fecha</b></p>
                    </div>
                    <div class="d-flex flex-column flex-nowrap border border-2" style="min-width: 35rem !important; max-width: 10rem !important;">
                    <p class="text-center"><b>analisis</b></p>
                    </div>
                    <div class="d-flex flex-column flex-nowrap border border-2" style="min-width: 10rem !important; max-width: 10rem !important;">
                    <p class="text-center"><b>Acciones</b></p>
                    </div>
                   </div>`)
    Evolucion.map(element => {
        html.push(`<div class="d-flex flex-row flex-nowrap">
                    <div class="d-flex flex-column flex-nowrap border border-2" style="min-width: 15rem !important; max-width: 10rem !important;">
                    <p>${element.FechaCreacion === null ? '' : moment(element.FechaCreacion).format('L') }</p>
                    </div>
                    <div class="d-flex flex-column flex-nowrap border border-2" style="min-width: 35rem !important; max-width: 10rem !important;">
                    <p>${element.analisis === null ? '' : element.analisis}</p>
                    </div>
                    <div class="d-flex flex-column flex-nowrap border border-2" style="min-width: 10rem !important; max-width: 10rem !important;">
                    <p><a style="cursor: pointer;" onclick="editNoteEvolution(${element.id_notas})"><svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" d="M19.9927 18.9534H14.2984C13.7429 18.9534 13.291 19.4124 13.291 19.9767C13.291 20.5422 13.7429 21.0001 14.2984 21.0001H19.9927C20.5483 21.0001 21.0001 20.5422 21.0001 19.9767C21.0001 19.4124 20.5483 18.9534 19.9927 18.9534Z" fill="currentColor"></path><path d="M10.309 6.90385L15.7049 11.2639C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8344 7.72908 20.8452L4.23696 20.8882C4.05071 20.8903 3.88775 20.7613 3.84542 20.5764L3.05175 17.1258C2.91419 16.4915 3.05175 15.8358 3.45388 15.3306L9.88256 6.95545C9.98627 6.82108 10.1778 6.79743 10.309 6.90385Z" fill="currentColor"></path><path opacity="0.4" d="M18.1208 8.66544L17.0806 9.96401C16.9758 10.0962 16.7874 10.1177 16.6573 10.0124C15.3927 8.98901 12.1545 6.36285 11.2561 5.63509C11.1249 5.52759 11.1069 5.33625 11.2127 5.20295L12.2159 3.95706C13.126 2.78534 14.7133 2.67784 15.9938 3.69906L17.4647 4.87078C18.0679 5.34377 18.47 5.96726 18.6076 6.62299C18.7663 7.3443 18.597 8.0527 18.1208 8.66544Z" fill="currentColor"></path></svg></a></p>
                    </div>
                   </div>`)

    })
    return html.join('')
}
const editNoteEvolution = (id) => {
    const indexNote = notesEvolutions.findIndex(element => element.id_notas === id);

    document.getElementById('title-editevolution').innerHTML = `NOTA DE EVOLUCIÓN - NOTA ${id}`
    editevolution_analysis.value = notesEvolutions[indexNote].analisis
    editevolution_diagnosis.value = notesEvolutions[indexNote].diagnostico
    editevolution_objective.value = notesEvolutions[indexNote].objetivo
    editevolution_plan.value = notesEvolutions[indexNote].plan_
    editevolution_forecast.value = notesEvolutions[indexNote].pronostico
    editevolution_subjective.value = notesEvolutions[indexNote].subjetivo

    const direction = infoPatient[0].address[0];
    const person = infoPatient[0].patient[0];
    document.getElementById('editpaevolution-exp').innerHTML = person.id_paciente;
    document.getElementById('editpaevolution-name').innerHTML = `${person.nombre} ${person.apellido_paterno} ${person.apellido_materno}`;
    document.getElementById('editpaevolution-year').innerHTML = moment().diff(moment(`${person.fecha_nacimiento}`), 'years') + ' Años';
    document.getElementById('editpaevolution-stateCivil').innerHTML = infoGeneral[0].Estado_Civil[infoGeneral[0].Estado_Civil.findIndex(element => element.id_estadocivil === person.id_estadocivil)].nombre;
    document.getElementById('editpaevolution-ocupation').innerHTML = person.ocupacion;
    document.getElementById('editpaevolution-phone').innerHTML = person.telefono;
    document.getElementById('editpaevolution-city').innerHTML = direction ? `${direction.Municipio}, ${direction.Estado}.` : '';

    $('#modalEditEvolution').modal('show');
}
const closeEditNoteEvolution = () => {
    editevolution_analysis.value = '';
    editevolution_diagnosis.value = '';
    editevolution_objective.value = '';
    editevolution_plan.value = '';
    editevolution_forecast.value = '';
    editevolution_subjective.value = '';

    $('#modalEditEvolution').modal('hide');
}
const addNoteEvolution = () => {
    const title = document.getElementById('title-evolution').innerHTML

    if(
        evolution_diagnosis.value === '' &&
        evolution_subjective.value === '' &&
        evolution_objective.value === '' &&
        evolution_analysis.value === '' &&
        evolution_forecast.value === '' &&
        evolution_plan.value === '' 
    ){
        Alert('warning','No puedes agregar una nota de evolución con todos los campos vacíos')
        return
    }

    fetch(`${envPatient.rutes.back}${envPatient.controllers.historyappoiment}PostNotesEvolution`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            NotesEvolution: [
                {
                    id_consultaderma: parseInt(title.replace('NOTA DE EVOLUCIÓN - CONSULTA ', '')),
                    diagnostico: evolution_diagnosis.value,
                    subjetivo: evolution_subjective.value,
                    objetivo: evolution_objective.value,
                    analisis: evolution_analysis.value,
                    pronostico: evolution_forecast.value,
                    plan_: evolution_plan.value
                }
            ]
        })
    })
        .then(response => response.json())
        .then(result => {
            const { Notes } = result.NotesEvolution[0]
            Alert('success', Notes);
            viewnElectronicPrescription();
            evolution_analysis.value = '';
            evolution_diagnosis.value = '';
            evolution_objective.value = '';
            evolution_plan.value = '';
            evolution_forecast.value = '';
            evolution_subjective.value = '';
            $('#modalAddEvolution').modal('hide');
        })
        .catch(error => Alert('error', error.message))
}
const updateNoteEvolution = () => {
    const title = document.getElementById('title-editevolution').innerHTML

    fetch(`${envPatient.rutes.back}${envPatient.controllers.historyappoiment}PutNotesEvolution`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            NotesEvolution: [
                {
                    id_notas: parseInt(title.replace('NOTA DE EVOLUCIÓN - NOTA ', '')),
                    diagnostico: editevolution_diagnosis.value,
                    subjetivo: editevolution_subjective.value,
                    objetivo: editevolution_objective.value,
                    analisis: editevolution_analysis.value,
                    pronostico: editevolution_forecast.value,
                    plan_: editevolution_plan.value
                }
            ]
        })
    })
        .then(response => response.json())
        .then(result => {
            const { Notes } = result.NotesEvolution[0]
            viewnElectronicPrescription();
            Alert('success', Notes)
            $('#modalEditEvolution').modal('hide');           
        })
        .catch(error => Alert('error', error.message))
}
/* Modal Recetas Electronicas  fin */

/* Modal Historia de citas */
const viewnAppoimentsUser = (idApp) => {
    historyAppoimetnActive = idApp;
    subgroup_appoimentHistory.style.display = 'flex';

    btnAppoimentHistory1.checked = false;
    btnAppoimentHistory2.checked = false;
    btnAppoimentHistory3.checked = false;
    btnAppoimentHistory4.checked = false;
    btnAppoimentHistory5.checked = false;
    btnAppoimentHistory6.checked = false;


    idApp === 1 ? btnAppoimentHistory1.checked = true
    : idApp === 2 ? btnAppoimentHistory2.checked = true
    : idApp === 3 ? btnAppoimentHistory3.checked = true
    : idApp === 4 ? btnAppoimentHistory4.checked = true
    : idApp === 5 ? btnAppoimentHistory5.checked = true
    : btnAppoimentHistory6.checked = true

    fetch(`${envPatient.rutes.back}${envPatient.controllers.historyappoiment}GetDataHistoryAppoiment?idPatient=${idUser}&idCategory=${idApp}`)
        .then(response => response.json())
        .then(result => {
            const { HistoryAppoiments, Reasons } = result.HistoryAppoiment[0];
            reasonDeleteEdit = Reasons;
            let data = [];
            HistoryAppoiments.map(element => {
                const { fecha,
                    Derma,
                    Tipo,
                    Sucursal,
                    hora,
                    observaciones,
                    precio,
                    id_cita
                } = element;
                data.push({
                    ...element,
                    hora: element.hora === null ? '' : `${element.hora.Hours < 10 ? '0' + element.hora.Hours : element.hora.Hours}:${element.hora.Minutes < 10 ? '0' + element.hora.Minutes : element.hora.Minutes}`,
                    fecha: moment(fecha).format('L'),
                })
            })
            $tableHistoryAppoiments.bootstrapTable('refreshOptions',{data})
            return
        })
        .catch(error => Alert('error', error.message))
}
const editAppoimentsUser = () => {
    backAllergies = [];

    document.getElementById('editallergies').style.display = 'none';
    document.getElementById('updateallergies').style.display = 'inline';
    document.getElementById('cancelallergies').style.display = 'inline';

    cbx_alnone.disabled = false;
    cbx_alaca.disabled = false;
    cbx_alali.disabled = false;
    cbx_alcho.disabled = false;
    cbx_alfru.disabled = false;
    cbx_alhon.disabled = false;
    cbx_alhum.disabled = false;
    cbx_allat.disabled = false;
    cbx_almar.disabled = false;
    cbx_almasc.disabled = false;
    cbx_almoho.disabled = false;
    cbx_alniqu.disabled = false;
    cbx_alpic.disabled = false;
    cbx_alpolen.disabled = false;
    cbx_alpolvo.disabled = false;
    cbx_alsol.disabled = false;
    cbx_alnote.readOnly = false;

    backAllergies.push({
        cbx_alnone: cbx_alnone.checked,
        cbx_alaca: cbx_alaca.checked,
        cbx_alali: cbx_alali.checked,
        cbx_alcho: cbx_alcho.checked,
        cbx_alfru: cbx_alfru.checked,
        cbx_alhon: cbx_alhon.checked,
        cbx_alhum: cbx_alhum.checked,
        cbx_allat: cbx_allat.checked,
        cbx_almar: cbx_almar.checked,
        cbx_almasc: cbx_almasc.checked,
        cbx_almoho: cbx_almoho.checked,
        cbx_alniqu: cbx_alniqu.checked,
        cbx_alpic: cbx_alpic.checked,
        cbx_alpolen: cbx_alpolen.checked,
        cbx_alpolvo: cbx_alpolvo.checked,
        cbx_alsol: cbx_alsol.checked,
        cbx_alnote: cbx_alnote.value
    })
}
const cancelAppoimentsUser = () => {
    document.getElementById('editallergies').style.display = 'inline';
    document.getElementById('updateallergies').style.display = 'none';
    document.getElementById('cancelallergies').style.display = 'none';

    cbx_alnone.disabled = true;
    cbx_alaca.disabled = true;
    cbx_alali.disabled = true;
    cbx_alcho.disabled = true;
    cbx_alfru.disabled = true;
    cbx_alhon.disabled = true;
    cbx_alhum.disabled = true;
    cbx_allat.disabled = true;
    cbx_almar.disabled = true;
    cbx_almasc.disabled = true;
    cbx_almoho.disabled = true;
    cbx_alniqu.disabled = true;
    cbx_alpic.disabled = true;
    cbx_alpolen.disabled = true;
    cbx_alpolvo.disabled = true;
    cbx_alsol.disabled = true;
    cbx_alnote.readOnly = true;


    cbx_alnone.checked = backAllergies[0].cbx_alnone;
    cbx_alaca.checked = backAllergies[0].cbx_alaca;
    cbx_alali.checked = backAllergies[0].cbx_alali;
    cbx_alcho.checked = backAllergies[0].cbx_alcho;
    cbx_alfru.checked = backAllergies[0].cbx_alfru;
    cbx_alhon.checked = backAllergies[0].cbx_alhon;
    cbx_alhum.checked = backAllergies[0].cbx_alhum;
    cbx_allat.checked = backAllergies[0].cbx_allat;
    cbx_almar.checked = backAllergies[0].cbx_almar;
    cbx_almasc.checked = backAllergies[0].cbx_almasc;
    cbx_almoho.checked = backAllergies[0].cbx_almoho;
    cbx_alniqu.checked = backAllergies[0].cbx_alniqu;
    cbx_alpic.checked = backAllergies[0].cbx_alpic;
    cbx_alpolen.checked = backAllergies[0].cbx_alpolen;
    cbx_alpolvo.checked = backAllergies[0].cbx_alpolvo;
    cbx_alsol.checked = backAllergies[0].cbx_alsol;
    cbx_alnote.value = backAllergies[0].cbx_alnote;
}
const updateAppoimentsUser = () => {
    fetch(`${envPatient.rutes.back}${envPatient.controllers.patient}CreateAllergys`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "Allergys": [
                {
                    id_paciente: idUser,
                    alergias_negadas: cbx_alnone.checked,
                    acaros: cbx_alaca.checked,
                    alimentos: cbx_alali.checked,
                    chocolate: cbx_alcho.checked,
                    frutos_secos: cbx_alfru.checked,
                    hongos: cbx_alhon.checked,
                    humedad: cbx_alhum.checked,
                    latex: cbx_allat.checked,
                    mariscos: cbx_almar.checked,
                    mascotas: cbx_almasc.checked,
                    moho: cbx_almoho.checked,
                    niquel: cbx_alniqu.checked,
                    picadura: cbx_alpic.checked,
                    polen: cbx_alpolen.checked,
                    polvo: cbx_alpolvo.checked,
                    sol: cbx_alsol.checked,
                    medicamentos: cbx_alnote.value
                }
            ]
        })
    })
        .then(response => response.json())
        .then(result => {
            const { conflicts } = result
            if (conflicts !== null) {
                Alert('error', conflicts[0].Description);
                return
            }
            const { Description } = result.SuccesCreateAllergys[0]
            Alert('success', Description)

            backAllergies = [];
            backAllergies.push({
                cbx_alnone: cbx_alnone.checked,
                cbx_alaca: cbx_alaca.checked,
                cbx_alali: cbx_alali.checked,
                cbx_alcho: cbx_alcho.checked,
                cbx_alfru: cbx_alfru.checked,
                cbx_alhon: cbx_alhon.checked,
                cbx_alhum: cbx_alhum.checked,
                cbx_allat: cbx_allat.checked,
                cbx_almar: cbx_almar.checked,
                cbx_almasc: cbx_almasc.checked,
                cbx_almoho: cbx_almoho.checked,
                cbx_alniqu: cbx_alniqu.checked,
                cbx_alpic: cbx_alpic.checked,
                cbx_alpolen: cbx_alpolen.checked,
                cbx_alpolvo: cbx_alpolvo.checked,
                cbx_alsol: cbx_alsol.checked,
                cbx_alnote: cbx_alnote.value
            })
            cancelallergies();
        })
        .catch(error => Alert('error', error.message))
}
const deleteAppoiments = (idCita, type) => {
    let options = {};
    reasonDeleteEdit.map(({ id_razon, nombre }) => options[id_razon] = nombre)
    ConfirmationDelete(options, idCita)
        .then(result => {
            const { isConfirmed, isDismissed, isDenied } = result;
            if (isDismissed || isDenied) return;
            const { id_usuario } = JSON.parse(localStorage.getItem('user'))
            const { value } = result;
            let NIP = parseInt(value)===6 && document.getElementById('cancelPasswordInput').value || '';
            fetch(`${envPatient.rutes.back}${envPatient.controllers.diary}DeleteDatareason?idAppointment=${idCita}&idreason=${value}&Type=${type}&idUser=${id_usuario}&NIP=${NIP}`, {
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
                        viewnAppoimentsUser(historyAppoimetnActive);
                        if (openDirection === 'diary') renderInfo();
                    }
                })
        })
}
/* Modal Historia de citas  fin */

/* Historia clinica */

/* Modal Resultados */
const formatExtension = {
    ['.xls']: "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
    ['.xlsx']: "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
    ['.xlsm']: "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
    ['.xlt']: "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
    ['.docx']: "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
    ['.doc']: "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
    ['.dot']: "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
    ['.ppt']: "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
    ['.pptx']: "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
    ['.pps']: "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
    ['.pot']: "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,",
    ['.pdf']:"data:application/pdf;base64,",
    ['.gif']: "data:image/gif;base64,",
    ['.png']: "data:image/png;base64,",
    ['.jpg']: "data:image/jpg;base64,",
    ['.jpeg']: "data:image/jpeg;base64,",
    ['.csv']: "data:application/octet-stream;base64,",
}
const downloadDocument = (IdResult, fileName, extension) => {
    // console.log(IdResult, fileName, extension)
    fetch(`${envPatient.rutes.back}${envPatient.controllers.patient}GetDataResultId?idResult=${IdResult}`)
    .then(response => response.json())
    .then(result => {
        const { Document } = result.Result[0]
        var a = document.createElement("a"); //Create <a>
        a.href = formatExtension[extension] + Document; //Image Base64 Goes here
        a.download = fileName; //File name Here
        a.click();
    })
    .catch(error => Alert('error', error.message))
}
dropContainer.addEventListener("dragover", (e) => {
    // prevent default to allow drop
    e.preventDefault()
}, false)
dropContainer.addEventListener("dragenter", () => {
    dropContainer.classList.add("drag-active")
})
dropContainer.addEventListener("dragleave", () => {
    dropContainer.classList.remove("drag-active")
})
dropContainer.addEventListener("drop", (e) => {
    e.preventDefault()
    dropContainer.classList.remove("drag-active")
    fileInput.files = e.dataTransfer.files
})
const activeUploadDocument = () => {
    fileInput.value = null;
    filecomment.value = '';

    upload_documents.style.display = 'flex'
    view_documents.style.display = 'none'
    button_documents.style.display = 'none'

}
const backViewDocument = () => {
    fileInput.value = null;
    filecomment.value = '';

    upload_documents.style.display = 'none'
    view_documents.style.display = 'inline'
    button_documents.style.display = 'inline'
    viewnresults()

}
const viewnresults = () => {
    subgroup_historyClinic.style.display = 'flex';

    form_clinicHistoryPatologiss.style.display = 'none'
    form_clinicHistoryNoPatologis.style.display = 'none'
    form_hereditary.style.display = 'none'
    form_vitalSigns.style.display = 'none'
    form_allergies.style.display = 'none'
    form_results.style.display = 'inline'

    upload_documents.style.display = 'none'
    view_documents.style.display = 'flex'
    button_documents.style.display = 'inline'

    fileInput.value = null;
    filecomment.value = '';

    //$tableResultsData.bootstrapTable('destroy');

    fetch(`${envPatient.rutes.back}${envPatient.controllers.patient}GetDataResult?idPatient=${idUser}`)
        .then(response => response.json())
        .then(result => {
            const { Results } = result.Result[0];
            let data = [];
            Results.map(element => {
                const { id_resultados,
                    id_paciente,
                    Fecha,
                    comentarios,
                    resultado } = element;
                data.push({
                    ...element,                    
                    Fecha: moment(element.Fecha).format('L'),
                    peso: element.peso > 0 ? `${(element.peso / 1000000).toFixed(2)} MB` : `N/A`
                })
            })            
            $tableResultsData.bootstrapTable('refreshOptions',{data})
        })
        .catch(error => Alert('error', error.message))
}
const deleteResults = (idResult) => {

    Confirmation('Seguro que desea eliminar el documento')
        .then(response => {

            if (response)  fetch(`${envPatient.rutes.back}${envPatient.controllers.patient}DeleteResluts?idResult=${idResult}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(result => {
                const { conflicts } = result;
                if (conflicts !== null) {
                    Alert('error', conflicts[0].Description);
                    return
                }
                
                const { Description } = result.DeleteResult[0];
                Alert('success', Description);
                viewnresults();
            })
        })
    
}
const editresults = () => {
    backAllergies = [];

    document.getElementById('editallergies').style.display = 'none';
    document.getElementById('updateallergies').style.display = 'inline';
    document.getElementById('cancelallergies').style.display = 'inline';

    cbx_alnone.disabled = false;
    cbx_alaca.disabled = false;
    cbx_alali.disabled = false;
    cbx_alcho.disabled = false;
    cbx_alfru.disabled = false;
    cbx_alhon.disabled = false;
    cbx_alhum.disabled = false;
    cbx_allat.disabled = false;
    cbx_almar.disabled = false;
    cbx_almasc.disabled = false;
    cbx_almoho.disabled = false;
    cbx_alniqu.disabled = false;
    cbx_alpic.disabled = false;
    cbx_alpolen.disabled = false;
    cbx_alpolvo.disabled = false;
    cbx_alsol.disabled = false;
    cbx_alnote.readOnly = false;

    backAllergies.push({
        cbx_alnone: cbx_alnone.checked,
        cbx_alaca: cbx_alaca.checked,
        cbx_alali: cbx_alali.checked,
        cbx_alcho: cbx_alcho.checked,
        cbx_alfru: cbx_alfru.checked,
        cbx_alhon: cbx_alhon.checked,
        cbx_alhum: cbx_alhum.checked,
        cbx_allat: cbx_allat.checked,
        cbx_almar: cbx_almar.checked,
        cbx_almasc: cbx_almasc.checked,
        cbx_almoho: cbx_almoho.checked,
        cbx_alniqu: cbx_alniqu.checked,
        cbx_alpic: cbx_alpic.checked,
        cbx_alpolen: cbx_alpolen.checked,
        cbx_alpolvo: cbx_alpolvo.checked,
        cbx_alsol: cbx_alsol.checked,
        cbx_alnote: cbx_alnote.value
    })
}
const cancelresults = () => {
    document.getElementById('editallergies').style.display = 'inline';
    document.getElementById('updateallergies').style.display = 'none';
    document.getElementById('cancelallergies').style.display = 'none';

    cbx_alnone.disabled = true;
    cbx_alaca.disabled = true;
    cbx_alali.disabled = true;
    cbx_alcho.disabled = true;
    cbx_alfru.disabled = true;
    cbx_alhon.disabled = true;
    cbx_alhum.disabled = true;
    cbx_allat.disabled = true;
    cbx_almar.disabled = true;
    cbx_almasc.disabled = true;
    cbx_almoho.disabled = true;
    cbx_alniqu.disabled = true;
    cbx_alpic.disabled = true;
    cbx_alpolen.disabled = true;
    cbx_alpolvo.disabled = true;
    cbx_alsol.disabled = true;
    cbx_alnote.readOnly = true;


    cbx_alnone.checked = backAllergies[0].cbx_alnone;
    cbx_alaca.checked = backAllergies[0].cbx_alaca;
    cbx_alali.checked = backAllergies[0].cbx_alali;
    cbx_alcho.checked = backAllergies[0].cbx_alcho;
    cbx_alfru.checked = backAllergies[0].cbx_alfru;
    cbx_alhon.checked = backAllergies[0].cbx_alhon;
    cbx_alhum.checked = backAllergies[0].cbx_alhum;
    cbx_allat.checked = backAllergies[0].cbx_allat;
    cbx_almar.checked = backAllergies[0].cbx_almar;
    cbx_almasc.checked = backAllergies[0].cbx_almasc;
    cbx_almoho.checked = backAllergies[0].cbx_almoho;
    cbx_alniqu.checked = backAllergies[0].cbx_alniqu;
    cbx_alpic.checked = backAllergies[0].cbx_alpic;
    cbx_alpolen.checked = backAllergies[0].cbx_alpolen;
    cbx_alpolvo.checked = backAllergies[0].cbx_alpolvo;
    cbx_alsol.checked = backAllergies[0].cbx_alsol;
    cbx_alnote.value = backAllergies[0].cbx_alnote;
}
const updateresults = () => {
    var formData = new FormData();
    formData.append("resultado", fileInput.files[0]);
    formData.append("id_paciente", idUser);
    formData.append("Fecha", moment().format('LT'));
    formData.append("comentarios", filecomment.value);
    formData.append("peso", fileInput.files[0].size);

    //fileInput.value = null;
    if (fileInput.files[0] === undefined) {
        Alert('error', 'Debes seleccionar un archivo');
        return
    }

    fetch(`${envPatient.rutes.back}${envPatient.controllers.patient}CreateResult`, {
        method: 'POST',
        headers: {
            /*'Content-Type': 'application/json',*/
        },
        mode: 'cors',
        body: formData
    })
        .then(response => response.json())
        .then(result => {
            const { conflicts } = result
            if (conflicts !== null) {
                Alert('error', conflicts[0].Description);
                return
            }
            fileInput.value = null;
            filecomment.value = '';
            const { Description } = result.SuccessCreateResult[0]
            Alert('success', Description)

        })
        .catch(error => Alert('error', error.message))
}
const viewDeatilFile = (IdResult, fileName, extension) => {
    fetch(`${envPatient.rutes.back}${envPatient.controllers.patient}GetDataResultId?idResult=${IdResult}`)
    .then(response => response.json())
    .then(result => {
        const { Document } = result.Result[0]
        console.log(IdResult, fileName, extension, formatExtension[extension] + Document)
        document.getElementById('mainDetailFile').innerHTML = `<iframe
        src="${formatExtension[extension] + Document}"
        width=100% height=600>
       </iframe>`
        
        $('#modalDetailFile').modal('show');
        
        return    
        var a = document.createElement("a"); //Create <a>
        a.href = formatExtension[extension] + Document; //Image Base64 Goes here
        a.download = fileName; //File name Here
        a.click();
    })
    .catch(error => Alert('error', error.message))
}
const closeModalDetailFile = () => {
    document.getElementById('mainDetailFile').innerHTML = "";
    $('#modalDetailFile').modal('hide');
}
/* Modal Resultados fin */

/* Modal alergias */
const viewnallergies = () => {
    subgroup_historyClinic.style.display = 'flex';

    form_clinicHistoryPatologiss.style.display = 'none'
    form_clinicHistoryNoPatologis.style.display = 'none'
    form_hereditary.style.display = 'none'
    form_vitalSigns.style.display = 'none'
    form_allergies.style.display = 'inline'
    form_results.style.display = 'none'

    cbx_alnone.checked = false;
    cbx_alaca.checked = false;
    cbx_alali.checked = false;
    cbx_alcho.checked = false;
    cbx_alfru.checked = false;
    cbx_alhon.checked = false;
    cbx_alhum.checked = false;
    cbx_allat.checked = false;
    cbx_almar.checked = false;
    cbx_almasc.checked = false;
    cbx_almoho.checked = false;
    cbx_alniqu.checked = false;
    cbx_alpic.checked = false;
    cbx_alpolen.checked = false;
    cbx_alpolvo.checked = false;
    cbx_alsol.checked = false;
    cbx_alnote.value = '';

    fetch(`${envPatient.rutes.back}${envPatient.controllers.patient}GetDataAllergys?idPatient=${idUser}`)
        .then(response => response.json())
        .then(result => {
            const { Allergy } = result.Allergys[0]
            if (Allergy.length > 0) {
                cbx_alnone.checked = Allergy[0].alergias_negadas
                cbx_alaca.checked = Allergy[0].acaros 
                cbx_alali.checked = Allergy[0].alimentos
                cbx_alcho.checked = Allergy[0].chocolate
                cbx_alfru.checked = Allergy[0].frutos_secos
                cbx_alhon.checked = Allergy[0].hongos
                cbx_alhum.checked = Allergy[0].humedad
                cbx_allat.checked = Allergy[0].latex
                cbx_almar.checked = Allergy[0].mariscos
                cbx_almasc.checked = Allergy[0].mascotas
                cbx_almoho.checked = Allergy[0].moho
                cbx_alniqu.checked = Allergy[0].niquel
                cbx_alpic.checked = Allergy[0].picadura
                cbx_alpolen.checked = Allergy[0].polen
                cbx_alpolvo.checked = Allergy[0].polvo 
                cbx_alsol.checked = Allergy[0].sol
                cbx_alnote.value = Allergy[0].medicamentos
            }

            cbx_alnone.disabled = true;
            cbx_alaca.disabled = true;
            cbx_alali.disabled = true;
            cbx_alcho.disabled = true;
            cbx_alfru.disabled = true;
            cbx_alhon.disabled = true;
            cbx_alhum.disabled = true;
            cbx_allat.disabled = true;
            cbx_almar.disabled = true;
            cbx_almasc.disabled = true;
            cbx_almoho.disabled = true;
            cbx_alniqu.disabled = true;
            cbx_alpic.disabled = true;
            cbx_alpolen.disabled = true;
            cbx_alpolvo.disabled = true;
            cbx_alsol.disabled = true;
            cbx_alnote.readOnly = true;

        })
        .catch(error => Alert('error', error.message))
}
const editallergies = () => {
    backAllergies = [];

    document.getElementById('editallergies').style.display = 'none';
    document.getElementById('updateallergies').style.display = 'inline';
    document.getElementById('cancelallergies').style.display = 'inline';

    cbx_alnone.disabled = false;
    cbx_alaca.disabled = false;
    cbx_alali.disabled = false;
    cbx_alcho.disabled = false;
    cbx_alfru.disabled = false;
    cbx_alhon.disabled = false;
    cbx_alhum.disabled = false;
    cbx_allat.disabled = false;
    cbx_almar.disabled = false;
    cbx_almasc.disabled = false;
    cbx_almoho.disabled = false;
    cbx_alniqu.disabled = false;
    cbx_alpic.disabled = false;
    cbx_alpolen.disabled = false;
    cbx_alpolvo.disabled = false;
    cbx_alsol.disabled = false;
    cbx_alnote.readOnly = false;

    backAllergies.push({
        cbx_alnone: cbx_alnone.checked,
        cbx_alaca: cbx_alaca.checked,
        cbx_alali: cbx_alali.checked,
        cbx_alcho: cbx_alcho.checked,
        cbx_alfru: cbx_alfru.checked,
        cbx_alhon: cbx_alhon.checked,
        cbx_alhum: cbx_alhum.checked,
        cbx_allat: cbx_allat.checked,
        cbx_almar: cbx_almar.checked,
        cbx_almasc: cbx_almasc.checked,
        cbx_almoho: cbx_almoho.checked,
        cbx_alniqu: cbx_alniqu.checked,
        cbx_alpic: cbx_alpic.checked,
        cbx_alpolen: cbx_alpolen.checked,
        cbx_alpolvo: cbx_alpolvo.checked,
        cbx_alsol: cbx_alsol.checked,
        cbx_alnote: cbx_alnote.value
    })
}
const cancelallergies = () => {
    document.getElementById('editallergies').style.display = 'inline';
    document.getElementById('updateallergies').style.display = 'none';
    document.getElementById('cancelallergies').style.display = 'none';

    cbx_alnone.disabled = true;
    cbx_alaca.disabled = true;
    cbx_alali.disabled = true;
    cbx_alcho.disabled = true;
    cbx_alfru.disabled = true;
    cbx_alhon.disabled = true;
    cbx_alhum.disabled = true;
    cbx_allat.disabled = true;
    cbx_almar.disabled = true;
    cbx_almasc.disabled = true;
    cbx_almoho.disabled = true;
    cbx_alniqu.disabled = true;
    cbx_alpic.disabled = true;
    cbx_alpolen.disabled = true;
    cbx_alpolvo.disabled = true;
    cbx_alsol.disabled = true;
    cbx_alnote.readOnly = true;


    cbx_alnone.checked = backAllergies[0].cbx_alnone;
    cbx_alaca.checked = backAllergies[0].cbx_alaca;
    cbx_alali.checked = backAllergies[0].cbx_alali;
    cbx_alcho.checked = backAllergies[0].cbx_alcho;
    cbx_alfru.checked = backAllergies[0].cbx_alfru;
    cbx_alhon.checked = backAllergies[0].cbx_alhon;
    cbx_alhum.checked = backAllergies[0].cbx_alhum;
    cbx_allat.checked = backAllergies[0].cbx_allat;
    cbx_almar.checked = backAllergies[0].cbx_almar;
    cbx_almasc.checked = backAllergies[0].cbx_almasc;
    cbx_almoho.checked = backAllergies[0].cbx_almoho;
    cbx_alniqu.checked = backAllergies[0].cbx_alniqu;
    cbx_alpic.checked = backAllergies[0].cbx_alpic;
    cbx_alpolen.checked = backAllergies[0].cbx_alpolen;
    cbx_alpolvo.checked = backAllergies[0].cbx_alpolvo;
    cbx_alsol.checked = backAllergies[0].cbx_alsol;
    cbx_alnote.value = backAllergies[0].cbx_alnote;
}
const updateallergies = () => {
    fetch(`${envPatient.rutes.back}${envPatient.controllers.patient}CreateAllergys`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "Allergys": [
                {
                    id_paciente: idUser,
                    alergias_negadas: cbx_alnone.checked,
                    acaros: cbx_alaca.checked,
                    alimentos: cbx_alali.checked,
                    chocolate: cbx_alcho.checked,
                    frutos_secos: cbx_alfru.checked,
                    hongos: cbx_alhon.checked,
                    humedad: cbx_alhum.checked,
                    latex: cbx_allat.checked,
                    mariscos: cbx_almar.checked,
                    mascotas: cbx_almasc.checked,
                    moho: cbx_almoho.checked,
                    niquel: cbx_alniqu.checked,
                    picadura: cbx_alpic.checked,
                    polen: cbx_alpolen.checked,
                    polvo: cbx_alpolvo.checked,
                    sol: cbx_alsol.checked,
                    medicamentos: cbx_alnote.value
                }
            ]
        })
    })
        .then(response => response.json())
        .then(result => {
            const { conflicts } = result
            if (conflicts !== null) {
                Alert('error', conflicts[0].Description);
                return
            }
            const { Description } = result.SuccesCreateAllergys[0]
            Alert('success', Description)

            backAllergies = [];
            backAllergies.push({
                cbx_alnone: cbx_alnone.checked,
                cbx_alaca: cbx_alaca.checked,
                cbx_alali: cbx_alali.checked,
                cbx_alcho: cbx_alcho.checked,
                cbx_alfru: cbx_alfru.checked,
                cbx_alhon: cbx_alhon.checked,
                cbx_alhum: cbx_alhum.checked,
                cbx_allat: cbx_allat.checked,
                cbx_almar: cbx_almar.checked,
                cbx_almasc: cbx_almasc.checked,
                cbx_almoho: cbx_almoho.checked,
                cbx_alniqu: cbx_alniqu.checked,
                cbx_alpic: cbx_alpic.checked,
                cbx_alpolen: cbx_alpolen.checked,
                cbx_alpolvo: cbx_alpolvo.checked,
                cbx_alsol: cbx_alsol.checked,
                cbx_alnote: cbx_alnote.value
            })
            cancelallergies();
        })
        .catch(error => Alert('error', error.message))
}
/* Modal alergias fin */

/* Modal vitalSigns */
function rowStyle(row, index) {
    var classes = [
        'bg-blue',
        'bg-green',
        'bg-orange',
        'bg-yellow',
        'bg-red'
    ]
    if (row.cancelado === true) {
        return {
            css: {
                'background-color': '#DE6161',
                'color': 'white'
            }
        }
    } else {
        return {
            css: {
               /* 'text-decoration': 'line-through var(--bs-danger) 2px'*/
            }
        }
    }
}
const viewvitalSigns = () => {
    subgroup_historyClinic.style.display = 'flex';

    form_clinicHistoryPatologiss.style.display = 'none'
    form_clinicHistoryNoPatologis.style.display = 'none'
    form_hereditary.style.display = 'none'
    form_vitalSigns.style.display = 'inline'
    form_allergies.style.display = 'none'
    form_results.style.display = 'none'

    new_vitals.style.display = 'inline'
    create_vitals.style.display = 'none'
    edit_vitals.style.display = 'none'
    cancel_vitals.style.display = 'none'

    info_bloodPressure.value = '';
    info_breathingFrequency.value = '';
    info_heartRate.value = '';
    info_temperature.value = '';
    info_weightPatient.value = '';
    info_sizePatient.value = '';
    info_imc.value = '';

    info_bloodPressure.readOnly = true;
    info_breathingFrequency.readOnly = true;
    info_heartRate.readOnly = true;
    info_temperature.readOnly = true;
    info_weightPatient.readOnly = true;
    info_sizePatient.readOnly = true;
    info_imc.readOnly = true;

    //$tableVitalSign.bootstrapTable('destroy');

    fetch(`${envPatient.rutes.back}${envPatient.controllers.patient}GetDataSigns?idPatient=${idUser}`)
    .then(response => response.json())
        .then(result => {
            const { SignosVitales } = result.Signs[0];
            let data = [];
            SignosVitales.map(element => {
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
                const fecha = element.Fecha.split(' ')
                data.push({
                    ...element,
                    hora: element.hora === null ? '' : `${element.hora.Hours < 10 ? '0' + element.hora.Hours : element.hora.Hours}:${element.hora.Minutes < 10 ? '0' + element.hora.Minutes : element.hora.Minutes}`,
                    Fecha: moment(`${fecha[0]} ${fecha[1]} ${fecha[2]}`).format('L'),
                    temperatura: `${temperatura}°`,
                    peso: `${peso}Kg`,
                    altura: `${altura}m`
                })
            })
            $tableVitalSign.bootstrapTable('refreshOptions',{ data })
    })
    .catch(error => Alert('error', error.message))
}
const newVitalSigns = () => {
    new_vitals.style.display = 'none'
    create_vitals.style.display = 'inline'
    edit_vitals.style.display = 'none'
    cancel_vitals.style.display = 'inline'

    info_bloodPressure.value = '';
    info_breathingFrequency.value = '';
    info_heartRate.value = '';
    info_temperature.value = '';
    info_weightPatient.value = '';
    info_sizePatient.value = '';
    info_imc.value = '';

    info_bloodPressure.readOnly = false;
    info_breathingFrequency.readOnly = false;
    info_heartRate.readOnly = false;
    info_temperature.readOnly = false;
    info_weightPatient.readOnly = false;
    info_sizePatient.readOnly = false;
}
const canelVitalSigns = (id) => {
    Confirmation('Seguro que desea cancelar el registro')
        .then(result => {
            if (result) {
                const { id_usuario } = JSON.parse(localStorage.getItem('user'))
                fetch(`${envPatient.rutes.back}${envPatient.controllers.patient}DeleteDataSings?idSign=${id}&idUsuario=${id_usuario}`, {
                    method: 'DELETE'
                })
                    .then(response => response.json())
                    .then(result => {
                        const { Description } = result.DeleteSigns[0]
                        Alert('error', Description);
                        viewvitalSigns();
                    })
                    .catch(error => Alert('error', error.message))
            }
        })    
}
const cancelvitalSigns = () => {
    new_vitals.style.display = 'inline'
    create_vitals.style.display = 'none'
    edit_vitals.style.display = 'none'
    cancel_vitals.style.display = 'none'

    info_bloodPressure.value = '';
    info_breathingFrequency.value = '';
    info_heartRate.value = '';
    info_temperature.value = '';
    info_weightPatient.value = '';
    info_sizePatient.value = '';
    info_imc.value = '';

    info_bloodPressure.readOnly = true;
    info_breathingFrequency.readOnly = true;
    info_heartRate.readOnly = true;
    info_temperature.readOnly = true;
    info_weightPatient.readOnly = true;
    info_sizePatient.readOnly = true;
}
const calculateIMC = () => {
    if (info_weightPatient.value === '' || info_sizePatient.value === '') {
        console.log('No cumple')
        return;
    }

    info_imc.value = (info_weightPatient.value / (info_sizePatient.value * info_sizePatient.value)).toFixed(2);
}
const editvitalSigns = () => {
    backHereditary = [];

    document.getElementById('edithereditary').style.display = 'none';
    document.getElementById('updatehereditary').style.display = 'inline';
    document.getElementById('cancelhereditary').style.display = 'inline';

    cbx_hfatf.disabled = false;
    cbx_hfatm.disabled = false;
    cbx_hfatgf.disabled = false;
    cbx_hfatgm.disabled = false;
    cbx_hfats.disabled = false;
    cbx_hfacf.disabled = false;
    cbx_hfacm.disabled = false;
    cbx_hfacgf.disabled = false;
    cbx_hfacgm.disabled = false;
    cbx_hfacs.disabled = false;
    cbx_hfpsf.disabled = false;
    cbx_hfpsm.disabled = false;
    cbx_hfpsgf.disabled = false;
    cbx_hfpsgm.disabled = false;
    cbx_hfpss.disabled = false;
    cbx_hfvif.disabled = false;
    cbx_hfvim.disabled = false;
    cbx_hfvigf.disabled = false;
    cbx_hfvigm.disabled = false;
    cbx_hfvis.disabled = false;
    cbx_hfalf.disabled = false;
    cbx_hfalm.disabled = false;
    cbx_hfalgf.disabled = false;
    cbx_hfalgm.disabled = false;
    cbx_hfals.disabled = false;
    cbx_hfalof.disabled = false;
    cbx_hfalom.disabled = false;
    cbx_hfalogf.disabled = false;
    cbx_hfalogm.disabled = false;
    cbx_hfalos.disabled = false;
    cbx_hfcanf.disabled = false;
    cbx_hfcanm.disabled = false;
    cbx_hfcangf.disabled = false;
    cbx_hfcangm.disabled = false;
    cbx_hfcans.disabled = false;
    cbx_hfmelf.disabled = false;
    cbx_hfmelm.disabled = false;
    cbx_hfmelgf.disabled = false;
    cbx_hfmelgm.disabled = false;
    cbx_hfmels.disabled = false;
    cbx_hfautf.disabled = false;
    cbx_hfautm.disabled = false;
    cbx_hfautgf.disabled = false;
    cbx_hfautgm.disabled = false;
    cbx_hfauts.disabled = false;
    cbx_hfcarf.disabled = false;
    cbx_hfcarm.disabled = false;
    cbx_hfcargf.disabled = false;
    cbx_hfcargm.disabled = false;
    cbx_hfcars.disabled = false;

    cbx_hfdif.disabled = false;
    cbx_hfdim.disabled = false;
    cbx_hfdigf.disabled = false;
    cbx_hfdigm.disabled = false;
    cbx_hfdis.disabled = false;
    cbx_hfhif.disabled = false;
    cbx_hfhim.disabled = false;
    cbx_hfhigf.disabled = false;
    cbx_hfhigm.disabled = false;
    cbx_hfhis.disabled = false;
    cbx_hfdisf.disabled = false;
    cbx_hfdism.disabled = false;
    cbx_hfdisgf.disabled = false;
    cbx_hfdisgm.disabled = false;
    cbx_hfdiss.disabled = false;
    cbx_hfnef.disabled = false;
    cbx_hfnem.disabled = false;
    cbx_hfnegf.disabled = false;
    cbx_hfnegm.disabled = false;
    cbx_hfnes.disabled = false;    
    cbx_hftirf.disabled = false;
    cbx_hftirm.disabled = false;
    cbx_hftirgf.disabled = false;
    cbx_hftirgm.disabled = false;
    cbx_hftirs.disabled = false;
    
    

    backHereditary.push({
        cbx_hfatf: cbx_hfatf.checked,
        cbx_hfatm: cbx_hfatm.checked,
        cbx_hfatgf: cbx_hfatgf.checked,
        cbx_hfatgm: cbx_hfatgm.checked,
        cbx_hfats: cbx_hfats.checked,
        cbx_hfacf: cbx_hfacf.checked,
        cbx_hfacm: cbx_hfacm.checked,
        cbx_hfacgf: cbx_hfacgf.checked,
        cbx_hfacgm: cbx_hfacgm.checked,
        cbx_hfacs: cbx_hfacs.checked,
        cbx_hfpsf: cbx_hfpsf.checked,
        cbx_hfpsm: cbx_hfpsm.checked,
        cbx_hfpsgf: cbx_hfpsgf.checked,
        cbx_hfpsgm: cbx_hfpsgm.checked,
        cbx_hfpss: cbx_hfpss.checked,
        cbx_hfvif: cbx_hfvif.checked,
        cbx_hfvim: cbx_hfvim.checked,
        cbx_hfvigf: cbx_hfvigf.checked,
        cbx_hfvigm: cbx_hfvigm.checked,
        cbx_hfvis: cbx_hfvis.checked,
        cbx_hfalf: cbx_hfalf.checked,
        cbx_hfalm: cbx_hfalm.checked,
        cbx_hfalgf: cbx_hfalgf.checked,
        cbx_hfalgm: cbx_hfalgm.checked,
        cbx_hfals: cbx_hfals.checked,
        cbx_hfalof: cbx_hfalof.checked,
        cbx_hfalom: cbx_hfalom.checked,
        cbx_hfalogf: cbx_hfalogf.checked,
        cbx_hfalogm: cbx_hfalogm.checked,
        cbx_hfalos: cbx_hfalos.checked,
        cbx_hfcanf: cbx_hfcanf.checked,
        cbx_hfcanm: cbx_hfcanm.checked,
        cbx_hfcangf: cbx_hfcangf.checked,
        cbx_hfcangm: cbx_hfcangm.checked,
        cbx_hfcans: cbx_hfcans.checked,
        cbx_hfmelf: cbx_hfmelf.checked,
        cbx_hfmelm: cbx_hfmelm.checked,
        cbx_hfmelgf: cbx_hfmelgf.checked,
        cbx_hfmelgm: cbx_hfmelgm.checked,
        cbx_hfmels: cbx_hfmels.checked,
        cbx_hfautf: cbx_hfautf.checked,
        cbx_hfautm: cbx_hfautm.checked,
        cbx_hfautgf: cbx_hfautgf.checked,
        cbx_hfautgm: cbx_hfautgm.checked,
        cbx_hfauts: cbx_hfauts.checked,
        cbx_hfcarf: cbx_hfcarf.checked,
        cbx_hfcarm: cbx_hfcarm.checked,
        cbx_hfcargf: cbx_hfcargf.checked,
        cbx_hfcargm: cbx_hfcargm.checked,
        cbx_hfcars: cbx_hfcars.checked,
        cbx_hfdif: cbx_hfdif.checked,
        cbx_hfdim: cbx_hfdim.checked,
        cbx_hfdigf: cbx_hfdigf.checked,
        cbx_hfdigm: cbx_hfdigm.checked,
        cbx_hfdis: cbx_hfdis.checked,
        cbx_hfhif: cbx_hfhif.checked,
        cbx_hfhim: cbx_hfhim.checked,
        cbx_hfhigf: cbx_hfhigf.checked,
        cbx_hfhigm: cbx_hfhigm.checked,
        cbx_hfhis: cbx_hfhis.checked,
        cbx_hfdisf: cbx_hfdisf.checked,
        cbx_hfdism: cbx_hfdism.checked,
        cbx_hfdisgf: cbx_hfdisgf.checked,
        cbx_hfdisgm: cbx_hfdisgm.checked,
        cbx_hfdiss: cbx_hfdiss.checked,
        cbx_hfnef: cbx_hfnef.checked,
        cbx_hfnem: cbx_hfnem.checked,
        cbx_hfnegf: cbx_hfnegf.checked,
        cbx_hfnegm: cbx_hfnegm.checked,
        cbx_hfnes: cbx_hfnes.checked,
        cbx_hftirf: cbx_hftirf.checked,
        cbx_hftirm: cbx_hftirm.checked,
        cbx_hftirgf: cbx_hftirgf.checked,
        cbx_hftirgm: cbx_hftirgm.checked,
        cbx_hftirs: cbx_hftirs.checked,
        
    })
}
const createvitalSigns = () => {
    fetch(`${envPatient.rutes.back}${envPatient.controllers.patient}CreateSigns`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            Signs: [
                {
                    id_paciente: idUser,
                    tension_arterial: info_bloodPressure.value,
                    frecuencia_resp: info_breathingFrequency.value,
                    frecuencia_car: info_heartRate.value,
                    temperatura: info_temperature.value,
                    peso: info_weightPatient.value,
                    altura: info_sizePatient.value,
                    imc: info_imc.value,
                    Fecha: moment().format('L'),
                    hora: moment().format('LT'),
                }
            ]
        })
        })
    .then(response => response.json())
    .then(result => {
        const { conflicts } = result
        if (conflicts !== null) {
            Alert('error', conflicts[0].Description);
            return
        }
        const { Description } = result.SuccessCreateSings[0]
        Alert('success', Description)
        viewvitalSigns();
    })
        .catch(error => Alert('error', error.message))
}
/* Modal vitalSigns */

/* Modal heredofamiliares */
const viewnhereditary = () => {
    subgroup_historyClinic.style.display = 'flex';

    form_clinicHistoryPatologiss.style.display = 'none'
    form_clinicHistoryNoPatologis.style.display = 'none'
    form_hereditary.style.display = 'inline'
    form_vitalSigns.style.display = 'none'
    form_allergies.style.display = 'none'
    form_results.style.display = 'none'

    cbx_hfatf.checked = false;
    cbx_hfatm.checked = false;
    cbx_hfatgf.checked = false;
    cbx_hfatgm.checked = false;
    cbx_hfats.checked = false;
    cbx_hfacf.checked = false;
    cbx_hfacm.checked = false;
    cbx_hfacgf.checked = false;
    cbx_hfacgm.checked = false;
    cbx_hfacs.checked = false;
    cbx_hfpsf.checked = false;
    cbx_hfpsm.checked = false;
    cbx_hfpsgf.checked = false;
    cbx_hfpsgm.checked = false;
    cbx_hfpss.checked = false;
    cbx_hfvif.checked = false;
    cbx_hfvim.checked = false;
    cbx_hfvigf.checked = false;
    cbx_hfvigm.checked = false;
    cbx_hfvis.checked = false;
    cbx_hfalf.checked = false;
    cbx_hfalm.checked = false;
    cbx_hfalgf.checked = false;
    cbx_hfalgm.checked = false;
    cbx_hfals.checked = false;
    cbx_hfalof.checked = false;
    cbx_hfalom.checked = false;
    cbx_hfalogf.checked = false;
    cbx_hfalogm.checked = false;
    cbx_hfalos.checked = false;
    cbx_hfcanf.checked = false;
    cbx_hfcanm.checked = false;
    cbx_hfcangf.checked = false;
    cbx_hfcangm.checked = false;
    cbx_hfcans.checked = false;
    cbx_hfmelf.checked = false;
    cbx_hfmelm.checked = false;
    cbx_hfmelgf.checked = false;
    cbx_hfmelgm.checked = false;
    cbx_hfmels.checked = false;
    cbx_hfautf.checked = false;
    cbx_hfautm.checked = false;
    cbx_hfautgf.checked = false;
    cbx_hfautgm.checked = false;
    cbx_hfauts.checked = false;
    cbx_hfcarf.checked = false;
    cbx_hfcarm.checked = false;
    cbx_hfcargf.checked = false;
    cbx_hfcargm.checked = false;
    cbx_hfcars.checked = false;
    cbx_hfdif.checked = false;
    cbx_hfdim.checked = false;
    cbx_hfdigf.checked = false;
    cbx_hfdigm.checked = false;
    cbx_hfdis.checked = false;
    cbx_hfhif.checked = false;
    cbx_hfhim.checked = false;
    cbx_hfhigf.checked = false;
    cbx_hfhigm.checked = false;
    cbx_hfhis.checked = false;
    cbx_hfdisf.checked = false;
    cbx_hfdism.checked = false;
    cbx_hfdisgf.checked = false;
    cbx_hfdisgm.checked = false;
    cbx_hfdiss.checked = false;
    cbx_hfnef.checked = false;
    cbx_hfnem.checked = false;
    cbx_hfnegf.checked = false;
    cbx_hfnegm.checked = false;
    cbx_hfnes.checked = false;    
    cbx_hftirf.checked = false;
    cbx_hftirm.checked = false;
    cbx_hftirgf.checked = false;
    cbx_hftirgm.checked = false;
    cbx_hftirs.checked = false;
    
 
    fetch(`${envPatient.rutes.back}${envPatient.controllers.patient}GetDatabackground?idPatient=${idUser}`)
    .then(response => response.json())
        .then(result => {
        const { antecedentes, Familiar } = result.background[0]
        if (antecedentes.length > 0) {
            antecedentes.map(element => {
                const index = Familiar.findIndex(it => it.id_familiar === element.id_familiar)
                if (index !== false) {
                    const { id_familiar, nombre } = Familiar[index];

                    if (nombre === 'Padre') {
                        cbx_hfatf.checked = element.atopia
                        cbx_hfacf.checked = element.acne
                        cbx_hfpsf.checked = element.psoriasis
                        cbx_hfvif.checked = element.vitiligo
                        cbx_hfalf.checked = element.alopecia_androgenica
                        cbx_hfalof.checked = element.alopecia_areata
                        cbx_hfcanf.checked = element.cancer_depiel_nm
                        cbx_hfmelf.checked = element.melanoma
                        cbx_hfautf.checked = element.enf_autoinmune
                        cbx_hfcarf.checked = element.cardiopatia
                        cbx_hfdif.checked = element.diabetes
                        cbx_hfhif.checked = element.hipertension
                        cbx_hfdisf.checked = element.dislipidemias
                        cbx_hfnef.checked = element.neoplasias    
                        cbx_hftirf.checked = element.enf_tiroideas
                    }
                    if (nombre === 'Madre') {
                        cbx_hfatm.checked = element.atopia
                        cbx_hfacm.checked = element.acne
                        cbx_hfpsm.checked = element.psoriasis
                        cbx_hfvim.checked = element.vitiligo
                        cbx_hfalm.checked = element.alopecia_androgenica
                        cbx_hfalom.checked = element.alopecia_areata
                        cbx_hfcanm.checked = element.cancer_depiel_nm
                        cbx_hfmelm.checked = element.melanoma
                        cbx_hfautm.checked = element.enf_autoinmune
                        cbx_hfcarm.checked = element.cardiopatia
                        cbx_hfdim.checked = element.diabetes
                        cbx_hfhim.checked = element.hipertension
                        cbx_hfdism.checked = element.dislipidemias
                        cbx_hfnem.checked = element.neoplasias
                        cbx_hftirm.checked = element.enf_tiroideas
                    }
                    if (nombre === 'Abuelos Paternos') {
                        cbx_hfatgf.checked = element.atopia
                        cbx_hfacgf.checked = element.acne
                        cbx_hfpsgf.checked = element.psoriasis
                        cbx_hfvigf.checked = element.vitiligo
                        cbx_hfalgf.checked = element.alopecia_androgenica
                        cbx_hfalogf.checked = element.alopecia_areata
                        cbx_hfcangf.checked = element.cancer_depiel_nm
                        cbx_hfmelgf.checked = element.melanoma
                        cbx_hfautgf.checked = element.enf_autoinmune
                        cbx_hfcargf.checked = element.cardiopatia
                        cbx_hfdigf.checked = element.diabetes
                        cbx_hfhigf.checked = element.hipertension
                        cbx_hfdisgf.checked = element.dislipidemias
                        cbx_hfnegf.checked = element.neoplasias                        
                        cbx_hftirgf.checked = element.enf_tiroideas                        
                    }
                    if (nombre === 'Abuelos Maternos') {
                        cbx_hfatgm.checked = element.atopia
                        cbx_hfacgm.checked = element.acne
                        cbx_hfpsgm.checked = element.psoriasis
                        cbx_hfvigm.checked = element.vitiligo
                        cbx_hfalgm.checked = element.alopecia_androgenica
                        cbx_hfalogm.checked = element.alopecia_areata
                        cbx_hfcangm.checked = element.cancer_depiel_nm
                        cbx_hfmelgm.checked = element.melanoma
                        cbx_hfautgm.checked = element.enf_autoinmune
                        cbx_hfcargm.checked = element.cardiopatia
                        cbx_hfdigm.checked = element.diabetes
                        cbx_hfhigm.checked = element.hipertension
                        cbx_hfdisgm.checked = element.dislipidemias
                        cbx_hfnegm.checked = element.neoplasias                       
                        cbx_hftirgm.checked = element.enf_tiroideas
                    }
                    if (nombre === 'Hermanos') {
                        cbx_hfats.checked = element.atopia
                        cbx_hfacs.checked = element.acne
                        cbx_hfpss.checked = element.psoriasis
                        cbx_hfvis.checked = element.vitiligo
                        cbx_hfals.checked = element.alopecia_androgenica
                        cbx_hfalos.checked = element.alopecia_areata
                        cbx_hfcans.checked = element.cancer_depiel_nm
                        cbx_hfmels.checked = element.melanoma
                        cbx_hfauts.checked = element.enf_autoinmune
                        cbx_hfcars.checked = element.cardiopatia
                        cbx_hfdis.checked = element.diabetes
                        cbx_hfhis.checked = element.hipertension
                        cbx_hfdiss.checked = element.dislipidemias
                        cbx_hfnes.checked = element.neoplasias
                        cbx_hftirs.checked = element.enf_tiroideas
                    }
                }

            })
        }

        cbx_hfatf.disabled = true;
        cbx_hfatm.disabled = true;
        cbx_hfatgf.disabled = true;
        cbx_hfatgm.disabled = true;
        cbx_hfats.disabled = true;
        cbx_hfacf.disabled = true;
        cbx_hfacm.disabled = true;
        cbx_hfacgf.disabled = true;
        cbx_hfacgm.disabled = true;
        cbx_hfacs.disabled = true;
        cbx_hfpsf.disabled = true;
        cbx_hfpsm.disabled = true;
        cbx_hfpsgf.disabled = true;
        cbx_hfpsgm.disabled = true;
        cbx_hfpss.disabled = true;
        cbx_hfvif.disabled = true;
        cbx_hfvim.disabled = true;
        cbx_hfvigf.disabled = true;
        cbx_hfvigm.disabled = true;
        cbx_hfvis.disabled = true;
        cbx_hfalf.disabled = true;
        cbx_hfalm.disabled = true;
        cbx_hfalgf.disabled = true;
        cbx_hfalgm.disabled = true;
        cbx_hfals.disabled = true;
        cbx_hfalof.disabled = true;
        cbx_hfalom.disabled = true;
        cbx_hfalogf.disabled = true;
        cbx_hfalogm.disabled = true;
        cbx_hfalos.disabled = true;
        cbx_hfcanf.disabled = true;
        cbx_hfcanm.disabled = true;
        cbx_hfcangf.disabled = true;
        cbx_hfcangm.disabled = true;
        cbx_hfcans.disabled = true;
        cbx_hfmelf.disabled = true;
        cbx_hfmelm.disabled = true;
        cbx_hfmelgf.disabled = true;
        cbx_hfmelgm.disabled = true;
        cbx_hfmels.disabled = true;
        cbx_hfautf.disabled = true;
        cbx_hfautm.disabled = true;
        cbx_hfautgf.disabled = true;
        cbx_hfautgm.disabled = true;
        cbx_hfauts.disabled = true;
        cbx_hfcarf.disabled = true;
        cbx_hfcarm.disabled = true;
        cbx_hfcargf.disabled = true;
        cbx_hfcargm.disabled = true;
        cbx_hfcars.disabled = true;
        cbx_hfdif.disabled = true;
        cbx_hfdim.disabled = true;
        cbx_hfdigf.disabled = true;
        cbx_hfdigm.disabled = true;
        cbx_hfdis.disabled = true;
        cbx_hfhif.disabled = true;
        cbx_hfhim.disabled = true;
        cbx_hfhigf.disabled = true;
        cbx_hfhigm.disabled = true;
        cbx_hfhis.disabled = true;
        cbx_hfdisf.disabled = true;
        cbx_hfdism.disabled = true;
        cbx_hfdisgf.disabled = true;
        cbx_hfdisgm.disabled = true;
        cbx_hfdiss.disabled = true;
        cbx_hfnef.disabled = true;
        cbx_hfnem.disabled = true;
        cbx_hfnegf.disabled = true;
        cbx_hfnegm.disabled = true;
        cbx_hfnes.disabled = true;
        cbx_hftirf.disabled = true;
        cbx_hftirm.disabled = true;
        cbx_hftirgf.disabled = true;
        cbx_hftirgm.disabled = true;
        cbx_hftirs.disabled = true;

    })
    .catch(error => Alert('error', error.message))
}
const edithereditary = () => {
    backHereditary = [];

    document.getElementById('edithereditary').style.display = 'none';
    document.getElementById('updatehereditary').style.display = 'inline';
    document.getElementById('cancelhereditary').style.display = 'inline';

    cbx_hfatf.disabled = false;
    cbx_hfatm.disabled = false;
    cbx_hfatgf.disabled = false;
    cbx_hfatgm.disabled = false;
    cbx_hfats.disabled = false;
    cbx_hfacf.disabled = false;
    cbx_hfacm.disabled = false;
    cbx_hfacgf.disabled = false;
    cbx_hfacgm.disabled = false;
    cbx_hfacs.disabled = false;
    cbx_hfpsf.disabled = false;
    cbx_hfpsm.disabled = false;
    cbx_hfpsgf.disabled = false;
    cbx_hfpsgm.disabled = false;
    cbx_hfpss.disabled = false;
    cbx_hfvif.disabled = false;
    cbx_hfvim.disabled = false;
    cbx_hfvigf.disabled = false;
    cbx_hfvigm.disabled = false;
    cbx_hfvis.disabled = false;
    cbx_hfalf.disabled = false;
    cbx_hfalm.disabled = false;
    cbx_hfalgf.disabled = false;
    cbx_hfalgm.disabled = false;
    cbx_hfals.disabled = false;
    cbx_hfalof.disabled = false;
    cbx_hfalom.disabled = false;
    cbx_hfalogf.disabled = false;
    cbx_hfalogm.disabled = false;
    cbx_hfalos.disabled = false;
    cbx_hfcanf.disabled = false;
    cbx_hfcanm.disabled = false;
    cbx_hfcangf.disabled = false;
    cbx_hfcangm.disabled = false;
    cbx_hfcans.disabled = false;
    cbx_hfmelf.disabled = false;
    cbx_hfmelm.disabled = false;
    cbx_hfmelgf.disabled = false;
    cbx_hfmelgm.disabled = false;
    cbx_hfmels.disabled = false;
    cbx_hfautf.disabled = false;
    cbx_hfautm.disabled = false;
    cbx_hfautgf.disabled = false;
    cbx_hfautgm.disabled = false;
    cbx_hfauts.disabled = false;
    cbx_hfcarf.disabled = false;
    cbx_hfcarm.disabled = false;
    cbx_hfcargf.disabled = false;
    cbx_hfcargm.disabled = false;
    cbx_hfcars.disabled = false;
    cbx_hfdif.disabled = false;
    cbx_hfdim.disabled = false;
    cbx_hfdigf.disabled = false;
    cbx_hfdigm.disabled = false;
    cbx_hfdis.disabled = false;
    cbx_hfhif.disabled = false;
    cbx_hfhim.disabled = false;
    cbx_hfhigf.disabled = false;
    cbx_hfhigm.disabled = false;
    cbx_hfhis.disabled = false;
    cbx_hfdisf.disabled = false;
    cbx_hfdism.disabled = false;
    cbx_hfdisgf.disabled = false;
    cbx_hfdisgm.disabled = false;
    cbx_hfdiss.disabled = false;
    cbx_hfnef.disabled = false;
    cbx_hfnem.disabled = false;
    cbx_hfnegf.disabled = false;
    cbx_hfnegm.disabled = false;
    cbx_hfnes.disabled = false;
    cbx_hftirf.disabled = false;
    cbx_hftirm.disabled = false;
    cbx_hftirgf.disabled = false;
    cbx_hftirgm.disabled = false;
    cbx_hftirs.disabled = false;
    

    backHereditary.push({
        cbx_hfatf: cbx_hfatf.checked,
        cbx_hfatm: cbx_hfatm.checked,
        cbx_hfatgf: cbx_hfatgf.checked,
        cbx_hfatgm: cbx_hfatgm.checked,
        cbx_hfats: cbx_hfats.checked,
        cbx_hfacf: cbx_hfacf.checked,
        cbx_hfacm: cbx_hfacm.checked,
        cbx_hfacgf: cbx_hfacgf.checked,
        cbx_hfacgm: cbx_hfacgm.checked,
        cbx_hfacs: cbx_hfacs.checked,
        cbx_hfpsf: cbx_hfpsf.checked,
        cbx_hfpsm: cbx_hfpsm.checked,
        cbx_hfpsgf: cbx_hfpsgf.checked,
        cbx_hfpsgm: cbx_hfpsgm.checked,
        cbx_hfpss: cbx_hfpss.checked,
        cbx_hfvif: cbx_hfvif.checked,
        cbx_hfvim: cbx_hfvim.checked,
        cbx_hfvigf: cbx_hfvigf.checked,
        cbx_hfvigm: cbx_hfvigm.checked,
        cbx_hfvis: cbx_hfvis.checked,
        cbx_hfalf: cbx_hfalf.checked,
        cbx_hfalm: cbx_hfalm.checked,
        cbx_hfalgf: cbx_hfalgf.checked,
        cbx_hfalgm: cbx_hfalgm.checked,
        cbx_hfals: cbx_hfals.checked,
        cbx_hfalof: cbx_hfalof.checked,
        cbx_hfalom: cbx_hfalom.checked,
        cbx_hfalogf: cbx_hfalogf.checked,
        cbx_hfalogm: cbx_hfalogm.checked,
        cbx_hfalos: cbx_hfalos.checked,
        cbx_hfcanf: cbx_hfcanf.checked,
        cbx_hfcanm: cbx_hfcanm.checked,
        cbx_hfcangf: cbx_hfcangf.checked,
        cbx_hfcangm: cbx_hfcangm.checked,
        cbx_hfcans: cbx_hfcans.checked,
        cbx_hfmelf: cbx_hfmelf.checked,
        cbx_hfmelm: cbx_hfmelm.checked,
        cbx_hfmelgf: cbx_hfmelgf.checked,
        cbx_hfmelgm: cbx_hfmelgm.checked,
        cbx_hfmels: cbx_hfmels.checked,
        cbx_hfautf: cbx_hfautf.checked,
        cbx_hfautm: cbx_hfautm.checked,
        cbx_hfautgf: cbx_hfautgf.checked,
        cbx_hfautgm: cbx_hfautgm.checked,
        cbx_hfauts: cbx_hfauts.checked,
        cbx_hfcarf: cbx_hfcarf.checked,
        cbx_hfcarm: cbx_hfcarm.checked,
        cbx_hfcargf: cbx_hfcargf.checked,
        cbx_hfcargm: cbx_hfcargm.checked,
        cbx_hfcars: cbx_hfcars.checked,
        cbx_hfdif: cbx_hfdif.checked,
        cbx_hfdim: cbx_hfdim.checked,
        cbx_hfdigf: cbx_hfdigf.checked,
        cbx_hfdigm: cbx_hfdigm.checked,
        cbx_hfdis: cbx_hfdis.checked,
        cbx_hfhif: cbx_hfhif.checked,
        cbx_hfhim: cbx_hfhim.checked,
        cbx_hfhigf: cbx_hfhigf.checked,
        cbx_hfhigm: cbx_hfhigm.checked,
        cbx_hfhis: cbx_hfhis.checked,
        cbx_hfdisf: cbx_hfdisf.checked,
        cbx_hfdism: cbx_hfdism.checked,
        cbx_hfdisgf: cbx_hfdisgf.checked,
        cbx_hfdisgm: cbx_hfdisgm.checked,
        cbx_hfdiss: cbx_hfdiss.checked,
        cbx_hfnef: cbx_hfnef.checked,
        cbx_hfnem: cbx_hfnem.checked,
        cbx_hfnegf: cbx_hfnegf.checked,
        cbx_hfnegm: cbx_hfnegm.checked,
        cbx_hfnes: cbx_hfnes.checked,        
        cbx_hftirf: cbx_hftirf.checked,
        cbx_hftirm: cbx_hftirm.checked,
        cbx_hftirgf: cbx_hftirgf.checked,
        cbx_hftirgm: cbx_hftirgm.checked,
        cbx_hftirs: cbx_hftirs.checked,
        
    })
}
const cancelhereditary = () => {
    document.getElementById('edithereditary').style.display = 'inline';
    document.getElementById('updatehereditary').style.display = 'none';
    document.getElementById('cancelhereditary').style.display = 'none';

    cbx_hfatf.disabled = true;
    cbx_hfatm.disabled = true;
    cbx_hfatgf.disabled = true;
    cbx_hfatgm.disabled = true;
    cbx_hfats.disabled = true;
    cbx_hfacf.disabled = true;
    cbx_hfacm.disabled = true;
    cbx_hfacgf.disabled = true;
    cbx_hfacgm.disabled = true;
    cbx_hfacs.disabled = true;
    cbx_hfpsf.disabled = true;
    cbx_hfpsm.disabled = true;
    cbx_hfpsgf.disabled = true;
    cbx_hfpsgm.disabled = true;
    cbx_hfpss.disabled = true;
    cbx_hfvif.disabled = true;
    cbx_hfvim.disabled = true;
    cbx_hfvigf.disabled = true;
    cbx_hfvigm.disabled = true;
    cbx_hfvis.disabled = true;
    cbx_hfalf.disabled = true;
    cbx_hfalm.disabled = true;
    cbx_hfalgf.disabled = true;
    cbx_hfalgm.disabled = true;
    cbx_hfals.disabled = true;
    cbx_hfalof.disabled = true;
    cbx_hfalom.disabled = true;
    cbx_hfalogf.disabled = true;
    cbx_hfalogm.disabled = true;
    cbx_hfalos.disabled = true;
    cbx_hfcanf.disabled = true;
    cbx_hfcanm.disabled = true;
    cbx_hfcangf.disabled = true;
    cbx_hfcangm.disabled = true;
    cbx_hfcans.disabled = true;
    cbx_hfmelf.disabled = true;
    cbx_hfmelm.disabled = true;
    cbx_hfmelgf.disabled = true;
    cbx_hfmelgm.disabled = true;
    cbx_hfmels.disabled = true;
    cbx_hfautf.disabled = true;
    cbx_hfautm.disabled = true;
    cbx_hfautgf.disabled = true;
    cbx_hfautgm.disabled = true;
    cbx_hfauts.disabled = true;
    cbx_hfcarf.disabled = true;
    cbx_hfcarm.disabled = true;
    cbx_hfcargf.disabled = true;
    cbx_hfcargm.disabled = true;
    cbx_hfcars.disabled = true;
    cbx_hfdif.disabled = true;
    cbx_hfdim.disabled = true;
    cbx_hfdigf.disabled = true;
    cbx_hfdigm.disabled = true;
    cbx_hfdis.disabled = true;
    cbx_hfhif.disabled = true;
    cbx_hfhim.disabled = true;
    cbx_hfhigf.disabled = true;
    cbx_hfhigm.disabled = true;
    cbx_hfhis.disabled = true;
    cbx_hfdisf.disabled = true;
    cbx_hfdism.disabled = true;
    cbx_hfdisgf.disabled = true;
    cbx_hfdisgm.disabled = true;
    cbx_hfdiss.disabled = true;
    cbx_hfnef.disabled = true;
    cbx_hfnem.disabled = true;
    cbx_hfnegf.disabled = true;
    cbx_hfnegm.disabled = true;
    cbx_hfnes.disabled = true;
    cbx_hftirf.disabled = true;
    cbx_hftirm.disabled = true;
    cbx_hftirgf.disabled = true;
    cbx_hftirgm.disabled = true;
    cbx_hftirs.disabled = true;
    
    cbx_hfatf.checked = backHereditary[0].cbx_hfatf;
    cbx_hfatm.checked = backHereditary[0].cbx_hfatm;
    cbx_hfatgf.checked = backHereditary[0].cbx_hfatgf;
    cbx_hfatgm.checked = backHereditary[0].cbx_hfatgm;
    cbx_hfats.checked = backHereditary[0].cbx_hfats;
    cbx_hfacf.checked = backHereditary[0].cbx_hfacf;
    cbx_hfacm.checked = backHereditary[0].cbx_hfacm;
    cbx_hfacgf.checked = backHereditary[0].cbx_hfacgf;
    cbx_hfacgm.checked = backHereditary[0].cbx_hfacgm;
    cbx_hfacs.checked = backHereditary[0].cbx_hfacs;
    cbx_hfpsf.checked = backHereditary[0].cbx_hfpsf;
    cbx_hfpsm.checked = backHereditary[0].cbx_hfpsm;
    cbx_hfpsgf.checked = backHereditary[0].cbx_hfpsgf;
    cbx_hfpsgm.checked = backHereditary[0].cbx_hfpsgm;
    cbx_hfpss.checked = backHereditary[0].cbx_hfpss;
    cbx_hfvif.checked = backHereditary[0].cbx_hfvif;
    cbx_hfvim.checked = backHereditary[0].cbx_hfvim;
    cbx_hfvigf.checked = backHereditary[0].cbx_hfvigf;
    cbx_hfvigm.checked = backHereditary[0].cbx_hfvigm;
    cbx_hfvis.checked = backHereditary[0].cbx_hfvis;
    cbx_hfalf.checked = backHereditary[0].cbx_hfalf;
    cbx_hfalm.checked = backHereditary[0].cbx_hfalm;
    cbx_hfalgf.checked = backHereditary[0].cbx_hfalgf;
    cbx_hfalgm.checked = backHereditary[0].cbx_hfalgm;
    cbx_hfals.checked = backHereditary[0].cbx_hfals;
    cbx_hfalof.checked = backHereditary[0].cbx_hfalof;
    cbx_hfalom.checked = backHereditary[0].cbx_hfalom;
    cbx_hfalogf.checked = backHereditary[0].cbx_hfalogf;
    cbx_hfalogm.checked = backHereditary[0].cbx_hfalogm;
    cbx_hfalos.checked = backHereditary[0].cbx_hfalos;
    cbx_hfcanf.checked = backHereditary[0].cbx_hfcanf;
    cbx_hfcanm.checked = backHereditary[0].cbx_hfcanm;
    cbx_hfcangf.checked = backHereditary[0].cbx_hfcangf;
    cbx_hfcangm.checked = backHereditary[0].cbx_hfcangm;
    cbx_hfcans.checked = backHereditary[0].cbx_hfcans;
    cbx_hfmelf.checked = backHereditary[0].cbx_hfmelf;
    cbx_hfmelm.checked = backHereditary[0].cbx_hfmelm;
    cbx_hfmelgf.checked = backHereditary[0].cbx_hfmelgf;
    cbx_hfmelgm.checked = backHereditary[0].cbx_hfmelgm;
    cbx_hfmels.checked = backHereditary[0].cbx_hfmels;
    cbx_hfautf.checked = backHereditary[0].cbx_hfautf;
    cbx_hfautm.checked = backHereditary[0].cbx_hfautm;
    cbx_hfautgf.checked = backHereditary[0].cbx_hfautgf;
    cbx_hfautgm.checked = backHereditary[0].cbx_hfautgm;
    cbx_hfauts.checked = backHereditary[0].cbx_hfauts;
    cbx_hfcarf.checked = backHereditary[0].cbx_hfcarf;
    cbx_hfcarm.checked = backHereditary[0].cbx_hfcarm;
    cbx_hfcargf.checked = backHereditary[0].cbx_hfcargf;
    cbx_hfcargm.checked = backHereditary[0].cbx_hfcargm;
    cbx_hfcars.checked = backHereditary[0].cbx_hfcars;
    cbx_hfdif.checked = backHereditary[0].cbx_hfdif;
    cbx_hfdim.checked = backHereditary[0].cbx_hfdim;
    cbx_hfdigf.checked = backHereditary[0].cbx_hfdigf;
    cbx_hfdigm.checked = backHereditary[0].cbx_hfdigm;
    cbx_hfdis.checked = backHereditary[0].cbx_hfdis;
    cbx_hfhif.checked = backHereditary[0].cbx_hfhif;
    cbx_hfhim.checked = backHereditary[0].cbx_hfhim;
    cbx_hfhigf.checked = backHereditary[0].cbx_hfhigf;
    cbx_hfhigm.checked = backHereditary[0].cbx_hfhigm;
    cbx_hfhis.checked = backHereditary[0].cbx_hfhis;
    cbx_hfdisf.checked = backHereditary[0].cbx_hfdisf;
    cbx_hfdism.checked = backHereditary[0].cbx_hfdism;
    cbx_hfdisgf.checked = backHereditary[0].cbx_hfdisgf;
    cbx_hfdisgm.checked = backHereditary[0].cbx_hfdisgm;
    cbx_hfdiss.checked = backHereditary[0].cbx_hfdiss;
    cbx_hfnef.checked = backHereditary[0].cbx_hfnef;
    cbx_hfnem.checked = backHereditary[0].cbx_hfnem;
    cbx_hfnegf.checked = backHereditary[0].cbx_hfnegf;
    cbx_hfnegm.checked = backHereditary[0].cbx_hfnegm;
    cbx_hfnes.checked = backHereditary[0].cbx_hfnes;
    
    
    
    cbx_hftirf.checked = backHereditary[0].cbx_hftirf;
    cbx_hftirm.checked = backHereditary[0].cbx_hftirm;
    cbx_hftirgf.checked = backHereditary[0].cbx_hftirgf;
    cbx_hftirgm.checked = backHereditary[0].cbx_hftirgm;
    cbx_hftirs.checked = backHereditary[0].cbx_hftirs;
    
}
const updatehereditary = () => {
    fetch(`${envPatient.rutes.back}${envPatient.controllers.patient}Createbackground`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "background": [
                {
                    id_paciente: idUser,
                    id_familiar: 1,
                    atopia:             cbx_hfatf.checked,
                    acne:               cbx_hfacf.checked,
                    psoriasis:          cbx_hfpsf.checked,
                    vitiligo:           cbx_hfvif.checked,
                    alopecia_androgenica: cbx_hfalf.checked,
                    alopecia_areata:    cbx_hfalof.checked,
                    cancer_depiel_nm:   cbx_hfcanf.checked,
                    melanoma:           cbx_hfmelf.checked,
                    enf_autoinmune:     cbx_hfautf.checked,
                    cardiopatia:        cbx_hfcarf.checked,
                    diabetes_melitus:   cbx_hfdif.checked,
                    hipertension:       cbx_hfhif.checked,
                    dislipidemias:      cbx_hfdisf.checked,
                    neoplasias:         cbx_hfnef.checked,
                    enf_tiroideas:      cbx_hftirf.checked,
                },
                {
                    id_paciente: idUser,
                    id_familiar: 2,
                    atopia:             cbx_hfatm.checked,
                    acne:               cbx_hfacm.checked,
                    psoriasis:          cbx_hfpsm.checked,
                    vitiligo:           cbx_hfvim.checked,
                    alopecia_androgenica: cbx_hfalm.checked,
                    alopecia_areata:    cbx_hfalom.checked,
                    cancer_depiel_nm:   cbx_hfcanm.checked,
                    melanoma:           cbx_hfmelm.checked,
                    enf_autoinmune:     cbx_hfautm.checked,
                    cardiopatia:        cbx_hfcarm.checked,
                    diabetes_melitus:   cbx_hfdim.checked,
                    hipertension:       cbx_hfhim.checked,
                    dislipidemias:      cbx_hfdism.checked,
                    neoplasias:         cbx_hfnem.checked,
                    enf_tiroideas:      cbx_hftirm.checked,
                },
                {
                    id_paciente: idUser,
                    id_familiar: 3,
                    atopia:             cbx_hfatgf.checked,
                    acne:               cbx_hfacgf.checked,
                    psoriasis:          cbx_hfpsgf.checked,
                    vitiligo:           cbx_hfvigf.checked,
                    alopecia_androgenica: cbx_hfalgf.checked,
                    alopecia_areata:    cbx_hfalogf.checked,
                    cancer_depiel_nm:   cbx_hfcangf.checked,
                    melanoma:           cbx_hfmelgf.checked,
                    enf_autoinmune:     cbx_hfautgf.checked,
                    cardiopatia:        cbx_hfcargf.checked,
                    diabetes_melitus:   cbx_hfdigf.checked,
                    hipertension:       cbx_hfhigf.checked,
                    dislipidemias:      cbx_hfdisgf.checked,
                    neoplasias:         cbx_hfnegf.checked,
                    enf_tiroideas:      cbx_hftirgf.checked,
                },
                {
                    id_paciente: idUser,
                    id_familiar: 4,
                    atopia:             cbx_hfatgm.checked,
                    acne:               cbx_hfacgm.checked,
                    psoriasis:          cbx_hfpsgm.checked,
                    vitiligo:           cbx_hfvigm.checked,
                    alopecia_androgenica: cbx_hfalgm.checked,
                    alopecia_areata:    cbx_hfalogm.checked,
                    cancer_depiel_nm:   cbx_hfcangm.checked,
                    melanoma:           cbx_hfmelgm.checked,
                    enf_autoinmune:     cbx_hfautgm.checked,
                    cardiopatia:        cbx_hfcargm.checked,
                    diabetes_melitus:   cbx_hfdigm.checked,
                    hipertension:       cbx_hfhigm.checked,
                    dislipidemias:      cbx_hfdisgm.checked,
                    neoplasias:         cbx_hfnegm.checked,
                    enf_tiroideas:      cbx_hftirgm.checked,
                },
                {
                    id_paciente: idUser,
                    id_familiar: 5,
                    atopia:             cbx_hfats.checked,
                    acne:               cbx_hfacs.checked,
                    psoriasis:          cbx_hfpss.checked,
                    vitiligo:           cbx_hfvis.checked,
                    alopecia_androgenica: cbx_hfals.checked,
                    alopecia_areata:    cbx_hfalos.checked,
                    cancer_depiel_nm:   cbx_hfcans.checked,
                    melanoma:           cbx_hfmels.checked,
                    enf_autoinmune:     cbx_hfauts.checked,
                    cardiopatia:        cbx_hfcars.checked,
                    diabetes_melitus:   cbx_hfdis.checked,
                    hipertension:       cbx_hfhis.checked,
                    dislipidemias:      cbx_hfdiss.checked,
                    neoplasias:         cbx_hfnes.checked,
                    enf_tiroideas:      cbx_hftirs.checked,
                }
            ]
        })
        })
        .then(response => response.json())
        .then(result => {
            const { conflicts } = result
            if (conflicts !== null) {
                Alert('error', conflicts[0].Description);
                return
            }

            const { Description } = result.SuccessCreateBackground[0]
            Alert('success', Description)

            backHereditary = [];
            backHereditary.push({
                cbx_hfatf: cbx_hfatf.checked,
                cbx_hfatm: cbx_hfatm.checked,
                cbx_hfatgf: cbx_hfatgf.checked,
                cbx_hfatgm: cbx_hfatgm.checked,
                cbx_hfats: cbx_hfats.checked,
                cbx_hfacf: cbx_hfacf.checked,
                cbx_hfacm: cbx_hfacm.checked,
                cbx_hfacgf: cbx_hfacgf.checked,
                cbx_hfacgm: cbx_hfacgm.checked,
                cbx_hfacs: cbx_hfacs.checked,
                cbx_hfpsf: cbx_hfpsf.checked,
                cbx_hfpsm: cbx_hfpsm.checked,
                cbx_hfpsgf: cbx_hfpsgf.checked,
                cbx_hfpsgm: cbx_hfpsgm.checked,
                cbx_hfpss: cbx_hfpss.checked,
                cbx_hfvif: cbx_hfvif.checked,
                cbx_hfvim: cbx_hfvim.checked,
                cbx_hfvigf: cbx_hfvigf.checked,
                cbx_hfvigm: cbx_hfvigm.checked,
                cbx_hfvis: cbx_hfvis.checked,
                cbx_hfalf: cbx_hfalf.checked,
                cbx_hfalm: cbx_hfalm.checked,
                cbx_hfalgf: cbx_hfalgf.checked,
                cbx_hfalgm: cbx_hfalgm.checked,
                cbx_hfals: cbx_hfals.checked,
                cbx_hfalof: cbx_hfalof.checked,
                cbx_hfalom: cbx_hfalom.checked,
                cbx_hfalogf: cbx_hfalogf.checked,
                cbx_hfalogm: cbx_hfalogm.checked,
                cbx_hfalos: cbx_hfalos.checked,
                cbx_hfcanf: cbx_hfcanf.checked,
                cbx_hfcanm: cbx_hfcanm.checked,
                cbx_hfcangf: cbx_hfcangf.checked,
                cbx_hfcangm: cbx_hfcangm.checked,
                cbx_hfcans: cbx_hfcans.checked,
                cbx_hfmelf: cbx_hfmelf.checked,
                cbx_hfmelm: cbx_hfmelm.checked,
                cbx_hfmelgf: cbx_hfmelgf.checked,
                cbx_hfmelgm: cbx_hfmelgm.checked,
                cbx_hfmels: cbx_hfmels.checked,
                cbx_hfautf: cbx_hfautf.checked,
                cbx_hfautm: cbx_hfautm.checked,
                cbx_hfautgf: cbx_hfautgf.checked,
                cbx_hfautgm: cbx_hfautgm.checked,
                cbx_hfauts: cbx_hfauts.checked,
                cbx_hfcarf: cbx_hfcarf.checked,
                cbx_hfcarm: cbx_hfcarm.checked,
                cbx_hfcargf: cbx_hfcargf.checked,
                cbx_hfcargm: cbx_hfcargm.checked,
                cbx_hfcars: cbx_hfcars.checked,
                cbx_hfdif: cbx_hfdif.checked,
                cbx_hfdim: cbx_hfdim.checked,
                cbx_hfdigf: cbx_hfdigf.checked,
                cbx_hfdigm: cbx_hfdigm.checked,
                cbx_hfdis: cbx_hfdis.checked,
                cbx_hfhif: cbx_hfhif.checked,
                cbx_hfhim: cbx_hfhim.checked,
                cbx_hfhigf: cbx_hfhigf.checked,
                cbx_hfhigm: cbx_hfhigm.checked,
                cbx_hfhis: cbx_hfhis.checked,
                cbx_hfdisf: cbx_hfdisf.checked,
                cbx_hfdism: cbx_hfdism.checked,
                cbx_hfdisgf: cbx_hfdisgf.checked,
                cbx_hfdisgm: cbx_hfdisgm.checked,
                cbx_hfdiss: cbx_hfdiss.checked,
                cbx_hfnef: cbx_hfnef.checked,
                cbx_hfnem: cbx_hfnem.checked,
                cbx_hfnegf: cbx_hfnegf.checked,
                cbx_hfnegm: cbx_hfnegm.checked,
                cbx_hfnes: cbx_hfnes.checked,
                cbx_hftirf: cbx_hftirf.checked,
                cbx_hftirm: cbx_hftirm.checked,
                cbx_hftirgf: cbx_hftirgf.checked,
                cbx_hftirgm: cbx_hftirgm.checked,
                cbx_hftirs: cbx_hftirs.checked,                
            })
            cancelhereditary();
        })
        .catch(error => Alert('error', error.message))
}
/* Modal heredofamiliares */

/* Modal detalle Antecedentes patologicos */
const viewpathological = () => {
    subgroup_historyClinic.style.display = 'flex';

    form_clinicHistoryPatologiss.style.display = 'inline'
    form_clinicHistoryNoPatologis.style.display = 'none'
    form_hereditary.style.display = 'none'
    form_vitalSigns.style.display = 'none'
    form_allergies.style.display = 'none'
    form_results.style.display = 'none'

    btnHistoryClinic1.checked = true;
    btnHistoryClinic2.checked = false;
    btnHistoryClinic3.checked = false;
    btnHistoryClinic4.checked = false;
    btnHistoryClinic5.checked = false;
    btnHistoryClinic6.checked = false;

    cbx_hospitalitation.checked = false;
    cbx_surgical.checked = false;
    cbx_traumatic.checked = false;
    cbx_transfusionales.checked = false;
    cbx_Exantema.checked = false;
    cbx_escarlatina.checked = false;
    cbx_Rubeola.checked = false;
    cbx_Sarampion.checked = false;
    cbx_Varicela.checked = false;
    cbx_otherPatology.checked = false;
    cbx_infectocontagiosas.checked = false;
    cbx_Fiebre.checked = false;
    cbx_Hepatitis.checked = false;
    cbx_Parasitosis.checked = false;
    cbx_Tifoidea.checked = false;
    cbx_sexual.checked = false;
    cbx_Tuberculosis.checked = false;
    cbx_Diabetes.checked = false;
    cbx_arterial.checked = false;
    cbx_Dislipidemias.checked = false;
    cbx_Obesidad.checked = false;
    cbx_Neoplasicas.checked = false;
    cbx_reumatologicas.checked = false;
    cbx_nephropathy.checked = false;
    cbx_heartdisease.checked = false;
    cbx_hepatopathy.checked = false;
    cbx_neuropathy.checked = false;
    cbx_gastrointestinaldisease.checked = false;
    cbx_autoimmunedisease.checked = false;
    cbx_ovarysyndrome.checked = false;

    cbx_others.value = '';
    fetch(`${envPatient.rutes.back}${envPatient.controllers.patient}GetDataPathological?idPatient=${idUser}`)
    .then(response => response.json())
    .then(result => {
        const { Chronic, Exanthematic, General, Infectious } = result.DataPathological[0]

        if (General.length > 0) {
            cbx_hospitalitation.checked = General[0].hospitalizaciones;
            cbx_surgical.checked = General[0].quirurgicos;
            cbx_traumatic.checked = General[0].traumaticos;
            cbx_transfusionales.checked = General[0].transfusibles;
            cbx_others.value = General[0].otros === null ? '' : General[0].otros;
        }
        if (Infectious.length > 0) {
            cbx_infectocontagiosas.checked = Infectious[0].faringoamigdalitis;
            cbx_Fiebre.checked = Infectious[0].fiebre_reumatica;
            cbx_Hepatitis.checked = Infectious[0].hepatitis;
            cbx_Parasitosis.checked = Infectious[0].parasitosis;
            cbx_Tifoidea.checked = Infectious[0].tifoidea;
            cbx_sexual.checked = Infectious[0].transmision_sexual;
            cbx_Tuberculosis.checked = Infectious[0].tuberculosis;
        }
        if (Chronic.length > 0) {
            cbx_Diabetes.checked = Chronic[0].diabetes;
            cbx_arterial.checked = Chronic[0].hipertension;
            cbx_Dislipidemias.checked = Chronic[0].dislipidemias;
            cbx_Obesidad.checked = Chronic[0].obesidad;
            cbx_Neoplasicas.checked = Chronic[0].neoplasicas;
            cbx_reumatologicas.checked = Chronic[0].reumas;
            cbx_nephropathy.checked = Chronic[0].neofropatia 
            cbx_heartdisease.checked = Chronic[0].cardiopatia 
            cbx_hepatopathy.checked = Chronic[0].hepatopatia 
            cbx_neuropathy.checked = Chronic[0].neuropatia 
            cbx_gastrointestinaldisease.checked = Chronic[0].gastrointestinal 
            cbx_autoimmunedisease.checked = Chronic[0].autoinmune 
            cbx_ovarysyndrome.checked = Chronic[0].ovario_polistico 
        }
        if (Exanthematic.length > 0) {
            cbx_Exantema.checked = Exanthematic[0].exantema;
            cbx_escarlatina.checked = Exanthematic[0].roseola;
            cbx_Rubeola.checked = Exanthematic[0].rubeola;
            cbx_Sarampion.checked = Exanthematic[0].sarampion;
            cbx_Varicela.checked = Exanthematic[0].varicela;
            cbx_otherPatology.checked = Exanthematic[0].otra;
        }
        cbx_hospitalitation.disabled= true;
        cbx_surgical.disabled= true;
        cbx_traumatic.disabled= true;
        cbx_transfusionales.disabled= true;
        cbx_Exantema.disabled= true;
        cbx_escarlatina.disabled= true;
        cbx_Rubeola.disabled= true;
        cbx_Sarampion.disabled= true;
        cbx_Varicela.disabled= true;
        cbx_otherPatology.disabled= true;
        cbx_infectocontagiosas.disabled= true;
        cbx_Fiebre.disabled= true;
        cbx_Hepatitis.disabled= true;
        cbx_Parasitosis.disabled= true;
        cbx_Tifoidea.disabled= true;
        cbx_sexual.disabled= true;
        cbx_Tuberculosis.disabled= true;
        cbx_Diabetes.disabled= true;
        cbx_arterial.disabled= true;
        cbx_Dislipidemias.disabled= true;
        cbx_Obesidad.disabled= true;
        cbx_Neoplasicas.disabled= true;
        cbx_reumatologicas.disabled = true;
        cbx_nephropathy.disabled = true;
        cbx_heartdisease.disabled = true;
        cbx_hepatopathy.disabled = true;
        cbx_neuropathy.disabled = true;
        cbx_gastrointestinaldisease.disabled = true;
        cbx_autoimmunedisease.disabled = true;
        cbx_ovarysyndrome.disabled = true;
        cbx_others.readOnly = true;
    })
    .catch(error => Alert('error', error.message))
}
const editpathological = () => {
    backAntecedentes = [];

    document.getElementById('editpathological').style.display = 'none';
    document.getElementById('updatepathological').style.display = 'inline';
    document.getElementById('cancelpathological').style.display = 'inline';

    cbx_hospitalitation.disabled = false;
    cbx_surgical.disabled = false;
    cbx_traumatic.disabled = false;
    cbx_transfusionales.disabled = false;
    cbx_Exantema.disabled = false;
    cbx_escarlatina.disabled = false;
    cbx_Rubeola.disabled = false;
    cbx_Sarampion.disabled = false;
    cbx_Varicela.disabled = false;
    cbx_otherPatology.disabled = false;
    cbx_infectocontagiosas.disabled = false;
    cbx_Fiebre.disabled = false;
    cbx_Hepatitis.disabled = false;
    cbx_Parasitosis.disabled = false;
    cbx_Tifoidea.disabled = false;
    cbx_sexual.disabled = false;
    cbx_Tuberculosis.disabled = false;
    cbx_Diabetes.disabled = false;
    cbx_arterial.disabled = false;
    cbx_Dislipidemias.disabled = false;
    cbx_Obesidad.disabled = false;
    cbx_Neoplasicas.disabled = false;
    cbx_reumatologicas.disabled = false;
    cbx_nephropathy.disabled = false;
    cbx_heartdisease.disabled = false;
    cbx_hepatopathy.disabled = false;
    cbx_neuropathy.disabled = false;
    cbx_gastrointestinaldisease.disabled = false;
    cbx_autoimmunedisease.disabled = false;
    cbx_ovarysyndrome.disabled = false;
    cbx_others.readOnly = false;

    backAntecedentes.push({
        cbx_hospitalitation: cbx_hospitalitation.checked,
        cbx_surgical: cbx_surgical.checked,
        cbx_traumatic: cbx_traumatic.checked,
        cbx_transfusionales: cbx_transfusionales.checked,
        cbx_Exantema: cbx_Exantema.checked,
        cbx_escarlatina: cbx_escarlatina.checked,
        cbx_Rubeola: cbx_Rubeola.checked,
        cbx_Sarampion: cbx_Sarampion.checked,
        cbx_Varicela: cbx_Varicela.checked,
        cbx_otherPatology: cbx_otherPatology.checked,
        cbx_infectocontagiosas: cbx_infectocontagiosas.checked,
        cbx_Fiebre: cbx_Fiebre.checked,
        cbx_Hepatitis: cbx_Hepatitis.checked,
        cbx_Parasitosis: cbx_Parasitosis.checked,
        cbx_Tifoidea: cbx_Tifoidea.checked,
        cbx_sexual: cbx_sexual.checked,
        cbx_Tuberculosis: cbx_Tuberculosis.checked,
        cbx_Diabetes: cbx_Diabetes.checked,
        cbx_arterial: cbx_arterial.checked,
        cbx_Dislipidemias: cbx_Dislipidemias.checked,
        cbx_Obesidad: cbx_Obesidad.checked,
        cbx_Neoplasicas: cbx_Neoplasicas.checked,
        cbx_reumatologicas: cbx_reumatologicas.checked,
        cbx_nephropathy: cbx_nephropathy.checked,
        cbx_heartdisease: cbx_heartdisease.checked,
        cbx_hepatopathy: cbx_hepatopathy.checked,
        cbx_neuropathy: cbx_neuropathy.checked,
        cbx_gastrointestinaldisease: cbx_gastrointestinaldisease.checked,
        cbx_autoimmunedisease: cbx_autoimmunedisease.checked,
        cbx_ovarysyndrome: cbx_ovarysyndrome.checked,
        cbx_others: cbx_others.value,
    })
}
const cancelpathological = () => {
    document.getElementById('editpathological').style.display = 'inline';
    document.getElementById('updatepathological').style.display = 'none';
    document.getElementById('cancelpathological').style.display = 'none';

    cbx_hospitalitation.disabled = true;
    cbx_surgical.disabled = true;
    cbx_traumatic.disabled = true;
    cbx_transfusionales.disabled = true;
    cbx_Exantema.disabled = true;
    cbx_escarlatina.disabled = true;
    cbx_Rubeola.disabled = true;
    cbx_Sarampion.disabled = true;
    cbx_Varicela.disabled = true;
    cbx_otherPatology.disabled = true;
    cbx_infectocontagiosas.disabled = true;
    cbx_Fiebre.disabled = true;
    cbx_Hepatitis.disabled = true;
    cbx_Parasitosis.disabled = true;
    cbx_Tifoidea.disabled = true;
    cbx_sexual.disabled = true;
    cbx_Tuberculosis.disabled = true;
    cbx_Diabetes.disabled = true;
    cbx_arterial.disabled = true;
    cbx_Dislipidemias.disabled = true;
    cbx_Obesidad.disabled = true;
    cbx_Neoplasicas.disabled = true;
    cbx_reumatologicas.disabled = true;
    cbx_nephropathy.disabled = true;
    cbx_heartdisease.disabled = true;
    cbx_hepatopathy.disabled = true;
    cbx_neuropathy.disabled = true;
    cbx_gastrointestinaldisease.disabled = true;
    cbx_autoimmunedisease.disabled = true;
    cbx_ovarysyndrome.disabled = true;
    cbx_others.readOnly = true;

    cbx_hospitalitation.checked = backAntecedentes[0].cbx_hospitalitation
    cbx_surgical.checked = backAntecedentes[0].cbx_surgical
    cbx_traumatic.checked = backAntecedentes[0].cbx_traumatic
    cbx_transfusionales.checked = backAntecedentes[0].cbx_transfusionales
    cbx_transfusionales.checked = backAntecedentes[0].cbx_transfusionales
    cbx_Exantema.checked = backAntecedentes[0].cbx_Exantema
    cbx_escarlatina.checked = backAntecedentes[0].cbx_escarlatina
    cbx_Rubeola.checked = backAntecedentes[0].cbx_Rubeola
    cbx_Sarampion.checked = backAntecedentes[0].cbx_Sarampion
    cbx_Varicela.checked = backAntecedentes[0].cbx_Varicela
    cbx_otherPatology.checked = backAntecedentes[0].cbx_otherPatology
    cbx_infectocontagiosas.checked = backAntecedentes[0].cbx_infectocontagiosas
    cbx_Fiebre.checked = backAntecedentes[0].cbx_Fiebre
    cbx_Hepatitis.checked = backAntecedentes[0].cbx_Hepatitis
    cbx_Parasitosis.checked = backAntecedentes[0].cbx_Parasitosis
    cbx_Tifoidea.checked = backAntecedentes[0].cbx_Tifoidea
    cbx_sexual.checked = backAntecedentes[0].cbx_sexual
    cbx_Tuberculosis.checked = backAntecedentes[0].cbx_Tuberculosis
    cbx_Diabetes.checked = backAntecedentes[0].cbx_Diabetes
    cbx_arterial.checked = backAntecedentes[0].cbx_arterial
    cbx_Dislipidemias.checked = backAntecedentes[0].cbx_Dislipidemias
    cbx_Obesidad.checked = backAntecedentes[0].cbx_Obesidad
    cbx_Neoplasicas.checked = backAntecedentes[0].cbx_Neoplasicas
    cbx_reumatologicas.checked = backAntecedentes[0].cbx_reumatologicas
    cbx_nephropathy.checked = backAntecedentes[0].cbx_nephropathy
    cbx_heartdisease.checked = backAntecedentes[0].cbx_heartdisease
    cbx_hepatopathy.checked = backAntecedentes[0].cbx_hepatopathy
    cbx_neuropathy.checked = backAntecedentes[0].cbx_neuropathy
    cbx_gastrointestinaldisease.checked = backAntecedentes[0].cbx_gastrointestinaldisease
    cbx_autoimmunedisease.checked = backAntecedentes[0].cbx_autoimmunedisease
    cbx_ovarysyndrome.checked = backAntecedentes[0].cbx_ovarysyndrome
    cbx_others.value = backAntecedentes[0].cbx_others
}
const updatepathological = () => {
    fetch(`${envPatient.rutes.back}${envPatient.controllers.patient}CreatePathological`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Pathological: [
                {
                    General:
                    {
                        id_paciente: idUser,
                        quirurgicos: cbx_surgical.checked,
                        hospitalizaciones: cbx_hospitalitation.checked,
                        traumaticos: cbx_traumatic.checked,
                        transfusibles: cbx_transfusionales.checked,
                        otros: cbx_others.value
                    },
                    Infectious:
                    {
                        id_paciente: idUser,
                        faringoamigdalitis: cbx_infectocontagiosas.checked,
                        fiebre_reumatica: cbx_Fiebre.checked,
                        hepatitis: cbx_Hepatitis.checked,
                        parasitosis: cbx_Parasitosis.checked,
                        tifoidea: cbx_Tifoidea.checked,
                        transmision_sexual: cbx_sexual.checked,
                        tuberculosis: cbx_Tuberculosis.checked
                    },
                    Chronic:
                    {
                        id_paciente: idUser,
                        diabetes: cbx_Diabetes.checked,
                        hipertension: cbx_arterial.checked,
                        dislipidemias: cbx_Dislipidemias.checked,
                        obesidad: cbx_Obesidad.checked,
                        neoplasicas: cbx_Neoplasicas.checked,
                        reumas: cbx_reumatologicas.checked,
                        neofropatia: cbx_nephropathy.checked,
                        cardiopatia: cbx_heartdisease.checked,
                        hepatopatia: cbx_hepatopathy.checked,
                        neuropatia: cbx_neuropathy.checked,
                        gastrointestinal: cbx_gastrointestinaldisease.checked,
                        autoinmune: cbx_autoimmunedisease.checked,
                        ovario_polistico: cbx_ovarysyndrome.checked,
                    },

                    Exanthematic:
                    {
                        id_paciente: idUser,
                        exantema: cbx_Exantema.checked,
                        roseola: cbx_escarlatina.checked,
                        rubeola: cbx_Rubeola.checked,
                        sarampion: cbx_Sarampion.checked,
                        varicela: cbx_Varicela.checked,
                        otra: cbx_otherPatology.checked
                    }

                }
            ]
        })
    })
    .then(response => response.json())
    .then(result => {
        const { conflicts } = result
        if (conflicts !== null) {
            Alert('error', conflicts[0].Description);
            return
        }

        const { Description } = result.SuccesCreatePathological[0]
        Alert('success', Description)

        backAntecedentes = [];
        backAntecedentes.push({
            cbx_hospitalitation: cbx_hospitalitation.checked,
            cbx_surgical: cbx_surgical.checked,
            cbx_traumatic: cbx_traumatic.checked,
            cbx_transfusionales: cbx_transfusionales.checked,
            cbx_Exantema: cbx_Exantema.checked,
            cbx_escarlatina: cbx_escarlatina.checked,
            cbx_Rubeola: cbx_Rubeola.checked,
            cbx_Sarampion: cbx_Sarampion.checked,
            cbx_Varicela: cbx_Varicela.checked,
            cbx_otherPatology: cbx_otherPatology.checked,
            cbx_infectocontagiosas: cbx_infectocontagiosas.checked,
            cbx_Fiebre: cbx_Fiebre.checked,
            cbx_Hepatitis: cbx_Hepatitis.checked,
            cbx_Parasitosis: cbx_Parasitosis.checked,
            cbx_Tifoidea: cbx_Tifoidea.checked,
            cbx_sexual: cbx_sexual.checked,
            cbx_Tuberculosis: cbx_Tuberculosis.checked,
            cbx_Diabetes: cbx_Diabetes.checked,
            cbx_arterial: cbx_arterial.checked,
            cbx_Dislipidemias: cbx_Dislipidemias.checked,
            cbx_Obesidad: cbx_Obesidad.checked,
            cbx_Neoplasicas: cbx_Neoplasicas.checked,
            cbx_reumatologicas: cbx_reumatologicas.checked,
            cbx_nephropathy: cbx_nephropathy.checked,
            cbx_heartdisease: cbx_heartdisease.checked,
            cbx_hepatopathy: cbx_hepatopathy.checked,
            cbx_neuropathy: cbx_neuropathy.checked,
            cbx_gastrointestinaldisease: cbx_gastrointestinaldisease.checked,
            cbx_autoimmunedisease: cbx_autoimmunedisease.checked,
            cbx_ovarysyndrome: cbx_ovarysyndrome.checked,
            cbx_others: cbx_others.value === null ? '' : cbx_others.value
        })
        cancelpathological();
        })
    .catch(error => Alert('error', error.message))
}
/* Modal detalle Antecedentes patologicos fin */

/* Modal detalle Antecedentes no patologicos */
const viewnopathological = () => {
    subgroup_historyClinic.style.display = 'flex';

    form_clinicHistoryPatologiss.style.display = 'none'
    form_clinicHistoryNoPatologis.style.display = 'inline'
    form_hereditary.style.display = 'none'
    form_vitalSigns.style.display = 'none'
    form_allergies.style.display = 'none'
    form_results.style.display = 'none'

    info_smoking.value = '';
    info_alcoholism.value = '';
    info_drugaddiction.value = '';
    info_feeding.value = '';
    info_sports.value = '';
    info_immunizations.value = '';
    info_hypersensitivity.value = '';
    info_sexualactivity.value = '';
    info_hygiene.value = '';
    info_lastmenstruation.value = '';
    info_contraceptivemethods.value = '';
    info_pregnancy.value = '';
    fetch(`${envPatient.rutes.back}${envPatient.controllers.patient}GetDataNoPathological?idPatient=${idUser}`)
        .then(response => response.json())
        .then(result => {
            const { noPatalogicos } = result.NoAthological[0]
            if (noPatalogicos.length > 0) {
                info_smoking.value = noPatalogicos[0].tabaquismo;
                info_alcoholism.value = noPatalogicos[0].alcoholismo;
                info_drugaddiction.value = noPatalogicos[0].toxicomanias;
                info_feeding.value = noPatalogicos[0].alimentacion;
                info_sports.value = noPatalogicos[0].deportes;
                info_immunizations.value = noPatalogicos[0].inmunizaciones;
                info_hypersensitivity.value = noPatalogicos[0].hipersensibilidad;
                info_sexualactivity.value = noPatalogicos[0].actividad_sexual
                info_hygiene.value = noPatalogicos[0].higiene
                info_lastmenstruation.value = noPatalogicos[0].fecha_ultimes
                info_contraceptivemethods.value = noPatalogicos[0].metodo_anti
                info_pregnancy.value = noPatalogicos[0].embarazo
            }

        })
        .catch(error => Alert('error', error.message))
}
const editnopathological = () => {
    backNoAntecedentes = [];

    document.getElementById('editnopathological').style.display = 'none';
    document.getElementById('updatenopathological').style.display = 'inline';
    document.getElementById('cancelnopathological').style.display = 'inline';

    info_smoking.readOnly = false;
    info_alcoholism.readOnly = false;
    info_drugaddiction.readOnly = false;
    info_feeding.readOnly = false;
    info_sports.readOnly = false;
    info_immunizations.readOnly = false;
    info_hypersensitivity.readOnly = false;
    info_sexualactivity.readOnly = false;
    info_hygiene.readOnly = false;
    info_lastmenstruation.readOnly = false;
    info_contraceptivemethods.readOnly = false;
    info_pregnancy.readOnly = false;

    backNoAntecedentes.push({
        info_smoking: info_smoking.value,
        info_alcoholism: info_alcoholism.value,
        info_drugaddiction: info_drugaddiction.value,
        info_feeding: info_feeding.value,
        info_sports: info_sports.value,
        info_immunizations: info_immunizations.value,
        info_hypersensitivity: info_hypersensitivity.value,
        info_sexualactivity: info_sexualactivity.value,
        info_hygiene: info_hygiene.value,
        info_lastmenstruation: info_lastmenstruation.value,
        info_contraceptivemethods: info_contraceptivemethods.value,
        info_pregnancy: info_pregnancy.value
    })
}
const cancelnopathological = () => {
    document.getElementById('editnopathological').style.display = 'inline';
    document.getElementById('updatenopathological').style.display = 'none';
    document.getElementById('cancelnopathological').style.display = 'none';

    info_smoking.readOnly = true;
    info_alcoholism.readOnly = true;
    info_drugaddiction.readOnly = true;
    info_feeding.readOnly = true;
    info_sports.readOnly = true;
    info_immunizations.readOnly = true;
    info_hypersensitivity.readOnly = true;
    info_sexualactivity.readOnly = true;
    info_hygiene.readOnly = true;
    info_lastmenstruation.readOnly = true;
    info_contraceptivemethods.readOnly = true;
    info_pregnancy.readOnly = true;

    info_smoking.value = backNoAntecedentes[0].info_smoking
    info_alcoholism.value = backNoAntecedentes[0].info_alcoholism
    info_drugaddiction.value = backNoAntecedentes[0].info_drugaddiction
    info_feeding.value = backNoAntecedentes[0].info_feeding
    info_sports.value = backNoAntecedentes[0].info_sports
    info_immunizations.value = backNoAntecedentes[0].info_immunizations
    info_hypersensitivity.value = backNoAntecedentes[0].info_hypersensitivity  
    info_sexualactivity.value = backNoAntecedentes[0].info_sexualactivity
    info_hygiene.value = backNoAntecedentes[0].info_hygiene
    info_lastmenstruation.value = backNoAntecedentes[0].info_lastmenstruation
    info_contraceptivemethods.value = backNoAntecedentes[0].info_contraceptivemethods
    info_pregnancy.value = backNoAntecedentes[0].info_pregnancy
    info_sexualactivity.value = backNoAntecedentes[0].info_sexualactivity
    info_hygiene.value = backNoAntecedentes[0].info_hygiene
    info_lastmenstruation.value = backNoAntecedentes[0].info_lastmenstruation
    info_contraceptivemethods.value = backNoAntecedentes[0].info_contraceptivemethods
    info_pregnancy.value = backNoAntecedentes[0].info_pregnancy
}
const updatenopathological = () => {    
    fetch(`${envPatient.rutes.back}${envPatient.controllers.patient}CreateNoPathological`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            NoPathological: [
                {
                    id_paciente: idUser,
                    tabaquismo: info_smoking.value.trimEnd() === '' ? 'NEGADO' : info_smoking.value.trimEnd(),
                    alcoholismo: info_alcoholism.value.trimEnd() === '' ? 'NEGADO' : info_alcoholism.value.trimEnd(),
                    toxicomanias: info_drugaddiction.value,
                    alimentacion: info_feeding.value,
                    deportes: info_sports.value,
                    inmunizaciones: info_immunizations.value,
                    hipersensibilidad: info_hypersensitivity.value,
                    actividad_sexual: info_sexualactivity.value,
                    higiene: info_hygiene.value,
                    fecha_ultimes: info_lastmenstruation.value,
                    metodo_anti: info_contraceptivemethods.value,
                    embarazo: info_pregnancy.value,
                }
            ]
        })
    })
        .then(response => response.json())
        .then(result => {
            const { conflicts } = result
            if (conflicts !== null) {
                Alert('error', conflicts[0].Description);
                return
            }

            const { Description } = result.SuccesCreateNoPathological[0]
            Alert('success', Description)

            backNoAntecedentes = [];
            backNoAntecedentes.push({
               info_smoking: info_smoking.value,
               info_alcoholism: info_alcoholism.value,
               info_drugaddiction: info_drugaddiction.value,
               info_feeding: info_feeding.value,
               info_sports: info_sports.value,
               info_immunizations: info_immunizations.value,
               info_hypersensitivity: info_hypersensitivity.value,
               info_sexualactivity: info_sexualactivity.value,
               info_hygiene: info_hygiene.value,
               info_lastmenstruation: info_lastmenstruation.value,
               info_contraceptivemethods: info_contraceptivemethods.value,
               info_pregnancy: info_pregnancy.value,
            })
            cancelnopathological();
        })
        .catch(error => Alert('error', error.message))
}
/* Modal detalle Antecedentes no patologicos fin */

/* Historia clinica fin */

function operateFormatter(value, row, index) {
    return [
        '<div class="d-flex justify-content-center">',
        // '<button class="btn btn-primary w-50" href="javascript:void(0)" title="Like">',
        // '<i class="bi bi-box-seam-fill"></i>',
        // '</button>  ',
        //'<button class="btn btn-primary rounded-circle" title="Eliminar" onclick="deleteProduct(\'' + row.id + '\')"  >',
        `<a class="" style="cursor: pointer;" onclick="openModalDetailPatient(${row.id},'patient')"  >`,
        '<span class="my-2 text-uppercase text-secondary" style="font-size: 13px;"><svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.997 15.1746C7.684 15.1746 4 15.8546 4 18.5746C4 21.2956 7.661 21.9996 11.997 21.9996C16.31 21.9996 19.994 21.3206 19.994 18.5996C19.994 15.8786 16.334 15.1746 11.997 15.1746Z" fill="currentColor"></path><path opacity="0.4" d="M11.9971 12.5838C14.9351 12.5838 17.2891 10.2288 17.2891 7.29176C17.2891 4.35476 14.9351 1.99976 11.9971 1.99976C9.06008 1.99976 6.70508 4.35476 6.70508 7.29176C6.70508 10.2288 9.06008 12.5838 11.9971 12.5838Z" fill="currentColor"></path></svg></span>',
        '</a>',
        //'</button>',
        '</div>'
    ].join('')
}
/* Modal detalle de usuario */
const openModalDetailPatient = (id, consult) => {
    const { permissions } = JSON.parse(localStorage.getItem('user'))
    const { 
        VerFichaDatos,
        VerConsultas,
        VerHistoriaClinica,
        VerHistorialCitas,
        VerHistorialCobros
    } = permissions;

    if(!VerFichaDatos && !VerConsultas && !VerHistoriaClinica && !VerHistorialCitas && !VerHistorialCobros){
        Alert('warning','No cuentas con los permisos suficientes');
        return;
    }
    idUser = id;
    openDirection = consult;

    fetch(`${envPatient.rutes.back}${envPatient.controllers.patient}GetDataPatientId?idPatient=${id}`)
    .then(response => response.json())
    .then(result => {
        const { conflicts } = result
        if(conflicts !== null) {
            Alert('error', 'Hubo un problema al recuperar un usuario');
            return;
        }

        fetch(`${rutes.back}${controllers.patient}GetMainDataUser`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(resultData => {
            const { conflicts } = resultData;
            if (conflicts !== null) {
                Alert('error', 'Hubo un problema cargando los datos');
                return
            }
            const { SuccessMaindata } = resultData;

            $tableResultsData.bootstrapTable({ data: [] });
            $tableHistoryAppoiments.bootstrapTable({ data: [] });
            $tableVitalSign.bootstrapTable({ data: [] });
            $tableElectronicPrescription.bootstrapTable({ data: [] });
            $tablePrepaid.bootstrapTable({ data: [] });
            $tablePrepaidAnt.bootstrapTable({ data: [] });

            dataSheet.style.display = 'inline';
            clinicHistory.style.display = 'none';
            electronicPrescription.style.display = 'none'
            appoimentHistory.style.display = 'none'
            Prepaid.style.display = 'none'
            /* Formulario paciente */
            SuccessMaindata[0].Estado_Civil.map(({ id_estadocivil, nombre }) => {
                let option = document.createElement('option')
                option.value = `${id_estadocivil}`
                option.label = `${nombre}`
                civilStatusInfoUser.append(option)
            })


            SuccessMaindata[0].Estado.map(({ id_estado, nombre }) => {
                let option = document.createElement('option')
                option.value = `${id_estado}`
                option.label = `${nombre}`
                stateList.append(option)
            })

            // SuccessMaindata[0].Regimen.map(({ id_regimen_fiscal, descripcion }) => {
            //     let option = document.createElement('option')
            //     option.value = `${id_regimen_fiscal}`
            //     option.label = `${descripcion}`
            //     regimenList.append(option)
            // })

            SuccessMaindata[0].UsoCFDI.map(({ id_cfdi, descripcion }) => {
                let option = document.createElement('option')
                option.value = `${id_cfdi}`
                option.label = `${descripcion}`
                billingList.append(option)
            })

            SuccessMaindata[0].pais.map(({ id_pais, nombre }) => {
                let option = document.createElement('option')
                option.value = `${id_pais}-${nombre}`
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

            const { SuccessDataPatient } = result;
            infoPatient.push(SuccessDataPatient[0]);
            infoGeneral.push(SuccessMaindata[0]);

            // console.log(VerFichaDatos,VerConsultas,VerHistoriaClinica,VerHistorialCitas,VerHistorialCobros);
            viewInfoPatient();
            $('#modalDetailUser').modal('show');
        })
        .catch(error => Alert('error', error.message))
    })
    .catch(error => Alert('error', error.message))
}
/* Funciones para los datos generales del paciente */
const changeDate = () => yearsInfoUser.value = moment().diff(moment(infodate.value), 'years')                              
const viewInfoPatient = () => {
    document.getElementById('subgroup-infodata').style.display = "flex";

    document.getElementById('form-infogeneralData').style.display = "inline";
    document.getElementById('form-infoadress').style.display = "none";
    document.getElementById('form-infobilling').style.display = "none";
    document.getElementById('form-inforesponsible').style.display = "none";

    document.getElementById('btnInfoUsers3').checked = true;
    document.getElementById('btnInfoUsers4').checked = false;
    document.getElementById('btnInfoUsers5').checked = false;
    document.getElementById('btnInfoUsers6').checked = false;
    document.getElementById('btnInfoUser1').checked = true;
    document.getElementById('btnInfoUser2').checked = false;

    infoExp.value = "";
    infoCurp.value = "";
    infoName.value = "";
    infolastpather.value = "";
    infolastmother.value = "";
    infodate.value = "";
    infosex.value = "";
    infojob.value = "";
    infostate.value = "";
    infocountry.value = "";
    infoemail.value = "";
    inforaza.value = "";
    inforeligion.value = "";
    infophone.value = "";
    civilStatusInfoUser.value = "";

    const { patient } = infoPatient[0];
    const { pais } = infoGeneral[0];
    arrayDate = patient[0].fecha_nacimiento.split('-')
    const indexCountry = pais.findIndex(element => element.id_pais === patient[0].pais_nacimiento);
    let dateOld = new Date(`${arrayDate[0]}/${arrayDate[1]}/${arrayDate[2]}`).toLocaleString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" }).split('/');
    infoExp.value = patient[0].id_paciente;
    infoCurp.value = patient[0].curp;
    infoName.value = patient[0].nombre;
    infolastpather.value = patient[0].apellido_paterno;
    infolastmother.value = patient[0].apellido_materno;
    infodate.value = `${dateOld[2]}-${dateOld[1]}-${dateOld[0]}`;
    infodate.min = '1800-01-01';
    infodate.max = moment().format('YYYY-MM-DD');
    infosex.value = patient[0].sexo === null ? '' :  patient[0].sexo;
    infojob.value = patient[0].ocupacion;
    infostate.value = patient[0].entidad_federativa === null ? '' : patient[0].entidad_federativa;
    infocountry.value = patient[0].pais_nacimiento === null ? '' : `${pais[indexCountry].id_pais}-${pais[indexCountry].nombre}`;
    infoemail.value = patient[0].email;
    inforaza.value = patient[0].id_raza === null ? '' : patient[0].id_raza;
    inforeligion.value = patient[0].id_religion === null ? '' : patient[0].id_religion;
    infophone.value = patient[0].telefono;
    civilStatusInfoUser.value = patient[0].id_estadocivil;
    yearsInfoUser.value = moment().diff(moment(`${arrayDate[0]}-${arrayDate[1]}-${arrayDate[2]}`), 'years')
    document.getElementById('modal-imgAvatar').src = patient[0].sexo === 'H' ? `Content/Images/avatars/Patient(H).png` : patient[0].sexo === 'M' ? `Content/Images/avatars/Patient(M).png` : `Content/Images/avatars/Patient(X).png`;
    document.getElementById('modal-nameAvatar').innerText = `${patient[0].id_paciente} - ${patient[0].nombre} ${patient[0].apellido_paterno} ${patient[0].apellido_materno}`
}
const editInfoPatient = () => {
    backInfo = [];

    document.getElementById('editInfoGeneral').style.display = 'none';
    document.getElementById('updateInfoGeneral').style.display = 'inline';
    document.getElementById('cancelInfoGeneral').style.display = 'inline';

    infoName.readOnly = false;
    infolastpather.readOnly = false;
    infolastmother.readOnly = parseInt(infostate.value) === 33 ? true : false;
    infodate.readOnly = false;
    infosex.disabled = false;
    infojob.readOnly = false;
    infostate.disabled = false;
    infocountry.readOnly = false;
    infoemail.readOnly = false;
    inforaza.disabled = false;
    inforeligion.disabled = false;
    infophone.readOnly = false;
    civilStatusInfoUser.disabled = false;

    backInfo.push({
        infoName: infoName.value,
        infolastpather: infolastpather.value,
        infolastmother: infolastmother.value,
        infodate: infodate.value,
        infosex: infosex.value,
        infojob: infojob.value,
        infostate: infostate.value,
        infocountry: infocountry.value,
        infoemail: infoemail.value,
        inforaza: inforaza.value,
        inforeligion: inforeligion.value,
        infophone: infophone.value,
        civilStatusInfoUser: civilStatusInfoUser.value,
        yearsInfoUser: yearsInfoUser.value
    })
}
const cancelInfoPatient = () => {
    document.getElementById('editInfoGeneral').style.display = 'inline';
    document.getElementById('updateInfoGeneral').style.display = 'none';
    document.getElementById('cancelInfoGeneral').style.display = 'none';

    infoName.readOnly = true;
    infolastpather.readOnly = true;
    infolastmother.readOnly = true;
    infodate.readOnly = true;
    infosex.disabled = true;
    infojob.readOnly = true;
    infostate.disabled = true;
    infocountry.readOnly = true;
    infoemail.readOnly = true;
    inforaza.disabled = true;
    inforeligion.disabled = true;
    infophone.readOnly = true;
    civilStatusInfoUser.disabled = true;

    infoName.value = backInfo[0].infoName
    infolastpather.value = backInfo[0].infolastpather
    infolastmother.value = backInfo[0].infolastmother
    infodate.value = backInfo[0].infodate
    infosex.value = backInfo[0].infosex
    infojob.value = backInfo[0].infojob
    infostate.value = backInfo[0].infostate
    infocountry.value = backInfo[0].infocountry
    infoemail.value = backInfo[0].infoemail
    inforaza.value = backInfo[0].inforaza
    inforeligion.value = backInfo[0].inforeligion
    infophone.value = backInfo[0].infophone
    civilStatusInfoUser.value = backInfo[0].civilStatusInfoUser
    yearsInfoUser.value = backInfo[0].yearsInfoUser
}
const updateInfoPatient = () => {
    infoName.className = 'form-control'
    infolastpather.className = 'form-control'
    infolastmother.className = 'form-control'
    infodate.className = 'form-control'
    infosex.className = 'form-control'
    infojob.className = 'form-control'
    infostate.className = 'form-control'
    infocountry.className = 'form-control'
    infoemail.className = 'form-control'
    inforaza.className = 'form-control'
    inforeligion.className = 'form-control'
    infophone.className = 'form-control'

    let errorUser = 0;
    
    if (!infophone.value.match(regexPhone) && infophone.value !== '') {
        infophone.className = 'form-control is-invalid'
        errorUser++;

    }
    if (!infoemail.value.match(regexEmail) && infoemail.value !== '') {
        infoemail.className = 'form-control is-invalid'
        errorUser++;

    }
    if (infoName.value === "" || !infoName.value.match(regexOnlyChart)) {
        infoName.className = 'form-control is-invalid'
        errorUser++;

    }
    if (infolastpather.value === "" || !infolastpather.value.match(regexOnlyChart)) {
        infolastpather.className = 'form-control is-invalid'
        errorUser++;

    }
    if (infolastmother.value === "" || !infolastmother.value.match(regexOnlyChart)) {
        infolastmother.className = 'form-control is-invalid'
        errorUser++;

    }
    if (infodate.value === "") {
        infodate.className = 'form-control is-invalid'
        errorUser++;

    }
    if (infosex.value === "") {
        infosex.className = 'form-control is-invalid'
        errorUser++;
    }
    if (infocountry.value === "" || !infocountry.value.includes('-')) {
        infocountry.className = 'form-control is-invalid'
        errorUser++;
    }
    if (infostate.value === "") {
        infostate.className = 'form-control is-invalid'
        errorUser++;
    }

    if (errorUser > 0) return;

    fetch(`${envPatient.rutes.back}${envPatient.controllers.patient}UpdatePatient`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            patient: [{
                id_paciente: infoExp.value,
                nombre: infoName.value.toUpperCase(),
                apellido_paterno: infolastpather.value.toUpperCase(),
                apellido_materno: infolastmother.value.toUpperCase(),
                fecha_nacimiento: infodate.value,
                sexo: infosex.value,
                ocupacion: infojob.value.toUpperCase(),
                pais_nacimiento: infocountry.value.split('-')[0],
                email: infoemail.value.toUpperCase(),
                id_raza: inforaza.value,
                id_religion: inforeligion.value,
                entidad_federativa: infostate.value,
                telefono: infophone.value,
                id_estadocivil: civilStatusInfoUser.value
            }]
        })
    })
    .then(response => response.json())
    .then(result => {
        const { conflicts } = result
        if (conflicts !== null) {
            Alert('error', conflicts[0].Description);
            return
        }
        backInfo = [];
        backInfo.push({
            infoName: infoName.value,
            infolastpather: infolastpather.value,
            infolastmother: infolastmother.value,
            infodate: infodate.value,
            infosex: infosex.value,
            infojob: infojob.value,
            infostate: infostate.value,
            infocountry: infocountry.value,
            infoemail: infoemail.value,
            inforaza: inforaza.value,
            inforeligion: inforeligion.value,
            infophone: infophone.value,
            civilStatusInfoUser: civilStatusInfoUser.value,
            yearsInfoUser: yearsInfoUser.value
        })
        cancelInfoPatient()
        const { SuccesUpdatePatient } = result;
        infoCurp.value = SuccesUpdatePatient[0].curp;
        Alert('success', SuccesUpdatePatient[0].Patient);
        $tablePatient.bootstrapTable('destroy');
        getPatient();
    })
    .catch(error => Alert('error', error.message))
    
}
const changeStateInfoPatient = () => {
    if(parseInt(infostate.value) === 33){
        infolastmother.readOnly = true;
        infolastmother.value = 'XXXXX';
    }else{
        infolastmother.readOnly = false;
        infolastmother.value = backInfo[0].infolastmother;
    }
}
/* Funciones para los datos generales del paciente fin */

/* Funciones para los datos generales de la direccion */
const viewInfoAddress = () => {
    document.getElementById('subgroup-infodata').style.display = "flex";
    document.getElementById('form-infoadress').style.display = "inline";
    document.getElementById('form-infogeneralData').style.display = "none";
    document.getElementById('form-infobilling').style.display = "none";
    document.getElementById('form-inforesponsible').style.display = "none";


    document.getElementById('btnInfoUsers4').checked = true;
    document.getElementById('btnInfoUsers3').checked = false;
    document.getElementById('btnInfoUsers5').checked = false;
    document.getElementById('btnInfoUsers6').checked = false;
    document.getElementById('btnInfoUser1').checked = true;
    document.getElementById('btnInfoUser2').checked = false;

    street.value = "";
    extnumber.value = "";
    innumber.value = "";
    postalcode.value = "";
    neigh.value = "";
    state.value = "";
    city.value = "";
    country.value = "";
    const { address } = infoPatient[0];
    if (address.length === 0) return;
    street.value = address[0].calle === null ? "" : address[0].calle;
    extnumber.value = address[0].numero_ext === null ? "" : address[0].numero_ext;
    innumber.value = address[0].numero_int === null ? "" : address[0].numero_int;
    postalcode.value = address[0].codigo_postal1 === null ? "" : address[0].codigo_postal1;
    neigh.value = address[0].Colonia === null ? "" : address[0].Colonia;
    state.value = address[0].Estado === null ? "" : address[0].Estado;
    city.value = address[0].Municipio === null ? "" : address[0].Municipio;
    country.value = address[0].nombre === null ? "" : address[0].nombre;
}
const editAddressPatient = () => {
    backAddress = [];
    const { address } = infoPatient[0];
    document.getElementById('editInfoAddress').style.display = 'none';
    document.getElementById('updateAddressPatient').style.display = 'inline';
    document.getElementById('cancelAddressPatient').style.display = 'inline';

    street.readOnly = false;
    extnumber.readOnly = false;
    innumber.readOnly = false;
    postalcode.readOnly = false;

    if (address.length === 0) return;
    backAddress.push(address[0])
}
const cancelAddressPatient = () => {
    document.getElementById('editInfoAddress').style.display = 'inline';
    document.getElementById('updateAddressPatient').style.display = 'none';
    document.getElementById('cancelAddressPatient').style.display = 'none';

    street.readOnly = true;
    extnumber.readOnly = true;
    innumber.readOnly = true;
    postalcode.readOnly = true;
    neigh.readOnly = true;

    if (backAddress.length === 0) {
        street.value = "";
        extnumber.value = "";
        innumber.value = "";
        postalcode.value = "";
        neigh.value = "";
        state.value = "";
        city.value = "";
        country.value = "";
        return;
    } else {
        street.value = backAddress[0].calle === null ? "" : backAddress[0].calle;
        extnumber.value = backAddress[0].numero_ext === null ? "" : backAddress[0].numero_ext;
        innumber.value = backAddress[0].numero_int === null ? "" : backAddress[0].numero_int;
        postalcode.value = backAddress[0].codigo_postal1 === null ? "" : backAddress[0].codigo_postal1;
        neigh.value = backAddress[0].Colonia === null ? "" : backAddress[0].Colonia;
        state.value = backAddress[0].Estado === null ? "" : backAddress[0].Estado;
        city.value = backAddress[0].Municipio === null ? "" : backAddress[0].Municipio;
        country.value = backAddress[0].nombre === null ? "" : backAddress[0].nombre;
        return;
    }
}
const updateAddressPatient = () => {
    const { id_paciente } = infoPatient[0].patient[0]
    let id_postalcode = "";
    let id_address = "";
    if (infoPatient[0].address.length > 0) {
        const { id_codigo_postal, id_domicilio } = infoPatient[0].address[0]
        id_postalcode = id_codigo_postal;
        id_address = id_domicilio;
    }

    let jsonAddress = {};
    if (cpInfoAddress.length > 0) {
        const indexNeigh = cpInfoAddress[0].findIndex(element => element.Colonia === neigh.value)
        jsonAddress = {
            id_paciente,
            id_domicilio: id_address,
            id_pais: cpInfoAddress[0][indexNeigh].id_pais,
            id_estado: cpInfoAddress[0][indexNeigh].id_estado,
            id_municipio: cpInfoAddress[0][indexNeigh].id_municipio,
            id_localidad: cpInfoAddress[0][indexNeigh].id_municipio,
            calle: street.value.toUpperCase(),
            id_colonia: cpInfoAddress[0][indexNeigh].id_colonia,
            id_codigo_postal: cpInfoAddress[0][indexNeigh].id_codigo_postal,
            numero_ext: extnumber.value,
            numero_int: innumber.value,
        }
    } else {
        jsonAddress = {
            id_paciente: id_paciente,
            id_domicilio: id_address,
            id_codigo_postal: id_postalcode,
            id_pais: backAddress[0].Pais,
            id_estado: backAddress[0].id_estado,
            id_municipio: backAddress[0].id_municipio,
            id_localidad: backAddress[0].id_localidad,
            id_colonia: backAddress[0].id_colonia,
            calle: street.value.toUpperCase(),
            numero_ext: extnumber.value,
            numero_int: innumber.value,
        }
    }


    fetch(`${envPatient.rutes.back}${envPatient.controllers.patient}UpdateAddress`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            address: [jsonAddress]
        })
    })
    .then(response => response.json())
    .then(result => {
        const { conflicts } = result
        if (conflicts !== null) {
            Alert('error', conflicts[0].Description);
            return
        }

        document.getElementById('editInfoAddress').style.display = 'inline';
        document.getElementById('updateAddressPatient').style.display = 'none';
        document.getElementById('cancelAddressPatient').style.display = 'none';

        street.readOnly = true;
        extnumber.readOnly = true;
        innumber.readOnly = true;
        postalcode.readOnly = true;
        neigh.readOnly = true;
        infoPatient = [];
        fetch(`${envPatient.rutes.back}${envPatient.controllers.patient}GetDataPatientId?idPatient=${id_paciente}`).then(response => response.json()).then(({ SuccessDataPatient }) => infoPatient.push(SuccessDataPatient[0]))

        const { SuccesUpdateAddress } = result;
        Alert('success', SuccesUpdateAddress[0].Address);
    })
    .catch(error => Alert('error', error.message))
}
/* Funcion de buscar zipcode */
const searchInfoAdrresPostal = () => {
    let inneigh = document.getElementById('neighInfoAddress');
    let neigh = document.getElementById('list-neighInfoAddress');
    const ZipCode = document.getElementById('postalcodeInfoAddress').value;

    inneigh.readOnly = true;
    var options = document.querySelectorAll('#list-neighInfoAddress option');
    options.forEach((o, index) => o.remove());
    if (ZipCode.length !== 5) {
        Alert('warning', 'Formato de codigo incorrecto');
        return
    }

    cpInfoAddress = []
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
            inneigh.value = "";
            cpInfoAddress.push(Postal)
            Postal.map(({ Colonia, Estado, Pais, id_colonia, id_estado, id_municipio, id_pais, nombre }, index) => {
                if (index === 0) {
                    city.value = nombre;
                    state.value = Estado;
                    country.value = Pais;
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
/* Funcion de buscar zipcode fin */
/* Funciones para los datos generales de la direccion fin */

/* Funciones para los datos facturacion */
const viewInfoBilling = () => {
    document.getElementById('subgroup-infodata').style.display = "flex";
    document.getElementById('form-infoadress').style.display = "none";
    document.getElementById('form-infogeneralData').style.display = "none";
    document.getElementById('form-infobilling').style.display = "inline"
    document.getElementById('form-inforesponsible').style.display = "none";

    document.getElementById('btnInfoUsers5').checked = true;
    document.getElementById('btnInfoUsers3').checked = false;
    document.getElementById('btnInfoUsers4').checked = false;
    document.getElementById('btnInfoUsers6').checked = false;
    document.getElementById('btnInfoUser1').checked = true;
    document.getElementById('btnInfoUser2').checked = false;

    rfcBilling.value = "";
    cfdiBilling.value = "";
    regimenBilling.value = "";
    reasonBilling.value = "";
    numberBilling.value = "";
    emailBilling.value = "";
    streetBilling.value = "";
    neNumberBilling.value = "";
    inNumberBilling.value = "";
    stateBilling.value = "";
    cityBilling.value = "";
    //localBilling.value = "";
    ngBilling.value = "";
    postalcodeBilling.value = "";
    countryBilling.value = "";

    const { billing } = infoPatient[0];
    if (billing.length === 0) return;
    rfcBilling.value = billing[0].rfc === null ? '' : billing[0].rfc;
    cfdiBilling.value = billing[0].id_cfdi === null ? '' : billing[0].id_cfdi;
    regimenBilling.value = billing[0].id_regimen_fiscal === null ? '' : billing[0].id_regimen_fiscal;
    reasonBilling.value = billing[0].nombre_razon_social === null ? '' : billing[0].nombre_razon_social;
    numberBilling.value = billing[0].telefono === null ? '' : billing[0].telefono;
    emailBilling.value = billing[0].correo === null ? '' : billing[0].correo;
    streetBilling.value = billing[0].calle === null ? '' : billing[0].calle;
    neNumberBilling.value = billing[0].numero_ext === null ? '' : billing[0].numero_ext;
    inNumberBilling.value = billing[0].numero_int === null ? '' : billing[0].numero_int;
    stateBilling.value = billing[0].Estado === null ? '' : billing[0].Estado;
    cityBilling.value = billing[0].Municipio === null ? '' : billing[0].Municipio;
    //localBilling.value = billing[0].Localidad === null ? '' : billing[0].Localidad;
    ngBilling.value = billing[0].Colonia === null ? '' : billing[0].Colonia;
    postalcodeBilling.value = billing[0].CodigoPostal === null ? '' : billing[0].CodigoPostal;
    countryBilling.value = billing[0].Pais === null ? '' : billing[0].Pais;
}
const editBillingPatient = () => {
    backBilling = [];
    const { billing } = infoPatient[0];
    document.getElementById('editInfoBilling').style.display = 'none';
    document.getElementById('updateBillingPatient').style.display = 'inline';
    document.getElementById('cancelBillingPatient').style.display = 'inline';

    rfcBilling.readOnly = false;
    cfdiBilling.disabled = false;
    regimenBilling.disabled = false;
    reasonBilling.readOnly = false;
    numberBilling.readOnly = false;
    emailBilling.readOnly = false;
    streetBilling.readOnly = false;
    neNumberBilling.readOnly = false;
    inNumberBilling.readOnly = false;
    postalcodeBilling.readOnly = false;

    if (billing.length === 0) return;
    backBilling.push(billing[0])
}
const cancelBillingPatient = () => {
    document.getElementById('editInfoBilling').style.display = 'inline';
    document.getElementById('updateBillingPatient').style.display = 'none';
    document.getElementById('cancelBillingPatient').style.display = 'none';

    rfcBilling.className = 'form-control'
    cfdiBilling.className = 'form-control'
    regimenBilling.className = 'form-control'
    reasonBilling.className = 'form-control'

    rfcBilling.readOnly = true;
    cfdiBilling.disabled = true;
    regimenBilling.disabled = true;
    reasonBilling.readOnly = true;
    numberBilling.readOnly = true;
    emailBilling.readOnly = true;
    streetBilling.readOnly = true;
    neNumberBilling.readOnly = true;
    inNumberBilling.readOnly = true;
    postalcodeBilling.readOnly = true;
    cityBilling.readOnly = true;
    ngBilling.readOnly = true;

    if (backBilling.length === 0) {
        rfcBilling.value = "";
        cfdiBilling.value = "";
        regimenBilling.value = "";
        reasonBilling.value = "";
        numberBilling.value = "";
        emailBilling.value = "";
        streetBilling.value = "";
        neNumberBilling.value = "";
        inNumberBilling.value = "";
        stateBilling.value = "";
        cityBilling.value = "";
        //localBilling.value = "";
        ngBilling.value = "";
        postalcodeBilling.value = "";
        countryBilling.value = "";
        return;
    } else {
        rfcBilling.value = backBilling[0].rfc === null ? '' : backBilling[0].rfc;
        cfdiBilling.value = backBilling[0].id_cfdi === null ? '' : backBilling[0].id_cfdi;
        regimenBilling.value = backBilling[0].id_regimen_fiscal === null ? '' : backBilling[0].id_regimen_fiscal;
        reasonBilling.value = backBilling[0].nombre_razon_social === null ? '' : backBilling[0].nombre_razon_social;
        numberBilling.value = backBilling[0].telefono === null ? '' : backBilling[0].telefono;
        emailBilling.value = backBilling[0].correo === null ? '' : backBilling[0].correo;
        streetBilling.value = backBilling[0].calle === null ? '' : backBilling[0].calle;
        neNumberBilling.value = backBilling[0].numero_ext === null ? '' : backBilling[0].numero_ext;
        inNumberBilling.value = backBilling[0].numero_int === null ? '' : backBilling[0].numero_int;
        stateBilling.value = backBilling[0].Estado === null ? '' : backBilling[0].Estado;
        cityBilling.value = backBilling[0].Municipio === null ? '' : backBilling[0].Municipio;
        //localBilling.value = billing[0].Localidad === null ? '' : billing[0].Localidad;
        ngBilling.value = backBilling[0].Colonia === null ? '' : backBilling[0].Colonia;
        postalcodeBilling.value = backBilling[0].CodigoPostal === null ? '' : backBilling[0].CodigoPostal;
        countryBilling.value = backBilling[0].Pais === null ? '' : backBilling[0].Pais;
        return;
    }
}
const updateBillingPatient = () => {
    rfcBilling.className = 'form-control'
    cfdiBilling.className = 'form-control'
    regimenBilling.className = 'form-control'
    reasonBilling.className = 'form-control'
    emailBilling.className = 'form-control'
    numberBilling.className = 'form-control'

    

    let errorUser = 0;
    rfcBilling.value = rfcBilling.value.toUpperCase();

    if (!emailBilling.value.match(regexEmail)) {
        emailBilling.className = 'form-control is-invalid'
        errorUser++;
    }

    if (!numberBilling.value.match(regexPhone)) {
        numberBilling.className = 'form-control is-invalid'
        errorUser++;
    }

    if (rfcBilling.value === "" || !rfcBilling.value.match(regexRFC)) {
        rfcBilling.className = 'form-control is-invalid'
        rfcBilling.value === "" ? document.getElementById('invalid-message-rfc').innerText = 'Campo obligatorio.' : document.getElementById('invalid-message-rfc').innerText = 'Formato incorrecto.'
        errorUser++;
    }

    if (cfdiBilling.value === "") {
        cfdiBilling.className = 'form-control is-invalid'
        errorUser++;
    }

    if (regimenBilling.value === "") {
        regimenBilling.className = 'form-control is-invalid'
        errorUser++;
    }

    if (reasonBilling.value === "") {
        reasonBilling.className = 'form-control is-invalid'
        errorUser++;
    }

    if (errorUser > 0) return;



    const { id_paciente } = infoPatient[0].patient[0]

    let id_postalcode = "";
    let id_billing = "";

    if (infoPatient[0].billing.length > 0) {
        const { id_codigo_postal, id_datos_facturacion } = infoPatient[0].billing[0]
        id_postalcode = id_codigo_postal;
        id_billing = id_datos_facturacion;
    }
    
    let jsonAddress = {};
    if (cpInfoBilling.length > 0) {
        const indexNeigh = cpInfoBilling[0].findIndex(element => element.Colonia === ngBilling.value)
        jsonAddress = {
            id_paciente,
            id_datos_facturacion: id_billing,
            id_regimen_fiscal: regimenBilling.value,
            id_cfdi: cfdiBilling.value,
            id_pais: cpInfoBilling[0][indexNeigh].id_pais,
            id_estado: cpInfoBilling[0][indexNeigh].id_estado,
            id_municipio: cpInfoBilling[0][indexNeigh].id_municipio,
            nombre_razon_social: reasonBilling.value.toUpperCase(),
            id_codigo_postal: cpInfoBilling[0][indexNeigh].id_codigo_postal,
            calle: streetBilling.value.toUpperCase(),
            rfc: rfcBilling.value.toUpperCase(),
            numero_ext: neNumberBilling.value,
            numero_int: inNumberBilling.value,
            id_colonia: cpInfoBilling[0][indexNeigh].id_colonia,
            telefono: numberBilling.value,
            correo: emailBilling.value
        }
    } else {
        jsonAddress = {
            id_paciente,
            id_datos_facturacion: id_billing,
            id_regimen_fiscal: regimenBilling.value,
            id_cfdi: cfdiBilling.value,
            id_pais: backBilling[0].id_pais,
            id_estado: backBilling[0].id_estado,
            id_municipio: backBilling[0].id_municipio,
            nombre_razon_social: reasonBilling.value.toUpperCase(),
            id_codigo_postal: id_postalcode,
            calle: streetBilling.value.toUpperCase(),
            rfc: rfcBilling.value.toUpperCase(),
            numero_ext: neNumberBilling.value,
            numero_int: inNumberBilling.value,
            id_colonia: backBilling[0].id_colonia,
            telefono: numberBilling.value,
            correo: emailBilling.value
        }
    }
    fetch(`${envPatient.rutes.back}${envPatient.controllers.patient}UpdateBilling`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            billing: [jsonAddress]
        })
    })
        .then(response => response.json())
        .then(result => {
            const { conflicts } = result
            if (conflicts !== null) {
                Alert('error', conflicts[0].Description);
                return
            }
            
            
            document.getElementById('editInfoBilling').style.display = 'inline';
            document.getElementById('updateBillingPatient').style.display = 'none';
            document.getElementById('cancelBillingPatient').style.display = 'none';
            rfcBilling.readOnly = true;
            cfdiBilling.disabled = true;
            regimenBilling.disabled = true;
            reasonBilling.readOnly = true;
            numberBilling.readOnly = true;
            emailBilling.readOnly = true;
            streetBilling.readOnly = true;
            neNumberBilling.readOnly = true;
            inNumberBilling.readOnly = true;
            postalcodeBilling.readOnly = true;
            cityBilling.readOnly = true;
            ngBilling.readOnly = true;
            infoPatient = [];
            fetch(`${envPatient.rutes.back}${envPatient.controllers.patient}GetDataPatientId?idPatient=${id_paciente}`).then(response => response.json()).then(({ SuccessDataPatient }) => infoPatient.push(SuccessDataPatient[0]))

            const { SuccesUpdateBilling } = result;
            Alert('success', SuccesUpdateBilling[0].billing);
        })
        .catch(error => Alert('error', error.message))
}
const changeCFDI = () => {
    var options = document.querySelectorAll('#regimenBilling option');
    options.forEach((o, index) => index !== 0 && o.remove());
    fetch(`${envPatient.rutes.back}${envPatient.controllers.patient}GetDataRegimen?idCFDI=${billingList.value}`)
    .then(response => response.json())
    .then(result => {
        const { REGIMEN } = result.CFDI_REGIMEN[0];
        REGIMEN.map(({ id_regimen_fiscal, descripcion }) => {
            let option = document.createElement('option')
            option.value = `${id_regimen_fiscal}`
            option.label = `${descripcion}`
            regimenList.append(option)
        })
    })
    .catch(error => Alert('error', error.message))
}
/* Funcion de buscar zipcode */
const searchInfoBillingPostal = () => {
    cpInfoBilling = [];
    let inneigh = document.getElementById('ngBilling');
    let neigh = document.getElementById('list-ngBilling');
    const ZipCode = document.getElementById('postalcodeBilling').value;

    inneigh.readOnly = true;
    var options = document.querySelectorAll('#list-ngBilling option');
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
            inneigh.value = "";
            cpInfoBilling.push(Postal)
            Postal.map(({ Colonia, Estado, Pais, id_colonia, id_estado, id_municipio, id_pais, nombre }, index) => {
                if (index === 0) {
                    cityBilling.value = nombre;
                    stateBilling.value = Estado;
                    countryBilling.value = Pais;
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
/* Funcion de buscar zipcode fin */
/* Funciones para los datos facturacion fin */

/* Funciones para los datos responsable */
const viewInfoResponsible = () => {
    document.getElementById('subgroup-infodata').style.display = "flex";
    document.getElementById('form-infoadress').style.display = "none";
    document.getElementById('form-infogeneralData').style.display = "none";
    document.getElementById('form-infobilling').style.display = "none"
    document.getElementById('form-inforesponsible').style.display = "inline";


    document.getElementById('btnInfoUsers6').checked = true;
    document.getElementById('btnInfoUsers3').checked = false;
    document.getElementById('btnInfoUsers4').checked = false;
    document.getElementById('btnInfoUsers5').checked = false;
    document.getElementById('btnInfoUser1').checked = true;
    document.getElementById('btnInfoUser2').checked = false;

    nameResponsible.value = "";
    lastPaResponsible.value = "";
    lastMoResponsible.value = "";
    streetResponsible.value = "";
    neNumberResponsible.value = "";
    inNumberResponsible.value = "";
    postalcodeResponsible.value = "";
    ngResponsible.value = "";
    cityResponsible.value = "";
    stateResponsible.value = "";
    countryResponsible.value = "";
    emailResponsible.value = "";
    phoneResponsible.value = "";

    const { responsible } = infoPatient[0];
    if (responsible.length === 0) return;

    nameResponsible.value = responsible[0].nombre === null ? '' : responsible[0].nombre;
    lastPaResponsible.value = responsible[0].apellido_paterno === null ? '' : responsible[0].apellido_paterno;
    lastMoResponsible.value = responsible[0].apellido_materno === null ? '' : responsible[0].apellido_materno;
    streetResponsible.value = responsible[0].calle === null ? '' : responsible[0].calle;
    neNumberResponsible.value = responsible[0].numero_ext === null ? '' : responsible[0].numero_ext;
    inNumberResponsible.value = responsible[0].numero_int === null ? '' : responsible[0].numero_int;
    postalcodeResponsible.value = responsible[0].CodigoPostal === null ? '' : responsible[0].CodigoPostal;
    ngResponsible.value = responsible[0].Colonia === null ? '' : responsible[0].Colonia;
    cityResponsible.value = responsible[0].Municipio === null ? '' : responsible[0].Municipio;
    stateResponsible.value = responsible[0].Estado === null ? '' : responsible[0].Estado;
    countryResponsible.value = responsible[0].Pais === null ? '' : responsible[0].Pais;
    emailResponsible.value = responsible[0].correo === null ? '' : responsible[0].correo;
    phoneResponsible.value = responsible[0].telefono === null ? '' : responsible[0].telefono;
}
const editResponsiblePatient = () => {
    backResponsible = [];
    const { responsible } = infoPatient[0];
    document.getElementById('editInfoResponsible').style.display = 'none';
    document.getElementById('updateResponsiblePatient').style.display = 'inline';
    document.getElementById('cancelResponsiblePatient').style.display = 'inline';

    nameResponsible.readOnly = false;
    lastPaResponsible.readOnly = false;
    lastMoResponsible.readOnly = false;
    streetResponsible.readOnly = false;
    neNumberResponsible.readOnly = false;
    inNumberResponsible.readOnly = false;
    postalcodeResponsible.readOnly = false;
    emailResponsible.readOnly = false;
    phoneResponsible.readOnly = false;
    

    if (responsible.length === 0) return;
    backResponsible.push(responsible[0])
}
const cancelResponsiblePatient = () => {
    document.getElementById('editInfoResponsible').style.display = 'inline';
    document.getElementById('updateResponsiblePatient').style.display = 'none';
    document.getElementById('cancelResponsiblePatient').style.display = 'none';

    nameResponsible.className = 'form-control'
    lastPaResponsible.className = 'form-control'

    nameResponsible.readOnly = true;
    lastPaResponsible.readOnly = true;
    lastMoResponsible.readOnly = true;
    streetResponsible.readOnly = true;
    neNumberResponsible.readOnly = true;
    inNumberResponsible.readOnly = true;
    postalcodeResponsible.readOnly = true;
    ngResponsible.readOnly = true;
    emailResponsible.readOnly = true;
    phoneResponsible.readOnly = true;

    if (backResponsible.length === 0) {
        nameResponsible.value = "";
        lastPaResponsible.value = "";
        lastMoResponsible.value = "";
        streetResponsible.value = "";
        neNumberResponsible.value = "";
        inNumberResponsible.value = "";
        postalcodeResponsible.value = "";
        ngResponsible.value = "";
        cityResponsible.value = "";
        stateResponsible.value = "";
        countryResponsible.value = "";
        emailResponsible.value = "";
        phoneResponsible.value = "";
        return;
    } else {
        nameResponsible.value = backResponsible[0].nombre === null ? '' : backResponsible[0].nombre;
        lastPaResponsible.value = backResponsible[0].apellido_paterno === null ? '' : backResponsible[0].apellido_paterno;
        lastMoResponsible.value = backResponsible[0].apellido_materno === null ? '' : backResponsible[0].apellido_materno;
        streetResponsible.value = backResponsible[0].calle === null ? '' : backResponsible[0].calle;
        neNumberResponsible.value = backResponsible[0].numero_ext === null ? '' : backResponsible[0].numero_ext;
        inNumberResponsible.value = backResponsible[0].numero_int === null ? '' : backResponsible[0].numero_int;
        postalcodeResponsible.value = backResponsible[0].CodigoPostal === null ? '' : backResponsible[0].CodigoPostal;
        ngResponsible.value = backResponsible[0].Colonia === null ? '' : backResponsible[0].Colonia;
        cityResponsible.value = backResponsible[0].Municipio === null ? '' : backResponsible[0].Municipio;
        stateResponsible.value = backResponsible[0].Estado === null ? '' : backResponsible[0].Estado;
        countryResponsible.value = backResponsible[0].Pais === null ? '' : backResponsible[0].Pais;
        emailResponsible.value = backResponsible[0].correo === null ? '' : backResponsible[0].correo;
        phoneResponsible.value = backResponsible[0].telefono === null ? '' : backResponsible[0].telefono;
        return;
    }
}
const updateResponsiblePatient = () => {
    nameResponsible.className = 'form-control'
    lastPaResponsible.className = 'form-control'
    emailResponsible.className = 'form-control'
    phoneResponsible.className = 'form-control'
    let errorUser = 0;

    if (!emailResponsible.value.match(regexEmail) && emailResponsible.value !== '') {
        emailResponsible.className = 'form-control is-invalid'
        errorUser++;
    }

    if (!phoneResponsible.value.match(regexPhone) && phoneResponsible.value !== '') {
        phoneResponsible.className = 'form-control is-invalid'
        errorUser++;
    }

    if (nameResponsible.value === "") {
        nameResponsible.className = 'form-control is-invalid'
        errorUser++;
    }

    if (lastPaResponsible.value === "") {
        lastPaResponsible.className = 'form-control is-invalid'
        errorUser++;
    }


    if (errorUser > 0) return;



    const { id_paciente } = infoPatient[0].patient[0]

    let id_postalcode = "";
    let id_responsible = "";

    if (infoPatient[0].responsible.length > 0) {
        const { id_codigo_postal, id_responsable } = infoPatient[0].responsible[0]
        id_postalcode = id_codigo_postal;
        id_responsible = id_responsable;
    }

    let jsonAddress = {};
    if (cpInfoResponsible.length > 0) {
        const indexNeigh = cpInfoResponsible[0].findIndex(element => element.Colonia === ngResponsible.value)
        jsonAddress = {
            id_paciente,
            id_responsable: id_responsible,
            id_pais: cpInfoResponsible[0][indexNeigh].id_pais,
            id_estado: cpInfoResponsible[0][indexNeigh].id_estado,
            id_municipio: cpInfoResponsible[0][indexNeigh].id_municipio,
            id_colonia: cpInfoResponsible[0][indexNeigh].id_colonia,
            id_codigo_postal: cpInfoResponsible[0][indexNeigh].id_codigo_postal,
            nombre: nameResponsible.value.toUpperCase(),
            apellido_paterno: lastPaResponsible.value.toUpperCase(),
            apellido_materno: lastMoResponsible.value.toUpperCase(),
            telefono: phoneResponsible.value,
            correo: emailResponsible.value.toUpperCase(),
            numero_int: inNumberResponsible.value,
            numero_ext: neNumberResponsible.value,
            calle: streetResponsible.value
        }
    } else {
        jsonAddress = {
            id_paciente,
            id_responsable: id_responsible,
            id_pais: backResponsible[0].id_pais,
            id_estado: backResponsible[0].id_estado,
            id_municipio: backResponsible[0].id_municipio,
            id_colonia: backResponsible[0].id_colonia,
            id_codigo_postal: id_postalcode,
            nombre: nameResponsible.value.toUpperCase(),
            apellido_paterno: lastPaResponsible.value.toUpperCase(),
            apellido_materno: lastMoResponsible.value.toUpperCase(),
            telefono: phoneResponsible.value,
            correo: emailResponsible.value.toUpperCase(),
            numero_int: inNumberResponsible.value,
            numero_ext: neNumberResponsible.value,
            calle: streetResponsible.value
        }
    }
    fetch(`${envPatient.rutes.back}${envPatient.controllers.patient}UpdateResponsible`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            responsible: [jsonAddress]
        })
    })
        .then(response => response.json())
        .then(result => {
            const { conflicts } = result
            if (conflicts !== null) {
                Alert('error', conflicts[0].Description);
                return
            }
            fetch(`${envPatient.rutes.back}${envPatient.controllers.patient}GetDataPatientId?idPatient=${id_paciente}`)
            .then(response => response.json())
            .then(({ SuccessDataPatient }) => {
                document.getElementById('editInfoResponsible').style.display = 'inline';
                document.getElementById('updateResponsiblePatient').style.display = 'none';
                document.getElementById('cancelResponsiblePatient').style.display = 'none';
    
                nameResponsible.readOnly = true;
                lastPaResponsible.readOnly = true;
                lastMoResponsible.readOnly = true;
                streetResponsible.readOnly = true;
                neNumberResponsible.readOnly = true;
                inNumberResponsible.readOnly = true;
                postalcodeResponsible.readOnly = true;
                ngResponsible.readOnly = true;
                emailResponsible.readOnly = true;
                phoneResponsible.readOnly = true;
                infoPatient = [];
                infoPatient.push(SuccessDataPatient[0])
                const { SuccesUpdateResponsible } = result;
                Alert('success', SuccesUpdateResponsible[0].responsible);
            })
        })
        .catch(error => Alert('error', error.message))
}
/* Funcion de buscar zipcode */
const searchInfoResponsiblePostal = () => {
    cpInfoResponsible=[]
    let inneigh = document.getElementById('ngResponsible');
    let neigh = document.getElementById('list-ngResponsible');
    const ZipCode = document.getElementById('postalcodeResponsible').value;

    inneigh.readOnly = true;
    var options = document.querySelectorAll('#list-ngResponsible option');
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
            inneigh.value = "";
            cpInfoResponsible.push(Postal)
            Postal.map(({ Colonia, Estado, Pais, id_colonia, id_estado, id_municipio, id_pais, nombre }, index) => {
                if (index === 0) {
                    cityResponsible.value = nombre;
                    stateResponsible.value = Estado;
                    countryResponsible.value = Pais;
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
/* Funcion de buscar zipcode fin */
/* Funciones para los datos responsable fin */
const closeModalInfoPatient = () => {
    infoPatient = [];
    infoGeneral = [];

    var options = document.querySelectorAll('#list-infocountrys option');
    options.forEach((o, index) => o.remove());
    var options = document.querySelectorAll('#razaInfoUser option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#religionInfoUser option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#selectSexInfoUser option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#stateInfoUser option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#cfdiBilling option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#regimenBilling option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#civilStatusInfoUser option');
    options.forEach((o, index) => index !== 0 && o.remove());
    //var options = document.querySelectorAll('#religionInfoUser option');
    //options.forEach((o, index) => index !== 0 && o.remove());

    if (backInfo.length > 0) cancelInfoPatient();
    if (backAddress.length > 0) cancelAddressPatient();
    if (backBilling.length > 0) cancelBillingPatient();
    if (backResponsible.length > 0) cancelResponsiblePatient();
    if (backAntecedentes.length > 0) cancelpathological();
    if (backNoAntecedentes.length > 0) cancelnopathological();
    if (backHereditary.length > 0) cancelhereditary();
    if (backAllergies.length > 0) cancelallergies();
    if (backResponsible.length > 0) cancelResponsiblePatient();


    $tableResultsData.bootstrapTable('destroy');
    $tableHistoryAppoiments.bootstrapTable('destroy');
    $tableVitalSign.bootstrapTable('destroy');
    $tableElectronicPrescription.bootstrapTable('destroy');
    $tablePrepaid.bootstrapTable('destroy');
    $tablePrepaidAnt.bootstrapTable('destroy');

    $('#modalDetailUser').modal('hide')
}
/* Modal detalle de usuario fin */

/* pdf sobre los datos de facturacion del paciente */
const { PDFDocument, StandardFonts, rgb } = PDFLib
async function createPdf() {
    const { UsoCFDI, Regimen } = infoGeneral[0];
    const { billing, patient } = infoPatient[0];
    const pngUrl = `${rutes.back}/Content/Images/mepiel/Logo.png`
    const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer())
    
    if(billing.length === 0){
        Alert('warning','Debes agregar datos de facturación antes')
        return
    }
    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create()


    const pngImage = await pdfDoc.embedPng(pngImageBytes)
    const pngDims = pngImage.scale(0.1)
    
    
    
    // Embed the Times Roman font
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
    
    // Add a blank page to the document
    const page = pdfDoc.addPage()


    page.drawImage(pngImage, {
        x: page.getWidth() / 2 - pngDims.width / 2 - 43,
        y: page.getHeight() / 2 - pngDims.height + 630,
        width: 200,
        height: 220,
    })

    // Get the width and height of the page
    const { width, height } = page.getSize()

    // Draw a string of text toward the top of the page
    const fontSize = 30
    page.drawText('Datos de facturación', {
        x: page.getWidth() / 4,
        y: 655,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0.53, 0.71),
    })
    page.drawText(`Número De Expediente: `, {
        x: 50,
        y: 635,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(`${patient[0].id_paciente}`, {
        x: 200,
        y: 635,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    })
    page.drawText(`Nombre:`, {
        x: 50,
        y: 615,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`${patient[0].nombre} ${patient[0].apellido_paterno} ${patient[0].apellido_materno}`, {
        x: 105,
        y: 615,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`RFC:`, {
        x: 50,
        y: 595,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`${billing[0].rfc}`, {
        x: 85,
        y: 595,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`Uso de CFDI:`, {
        x: 50,
        y: 575,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`${UsoCFDI[UsoCFDI.findIndex(element => element.id_cfdi === parseInt(billing[0].id_cfdi))].descripcion}`, {
        x: 135,
        y: 575,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`Régimen fiscal:`, {
        x: 50,
        y: 555,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`${Regimen[Regimen.findIndex(element => element.id_regimen_fiscal === parseInt(billing[0].id_regimen_fiscal))].descripcion}`, {
        x: 145,
        y: 555,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`Nombre o razón social:`, {
        x: 50,
        y: 535,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`${billing[0].nombre_razon_social === null ? '' : billing[0].nombre_razon_social}`, {
        x: 195,
        y: 535,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`Número de telefono:`, {
        x: 50,
        y: 515,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`${billing[0].telefono === null ? '' : billing[0].telefono}`, {
        x: 180,
        y: 515,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`Correo:`, {
        x: 50,
        y: 495,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`${billing[0].correo === null ? '' : billing[0].correo}`, {
        x: 100,
        y: 495,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`Calle:`, {
        x: 50,
        y: 475,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`${billing[0].calle === null ? '' : billing[0].calle}`, {
        x: 90,
        y: 475,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });

    page.drawText(`Número exterior:`, {
        x: 50,
        y: 455,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`${billing[0].numero_ext === null ? '' : billing[0].numero_ext}`, {
        x: 160,
        y: 455,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`Número interior:`, {
        x: 50,
        y: 435,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });  
    page.drawText(`${billing[0].numero_int === null ? '' : billing[0].numero_int}`, {
        x: 160,
        y: 435,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    }); 

    page.drawText(`Código postal:`, {
        x: 50,
        y: 415,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });
    page.drawText(`${billing[0].CodigoPostal === null ? '' : billing[0].CodigoPostal}`, {
        x: 140,
        y: 415,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });

    page.drawText(`Colonia:`, {
        x: 50,
        y: 395,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    }); 
    page.drawText(`${billing[0].Colonia === null ? '' : billing[0].Colonia}`, {
        x: 105,
        y: 395,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    }); 

    page.drawText(`Municipio:`, {
        x: 50,
        y: 375,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    }); 
    page.drawText(`${billing[0].Municipio === null ? '' : billing[0].Municipio}`, {
        x: 120,
        y: 375,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    }); 

    page.drawText(`Estado:`, {
        x: 50,
        y: 355,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    }); 
    page.drawText(`${billing[0].Estado === null ? '' : billing[0].Estado}`, {
        x: 100,
        y: 355,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    }); 

    page.drawText(`País:`, {
        x: 50,
        y: 335,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    }); 
    page.drawText(`${billing[0].Pais === null ? '' : billing[0].Pais}`, {
        x: 85,
        y: 335,
        size: 15,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });
    
    page.drawText(`_________________________________`, {
        x: page.getWidth() / 4,
        y: 220,
        size: 20,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    }); 
    page.drawText(`Firma`, {
        x: page.getWidth() / 2,
        y: 200,
        size: 20,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()

    // Trigger the browser to download the PDF document
    download(pdfBytes, `Datos Facturacion ${patient[0].nombre} ${patient[0].apellido_paterno} ${patient[0].apellido_materno}.pdf`, "application/pdf");
}
/* pdf sobre los datos de facturacion del paciente fin */