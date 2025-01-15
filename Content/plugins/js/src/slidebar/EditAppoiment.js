/* Llamamos las variables de entorno */
const envEditAppoiment = envirement();

/* Variables globales */
let formActiveEdit = "";
let currentTratamientEdit = [];
let calendarInfoEdit = [];
let infoAppoimentActually = [];
let idAppo = -1;
let consultForm = null;
/* Componentes del formulario */
let button_consultationEdit = document.getElementById('catRadios1Edit');
let button_faceEdit = document.getElementById('catRadios2Edit');
let button_appliancesEdit = document.getElementById('catRadios3Edit');
let button_dermapenEdit = document.getElementById('catRadios4Edit');
let button_healingEdit = document.getElementById('catRadios5Edit');
let button_estheticEdit = document.getElementById('catRadios6Edit');
let button_representativeEdit = document.getElementById('catRadios7Edit');


let container_categoryEdit = document.getElementById('container-categoryCalendarEdit');
let container_channelEdit = document.getElementById('container-chanelCalendarEdit');
let container_serviceEdit = document.getElementById('container-serviceCalendarEdit');
let container_prometerEdit = document.getElementById('container-promoterCalendarEdit');
let container_statusEdit = document.getElementById('container-statusCalendarEdit');
let container_dermaCalendarEdit = document.getElementById('container-dermaCalendarEdit');
let container_frecuencyCalendarEdit = document.getElementById('container-frecuencyCalendarEdit');
let container_patientCalendarEdit = document.getElementById('container-list-patientCalendarEdit');
let container_durationEdit = document.getElementById('container-timeCalendarEdit');
let container_methodPayCalendarEdit = document.getElementById('container-methodPayCalendarEdit');
let container_bankCalendaEdit = document.getElementById('container-bankCalendarEdit');
let container_typePayCalendarEdit = document.getElementById('container-typePayCalendarEdit');
let container_digitTarjetCalendarEdit = document.getElementById('container-digitTarjetCalendarEdit');
let container_observationCalendarEdit = document.getElementById('container-observationCalendarEdit');
let container_cosmetoCalendarEdit = document.getElementById('container-cosmetoCalendarEdit');
let container_typeCalendarEdit = document.getElementById('container-typeCalendarEdit');
let container_tratamientCalendarEdit = document.getElementById('container-tratamientCalendarEdit');
let container_areaCalendarEdit = document.getElementById('container-areaCalendarEdit');
let container_costCalendarEdit = document.getElementById('container-costCalendarEdit');
let container_representativeCalendarEdit = document.getElementById('container-representativeCalendarEdit');
let container_patientListCalendarEdit = document.getElementById('container-patientListCalendarEdit');
let container_laboratoryRepresentativeEdit = document.getElementById('container-laboratoryRepresentativeEdit');
let container_lineProductRepresentativeEdit = document.getElementById('container-lineProductRepresentativeEdit');


let dateCalendarEdit = document.getElementById('dateCalendarEdit');
let timeCalendarEdit = document.getElementById('timeCalendarEdit');
let patientEdit = document.getElementById('patientCalendarEdit');
let representativeCalendarEdit = document.getElementById('representativeCalendarEdit');
let representativeCalendarListEdit = document.getElementById('list-representativeCalendarEdit');
let patientCalendarEdit = document.getElementById('list-patientCalendarEdit');
let categoryEdit = document.getElementById('categoryCalendarEdit');
let channelEdit = document.getElementById('chanelCalendarEdit');
let serviceEdit = document.getElementById('serviceCalendarEdit');
let prometerEdit = document.getElementById('promoterCalendarEdit');
let statusEdit = document.getElementById('statusCalendarEdit');
let dermaCalendarEdit = document.getElementById('dermaCalendarEdit');
let frecuencyCalendarEdit = document.getElementById('frecuencyCalendarEdit');
let durationEdit = document.getElementById('timeCalendarEdit');
let methodPayCalendarEdit = document.getElementById('methodPayCalendarEdit');
let bankCalendaEdit = document.getElementById('bankCalendarEdit');
let typePayCalendarEdit = document.getElementById('typePayCalendarEdit');
let digitTarjetCalendarEdit = document.getElementById('digitTarjetCalendarEdit');
let observationCalendarEdit = document.getElementById('observationCalendarEdit');
let cosmetoCalendarEdit = document.getElementById('cosmetoCalendarEdit');
let priceCalendarEdit = document.getElementById('priceCalendarEdit');
let typeCalendarEdit = document.getElementById('typeCalendarEdit');
let tratamientCalendarEdit = document.getElementById('tratamientCalendarEdit');
let areaCalendarEdit = document.getElementById('areaCalendarEdit');
let costCalendarEdit = document.getElementById('costCalendarEdit');
let label_costCalendarEdit = document.getElementById('label-costCalendarEdit');
let laboratoryRepresentativeEdit = document.getElementById('laboratoryRepresentativeEdit');
let lineProductRepresentativeEdit = document.getElementById('lineProductRepresentativeEdit');
/* Componentes del formulario fin */

/**************************************************[ VALIDACION DEL MODAL ]*****************************************************************************/
const onKeyboardEscEditAppoiment = () => event.keyCode === 27 && closeModalAppoimentEdit();
/**************************************************[ VALIDACION DEL MODAL FIN ]*****************************************************************************/

const changePayMethodEdit = () => {
    const { TypePay } = calendarInfoEdit[0];
    const indexPay = TypePay.findIndex(element => element.id_forma_pago === parseInt(methodPayCalendarEdit.value))
    const { id_forma_pago, descripcion } = TypePay[indexPay];

    if (descripcion === 'Tarjeta de débito' || descripcion === 'Tarjeta de crédito') {
        //container_typePayCalendar.style.display = 'inline';
        container_digitTarjetCalendarEdit.style.display = 'inline';
        container_bankCalendaEdit.style.display = 'inline';
    }
    else {
        container_typePayCalendarEdit.style.display = 'none';
        container_digitTarjetCalendarEdit.style.display = 'none';
        container_bankCalendaEdit.style.display = 'none';

    }
}

const openEditAppoiment = (idAppoiment, form) => {      
    consultForm = form;
    idAppo = idAppoiment;
    const { id } = JSON.parse(localStorage.getItem('clinic'));
    fetch(`${envEditAppoiment.rutes.back}${envEditAppoiment.controllers.patient}GetDataAppointment?idAppointment=${idAppoiment}`)
        .then(response => response.json())
        .then(infoAppoiment => {
            const { appointments } = infoAppoiment.appointment[0]
                fetch(`${envEditAppoiment.rutes.back}${envEditAppoiment.controllers.diary}GetDataAppointment?idShope=${id}`)
                .then(response => response.json())
                .then(result => {
                        const { conflicts } = result
                        if (conflicts !== null) {
                            Alert('error', 'Hubo un problema al consultar la información')
                            return
                        }
                        const { SuccessAppointment } = result;
                        //Cita
                        container_categoryEdit.style.display = 'none';
                        container_channelEdit.style.display = 'none';
                        container_serviceEdit.style.display = 'none';
                        container_prometerEdit.style.display = 'none';
                        container_statusEdit.style.display = 'none';
                        container_dermaCalendarEdit.style.display = 'none';
                        container_frecuencyCalendarEdit.style.display = 'none';

                        container_methodPayCalendarEdit.style.display = 'none';
                        container_bankCalendaEdit.style.display = 'none';
                        container_typePayCalendarEdit.style.display = 'none';
                        container_digitTarjetCalendarEdit.style.display = 'none';
                        container_observationCalendarEdit.style.display = 'none';
                        container_cosmetoCalendarEdit.style.display = 'none';
                        container_typeCalendarEdit.style.display = 'none';
                        container_tratamientCalendarEdit.style.display = 'none';
                        container_areaCalendarEdit.style.display = 'none';
                        container_areaCalendarEdit.className = 'd-none';
                        container_costCalendarEdit.style.display = 'none';
                        priceCalendarEdit.innerHTML = 0;
                        costCalendarEdit.value = 0;
                        //Representante medico
                        container_representativeCalendarEdit.style.display = 'none';
                        container_laboratoryRepresentativeEdit.style.display = 'none';
                        container_lineProductRepresentativeEdit.style.display = 'none';

                        var options = document.querySelectorAll('#tratamientCalendar option');
                        options.forEach((o, index) => index !== 0 && o.remove());
                        var options = document.querySelectorAll('#areaCalendar option');
                        options.forEach((o, index) => index !== 0 && o.remove());
                        timeCalendar.value = 1;


                        button_consultationEdit.checked = false;
                        button_faceEdit.checked = false;
                        button_appliancesEdit.checked = false;
                        button_dermapenEdit.checked = false;
                        button_healingEdit.checked = false;
                        button_estheticEdit.checked = false;
                        button_representativeEdit.checked = false;
                        //dateCalendarEdit.min = moment().format('YYYY-MM-DDThh:mm:ss')
                        //dateCalendarEdit.max = moment().add(365, 'days').format('YYYY-MM-DDThh:mm:ss')

                        SuccessAppointment[0].Category.map(({ idCategoria, Categoria }, index) => {
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
                            categoryEdit.append(option)
                        })
                        SuccessAppointment[0].laboratory.map(({ id_laboratorio, nombre }) => {
                            let option = document.createElement('option')
                            option.value = `${id_laboratorio}`
                            option.label = `${nombre}`
                            laboratoryRepresentativeEdit.append(option)
                        })
                        SuccessAppointment[0].cosmetologist.map(({ id_usuario, nombre, apellido_paterno }) => {
                            let option = document.createElement('option')
                            option.value = `${id_usuario}`
                            option.label = `${nombre} ${apellido_paterno}`
                            cosmetoCalendarEdit.append(option)
                        })
                        SuccessAppointment[0].Type.map(({ id_tipo, nombre }) => {
                            let option = document.createElement('option')
                            option.value = `${id_tipo}`
                            option.label = `${nombre}`
                            typeCalendarEdit.append(option)
                        })
                        SuccessAppointment[0].TypePay.map(({ id_forma_pago, descripcion }) => {
                            let option = document.createElement('option')
                            option.value = `${id_forma_pago}`
                            option.label = `${descripcion}`
                            methodPayCalendarEdit.append(option)
                        })
                        SuccessAppointment[0].banks.map(({ id_bancos, nombre }) => {
                            let option = document.createElement('option')
                            option.value = `${id_bancos}`
                            option.label = `${nombre}`
                            bankCalendaEdit.append(option)
                        })
                        SuccessAppointment[0].duration.map(({ id_duracion, minutos }) => {
                            let option = document.createElement('option')
                            option.value = `${id_duracion}`
                            option.label = `${minutos} min`
                            durationEdit.append(option)
                        })
                        timeCalendar.value = 1;
                        SuccessAppointment[0].patient.map(({ id_paciente, nombre, apellido_materno, apellido_paterno, email, telefono }) => {
                            let option = document.createElement('option')
                            option.value = `${id_paciente}-${nombre} ${apellido_paterno} ${apellido_materno}`
                            option.label = `${id_paciente}-${nombre} ${apellido_paterno} ${apellido_materno} ${email} ${telefono}`
                            patientCalendarEdit.append(option)
                        })
                        pacientesExpress.push(SuccessAppointment[0].patient)
                        SuccessAppointment[0].status.map(({ id_estadocita, nombre }) => {
                            let option = document.createElement('option')
                            option.value = `${id_estadocita}`
                            option.label = `${nombre}`
                            statusEdit.append(option)
                        })
                        SuccessAppointment[0].promoter.map(({ id_provendedora, nombre }) => {
                            let option = document.createElement('option')
                            option.value = `${id_provendedora}`
                            option.label = `${nombre}`
                            prometerEdit.append(option)
                        })
                        SuccessAppointment[0].frequency.map(({ id_frecuencia, nombre }) => {
                            let option = document.createElement('option')
                            option.value = `${id_frecuencia}`
                            option.label = `${nombre}`
                            frecuencyCalendarEdit.append(option)
                        })
                        SuccessAppointment[0].channel.map(({ id_canal, nombre }) => {
                            let option = document.createElement('option')
                            option.value = `${id_canal}`
                            option.label = `${nombre}`
                            channelEdit.append(option)
                        })
                        SuccessAppointment[0].dermatologist.map(({ id_usuario, nombre, apellido_paterno }) => {
                            let option = document.createElement('option')
                            option.value = `${id_usuario}`
                            option.label = `${nombre} ${apellido_paterno}`
                            dermaCalendarEdit.append(option)
                        })
                        SuccessAppointment[0].representative.map(({ id_repre, nombre }) => {
                            let option = document.createElement('option')
                            option.value = `${id_repre} - ${nombre}`
                            option.label = `${id_repre} - ${nombre}`
                            representativeCalendarListEdit.append(option)
                        })
                        calendarInfoEdit.push(SuccessAppointment[0]);

                        let indexCat = false;

                    infoAppoimentActually = appointments[0]
                    //consulta
                    if (appointments[0].id_categoria === 1) {
                        indexCat = SuccessAppointment[0].Category.findIndex(element => element.idCategoria === appointments[0].id_categoria);
                        const { Precio } = SuccessAppointment[0].Category[indexCat].Servicio[0].area[0];
                        currentServicesEdit = SuccessAppointment[0].Category[indexCat].Servicio[0];
                        container_frecuencyCalendarEdit.style.display = 'inline';
                        container_dermaCalendarEdit.style.display = 'inline';
                        container_channelEdit.style.display = 'inline';
                        container_prometerEdit.style.display = 'inline';
                        container_observationCalendarEdit.style.display = 'inline';

                        container_methodPayCalendarEdit.style.display = 'inline';
                        priceCalendarEdit.innerHTML = `${Precio.toLocaleString("en", {
                            style: "currency",
                            currency: "MXN"
                        })}`;
                        formActiveEdit = 1;
                        button_consultationEdit.checked = true;

                        frecuencyCalendarEdit.value = appointments[0].id_frecuencia;
                        dermaCalendarEdit.value = appointments[0].id_derma;
                        channelEdit.value = appointments[0].id_canal;
                        prometerEdit.value = appointments[0].id_provendedora;
                        observationCalendarEdit.value = appointments[0].observaciones;

                        //const indexPay = SuccessAppointment[0].TypePay.findIndex(element => element.id_forma_pago === parseInt(appointments[0].id_forma_pago))
                        //const { id_forma_pago, descripcion } = SuccessAppointment[0].TypePay[indexPay];

                        //methodPayCalendarEdit.value = id_forma_pago;

                        //if (descripcion === 'Tarjeta de débito' || descripcion === 'Tarjeta de crédito') {
                        //    //container_typePayCalendar.style.display = 'inline';
                        //    container_digitTarjetCalendarEdit.style.display = 'inline';
                        //    container_bankCalendaEdit.style.display = 'inline';
                        //    digitTarjetCalendarEdit.value = appointments[0].digitos;
                        //    bankCalendaEdit.value = appointments[0].id_banco;
                        //}
                        //else {
                        //    container_typePayCalendarEdit.style.display = 'none';
                        //    container_digitTarjetCalendarEdit.style.display = 'none';
                        //    container_bankCalendaEdit.style.display = 'none';
                        //}

                        dateCalendarEdit.value = `${appointments[0].Fecha}T${appointments[0].hora.Hours < 10 ? '0' + appointments[0].hora.Hours : appointments[0].hora.Hours}:${appointments[0].hora.Minutes < 10 ? '0' + appointments[0].hora.Minutes : appointments[0].hora.Minutes}`;
                        timeCalendarEdit.value = appointments[0].id_duracion
                        typeCalendarEdit.value = appointments[0].id_tipo
                        patientEdit.value = `${appointments[0].id_paciente} - ${appointments[0].nombre}`

                        $('#modalEditCalendar').modal('show')
                        return
                    }
                    //facial
                    if (appointments[0].id_categoria === 2) {
                        container_frecuencyCalendarEdit.style.display = 'inline';
                        container_dermaCalendarEdit.style.display = 'inline';
                        container_channelEdit.style.display = 'inline';
                        container_prometerEdit.style.display = 'inline';
                        container_cosmetoCalendarEdit.style.display = 'inline'
                        container_typeCalendarEdit.style.display = 'inline'
                        container_observationCalendarEdit.style.display = 'inline';

                        container_methodPayCalendarEdit.style.display = 'inline';
                        indexCat = SuccessAppointment[0].Category.findIndex(element => element.idCategoria === appointments[0].id_categoria);
                        SuccessAppointment[0].Category[indexCat].Servicio.map(({ idServicio, servicios }) => {
                            let option = document.createElement('option')
                            option.value = `${idServicio}`
                            option.label = `${servicios}`
                            tratamientCalendarEdit.append(option)
                        })
                        tratamientCalendarEdit.value = appointments[0].id_servicio
                        currentTratamientEdit = SuccessAppointment[0].Category[indexCat];
                        container_tratamientCalendarEdit.style.display = 'inline';
                        formActiveEdit = 2;
                        button_faceEdit.checked = true;
                        frecuencyCalendarEdit.value = appointments[0].id_frecuencia;
                        dermaCalendarEdit.value = appointments[0].id_derma;
                        channelEdit.value = appointments[0].id_canal;
                        prometerEdit.value = appointments[0].id_provendedora;
                        observationCalendarEdit.value = appointments[0].observaciones;    


                        //const indexPay = SuccessAppointment[0].TypePay.findIndex(element => element.id_forma_pago === parseInt(appointments[0].id_forma_pago))
                        //const { id_forma_pago, descripcion } = SuccessAppointment[0].TypePay[indexPay];
                        //methodPayCalendarEdit.value = id_forma_pago;

                        //if (descripcion === 'Tarjeta de débito' || descripcion === 'Tarjeta de crédito') {
                        //    //container_typePayCalendar.style.display = 'inline';
                        //    container_digitTarjetCalendarEdit.style.display = 'inline';
                        //    container_bankCalendaEdit.style.display = 'inline';
                        //    digitTarjetCalendarEdit.value = appointments[0].digitos;
                        //    bankCalendaEdit.value = appointments[0].id_banco;
                        //}
                        //else {
                        //    container_typePayCalendarEdit.style.display = 'none';
                        //    container_digitTarjetCalendarEdit.style.display = 'none';
                        //    container_bankCalendaEdit.style.display = 'none';
                        //}
                        const { Servicio } = currentTratamientEdit

                        let areas = [];
                        const indexServicesEdit = Servicio.findIndex(element => element.idServicio === parseInt(tratamientCalendarEdit.value))
                        appointments[0].Areas.map(({ id_area }) => {
                            let indexArea = Servicio[indexServicesEdit].area.findIndex(element => element.idarea === id_area);
                            const { Precio, idarea } = Servicio[indexServicesEdit].area[indexArea];
                            areas.push(`${idarea}-${Precio}`)
                        })


                        changeTratamientEdit(areas);

                        dateCalendarEdit.value = `${appointments[0].Fecha}T${appointments[0].hora.Hours < 10 ? '0' + appointments[0].hora.Hours : appointments[0].hora.Hours}:${appointments[0].hora.Minutes < 10 ? '0' + appointments[0].hora.Minutes : appointments[0].hora.Minutes}`;
                        timeCalendarEdit.value = appointments[0].id_duracion
                        areaCalendarEdit.value = appointments[0].id_area
                        typeCalendarEdit.value = appointments[0].id_tipo
                        cosmetoCalendarEdit.value = appointments[0].id_cosme
                        patientEdit.value = `${appointments[0].id_participantes} - ${appointments[0].nombre}`

                        changeDermaAppoimentEdit(appointments[0].id_tipo);
                        $('#modalEditCalendar').modal('show')
                        return
                    }
                    //aparatologia
                    if (appointments[0].id_categoria === 3) {
                        container_frecuencyCalendarEdit.style.display = 'inline';
                        container_dermaCalendarEdit.style.display = 'inline';
                        container_channelEdit.style.display = 'inline';
                        container_prometerEdit.style.display = 'inline';
                        container_cosmetoCalendarEdit.style.display = 'inline'
                        container_typeCalendarEdit.style.display = 'inline'
                        container_observationCalendarEdit.style.display = 'inline';

                        container_methodPayCalendarEdit.style.display = 'inline';
                        indexCat = SuccessAppointment[0].Category.findIndex(element => element.idCategoria === appointments[0].id_categoria);
                        SuccessAppointment[0].Category[indexCat].Servicio.map(({ idServicio, servicios }) => {
                            let option = document.createElement('option')
                            option.value = `${idServicio}`
                            option.label = `${servicios}`
                            tratamientCalendarEdit.append(option)
                        })
                        tratamientCalendarEdit.value = appointments[0].id_servicio
                        currentTratamientEdit = SuccessAppointment[0].Category[indexCat];
                        container_tratamientCalendarEdit.style.display = 'inline';
                        formActiveEdit = 3;

                        button_appliancesEdit.checked = true;
                        frecuencyCalendarEdit.value = appointments[0].id_frecuencia;
                        dermaCalendarEdit.value = appointments[0].id_derma;
                        channelEdit.value = appointments[0].id_canal;
                        prometerEdit.value = appointments[0].id_provendedora;
                        observationCalendarEdit.value = appointments[0].observaciones;

                        //const indexPay = SuccessAppointment[0].TypePay.findIndex(element => element.id_forma_pago === parseInt(appointments[0].id_forma_pago))
                        //const { id_forma_pago, descripcion } = SuccessAppointment[0].TypePay[indexPay];
                        //methodPayCalendarEdit.value = id_forma_pago;

                        //if (descripcion === 'Tarjeta de débito' || descripcion === 'Tarjeta de crédito') {
                        //    //container_typePayCalendar.style.display = 'inline';
                        //    container_digitTarjetCalendarEdit.style.display = 'inline';
                        //    container_bankCalendaEdit.style.display = 'inline';
                        //    digitTarjetCalendarEdit.value = appointments[0].digitos;
                        //    bankCalendaEdit.value = appointments[0].id_banco;
                        //}
                        //else {
                        //    container_typePayCalendarEdit.style.display = 'none';
                        //    container_digitTarjetCalendarEdit.style.display = 'none';
                        //    container_bankCalendaEdit.style.display = 'none';
                        //}

                        const { Servicio } = currentTratamientEdit

                        let areas = [];
                        const indexServicesEdit = Servicio.findIndex(element => element.idServicio === parseInt(tratamientCalendarEdit.value))
                        appointments[0].Areas.map(({ id_area }) => {
                            let indexArea = Servicio[indexServicesEdit].area.findIndex(element => element.idarea === id_area);
                            const { Precio, idarea } = Servicio[indexServicesEdit].area[indexArea];
                            areas.push(`${idarea}-${Precio}`)
                        })

                        changeTratamientEdit(areas);

                        dateCalendarEdit.value = `${appointments[0].Fecha}T${appointments[0].hora.Hours < 10 ? '0' + appointments[0].hora.Hours : appointments[0].hora.Hours}:${appointments[0].hora.Minutes < 10 ? '0' + appointments[0].hora.Minutes : appointments[0].hora.Minutes}`;
                        timeCalendarEdit.value = appointments[0].id_duracion
                        areaCalendarEdit.value = appointments[0].id_area
                        typeCalendarEdit.value = appointments[0].id_tipo
                        cosmetoCalendarEdit.value = appointments[0].id_cosme
                        patientEdit.value = `${appointments[0].id_participantes} - ${appointments[0].nombre}`
                        
                        changeDermaAppoimentEdit(appointments[0].id_tipo);
                        $('#modalEditCalendar').modal('show')
                        return
                    }
                    //dermapen
                    if (appointments[0].id_categoria === 4) {
                        container_frecuencyCalendarEdit.style.display = 'inline';
                        container_dermaCalendarEdit.style.display = 'inline';
                        container_channelEdit.style.display = 'inline';
                        container_prometerEdit.style.display = 'inline';
                        container_cosmetoCalendarEdit.style.display = 'inline'
                        container_typeCalendarEdit.style.display = 'inline'
                        container_observationCalendarEdit.style.display = 'inline';

                        container_methodPayCalendarEdit.style.display = 'inline';
                        container_costCalendarEdit.style.display = 'inline';
                        label_costCalendarEdit.innerHTML = 'Total dermapen'

                        indexCat = SuccessAppointment[0].Category.findIndex(element => element.idCategoria === appointments[0].id_categoria);
                        SuccessAppointment[0].Category[indexCat].Servicio.map(({ idServicio, servicios }) => {
                            let option = document.createElement('option')
                            option.value = `${idServicio}`
                            option.label = `${servicios}`
                            tratamientCalendarEdit.append(option)
                        })
                        currentTratamientEdit = SuccessAppointment[0].Category[indexCat];
                        container_tratamientCalendarEdit.style.display = 'inline';
                        formActiveEdit = 4;
                        button_dermapenEdit.checked = true;
                        frecuencyCalendarEdit.value = appointments[0].id_frecuencia;
                        dermaCalendarEdit.value = appointments[0].id_derma;
                        channelEdit.value = appointments[0].id_canal;
                        prometerEdit.value = appointments[0].id_provendedora;
                        observationCalendarEdit.value = appointments[0].observaciones;

                        //const indexPay = SuccessAppointment[0].TypePay.findIndex(element => element.id_forma_pago === parseInt(appointments[0].id_forma_pago))
                        //const { id_forma_pago, descripcion } = SuccessAppointment[0].TypePay[indexPay];
                        //methodPayCalendarEdit.value = id_forma_pago;

                        //if (descripcion === 'Tarjeta de débito' || descripcion === 'Tarjeta de crédito') {
                        //    //container_typePayCalendar.style.display = 'inline';
                        //    container_digitTarjetCalendarEdit.style.display = 'inline';
                        //    container_bankCalendaEdit.style.display = 'inline';
                        //    digitTarjetCalendarEdit.value = appointments[0].digitos;
                        //    bankCalendaEdit.value = appointments[0].id_banco;
                        //}
                        //else {
                        //    container_typePayCalendarEdit.style.display = 'none';
                        //    container_digitTarjetCalendarEdit.style.display = 'none';
                        //    container_bankCalendaEdit.style.display = 'none';
                        //}


                        dateCalendarEdit.value = `${appointments[0].Fecha}T${appointments[0].hora.Hours < 10 ? '0' + appointments[0].hora.Hours : appointments[0].hora.Hours}:${appointments[0].hora.Minutes < 10 ? '0' + appointments[0].hora.Minutes : appointments[0].hora.Minutes}`;
                        timeCalendarEdit.value = appointments[0].id_duracion
                        areaCalendarEdit.value = appointments[0].id_area
                        typeCalendarEdit.value = appointments[0].id_tipo
                        costCalendarEdit.value = appointments[0].precio
                        priceCalendarEdit.innerText = appointments[0].precio.toLocaleString("en", {
                                                                                style: "currency",
                                                                                currency: "MXN"
                                                                            })
                        cosmetoCalendarEdit.value = appointments[0].id_cosme
                        patientEdit.value = `${appointments[0].id_participantes} - ${appointments[0].nombre}`

                        //changeTratamientEdit(appointments[0].id_area, appointments[0].precio);
                        changeDermaAppoimentEdit(appointments[0].id_tipo);
                        $('#modalEditCalendar').modal('show')
                        return
                    }
                    //curacion
                    if (appointments[0].id_categoria === 5) {
                        indexCat = SuccessAppointment[0].Category.findIndex(element => element.idCategoria === id);
                        currentServicesEdit = SuccessAppointment[0].Category[indexCat].Servicio[0];
                        container_frecuencyCalendarEdit.style.display = 'inline';
                        container_dermaCalendarEdit.style.display = 'inline';
                        container_channelEdit.style.display = 'inline';
                        container_methodPayCalendarEdit.style.display = 'inline'
                        container_observationCalendarEdit.style.display = 'inline';
                        container_costCalendarEdit.style.display = 'inline';
                        label_costCalendarEdit.innerHTML = 'Total curación';
                        formActiveEdit = 5;
                        button_healingEdit.checked = true;
                        frecuencyCalendarEdit.value = appointments[0].id_frecuencia;
                        dermaCalendarEdit.value = appointments[0].id_derma;
                        channelEdit.value = appointments[0].id_canal;
                        prometerEdit.value = appointments[0].id_provendedora;
                        observationCalendarEdit.value = appointments[0].observaciones;

                        //const indexPay = SuccessAppointment[0].TypePay.findIndex(element => element.id_forma_pago === parseInt(appointments[0].id_forma_pago))
                        //const { id_forma_pago, descripcion } = SuccessAppointment[0].TypePay[indexPay];
                        //methodPayCalendarEdit.value = id_forma_pago;

                        //if (descripcion === 'Tarjeta de débito' || descripcion === 'Tarjeta de crédito') {
                        //    //container_typePayCalendar.style.display = 'inline';
                        //    container_digitTarjetCalendarEdit.style.display = 'inline';
                        //    container_bankCalendaEdit.style.display = 'inline';
                        //    digitTarjetCalendarEdit.value = appointments[0].digitos;
                        //    bankCalendaEdit.value = appointments[0].id_banco;
                        //}
                        //else {
                        //    container_typePayCalendarEdit.style.display = 'none';
                        //    container_digitTarjetCalendarEdit.style.display = 'none';
                        //    container_bankCalendaEdit.style.display = 'none';
                        //}

                        dateCalendarEdit.value = `${appointments[0].Fecha}T${appointments[0].hora.Hours < 10 ? '0' + appointments[0].hora.Hours : appointments[0].hora.Hours}:${appointments[0].hora.Minutes < 10 ? '0' + appointments[0].hora.Minutes : appointments[0].hora.Minutes}`;
                        timeCalendarEdit.value = appointments[0].id_duracion
                        areaCalendarEdit.value = appointments[0].id_area
                        typeCalendarEdit.value = appointments[0].id_tipo
                        costCalendarEdit.value = appointments[0].precio
                        priceCalendarEdit.innerText = appointments[0].precio.toLocaleString("en", {
                                                                                style: "currency",
                                                                                currency: "MXN"
                                                                            })
                        cosmetoCalendarEdit.value = appointments[0].id_cosme
                        patientEdit.value = `${appointments[0].id_participantes} - ${appointments[0].nombre}`

                        //changeTratamientEdit(appointments[0].id_area, appointments[0].precio);
                        changeDermaAppoimentEdit();
                        $('#modalEditCalendar').modal('show');
                        return
                    }
                    //estetica
                    if (appointments[0].id_categoria === 6) {
                        container_frecuencyCalendarEdit.style.display = 'inline';
                        container_dermaCalendarEdit.style.display = 'inline';
                        container_channelEdit.style.display = 'inline';
                        container_prometerEdit.style.display = 'inline';
                        container_cosmetoCalendarEdit.style.display = 'inline'
                        container_typeCalendarEdit.style.display = 'inline'
                        container_observationCalendarEdit.style.display = 'inline';

                        container_methodPayCalendarEdit.style.display = 'inline';
                        container_costCalendarEdit.style.display = 'inline';
                        label_costCalendarEdit.innerHTML = 'Total estética'

                        indexCat = SuccessAppointment[0].Category.findIndex(element => element.idCategoria === appointments[0].id_categoria);
                        SuccessAppointment[0].Category[indexCat].Servicio.map(({ idServicio, servicios }) => {
                            let option = document.createElement('option')
                            option.value = `${idServicio}`
                            option.label = `${servicios}`
                            tratamientCalendarEdit.append(option)
                        })
                        currentTratamientEdit = SuccessAppointment[0].Category[indexCat];
                        tratamientCalendarEdit.value = appointments[0].id_servicio
                        container_tratamientCalendarEdit.style.display = 'inline';
                        formActiveEdit = 6;
                        button_estheticEdit.checked = true;
                        frecuencyCalendarEdit.value = appointments[0].id_frecuencia;
                        dermaCalendarEdit.value = appointments[0].id_derma;
                        channelEdit.value = appointments[0].id_canal;
                        prometerEdit.value = appointments[0].id_provendedora;
                        observationCalendarEdit.value = appointments[0].observaciones;

                        //const indexPay = SuccessAppointment[0].TypePay.findIndex(element => element.id_forma_pago === parseInt(appointments[0].id_forma_pago))
                        //const { id_forma_pago, descripcion } = SuccessAppointment[0].TypePay[indexPay];
                        //methodPayCalendarEdit.value = id_forma_pago;

                        //if (descripcion === 'Tarjeta de débito' || descripcion === 'Tarjeta de crédito') {
                        //    //container_typePayCalendar.style.display = 'inline';
                        //    container_digitTarjetCalendarEdit.style.display = 'inline';
                        //    container_bankCalendaEdit.style.display = 'inline';
                        //    digitTarjetCalendarEdit.value = appointments[0].digitos;
                        //    bankCalendaEdit.value = appointments[0].id_banco;
                        //}
                        //else {
                        //    container_typePayCalendarEdit.style.display = 'none';
                        //    container_digitTarjetCalendarEdit.style.display = 'none';
                        //    container_bankCalendaEdit.style.display = 'none';
                        //}

                        dateCalendarEdit.value = `${appointments[0].Fecha}T${appointments[0].hora.Hours < 10 ? '0' + appointments[0].hora.Hours : appointments[0].hora.Hours}:${appointments[0].hora.Minutes < 10 ? '0' + appointments[0].hora.Minutes : appointments[0].hora.Minutes}`;
                        timeCalendarEdit.value = appointments[0].id_duracion
                        areaCalendarEdit.value = appointments[0].id_area
                        typeCalendarEdit.value = appointments[0].id_tipo
                        priceCalendarEdit.innerText = appointments[0].precio.toLocaleString("en", {
                            style: "currency",
                            currency: "MXN"
                        })
                        costCalendarEdit.value = appointments[0].precio
                        cosmetoCalendarEdit.value = appointments[0].id_cosme
                        patientEdit.value = `${appointments[0].id_participantes} - ${appointments[0].nombre}`

                        changeTratamientEdit([]);
                        changeDermaAppoimentEdit(appointments[0].id_tipo);
                        $('#modalEditCalendar').modal('show')
                        return
                    }
                    //representante medico
                    if (appointments[0].id_categoria === 7) {
                        container_patientListCalendarEdit.style.display = 'none';
                        container_representativeCalendarEdit.style.display = 'inline';
                        container_laboratoryRepresentativeEdit.style.display = 'inline';
                        container_lineProductRepresentativeEdit.style.display = 'inline';
                        container_dermaCalendarEdit.style.display = 'inline';
                        $('#modalEditCalendar').modal('show')
                        formActiveEdit = 7;
                        return
                    }
                        $('#modalEditCalendar').modal('show')
                })
                .catch(error => Alert('error', error.message))
        })
        .catch(error => Alert('error', error.message))

}

const changeTratamientEdit = (areas) => {    
    var options = document.querySelectorAll('#areaCalendarEdit option');
    options.forEach((o, index) => index !== 0 && o.remove());
    //area ? areaCalendarEdit.value = `${area}-${price}` :  areaCalendarEdit.value = '';
    //price ? priceCalendarEdit.innerHTML = price : priceCalendarEdit.innerHTML = 0;
    //price ? currentPriceEdit = price : currentPriceEdit = 0;
    const { Servicio, idCategoria } = currentTratamientEdit

    if (idCategoria === 4 || idCategoria === 6) return;
    const indexServicesEdit = Servicio.findIndex(element => element.idServicio === parseInt(tratamientCalendarEdit.value))

    const { idServicio } = Servicio[indexServicesEdit]
    if (idServicio === 23) {
        container_areaCalendarEdit.style.display = 'none';
        container_areaCalendarEdit.className = 'd-flex flex-column m-1';

        container_areaCalendarEdit.className = 'd-none';
        container_areaCalendarEdit.style.display = 'inline';
        return
    } else if (idCategoria === 3) {
        container_costCalendar.style.display = 'none'
    }

    let data = [];
    //$('#areaCalendarEdit').select2("destroy")

    Servicio[indexServicesEdit].area.map(({ Precio, area, idarea }) => {
        data.push({ id: `${idarea}-${Precio}`, text: `${area}` })
        //let option = document.createElement('option')
        //option.value = `${idarea}-${Precio}`
        //option.label = `${area}`
        //areaCalendarEdit.append(option)
    })
    $('#areaCalendarEdit').select2({
        dropdownParent: $('#modalFinish'),
        placeholder: 'Selecciona el/las area',
        language: "es",
        data
    });  
    //area ? areaCalendarEdit.value = `${area}-${price}` : areaCalendarEdit.value = '';
    container_areaCalendarEdit.style.display = 'inline';
    container_areaCalendarEdit.className = 'd-flex flex-column m-1';
    setTimeout(() => {
        if (areas) {
            $('#areaCalendarEdit').val(areas).trigger('change');
        }
    },100) 
}

const changeAreaEdit = () => {
    let currenPriceSelect = 0;

    $("#areaCalendarEdit").val().map(element => currenPriceSelect += parseInt(element.split("-")[1]))

    currentPriceEdit = currenPriceSelect;
    priceCalendarEdit.innerHTML = `${currentPriceEdit.toLocaleString("en", {
        style: "currency",
        currency: "MXN"
    })}`;
}

const changeCostEdit = () => {
    const Price = parseInt(costCalendarEdit.value)
    priceCalendarEdit.innerHTML = Price.toLocaleString("en", {
        style: "currency",
        currency: "MXN"
    });
}

const closeModalAppoimentEdit = () => {
    var options = document.querySelectorAll('#list-patientCalendarEdit option');
    options.forEach((o, index) => o.remove());
    var options = document.querySelectorAll('#list-representativeCalendarEdit option');
    options.forEach((o, index) => o.remove());
    var options = document.querySelectorAll('#categoryCalendarEdit option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#timeCalendarEdit option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#frecuencyCalendarEdit option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#dermaCalendarEdit option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#statusCalendarEdit option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#promoterCalendarEdit option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#serviceCalendarEdit option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#chanelCalendarEdit option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#methodPayCalendarEdit option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#bankCalendarEdit option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#typePayCalendarEdit option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#cosmetoCalendarEdit option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#typeCalendarEdit option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#tratamientCalendarEdit option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#areaCalendarEdit option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#laboratoryRepresentativeEdit option');
    options.forEach((o, index) => index !== 0 && o.remove());
    $('#modalEditCalendar').modal('hide')
}

const editAppointment = () => {
    dateCalendarEdit.className = 'form-control';
    timeCalendarEdit.className = 'form-control';
    patientEdit.className = 'form-control';
    categoryEdit.className = 'form-control'
    channelEdit.className = 'form-control'
    costCalendarEdit.className = 'form-control';
    //services.className = 'form-control'
    prometerEdit.className = 'form-control'
    statusEdit.className = 'form-control'
    dermaCalendarEdit.className = 'form-control'
    frecuencyCalendarEdit.className = 'form-control'
    durationEdit.className = 'form-control'
    methodPayCalendarEdit.className = 'form-control'
    bankCalendaEdit.className = 'form-control'
    typePayCalendarEdit.className = 'form-control'
    digitTarjetCalendarEdit.className = 'form-control'
    observationCalendarEdit.className = 'form-control'
    cosmetoCalendarEdit.className = 'form-control'
    typeCalendarEdit.className = 'form-control'
    tratamientCalendarEdit.className = 'form-control'
    //areaCalendarEdit.className = 'form-control'
    representativeCalendarEdit.className = 'form-control'
    laboratoryRepresentativeEdit.className = 'form-control'
    lineProductRepresentativeEdit.className = 'form-control'
    
    const { id_usuario } = JSON.parse(localStorage.getItem('user'));
    const { id } = JSON.parse(localStorage.getItem('clinic'));
    
    let error = 0;
    
    if (formActiveEdit === "" || formActiveEdit === 0) {
        Alert('warning', 'Tienes que seleccionar una categoria');
        return;
    }

    if (dateCalendarEdit.value === '') {
        dateCalendarEdit.className = 'form-control is-invalid';
        error++;
    }
    if (timeCalendarEdit.value === '') {
        timeCalendarEdit.className = 'form-control is-invalid';
        error++;
    }
    if (formActiveEdit !== 7 && patientEdit.value === '') {
        patientEdit.className = 'form-control is-invalid';
        error++;
    }
        
    if (error > 0) return
    
    //Consulta
    if (formActiveEdit === 1) {
        if (frecuencyCalendarEdit.value === '') {
            frecuencyCalendarEdit.className = 'form-control is-invalid';
            error++;
        }
        if (dermaCalendarEdit.value === '') {
            dermaCalendarEdit.className = 'form-control is-invalid';
            error++;
        }
        if (promoterCalendarEdit.value === '') {
            promoterCalendarEdit.className = 'form-control is-invalid';
            error++;
        }
        if (channelEdit.value === '') {
            channelEdit.className = 'form-control is-invalid';
            error++;
        }
        //if (methodPayCalendarEdit.value === '') {
        //    methodPayCalendarEdit.className = 'form-control is-invalid';
        //    error++;
        //}
        if (error > 0) return
        const jsonData = {
            Appointment: {
                Cita: {
                    id_cita: idAppo,
                    id_paciente: patientEdit.value.split('-')[0],
                    id_participantes: id_usuario,
                    id_sucursal: id,
                    id_categoria: formActiveEdit,
                    precio: currentServicesEdit.area[0].Precio,
                    hora: dateCalendarEdit.value.split('T')[1],
                    id_tipo: null,
                    turno: 'M',
                    id_estadocita: 5,
                    id_provendedora: promoterCalendarEdit.value,
                    id_canal: channelEdit.value,
                    id_frecuencia: frecuencyCalendarEdit.value,
                    fecha: dateCalendarEdit.value.split('T')[0],
                    observaciones: observationCalendarEdit.value,
                    id_duracion: timeCalendarEdit.value,
                    id_forma_pago: methodPayCalendarEdit.value,
                    id_servicio: currentServicesEdit.idServicio,
                    id_area: currentServicesEdit.area[0].idarea,
                    id_banco: bankCalendaEdit.value,
                    digitos: digitTarjetCalendarEdit.value,
                    id_derma: dermaCalendarEdit.value,
                    id_tipo: null
                },
                Citareas: [
                    { id_area: currentServicesEdit.area[0].idarea }
                ]
            }
        }
        fetch(`${rutes.back}${controllers.diary}PutDataAppoiment`, {
            method: 'PUT',
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
            const { Appoiment } = result.SuccesDataUpdateAppoiment[0]
            Alert('success', Appoiment);
            if (consultForm === 'diary') searchCalendar(infoAppoimentActually.Fecha)
            else viewnAppoimentsUser(formActiveEdit)
        })
        .catch(error => Alert('error', error.message))
    }
    //Facial
    if (formActiveEdit === 2) {
        if (frecuencyCalendarEdit.value === '') {
            frecuencyCalendarEdit.className = 'form-control is-invalid';
            error++;
        }
        if (dermaCalendarEdit.value === '') {
            dermaCalendarEdit.className = 'form-control is-invalid';
            error++;
        }
        if (promoterCalendarEdit.value === '') {
            promoterCalendarEdit.className = 'form-control is-invalid';
            error++;
        }
        if (channelEdit.value === '') {
            channelEdit.className = 'form-control is-invalid';
            error++;
        }
        if (tratamientCalendarEdit.value === '') {
            tratamientCalendarEdit.className = 'form-control is-invalid';
            error++;
        }
        if (areaCalendarEdit.value === '') {
            Alert('warning', 'El area no puede ser vacia')
            error++;
        }
        if (error > 0) return
        let Citareas = []
        let currenPriceSelect = 0;
        $("#areaCalendarEdit").val().map(element => {
            currenPriceSelect += parseInt(element.split("-")[1])
            Citareas.push({ id_area: element.split("-")[0] })
        })  
        let infoArea = areaCalendarEdit.value.split('-')
        const jsonData = {
            Appointment: {
                Cita: {
                    id_cita: idAppo,
                    id_paciente: patientEdit.value.split('-')[0],
                    id_participantes: id_usuario,
                    id_sucursal: id,
                    id_categoria: formActiveEdit,
                    precio: currenPriceSelect,
                    hora: dateCalendarEdit.value.split('T')[1],
                    turno: 'M',
                    id_estadocita: 5,
                    id_provendedora: promoterCalendarEdit.value,
                    id_canal: channelEdit.value,
                    id_frecuencia: frecuencyCalendarEdit.value,
                    fecha: dateCalendarEdit.value.split('T')[0],
                    observaciones: observationCalendarEdit.value,
                    id_duracion: timeCalendarEdit.value,
                    id_forma_pago: methodPayCalendarEdit.value,
                    id_servicio: tratamientCalendarEdit.value,
                    id_area: infoArea[0],
                    id_banco: bankCalendaEdit.value,
                    digitos: digitTarjetCalendarEdit.value,
                    id_derma: dermaCalendarEdit.value,
                    id_cosme: cosmetoCalendarEdit.value,
                    id_tipo: typeCalendarEdit.value
                },
                Citareas
            }
        }
        fetch(`${rutes.back}${controllers.diary}PutDataAppoiment`, {
            method: 'PUT',
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
                const { Appoiment } = result.SuccesDataUpdateAppoiment[0]
                Alert('success', Appoiment);
                if (consultForm === 'diary') searchCalendar(infoAppoimentActually.Fecha)
                else viewnAppoimentsUser(formActiveEdit)
            })
            .catch(error => Alert('error', error.message))

    }
    //Aparatología
    if (formActiveEdit === 3) {
        if (frecuencyCalendarEdit.value === '') {
            frecuencyCalendarEdit.className = 'form-control is-invalid';
            error++;
        }
        if (dermaCalendarEdit.value === '') {
            dermaCalendarEdit.className = 'form-control is-invalid';
            error++;
        }
        if (promoterCalendarEdit.value === '') {
            promoterCalendarEdit.className = 'form-control is-invalid';
            error++;
        }
        if (channelEdit.value === '') {
            channelEdit.className = 'form-control is-invalid';
            error++;
        }
        if (tratamientCalendarEdit.value === '') {
            tratamientCalendarEdit.className = 'form-control is-invalid';
            error++;
        }
        if (areaCalendarEdit.value === '') {
            Alert('warning', 'El area no puede ser vacia')
            error++;
        }
        if (error > 0) return
        let Citareas = []
        let currenPriceSelect = 0;
        if (parseInt(tratamientCalendarEdit.value) !== 23) {
            $("#areaCalendarEdit").val().map(element => {
                currenPriceSelect += parseInt(element.split("-")[1])
                Citareas.push({ id_area: element.split("-")[0] })
            })
        } else {
            currenPriceSelect = costCalendarEdit.value
            Citareas.push({ id_area: 53 })
        }
        let infoArea = areaCalendarEdit.value.split('-')
        const jsonData = {
            Appointment: {
                Cita: {
                    id_cita: idAppo,
                    id_paciente: patientEdit.value.split('-')[0],
                    id_participantes: id_usuario,
                    id_sucursal: id,
                    id_categoria: formActiveEdit,
                    precio: currenPriceSelect,
                    hora: dateCalendarEdit.value.split('T')[1],
                    turno: 'M',
                    id_estadocita: 5,
                    id_provendedora: promoterCalendarEdit.value,
                    id_canal: channelEdit.value,
                    id_frecuencia: frecuencyCalendarEdit.value,
                    fecha: dateCalendarEdit.value.split('T')[0],
                    observaciones: observationCalendarEdit.value,
                    id_duracion: timeCalendarEdit.value,
                    id_forma_pago: methodPayCalendarEdit.value,
                    id_servicio: tratamientCalendarEdit.value,
                    id_area: infoArea[0],
                    id_banco: bankCalendaEdit.value,
                    digitos: digitTarjetCalendarEdit.value,
                    id_derma: dermaCalendarEdit.value,
                    id_cosme: cosmetoCalendarEdit.value,
                    id_tipo: typeCalendarEdit.value
                },
                Citareas
            }
        }
        fetch(`${rutes.back}${controllers.diary}PutDataAppoiment`, {
            method: 'PUT',
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
                const { Appoiment } = result.SuccesDataUpdateAppoiment[0]
                Alert('success', Appoiment);
                if (consultForm === 'diary') searchCalendar(infoAppoimentActually.Fecha)
                else viewnAppoimentsUser(formActiveEdit)
            })
            .catch(error => Alert('error', error.message))
    }
    //Dermapen
    if (formActiveEdit === 4) {
        if (frecuencyCalendarEdit.value === '') {
            frecuencyCalendarEdit.className = 'form-control is-invalid';
            error++;
        }
        if (dermaCalendarEdit.value === '') {
            dermaCalendarEdit.className = 'form-control is-invalid';
            error++;
        }
        if (promoterCalendarEdit.value === '') {
            promoterCalendarEdit.className = 'form-control is-invalid';
            error++;
        }
        if (channelEdit.value === '') {
            channelEdit.className = 'form-control is-invalid';
            error++;
        }
        if (tratamientCalendarEdit.value === '') {
            tratamientCalendarEdit.className = 'form-control is-invalid';
            error++;
        }
        if (costCalendarEdit.value === '' || parseFloat(costCalendarEdit.value) <= 0) {
            costCalendarEdit.className = 'form-control is-invalid';
            error++;
        }
        if (error > 0) return

        const jsonData = {
            Appointment: {
                Cita:{
                    id_cita: idAppo,
                    id_paciente: patientEdit.value.split('-')[0],
                    id_participantes: id_usuario,
                    id_sucursal: id,
                    id_categoria: formActiveEdit,
                    precio: costCalendarEdit.value,
                    hora: dateCalendarEdit.value.split('T')[1],
                    turno: 'M',
                    id_estadocita: 5,
                    id_provendedora: promoterCalendarEdit.value,
                    id_canal: channelEdit.value,
                    id_frecuencia: frecuencyCalendarEdit.value,
                    fecha: dateCalendarEdit.value.split('T')[0],
                    observaciones: observationCalendarEdit.value,
                    id_duracion: timeCalendarEdit.value,
                    id_forma_pago: methodPayCalendarEdit.value,
                    id_servicio: tratamientCalendarEdit.value,
                    id_area: 53,
                    id_banco: bankCalendaEdit.value,
                    digitos: digitTarjetCalendarEdit.value,
                    id_derma: dermaCalendarEdit.value,
                    id_cosme: cosmetoCalendarEdit.value,
                    id_tipo: typeCalendarEdit.value
                },
                Citareas: [
                    {
                        id_area: 53
                    }
                ]
            }
        }
        fetch(`${rutes.back}${controllers.diary}PutDataAppoiment`, {
            method: 'PUT',
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
                const { Appoiment } = result.SuccesDataUpdateAppoiment[0]
                Alert('success', Appoiment);
                if (consultForm === 'diary') searchCalendar(infoAppoimentActually.Fecha)
                else viewnAppoimentsUser(formActiveEdit)

            })
            .catch(error => Alert('error', error.message))
    }
    //Curación
    if (formActiveEdit === 5) {
        if (frecuencyCalendarEdit.value === '') {
            frecuencyCalendarEdit.className = 'form-control is-invalid';
            error++;
        }
        if (dermaCalendarEdit.value === '') {
            dermaCalendarEdit.className = 'form-control is-invalid';
            error++;
        }
        if (channelEdit.value === '') {
            channelEdit.className = 'form-control is-invalid';
            error++;
        }
        if (costCalendarEdit.value === '' || parseFloat(costCalendarEdit.value) <= 0) {
            costCalendarEdit.className = 'form-control is-invalid';
            error++;
        }

        if (error > 0) return

        const jsonData = {
            Appointment: {
                Cita:{
                    id_cita: idAppo,
                    id_paciente: patientEdit.value.split('-')[0],
                    id_participantes: id_usuario,
                    id_sucursal: id,
                    id_categoria: formActiveEdit,
                    precio: costCalendarEdit.value,
                    hora: dateCalendarEdit.value.split('T')[1],
                    id_tipo: null,
                    turno: 'M',
                    id_estadocita: 5,
                    id_provendedora: null,
                    id_canal: channelEdit.value,
                    id_frecuencia: frecuencyCalendarEdit.value,
                    fecha: dateCalendarEdit.value.split('T')[0],
                    observaciones: observationCalendarEdit.value,
                    id_duracion: timeCalendarEdit.value,
                    id_forma_pago: methodPayCalendarEdit.value,
                    id_servicio: currentServicesEdit.idServicio,
                    id_area: currentServicesEdit.area[0].idarea,
                    id_banco: bankCalendaEdit.value,
                    digitos: digitTarjetCalendarEdit.value,
                    id_derma: dermaCalendarEdit.value,
                    id_tipo: null
                },
                Citareas: [
                    {
                        id_area: currentServicesEdit.area[0].idarea
                    }
                ]
            }
        }
        fetch(`${rutes.back}${controllers.diary}PutDataAppoiment`, {
            method: 'PUT',
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
                const { Appoiment } = result.SuccesDataUpdateAppoiment[0]
                Alert('success', Appoiment);
                if (consultForm === 'diary') searchCalendar(infoAppoimentActually.Fecha)
                else viewnAppoimentsUser(formActiveEdit)
            })
            .catch(error => Alert('error', error.message))
    }
    //Estética
    if (formActiveEdit === 6) {
        if (frecuencyCalendarEdit.value === '') {
            frecuencyCalendarEdit.className = 'form-control is-invalid';
            error++;
        }
        if (dermaCalendarEdit.value === '') {
            dermaCalendarEdit.className = 'form-control is-invalid';
            error++;
        }
        if (promoterCalendarEdit.value === '') {
            promoterCalendarEdit.className = 'form-control is-invalid';
            error++;
        }
        if (channelEdit.value === '') {
            channelEdit.className = 'form-control is-invalid';
            error++;
        }
        if (tratamientCalendarEdit.value === '') {
            tratamientCalendarEdit.className = 'form-control is-invalid';
            error++;
        }
        if (costCalendarEdit.value === '' || parseFloat(costCalendarEdit.value) <= 0) {
            costCalendarEdit.className = 'form-control is-invalid';
            error++;
        }
        if (error > 0) return

        const jsonData = {
            Appointment: {
                Cita: {
                    id_cita: idAppo,
                    id_paciente: patientEdit.value.split('-')[0],
                    id_participantes: id_usuario,
                    id_sucursal: id,
                    id_categoria: formActiveEdit,
                    precio: costCalendarEdit.value,
                    hora: dateCalendarEdit.value.split('T')[1],
                    turno: 'M',
                    id_estadocita: 5,
                    id_provendedora: promoterCalendarEdit.value,
                    id_canal: channelEdit.value,
                    id_frecuencia: frecuencyCalendarEdit.value,
                    fecha: dateCalendarEdit.value.split('T')[0],
                    observaciones: observationCalendarEdit.value,
                    id_duracion: timeCalendarEdit.value,
                    id_forma_pago: methodPayCalendarEdit.value,
                    id_servicio: tratamientCalendarEdit.value,
                    id_area: 53,
                    id_banco: bankCalendaEdit.value,
                    digitos: digitTarjetCalendarEdit.value,
                    id_derma: dermaCalendarEdit.value,
                    id_cosme: cosmetoCalendarEdit.value,
                    id_tipo: typeCalendarEdit.value
                },
                Citareas: [
                    {
                        id_area: 53
                    }
                ]
            }
        }
        fetch(`${rutes.back}${controllers.diary}PutDataAppoiment`, {
            method: 'PUT',
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
                const { Appoiment } = result.SuccesDataUpdateAppoiment[0]
                Alert('success', Appoiment);
                if (consultForm === 'diary') searchCalendar(infoAppoimentActually.Fecha)
                else viewnAppoimentsUser(formActiveEdit)
            })
            .catch(error => Alert('error', error.message))
    }
    //Representante Medico
    if (formActiveEdit === 7) {
        if (representativeCalendarEdit.value === '') {
            representativeCalendarEdit.className = 'form-control is-invalid';
            error++;
        }
        if (laboratoryRepresentativeEdit.value === '') {
            laboratoryRepresentativeEdit.className = 'form-control is-invalid';
            error++;
        }
        if (lineProductRepresentativeEdit.value === '') {
            lineProductRepresentativeEdit.className = 'form-control is-invalid';
            error++;
        }
        if (dermaCalendarEdit.value === '') {
            dermaCalendarEdit.className = 'form-control is-invalid';
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
                resetForms();

            })
            .catch(error => Alert('error', error.message))
    }
}

const changeDermaAppoimentEdit = (type) => {    
    const { Type } = calendarInfoEdit[0];

    var options = document.querySelectorAll('#typeCalendarEdit option');
    options.forEach((o, index) => index !== 0 && o.remove());
    
    if(parseInt(dermaCalendarEdit.value) === 9){
        Type.map(({ id_tipo, nombre }, index) => {
            if(index === 0){
                let option = document.createElement('option')
                option.value = `${id_tipo}`
                option.label = `${nombre}`            
                typeCalendarEdit.append(option)
            }
        })
    } else {
        Type.map(({ id_tipo, nombre }, index) => {
            if(index !== 0){
                let option = document.createElement('option')
                option.value = `${id_tipo}`
                option.label = `${nombre}`            
                typeCalendarEdit.append(option)
            }
        })
    }

    typeCalendarEdit.value = type !== '' ? type : "";
}