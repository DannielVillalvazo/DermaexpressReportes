/***********************************************************************************[ PAGO A DERMATOLOGO ]***********************************************************************************************/
const headerConsultation = (quantity, title, derma) => `<div class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12">
<p class="jss12 customp text-uppercase"> ${quantity} ${title} </p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
<p class="jss18 customp">PACIENTE</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
<p class="jss18 customp">CONSECUTIVO</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
<p class="jss18 customp">PRODUCTO</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
<p class="jss18 customp">FORMA DE PAGO</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
<p class="jss18 customp">SERVICIO</p>
</div>
${derma !== 9 ? `<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
<p class="jss18 customp">DERMATOLÓGO</p>
</div>`
:
''
}
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-2">
<p class="jss18 customp">OBSERVACIONES</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-12">
<hr class="jss7">
</div>`

const bodyConsultation = (element, derma) =>`<div class="MuiGrid-root MuiGrid-container">
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
    <p class="jss15 customp">${element.Patient}</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
    <p class="jss15 customp">${element.idAppoiment}</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
    <p class="jss15 customp">${element.Category}</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
    <p class="jss15 customp">${element.WaytopayList}</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
    <p class="jss17 customp">${element.PaymentText}</p>
</div>
${derma !== 9 ?`<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
    <p class="jss17 customp">${element.Payment_dermatologistText}</p>
</div>`
:
''
}
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-2">
    <p class="jss15 customp">${element.Observations}</p>
</div>
</div> 
`
const headerFacial = (quantity, title, derma) => `<div class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12">
<p class="jss12 customp text-uppercase"> ${quantity} ${title} </p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
<p class="jss18 customp">TIPO DE CITA</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
<p class="jss18 customp">PACIENTE</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
<p class="jss18 customp">CONSECUTIVO</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
<p class="jss18 customp">PRODUCTO</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
<p class="jss18 customp">FORMA DE PAGO</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
<p class="jss18 customp">SERVICIO</p>
</div>
${derma !== 9 ? `<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
<p class="jss18 customp">DERMATOLÓGO</p>
</div>`
:
''
}
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-2">
<p class="jss18 customp">OBSERVACIONES</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-12">
<hr class="jss7">
</div>`

const bodyFacial = (element,derma) =>`<div class="MuiGrid-root MuiGrid-container">
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
    <p class="jss15 customp">${element.Type}</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
    <p class="jss15 customp">${element.Patient}</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
    <p class="jss15 customp">${element.idAppoiment}</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
    <p class="jss15 customp">${element.productText}</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
    <p class="jss15 customp">${element.WaytopayList}</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
    <p class="jss17 customp">${element.PaymentText}</p>
</div>
${derma !== 9 ?`<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
    <p class="jss17 customp">${element.Payment_dermatologistText}</p>
</div>`
:
''
}
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-2">
    <p class="jss15 customp">${element.Observations}</p>
</div>
</div> 
`

const headerEarly = (quantity, title, derma) => `<div class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12">
<p class="jss12 customp text-uppercase"> ${quantity} ${title} </p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
<p class="jss18 customp">TIPO DE CITA</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
<p class="jss18 customp">PACIENTE</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
<p class="jss18 customp">TIPO SERVICIO</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
<p class="jss18 customp">PRODUCTO</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
<p class="jss18 customp">FORMA DE PAGO</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
<p class="jss18 customp">SERVICIO</p>
</div>
${derma !== 9 ? `<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
<p class="jss18 customp">DERMATOLÓGO</p>
</div>`
:
''
}
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-2">
<p class="jss18 customp">OBSERVACIONES</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-12">
<hr class="jss7">
</div>`

const bodyEarly = (element,derma) =>`<div class="MuiGrid-root MuiGrid-container">
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
    <p class="jss15 customp">${element.Type}</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
    <p class="jss15 customp">${element.Patient}</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
    <p class="jss15 customp">${element.Service}</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
    <p class="jss15 customp">${element.productText}</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
    <p class="jss15 customp">${element.WaytopayList}</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
    <p class="jss17 customp">${element.PaymentText}</p>
</div>
${derma !== 9 ?`<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
    <p class="jss17 customp">${element.Payment_dermatologistText}</p>
</div>`
:
''
}
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-2">
    <p class="jss15 customp">${element.Observations}</p>
</div>
</div> 
`
/***********************************************************************************[ PAGO A DERMATOLOGO FIN ]***********************************************************************************************/

/***********************************************************************************[ CORTE DE CAJA ]***********************************************************************************************/
const headerInCashRegister = () => `<p class="jss12 customp text-uppercase"> ENTRADAS </p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
<p class="jss18 customp">FORMA PAGO</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
<p class="jss18 customp">APARATOLOGÍA</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
<p class="jss18 customp">CONSULTAS</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
<p class="jss18 customp">CURACIÓN</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
<p class="jss18 customp">DERMAPEN</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
<p class="jss18 customp">ESTETICA</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
<p class="jss18 customp">FACIALES</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
<p class="jss18 customp">SA</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
<p class="jss18 customp">TOTAL</p>
</div>
<div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-12">
<hr class="jss7">
</div>`

const bodyInCashRegister = entry => {
    const keys = Object.keys(entry);
    let body = '';
    let granTotalList = {
        Aparatología: 0,
        Consulta: 0,
        Curación: 0,
        Dermapen: 0,
        Estética: 0,
        Facial: 0,
        SA: 0,
    };  
    let granTotal = 0;
    keys.map(key => {
        if(entry[key].length < 1 || key.includes('_anticipado')) return
        let totalList = {
            Aparatología: 0,
            Consulta: 0,
            Curación: 0,
            Dermapen: 0,
            Estética: 0,
            Facial: 0,
            SA: 0,
        };  
        let Total = 0;
       
        entry[key].map(element => {
            Total = Total + parseFloat(element.Total);
            granTotalList[element.Tipo] = parseFloat(granTotalList[element.Tipo]) + parseFloat(element.Total);
            totalList[element.Tipo] = element.Total
        })
        
        body += `<div class="MuiGrid-root MuiGrid-container">
                    <div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
                        <p class="jss15 customp text-uppercase">${key.replaceAll('_',' ')}</p>
                    </div>    
                    <div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
                        <p class="jss15 customp">$${totalList.Aparatología.toLocaleString("en", {
                            minimumFractionDigits: 2,
                        })}</p>
                    </div>
                    <div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
                        <p class="jss15 customp">$${totalList.Consulta.toLocaleString("en", {
                            minimumFractionDigits: 2,
                        })}</p>
                    </div>
                    <div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
                        <p class="jss15 customp">$${totalList.Curación.toLocaleString("en", {
                            minimumFractionDigits: 2,
                        })}</p>
                    </div>
                    <div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
                        <p class="jss17 customp">$${totalList.Dermapen.toLocaleString("en", {
                            minimumFractionDigits: 2,
                        })}</p>
                    </div>
                    <div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
                        <p class="jss17 customp">$${totalList.Estética.toLocaleString("en", {
                            minimumFractionDigits: 2,
                        })}</p>
                    </div>
                    <div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
                        <p class="jss17 customp">$${totalList.Facial.toLocaleString("en", {
                            minimumFractionDigits: 2,
                        })}</p>
                    </div>
                    <div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
                        <p class="jss17 customp">$${totalList.SA.toLocaleString("en", {
                            minimumFractionDigits: 2,
                        })}</p>
                    </div>
                    <div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
                        <p class="jss17 customp">$${Total.toLocaleString("en", {
                            minimumFractionDigits: 2,
                        })}</p>
                    </div>
                </div>`
    
    })
    
    for (let key in granTotalList) granTotal += granTotalList[key];    
    body += `<div class="MuiGrid-root MuiGrid-container">
                <div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
                    <p class="jss15 customp text-uppercase">TOTALES</p>
                </div>    
                <div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
                    <p class="jss15 customp">$${granTotalList.Aparatología.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    })}</p>
                </div>
                <div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
                    <p class="jss15 customp">$${granTotalList.Consulta.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    })}</p>
                </div>
                <div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
                    <p class="jss15 customp">$${granTotalList.Curación.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    })}</p>
                </div>
                <div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
                    <p class="jss17 customp">$${granTotalList.Dermapen.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    })}</p>
                </div>
                <div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
                    <p class="jss17 customp">$${granTotalList.Estética.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    })}</p>
                </div>
                <div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
                    <p class="jss17 customp">$${granTotalList.Facial.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    })}</p>
                </div>
                <div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
                    <p class="jss17 customp">$${granTotalList.SA.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    })}</p>
                </div>
                <div class="MuiGrid-root jss7 MuiGrid-item MuiGrid-grid-xs-true">
                    <p class="jss17 customp">$${granTotal.toLocaleString("en", {
                        minimumFractionDigits: 2,
                    })}</p>
                </div>
            </div>`
 
    return body; 
}

const paymentsDerma = outs => {
    let derma = false;
    let partial = false;
    let bodyDerma = `<div class="MuiGrid-root makeStyles-grid_left-16 MuiGrid-container MuiGrid-grid-xs-4">
                    <div class="MuiGrid-root makeStyles-label-7 MuiGrid-item MuiGrid-grid-xs-12">
                        <h2 class="makeStyles-label_title_descripcion-9"> PAGO DERMATÓLOGOS</h2>
                    </div><div class="MuiGrid-root makeStyles-label-7 MuiGrid-item MuiGrid-grid-xs-9">
                        <p class="makeStyles-label_title_entradas-11">CONCEPTO</p>
                    </div>
                    <div class="MuiGrid-root makeStyles-label-7 MuiGrid-item MuiGrid-grid-xs-3">
                        <p class="makeStyles-label_title_entradas-11">CANTIDAD</p>
                    </div>`
    let bodyPartial = `<div class="MuiGrid-root makeStyles-grid_left-16 MuiGrid-container MuiGrid-grid-xs-4">
                            <div class="MuiGrid-root makeStyles-label-7 MuiGrid-item MuiGrid-grid-xs-12">
                                <h2 class="makeStyles-label_title_descripcion-9"> RETIRO PARCIAL</h2>
                            </div><div class="MuiGrid-root makeStyles-label-7 MuiGrid-item MuiGrid-grid-xs-9">
                                <p class="makeStyles-label_title_entradas-11">CONCEPTO</p>
                            </div>
                            <div class="MuiGrid-root makeStyles-label-7 MuiGrid-item MuiGrid-grid-xs-3">
                                <p class="makeStyles-label_title_entradas-11">CANTIDAD</p>
                            </div>`
    outs['Pago_Derma'].map(element => {
        derma = true;
        bodyDerma += `<div class="MuiGrid-root makeStyles-label-7 MuiGrid-item MuiGrid-grid-xs-9">
                <h3 class="makeStyles-label_cells_concepto-13">${element.Concepto}</h3>
            </div>
            <div class="MuiGrid-root makeStyles-label-7 MuiGrid-item MuiGrid-grid-xs-3">
                <p class="makeStyles-label_cells_total-14">$${element.Cantidad.toLocaleString("en", {
                    minimumFractionDigits: 2,
                })}</p>
            </div>`

    })

    outs['Salida_Parcial'].map(element => {
        partial = true;
        bodyPartial += `<div class="MuiGrid-root makeStyles-label-7 MuiGrid-item MuiGrid-grid-xs-9">
                <h3 class="makeStyles-label_cells_concepto-13">${element.Concepto}</h3>
            </div>
            <div class="MuiGrid-root makeStyles-label-7 MuiGrid-item MuiGrid-grid-xs-3">
                <p class="makeStyles-label_cells_total-14">$${element.Cantidad.toLocaleString("en", {
                    minimumFractionDigits: 2,
                })}</p>
            </div>`

    })
    bodyPartial += `</div>`
    bodyDerma += `</div>`
    return  (derma ? bodyDerma : '') + (partial ? bodyPartial : '')    
}

const supplies = supplies => {
    let supp = `<div class="MuiGrid-root makeStyles-grid_left-16 MuiGrid-container MuiGrid-grid-xs-4">
    <div class="MuiGrid-root makeStyles-label-7 MuiGrid-item MuiGrid-grid-xs-12">
      <h2 class="makeStyles-label_title_descripcion-9"> CURACIONES</h2>
    </div>
    <div class="MuiGrid-root makeStyles-label-7 MuiGrid-item MuiGrid-grid-xs-9">
      <p class="makeStyles-label_title_entradas-11">CONCEPTO</p>
    </div>
    <div class="MuiGrid-root makeStyles-label-7 MuiGrid-item MuiGrid-grid-xs-3">
      <p class="makeStyles-label_title_entradas-11">CANTIDAD</p>
    </div>`;

    supplies.map(({ Nombre, Total }) => {
        supp += `<div class="MuiGrid-root makeStyles-label-7 MuiGrid-item MuiGrid-grid-xs-9">
                    <h3 class="makeStyles-label_cells_concepto-13">${Nombre}</h3>
                </div>
                <div class="MuiGrid-root makeStyles-label-7 MuiGrid-item MuiGrid-grid-xs-3">
                    <p class="makeStyles-label_cells_total-14">$${Total}</p>
                  </div>`
    })

    supp += '</div>'

    return supp;
}
/***********************************************************************************[ CORTE DE CAJA FIN ]***********************************************************************************************/
