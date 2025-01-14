/* Llamamos las variables de entorno */
const envPayments = envirement();

//Variables globales
const tablePaymentsFirst = document.getElementById('tablePaymentsFirst');
const tablePaymentsReconsultation = document.getElementById('tablePaymentsReconsultation');
const tablePaymentsFacial = document.getElementById('tablePaymentsFacial');
const tablePaymentsApparatology = document.getElementById('tablePaymentsApparatology');
const tablePaymentsDermapen = document.getElementById('tablePaymentsDermapen');
const tablePaymentsHealing = document.getElementById('tablePaymentsHealing');
const tablePaymentsEsthetic = document.getElementById('tablePaymentsEsthetic');
const tablePaymentsEarlySession = document.getElementById('tablePaymentsEarlySession');

// Componentes
let dermas = [];
let infoPaymentsDerma = [];
let turnView = '';
//Variables de formularios y labels
// Inputs
let paymentsDate = document.getElementById('paymentsDate');

// Labels y titulos
let paymentsTurn = document.getElementById('paymentsTurn');
let paymentsDermaTitle = document.getElementById('paymentsDermaTitle');
let paymentsShop = document.getElementById('paymentsShop');
let paymentsRecepFooter = document.getElementById('paymentsRecepFooter');
let paymentsDermaFooter = document.getElementById('paymentsDermaFooter');
let paymentsTotal = document.getElementById('paymentsTotal');
let paymentsRetention = document.getElementById('paymentsRetention');
let paymentsDateContainer = document.getElementById('paymentsDateContainer');
let btnPaymentDerma = document.getElementById('btnPaymentDerma');
let turnCash = document.getElementById('turnCash')

const getBase64 = (file) => {
    console.log('hola')
    var doc = new jsPDF();
    // var elementHTML = $('#infoprint').html();
    // var elementHTML = document.getElementById('infoprint').innerHTML;    
    // elementHTML = `<section> ${elementHTML} </section>`
    var elementHTML = `
    <link rel="stylesheet" href="/Content/Plugins/css/core/libs.min.css">
    <link rel="stylesheet" href="/Content/Plugins/css/hope-ui.min.css?v=1.2.0">
    <link rel="stylesheet" href="/Content/Plugins/css/components/TableCustom.css">
            <section> 
                        <section> 
                                    
                        <section class="d-flex flex-row flex-nowrap justify-content-between mb-5">
                            <section>
                               <img width="300" alt="MEPIEL DERMATOLOGICO" >
                            </section>
                            <section class="text-center">
                                <h2 class="fw-bold fs-4">CENTRO DERMATOLOGICO MEPIEL S.C.</h2>
                                <h2 class="fw-bold fs-6 text-uppercase">DERMATÓLOGO: <span id="paymentsDermaTitle">Directo  </span></h2>
                                <h2 class="fw-bold fs-6 text-uppercase">SUCURSAL: <span id="paymentsShop">FEDERALISMO</span></h2>
                            </section>
                            <section>
                                <h2 class="fs-4 fw-bold">Fecha: <span class="fw-normal" id="paymentsDate">12/08/2023</span> </h2>
                                <h2 class="fs-4 fw-bold">Turno: <span class="fw-normal" id="paymentsTurn">Matutino</span> </h2>
                            </section>
                        </section>
                        
                        <section>                 
                            <div id="tablePaymentsFirst" class="MuiGrid-root jss21 MuiGrid-container d-none"></div>
                            
                            <div id="tablePaymentsReconsultation" class="MuiGrid-root jss21 MuiGrid-container d-none"></div>
                            
                            <div id="tablePaymentsFacial" class="MuiGrid-root jss21 MuiGrid-container d-none"></div>
                            
                            <div id="tablePaymentsApparatology" class="MuiGrid-root jss21 MuiGrid-container d-none"></div>
                            

                        
                            <div id="tablePaymentsDermapen" class="MuiGrid-root jss21 MuiGrid-container d-none"></div>
                            
                            <div id="tablePaymentsHealing" class="MuiGrid-root jss21 MuiGrid-container d-none"></div>
                        
                            <div id="tablePaymentsEsthetic" class="MuiGrid-root jss21 MuiGrid-container d-none"></div>
                        </section>
                        <section class="d-flex flex-row flex-nowrap justify-content-between mt-5">
                            <section>
                                <h2 class="fs-6">________________________________________________________</h2>
                                <h2 class="text-center fs-6 fw-bold text-uppercase">RECEPCIÓN</h2>
                                <h2 class="text-center fs-6 fw-bold text-uppercase" id="paymentsRecepFooter">Alejandro Waldo Salazar</h2>
                            </section>
                            <section>
                                <h2 class="fs-6">________________________________________________________</h2>
                                <h2 class="text-center fs-6 fw-bold text-uppercase">DERMATÓLOGO</h2>
                                <h2 class="text-center fs-6 fw-bold text-uppercase" id="paymentsDermaFooter">Directo  </h2>
                            </section>
                            <section>
                                <h2 class="fw-bold fs-4 text-uppercase">Total: $<span id="paymentsTotal">0.00</span></h2>
                                <h2 id="paymentsDateContainer" class="fw-bold fs-5 text-uppercase d-none">Retención: $<span id="paymentsRetention">0.00</span>
                                </h2>
                            </section>
                        </section>
                    </section>
             </section>`
    var specialElementHandlers = {
        '#elementH': function (element, renderer) {
            return true;
        }
    };
    doc.fromHTML(elementHTML, 15, 15, {
        'width': 170,
        'elementHandlers': specialElementHandlers
    });
    
    console.log(elementHTML, specialElementHandlers, doc)
    
    // return
    // Save the PDF
    doc.save('sample-document.pdf');
 }

// Crea el formato en html del pdf y lo manda a imprimri en una pagina en blanco
const printPdf = element => {
    // getBase64()
    // return
    var component = document.getElementById(element);
    var w = window.open(' ', 'popimpr');
    w.document.write('<link rel="stylesheet" href="/Content/Plugins/css/core/libs.min.css">');
    w.document.write('<link rel="stylesheet" href="/Content/Plugins/css/hope-ui.min.css?v=1.2.0">');
    w.document.write('<link rel="stylesheet" href="/Content/Plugins/css/components/TableCustom.css">');
    w.document.write(component.innerHTML);
    setTimeout(() => {
        w.document.close();
        w.focus(); // necessary for IE >= 10
        w.print( );
        w.close();
    },100)
}

// Al llegar a la vista carga todos los dermatologos en el select
const getDermas = () => {
    fetch(`${envPayments.rutes.back}${envPayments.controllers.payments}GetAllDermatologist`)
    .then(response => response.json())
    .then(result => {
        const { dermatologist } = result.Dermatologist[0]
        dermas = dermatologist;
        paymentsDate.innerHTML = moment().format('L')
        let data = [];
        dermatologist.map(({Nombre, id_usuario}) => data.push({ id: id_usuario, text: Nombre}))
        $('#paymentsDerma').select2({
            dropdownParent: $('#modalFinish'),
            placeholder: 'Selecciona el dermatologo',
            language: "es",
            data
        });
        
        
        $('#paymentsDerma').val(9).trigger('change')
        setTimeout(changeDerma, 500)
    })
    .catch(error => Alert('error', error.message))
}

setTimeout(getDermas, 1000);

// Escuha el cambio del dermatologo seleccionado para cargar la información apropiada
const changeDerma = () => {
    const { name, id } = JSON.parse(localStorage.getItem('clinic'))
    const user = JSON.parse(localStorage.getItem('user'));
    const currentDerma = parseInt($("#paymentsDerma").val())
    const indexDerma = dermas.findIndex(({id_usuario}) => id_usuario === currentDerma);
    const derma = dermas[indexDerma];

    paymentsDermaTitle.innerText = derma.Nombre;
    paymentsDermaFooter.innerText = derma.Nombre;
    paymentsShop.innerText = name;
    paymentsRecepFooter.innerText = `${user.nombre} ${user.apellido_paterno} ${user.apellido_materno}`    
    
    tablePaymentsFirst.innerHTML = '';         
    tablePaymentsReconsultation.innerHTML = '';      
    tablePaymentsFacial.innerHTML = ''; 
    tablePaymentsApparatology.innerHTML = ''; 
    tablePaymentsDermapen.innerHTML = ''; 
    tablePaymentsHealing.innerHTML = ''; 
    tablePaymentsEsthetic.innerHTML = ''; 
    tablePaymentsEarlySession.innerHTML = ''; 

    tablePaymentsFirst.className = 'MuiGrid-root jss21 MuiGrid-container d-none';               
    tablePaymentsReconsultation.className = 'MuiGrid-root jss21 MuiGrid-container d-none';               
    tablePaymentsFacial.className = 'MuiGrid-root jss21 MuiGrid-container d-none';
    tablePaymentsApparatology.className = 'MuiGrid-root jss21 MuiGrid-container d-none';
    tablePaymentsDermapen.className = 'MuiGrid-root jss21 MuiGrid-container d-none';
    tablePaymentsHealing.className = 'MuiGrid-root jss21 MuiGrid-container d-none';
    tablePaymentsEsthetic.className = 'MuiGrid-root jss21 MuiGrid-container d-none';
    tablePaymentsEarlySession.className = 'MuiGrid-root jss21 MuiGrid-container d-none';
    paymentsDateContainer.className = 'fw-bold fs-5 text-uppercase d-none';        

    fetch(`${envPayments.rutes.back}${envPayments.controllers.payments}GetDermatologistPayment?idderma=${currentDerma}&idShope=${id}`)
    .then(response => response.json())
    .then(result => {
        const { 
            Aparatologia,
            Consulta_Primera_Vez,
            Curacion,
            Dermapen,
            Estetica,
            Facial,
            ReConsulta,
            Subsecuente,
            Retention,
            Sesion_Anticipada,
            Turno,
            Turno_visto,
            Pago_derma
        } = result.DermatologistPayment[0];
        turnView = Turno_visto;
        btnPaymentDerma.disabled = Pago_derma ? true : false;

        paymentsTurn.innerText = Turno_visto === 'M' ?  'Matutino' : 'Vespertino';

        if(Turno === 'M'){
            localStorage.setItem('turnOn','M')
            turnCash.checked = true;
          }else{
            localStorage.setItem('turnOn','V')
            turnCash.checked = false;
          }


        let data = [];   
        let total = 0;
        let totalDerma = 0;
        let tableLocal = '';
        /* Consulta_Primera_Vez */
        if(Consulta_Primera_Vez.Pago.length > 0 || Consulta_Primera_Vez.pago_anticipado.length > 0){
            tablePaymentsFirst.className = 'MuiGrid-root jss21 MuiGrid-container d-flex';               
                        
            tableLocal = '';
            tableLocal += headerConsultation((Consulta_Primera_Vez.Pago.length + Consulta_Primera_Vez.pago_anticipado.length), 'Consultas de primera vez', currentDerma)

            Consulta_Primera_Vez.Pago.map(({ Observations, Patient, Payment, Payment_dermatologist, Service, Waytopay, idAppoiment, Category }) => {
                total += parseFloat(Payment);
                totalDerma += parseFloat(Payment_dermatologist);

                const element = {
                    Observations: Observations ? Observations : '', 
                    Patient, 
                    Payment, 
                    Payment_dermatologist, 
                    PaymentText: `$${Payment.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    })}`, 
                    Payment_dermatologistText: `$${Payment_dermatologist ? Payment_dermatologist.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    }) : 0}`, 
                    Service, 
                    Waytopay,
                    idAppoiment,
                    WaytopayList: Waytopay.toString().replaceAll(',','/'),
                    Category
                }
                tableLocal += bodyConsultation(element,currentDerma)
                data.push({id_cita: idAppoiment})
            })
            
            Consulta_Primera_Vez.pago_anticipado.map(({ Observations, Patient, Payment, Payment_dermatologist, Service, Waytopay, idAppoiment, Category }) => {
                total += parseFloat(Payment);
                totalDerma += parseFloat(Payment_dermatologist);

                const element = {
                    Observations: Observations ? Observations : '', 
                    Patient, 
                    Payment, 
                    Payment_dermatologist, 
                    PaymentText: `$${Payment.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    })}`, 
                    Payment_dermatologistText: `$${Payment_dermatologist ? Payment_dermatologist.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    }) : 0}`, 
                    Service, 
                    Waytopay,
                    idAppoiment,
                    WaytopayList: Waytopay,
                    Category
                }
                tableLocal += bodyConsultation(element,currentDerma)
                data.push({id_cita: idAppoiment})
            })
            
            tablePaymentsFirst.innerHTML = tableLocal            
        }
        /* Consulta_Primera_Vez FIN */
           
        /* ReConsulta */
        // data = [];
        if(ReConsulta.Pago.length > 0 || ReConsulta.pago_anticipado.length > 0){
            tablePaymentsReconsultation.className = 'MuiGrid-root jss21 MuiGrid-container d-flex';               
                        
            tableLocal = '';
            tableLocal += headerConsultation((ReConsulta.Pago.length + ReConsulta.pago_anticipado.length), 'Reconsulta', currentDerma)
            
            ReConsulta.Pago.map(({ Observations, Patient, Payment, Payment_dermatologist, Service, Waytopay, idAppoiment, Category }) => {
                total += parseFloat(Payment);
                totalDerma += parseFloat(Payment_dermatologist);

                const element = {
                    Observations: Observations ? Observations : '', 
                    Patient, 
                    Payment, 
                    Payment_dermatologist, 
                    PaymentText: `$${Payment.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    })}`, 
                    Payment_dermatologistText: `$${Payment_dermatologist ? Payment_dermatologist.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    }) : 0}`, 
                    Service, 
                    Waytopay,
                    idAppoiment,
                    WaytopayList: Waytopay.toString().replaceAll(',','/'),
                    Category
                }
                tableLocal += bodyConsultation(element, currentDerma)
                data.push({id_cita: idAppoiment})
            })
            
            ReConsulta.pago_anticipado.map(({ Observations, Patient, Payment, Payment_dermatologist, Service, Waytopay, idAppoiment, Category }) => {
                total += parseFloat(Payment);
                totalDerma += parseFloat(Payment_dermatologist);

                const element = {
                    Observations: Observations ? Observations : '', 
                    Patient, 
                    Payment, 
                    Payment_dermatologist, 
                    PaymentText: `$${Payment.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    })}`, 
                    Payment_dermatologistText: `$${Payment_dermatologist ? Payment_dermatologist.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    }) : 0}`, 
                    Service, 
                    Waytopay,
                    idAppoiment,
                    WaytopayList: Waytopay,
                    Category
                }
                tableLocal += bodyConsultation(element, currentDerma)
                data.push({id_cita: idAppoiment})
            })

            tablePaymentsReconsultation.innerHTML = tableLocal;
        }
        /* ReConsulta FIN */
        
        /* FACIAL */
        // data = [];
        if(Facial.Pago.length > 0 || Facial.pago_anticipado.length > 0){
            tablePaymentsFacial.className = 'MuiGrid-root jss21 MuiGrid-container d-flex';     

            tableLocal = '';
            tableLocal += headerFacial((Facial.Pago.length + Facial.pago_anticipado.length), 'Faciales', currentDerma)
            
            Facial.Pago.map(({ Observations, Patient, Payment, Payment_dermatologist, Service, Waytopay, idAppoiment, Category, Type, Areas }) => {
                total += parseFloat(Payment);
                totalDerma += parseFloat(Payment_dermatologist);    
                const element = {
                    Observations: Observations ? Observations : '', 
                    Patient, 
                    Payment, 
                    Payment_dermatologist, 
                    PaymentText: `$${Payment.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    })}`, 
                    Payment_dermatologistText: `$${Payment_dermatologist ? Payment_dermatologist.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    }) : 0}`, 
                    Service, 
                    Waytopay,
                    idAppoiment,
                    WaytopayList: Waytopay.toString().replaceAll(',','/'),
                    Category,
                    productText: `${Service}(${Areas.toString().toUpperCase()})`,
                    Type: Type.toUpperCase()
                }          
                tableLocal += bodyFacial(element, currentDerma)  
                data.push({id_cita: idAppoiment})
            })

            Facial.pago_anticipado.map(({ Observations, Patient, Payment, Payment_dermatologist, Service, Waytopay, idAppoiment, Category, Type, Areas }) => {
                total += parseFloat(Payment);
                totalDerma += parseFloat(Payment_dermatologist);

                const element = {
                    Observations: Observations ? Observations : '', 
                    Patient, 
                    Payment, 
                    Payment_dermatologist, 
                    PaymentText: `$${Payment.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    })}`, 
                    Payment_dermatologistText: `$${Payment_dermatologist ? Payment_dermatologist.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    }) : 0}`, 
                    Service, 
                    Waytopay,
                    idAppoiment,
                    WaytopayList: Waytopay,
                    Category,
                    productText: `${Service}(${Areas.toString().toUpperCase()})`,
                    Type: Type.toUpperCase()
                }
                tableLocal += bodyFacial(element, currentDerma)  
                data.push({id_cita: idAppoiment})
            })

            tablePaymentsFacial.innerHTML = tableLocal;
        }
        /* FACIAL FIN */
        
        /* APARATOLOGIA */
        // data = [];
        if(Aparatologia.Pago.length > 0 || Aparatologia.pago_anticipado.length > 0){
            tablePaymentsApparatology.className = 'MuiGrid-root jss21 MuiGrid-container d-flex';     

            tableLocal = '';
            tableLocal += headerFacial((Aparatologia.Pago.length + Aparatologia.pago_anticipado.length), 'Aparatología', currentDerma)
            
            Aparatologia.Pago.map(({ Observations, Patient, Payment, Payment_dermatologist, Service, Waytopay, idAppoiment, Category, Type, Areas }) => {
                total += parseFloat(Payment);
                totalDerma += parseFloat(Payment_dermatologist);    
                const element = {
                    Observations: Observations ? Observations : '', 
                    Patient, 
                    Payment, 
                    Payment_dermatologist, 
                    PaymentText: `$${Payment.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    })}`, 
                    Payment_dermatologistText: `$${Payment_dermatologist ? Payment_dermatologist.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    }) : 0}`, 
                    Service, 
                    Waytopay,
                    idAppoiment,
                    WaytopayList: Waytopay.toString().replaceAll(',','/'),
                    Category,
                    productText: `${Service}(${Areas.toString().toUpperCase()})`,
                    Type: Type.toUpperCase()
                }          
                tableLocal += bodyFacial(element, currentDerma)  
                data.push({id_cita: idAppoiment})
            })

            Aparatologia.pago_anticipado.map(({ Observations, Patient, Payment, Payment_dermatologist, Service, Waytopay, idAppoiment, Category, Type, Areas }) => {
                total += parseFloat(Payment);
                totalDerma += parseFloat(Payment_dermatologist);

                const element = {
                    Observations: Observations ? Observations : '', 
                    Patient, 
                    Payment, 
                    Payment_dermatologist, 
                    PaymentText: `$${Payment.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    })}`, 
                    Payment_dermatologistText: `$${Payment_dermatologist ? Payment_dermatologist.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    }) : 0}`, 
                    Service, 
                    Waytopay,
                    idAppoiment,
                    WaytopayList: Waytopay,
                    Category,
                    productText: `${Service}(${Areas.toString().toUpperCase()})`,
                    Type: Type.toUpperCase()
                }
                tableLocal += bodyFacial(element, currentDerma)  
                data.push({id_cita: idAppoiment})
            })

            tablePaymentsApparatology.innerHTML = tableLocal;             
        }
        /* APARATOLOGIA FIN */

        /* DERMAPEN */
        // data = [];
        if(Dermapen.Pago.length > 0 || Dermapen.pago_anticipado.length > 0){
            tablePaymentsDermapen.className = 'MuiGrid-root jss21 MuiGrid-container d-flex';     

            tableLocal = '';
            tableLocal += headerFacial((Dermapen.Pago.length + Dermapen.pago_anticipado.length), 'Dermapen', currentDerma)
            
            Dermapen.Pago.map(({ Observations, Patient, Payment, Payment_dermatologist, Service, Waytopay, idAppoiment, Category, Type, Areas }) => {
                total += parseFloat(Payment);
                totalDerma += parseFloat(Payment_dermatologist);    
                const element = {
                    Observations: Observations ? Observations : '', 
                    Patient, 
                    Payment, 
                    Payment_dermatologist, 
                    PaymentText: `$${Payment.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    })}`, 
                    Payment_dermatologistText: `$${Payment_dermatologist ? Payment_dermatologist.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    }) : 0}`, 
                    Service, 
                    Waytopay,
                    idAppoiment,
                    WaytopayList: Waytopay.toString().replaceAll(',','/'),
                    Category,
                    productText: `${Service}`,
                    Type: Type.toUpperCase()
                }          
                tableLocal += bodyFacial(element, currentDerma)  
                data.push({id_cita: idAppoiment})
            })

            Dermapen.pago_anticipado.map(({ Observations, Patient, Payment, Payment_dermatologist, Service, Waytopay, idAppoiment, Category, Type, Areas }) => {
                total += parseFloat(Payment);
                totalDerma += parseFloat(Payment_dermatologist);

                const element = {
                    Observations: Observations ? Observations : '', 
                    Patient, 
                    Payment, 
                    Payment_dermatologist, 
                    PaymentText: `$${Payment.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    })}`, 
                    Payment_dermatologistText: `$${Payment_dermatologist ? Payment_dermatologist.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    }) : 0}`, 
                    Service, 
                    Waytopay,
                    idAppoiment,
                    WaytopayList: Waytopay,
                    Category,
                    productText: `${Service}`,
                    Type: Type.toUpperCase()
                }
                tableLocal += bodyFacial(element, currentDerma)  
                data.push({id_cita: idAppoiment})
            })

            tablePaymentsDermapen.innerHTML = tableLocal;               
        }
        /* DERMAPEN FIN */
        
        /* CURACION */
        // data = [];
        if(Curacion.Pago.length > 0 || Curacion.pago_anticipado.length > 0){
            tablePaymentsHealing.className = 'MuiGrid-root jss21 MuiGrid-container d-flex';               
                        
            tableLocal = '';
            tableLocal += headerConsultation((Curacion.Pago.length + Curacion.pago_anticipado.length), 'Curación', currentDerma)
            
            Curacion.Pago.map(({ Observations, Patient, Payment, Payment_dermatologist, Service, Waytopay, idAppoiment, Category }) => {
                total += parseFloat(Payment);
                totalDerma += parseFloat(Payment_dermatologist);

                const element = {
                    Observations: Observations ? Observations : '', 
                    Patient, 
                    Payment, 
                    Payment_dermatologist, 
                    PaymentText: `$${Payment.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    })}`, 
                    Payment_dermatologistText: `$${Payment_dermatologist ? Payment_dermatologist.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    }) : 0}`, 
                    Service, 
                    Waytopay,
                    idAppoiment,
                    WaytopayList: Waytopay.toString().replaceAll(',','/'),
                    Category
                }
                tableLocal += bodyConsultation(element, currentDerma)
                data.push({id_cita: idAppoiment})
            })
            
            Curacion.pago_anticipado.map(({ Observations, Patient, Payment, Payment_dermatologist, Service, Waytopay, idAppoiment, Category }) => {
                total += parseFloat(Payment);
                totalDerma += parseFloat(Payment_dermatologist);

                const element = {
                    Observations: Observations ? Observations : '', 
                    Patient, 
                    Payment, 
                    Payment_dermatologist, 
                    PaymentText: `$${Payment.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    })}`, 
                    Payment_dermatologistText: `$${Payment_dermatologist ? Payment_dermatologist.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    }) : 0}`, 
                    Service, 
                    Waytopay,
                    idAppoiment,
                    WaytopayList: Waytopay,
                    Category
                }
                tableLocal += bodyConsultation(element, currentDerma)
                data.push({id_cita: idAppoiment})
            })
            
            tablePaymentsHealing.innerHTML = tableLocal                 
        }
        /* CURACION FIN */

        /* ESTETICA */
        // data = [];
        if(Estetica.Pago.length > 0 || Estetica.pago_anticipado.length > 0){
            tablePaymentsEsthetic.className = 'MuiGrid-root jss21 MuiGrid-container d-flex';               
                        
            tableLocal = '';
            tableLocal += headerConsultation((Estetica.Pago.length + Estetica.pago_anticipado.length), 'Estética', currentDerma)
            
            Estetica.Pago.map(({ Observations, Patient, Payment, Payment_dermatologist, Service, Waytopay, idAppoiment, Category }) => {
                total += parseFloat(Payment);
                totalDerma += parseFloat(Payment_dermatologist);

                const element = {
                    Observations: Observations ? Observations : '', 
                    Patient, 
                    Payment, 
                    Payment_dermatologist, 
                    PaymentText: `$${Payment.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    })}`, 
                    Payment_dermatologistText: `$${Payment_dermatologist ? Payment_dermatologist.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    }) : 0}`, 
                    Service, 
                    Waytopay,
                    idAppoiment,
                    WaytopayList: Waytopay.toString().replaceAll(',','/'),
                    Category
                }
                tableLocal += bodyConsultation(element, currentDerma)
                data.push({id_cita: idAppoiment})
            })
            
            Estetica.pago_anticipado.map(({ Observations, Patient, Payment, Payment_dermatologist, Service, Waytopay, idAppoiment, Category }) => {
                total += parseFloat(Payment);
                totalDerma += parseFloat(Payment_dermatologist);

                const element = {
                    Observations: Observations ? Observations : '', 
                    Patient, 
                    Payment, 
                    Payment_dermatologist, 
                    PaymentText: `$${Payment.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    })}`, 
                    Payment_dermatologistText: `$${Payment_dermatologist ? Payment_dermatologist.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    }) : 0}`, 
                    Service, 
                    Waytopay,
                    idAppoiment,
                    WaytopayList: Waytopay,
                    Category
                }
                tableLocal += bodyConsultation(element, currentDerma)
                data.push({id_cita: idAppoiment})
            })
            
            tablePaymentsEsthetic.innerHTML = tableLocal               
        }
        /* ESTETICA FIN */

        /* SESION ANTICIPADA */ 
        if(Sesion_Anticipada.Pago.length > 0){
            tablePaymentsEarlySession.className = 'MuiGrid-root jss21 MuiGrid-container d-flex';               
                        
            tableLocal = '';
            tableLocal += headerEarly((Sesion_Anticipada.Pago.length), 'PAGOS ANTICIPADOS', currentDerma)
            
            Sesion_Anticipada.Pago.map(({ Observations, Patient, Payment, Payment_dermatologist, Service, Waytopay, idAppoiment, Category, Type, Areas, Product }) => {
                // total += parseFloat(Payment);
                // totalDerma += parseFloat(Payment_dermatologist);

                const element = {
                    Observations: Observations ? Observations : '', 
                    Patient, 
                    Payment, 
                    Payment_dermatologist, 
                    PaymentText: `$${Payment.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    })}`, 
                    Payment_dermatologistText: `$${Payment_dermatologist ? Payment_dermatologist.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    }) : 0}`, 
                    Service, 
                    Waytopay,
                    idAppoiment,
                    WaytopayList: Waytopay.toString().replaceAll(',','/'),
                    productText: `${Service}(${Areas.toString().toUpperCase()})`,
                    Category,
                    Type
                }
                tableLocal += bodyEarly(element, currentDerma)
            })
            
            tablePaymentsEarlySession.innerHTML = tableLocal               
        }
        /* SESION ANTICIPADA FIN */

        // paymentsTotal.innerText = total.toFixed(2);
        // paymentsRetention.innerText = totalDerma.toFixed(2);
        let retention = 0;
        if(currentDerma === 9){
            paymentsTotal.innerText = total.toLocaleString("en", {
                minimumFractionDigits: 2,
            });            
        }
        else if(Retention[0]){
            retention = totalDerma/2;
            paymentsTotal.innerText = totalDerma.toLocaleString("en", {
                minimumFractionDigits: 2,
            });
            paymentsRetention.innerText = (totalDerma/2).toLocaleString("en", {
                minimumFractionDigits: 2,
            });
            paymentsDateContainer.className = 'fw-bold fs-5 text-uppercase d-inline'
        } else {
            paymentsTotal.innerText = totalDerma.toLocaleString("en", {
                minimumFractionDigits: 2,
            });
        }

        infoPaymentsDerma = {
            Info: data,
            Total: {
                id_recepcion: user.id_usuario,
                total,
                totalDerma,
                turno: Turno_visto,
                retention
            }
        }
    })
}

// Crea el pago al dermatologo
const createPayment = () => {
    const currentDerma = parseInt($("#paymentsDerma").val())
    if(currentDerma === 9){
        Alert('warning', 'No se puede realizar la accion solicitada con el dermatólogo seleccionado');
        return
    }
    fetch(`${envPayments.rutes.back}${envPayments.controllers.payments}PostDermatologistPayments`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(infoPaymentsDerma)
    })
    .then(response => response.json())
    .then(result => {
        const { Description } = result.Success[0];
        Alert('success',Description);
        changeDerma();
    })
    .catch(error => Alert('error', error.message))
}