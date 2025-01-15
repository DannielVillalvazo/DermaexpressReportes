/* Llamamos las variables de entorno */
const envCashRegister = envirement();

//Variables globales
let $tableinFlowMoney = $('#tableinFlowMoney');
let $tableinOutMoney = $('#tableinOutMoney');

let container_tableinFlowMoney = document.getElementById('container-tableinFlowMoney')
let container_infoEntryCash = document.getElementById('container-infoEntryCash')
let container_DetailEntryCash = document.getElementById('container-DetailEntryCash')

let totalEntryCash = document.getElementById('totalEntryCash')
let totalOutputCash = document.getElementById('totalOutputCash')
let totalCashCash = document.getElementById('totalCashCash')
let turnCash = document.getElementById('turnCash')
let turnCashRegister = document.getElementById('turnCashRegister')
let changeTurnActive = document.getElementById('changeTurnActive')
let cutCashRigister = document.getElementById('cutCashRigister')
let printCashRigister = document.getElementById('printCashRigister')

/* VARIABLES MODAL ENTRADA DE DINERO */
let conceptEntryMoney = document.getElementById('conceptEntryMoney')
let quantityEntryMoney = document.getElementById('quantityEntryMoney')
let typeEntryMoney = document.getElementById('typeEntryMoney')
let methodEntryMoney = document.getElementById('methodEntryMoney')
/* VARIABLES MODAL ENTRADA DE DINERO FIN */


/* VARIABLES MODAL SALIDA DE DINERO */
let quantityOutMoney = document.getElementById('quantityOutMoney')
/* VARIABLES MODAL SALIDA DE DINERO FIN */


const onKeyboardEscFound = () => event.keyCode === 27 && closeModalFound();
const onKeyboardEscOutFound = () => event.keyCode === 27 && closeModalOutFound();


let lastExpanded = -1;
let lastExpandedOut = -1;
let infoCashRegister = [];
let turnView = '';
let statusGlobal = '';
let firstPetition = true;

/* OBTENEMOS LA INFORMACION DEL CORTE DE CAJA ACTUAL */
const getDetailsCash = turnSearch =>{
  const { name, id } = JSON.parse(localStorage.getItem('clinic'))
  turnView = turnSearch;
  fetch(`${envCashRegister.rutes.back}${envCashRegister.controllers.payments}GetBoxCut?idShope=${id}&turno=${turnSearch}`)
  .then(response => response.json())
  .then(result => {
    const { BoxCut, Conflicts } = result;
    if(Conflicts){
      Alert('error',Conflicts[0].Description)
      return
    }
    
    const { TotalEffective_cut, TotalEntries, TotalOutputs, Entrada, Salida, Turno, Estado_corte, Estado_corte_anterior} = BoxCut[0]

    //Validamos los turnos actuales en el sistema para manejar el corte de caja
    turnCashRegister.checked = turnSearch === 'M' ? true : false;
    turnCash.checked = Turno === 'M' ? true : false;
    cutCashRigister.disabled = turnSearch === 'V' && Estado_corte_anterior !== 'CERRADO' ? true : false;
    localStorage.setItem('turnOn',Turno);
    statusGlobal = Estado_corte;

    if(Estado_corte === 'NO GENERADO'){
      cutCashRigister.innerText = 'CERRAR CORTE DE CAJA'
      cutCashRigister.style.display = 'inline'
      changeTurnActive.style.display = turnSearch === 'V' ? 'inline' : 'none';
      printCashRigister.style.display = 'none';

    }
    if(Estado_corte === 'ABIERTO'){
      cutCashRigister.innerText = 'GENERAR CORTE'
      cutCashRigister.style.display = 'inline'
      printCashRigister.style.display = 'none';
    }
    if(Estado_corte === 'CERRADO'){
      if(firstPetition && Turno === 'V' && turnSearch === 'M' && Estado_corte === 'CERRADO'){
        firstPetition = false;
        getDetailsCash('V')
        return
      }

      cutCashRigister.innerText = 'GENERAR CORTE'
      printCashRigister.style.display = 'inline';
      changeTurnActive.style.display = 'inline';
      cutCashRigister.style.display = 'none'
    }

    infoCashRegister = BoxCut[0];
    let keysEntry = Object.keys(Entrada)
    let entrys = [];
    let outs = [];
    keysEntry.map(key => {
      if(key.includes('_anticipado')) return

      if(Entrada[`${key}_anticipado`].length > 0) Entrada[key].push(Entrada[`${key}_anticipado`][0])
    

      if(Entrada[key].length > 0){
        const Total = Entrada[key].reduce((acc, val) => acc + val.Total,0)        
        entrys.push({Name: key.replaceAll('_',' '),type: key, types: Entrada[key], Total: Total.toLocaleString("en", {
                                                                      minimumFractionDigits: 2,
                                                                  })})
      }
    })
    keysEntry = ['Pago_Derma','Salida_Parcial'];
    keysEntry.map(key => {
      if(Salida[key].length > 0){
        const Total = Salida[key].reduce((acc, val) => acc + val.Cantidad,0)
        outs.push({type: key.replace('_',' '), Quantity: Salida[key].length, types: Salida[key], Total: Total.toLocaleString("en", {
                                                                      minimumFractionDigits: 2,
                                                                  })})
      }
    })

    totalEntryCash.innerText = `$${TotalEntries.toLocaleString("en", {
      minimumFractionDigits: 2,
    })}`
    totalOutputCash.innerText = `$${TotalOutputs.toLocaleString("en", {
      minimumFractionDigits: 2,
    })}`
    totalCashCash.innerText = `$${TotalEffective_cut.toLocaleString("en", {
      minimumFractionDigits: 2,
    })}`

    $tableinFlowMoney.bootstrapTable({ data: entrys});
    $tableinOutMoney.bootstrapTable({data: outs})
  })
  .catch(error => Alert('error',error.message))
}

setTimeout(() => getDetailsCash('M'), 1600);

const printPdf = () => {
  const { name } = JSON.parse(localStorage.getItem('clinic'));
  const { nombre, apellido_paterno, apellido_materno } = JSON.parse(localStorage.getItem('user'));
  const turnOn = turnView === 'M' ? 'Matutino' : 'Vespertino';
  const { Entrada, Salida, TotalEffective_cut, TotalOutputs, Curaciones } = infoCashRegister

  var w = window.open(' ', 'popimpr');
  w.document.write('<link rel="stylesheet" href="/Content/Plugins/css/core/libs.min.css">');
  w.document.write('<link rel="stylesheet" href="/Content/Plugins/css/hope-ui.min.css?v=1.2.0">');
  w.document.write('<link rel="stylesheet" href="/Content/Plugins/css/components/TableCustom.css">');
  w.document.write(`<style>
  .makeStyles-grid_left-16 {
    border: 2px solid #000;
    box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12);
    margin-top: 10px;
    background-color: #fff;
}
.makeStyles-label-7 {
    margin-top: 0px;
    margin-bottom: 0px;
}
.makeStyles-label_cells-12 {
  font-size: 12px;
  margin-top: 0px;
  text-align: center;
  margin-bottom: 0px;
}
.makeStyles-label_title_descripcion-9 {
    margin-top: 0px;
    text-align: center;
    margin-bottom: 0px;
}
.MuiGrid-grid-xs-3 {
    flex-grow: 0;
    max-width: 25%;
    flex-basis: 25%;
}
.MuiGrid-grid-xs-6 {
  flex-grow: 0;
  max-width: 50%;
  flex-basis: 50%;
}
.MuiGrid-grid-xs-9 {
    flex-grow: 0;
    max-width: 75%;
    flex-basis: 75%;
}
.MuiGrid-grid-xs-12 {
    flex-grow: 0;
    max-width: 100%;
    flex-basis: 100%;
}
.makeStyles-label_cells_concepto-13 {
    font-size: 12px;
    margin-top: 0px;
    text-align: left;
    margin-left: 10px;
    margin-bottom: 0px;
}
.makeStyles-label_title_entradas-11 {
    color: #000000;
    font-size: 13px;
    margin-top: 0;
    text-align: center;
    font-weight: bold;
    padding-top: 1px;
    margin-bottom: 0;
    padding-bottom: 1px;
}
.makeStyles-label_cells_total-14 {
    font-size: 12px;
    margin-top: 0px;
    text-align: center;
    font-weight: bold;
    margin-bottom: 0px;
}
.MuiGrid-grid-xs-8 {
  flex-grow: 0;
  max-width: 66.666667%;
  flex-basis: 66.666667%;
}
.makeStyles-grid_right-17 {
  border: 2px solid #000;
  box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12);
  margin-top: 10px;
  background-color: #fff;
}
.MuiGrid-grid-xs-4 {
    flex-grow: 0;
    max-width: 33.333333%;
    flex-basis: 33.333333%;
                    }</style>`);
  w.document.write(`<section>
          <!-- header -->
                <section class="d-flex flex-row flex-nowrap justify-content-between mb-5">
                    <section>
                        <img width="300" alt="MEPIEL DERMATOLOGICO" src="/Content/Images/mepiel/Logo clinicas.png">
                    </section>
                    <section class="text-center">
                        <h2 class="fw-bold fs-4">CENTRO DERMATOLOGICO MEPIEL S.C.</h2>
                        <h2 class="fw-bold fs-6 text-uppercase">RECEPCIONISTA: <span>${nombre} ${apellido_paterno} ${apellido_materno}</span></h2>
                        <h2 class="fw-bold fs-6 text-uppercase">SUCURSAL: <span>${name}</span></h2>
                    </section>
                    <section>
                        <h2 class="fs-4 fw-bold">Fecha: <span class="fw-normal" id="paymentsDate">${new Date().toLocaleDateString('en-GB')}</span> </h2>
                        <h2 class="fs-4 fw-bold">Turno: <span class="fw-normal" id="paymentsTurn">${turnOn}</span> </h2>
                    </section>
                </section>
          <!-- header fin -->      
          <!-- ENTRADAS -->                    
          <section>        
                    <div class="MuiGrid-root jss21 MuiGrid-container d-flex"><div class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12">
                      ${headerInCashRegister()}
                      ${bodyInCashRegister(Entrada)}
                    </div>
            <section class="MuiGrid-root MuiGrid-container">                    
                    ${Curaciones.length > 0 && supplies(Curaciones) || ''}

                    ${paymentsDerma(Salida)}

                    <div class="MuiGrid-root makeStyles-grid_left-16 MuiGrid-container MuiGrid-grid-xs-6">
                      <div class="MuiGrid-root makeStyles-label-7 MuiGrid-item MuiGrid-grid-xs-12">
                        <h2 class="makeStyles-label_title_descripcion-9"> DETALLE DE EFECTIVO </h2>
                      </div>
                      <div class="MuiGrid-root makeStyles-label-7 MuiGrid-item MuiGrid-grid-xs-8">
                        <p class="makeStyles-label_title_entradas-11">CONCEPTO</p></div>
                      <div class="MuiGrid-root makeStyles-label-7 MuiGrid-item MuiGrid-grid-xs-4">
                        <p class="makeStyles-label_title_entradas-11">CANTIDAD</p>
                      </div>
                      <div class="MuiGrid-root makeStyles-label-7 MuiGrid-item MuiGrid-grid-xs-8">
                        <h3 class="makeStyles-label_cells_concepto-13">TOTAL EN EFECTIVO</h3>
                      </div>
                      <div class="MuiGrid-root makeStyles-label-7 MuiGrid-item MuiGrid-grid-xs-4">
                        <h3 class="makeStyles-label_cells-12">$${(TotalEffective_cut + TotalOutputs).toLocaleString("en", {
                          minimumFractionDigits: 2,
                      })}</h3>
                      </div>
                      <div class="MuiGrid-root makeStyles-label-7 MuiGrid-item MuiGrid-grid-xs-8">
                        <h3 class="makeStyles-label_cells_concepto-13">TOTAL PAGO DERMATÓLOGOS</h3>
                      </div>
                      <div class="MuiGrid-root makeStyles-label-7 MuiGrid-item MuiGrid-grid-xs-4">
                        <h3 class="makeStyles-label_cells-12">-$${Salida['Pago_Derma'].reduce((acc, element) => acc + parseFloat(element.Cantidad), 0).toLocaleString("en", {
                          minimumFractionDigits: 2,
                      })}</h3>
                      </div>
                      <div class="MuiGrid-root makeStyles-label-7 MuiGrid-item MuiGrid-grid-xs-8">
                        <h3 class="makeStyles-label_cells_concepto-13">TOTAL RETIROS PARCIALES</h3>
                      </div>
                      <div class="MuiGrid-root makeStyles-label-7 MuiGrid-item MuiGrid-grid-xs-4">
                        <h3 class="makeStyles-label_cells-12">-$${Salida['Salida_Parcial'].reduce((acc, element) => acc + parseFloat(element.Cantidad), 0).toLocaleString("en", {
                          minimumFractionDigits: 2,
                      })}</h3>
                      </div>  
                    </div>

                    <div class="MuiGrid-root makeStyles-grid_right-17 MuiGrid-container MuiGrid-grid-xs-6">
                      <div class="MuiGrid-root makeStyles-label-7 MuiGrid-item MuiGrid-grid-xs-12">
                        <h1 class="makeStyles-label_utilidad_perdida-10">TOTAL CORTE EFECTIVO: $${TotalEffective_cut.toLocaleString("en", {
                          minimumFractionDigits: 2,
                      })}<br><br></h1>
                      </div>
                      <div class="MuiGrid-root makeStyles-label-7 MuiGrid-item MuiGrid-grid-xs-12">
                        <h2 class="makeStyles-label_utilidad_perdida-10"><br></h2>
                      </div>
                      <div class="MuiGrid-root MuiGrid-container">
                        <div class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-true">
                          <h3 class="makeStyles-label_title_descripcion-9">_____________________________</h3>
                          <h3 class="makeStyles-label_title_descripcion-9">REALIZÓ</h3>
                        </div>
                        <div class="MuiGrid-root makeStyles-label-7 MuiGrid-item MuiGrid-grid-xs-true">
                          <h3 class="makeStyles-label_title_descripcion-9">_____________________________</h3>
                          <h3 class="makeStyles-label_title_descripcion-9">RECIBIÓ</h3>
                        </div>
                      </div>
                    </div>
  </section>

          </section>
          <!-- ENTRADAS FIN -->
  </section>`);
  setTimeout(() => {
      w.document.close();
      w.focus(); // necessary for IE >= 10
      w.print( );
      w.close();
  },100)
}
/* OBTENEMOS LA INFORMACION DEL CORTE DE CAJA ACTUAL FIN*/

/* CAMPOS ESPECIALES EN LAS TABLAS */
function detailFormatterCashRegister(index, row) {  
    const { type, types} = row;
    if (lastExpanded !== false && lastExpanded !== index) $tableinFlowMoney.bootstrapTable('collapseRow', lastExpanded)
    lastExpanded = index;
    var html = []
    html.push(`<h2 class="text-center fw-bold fs-6 mb-2 text-uppercase">Información de ${type}</h2>`)
     html.push(`<div class="d-flex flex-row flex-nowrap">                    
                    <div class="d-flex flex-column flex-nowrap border border-2" style="min-width: 15rem !important; max-width: 15rem !important;">
                      <p class="text-center text-uppercase mb-0 fw-bold">Tipo de ingreso</p>
                    </div>
                    <div class="d-flex flex-column flex-nowrap border border-2" style="min-width: 12rem !important; max-width: 10rem !important;">
                      <p class="text-center text-uppercase mb-0 fw-bold">Cantidad</p>
                    </div>
                    <div class="d-flex flex-column flex-nowrap border border-2" style="min-width: 17rem !important; max-width: 10rem !important;">
                      <p class="text-center text-uppercase mb-0 fw-bold">Total</p>
                    </div>
                    <div class="d-flex flex-column flex-nowrap border border-2" style="min-width: 8rem !important; max-width: 15rem !important;">
                        <p class="text-center text-uppercase mb-0 fw-bold">Acción</p>
                    </div>
                   </div>`)
    types.map(element => {
        html.push(`<div class="d-flex flex-row flex-nowrap">
                    <div class="d-flex flex-column flex-nowrap border border-2 fw-bold text-uppercase text-center" style="min-width: 15rem !important; max-width: 10rem !important;">
                        <p class="text-center text-uppercase mb-0 fw-bold">${element.Tipo}</p>
                    </div>
                    <div class="d-flex flex-column flex-nowrap border border-2 fw-bold text-uppercase text-center" style="min-width: 12rem !important; max-width: 12rem !important; padding-left: 0.5rem !important;">
                      <p class="text-center text-uppercase mb-0 fw-bold">${element.Cantidad}</p>
                    </div>
                    <div class="d-flex flex-column flex-nowrap border border-2 fw-bold text-uppercase text-center" style="min-width: 17rem !important; max-width: 17rem !important; padding-left: 0.5rem !important;">
                      <p class="text-center text-uppercase mb-0 fw-bold">${element.Total}</p>
                    </div>
                    <div class="d-flex flex-column flex-nowrap border border-2 fw-bold text-uppercase text-center" style="min-width: 8rem !important; max-width: 17rem !important; padding-left: 0.5rem !important;">                      
                      <a onclick="viewDetail('${type}','${element.Tipo}')" class="hvr-icon-forward" style="cursor: pointer;">
                        <svg class="size-28 hvr-icon" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > 
                        <path opacity="0.4" d="M8.20248 13.1904L4.50325 13.5176C3.67308 13.5176 3 12.8379 3 11.9997C3 11.1614 3.67308 10.4818 4.50325 10.4818L8.20248 10.8089C8.85375 10.8089 9.38174 11.3421 9.38174 11.9997C9.38174 12.6584 8.85375 13.1904 8.20248 13.1904Z"fill="currentColor" ></path> <path d="M20.6247 13.1302C20.5668 13.1885 20.3508 13.4353 20.1479 13.6402C18.9643 14.9234 15.8738 17.0218 14.2571 17.664C14.0116 17.7665 13.3909 17.9846 13.0582 18C12.7408 18 12.4375 17.9262 12.1484 17.7808C11.7873 17.577 11.4993 17.2554 11.34 16.8764C11.2386 16.6143 11.0793 15.8267 11.0793 15.8124C10.9211 14.9521 10.835 13.5531 10.835 12.0066C10.835 10.535 10.9211 9.19332 11.051 8.31871C11.0651 8.30329 11.2244 7.32623 11.3979 6.99137C11.7153 6.37892 12.336 6 13.0004 6H13.0582C13.4913 6.01432 14.4011 6.39435 14.4011 6.40756C15.9316 7.04975 18.949 9.04681 20.1621 10.3742C20.1621 10.3742 20.5047 10.7156 20.653 10.9282C20.8843 11.2344 20.9999 11.6134 20.9999 11.9923C20.9999 12.4153 20.8701 12.8085 20.6247 13.1302Z" fill="currentColor" >
                        </path> 
                      </svg>                        
				              </a>
                    </div>
                    </div>`)
    })
   
    return html.join('')   
}

function detailFormatterCashRegisterOut(index, row) {  
  const { type, types } = row;
  if (lastExpandedOut !== false && lastExpandedOut !== index) $tableinOutMoney.bootstrapTable('collapseRow', lastExpandedOut)
  lastExpandedOut = index;
  var html = []
  html.push(`<h2 class="text-center fw-bold fs-6 mb-2 text-uppercase">Información de ${type}</h2>`)
  html.push(`<div class="d-flex flex-row flex-nowrap">                    
  <div class="d-flex flex-column flex-nowrap border border-2" style="min-width: 23rem !important; max-width: 15rem !important;">
  <p class="text-center text-uppercase mb-0 fw-bold">Concepto</p>
  </div>
  <div class="d-flex flex-column flex-nowrap border border-2" style="min-width: 17rem !important; max-width: 10rem !important;">
  <p class="text-center text-uppercase mb-0 fw-bold">Recepcionista</p>
  </div>
  <div class="d-flex flex-column flex-nowrap border border-2" style="min-width: 17rem !important; max-width: 10rem !important;">
  <p class="text-center text-uppercase mb-0 fw-bold">Cantidad</p>
  </div>
  <div class="d-flex flex-column flex-nowrap border border-2" style="min-width: 8rem !important; max-width: 15rem !important;">
  <p class="text-center text-uppercase mb-0 fw-bold">Acción</p>
  </div>
  </div>`)
  types.map(element => {
  html.push(`<div class="d-flex flex-row flex-nowrap">
  <div class="d-flex flex-column flex-nowrap border border-2 fw-bold text-uppercase text-center" style="min-width: 23rem !important; max-width: 10rem !important;">
      <p class="text-center text-uppercase mb-0" style="font-size: 13px;">${element.Concepto}</p>
  </div>
  <div class="d-flex flex-column flex-nowrap border border-2 fw-bold text-uppercase text-center" style="min-width: 17rem !important; max-width: 17rem !important; padding-left: 0.5rem !important;">
    <p class="text-center text-uppercase mb-0" style="font-size: 13px;">${element.Recepcionista}</p>
  </div>
  <div class="d-flex flex-column flex-nowrap border border-2 fw-bold text-uppercase text-center" style="min-width: 17rem !important; max-width: 17rem !important; padding-left: 0.5rem !important;">
    <p class="text-center text-uppercase mb-0" style="font-size: 13px;">${element.Cantidad.toLocaleString("en", {
                                                                                                                  minimumFractionDigits: 2,
                                                                                                              })}</p>
  </div>
  <div class="d-flex flex-column flex-nowrap border border-2 fw-bold text-uppercase text-center" style="min-width: 8rem !important; max-width: 17rem !important; padding-left: 0.5rem !important;">                      
  ${statusGlobal !== 'CERRADO' ?
      `<a onclick="${element.Concepto === 'Salida Parcial' ? `deletePaymentPartial(${element.id_salida})` : `deletePaymentDerma(${element.id_derma})`}" class="hvr-icon-pulse-grow" style="cursor: pointer;">
      <svg class="size-28 hvr-icon" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
        <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
      </svg>                       
      </a>`
      :
      ``
    }
    </div>
  </div>`)
  })
 
  return html.join('')   
}
/* CAMPOS ESPECIALES EN LAS TABLAS FIN*/

/* ELIMINAR PAGO A DERMA / SALIDA PARCIAL*/
const deletePaymentDerma = idDerma => {    
  fetch(`${envCashRegister.rutes.back}${envCashRegister.controllers.payments}DeletePaymentsDermatologist?idDerma=${idDerma}&Turno=${turnView}`,{
    method: 'DELETE'
  })
  .then(result => result.json())
  .then(response => {
    const { Description } = response.Success[0]
    Alert('success', Description);
    $tableinFlowMoney.bootstrapTable('destroy');
    $tableinOutMoney.bootstrapTable('destroy');
    getDetailsCash(turnView);
  })
  .catch(error => Alert('error', error.message))
}
const deletePaymentPartial = idOut => {
  const turnOn = localStorage.getItem('turnOn');
  fetch(`${envCashRegister.rutes.back}${envCashRegister.controllers.payments}QueryDeletePartialDepartures?idPartial=${idOut}`,{
    method: 'DELETE'
  })
  .then(result => result.json())
  .then(response => {
    const { Description } = response.Success[0]
    Alert('success', Description);
    $tableinFlowMoney.bootstrapTable('destroy');
    $tableinOutMoney.bootstrapTable('destroy');
    getDetailsCash(turnView);
  })
  .catch(error => Alert('error', error.message))
}
/* ELIMINAR PAGO A DERMA / SALIDA PARCIAL FIN */

/* ESTILO DEL DETALLE DE LAS ENTRADAS */
const viewDetail = (key,type) => {
  const indexInfo = infoCashRegister.Entrada[key].findIndex(({Tipo}) => Tipo === type);
  const { Cantidad, Detalles, Total } = infoCashRegister.Entrada[key][indexInfo];
  let html = `<div class="card" style="margin-bottom: 0; min-height: 95%; max-height: 95%;">
                  <div class="card-header">
                      <div class="d-flex flex-row justify-content-between align-items-baseline">
                              <p class="text-uppercase">DETALLE: <span>${Cantidad} ${type}</span></p>
                              <button class="btn btn-danger" onclick="closeDetail()">CERRAR</button>
                              <hr />
                          </div>
                      </div>
                  <div class="card-body overflow-auto" style="height: 2px;">`;
  Detalles.map(({Hora,Id_Cita,Paciente,Recepcion,Total}) => html += `<section>
                                                                    <div class="m-1">
                                                                        <h2 class="fs-6 fw-bold">Concepto: </h2>
                                                                        <h2 class="fs-6 fw-normal">PACIENTE: ${Paciente}</h2>
                                                                    </div>
                                                                    <div class="d-flex  flex-row flex-nowrap m-1">
                                                                        <h2 class="fs-6 fw-bold">Hora: </h2>
                                                                        <h2 class="fs-6 fw-normal ms-1">${Hora.substring(0,8)}</h2>
                                                                    </div>
                                                                    <div class="m-1">
                                                                        <h2 class="fs-6 fw-bold">Recepcionista: </h2>
                                                                        <h2 class="fs-6 fw-normal">${Recepcion}</h2>
                                                                    </div>
                                                                    <div class="d-flex  flex-row flex-nowrap m-1">
                                                                        <h2 class="fs-6 fw-bold">Cantidad: </h2>
                                                                        <h2 class="fs-6 fw-normal ms-1 counter">$${Total.toLocaleString("en", {
                                                                                                                      minimumFractionDigits: 2,
                                                                                                                  })}</h2>
                                                                    </div>     
                                                                    <hr />                       
                                                                  </section>`);
  html += `</div></div>`;
  container_infoEntryCash.className = 'col-md-9';
  container_DetailEntryCash.className = 'col-3';
  container_DetailEntryCash.innerHTML = html;
}

const closeDetail = () => {
  container_infoEntryCash.className = 'col-md-12';
  container_DetailEntryCash.className = 'col-3 d-none';
  
}
/* ESTILO DEL DETALLE DE LAS ENTRADAS FIN */

const openModalFound = () => {
  $('#modalEntryMoney').modal('show')    
}

const closeModalFound = () => {
  conceptEntryMoney.value = '';
  quantityEntryMoney.value = '';
  typeEntryMoney.value = '';
  methodEntryMoney.value = '';

  var options = document.querySelectorAll('#typeEntryMoney option');
  options.forEach((o, index) => index !== 0 && o.remove());
  var options = document.querySelectorAll('#methodEntryMoney option');
  options.forEach((o, index) => index !== 0 && o.remove());
  
  $('#modalEntryMoney').modal('hide')    

}

/* MODAL DE LA SALIDA PARCIAL */
const openModalOutFound = () => {
  if(statusGlobal === 'CERRADO'){
    Alert('warning','El corte actual no permite salidas parciales');
    return;
  }

  $('#modalOutMoney').modal('show')    
}

const closeModalOutFound = () => {
  quantityOutMoney.value = '';
 
  $('#modalOutMoney').modal('hide')    
}

const saveOutPartial = () =>{
  
  const { id_usuario } = JSON.parse(localStorage.getItem('user'))
  const { id } = JSON.parse(localStorage.getItem('clinic'))  
  
  if(quantityOutMoney.value === '' || parseFloat(quantityOutMoney.value) <= 1){
    Alert('error','La cantidad no es valida')
    return
  }

  fetch(`${envCashRegister.rutes.back}${envCashRegister.controllers.payments}PostPartialDepartures`,{
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      Partial: [
        {
          cantidad: quantityOutMoney.value,
          id_recepcion: id_usuario,
          turno: turnView,
          Id_sucursal: id
          
        }
        
      ]
    })
  })
  .then(response => response.json())
  .then(result => {
    const { Conflicts } = result
    if(Conflicts){
      Alert('error', Conflicts[0].Description)
      return
    }

    const { Description } = result.Success[0];

    Alert('success', Description);
    $tableinFlowMoney.bootstrapTable('destroy');
    $tableinOutMoney.bootstrapTable('destroy')

    closeModalOutFound();
    getDetailsCash(turnView);   
  })
  .catch(error => Alert('error', error.message))

}
/* MODAL DE LA SALIDA PARCIAL FIN */

/* GUARDAR EL CORTE DE CAJA */
const saveCutPayment = () => {
  const { id_usuario } = JSON.parse(localStorage.getItem('user'))
  const { id } = JSON.parse(localStorage.getItem('clinic'))
  
  Confirmation(`¿DESEAS ${cutCashRigister.innerText}?`)
  .then(response => {
    if(!response) return
    
    fetch(`${envCashRegister.rutes.back}${envCashRegister.controllers.payments}PostBoxCut`,{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        cut: [
            {
                total_entradas: infoCashRegister.TotalEntries,
                total_salidas: infoCashRegister.TotalOutputs,
                total_corte_efectivo: infoCashRegister.TotalEffective_cut,
                id_recepcion: id_usuario,
                id_sucursal: id,
                Turno: turnView
            }
           
        ]
    })
    })
    .then(response => response.json())
    .then(result => {
      const { Conflicts } = result
      if(Conflicts){
        Alert('error', Conflicts[0].Description)
        return
      }
  
      const { Description } = result.Success[0];
  
      Alert('success', Description);
      $tableinFlowMoney.bootstrapTable('destroy');
      $tableinOutMoney.bootstrapTable('destroy');
      firstPetition = false;
      getDetailsCash(turnView);   
      // closeModalOutFound();
    })
    .catch(error => Alert('error', error.message))
  })
}
/* GUARDAR EL CORTE DE CAJA FIN */

const changeTurn = () => {
  $tableinFlowMoney.bootstrapTable('destroy');
  $tableinOutMoney.bootstrapTable('destroy')
  getDetailsCash(turnView === 'M' ? 'V' : 'M');
}