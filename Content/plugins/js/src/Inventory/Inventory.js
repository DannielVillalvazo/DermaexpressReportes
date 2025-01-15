/* Llamamos las variables de entorno */
const envInventory = envirement();

/* Llamamos las variables globales */
let $tableSupplies = $('#tableSupplies');
let infoInventorie = [];
let infoTransferStock = [];
let idEditSupplie = -1;
/* VARIABLES MODAL INSUMOS */
//Nuevo insumo
let nameSupplie = document.getElementById('nameSupplie')
let priceSupplie = document.getElementById('priceSupplie')
let categorySupplie = document.getElementById('categorySupplie')
let warehouseSupplie = document.getElementById('warehouseSupplie')
let stockSupplie = document.getElementById('stockSupplie')
let statusPriceSupplie = document.getElementById('statusPriceSupplie')

//Editar insumo / Agregar insumo
let nameEditSupplie = document.getElementById('nameEditSupplie')
let priceEditSupplie = document.getElementById('priceEditSupplie')
let categoryEditSupplie = document.getElementById('categoryEditSupplie')
let warehouseEditSupplie = document.getElementById('warehouseEditSupplie')
let stockEditSupplie = document.getElementById('stockEditSupplie')
let statusPriceEditSupplie = document.getElementById('statusPriceEditSupplie')
let titleModalSupplie = document.getElementById('titleModalSupplie')
let ActionModalSupplier = document.getElementById('ActionModalSupplier')

//Transpaso de existencias
let warehouseTransferSupplie = document.getElementById('warehouseTransferSupplie');
let warehouseTransferSupplieD = document.getElementById('warehouseTransferSupplieD');
let stockTransferSupplie = document.getElementById('stockTransferSupplie');
let nameTransferSupplie = document.getElementById('nameTransferSupplie')


/* VARIABLES MODAL INSUMOS FIN */

const onKeyboardEscSupplie = () => event.keyCode === 27 && closeModalNewSupplie();
const onKeyboardEscSupplieEdit = () => event.keyCode === 27 && closeModalEditSupplie();
const onKeyboardEscTransferStock = () => event.keyCode === 27 && closeModalTransferStock();

/* Obtenemos todos los insumos existentes */
const getSupplies = () => { 
    fetch(`${envInventory.rutes.back}${envInventory.controllers.inventory}GetInvetorySupplies`)
    .then(response => response.json())
    .then(result => {
        const { Supplies } = result.InventorySupplies[0];
        infoInventorie = Supplies;
        $tableSupplies.bootstrapTable({data: Supplies});
    })
    .catch(error => Alert('error', error.message))
}

setTimeout(getSupplies, 200)
/* Obtenemos todos los insumos existentes fin */

function operateFormatterStatus(value, row, index) {
    const { precio_bloqueado } = row; 
    return `<div class="w-100">    
                <span class="badge text-bg-primary bg-${precio_bloqueado ? 'warning' : 'success'} w-100">${precio_bloqueado ? 'BLOQUEADO' : 'LIBRE'}</span>
            </div>`
}

function operateFormatterInv(value, row, index) {
    return `<div class="d-flex flex-row">    
            <div class="d-flex justify-content-center">
                <a style="cursor: pointer;" onclick="openModalEditSupplie(${row.id_insumo})">
                    <span class="my-2 text-uppercase text-secondary" style="font-size: 13px;">
                        <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.4" d="M16.6643 21.9897H7.33488C5.88835 22.0796 4.46781 21.5781 3.3989 20.6011C2.4219 19.5312 1.92041 18.1107 2.01032 16.6652V7.33482C1.92041 5.88932 2.4209 4.46878 3.3979 3.39889C4.46781 2.42189 5.88835 1.92041 7.33488 2.01032H16.6643C18.1089 1.92041 19.5284 2.4209 20.5973 3.39789C21.5733 4.46878 22.0758 5.88832 21.9899 7.33482V16.6652C22.0788 18.1107 21.5783 19.5312 20.6013 20.6011C19.5314 21.5781 18.1109 22.0796 16.6643 21.9897Z" fill="currentColor"></path>
                            <path d="M17.0545 10.3976L10.5018 16.9829C10.161 17.3146 9.7131 17.5 9.24574 17.5H6.95762C6.83105 17.5 6.71421 17.4512 6.62658 17.3634C6.53895 17.2756 6.5 17.1585 6.5 17.0317L6.55842 14.7195C6.56816 14.261 6.75315 13.8317 7.07446 13.5098L11.7189 8.8561C11.7967 8.77805 11.9331 8.77805 12.011 8.8561L13.6399 10.4785C13.747 10.5849 13.9028 10.6541 14.0683 10.6541C14.4286 10.6541 14.7109 10.3615 14.7109 10.0102C14.7109 9.83463 14.6428 9.67854 14.5357 9.56146C14.5065 9.52244 12.9554 7.97805 12.9554 7.97805C12.858 7.88049 12.858 7.71463 12.9554 7.61707L13.6078 6.95366C14.2114 6.34878 15.1851 6.34878 15.7888 6.95366L17.0545 8.22195C17.6485 8.81707 17.6485 9.79268 17.0545 10.3976Z" fill="currentColor"></path>
                        </svg>
                    </span>
                </a>
            </div>
            <div class="d-flex justify-content-center">
                <a style="cursor: pointer;" onclick="openModalAddStock(${row.id_insumo})">
                    <span class="my-2 text-uppercase text-secondary" style="font-size: 13px;">
                        <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.4" d="M16.6667 2H7.33333C3.92889 2 2 3.92889 2 7.33333V16.6667C2 20.0622 3.92 22 7.33333 22H16.6667C20.0711 22 22 20.0622 22 16.6667V7.33333C22 3.92889 20.0711 2 16.6667 2Z" fill="currentColor"></path>
                            <path d="M15.3205 12.7083H12.7495V15.257C12.7495 15.6673 12.4139 16 12 16C11.5861 16 11.2505 15.6673 11.2505 15.257V12.7083H8.67955C8.29342 12.6687 8 12.3461 8 11.9613C8 11.5765 8.29342 11.2539 8.67955 11.2143H11.2424V8.67365C11.2824 8.29088 11.6078 8 11.996 8C12.3842 8 12.7095 8.29088 12.7495 8.67365V11.2143H15.3205C15.7066 11.2539 16 11.5765 16 11.9613C16 12.3461 15.7066 12.6687 15.3205 12.7083Z" fill="currentColor"></path>
                        </svg>
                    </span>
                </a>
            </div>
            <div class="d-flex justify-content-center">
                <a style="cursor: pointer;" onclick="openModalTransferStock(${row.id_insumo})">
                    <span class="my-2 text-uppercase text-secondary" style="font-size: 13px;">
                        <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.4">
                            <path
                                d="M4.88076 14.6713C4.74978 14.2784 4.32504 14.066 3.93208 14.197C3.53912 14.328 3.32675 14.7527 3.45774 15.1457L4.88076 14.6713ZM20.8808 15.1457C21.0117 14.7527 20.7994 14.328 20.4064 14.197C20.0135 14.066 19.5887 14.2784 19.4577 14.6713L20.8808 15.1457ZM4.16925 14.9085C3.45774 15.1457 3.45785 15.146 3.45797 15.1464C3.45802 15.1465 3.45815 15.1469 3.45825 15.1472C3.45845 15.1478 3.45868 15.1485 3.45895 15.1493C3.45948 15.1509 3.46013 15.1528 3.46092 15.1551C3.46249 15.1597 3.46456 15.1657 3.46716 15.1731C3.47235 15.188 3.47961 15.2084 3.48902 15.2341C3.50782 15.2854 3.53521 15.3576 3.5717 15.4477C3.64461 15.6279 3.7542 15.8805 3.90468 16.1814C4.2048 16.7817 4.67223 17.5836 5.34308 18.3886C6.68942 20.0043 8.88343 21.6585 12.1693 21.6585V20.1585C9.45507 20.1585 7.64908 18.8128 6.49542 17.4284C5.91627 16.7334 5.5087 16.0354 5.24632 15.5106C5.11555 15.2491 5.02201 15.0329 4.96212 14.8849C4.9322 14.811 4.91076 14.7543 4.89733 14.7177C4.89062 14.6994 4.88593 14.6861 4.88318 14.6783C4.88181 14.6744 4.88093 14.6718 4.88053 14.6706C4.88033 14.67 4.88025 14.6698 4.88029 14.6699C4.88031 14.67 4.88036 14.6701 4.88044 14.6704C4.88047 14.6705 4.88056 14.6707 4.88058 14.6708C4.88067 14.671 4.88076 14.6713 4.16925 14.9085ZM12.1693 21.6585C15.4551 21.6585 17.6491 20.0043 18.9954 18.3886C19.6663 17.5836 20.1337 16.7817 20.4338 16.1814C20.5843 15.8805 20.6939 15.6279 20.7668 15.4477C20.8033 15.3576 20.8307 15.2854 20.8495 15.2341C20.8589 15.2084 20.8662 15.188 20.8713 15.1731C20.8739 15.1657 20.876 15.1597 20.8776 15.1551C20.8784 15.1528 20.879 15.1509 20.8796 15.1493C20.8798 15.1485 20.8801 15.1478 20.8803 15.1472C20.8804 15.1469 20.8805 15.1465 20.8805 15.1464C20.8807 15.146 20.8808 15.1457 20.1693 14.9085C19.4577 14.6713 19.4578 14.671 19.4579 14.6708C19.4579 14.6707 19.458 14.6705 19.4581 14.6704C19.4581 14.6701 19.4582 14.67 19.4582 14.6699C19.4583 14.6698 19.4582 14.67 19.458 14.6706C19.4576 14.6718 19.4567 14.6744 19.4553 14.6783C19.4526 14.6861 19.4479 14.6994 19.4412 14.7177C19.4277 14.7543 19.4063 14.811 19.3764 14.8849C19.3165 15.0329 19.223 15.2491 19.0922 15.5106C18.8298 16.0354 18.4222 16.7334 17.8431 17.4284C16.6894 18.8128 14.8834 20.1585 12.1693 20.1585V21.6585Z"
                                fill="currentColor"></path>
                            <path d="M21.5183 19.2271C21.4293 19.2234 21.3427 19.196 21.2671 19.1465L16.3546 15.8924C16.2197 15.8026 16.1413 15.6537 16.148 15.4969C16.1546 15.34 16.2452 15.1982 16.3873 15.1202L21.5571 12.2926C21.7075 12.2106 21.8932 12.213 22.0416 12.3003C22.1907 12.387 22.2783 12.5436 22.2712 12.7096L22.014 18.7913C22.007 18.9573 21.9065 19.1059 21.7506 19.1797C21.6772 19.215 21.597 19.2305 21.5183 19.2271" fill="currentColor"></path>
                            </g>
                            <path
                            d="M20.0742 10.0265C20.1886 10.4246 20.6041 10.6546 21.0022 10.5401C21.4003 10.4257 21.6302 10.0102 21.5158 9.61214L20.0742 10.0265ZM4.10803 8.88317C3.96071 9.27031 4.15513 9.70356 4.54226 9.85087C4.92939 9.99818 5.36265 9.80377 5.50996 9.41664L4.10803 8.88317ZM20.795 9.81934C21.5158 9.61214 21.5157 9.6118 21.5156 9.61144C21.5155 9.61129 21.5154 9.6109 21.5153 9.61059C21.5152 9.60998 21.515 9.60928 21.5147 9.60848C21.5143 9.60689 21.5137 9.60493 21.513 9.6026C21.5116 9.59795 21.5098 9.59184 21.5075 9.58431C21.503 9.56925 21.4966 9.54853 21.4882 9.52251C21.4716 9.47048 21.4473 9.39719 21.4146 9.3056C21.3493 9.12256 21.2503 8.8656 21.1126 8.55861C20.8378 7.94634 20.4044 7.12552 19.7678 6.29313C18.4902 4.62261 16.3673 2.87801 13.0844 2.74053L13.0216 4.23922C15.7334 4.35278 17.4816 5.77291 18.5763 7.20436C19.1258 7.92295 19.5038 8.63743 19.744 9.17271C19.8638 9.43949 19.9482 9.65937 20.0018 9.80972C20.0286 9.88483 20.0477 9.94238 20.0596 9.97951C20.0655 9.99808 20.0696 10.0115 20.072 10.0195C20.0732 10.0235 20.074 10.0261 20.0744 10.0273C20.0746 10.0278 20.0746 10.0281 20.0746 10.028C20.0746 10.0279 20.0745 10.0278 20.0745 10.0275C20.0744 10.0274 20.0744 10.0272 20.0743 10.0271C20.0743 10.0268 20.0742 10.0265 20.795 9.81934ZM13.0844 2.74053C9.80146 2.60306 7.54016 4.16407 6.12741 5.72193C5.42345 6.49818 4.92288 7.27989 4.59791 7.86704C4.43497 8.16144 4.31491 8.40923 4.23452 8.58617C4.1943 8.67471 4.16391 8.7457 4.14298 8.79616C4.13251 8.82139 4.1244 8.84151 4.11859 8.85613C4.11568 8.86344 4.11336 8.86938 4.1116 8.8739C4.11072 8.87616 4.10998 8.87807 4.10939 8.87962C4.10909 8.88039 4.10883 8.88108 4.1086 8.88167C4.10849 8.88196 4.10834 8.88234 4.10829 8.88249C4.10815 8.88284 4.10803 8.88317 4.80899 9.14991C5.50996 9.41664 5.50985 9.41692 5.50975 9.41719C5.50973 9.41725 5.50964 9.41749 5.50959 9.4176C5.5095 9.41784 5.50945 9.41798 5.50942 9.41804C5.50938 9.41816 5.50947 9.41792 5.50969 9.41734C5.51014 9.41619 5.51113 9.41365 5.51267 9.40979C5.51574 9.40206 5.52099 9.38901 5.52846 9.37101C5.5434 9.335 5.56719 9.27924 5.60018 9.20664C5.66621 9.0613 5.76871 8.84925 5.91031 8.59341C6.19442 8.08008 6.63084 7.39971 7.23855 6.72958C8.44912 5.39466 10.3098 4.12566 13.0216 4.23922L13.0844 2.74053Z"
                            fill="currentColor"></path>
                            <path d="M8.78337 9.33604C8.72981 9.40713 8.65805 9.46292 8.57443 9.49703L3.1072 11.6951C2.95672 11.7552 2.78966 11.7352 2.66427 11.6407C2.53887 11.5462 2.47359 11.3912 2.48993 11.2299L3.09576 5.36863C3.11367 5.19823 3.22102 5.04666 3.37711 4.97402C3.5331 4.9005 3.71173 4.91728 3.84442 5.01726L8.70581 8.68052C8.8385 8.78051 8.90387 8.94759 8.8762 9.1178C8.86358 9.19825 8.83082 9.27308 8.78337 9.33604" fill="currentColor"></path>
                        </svg>
                    </span>
                </a>
            </div>            
            </div>`
}

/* Nuevo insumo */
const openModalNewSupplie = () => {
    fetch(`${envInventory.rutes.back}${envInventory.controllers.inventory}GetCategoryWarehouse`)
    .then(response => response.json())
    .then(result => {
        const { Categories, Warehouses } = result.CategoriesWarehouse[0]
        
        Categories.map(({ id_categoria, categoria }) => {
            let option = document.createElement('option')
            option.value = `${id_categoria}`
            option.label = `${categoria}`
            categorySupplie.append(option)
        })
        Warehouses.map(({ id_almacen, nombre_almacen }) => {
            let option = document.createElement('option')
            option.value = `${id_almacen}`
            option.label = `${nombre_almacen}`
            warehouseSupplie.append(option)
        })

        warehouseSupplie.value = 1;
        $('#modalNewSupplie').modal('show')        
    })
    .catch(error => alert('error', error.message))
}

const saveNewSupplie = () => {
    let error = 0;
    nameSupplie.className = 'form-control w-100'
    priceSupplie.className = 'form-control w-100'
    categorySupplie.className = 'form-control w-100'
    warehouseSupplie.className = 'form-control w-100'
    stockSupplie.className = 'form-control w-100'
    
    if(nameSupplie.value === ''){
        nameSupplie.className = 'is-invalid form-control w-100';
        error++
    }
    if(priceSupplie.value === ''){
        priceSupplie.className = 'is-invalid form-control w-100';
        error++
    }
    if(nameSupplie.value === ''){
        nameSupplie.className = 'is-invalid form-control w-100';
        error++
    }
    if(categorySupplie.value === ''){
        categorySupplie.className = 'is-invalid form-control w-100';
        error++
    }
    if(stockSupplie.value === '' || parseInt(stockSupplie.value) < 0){
        stockSupplie.className = 'is-invalid form-control w-100';
        error++
    }
    
    if(error > 0) return
    
    fetch(`${envInventory.rutes.back}${envInventory.controllers.inventory}PostInventorySupplies`,{
        method:'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            Supplies: {
                nombre_insumo: nameSupplie.value.toUpperCase(),
                precio: priceSupplie.value,
                precio_bloqueado: statusPriceSupplie.checked,
                id_categoria: categorySupplie.value,
                existencia: stockSupplie.value
            }
        })
    })
    .then(response => response.json())
    .then(result => {
        if(result.ConflictsInventory){
            const { Description  } = result.ConflictsInventory[0]
            Alert('warning', Description)
            return
        }     
        const { Description } = result.SuccesInventory[0];
        Alert('success', Description);
        $tableSupplies.bootstrapTable('destroy');
        closeModalNewSupplie();
        getSupplies();
    })
    .catch(error => Alert('error', error.message))
}

const closeModalNewSupplie = () => {
    nameSupplie.value = '';
    priceSupplie.value = '';
    categorySupplie.value = '';
    warehouseSupplie.value = '';
    stockSupplie.value = '';
    statusPriceSupplie.checked = false;

    nameSupplie.className = 'form-control w-100'
    priceSupplie.className = 'form-control w-100'
    categorySupplie.className = 'form-control w-100'
    warehouseSupplie.className = 'form-control w-100'
    stockSupplie.className = 'form-control w-100'

    var options = document.querySelectorAll('#categorySupplie option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#warehouseSupplie option');
    options.forEach((o, index) => index !== 0 && o.remove());


    $('#modalNewSupplie').modal('hide')
}
/* Nuevo insumo fin */

/* Editar insumo */
const openModalEditSupplie = id => {
    fetch(`${envInventory.rutes.back}${envInventory.controllers.inventory}GetCategoryWarehouse`)
    .then(response => response.json())
    .then(result => {
        const { Categories, Warehouses } = result.CategoriesWarehouse[0]
        const { existencia, id_almacen, id_categoria, id_insumo, nombre_almacen, nombre_insumo, precio, precio_bloqueado } = infoInventorie.find(element => element.id_insumo === id);
        
        Categories.map(({ id_categoria, categoria }) => {
            let option = document.createElement('option')
            option.value = `${id_categoria}`
            option.label = `${categoria}`
            categoryEditSupplie.append(option)
        })
        Warehouses.map(({ id_almacen, nombre_almacen }) => {
            let option = document.createElement('option')
            option.value = `${id_almacen}`
            option.label = `${nombre_almacen}`
            warehouseEditSupplie.append(option)
        })

        titleModalSupplie.innerText = 'Editar insumo';
        document.getElementById('ActionModalSupplier').onclick = updateSupplie

        stockEditSupplie.readOnly = true;

        nameEditSupplie.value = nombre_insumo;
        priceEditSupplie.value = precio;
        categoryEditSupplie.value = id_categoria;
        warehouseEditSupplie.value = id_almacen;
        stockEditSupplie.value = existencia;
        statusPriceEditSupplie.checked = precio_bloqueado;
        idEditSupplie = id_insumo;
        $('#modalEditSupplie').modal('show')        
    })
    .catch(error => Alert('error', error.message))
}

const updateSupplie = () => {
    let error = 0;
    nameEditSupplie.className = 'form-control w-100'
    priceEditSupplie.className = 'form-control w-100'
    categoryEditSupplie.className = 'form-control w-100'
    warehouseEditSupplie.className = 'form-control w-100'
    stockEditSupplie.className = 'form-control w-100'
                    
    if(nameEditSupplie.value === ''){
        nameEditSupplie.className = 'is-invalid form-control w-100';
        error++
    }
    if(priceEditSupplie.value === ''){
        priceEditSupplie.className = 'is-invalid form-control w-100';
        error++
    }
    if(categoryEditSupplie.value === ''){
        categoryEditSupplie.className = 'is-invalid form-control w-100';
        error++
    }
    if(warehouseEditSupplie.value === ''){
        warehouseEditSupplie.className = 'is-invalid form-control w-100';
        error++
    }
    if(stockEditSupplie.value === ''){
        stockEditSupplie.className = 'is-invalid form-control w-100';
        error++
    }
    
    if(error > 0) return
    
    fetch(`${envInventory.rutes.back}${envInventory.controllers.inventory}PostEditInventorySupplies`,{
        method:'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            Supplies: {
                id_insumo: idEditSupplie,
                nombre_insumo: nameEditSupplie.value.toUpperCase(),
                precio: priceEditSupplie.value,
                precio_bloqueado: statusPriceEditSupplie.checked,
                id_categoria: categoryEditSupplie.value
            }
        })
    })
    .then(response => response.json())
    .then(result => {
        if(result.ConflictsInventory){
            const { Description  } = result.ConflictsInventory[0]
            Alert('warning', Description)
            return
        }   
        const { Description } = result.SuccesInventory[0];
        Alert('success', Description);
        $tableSupplies.bootstrapTable('destroy');
        closeModalEditSupplie();
        getSupplies();
    })
    .catch(error => Alert('error', error.message))
}

const closeModalEditSupplie = () => {
    nameEditSupplie.value = '';
    priceEditSupplie.value = '';
    categoryEditSupplie.value = '';
    warehouseEditSupplie.value = '';
    stockEditSupplie.value = '';
    statusPriceEditSupplie.checked = false;

    nameEditSupplie.className = 'form-control w-100'
    priceEditSupplie.className = 'form-control w-100'
    categoryEditSupplie.className = 'form-control w-100'
    warehouseEditSupplie.className = 'form-control w-100'
    stockEditSupplie.className = 'form-control w-100'

    stockEditSupplie.readOnly = false;
    nameEditSupplie.readOnly = false;
    priceEditSupplie.readOnly = false;
    categoryEditSupplie.disabled = false;
    warehouseEditSupplie.disabled = true;
    statusPriceEditSupplie.disabled = false;

    var options = document.querySelectorAll('#categoryEditSupplie option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#warehouseEditSupplie option');
    options.forEach((o, index) => index !== 0 && o.remove());


    $('#modalEditSupplie').modal('hide')
}
/* Editar insumo fin */

/* Agregar existencia */
const openModalAddStock = id => {
    fetch(`${envInventory.rutes.back}${envInventory.controllers.inventory}GetCategoryWarehouse`)
    .then(response => response.json())
    .then(result => {
        const { Categories, Warehouses } = result.CategoriesWarehouse[0]
        const { existencia, id_almacen, id_categoria, id_insumo, nombre_almacen, nombre_insumo, precio, precio_bloqueado } = infoInventorie.find(element => element.id_insumo === id);
        
        Categories.map(({ id_categoria, categoria }) => {
            let option = document.createElement('option')
            option.value = `${id_categoria}`
            option.label = `${categoria}`
            categoryEditSupplie.append(option)
        })
        Warehouses.map(({ id_almacen, nombre_almacen }) => {
            let option = document.createElement('option')
            option.value = `${id_almacen}`
            option.label = `${nombre_almacen}`
            warehouseEditSupplie.append(option)
        })
        titleModalSupplie.innerText = 'Agregar existencia';
        document.getElementById('ActionModalSupplier').onclick = addStock
        
        nameEditSupplie.readOnly = true;
        priceEditSupplie.readOnly = true;
        categoryEditSupplie.disabled = true;
        warehouseEditSupplie.disabled = true;
        statusPriceEditSupplie.disabled = true;

        nameEditSupplie.value = nombre_insumo;
        priceEditSupplie.value = precio;
        categoryEditSupplie.value = id_categoria;
        warehouseEditSupplie.value = id_almacen;
        stockEditSupplie.value = 0;
        statusPriceEditSupplie.checked = precio_bloqueado;
        idEditSupplie = id_insumo;
        $('#modalEditSupplie').modal('show')        
    })
    .catch(error => alert('error', error.message))
}

const addStock = () => {
    stockEditSupplie.className = 'form-control w-100';

    if(stockEditSupplie.value === '' || parseInt(stockEditSupplie.value) < 0){
        stockEditSupplie.className = 'is-invalid form-control w-100';
        return
    }

    fetch(`${envInventory.rutes.back}${envInventory.controllers.inventory}PostAddStock`,{
        method:'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            Supplies: {
                id_insumo: idEditSupplie,
                existencia: stockEditSupplie.value
            }
        })
    })
    .then(response => response.json())
    .then(result => {
        if(result.ConflictsInventory){
            const { Description  } = result.ConflictsInventory[0]
            Alert('warning', Description)
            return
        }   
        const { Description } = result.SuccesInventory[0];
        Alert('success', Description);
        $tableSupplies.bootstrapTable('destroy');
        closeModalEditSupplie();
        getSupplies();
    })
    .catch(error => Alert('error', error.message))
}
/* Agregar existencia fin */

/* Traspaso de existencia */
const openModalTransferStock = id => {
    fetch(`${envInventory.rutes.back}${envInventory.controllers.inventory}GetCategoryWarehouse`)
    .then(response => response.json())
    .then(result => {
        const { Categories, Warehouses } = result.CategoriesWarehouse[0]
        const { existencia, id_almacen, id_categoria, id_insumo, nombre_almacen, nombre_insumo, precio, precio_bloqueado } = infoInventorie.find(element => element.id_insumo === id);
        const warehouse = id_almacen;
        Warehouses.map(({ id_almacen, nombre_almacen }) => {
            let option = document.createElement('option')
            option.value = `${id_almacen}`
            option.label = `${nombre_almacen}`
            warehouseTransferSupplie.append(option)
        })
        Warehouses.map(({ id_almacen, nombre_almacen }) => {
            if(id_almacen ===  warehouse) return;
            let option = document.createElement('option')
            option.value = `${id_almacen}`
            option.label = `${nombre_almacen}`
            warehouseTransferSupplieD.append(option)
        })
        
        nameTransferSupplie.value = nombre_insumo;
        warehouseTransferSupplie.value = id_almacen;        
        stockTransferSupplie.value = '';
        idEditSupplie = id_insumo;
        infoTransferStock = {
            existencia, 
            id_almacen,
            id_insumo
        }

        $('#modalTransferSupplie').modal('show')        
    })
    .catch(error => alert('error', error.message))
}

const transferStock = () => {    
    const { existencia, id_almacen, id_insumo} = infoTransferStock;
    const { id_usuario } = JSON.parse(localStorage.getItem('user'))
    warehouseTransferSupplieD.classList.remove('is-invalid')
    stockTransferSupplie.classList.remove('is-invalid')
    let error = 0;
    if(warehouseTransferSupplieD.value === ''){
        warehouseTransferSupplieD.classList.add('is-invalid')
        error++;
    }

    if(stockTransferSupplie.value === '' || !Number.isInteger(parseInt(stockTransferSupplie.value)) || parseInt(stockTransferSupplie.value) <= 0){
        stockTransferSupplie.classList.add('is-invalid')
        error++;
    }

    if(parseInt(stockTransferSupplie.value) > existencia){
        Alert('warning', 'La cantidad es mayor a tu existencia actual');
        error++;
    }
    
    
    fetch(`${envInventory.rutes.back}${envInventory.controllers.inventory}PostTransfersInventory`,{
        method:'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            Transfer: {
                id_insumo_origen: id_insumo,
                id_almacen_destino: warehouseTransferSupplieD.value,
                cantidad: parseInt(stockTransferSupplie.value),
                id_usuario: id_usuario,
            }
        })
    })
    .then(response => response.json())
    .then(result => {
        if(result.ConflictsInventory){
            const { Description  } = result.ConflictsInventory[0]
            Alert('warning', Description)
            return
        }   
        const { Description } = result.SuccesInventory[0];
        Alert('success', Description);

        $tableSupplies.bootstrapTable('destroy');
        closeModalTransferStock();
        getSupplies();
    })
    .catch(error => Alert('error', error.message))
}

const closeModalTransferStock = () => {
    nameTransferSupplie.value = '';
    warehouseTransferSupplie.value = '';
    warehouseTransferSupplieD.value = '';
    stockTransferSupplie.value = '';
    

    nameTransferSupplie.className = 'form-control w-100'
    warehouseTransferSupplie.className = 'form-control w-100'
    warehouseTransferSupplieD.className = 'form-control w-100'
    stockTransferSupplie.className = 'form-control w-100'

    var options = document.querySelectorAll('#warehouseTransferSupplie option');
    options.forEach((o, index) => index !== 0 && o.remove());
    var options = document.querySelectorAll('#warehouseTransferSupplieD option');
    options.forEach((o, index) => index !== 0 && o.remove());


    $('#modalTransferSupplie').modal('hide')
}
/* Traspaso de existencia fin */