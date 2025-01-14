/* Llamamos las variables de entorno */
const envMakePayment = envirement();

/**************************************************[ VALIDACION DEL MODAL ]*****************************************************************************/
const onKeyboardEscPayment = () => event.keyCode === 27 && closeModalMakePayment();
const onKeyboardEscPaymentEdit = () => event.keyCode === 27 && closeModalMakePaymentEdit();
const onKeyboardEscPaymentEarly = () => event.keyCode === 27 && closeModalEarlySession();
/**************************************************[ VALIDACION DEL MODAL FIN ]*****************************************************************************/
/**************************************************[ REALIZAR COBRO ]*****************************************************************************/
/* Variables globales */
const $modalMakePayment = $('#modalMakePayment')
let $tablePayments = $('#tablePayments');
let $tableSupplier = $('#tableSupplier');
let infoUserPayment = [];
let infoPayment = [];
let infoSupplier = [];
let totalPaid = 0;
let idOpenAppoiment = -1;
let isSupplies = false;
const pathname = window.location.pathname
/* Variables globales fin */

/* Contenedores */
let container_festive_makePayment = document.getElementById('container-festive-makePayment');
let container_area_makePayment = document.getElementById('container-area-makePayment');
let container_bank_makePayment = document.getElementById('container-bank-makePayment');
let container_digitTarjet_makePayment = document.getElementById('container-digitTarjet-makePayment');
let container_supplies = document.getElementById('container-supplies');
/* Contenedores fin */


/* Variables de formularios */
//Inicio
let shope_makePayment = document.getElementById('shope-makePayment');
let person_makePayment = document.getElementById('person-makePayment');
let date_makePayment = document.getElementById('date-makePayment');
let derma_makePayment = document.getElementById('derma-makePayment');
let festive_makePayment = document.getElementById('festive-makePayment');
let billing_makePayment = document.getElementById('billing-makePayment');
let discountDerma_makePayment = document.getElementById('discountDerma-makePayment');

//Informacion del producto
let product_makePayment = document.getElementById('product-makePayment');
let tratamient_makePayment = document.getElementById('tratamient-makePayment');

//Forma de pago
let amount_makePayment = document.getElementById('amount-makePayment');
let methodPay_makePayment = document.getElementById('methodPay-makePayment');
let bank_makePayment = document.getElementById('bank-makePayment');
let digitTarjet_makePayment = document.getElementById('digitTarjet-makePayment');
let observation_makePayment = document.getElementById('observation-makePayment');
let discManually_makePayment = document.getElementById('discManually-makePayment');
let priceManually_makePayment = document.getElementById('priceManually-makePayment');
let priceTotal_makePayment = document.getElementById('priceTotal-makePayment');

//Insumos
let supplier_makePayment = document.getElementById('supplier-makePayment');
let supplierQuantity_makePayment = document.getElementById('supplierQuantity-makePayment');
let supplierPrice_makePayment = document.getElementById('supplierPrice-makePayment');

//Totales
let subtotal_makePayment = document.getElementById('subtotal-makePayment');
let discount_makePayment = document.getElementById('discount-makePayment');
let total_makePayment = document.getElementById('total-makePayment');
let balance_makePayment = document.getElementById('balance-makePayment');
/* Variables de formularios fin */

const renderArea = (area) => {
    const component = `<span class="badge p-1 bg-primary fs-6 text-uppercase m-1">${area.area}</span>`;
    $('#renderAreas').append(component);
}
const openModalMakePayment = idAppoiment => {
    const clinic = JSON.parse(localStorage.getItem('clinic'));
    container_supplies.style.display = 'none';
    fetch(`${envMakePayment.rutes.back}${envMakePayment.controllers.patient}GetDataAppointment?idAppointment=${idAppoiment}`)
    .then(response => response.json())
    .then(infoAppoiment => {
        const { appointments } = infoAppoiment.appointment[0];
        fetch(`${envEditAppoiment.rutes.back}${envEditAppoiment.controllers.diary}GetDataAppointment?idShope=${clinic.id}`)
        .then(response => response.json())
        .then(dataAppoiment => {
            const { SuccessAppointment } = dataAppoiment;
            infoUserPayment = appointments[0]
            infoPayment = SuccessAppointment[0];
            idOpenAppoiment = idAppoiment;
            const currentDate = moment().format('L').split('/');

            SuccessAppointment[0].TypePay.map(({ id_forma_pago, descripcion }) => {
                let option = document.createElement('option')
                option.value = `${id_forma_pago}`
                option.label = `${descripcion}`
                methodPay_makePayment.append(option)
            })
            SuccessAppointment[0].banks.map(({ id_bancos, nombre }) => {
                let option = document.createElement('option')
                option.value = `${id_bancos}`
                option.label = `${nombre}`
                bank_makePayment.append(option)
            })

            /* Desactivamos todo */
            container_festive_makePayment.className = 'd-none';
            container_area_makePayment.className = 'd-none';
            container_bank_makePayment.className = 'd-none';
            container_digitTarjet_makePayment.className = 'd-none';
            /* Desactivamos todo fin */

            /* Obtenemos el resultado de ids */
            const indexDerma = SuccessAppointment[0].dermatologist.findIndex(element => element.id_usuario === appointments[0].id_derma);
            const indexCat = SuccessAppointment[0].Category.findIndex(element => element.idCategoria === appointments[0].id_categoria);
            const derma = SuccessAppointment[0].dermatologist[indexDerma];
            const catg = SuccessAppointment[0].Category[indexCat];
            /* Obtenemos el resultado de ids fin */

            shope_makePayment.innerHTML = clinic.name;
            person_makePayment.value = `${appointments[0].nombre}`;
            derma_makePayment.value = `${derma.nombre} ${derma.apellido_paterno} ${derma.apellido_materno}`;
            date_makePayment.value = `${currentDate[2]}-${currentDate[1]}-${currentDate[0]}`;
            const price = parseFloat(appointments[0].precio);
           
           
            priceManually_makePayment.value = price;
            priceTotal_makePayment.value = price;
            amount_makePayment.value = price.toFixed(2)
            totalPaid = 0;
            subtotal_makePayment.innerText = price.toLocaleString("en", {
                minimumFractionDigits: 2,
            });
            total_makePayment.innerText = price.toLocaleString("en", {
                minimumFractionDigits: 2,
            });
            balance_makePayment.innerText = price.toLocaleString("en", {
                minimumFractionDigits: 2,
            });
            /* Informacion de producto */
            product_makePayment.value = catg.Categoria;
            switch(appointments[0].id_categoria){
                case 1:
                    isSupplies = false;
                    container_festive_makePayment.className = 'd-flex flex-column align-items-center ms-4';
                    if(festive_makePayment.checked) tratamient_makePayment.value = catg.Servicio[1].servicios
                    else tratamient_makePayment.value = catg.Servicio[0].servicios;
                break;

                case 2:
                    isSupplies = false;
                    container_area_makePayment.className = 'd-flex flex-column flex-wrap';
                    const indexServ = catg.Servicio.findIndex(element => element.idServicio === appointments[0].id_servicio);
                    const {servicios, area} = catg.Servicio[indexServ]
                    tratamient_makePayment.value = servicios;
                    appointments[0].Areas.map(({id_area}) => {
                        const indexArea = area.findIndex(element => element.idarea === id_area);
                        renderArea(area[indexArea])
                    }) 
                    break;
                case 3:
                    isSupplies = false;
                    const indexServApar = catg.Servicio.findIndex(element => element.idServicio === appointments[0].id_servicio);
                    const catgServ = catg.Servicio[indexServApar]
                    tratamient_makePayment.value = catgServ.servicios;
                    if(catgServ.idServicio === 23) break;
                    container_area_makePayment.className = 'd-flex flex-column flex-wrap';
                    appointments[0].Areas.map(({id_area}) => {
                        const indexArea = catgServ.area.findIndex(element => element.idarea === id_area);
                        renderArea(catgServ.area[indexArea])
                    }) 
                    break;
                case 4:
                    isSupplies = false;
                    const indexServDerm = catg.Servicio.findIndex(element => element.idServicio === appointments[0].id_servicio);
                    const catgDerm = catg.Servicio[indexServDerm]
                    tratamient_makePayment.value = catgDerm.servicios;
                    break;
                case 5:
                    isSupplies = true;
                    container_supplies.style.display = 'block';
                    fetch(`${envEditAppoiment.rutes.back}${envEditAppoiment.controllers.payments}GetSupplies?idAppoiment=${idAppoiment}`)
                    .then(response => response.json())
                    .then(result => {
                        const { supplies } = result.supplies[0]                        
                        infoSupplier = supplies;
                        supplies.map(({ id_insumo, nombre_insumo, precio }) => {
                            let option = document.createElement('option')
                            option.value = `${id_insumo}`
                            option.label = `${nombre_insumo}`
                            supplier_makePayment.append(option)
                        })
                    })
                    .catch(error => Alert('error', error.message))
                    break;
                case 6:
                    isSupplies = true;
                    container_supplies.style.display = 'block';
                    fetch(`${envEditAppoiment.rutes.back}${envEditAppoiment.controllers.payments}GetSupplies?idAppoiment=${idAppoiment}`)
                    .then(response => response.json())
                    .then(result => {
                        const indexServEst = catg.Servicio.findIndex(element => element.idServicio === appointments[0].id_servicio);
                        const catgEst = catg.Servicio[indexServEst]
                        tratamient_makePayment.value = catgEst.servicios
                        const { supplies } = result.supplies[0]
                        infoSupplier = supplies;
                        supplies.map(({ id_insumo, nombre_insumo, precio }) => {
                            let option = document.createElement('option')
                            option.value = `${id_insumo}`
                            option.label = `${nombre_insumo}`
                            supplier_makePayment.append(option)
                        })
                    })
                    .catch(error => Alert('error', error.message))
                    break;
            }

            /* Informacion de producto fin */
            $tablePayments.bootstrapTable({ data: [] });
            $tableSupplier.bootstrapTable({ data: [] });
            $('#modalMakePayment').modal('show')    

        })
        .catch(error => Alert('error', error.message))
    })
    .catch(error => Alert('error', error.message))
}
const closeModalMakePayment = () => {
    person_makePayment.value = "";
    date_makePayment.value = "";
    derma_makePayment.value = "";
    festive_makePayment.checked = false;
    billing_makePayment.checked = false;

    product_makePayment.value = "";
    tratamient_makePayment.value = "";
    priceManually_makePayment.value = "";
    discManually_makePayment.value = "";
    priceTotal_makePayment.value = "";

    amount_makePayment.value = "";
    methodPay_makePayment.value = "";
    bank_makePayment.value = "";
    digitTarjet_makePayment.value = "";

    discManually_makePayment.readOnly = false;

    container_bank_makePayment.className = 'd-none';
    container_digitTarjet_makePayment.className = 'd-none';
    
    document.getElementById('renderAreas').innerHTML = "";

    observation_makePayment.value = "";

    subtotal_makePayment.innerText = 0;
    discount_makePayment.innerText = 0;
    total_makePayment.innerText = 0;
    balance_makePayment.innerText = 0;

    var options = document.querySelectorAll('#bank-makePayment option');
    options.forEach((o, index) => index !== 0 && o.remove());

    var options = document.querySelectorAll('#methodPay-makePayment option');
    options.forEach((o, index) => index !== 0 && o.remove());

    var options = document.querySelectorAll('#supplier-makePayment option');
    options.forEach((o, index) => index !== 0 && o.remove());

    $tablePayments.bootstrapTable('destroy');
    $tableSupplier.bootstrapTable('destroy');
    $('#modalMakePayment').modal('hide');


}
const changePayMethodMake = () => {
    const { TypePay } = infoPayment;
    const indexPay = TypePay.findIndex(element => element.id_forma_pago === parseInt(methodPay_makePayment.value))
    const { descripcion } = TypePay[indexPay]; 

    if (descripcion === 'Tarjeta de débito' || descripcion === 'Tarjeta de crédito') {
        container_bank_makePayment.className = 'd-block';
        container_digitTarjet_makePayment.className = 'd-block';    
    }
    else {
        container_bank_makePayment.className = 'd-none';
        container_digitTarjet_makePayment.className = 'd-none';
        bank_makePayment.value = '';
        digitTarjet_makePayment.value = '';
    }
}
const definePrice = () => {
    const indexCat = infoPayment.Category.findIndex(element => element.idCategoria === infoUserPayment.id_categoria);
    const catg  = infoPayment.Category[indexCat];
    let priceTotal = infoUserPayment.precio
    if(catg.idCategoria === 1 && festive_makePayment.checked){
        priceTotal = infoPayment.Category[0].Servicio[1].area[0].Precio
    }   
    return { priceOriginal: priceTotal, isTaxes: catg.IVA}
}
const _handelPrice = () => {
    if(discManually_makePayment.value < 0 || discManually_makePayment.value > 100){
        Alert('warning','El porcentaje es invalido');
        discManually_makePayment.value = '';
        return;
    }

    const { priceOriginal, isTaxes } = definePrice();
    const price = parseFloat(priceOriginal);
    const discountApplicable = discManually_makePayment.value;
    const discount = (Math.floor(discountApplicable*price)/100).toFixed(2)
    const  total = (parseFloat(price) - parseFloat(discount)).toFixed(2);
    priceTotal_makePayment.value = parseFloat(total).toFixed(2);
    priceManually_makePayment.value = parseFloat(priceOriginal).toFixed(2);
    amount_makePayment.value = (parseFloat(total) - totalPaid).toFixed(2)
    subtotal_makePayment.innerText = priceOriginal.toLocaleString("en", {
        minimumFractionDigits: 2,
    });
    discount_makePayment.innerText = discount.toLocaleString("en", {
        minimumFractionDigits: 2,
    });
    total_makePayment.innerText = parseFloat(total).toLocaleString("en", {
        minimumFractionDigits: 2,
    });
    balance_makePayment.innerText = (parseFloat(total) - totalPaid).toLocaleString("en", {
        minimumFractionDigits: 2,
    });
}
const AddPayment = () => {
    const amount = parseFloat(amount_makePayment.value);
    const balance = parseFloat(balance_makePayment.innerText.replace(',',''));
    const method = methodPay_makePayment.value;
    const bank = bank_makePayment.value;
    const digit = digitTarjet_makePayment.value;
    let digitName = "No aplica";
    
   if(amount > balance){
        Alert('warning','El monto no puede ser mayor al saldo pendiente');
        return
    }
    if(isNaN(amount) || (parseFloat(amount) === 0 && parseFloat(discManually_makePayment.value) !== 100) || parseFloat(amount) === ''){
        Alert('warning','El monto es incorrecto');
        amount_makePayment.value = 0;
        return 
    }
    if(method.length === 0 || method === ''){
        Alert('warning','Debes seleccionar una forma de pago');
        return 
    }

    let bankName = "No aplica";
    const { TypePay, banks } = infoPayment;
    const indexPay = TypePay.findIndex(element => element.id_forma_pago === parseInt(methodPay_makePayment.value))
    const indexBank = banks.findIndex(element => element.id_bancos === parseInt(bank_makePayment.value))
    const { descripcion } = TypePay[indexPay]; 

    if (descripcion === 'Tarjeta de débito' || descripcion === 'Tarjeta de crédito') {
        bankName = banks[indexBank].nombre;
        digitName = digit;
        if(bank.length === 0 || bank === ''){
            Alert('warning','Debes seleccionar un banco');
            return 
        }
        if(digit.length === 0 || digit === ''){
            Alert('warning','Debes ingresar los digitos');
            return 
        }
    }
    
    let data = $tablePayments.bootstrapTable('getData')
    if(data.length !== 0 && parseFloat(discManually_makePayment.value) === 100){
        Alert('warning','No puedes agregar mas de un cobro con el descuento del 100%');
        return;
    }
   const json = {
       amount,
       balance,
       methodName: descripcion,
       method,
       bank,
       bankName,
       digit,
       digitName
    }
    data.push(json)
    
   $tablePayments.bootstrapTable('refreshOptions',{ data });

   totalPaid += parseFloat(amount);
   let newAmount = parseFloat(balance - amount);
   amount_makePayment.value = newAmount;
   balance_makePayment.innerText = newAmount

   festive_makePayment.disabled = true;
   discManually_makePayment.readOnly = true;
   methodPay_makePayment.value = "";
   bank_makePayment.value = "";
   digitTarjet_makePayment.value = "";
   container_bank_makePayment.className = 'd-none';
   container_digitTarjet_makePayment.className = 'd-none';
}
function operateDeletePayment(value, row, index) {
    return [
        '<div class="d-flex justify-content-center">',
        '<a class="" style="cursor: pointer;" onclick="DeletePayment(\'' + index + '\')"  disabled>',
        '<span class="my-2 text-uppercase text-secondary" style="font-size: 13px;"><svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path></svg></span>',
        '</a>',
        '</div>'
    ].join('')
}
const DeletePayment = index => {
   let data = $tablePayments.bootstrapTable('getData')
   let info = data[index];
   totalPaid  -= parseFloat(info.amount)
   amount_makePayment.value = parseFloat(balance_makePayment.innerText) + parseFloat(info.amount);
   balance_makePayment.innerText = parseFloat(balance_makePayment.innerText) + parseFloat(info.amount);

   data.splice(index, 1)
   $tablePayments.bootstrapTable('refreshOptions',{ data });
   if(data.length === 0) {
    festive_makePayment.disabled = false;
    discManually_makePayment.readOnly = false;
   }
}
const AddPaymentMake = () => {
    const balance = parseFloat(balance_makePayment.innerText.replace(',',''));
    if(balance !== 0) {
        Alert('warning','El Saldo pendiente no se ha cubierto')
        return
    }
    const { id_usuario } = JSON.parse(localStorage.getItem('user'))
    const { isTaxes } = definePrice();
    const price = parseFloat(total_makePayment.innerText.replace(',',''))
    const taxes = isTaxes ? (price * 0.16) : 0;
    let data = $tablePayments.bootstrapTable('getData');
    let data2 = $tableSupplier.bootstrapTable('getData');
    let PaymentsData = [];
    let SuppliersData = [];
    data.map(element => {
        PaymentsData.push({
            id_banco: element.bank,
            id_formapago: element.method,
            id_metodopago: 1,
            digitos: element.digit,
            cantidad: parseFloat(element.amount)
        })
    })
    data2.map(element => {
        SuppliersData.push({
            id_insumo: element.supplier, 
            nombre_insumo: element.supplierName, 
            precio: element.price,
            cantidad: element.quantity
        })
    })

    if(PaymentsData.length === 0) {
        Alert('warning', 'Debes agregar por lo menos un cobro')
        return;
    }
    if(isSupplies && SuppliersData.length === 0) {
        Alert('warning', 'Debes agregar por lo menos un insumo')
        return
    }
    const body = {
        Payments: {
            pay: {
                id_cita: idOpenAppoiment,
                fecha_cobro: new Date(),
                observaciones: observation_makePayment.value,
                porcentaje: discManually_makePayment.value,
                descuento: parseFloat(discount_makePayment.innerText.replace('%','')),
                iva: parseFloat(taxes.toFixed(2)),
                subtotal: parseFloat((price - taxes).toFixed(2)),
                total: parseFloat(price.toFixed(2)),
                id_usuario: id_usuario,
                cancelado: false,
                festivo: festive_makePayment.checked,
                factura: billing_makePayment.checked,
                descuento_derma: discountDerma_makePayment.checked,
            },
            Payments: PaymentsData,
            PaySupplie: SuppliersData
        }
    }

    fetch(`${envMakePayment.rutes.back}${envMakePayment.controllers.payments}PostPayments`,{
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(result => {
        const { Description } = result.Success[0];
        Alert('success', Description);
        if(pathname === '/diary') renderInfo();
        closeModalMakePayment();
    })
    .catch(error => Alert('error', error.message))


}
const AddSupplier = () => { 
    if(supplier_makePayment.value === ''){
         Alert('warning','Debes seleccionar un insumo');
         return
     }
     if(supplierQuantity_makePayment.value === ''){
         Alert('warning','Debes ingresar una cantidad');
         return 
     }
     if(supplierPrice_makePayment.value === ''){
         Alert('warning','Debes ingresar un precio');
         return 
     }
     
    const indexSupplier = infoSupplier.findIndex(element => parseInt(element.id_insumo) === parseInt(supplier_makePayment.value));
    let data = $tableSupplier.bootstrapTable('getData')
    const json = {
        supplier: supplier_makePayment.value,
        supplierName: infoSupplier[indexSupplier].nombre_insumo,
        quantity: supplierQuantity_makePayment.value,
        price: supplierPrice_makePayment.value,
        total: (parseInt(supplierQuantity_makePayment.value)*parseInt(supplierPrice_makePayment.value)),
    }
 
    data.push(json)
    $tableSupplier.bootstrapTable('refreshOptions',{ data });
 
   
    supplier_makePayment.value = '';
    supplierQuantity_makePayment.value = '';
    supplierPrice_makePayment.value = '';    
}
function operateSupplier(value, row, index) {
    return [
        '<div class="d-flex justify-content-center">',
        '<a class="" style="cursor: pointer;" onclick="DeleteSupplier(\'' + index + '\')"  disabled>',
        '<span class="my-2 text-uppercase text-secondary" style="font-size: 13px;"><svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path></svg></span>',
        '</a>',
        '</div>'
    ].join('')
}
const DeleteSupplier = index => {
    let data = $tableSupplier.bootstrapTable('getData')
    console.log(data , index)
    data.splice(index, 1)
    $tableSupplier.bootstrapTable('refreshOptions',{ data });
 }
 const changeSupplier = () => {
    const indexSupplier = infoSupplier.findIndex(element => parseInt(element.id_insumo) === parseInt(supplier_makePayment.value));

   supplierPrice_makePayment.readOnly = infoSupplier[indexSupplier].precio_bloqueado;
   supplierPrice_makePayment.value = infoSupplier[indexSupplier].precio
}
/**************************************************[ REALIZAR COBRO FIN ]*****************************************************************************/

/**************************************************[ EDITAR COBRO FIN ]*****************************************************************************/
/* Variables globales */
const $modalMakePaymentEdit = $('#modalMakePaymentEdit')
let $tablePaymentsEdit = $('#tablePaymentsEdit');
let $tableSupplierEdit = $('#tableSupplierEdit');
let infoUserPaymentEdit = [];
let infoPaymentEdit = [];
let infoPaymentHistoryEdit = [];
let totalPaidEdit = 0;
let idOpenAppoimentEdit = -1;
let openDirectionEdit = "";
let isSuppliesEdit = false;
/* Variables globales fin */

/* Contenedores */
let container_festive_makePaymentEdit = document.getElementById('container-festive-makePaymentEdit');
let container_area_makePaymentEdit = document.getElementById('container-area-makePaymentEdit');
let container_bank_makePaymentEdit = document.getElementById('container-bank-makePaymentEdit');
let container_digitTarjet_makePaymentEdit = document.getElementById('container-digitTarjet-makePaymentEdit');
let container_suppliesEdit = document.getElementById('container-suppliesEdit');
/* Contenedores fin */


/* Variables de formularios */
//Inicio
let shope_makePaymentEdit = document.getElementById('shope-makePaymentEdit');
let person_makePaymentEdit = document.getElementById('person-makePaymentEdit');
let date_makePaymentEdit = document.getElementById('date-makePaymentEdit');
let derma_makePaymentEdit = document.getElementById('derma-makePaymentEdit');
let festive_makePaymentEdit = document.getElementById('festive-makePaymentEdit');
let billing_makePaymentEdit = document.getElementById('billing-makePaymentEdit');
let discountDerma_makePaymentEdit = document.getElementById('discountDerma-makePaymentEdit');

//Informacion del producto
let product_makePaymentEdit = document.getElementById('product-makePaymentEdit');
let tratamient_makePaymentEdit = document.getElementById('tratamient-makePaymentEdit');

//Forma de pago
let amount_makePaymentEdit = document.getElementById('amount-makePaymentEdit');
let methodPay_makePaymentEdit = document.getElementById('methodPay-makePaymentEdit');
let bank_makePaymentEdit = document.getElementById('bank-makePaymentEdit');
let digitTarjet_makePaymentEdit = document.getElementById('digitTarjet-makePaymentEdit');
let observation_makePaymentEdit = document.getElementById('observation-makePaymentEdit');
let discManually_makePaymentEdit = document.getElementById('discManually-makePaymentEdit');
let priceManually_makePaymentEdit = document.getElementById('priceManually-makePaymentEdit');
let priceTotal_makePaymentEdit = document.getElementById('priceTotal-makePaymentEdit');

//Insumos
let supplier_makePaymentEdit = document.getElementById('supplier-makePaymentEdit');
let supplierQuantity_makePaymentEdit = document.getElementById('supplierQuantity-makePaymentEdit');
let supplierPrice_makePaymentEdit = document.getElementById('supplierPrice-makePaymentEdit');

//Totales
let subtotal_makePaymentEdit = document.getElementById('subtotal-makePaymentEdit');
let discount_makePaymentEdit = document.getElementById('discount-makePaymentEdit');
let total_makePaymentEdit = document.getElementById('total-makePaymentEdit');
let balance_makePaymentEdit = document.getElementById('balance-makePaymentEdit');
/* Variables de formularios fin */

const renderAreaEdit = (area) => {
    const component = `<span class="badge p-1 bg-primary fs-6 text-uppercase m-1">${area.area}</span>`;
    $('#renderAreasEdit').append(component);
}
const openModalMakePaymentEdit = (idPayment,idAppoiment,openDirection) => {    
    const clinic = JSON.parse(localStorage.getItem('clinic'));
    openDirectionEdit = openDirection;
    container_suppliesEdit.style.display = 'none';
    fetch(`${envMakePayment.rutes.back}${envMakePayment.controllers.patient}GetDataAppointment?idAppointment=${idAppoiment}`)
    .then(response => response.json())
    .then(infoAppoiment => {
        const { appointments } = infoAppoiment.appointment[0];
        fetch(`${envEditAppoiment.rutes.back}${envEditAppoiment.controllers.diary}GetDataAppointment?idShope=${clinic.id}`)
        .then(response => response.json())
        .then(dataAppoiment => {
            fetch(`${envEditAppoiment.rutes.back}${envEditAppoiment.controllers.payments}GetPaymentsid?idPayment=${idPayment}`)
            .then(response => response.json())
            .then(dataPayment => {
                const { payments } = dataPayment.PaymentID[0]
                const { SuccessAppointment } = dataAppoiment;
                infoUserPaymentEdit = appointments[0]
                infoPaymentEdit = SuccessAppointment[0];
                infoPaymentHistoryEdit = payments[0];
                idOpenAppoimentEdit = idAppoiment;
                const currentDate = moment().format('L').split('/');
    
                SuccessAppointment[0].TypePay.map(({ id_forma_pago, descripcion }) => {
                    let option = document.createElement('option')
                    option.value = `${id_forma_pago}`
                    option.label = `${descripcion}`
                    methodPay_makePaymentEdit.append(option)
                })
                SuccessAppointment[0].banks.map(({ id_bancos, nombre }) => {
                    let option = document.createElement('option')
                    option.value = `${id_bancos}`
                    option.label = `${nombre}`
                    bank_makePaymentEdit.append(option)
                })
    
                /* Desactivamos todo */
                container_festive_makePaymentEdit.className = 'd-none';
                container_area_makePaymentEdit.className = 'd-none';
                container_bank_makePaymentEdit.className = 'd-none';
                container_digitTarjet_makePaymentEdit.className = 'd-none';
                /* Desactivamos todo fin */
    
                /* Obtenemos el resultado de ids */
                const indexDerma = SuccessAppointment[0].dermatologist.findIndex(element => element.id_usuario === appointments[0].id_derma);
                const indexCat = SuccessAppointment[0].Category.findIndex(element => element.idCategoria === appointments[0].id_categoria);
                const derma = SuccessAppointment[0].dermatologist[indexDerma];
                const catg = SuccessAppointment[0].Category[indexCat];
                /* Obtenemos el resultado de ids fin */
    
                shope_makePaymentEdit.innerHTML = clinic.name;
                person_makePaymentEdit.value = `${appointments[0].nombre}`;
                derma_makePaymentEdit.value = `${derma.nombre} ${derma.apellido_paterno} ${derma.apellido_materno}`;
                date_makePaymentEdit.value = `${currentDate[2]}-${currentDate[1]}-${currentDate[0]}`;
                const priceTotal = parseFloat(payments[0].total);
                const discountPorcent = parseFloat(payments[0].porcentaje);
                const discount = parseFloat(payments[0].descuento);
                const holiday = payments[0].festivo;
                const billing = payments[0].factura;
                const commnet = payments[0].observaciones;
                const price = parseFloat(priceTotal + discount);

                /* Pagos sobre el cobro */                
                let data = [];
                let data2 = [];
                let amountCover= 0;
                payments[0].Formas_Pago.map(element => {
                    let bank = "";
                    let bankName = 'No aplica';
                    let digit = element.digitos;
                    let digitName = 'No aplica';
                    let method = element.Forma_pago[0].id_formapago;
                    let methodName = element.Forma_pago[0].descripcion;
                    if (methodName === 'Tarjeta de débito' || methodName === 'Tarjeta de crédito') {
                        bankName = element.Banco[0].nombre;
                        bank = element.Banco[0].id_banco
                        digitName = element.digitos;
                    }
                    amountCover += parseFloat(element.cantidad)
                    data.push({
                        amount: element.cantidad,
                        balance: 0,
                        methodName,
                        method,
                        bank,
                        bankName,
                        digit,
                        digitName
                    })
                })
                const balance = (priceTotal - amountCover);
                /* Pagos sobre el cobro fin */
                
                festive_makePaymentEdit.checked = holiday;
                billing_makePaymentEdit.checked = billing;
                observation_makePaymentEdit.value = commnet;

                priceManually_makePaymentEdit.value = price;
                priceTotal_makePaymentEdit.value = priceTotal;
                amount_makePaymentEdit.value = balance;
                discManually_makePaymentEdit.value = discountPorcent;

                totalPaidEdit = priceTotal;
                subtotal_makePaymentEdit.innerText = price.toLocaleString("en", {
                    minimumFractionDigits: 2,
                });
                discount_makePaymentEdit.innerText = discount.toLocaleString("en", {
                    minimumFractionDigits: 2,
                });
                total_makePaymentEdit.innerText = priceTotal.toLocaleString("en", {
                    minimumFractionDigits: 2,
                });
                balance_makePaymentEdit.innerText = balance.toLocaleString("en", {
                    minimumFractionDigits: 2,
                });
                /* Informacion de producto */
                product_makePaymentEdit.value = catg.Categoria;
                switch(appointments[0].id_categoria){
                    case 1:
                        isSuppliesEdit = false;
                        container_festive_makePaymentEdit.className = 'd-flex flex-column align-items-center ms-4';
                        if(festive_makePaymentEdit.checked) tratamient_makePaymentEdit.value = catg.Servicio[1].servicios
                        else tratamient_makePaymentEdit.value = catg.Servicio[0].servicios;
                        break;
    
                    case 2:
                        isSuppliesEdit = false;
                        container_area_makePaymentEdit.className = 'd-flex flex-column flex-wrap';
                        const indexServ = catg.Servicio.findIndex(element => element.idServicio === appointments[0].id_servicio);
                        const {servicios, area} = catg.Servicio[indexServ]
                        tratamient_makePaymentEdit.value = servicios;
                        appointments[0].Areas.map(({id_area}) => {
                            const indexArea = area.findIndex(element => element.idarea === id_area);
                            renderAreaEdit(area[indexArea])
                        }) 
    
                        // console.log(indexServ, catg.Servicio, catg.Servicio[indexServ]);
                        break;
                    case 3:
                        isSuppliesEdit = false;
                        const indexServApar = catg.Servicio.findIndex(element => element.idServicio === appointments[0].id_servicio);
                        const catgServ = catg.Servicio[indexServApar]
                        tratamient_makePaymentEdit.value = catgServ.servicios;
                        if(catgServ.idServicio === 23) break;
                        container_area_makePaymentEdit.className = 'd-flex flex-column flex-wrap';
                        appointments[0].Areas.map(({id_area}) => {
                            const indexArea = catgServ.area.findIndex(element => element.idarea === id_area);
                            renderAreaEdit(catgServ.area[indexArea])
                        }) 
                        break;
                    case 4:
                        isSuppliesEdit = false;
                        const indexServDerm = catg.Servicio.findIndex(element => element.idServicio === appointments[0].id_servicio);
                        const catgDerm = catg.Servicio[indexServDerm]
                        tratamient_makePaymentEdit.value = catgDerm.servicios;
                        break;
                    case 5:
                        isSuppliesEdit = true;
                        container_suppliesEdit.style.display = 'block';
                        fetch(`${envEditAppoiment.rutes.back}${envEditAppoiment.controllers.payments}GetSupplies?idAppoiment=${idAppoiment}`)
                        .then(response => response.json())
                        .then(result => {
                            const { supplies } = result.supplies[0]
                            infoSupplier = supplies;
                            supplies.map(({ id_insumo, nombre_insumo, precio }) => {
                                let option = document.createElement('option')
                                option.value = `${id_insumo}`
                                option.label = `${nombre_insumo}`
                                supplier_makePaymentEdit.append(option)
                            })
                            payments[0].PaySupplie.map(element => {
                                data2.push({
                                    supplierName: element.nombre_insumo,
                                    quantity: element.cantidad,
                                    price: element.precio,
                                    supplier: element.id_insumo,
                                    total: (element.cantidad*element.precio),
                                })
                            })
                            $tableSupplierEdit.bootstrapTable({ data: data2 });
                            
                        })
                        .catch(error => Alert('error', error.message))
                        break;
                    case 6:
                        isSuppliesEdit = true;
                        container_suppliesEdit.style.display = 'block';
                        fetch(`${envEditAppoiment.rutes.back}${envEditAppoiment.controllers.payments}GetSupplies?idAppoiment=${idAppoiment}`)
                        .then(response => response.json())
                        .then(result => {
                            const { supplies } = result.supplies[0]
                            infoSupplier = supplies;
                            supplies.map(({ id_insumo, nombre_insumo, precio }) => {
                                let option = document.createElement('option')
                                option.value = `${id_insumo}`
                                option.label = `${nombre_insumo}`
                                supplier_makePaymentEdit.append(option)
                            })
                            payments[0].PaySupplie.map(element => {
                                data2.push({
                                    supplierName: element.nombre_insumo,
                                    quantity: element.cantidad,
                                    price: element.precio,
                                    supplier: element.id_insumo,
                                    total: (element.cantidad*element.precio),
                                })
                            })
                            $tableSupplierEdit.bootstrapTable({ data: data2 });
                        })
                        .catch(error => Alert('error', error.message))
                        break;
                }
    
                /* Informacion de producto fin */
                festive_makePaymentEdit.disabled = true;
                discManually_makePaymentEdit.readOnly = true;
                $tablePaymentsEdit.bootstrapTable({ data });
                $('#modalMakePaymentEdit').modal('show')    

            })
            .catch(error => Alert('error',  error.message))
        })
        .catch(error => Alert('error', error.message))
    })
    .catch(error => Alert('error', error.message))
}
const closeModalMakePaymentEdit = () => {
    person_makePaymentEdit.value = "";
    date_makePaymentEdit.value = "";
    derma_makePaymentEdit.value = "";
    festive_makePaymentEdit.checked = false;
    billing_makePaymentEdit.checked = false;

    product_makePaymentEdit.value = "";
    tratamient_makePaymentEdit.value = "";
    priceManually_makePaymentEdit.value = "";
    discManually_makePaymentEdit.value = "";
    priceTotal_makePaymentEdit.value = "";

    amount_makePaymentEdit.value = "";
    methodPay_makePaymentEdit.value = "";
    bank_makePaymentEdit.value = "";
    digitTarjet_makePaymentEdit.value = "";

    container_bank_makePaymentEdit.className = 'd-none';
    container_digitTarjet_makePaymentEdit.className = 'd-none';
    
    document.getElementById('renderAreasEdit').innerHTML = "";

    observation_makePaymentEdit.value = "";

    subtotal_makePaymentEdit.innerText = 0;
    discount_makePaymentEdit.innerText = 0;
    total_makePaymentEdit.innerText = 0;
    balance_makePaymentEdit.innerText = 0;

    var options = document.querySelectorAll('#bank-makePaymentEdit option');
    options.forEach((o, index) => index !== 0 && o.remove());

    var options = document.querySelectorAll('#methodPay-makePaymentEdit option');
    options.forEach((o, index) => index !== 0 && o.remove());

    var options = document.querySelectorAll('#supplier-makePaymentEdit option');
    options.forEach((o, index) => index !== 0 && o.remove());

    $tablePaymentsEdit.bootstrapTable('destroy');
    $tableSupplierEdit.bootstrapTable('destroy');
    $('#modalMakePaymentEdit').modal('hide');


}
const changePayMethodMakeEdit = () => {
    const { TypePay } = infoPaymentEdit;
    const indexPay = TypePay.findIndex(element => element.id_forma_pago === parseInt(methodPay_makePaymentEdit.value))
    const { descripcion } = TypePay[indexPay]; 

    if (descripcion === 'Tarjeta de débito' || descripcion === 'Tarjeta de crédito') {
        container_bank_makePaymentEdit.className = 'd-block';
        container_digitTarjet_makePaymentEdit.className = 'd-block';    
    }
    else {
        container_bank_makePaymentEdit.className = 'd-none';
        container_digitTarjet_makePaymentEdit.className = 'd-none';
        bank_makePaymentEdit.value = '';
        digitTarjet_makePaymentEdit.value = '';
    }
}
const definePriceEdit = () => {
    const indexCat = infoPaymentEdit.Category.findIndex(element => element.idCategoria === infoUserPaymentEdit.id_categoria);
    const catg  = infoPaymentEdit.Category[indexCat];
    let priceTotal = infoUserPaymentEdit.precio
    if(catg.idCategoria === 1 && festive_makePaymentEdit.checked){
        priceTotal = infoPaymentEdit.Category[0].Servicio[1].area[0].Precio
    }   
    return { priceOriginal: priceTotal, isTaxes: catg.IVA}
}
const _handelPriceEdit = () => {
    if(discManually_makePaymentEdit.value < 0 || discManually_makePaymentEdit.value > 100){
        Alert('warning','El porcentaje es invalido');
        discManually_makePayment.value = '';
        return;
    }

    const { priceOriginal, isTaxes } = definePriceEdit();
    const price = priceOriginal.toFixed(2);
    const discountApplicable = discManually_makePaymentEdit.value;
    const discount = (Math.floor(discountApplicable*price)/100).toFixed(2)
    const total = (price - discount).toFixed(2);
    priceTotal_makePaymentEdit.value = parseFloat(total).toFixed(2);
    priceManually_makePaymentEdit.value = priceOriginal.toFixed(2);
    amount_makePaymentEdit.value = (parseFloat(total) - parseFloat(totalPaidEdit)).toFixed(2)
    discount_makePaymentEdit.innerText = discount.toLocaleString("en", {
        minimumFractionDigits: 2,
    });
    total_makePaymentEdit.innerText = parseFloat(total).toLocaleString("en", {
        minimumFractionDigits: 2,
    });
    balance_makePaymentEdit.innerText = (parseFloat(total) - parseFloat(totalPaidEdit)).toLocaleString("en", {
        minimumFractionDigits: 2,
    });
}
const AddPaymentEdit = () => {
   const amount = amount_makePaymentEdit.value;
   const balance = parseFloat(balance_makePaymentEdit.innerText.replace(',',''));
   const method = methodPay_makePaymentEdit.value;
   const bank = bank_makePaymentEdit.value;
   const digit = digitTarjet_makePaymentEdit.value;
   let digitName = "No aplica";

   if(amount > balance){
        Alert('warning','El monto no puede ser mayor al saldo pendiente');
        return
    }

    if(isNaN(amount) || (parseFloat(amount) === 0 && parseFloat(discManually_makePaymentEdit.value) !== 100) || parseFloat(amount) === ''){

        Alert('warning','El monto es incorrecto');
        return 
    }
    if(method.length === 0 || method === ''){
        Alert('warning','Debes seleccionar una forma de pago');
        return 
    }

    let bankName = "No aplica";
    const { TypePay, banks } = infoPaymentEdit;
    const indexPay = TypePay.findIndex(element => element.id_forma_pago === parseInt(methodPay_makePaymentEdit.value))
    const indexBank = banks.findIndex(element => element.id_bancos === parseInt(bank_makePaymentEdit.value))
    const { descripcion } = TypePay[indexPay]; 

    if (descripcion === 'Tarjeta de débito' || descripcion === 'Tarjeta de crédito') {
        bankName = banks[indexBank].nombre;
        digitName = digit;
        if(bank.length === 0 || bank === ''){
            Alert('warning','Debes seleccionar un banco');
            return 
        }
        if(digit.length === 0 || digit === ''){
            Alert('warning','Debes ingresar los digitos');
            return 
        }
    }
    
   let data = $tablePaymentsEdit.bootstrapTable('getData')
   if(data.length !== 0 && parseFloat(discManually_makePaymentEdit.value) === 100){
        Alert('warning','No puedes agregar mas de un cobro con el descuento del 100%');
        return;
    }
   const json = {
    amount,
    balance,
    methodName: descripcion,
    method,
    bank,
    bankName,
    digit,
    digitName
   }

   data.push(json)
   $tablePaymentsEdit.bootstrapTable('refreshOptions',{ data });

   totalPaidEdit += parseFloat(amount);
   let newAmount = parseFloat(balance - amount);
   amount_makePaymentEdit.value = newAmount;
   balance_makePaymentEdit.innerText = newAmount

   festive_makePaymentEdit.disabled = true;
   discManually_makePaymentEdit.readOnly = true;
   methodPay_makePaymentEdit.value = "";
   bank_makePaymentEdit.value = "";
   digitTarjet_makePaymentEdit.value = "";
   container_bank_makePaymentEdit.className = 'd-none';
   container_digitTarjet_makePaymentEdit.className = 'd-none';
}
function operateDeletePaymentEdit(value, row, index) {
    return [
        '<div class="d-flex justify-content-center">',
        '<a class="" style="cursor: pointer;" onclick="DeletePaymentEdit(\'' + index + '\')"  disabled>',
        '<span class="my-2 text-uppercase text-secondary" style="font-size: 13px;"><svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path></svg></span>',
        '</a>',
        '</div>'
    ].join('')
}
const DeletePaymentEdit = index => {
   let data = $tablePaymentsEdit.bootstrapTable('getData')
   let info = data[index];
   totalPaidEdit  -= parseFloat(info.amount)
   amount_makePaymentEdit.value = parseFloat(balance_makePaymentEdit.innerText) + parseFloat(info.amount);
   balance_makePaymentEdit.innerText = parseFloat(balance_makePaymentEdit.innerText) + parseFloat(info.amount);

   data.splice(index, 1)
   $tablePaymentsEdit.bootstrapTable('refreshOptions',{ data });
   if(data.length === 0) {
    festive_makePaymentEdit.disabled = false;
    discManually_makePaymentEdit.readOnly = false;
   }
}
const AddPaymentMakeEdit = () => {    
    const balance = parseFloat(balance_makePaymentEdit.innerText.replace(',',''));
    if(balance !== 0) {
        Alert('warning','El Saldo pendiente no se ha cubierto')
        return
    }
    const { id_usuario } = JSON.parse(localStorage.getItem('user'))
    const { isTaxes } = definePriceEdit();
    const price = parseFloat(total_makePaymentEdit.innerText.replace(',',''))
    const taxes = isTaxes ? (price * 0.16) : 0;
    let data = $tablePaymentsEdit.bootstrapTable('getData');
    let data2 = $tableSupplierEdit.bootstrapTable('getData');
    let PaymentsData = [];
    let SuppliersData = [];
    data.map(element => {
        PaymentsData.push({
            id_banco: element.bank,
            id_formapago: element.method,
            id_metodopago: 1,
            digitos: element.digit,
            cantidad: parseFloat(element.amount)
        })
    })
    data2.map(element => {
        SuppliersData.push({
            id_insumo: element.supplier, 
            nombre_insumo: element.supplierName, 
            precio: element.price,
            cantidad: element.quantity
        })
    })

    if(isSuppliesEdit && SuppliersData.length === 0){
        Alert('warning','Debes agregar por lo menos un insumo')
        return
    }
    if(PaymentsData.length === 0) {
        Alert('warning', 'Debes agregar por lo menos un cobro')
        return;
    }

    const body = {
        Payments: {
            pay: {
                id_cobro: infoPaymentHistoryEdit.id_cobro,
                id_cita: idOpenAppoimentEdit,
                fecha_cobro: new Date(),
                observaciones: observation_makePaymentEdit.value,
                porcentaje: discManually_makePaymentEdit.value,
                descuento: parseFloat(discount_makePaymentEdit.innerText.replace('%','')),
                iva: parseFloat(taxes.toFixed(2)),
                subtotal: parseFloat((price - taxes).toFixed(2)),
                total: parseFloat(price.toFixed(2)),
                id_usuario: id_usuario,
                cancelado: false,
                festivo: festive_makePaymentEdit.checked,
                factura: billing_makePaymentEdit.checked,
                descuento_derma: discountDerma_makePaymentEdit.checked,
            },
            Payments: PaymentsData,
            PaySupplie: SuppliersData
        }
    }    
    fetch(`${envMakePayment.rutes.back}${envMakePayment.controllers.payments}PutPayments`,{
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(result => {
        if(openDirectionEdit === 'diary') renderInfo();
        const { Description } = result.Success[0];
        Alert('success', Description);
        viewnPaymentsHist(1);
        closeModalMakePaymentEdit();
    })
    .catch(error => Alert('error', error.message))


}
const AddSupplierEdit = () => {
    if(supplier_makePaymentEdit.value === ''){
        Alert('warning','Debes seleccionar un insumo');
        return
    }
    if(supplierQuantity_makePaymentEdit.value === ''){
        Alert('warning','Debes ingresar una cantidad');
        return 
    }
    if(supplierPrice_makePaymentEdit.value === ''){
        Alert('warning','Debes ingresar un precio');
        return 
     }
     
     const indexSupplier = infoSupplier.findIndex(element => parseInt(element.id_insumo) === parseInt(supplier_makePaymentEdit.value));
     let data = $tableSupplierEdit.bootstrapTable('getData')
    const json = {
        supplier: supplier_makePaymentEdit.value,
        supplierName: infoSupplier[indexSupplier].nombre_insumo,
        quantity: supplierQuantity_makePaymentEdit.value,
        price: supplierPrice_makePaymentEdit.value,
        total: (parseInt(supplierQuantity_makePaymentEdit.value)*parseInt(supplierPrice_makePaymentEdit.value)),
    }
 
    data.push(json)
    $tableSupplierEdit.bootstrapTable('refreshOptions',{ data });
 
   
    supplier_makePaymentEdit.value = '';
    supplierQuantity_makePaymentEdit.value = '';
    supplierPrice_makePaymentEdit.value = '';    
}
 function operateSupplierEdit(value, row, index) {
    return [
        '<div class="d-flex justify-content-center">',
        '<a class="" style="cursor: pointer;" onclick="DeleteSupplierEdit(\'' + index + '\')"  disabled>',
        '<span class="my-2 text-uppercase text-secondary" style="font-size: 13px;"><svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path></svg></span>',
        '</a>',
        '</div>'
    ].join('')
}
const DeleteSupplierEdit = index => {
    let data = $tableSupplierEdit.bootstrapTable('getData')
    data.splice(index, 1)
    $tableSupplierEdit.bootstrapTable('refreshOptions',{ data });
}
 const changeSupplierEdit = () => {
    const indexSupplier = infoSupplier.findIndex(element => parseInt(element.id_insumo) === parseInt(supplier_makePaymentEdit.value));
    supplierPrice_makePayment.readOnly = infoSupplier[indexSupplier].precio_bloqueado;
    supplierPrice_makePaymentEdit.value = infoSupplier[indexSupplier].precio;
}
/**************************************************[ EDITAR COBRO FIN ]*****************************************************************************/

/**************************************************[ PAGOS ANTICIPADOS ]*****************************************************************************/
/* Variables globales */
const $modalEarlySession = $('#modalEarlySession')

let infoApi = [];
let infoPatientEarly = [];
let currentTratamientEarly = [];
let currentServicesEarly = [];
let currentConsultationEarly = [];
let formActiveEarly = 0;
let currentPriceEarly = 0;
let currentBalanceEarly = 0;
let openCurrentView = '';
//Tablas
let $tableServicesEarlySession = $('#tableServicesEarlySession');
let $tablePaymentsEarlySession = $('#tablePaymentsEarlySession');
let $tableSupplierEarlySession = $('#tableSupplierEarlySession');
/* Variables globales fin */

/* Contenedores */
let container_holidayEarlySession = document.getElementById('container-holidayEarlySession');
let container_frecuencyCalendarEarlySession = document.getElementById('container-frecuencyCalendarEarlySession');
let container_dermaCalendarEarlySession = document.getElementById('container-dermaCalendarEarlySession');
let container_typeCalendarEarlySession = document.getElementById('container-typeCalendarEarlySession');
let container_cosmetoCalendarEarlySession = document.getElementById('container-cosmetoCalendarEarlySession');
let container_chanelCalendarEarlySession = document.getElementById('container-chanelCalendarEarlySession');
let container_tratamientCalendarEarlySession = document.getElementById('container-tratamientCalendarEarlySession');
let container_areaCalendarEarlySession = document.getElementById('container-areaCalendarEarlySession');
let container_amountEarlySession = document.getElementById('container-amountEarlySession');
let container_methodPayEarlySession = document.getElementById('container-methodPayEarlySession');
let container_bankEarlySession = document.getElementById('container-bankEarlySession');
let container_digitTarjetEarlySession = document.getElementById('container-digitTarjetEarlySession');
let container_costCalendarEarlySession = document.getElementById('container-costCalendarEarlySession');
let container_quantityEarlySession = document.getElementById('container-quantityEarlySession');
let container_suppliesEditEarlySession = document.getElementById('container-suppliesEditEarlySession');
let container_supplierEarlySession = document.getElementById('container-supplierEarlySession');
let container_supplierQuantityEarlySession = document.getElementById('container-supplierQuantityEarlySession');
let container_supplierPriceEarlySession = document.getElementById('container-supplierPriceEarlySession');
/* Contenedores fin */

/* Variables de formularios */
//Insumos
let supplierEarlySession = document.getElementById('supplierEarlySession');
let supplierQuantityEarlySession = document.getElementById('supplierQuantityEarlySession');
let supplierPriceEarlySession = document.getElementById('supplierPriceEarlySession');

//Informativo
let early_imgAvatar = document.getElementById('early-imgAvatar');
let early_infoAvatar = document.getElementById('early-infoAvatar');
let early_infoService = document.getElementById('early-infoService');
let shopeCalendarEarlySession = document.getElementById('shopeCalendarEarlySession');

//Informacion general
let patientCalendarEarlySession = document.getElementById('patientCalendarEarlySession');
let dateCalendarEarlySession = document.getElementById('dateCalendarEarlySession');
let holidayEarlySession = document.getElementById('holidayEarlySession');
let billingEarlySession = document.getElementById('billingEarlySession');

//Informacion del servicio
let label_quantityEarlySession = document.getElementById('label-quantityEarlySession');
let quantityEarlySession = document.getElementById('quantityEarlySession');
let label_costCalendarEarlySession = document.getElementById('label-costCalendarEarlySession');
let costCalendarEarlySession = document.getElementById('costCalendarEarlySession');
let priceServiceEarlySession = document.getElementById('priceServiceEarlySession');
let frecuencyCalendarEarlySession = document.getElementById('frecuencyCalendarEarlySession');
let dermaCalendarEarlySession = document.getElementById('dermaCalendarEarlySession');
let typeCalendarEarlySession = document.getElementById('typeCalendarEarlySession');
let cosmetoCalendarEarlySession = document.getElementById('cosmetoCalendarEarlySession');
let chanelCalendarEarlySession = document.getElementById('chanelCalendarEarlySession');
let tratamientCalendarEarlySession = document.getElementById('tratamientCalendarEarlySession');
let areaCalendarEarlySession = document.getElementById('areaCalendarEarlySession');

//Informacion de pagos
let priceTotalEarlySession = document.getElementById('priceTotalEarlySession');
let amountEarlySession = document.getElementById('amountEarlySession');
let methodPayEarlySession = document.getElementById('methodPayEarlySession');
let bankEarlySession = document.getElementById('bankEarlySession');
let digitTarjetEarlySession = document.getElementById('digitTarjetEarlySession');

//Totales
let subtotalEarlySession = document.getElementById('subtotalEarlySession');
let discountTotalEarlySession = document.getElementById('discountTotalEarlySession');
let totalEarlySession = document.getElementById('totalEarlySession');
let balanceEarlySession = document.getElementById('balanceEarlySession');
let observationEarlySession = document.getElementById('observationEarlySession');

//Checkeds categorias
let catRadiosEarlySession1 = document.getElementById('catRadiosEarlySession1');
let catRadiosEarlySession2 = document.getElementById('catRadiosEarlySession2');
let catRadiosEarlySession3 = document.getElementById('catRadiosEarlySession3');
let catRadiosEarlySession4 = document.getElementById('catRadiosEarlySession4');
let catRadiosEarlySession5 = document.getElementById('catRadiosEarlySession5');
let catRadiosEarlySession6 = document.getElementById('catRadiosEarlySession6');

/* Variables de formularios fin */

/* Apertura y cierre del modal */
const openModalEarlySession = (idPatient, namePatient, sexo, openCurrent) => {
    const clinic = JSON.parse(localStorage.getItem('clinic'));
    openCurrentView = openCurrent;
    container_supplies.style.display = 'none';    
    fetch(`${envEditAppoiment.rutes.back}${envEditAppoiment.controllers.payments}GetDataSupplies?idShope=${clinic.id}`)
    .then(response => response.json())
    .then(dataAppoiment => {
        //Inicializacion de variables
        const currentDate = moment().format('L').split('/');
        const { DataSupplies } = dataAppoiment;

        /* Informacion express del usuario */
        early_imgAvatar.src = sexo === 'H' ? `Content/Images/avatars/Patient(H).png` : sexo === 'M' ? `Content/Images/avatars/Patient(M).png` : `Content/Images/avatars/Patient(X).png`;
        early_infoAvatar.innerText = `${idPatient} - ${namePatient}`
        shopeCalendarEarlySession.innerText = clinic.name;
        /* Informacion express del usuario fin */


        /* Informacion general */
        patientCalendarEarlySession.value = namePatient;
        dateCalendarEarlySession.value = `${currentDate[2]}-${currentDate[1]}-${currentDate[0]}`;
        /* Informacion general fin */


        /* Inicializar tablas */
        $tableServicesEarlySession.bootstrapTable({ data: [] });
        $tablePaymentsEarlySession.bootstrapTable({ data: [] });
        $tableSupplierEarlySession.bootstrapTable({ data: [] });
        /* Inicializar tablas fin */


        /* Selects Servicio */
        DataSupplies[0].cosmetologist.map(({ id_usuario, nombre, apellido_paterno, apellido_materno }) => {
            let option = document.createElement('option')
            option.value = `${id_usuario}`
            option.label = `${nombre} ${apellido_paterno} ${apellido_materno}`
            cosmetoCalendarEarlySession.append(option)
        })
        DataSupplies[0].Type.map(({ id_tipo, nombre }) => {
            let option = document.createElement('option')
            option.value = `${id_tipo}`
            option.label = `${nombre}`
            typeCalendarEarlySession.append(option)
        })
        DataSupplies[0].frequency.map(({ id_frecuencia, nombre }) => {
            let option = document.createElement('option')
            option.value = `${id_frecuencia}`
            option.label = `${nombre}`
            frecuencyCalendarEarlySession.append(option)
        })
        DataSupplies[0].channel.map(({ id_canal, nombre }) => {
            let option = document.createElement('option')
            option.value = `${id_canal}`
            option.label = `${nombre}`
            chanelCalendarEarlySession.append(option)
        })
        DataSupplies[0].dermatologist.map(({ id_usuario, nombre, apellido_paterno, apellido_materno }) => {
            let option = document.createElement('option')
            option.value = `${id_usuario}`
            option.label = `${nombre} ${apellido_paterno} ${apellido_materno}`
            dermaCalendarEarlySession.append(option)
        })
        /* Selects Servicio fin */

        /* Selects Cobros */
        DataSupplies[0].TypePay.map(({ id_forma_pago, descripcion }) => {
            let option = document.createElement('option')
            option.value = `${id_forma_pago}`
            option.label = `${descripcion}`
            methodPayEarlySession.append(option)
        })
        DataSupplies[0].banks.map(({ id_bancos, nombre }) => {
            let option = document.createElement('option')
            option.value = `${id_bancos}`
            option.label = `${nombre}`
            bankEarlySession.append(option)
        })
        /* Selects Cobros fin */

        /* Select insumos */
        DataSupplies[0].supplies.map(({ id_insumo, nombre_insumo, precio }) => {
            let option = document.createElement('option')
            option.value = `${id_insumo}`
            option.label = `${nombre_insumo}`
            supplierEarlySession.append(option)
        })
        /* Select insumos */

        /* Globalizamos variables necesarias */
        infoApi = DataSupplies[0];
        infoPatientEarly = {
            id: idPatient,
            name: namePatient
        }
        /* Globalizamos variables necesarias fin */

        /* Ocultamos elementos necesarios */
        container_costCalendarEarlySession.className = 'd-none';
        container_holidayEarlySession.className = 'd-none';
        container_frecuencyCalendarEarlySession.className = 'd-none';
        container_dermaCalendarEarlySession.className = 'd-none';
        container_typeCalendarEarlySession.className = 'd-none';
        container_cosmetoCalendarEarlySession.className = 'd-none';
        container_chanelCalendarEarlySession.className = 'd-none';
        container_tratamientCalendarEarlySession.className = 'd-none';
        container_areaCalendarEarlySession.className = 'd-none';        
        container_bankEarlySession.className = 'd-none';
        container_digitTarjetEarlySession.className = 'd-none';
        container_quantityEarlySession.className = 'd-none';
        container_suppliesEditEarlySession.className = 'd-none';
        /* Ocultamos elementos necesarios fin */
        changeDermaAppoimentEarly();
        $('#modalEarlySession').modal('show');
    })
    .catch(error => Alert('error', error.message))
}

const closeModalEarlySession = () => {
    /* Ocultamos elementos necesarios */
    container_costCalendarEarlySession.className = 'd-none';
    container_holidayEarlySession.className = 'd-none';
    container_frecuencyCalendarEarlySession.className = 'd-none';
    container_dermaCalendarEarlySession.className = 'd-none';
    container_typeCalendarEarlySession.className = 'd-none';
    container_cosmetoCalendarEarlySession.className = 'd-none';
    container_chanelCalendarEarlySession.className = 'd-none';
    container_tratamientCalendarEarlySession.className = 'd-none';
    container_areaCalendarEarlySession.className = 'd-none';
    container_quantityEarlySession.className = 'd-none';
    container_suppliesEditEarlySession.className = 'd-none';
    container_suppliesEditEarlySession.className = 'd-none';
    container_suppliesEditEarlySession.className = 'd-none';
    container_bankEarlySession.className = 'd-none';
    container_digitTarjetEarlySession.className = 'd-none';
    /* Ocultamos elementos necesarios fin */


    /* Reseteamos formulario de servicio */
    early_infoService.innerText = '';
    costCalendarEarlySession.value = 0;
    priceServiceEarlySession.innerText = 0;
    subtotalEarlySession.innerText = 0;
    discountTotalEarlySession.innerText = 0;
    totalEarlySession.innerText = 0;
    balanceEarlySession.innerText = 0;
    holidayEarlySession.checked = false;
    frecuencyCalendarEarlySession.value = 1;
    dermaCalendarEarlySession.value = 9;
    typeCalendarEarlySession.value = '';
    cosmetoCalendarEarlySession.value = 2;
    chanelCalendarEarlySession.value = 1;
    tratamientCalendarEarlySession.value = '';
    areaCalendarEarlySession.value = '';
    quantityEarlySession.value = 1;

    /* Reseteamos formulario de cobros */
    priceTotalEarlySession.innerText = '0.00';
    currentBalanceEarly = 0;
    amountEarlySession.value = 0;
    bankEarlySession.value = 0;
    methodPayEarlySession.value = '';
    digitTarjetEarlySession.value = 0;

    $tableServicesEarlySession.bootstrapTable('destroy');
    $tablePaymentsEarlySession.bootstrapTable('destroy');
    $tableSupplierEarlySession.bootstrapTable('destroy');

    
    currentTratamientEarly = [];
    currentServicesEarly = [];
    
    /*Resetamos selects de servicio*/
    var options = document.querySelectorAll('#frecuencyCalendarEarlySession option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#dermaCalendarEarlySession option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#typeCalendarEarlySession option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#cosmetoCalendarEarlySession option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#chanelCalendarEarlySession option');
    options.forEach((o, index) => index !== 0 && o.remove());
    /*Resetamos selects de servicio fin*/

    /* Resetamos selects de cobros */
    var options = document.querySelectorAll('#methodPayEarlySession option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#bankEarlySession option');
    options.forEach((o, index) => index !== 0 && o.remove());
    /* Resetamos selects de cobros fin */



    var options = document.querySelectorAll('#tratamientCalendarEarlySession option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#areaCalendarEarlySession option');
    options.forEach((o, index) => index !== 0 && o.remove());
    /* Reseteamos formulario de servicio fin */

    formActiveEarly = 0;
    catRadiosEarlySession1.checked = false;
    catRadiosEarlySession2.checked = false;
    catRadiosEarlySession3.checked = false;
    catRadiosEarlySession4.checked = false;
    catRadiosEarlySession5.checked = false;
    catRadiosEarlySession6.checked = false;


    $('#modalEarlySession').modal('hide');
}

const saveEarlySession = () => {
    //Incializacion de variables
    const { id_usuario } = JSON.parse(localStorage.getItem('user'));
    const { id } = JSON.parse(localStorage.getItem('clinic'));
    let infoService = $tableServicesEarlySession.bootstrapTable('getData');
    let infoPayment = $tablePaymentsEarlySession.bootstrapTable('getData');
    let infoSupplies = $tableSupplierEarlySession.bootstrapTable('getData');

    const costTotal = infoService.reduce((acc, {total}) => acc + parseFloat(total), 0);

    //Validacion de formularios
    if (formActiveEarly === "" || formActiveEarly === 0) {
        Alert('warning', 'Tienes que seleccionar una categoria');
        return;
    }
    if(infoService.length === 0){
        Alert('warning', 'No tienes servicios registrados');
        return;
    }
    if(infoPayment.length === 0){
        Alert('warning', 'No tienes pagos registrados');
        return;
    }
    if((costTotal - currentBalanceEarly) < 0 || costTotal !== currentBalanceEarly){
        Alert('warning', 'El cobro no coincide con el total del servicio');
        return;
    }

    let EarlysSession = [];
    let pay = [];
    let Payments = [];
    let PaySupplie = [];
    let Package = {
        id_paciente: infoPatientEarly.id,
        observaciones: observationEarlySession.value,
        id_usuario,
        id_sucursal: id
    }
    infoService.map(service => {
        let Anticipado_Area = [];
        service.Citareas.map(({id_area}) => Anticipado_Area.push({ id_area_ant: id_area }))
        EarlysSession.push({
            id_paciente: infoPatientEarly.id,
            id_usuario,
            id_sucursal: 
            id, 
            fecha:  new Date(),
            observaciones: observationEarlySession.value,
            porcentaje: service.discount,
            descuento: service.discountMoney,
            id_categoria: service.id_categoria,
            total: parseFloat(service.total),
            id_derma: service.id_derma,
            id_cosme: service.id_cosme,
            id_tipo: service.id_tipo,
            id_canal: service.id_canal,
            id_servicio: service.id_servicio,
            id_frecuencia: service.id_frecuencia,
            sesion: service.num_sesion,
            no_paga: service.no_paga,
            Anticipado_Area
        });
    });
    infoPayment.map(infoPayment => {
        Payments.push({
            id_banco: infoPayment.bank,
            id_forma_pago: infoPayment.method,
            id_metodo_pago: 1,
            digitos: infoPayment.digit,
            cantidad: infoPayment.amount
        });
    });
    infoSupplies.map(supplies => {
        PaySupplie.push({
            id_insumo: supplies.supplier,
            precio: supplies.price,
            cantidad: supplies.quantity
        })
    })
    pay = {
        fecha:  new Date(),
        total :  costTotal,
        id_usuario : infoPatientEarly.id,
        festivo : holidayEarlySession.checked,
        factura : billingEarlySession.checked
    };    
    const json = {
        Prepaid: {
            Package,
            EarlysSession,
            pay,
            Payments,
            PaySupplie
        }
    }
    
    fetch(`${envEditAppoiment.rutes.back}${envEditAppoiment.controllers.payments}PostAarlySession`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
    })
    .then(response => response.json())
    .then(result => {

        const { Description } = result.Success[0]
        Alert('success', Description)
        if(openCurrentView === 'record') viewnPaymentsHist(2)
        closeModalEarlySession();
    })
    .catch(error => Alert('error', error.message))
}
/* Apertura y cierre del modal fin */

/* Operaciones de servicios */
const confirmationCategory = id => {
    if(formActiveEarly === '' || formActiveEarly === 0){
        changeCategoryEarly(id);
    }else{
        Confirmation('Si cambia de categoria no se conservara la información ingresada!')
        .then(response => {
            if(response) {
                changeCategoryEarly(id)
            }else{
                switch(formActiveEarly){
                    case 1:
                        catRadiosEarlySession1.checked = true;
                        break;
                    case 2:
                        catRadiosEarlySession2.checked = true;
                        break;
                    case 3:
                        catRadiosEarlySession3.checked = true;
                        break;
                    case 4: 
                        catRadiosEarlySession4.checked = true;
                        break;
                    case 5: 
                        catRadiosEarlySession5.checked = true;
                        break;
                    case 6:
                        catRadiosEarlySession6.checked = true;
                        break;
                }
            }
        })
    }
}
const changeCategoryEarly = id =>{
    /* Ocultamos elementos necesarios */
    container_costCalendarEarlySession.className = 'd-none';
    container_holidayEarlySession.className = 'd-none';
    container_frecuencyCalendarEarlySession.className = 'd-none';
    container_dermaCalendarEarlySession.className = 'd-none';
    container_typeCalendarEarlySession.className = 'd-none';
    container_cosmetoCalendarEarlySession.className = 'd-none';
    container_chanelCalendarEarlySession.className = 'd-none';
    container_tratamientCalendarEarlySession.className = 'd-none';
    container_areaCalendarEarlySession.className = 'd-none';
    container_quantityEarlySession.className = 'd-none';
    container_suppliesEditEarlySession.className = 'd-none';
    container_suppliesEditEarlySession.className = 'd-none';
    container_suppliesEditEarlySession.className = 'd-none';
    container_bankEarlySession.className = 'd-none';
    container_digitTarjetEarlySession.className = 'd-none';
    /* Ocultamos elementos necesarios fin */


    /* Reseteamos formulario de servicio */
    costCalendarEarlySession.value = 0;
    priceServiceEarlySession.innerText = 0;
    subtotalEarlySession.innerText = 0;
    discountTotalEarlySession.innerText = 0;
    totalEarlySession.innerText = 0;
    balanceEarlySession.innerText = 0;
    holidayEarlySession.checked = false;
    frecuencyCalendarEarlySession.value = 1;
    dermaCalendarEarlySession.value = 9;
    typeCalendarEarlySession.value = '';
    cosmetoCalendarEarlySession.value = 2;
    chanelCalendarEarlySession.value = 1;
    tratamientCalendarEarlySession.value = '';
    areaCalendarEarlySession.value = '';
    quantityEarlySession.value = 1;

    /* Reseteamos formulario de cobros */
    priceTotalEarlySession.innerText = '0.00';
    currentBalanceEarly = 0;
    amountEarlySession.value = 0;
    bankEarlySession.value = 0;
    methodPayEarlySession.value = '';
    digitTarjetEarlySession.value = 0;

    $tableServicesEarlySession.bootstrapTable('refreshOptions', {data: []});
    $tablePaymentsEarlySession.bootstrapTable('refreshOptions', {data: []});
    $tableSupplierEarlySession.bootstrapTable('refreshOptions', {data: []});

    
    currentTratamientEarly = [];
    currentServicesEarly = [];
    
    var options = document.querySelectorAll('#tratamientCalendarEarlySession option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#areaCalendarEarlySession option');
    options.forEach((o, index) => index !== 0 && o.remove());
    /* Reseteamos formulario de servicio fin */

    changeDermaAppoimentEarly();
    
    
    const { Category } = infoApi;
    let indexCat = false;

    switch(id){
        //Consulta
        case 1:
            //inicializamos variables
            early_infoService.innerText = 'Consulta';
            indexCat = Category.findIndex(element => element.idCategoria === id);
            const { Precio } = Category[indexCat].Servicio[0].area[0];
            currentServicesEarly = Category[indexCat];
            currentConsultationEarly = Category[indexCat].Servicio[0];

            // Activamos formulario
            container_holidayEarlySession.className = 'd-flex flex-column align-items-center ms-4';
            container_frecuencyCalendarEarlySession.className = 'd-inline m-1';
            container_dermaCalendarEarlySession.className = 'd-inline m-1';
            container_chanelCalendarEarlySession.className = 'd-inline m-1';
            container_quantityEarlySession.className = 'd-inline m-1';

            
            //precio
            priceServiceEarlySession.innerHTML = `${Precio.toLocaleString("en", {
                minimumFractionDigits: 2,
            })}`;

            formActiveEarly = 1;
            break;
        //Facial
        case 2:
            //inicializamos variables
            early_infoService.innerText = 'Facial';
            indexCat = Category.findIndex(element => element.idCategoria === id);
            currentTratamientEarly = Category[indexCat];

            // Activamos formulario
            container_frecuencyCalendarEarlySession.className = 'd-inline m-1';
            container_dermaCalendarEarlySession.className = 'd-inline m-1';
            container_cosmetoCalendarEarlySession.className = 'd-inline m-1';
            container_chanelCalendarEarlySession.className = 'd-inline m-1';
            container_tratamientCalendarEarlySession.className = 'd-inline m-1';
            container_typeCalendarEarlySession.className = 'd-inline m-1';
            container_quantityEarlySession.className = 'd-inline m-1';

            //Activamos el select
            Category[indexCat].Servicio.map(({ idServicio, servicios }) => {
                let option = document.createElement('option')
                option.value = `${idServicio}`
                option.label = `${servicios}`
                tratamientCalendarEarlySession.append(option)
            })
            
            formActiveEarly = 2;
            break;
        //Aparatología
        case 3:
            //inicializamos variables
            early_infoService.innerText = 'Aparatología';
            indexCat = Category.findIndex(element => element.idCategoria === id);
            currentTratamientEarly = Category[indexCat];

            // Activamos formulario
            container_frecuencyCalendarEarlySession.className = 'd-inline m-1';
            container_dermaCalendarEarlySession.className = 'd-inline m-1';
            container_cosmetoCalendarEarlySession.className = 'd-inline m-1';
            container_chanelCalendarEarlySession.className = 'd-inline m-1';
            container_tratamientCalendarEarlySession.className = 'd-inline m-1';
            container_typeCalendarEarlySession.className = 'd-inline m-1';
            container_quantityEarlySession.className = 'd-inline m-1';

            //Activamos el select
            Category[indexCat].Servicio.map(({ idServicio, servicios }) => {
                let option = document.createElement('option')
                option.value = `${idServicio}`
                option.label = `${servicios}`
                tratamientCalendarEarlySession.append(option)
            })
            
            formActiveEarly = 3;
            break;
        //Dermapen
        case 4:
            //inicializamos variables
            early_infoService.innerText = 'Dermapen';
            indexCat = Category.findIndex(element => element.idCategoria === id);
            currentTratamientEarly = Category[indexCat];
            currentConsultationEarly = Category[indexCat].Servicio[0];
            // Activamos formulario
            container_frecuencyCalendarEarlySession.className = 'd-inline m-1';
            container_dermaCalendarEarlySession.className = 'd-inline m-1';
            container_cosmetoCalendarEarlySession.className = 'd-inline m-1';
            container_chanelCalendarEarlySession.className = 'd-inline m-1';
            container_tratamientCalendarEarlySession.className = 'd-inline m-1';
            container_typeCalendarEarlySession.className = 'd-inline m-1';
            container_costCalendarEarlySession.className = 'd-inline m-1';
            label_costCalendarEarlySession.innerHTML = 'Total dermapen';
            container_quantityEarlySession.className = 'd-inline m-1';
            
            let firstOption = '';
            //Activamos el select
            Category[indexCat].Servicio.map(({ idServicio, servicios },index) => {
                let option = document.createElement('option')
                option.value = `${idServicio}`
                option.label = `${servicios}`
                tratamientCalendarEarlySession.append(option)
                if(index === 0) firstOption = `${idServicio}`
            })

            tratamientCalendarEarlySession.value = firstOption;

            formActiveEarly = 4;
            break;
        //Curacion
        case 5: 
            //inicializamos variables
            early_infoService.innerText = 'Curación';
            indexCat = Category.findIndex(element => element.idCategoria === id);
            currentTratamientEarly = Category[indexCat];
            currentConsultationEarly = Category[indexCat].Servicio[0];

            // Activamos formulario
            container_frecuencyCalendarEarlySession.className = 'd-inline m-1';
            container_dermaCalendarEarlySession.className = 'd-inline m-1';
            container_chanelCalendarEarlySession.className = 'd-inline m-1';
            container_costCalendarEarlySession.className = 'd-inline m-1';
            container_quantityEarlySession.className = 'd-inline m-1';
            container_suppliesEditEarlySession.className = 'd-inline';
            label_costCalendarEarlySession.innerHTML = 'Total curación';
        
            

            formActiveEarly = 5;
            break;
        //Estetica
        case 6:
            //inicializamos variables
            early_infoService.innerText = 'Estética';
            indexCat = Category.findIndex(element => element.idCategoria === id);
            currentTratamientEarly = Category[indexCat];
            currentConsultationEarly = Category[indexCat].Servicio[0];

            // Activamos formulario
            container_frecuencyCalendarEarlySession.className = 'd-inline m-1';
            container_dermaCalendarEarlySession.className = 'd-inline m-1';
            container_cosmetoCalendarEarlySession.className = 'd-inline m-1';
            container_chanelCalendarEarlySession.className = 'd-inline m-1';
            container_tratamientCalendarEarlySession.className = 'd-inline m-1';
            container_typeCalendarEarlySession.className = 'd-inline m-1';
            container_costCalendarEarlySession.className = 'd-inline m-1';
            container_quantityEarlySession.className = 'd-inline m-1';
            container_suppliesEditEarlySession.className = 'd-inline';
            label_costCalendarEarlySession.innerHTML = 'Total estética';
          
            //Activamos el select
            Category[indexCat].Servicio.map(({ idServicio, servicios }) => {
                let option = document.createElement('option')
                option.value = `${idServicio}`
                option.label = `${servicios}`
                tratamientCalendarEarlySession.append(option)
            })

            formActiveEarly = 6;
            break;
    }
}
const changeTratamientEarly = () => {
    var options = document.querySelectorAll('#areaCalendarEarlySession option');
    options.forEach((o, index) => index !== 0 && o.remove());
    areaCalendarEarlySession.value = '';
    costCalendarEarlySession.value = '';
    priceServiceEarlySession.innerHTML = 0;
    currentPriceEarly = 0;
    const { Servicio, idCategoria } = currentTratamientEarly
    if (idCategoria === 4 || idCategoria === 6) return;
    const indexServices = Servicio.findIndex(element => element.idServicio === parseInt(tratamientCalendarEarlySession.value))
    const { idServicio } = Servicio[indexServices]
    if (idServicio === 23) {
        container_areaCalendarEarlySession.className = 'd-none';
        container_areaCalendarEarlySession.className = 'd-none';
        container_costCalendarEarlySession.style.display = 'inline';
        return
    } else if (idCategoria === 3) {
        container_costCalendarEarlySession.className = 'd-none'
    }
    let data = [];
    $('#areaCalendarEarlySession').select2("destroy")
    Servicio[indexServices].area.map(({ Precio, area, idarea }) => {
        data.push({ id: `${idarea}-${Precio}`, text: area})
        //let option = document.createElement('option')
        //option.value = `${idarea}-${Precio}`
        //option.label = `${area}`
        //areaCalendar.append(option)
    })
    $('#areaCalendarEarlySession').select2({
        dropdownParent: $('#modalEarlySession'),
        placeholder: 'Selecciona el/las area',
        language: "es",
        data
    });    
    container_areaCalendarEarlySession.className = 'd-inline';
    container_areaCalendarEarlySession.className = 'd-flex flex-column m-1';
}
const changeAreaEarly = () => {
    let currenPriceSelect = 0;

    $("#areaCalendarEarlySession").val().map(element => currenPriceSelect += parseInt(element.split("-")[1]))
    currentPriceEarly = currenPriceSelect;
    priceServiceEarlySession.innerText = `${currentPriceEarly.toLocaleString("en", {
        minimumFractionDigits: 2,
    })}`;
}
const changeCostEarly = () => {
    const Price = parseFloat(costCalendarEarlySession.value)
    priceServiceEarlySession.innerHTML = Price.toLocaleString("en", {
        minimumFractionDigits: 2,
    });
}
const changeHoliDayEarly = () => {
    if(holidayEarlySession.checked){
        let indexFestivo = currentServicesEarly.Servicio.findIndex(element => element.servicios === 'FESTIVO');
        costCalendarEarlySession.value = currentServicesEarly.Servicio[indexFestivo].area[0].Precio
        priceServiceEarlySession.innerText = parseFloat(currentServicesEarly.Servicio[indexFestivo].area[0].Precio).toLocaleString("en", {
            minimumFractionDigits: 2,
        })
        currentConsultationEarly =  currentServicesEarly.Servicio[indexFestivo];
    }else{
        let indexNormal = currentServicesEarly.Servicio.findIndex(element => element.servicios === 'NORMAL');
        costCalendarEarlySession.value = currentServicesEarly.Servicio[indexNormal].area[0].Precio
        priceServiceEarlySession.innerText = parseFloat(currentServicesEarly.Servicio[indexNormal].area[0].Precio).toLocaleString("en", {
            minimumFractionDigits: 2,
        })
        currentConsultationEarly =  currentServicesEarly.Servicio[indexNormal];
    }
}
const changeDermaAppoimentEarly = () => {
    const { Type } = infoApi;
    
    var options = document.querySelectorAll('#typeCalendarEarlySession option');
    options.forEach((o, index) => index !== 0 && o.remove());
    typeCalendarEarlySession.value = "";
    
    if(parseInt(dermaCalendarEarlySession.value) === 9){
        Type.map(({ id_tipo, nombre }, index) => {
            if(index === 0){
                let option = document.createElement('option')
                option.value = `${id_tipo}`
                option.label = `${nombre}`            
                typeCalendarEarlySession.append(option)
            }
        })
    } else {
        Type.map(({ id_tipo, nombre }, index) => {
            if(index !== 0){
                let option = document.createElement('option')
                option.value = `${id_tipo}`
                option.label = `${nombre}`            
                typeCalendarEarlySession.append(option)
            }
        })
    }
}
const addServicesEarly = () => {
    //Inicializamos variables
    const { id_usuario } = JSON.parse(localStorage.getItem('user'));
    const { id } = JSON.parse(localStorage.getItem('clinic'));
    let infoData = $tableServicesEarlySession.bootstrapTable('getData');
    let data = [];
    let jsonData = [];
    const pathname = window.location.pathname
    let error = 0;
    const { Servicio } = currentTratamientEarly;
    let indexService = -1;
    let Citareas = []
    let currenPriceSelect = 0;
    let currentTotalServices = 0;
    let currentPriceServices = 0;
    let currentDiscountServices = 0;


    //Validaciones generales
    if (formActiveEarly === "" || formActiveEarly === 0) {
        Alert('warning', 'Tienes que seleccionar una categoria');
        return;
    }

    if(quantityEarlySession.value < 1){
        Alert('warning', 'Debes agregar una cantidad de sesiones valida');
        return;
    }
    //armamos los json para la tabla y almacenarlo
    switch(formActiveEarly) {
        //Consulta
        case 1:
            //Validaciones generales
            if (frecuencyCalendarEarlySession.value === '') {
                frecuencyCalendarEarlySession.className = 'form-control is-invalid';
                error++;
            }
            if (dermaCalendarEarlySession.value === '') {
                dermaCalendarEarlySession.className = 'form-control is-invalid';
                error++;
            }
            if (chanelCalendarEarlySession.value === '') {
                chanelCalendarEarlySession.className = 'form-control is-invalid';
                error++;
            }

            if (error > 0) return

            //Inicializacion de variables
            currentTotalServices = 0;
            jsonData = {
                id_paciente: infoPatientEarly.id,
                id_participantes: id_usuario,
                id_sucursal: id,
                id_categoria: formActiveEarly,
                categoria_name: currentServicesEarly.Categoria,
                precio: parseFloat(currentConsultationEarly.area[0].Precio).toFixed(2),
                total: parseFloat(currentConsultationEarly.area[0].Precio).toFixed(2),
                id_tipo: null,
                id_canal: chanelCalendarEarlySession.value,
                id_frecuencia: frecuencyCalendarEarlySession.value,
                fecha: dateCalendarEarlySession.value,
                id_servicio: currentConsultationEarly.idServicio,
                servicio_name: currentConsultationEarly.servicios,
                id_derma: dermaCalendarEarlySession.value, 
                id_cosme: 2,
                num_sesion: 0,        
                discount: 0,               
                discountMoney: 0, 
                no_paga: false,              
                Citareas: [
                    { id_area: currentConsultationEarly.area[0].idarea }
                ],
            };

            //Creamos las sesiones de acuerdo al numero ingresado
            for(let i = 0; i < parseInt(quantityEarlySession.value); i++) infoData.push(jsonData);

            //sacamos el total de los servicios y obtenemos la numeracion de sesiones
            infoData.map((service,index) => {
                currentTotalServices += parseFloat(service.total)
                currentPriceServices += parseFloat(service.precio)
                currentDiscountServices += parseFloat(service.discountMoney)
                data.push({...service, num_sesion: (index + 1)})
            })

            //Asignacion del total y actualizamos la tabla de servicios
            priceTotalEarlySession.innerText = currentTotalServices.toLocaleString("en", {
                minimumFractionDigits: 2,
            })
            subtotalEarlySession.innerText = currentPriceServices.toLocaleString("en", {
                minimumFractionDigits: 2,
            })
            discountTotalEarlySession.innerText = currentDiscountServices.toLocaleString("en", {
                minimumFractionDigits: 2,
            })
            totalEarlySession.innerText = currentTotalServices.toLocaleString("en", {
                minimumFractionDigits: 2,
            })
            balanceEarlySession.innerText = (currentTotalServices - currentBalanceEarly).toLocaleString("en", {
                minimumFractionDigits: 2,
            })
            amountEarlySession.value = (currentTotalServices - currentBalanceEarly);
            quantityEarlySession.value = 1;
            $tableServicesEarlySession.bootstrapTable('refreshOptions',{data});
            break;
        //Facial
        case 2:
            //Validaciones generales
            if (frecuencyCalendarEarlySession.value === '') {
                frecuencyCalendarEarlySession.className = 'form-control is-invalid';
                error++;
            }
            if (dermaCalendarEarlySession.value === '') {
                dermaCalendarEarlySession.className = 'form-control is-invalid';
                error++;
            }
            if (chanelCalendarEarlySession.value === '') {
                chanelCalendarEarlySession.className = 'form-control is-invalid';
                error++;
            }
            if (tratamientCalendarEarlySession.value === '') {
                tratamientCalendarEarlySession.className = 'form-control is-invalid';
                error++;
            }
            if (areaCalendarEarlySession.value === '') {
                Alert('warning','El area no puede ser vacia')
                error++;
            }

            if (error > 0) return
            //Inicializacion de variables
            indexService = Servicio.findIndex(element => element.idServicio === parseInt(tratamientCalendarEarlySession.value))
            Citareas = []
            currenPriceSelect = 0;
            currentTotalServices = 0;
            $("#areaCalendarEarlySession").val().map(element => {
                currenPriceSelect += parseInt(element.split("-")[1])
                Citareas.push({ id_area: element.split("-")[0] })
            });                    
            jsonData = {
                id_paciente: infoPatientEarly.id,
                id_participantes: id_usuario,
                id_sucursal: id,
                id_categoria: formActiveEarly,
                categoria_name: currentTratamientEarly.Categoria,
                precio: currenPriceSelect,
                total: currenPriceSelect,
                id_canal: chanelCalendarEarlySession.value,
                id_frecuencia: frecuencyCalendarEarlySession.value,
                id_servicio: tratamientCalendarEarlySession.value,     
                servicio_name: Servicio[indexService].servicios,
                id_derma: dermaCalendarEarlySession.value,
                id_cosme: cosmetoCalendarEarlySession.value,
                id_tipo: typeCalendarEarlySession.value,
                num_sesion: 0,        
                discount: 0,               
                discountMoney: 0,
                no_paga: false,              
                Citareas
            };     

            //Creamos las sesiones de acuerdo al numero ingresado
            for(let i = 0; i < parseInt(quantityEarlySession.value); i++) infoData.push(jsonData);

            //sacamos el total de los servicios y obtenemos la numeracion de sesiones
            infoData.map((service,index) => {                
                currentTotalServices += parseFloat(service.total)
                currentPriceServices += parseFloat(service.precio)
                currentDiscountServices += parseFloat(service.discountMoney)
                data.push({...service, num_sesion: (index + 1)})
            })

            //Asignacion del total y actualizamos la tabla de servicios
            priceTotalEarlySession.innerText = currentTotalServices.toLocaleString("en", {
                minimumFractionDigits: 2,
            })
            subtotalEarlySession.innerText = currentPriceServices.toLocaleString("en", {
                minimumFractionDigits: 2,
            })
            discountTotalEarlySession.innerText = currentDiscountServices.toLocaleString("en", {
                minimumFractionDigits: 2,
            })
            totalEarlySession.innerText = currentTotalServices.toLocaleString("en", {
                minimumFractionDigits: 2,
            })
            balanceEarlySession.innerText = (currentTotalServices - currentBalanceEarly).toLocaleString("en", {
                minimumFractionDigits: 2,
            })
            amountEarlySession.value = (currentTotalServices - currentBalanceEarly);
            quantityEarlySession.value = 1;
            $tableServicesEarlySession.bootstrapTable('refreshOptions',{data});              
            break;
        //Aparatología
        case 3:
            //Validaciones generales
            if (frecuencyCalendarEarlySession.value === '') {
                frecuencyCalendarEarlySession.className = 'form-control is-invalid';
                error++;
            }
            if (dermaCalendarEarlySession.value === '') {
                dermaCalendarEarlySession.className = 'form-control is-invalid';
                error++;
            }
            if (chanelCalendarEarlySession.value === '') {
                chanelCalendarEarlySession.className = 'form-control is-invalid';
                error++;
            }
            if (tratamientCalendarEarlySession.value === '') {
                tratamientCalendarEarlySession.className = 'form-control is-invalid';
                error++;
            }
            if (areaCalendarEarlySession.value === '') {
                Alert('warning','El area no puede ser vacia')
                error++;
            }

            if (error > 0) return
            //Inicializacion de variables
            indexService = Servicio.findIndex(element => element.idServicio === parseInt(tratamientCalendarEarlySession.value))
            Citareas = []
            currenPriceSelect = 0;
            currentTotalServices = 0;
            $("#areaCalendarEarlySession").val().map(element => {
                currenPriceSelect += parseInt(element.split("-")[1])
                Citareas.push({ id_area: element.split("-")[0] })
            });                    
            jsonData = {
                id_paciente: infoPatientEarly.id,
                id_participantes: id_usuario,
                id_sucursal: id,
                id_categoria: formActiveEarly,
                categoria_name: currentTratamientEarly.Categoria,
                precio: currenPriceSelect,
                total: currenPriceSelect,
                id_canal: chanelCalendarEarlySession.value,
                id_frecuencia: frecuencyCalendarEarlySession.value,
                id_servicio: tratamientCalendarEarlySession.value,     
                servicio_name: Servicio[indexService].servicios,
                id_derma: dermaCalendarEarlySession.value,
                id_cosme: cosmetoCalendarEarlySession.value,
                id_tipo: typeCalendarEarlySession.value,
                num_sesion: 0,        
                discount: 0,               
                discountMoney: 0, 
                no_paga: false,              
                Citareas
            };  

            //Creamos las sesiones de acuerdo al numero ingresado
            for(let i = 0; i < parseInt(quantityEarlySession.value); i++) infoData.push(jsonData);

            //sacamos el total de los servicios y obtenemos la numeracion de sesiones
            infoData.map((service,index) => {                
                currentTotalServices += parseFloat(service.total)
                currentPriceServices += parseFloat(service.precio)
                currentDiscountServices += parseFloat(service.discountMoney)
                data.push({...service, num_sesion: (index + 1)})
            })

            //Asignacion del total y actualizamos la tabla de servicios
            priceTotalEarlySession.innerText = currentTotalServices.toLocaleString("en", {
                minimumFractionDigits: 2,
            })
            subtotalEarlySession.innerText = currentPriceServices.toLocaleString("en", {
                minimumFractionDigits: 2,
            })
            discountTotalEarlySession.innerText = currentDiscountServices.toLocaleString("en", {
                minimumFractionDigits: 2,
            })
            totalEarlySession.innerText = currentTotalServices.toLocaleString("en", {
                minimumFractionDigits: 2,
            })
            balanceEarlySession.innerText = (currentTotalServices - currentBalanceEarly).toLocaleString("en", {
                minimumFractionDigits: 2,
            })
            amountEarlySession.value = (currentTotalServices - currentBalanceEarly);
            quantityEarlySession.value = 1;
            $tableServicesEarlySession.bootstrapTable('refreshOptions',{data});      
            break;
        //Dermapen
        case 4:
            //Validaciones generales
            if (frecuencyCalendarEarlySession.value === '') {
                frecuencyCalendarEarlySession.className = 'form-control is-invalid';
                error++;
            }
            if (dermaCalendarEarlySession.value === '') {
                dermaCalendarEarlySession.className = 'form-control is-invalid';
                error++;
            }
            if (chanelCalendarEarlySession.value === '') {
                chanelCalendarEarlySession.className = 'form-control is-invalid';
                error++;
            }
            if (tratamientCalendarEarlySession.value === '') {
                tratamientCalendarEarlySession.className = 'form-control is-invalid';
                error++;
            }
            if (costCalendarEarlySession.value === '') {
                costCalendarEarlySession.className = 'form-control is-invalid';
                error++;
            }
            if (error > 0) return
            //Inicializacion de variables
            indexService = Servicio.findIndex(element => element.idServicio === parseInt(tratamientCalendarEarlySession.value))

            jsonData = {
                id_paciente: infoPatientEarly.id,
                id_participantes: id_usuario,
                id_sucursal: id,
                id_categoria: formActiveEarly,
                categoria_name: currentTratamientEarly.Categoria,
                precio: costCalendarEarlySession.value,
                total: costCalendarEarlySession.value,
                id_canal: chanelCalendarEarlySession.value,
                id_frecuencia: frecuencyCalendarEarlySession.value,
                id_servicio: currentConsultationEarly.idServicio,                
                servicio_name: Servicio[indexService].servicios,
                id_derma: dermaCalendarEarlySession.value,
                id_cosme: cosmetoCalendarEarlySession.value,
                id_tipo: typeCalendarEarlySession.value,
                num_sesion: 0,        
                discount: 0,               
                discountMoney: 0,
                no_paga: false,              
                Citareas: [
                    {
                        id_area: 53
                    }
                ]
            }
            
            //Creamos las sesiones de acuerdo al numero ingresado
            for(let i = 0; i < parseInt(quantityEarlySession.value); i++) infoData.push(jsonData);

            //sacamos el total de los servicios y obtenemos la numeracion de sesiones
            infoData.map((service,index) => {                
                currentTotalServices += parseFloat(service.total)
                currentPriceServices += parseFloat(service.precio)
                currentDiscountServices += parseFloat(service.discountMoney)
                data.push({...service, num_sesion: (index + 1)})
            })

            //Asignacion del total y actualizamos la tabla de servicios
            priceTotalEarlySession.innerText = currentTotalServices.toLocaleString("en", {
                minimumFractionDigits: 2,
            })
            subtotalEarlySession.innerText = currentPriceServices.toLocaleString("en", {
                minimumFractionDigits: 2,
            })
            discountTotalEarlySession.innerText = currentDiscountServices.toLocaleString("en", {
                minimumFractionDigits: 2,
            })
            totalEarlySession.innerText = currentTotalServices.toLocaleString("en", {
                minimumFractionDigits: 2,
            })
            balanceEarlySession.innerText = (currentTotalServices - currentBalanceEarly).toLocaleString("en", {
                minimumFractionDigits: 2,
            })
            amountEarlySession.value = (currentTotalServices - currentBalanceEarly);
            quantityEarlySession.value = 1;
            $tableServicesEarlySession.bootstrapTable('refreshOptions',{data});      
            break;
        //Curación
        case 5:
            //Validaciones generales
            if (frecuencyCalendarEarlySession.value === '') {
                frecuencyCalendarEarlySession.className = 'form-control is-invalid';
                error++;
            }
            if (dermaCalendarEarlySession.value === '') {
                dermaCalendarEarlySession.className = 'form-control is-invalid';
                error++;
            }
            if (chanelCalendarEarlySession.value === '') {
                chanelCalendarEarlySession.className = 'form-control is-invalid';
                error++;
            }
            if (costCalendarEarlySession.value === '') {
                costCalendarEarlySession.className = 'form-control is-invalid';
                error++;
            }
    
            if (error > 0) return
            
            //Inicializacion de variables
            indexService = Servicio.findIndex(element => element.idServicio === parseInt(tratamientCalendarEarlySession.value))
            jsonData = {
                id_paciente: infoPatientEarly.id,
                id_participantes: id_usuario,
                id_sucursal: id,
                id_categoria: formActiveEarly,
                categoria_name: currentTratamientEarly.Categoria,
                precio: costCalendarEarlySession.value,
                total: costCalendarEarlySession.value,
                id_canal: chanelCalendarEarlySession.value,
                id_frecuencia: frecuencyCalendarEarlySession.value,
                id_servicio: currentConsultationEarly.idServicio,
                servicio_name: currentConsultationEarly.servicios,
                id_derma: dermaCalendarEarlySession.value,
                id_cosme: 2,
                num_sesion: 0,        
                discount: 0,               
                discountMoney: 0, 
                no_paga: false,              
                Citareas: [
                    {
                        id_area: 53
                    }
                ]
            }

            //Creamos las sesiones de acuerdo al numero ingresado
            for(let i = 0; i < parseInt(quantityEarlySession.value); i++) infoData.push(jsonData);

            //sacamos el total de los servicios y obtenemos la numeracion de sesiones
            infoData.map((service,index) => {                
                currentTotalServices += parseFloat(service.total)
                currentPriceServices += parseFloat(service.precio)
                currentDiscountServices += parseFloat(service.discountMoney)
                data.push({...service, num_sesion: (index + 1)})
            })

            //Asignacion del total y actualizamos la tabla de servicios
            priceTotalEarlySession.innerText = currentTotalServices.toLocaleString("en", {
                minimumFractionDigits: 2,
            })
            subtotalEarlySession.innerText = currentPriceServices.toLocaleString("en", {
                minimumFractionDigits: 2,
            })
            discountTotalEarlySession.innerText = currentDiscountServices.toLocaleString("en", {
                minimumFractionDigits: 2,
            })
            totalEarlySession.innerText = currentTotalServices.toLocaleString("en", {
                minimumFractionDigits: 2,
            })
            balanceEarlySession.innerText = (currentTotalServices - currentBalanceEarly).toLocaleString("en", {
                minimumFractionDigits: 2,
            })
            amountEarlySession.value = (currentTotalServices - currentBalanceEarly);
            quantityEarlySession.value = 1;
            $tableServicesEarlySession.bootstrapTable('refreshOptions',{data});      
            break;
        //Estética
        case 6:
            //Validaciones generales
            if (frecuencyCalendarEarlySession.value === '') {
                frecuencyCalendarEarlySession.className = 'form-control is-invalid';
                error++;
            }
            if (dermaCalendarEarlySession.value === '') {
                dermaCalendarEarlySession.className = 'form-control is-invalid';
                error++;
            }
            if (chanelCalendarEarlySession.value === '') {
                chanelCalendarEarlySession.className = 'form-control is-invalid';
                error++;
            }
            if (tratamientCalendarEarlySession.value === '') {
                tratamientCalendarEarlySession.className = 'form-control is-invalid';
                error++;
            }
            if (costCalendarEarlySession.value === '') {
                costCalendarEarlySession.className = 'form-control is-invalid';
                error++;
            }
            if (error > 0) return
            //Inicializacion de variables
            indexService = Servicio.findIndex(element => element.idServicio === parseInt(tratamientCalendarEarlySession.value))
            jsonData = {
                id_paciente: infoPatientEarly.id,
                id_participantes: id_usuario,
                id_sucursal: id,
                id_categoria: formActiveEarly,
                categoria_name: currentTratamientEarly.Categoria,
                precio: costCalendarEarlySession.value,
                total: costCalendarEarlySession.value,
                id_canal: chanelCalendarEarlySession.value,
                id_frecuencia: frecuencyCalendarEarlySession.value,
                id_servicio: currentConsultationEarly.idServicio,                
                servicio_name: Servicio[indexService].servicios,
                id_derma: dermaCalendarEarlySession.value,
                id_cosme: cosmetoCalendarEarlySession.value,
                id_tipo: typeCalendarEarlySession.value,
                num_sesion: 0,        
                discount: 0,               
                discountMoney: 0, 
                no_paga: false,              
                Citareas: [
                    {
                        id_area: 53
                    }
                ]
            }
            
            //Creamos las sesiones de acuerdo al numero ingresado
            for(let i = 0; i < parseInt(quantityEarlySession.value); i++) infoData.push(jsonData);

            //sacamos el total de los servicios y obtenemos la numeracion de sesiones
            infoData.map((service,index) => {                
                currentTotalServices += parseFloat(service.total)
                currentPriceServices += parseFloat(service.precio)
                currentDiscountServices += parseFloat(service.discountMoney)
                data.push({...service, num_sesion: (index + 1)})
            })

            //Asignacion del total y actualizamos la tabla de servicios
            priceTotalEarlySession.innerText = currentTotalServices.toLocaleString("en", {
                minimumFractionDigits: 2,
            })
            subtotalEarlySession.innerText = currentPriceServices.toLocaleString("en", {
                minimumFractionDigits: 2,
            })
            discountTotalEarlySession.innerText = currentDiscountServices.toLocaleString("en", {
                minimumFractionDigits: 2,
            })
            totalEarlySession.innerText = currentTotalServices.toLocaleString("en", {
                minimumFractionDigits: 2,
            })
            balanceEarlySession.innerText = (currentTotalServices - currentBalanceEarly).toLocaleString("en", {
                minimumFractionDigits: 2,
            })
            amountEarlySession.value = (currentTotalServices - currentBalanceEarly);
            quantityEarlySession.value = 1;
            $tableServicesEarlySession.bootstrapTable('refreshOptions',{data});      
            break;
    }
}
function operateDiscountEarly(value, row, index) {  
    return [
        `<div class="d-flex justify-content-center">
            <input id="discount-${index}" placeholder="0.00" type="number" onchange="changeDiscountEarly(${index})"  style="width: 5rem;" />
        </div>`
    ].join('')
}
function operateNoPaymentEarly(value, row, index) {
    const { no_paga } = row;
    return [
        `<div class="checkbox-wrapper-12 m-2">
        <div class="cbx">
            <input id="noPaymentEarlySession" type="checkbox" onchange="checkPayment(${index},${no_paga})" ${no_paga ? 'checked' : ''}>
            <label for="noPaymentEarlySession"></label>
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
    </div>`
    ].join('')
}
const checkPayment = (index,no_paga) =>{
    $tableServicesEarlySession.bootstrapTable('updateRow', {
        index,
        row: {
            no_paga: !no_paga
        }
      });
}
const changeDiscountEarly = indexRow => {
    //Inicializamos variables
    let infoData = $tableServicesEarlySession.bootstrapTable('getData');

    //Validamos si tiene algun cobro agregado
    if($tablePaymentsEarlySession.bootstrapTable('getData').length > 0){
        Alert('warning','No puedes hacer modificaciones con formas de pago agregadas');
        document.getElementById(`discount-${indexRow}`).value = '';
        return;
    }   

    const discount = parseFloat(document.getElementById(`discount-${indexRow}`).value);
    
    //Hacemos validaciones del descuento
    if(discount < 0 || discount > 100){
        Alert('warning','El porcentaje es invalido');
        document.getElementById(`discount-${indexRow}`).value = "";
        return;
    }

    //calculamos el descuento
    const discountMoney = ((parseFloat(infoData[indexRow].precio)*parseFloat(discount))/100);

    //Acutalizamos la fila modificada
    $tableServicesEarlySession.bootstrapTable('updateRow', {
        index: indexRow,
        row: {
          ...infoData[indexRow],
          discount,
          discountMoney: parseFloat(discountMoney).toFixed(2),
          total: (parseFloat(infoData[indexRow].precio)-parseFloat(discountMoney)).toFixed(2)
        }
    })
    
    //Data actualizada
    infoData = $tableServicesEarlySession.bootstrapTable('getData');
    
    //Actualizamos precio total de todos los servicios
    const newTotal = infoData.reduce((acc, {total}) => acc + parseFloat(total), 0);
    const newDiscount = infoData.reduce((acc, {discountMoney}) => acc + parseFloat(discountMoney), 0);
    priceTotalEarlySession.innerText = newTotal.toLocaleString("en", {
        minimumFractionDigits: 2,
    });
    discountTotalEarlySession.innerText = newDiscount.toLocaleString("en", {
        minimumFractionDigits: 2,
    });
    totalEarlySession.innerText = newTotal.toLocaleString("en", {
        minimumFractionDigits: 2,
    });
    balanceEarlySession.innerText = (newTotal - currentBalanceEarly).toLocaleString("en", {
        minimumFractionDigits: 2,
    });
    amountEarlySession.value = (newTotal - currentBalanceEarly);
}
const RemoveServiceEarly = indexRow => {    
    //Inicializamos variables
    let infoObject = $tableServicesEarlySession.bootstrapTable('getData');
    $tableServicesEarlySession.bootstrapTable("resetSearch","");
    let infoAllData = $tableServicesEarlySession.bootstrapTable('getData');
    let currentTotalServices = 0;
    let currentPriceServices = 0;
    let currentDiscountServices = 0;
    let data = [];
    
    const infoIndex = infoAllData.findIndex(({ num_sesion }) => num_sesion === infoObject[indexRow].num_sesion)

    //Quitamos el registro del arreglo
    infoAllData.splice(infoIndex,1)

    //sacamos el total de los servicios y obtenemos la numeracion de sesiones
    infoAllData.map((service,index) => {
        currentTotalServices += parseFloat(service.total)
        currentPriceServices += parseFloat(service.precio)
        currentDiscountServices += parseFloat(service.discountMoney)
        data.push({...service, num_sesion: (index + 1)})
    })

    //Asignacion del total y actualizamos la tabla de servicios
    priceTotalEarlySession.innerText = (currentTotalServices).toLocaleString("en", {
        minimumFractionDigits: 2,
    })
    subtotalEarlySession.innerText = currentPriceServices.toLocaleString("en", {
        minimumFractionDigits: 2,
    })
    discountTotalEarlySession.innerText = currentDiscountServices.toLocaleString("en", {
        minimumFractionDigits: 2,
    })
    totalEarlySession.innerText = currentTotalServices.toLocaleString("en", {
        minimumFractionDigits: 2,
    })
    balanceEarlySession.innerText = (currentTotalServices - currentBalanceEarly).toLocaleString("en", {
        minimumFractionDigits: 2,
    })
    amountEarlySession.value = (currentTotalServices - currentBalanceEarly);
    $tableServicesEarlySession.bootstrapTable('refreshOptions',{data});    
}
function operateRemoveService(value, row, index) {    
    return [
        '<div class="d-flex justify-content-center">',
        `<a class="" style="cursor: pointer;" onclick="RemoveServiceEarly(${index})" >`,
        '<span class="my-2 text-uppercase text-secondary" style="font-size: 13px;"><svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path></svg></span>',
        '</a>',
        '</div>'
    ].join('')
}
function operateRenderAreas(value, row, index) {
    const { Citareas, id_categoria } = row;
    const { Servicio } = currentTratamientEarly;
    let indexService = -1;
    let html = '';
    html += `<div class="d-flex flex-row flex-wrap">`;

    if(id_categoria === 1 || id_categoria === 4 || id_categoria === 5 || id_categoria === 6){
        html += `<span class="badge text-bg-primary bg-primary m-1">No aplica</span>`
    }

    if(id_categoria === 2 || id_categoria === 3){
        indexService = Servicio.findIndex(element => element.idServicio === parseInt(tratamientCalendarEarlySession.value))
    
        Citareas.map(({id_area}) => {
            const indexArea = Servicio[indexService].area.findIndex(element => element.idarea === parseInt(id_area));
            html += `<span class="badge text-bg-primary bg-primary m-1">${Servicio[indexService].area[indexArea].area}</span>`            
        })
    }

    html += `</div>`

    return html;
}
/* Operaciones de servicios fin */

/* Operaciones de cobro */
const changePayMethodMakeEarly = () => {
    const { TypePay } = infoApi;
    const indexPay = TypePay.findIndex(element => element.id_forma_pago === parseInt(methodPayEarlySession.value))
    const { descripcion } = TypePay[indexPay]; 

    if (descripcion === 'Tarjeta de débito' || descripcion === 'Tarjeta de crédito') {
        container_bankEarlySession.className = 'd-inline m-1';
        container_digitTarjetEarlySession.className = 'd-inline m-1';    
    }
    else {
        container_bankEarlySession.className = 'd-none';
        container_digitTarjetEarlySession.className = 'd-none';
        bankEarlySession.value = '';
        digitTarjetEarlySession.value = '';
    }
}
const AddPaymentEarly = () => {
    //Inicializacion de variables
    let bankName = "No aplica";
    let digitName = "No aplica";
    let infoService = $tableServicesEarlySession.bootstrapTable('getData');
    const costTotal = infoService.reduce((acc, {total}) => acc + parseFloat(total), 0);
    const { TypePay, banks } = infoApi;
    
    //Validacion de formulario de cobros
    if(infoService.length === 0){
        Alert('warning','Debes agregar por los menos un servicio antes.')
        return
    }
    if(costTotal === 0){
        Alert('warning','No tienes servicios por pagar.');
        return
    }
    if(amountEarlySession.value <= 0 || amountEarlySession.value === ''){
        Alert('warning','El monto es incorrecto');
        return 
    }
    if(amountEarlySession.value > (costTotal - currentBalanceEarly)){
        Alert('warning','El monto ingresado es mayor al saldo pendiente.');
        return
    }
    if(methodPayEarlySession.value === ''){
        Alert('warning','Debes seleccionar una forma de pago.');
        return
    }
    
    //Definimos si es pago con tarjeta, esto para obtener el banco    
    const indexPay = TypePay.findIndex(element => element.id_forma_pago === parseInt(methodPayEarlySession.value))
    const indexBank = banks.findIndex(element => element.id_bancos === parseInt(bankEarlySession.value))
    const { descripcion } = TypePay[indexPay]; 

    if (descripcion === 'Tarjeta de débito' || descripcion === 'Tarjeta de crédito') {
        if(bankEarlySession.value === ''){
            Alert('warning','Debes seleccionar un banco');
            return 
        }
        if(digitTarjetEarlySession.value === ''){
            Alert('warning','Debes ingresar los digitos');
            return 
        }
        bankName = banks[indexBank].nombre;
        digitName = digitTarjetEarlySession.value;
    }
    
    //Agregamos a la tabla la informacion del pago
    const json = {
        amount: amountEarlySession.value,
        methodName: descripcion,
        method: methodPayEarlySession.value,
        bank: bankEarlySession.value,
        bankName,
        digit: digitTarjetEarlySession.value,
        digitName
    }
    
    let data = $tablePaymentsEarlySession.bootstrapTable('getData')
    data.push(json)
    $tablePaymentsEarlySession.bootstrapTable('refreshOptions',{ data });

    //Actualizamos los valores de la vista
    currentBalanceEarly += parseFloat(amountEarlySession.value);
    balanceEarlySession.innerText = (costTotal - currentBalanceEarly).toLocaleString("en", {
        minimumFractionDigits: 2,
    })
    amountEarlySession.value = (costTotal - currentBalanceEarly);

    //reseteamos formulario
    methodPayEarlySession.value = '';
    bankEarlySession.value = '';
    digitTarjetEarlySession.value = '';
    container_bankEarlySession.className = 'd-none';
    container_digitTarjetEarlySession.className = 'd-none';        
}
function operateDeletePaymentEarly(value, row, index) {
    return [
        '<div class="d-flex justify-content-center">',
        '<a class="" style="cursor: pointer;" onclick="DeletePaymentEarly(\'' + index + '\')"  disabled>',
        '<span class="my-2 text-uppercase text-secondary" style="font-size: 13px;"><svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path></svg></span>',
        '</a>',
        '</div>'
    ].join('')
}
const DeletePaymentEarly = index => {
$tableServicesEarlySession.bootstrapTable("resetSearch","");
let infoService = $tableServicesEarlySession.bootstrapTable('getData');
const costTotal = infoService.reduce((acc, {total}) => acc + parseFloat(total), 0);
let data = $tablePaymentsEarlySession.bootstrapTable('getData')
const { amount } = data[index];

currentBalanceEarly  -= parseFloat(amount)
balanceEarlySession.innerText = (costTotal - currentBalanceEarly).toLocaleString("en", {
    minimumFractionDigits: 2,
})
amountEarlySession.value = (costTotal - currentBalanceEarly);

data.splice(index, 1)
$tablePaymentsEarlySession.bootstrapTable('refreshOptions',{ data });
}
/* Operaciones de cobro fin */


/* Operaciones de insumos */
const AddSupplierEarly = () => {
    if(supplierEarlySession.value === ''){
        Alert('warning','Debes seleccionar un insumo');
        return
    }
    if(supplierQuantityEarlySession.value === ''){
        Alert('warning','Debes ingresar una cantidad');
        return 
    }
    if(supplierPriceEarlySession.value === ''){
        Alert('warning','Debes ingresar un precio');
        return 
     }
     
    const indexSupplier = infoApi.supplies.findIndex(element => parseInt(element.id_insumo) === parseInt(supplierEarlySession.value));
    let data = $tableSupplierEarlySession.bootstrapTable('getData')
    const json = {
        supplier: supplierEarlySession.value,
        supplierName: infoApi.supplies[indexSupplier].nombre_insumo,
        quantity: supplierQuantityEarlySession.value,
        price: supplierPriceEarlySession.value,
        total: (parseInt(supplierQuantityEarlySession.value)*parseInt(supplierPriceEarlySession.value)),
    }
 
    data.push(json)
    $tableSupplierEarlySession.bootstrapTable('refreshOptions',{ data });
   
    supplierEarlySession.value = '';
    supplierQuantityEarlySession.value = '';
    supplierPriceEarlySession.value = '';    
}
function operateSupplierEarly(value, row, index) {
    return [
        '<div class="d-flex justify-content-center">',
        '<a class="" style="cursor: pointer;" onclick="DeleteSupplierEarly(\'' + index + '\')"  disabled>',
        '<span class="my-2 text-uppercase text-secondary" style="font-size: 13px;"><svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path></svg></span>',
        '</a>',
        '</div>'
    ].join('')
}
const DeleteSupplierEarly = index => {
    let data = $tableSupplierEarlySession.bootstrapTable('getData')
    data.splice(index, 1)
    $tableSupplierEarlySession.bootstrapTable('refreshOptions',{ data });
}
const changeSupplierEarly = () => {
   const indexSupplier = infoApi.supplies.findIndex(element => parseInt(element.id_insumo) === parseInt(supplierEarlySession.value));
   supplierPriceEarlySession.value = infoApi.supplies[indexSupplier].precio
}
/* Operaciones de insumos fin */


/**************************************************[ PAGOS ANTICIPADOS FIN ]*****************************************************************************/





