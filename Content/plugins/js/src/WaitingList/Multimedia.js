/* Llamamos las variables de entorno */
const envMultimedia = envirement();

/* VARIABLES GLOBALES */
let $tableWarehouse = $('#tableWarehouse');

/* VARIABLES GLOBALES FIN */

setTimeout(() => {
    $tableWarehouse.bootstrapTable({data: [
        {
            id_almacen: 1,
            almacen: 'MATRIZ',
            direccion: 'Calz del Federalismo Nte 3000B, Atemajac del Valle, 45190 Zapopan, Jal.'
        },
        {
            id_almacen: 2,
            almacen: 'OCCIDENTAL',
            direccion: 'C. Occidental 116, Atemajac del Valle, 45190 Zapopan, Jal.'
        },
        {
            id_almacen: 3,
            almacen: 'FEDERALISMO',
            direccion: 'Calz del Federalismo Nte 3000B, Atemajac del Valle, 45190 Zapopan, Jal.'
        },
        {
            id_almacen: 4,
            almacen: 'MANUEL ACUÑA',
            direccion: 'Av. Manuel Acuña 2880, Prados Providencia, 44670 Guadalajara, Jal.'
        }
    ]})

},100)



function operateFormatterWare(value, row, index) {
    console.log(value, row, index)
    return `<div class="d-flex flex-row">    
            <div class="d-flex justify-content-center">
                <a style="cursor: pointer;" onclick="editWarehouse(${row.id_almacen})">
                    <span class="my-2 text-uppercase text-secondary" style="font-size: 13px;">
                        <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.4" d="M16.6643 21.9897H7.33488C5.88835 22.0796 4.46781 21.5781 3.3989 20.6011C2.4219 19.5312 1.92041 18.1107 2.01032 16.6652V7.33482C1.92041 5.88932 2.4209 4.46878 3.3979 3.39889C4.46781 2.42189 5.88835 1.92041 7.33488 2.01032H16.6643C18.1089 1.92041 19.5284 2.4209 20.5973 3.39789C21.5733 4.46878 22.0758 5.88832 21.9899 7.33482V16.6652C22.0788 18.1107 21.5783 19.5312 20.6013 20.6011C19.5314 21.5781 18.1109 22.0796 16.6643 21.9897Z" fill="currentColor"></path>
                            <path d="M17.0545 10.3976L10.5018 16.9829C10.161 17.3146 9.7131 17.5 9.24574 17.5H6.95762C6.83105 17.5 6.71421 17.4512 6.62658 17.3634C6.53895 17.2756 6.5 17.1585 6.5 17.0317L6.55842 14.7195C6.56816 14.261 6.75315 13.8317 7.07446 13.5098L11.7189 8.8561C11.7967 8.77805 11.9331 8.77805 12.011 8.8561L13.6399 10.4785C13.747 10.5849 13.9028 10.6541 14.0683 10.6541C14.4286 10.6541 14.7109 10.3615 14.7109 10.0102C14.7109 9.83463 14.6428 9.67854 14.5357 9.56146C14.5065 9.52244 12.9554 7.97805 12.9554 7.97805C12.858 7.88049 12.858 7.71463 12.9554 7.61707L13.6078 6.95366C14.2114 6.34878 15.1851 6.34878 15.7888 6.95366L17.0545 8.22195C17.6485 8.81707 17.6485 9.79268 17.0545 10.3976Z" fill="currentColor"></path>
                        </svg>
                    </span>
                </a>
            </div>
      
            <div class="d-flex justify-content-center">
                <a style="cursor: pointer;" onclick="deleteWarehouse(${row.id_almacen})">
                    <span class="my-2 text-uppercase text-secondary" style="font-size: 13px;">
                        <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor">
                        </path>
                        </svg>
                    </span>
                </a>
            </div>
            </div>`
}

const addWarehouse = () => {
    Alert('warning',`Creamos nuevo almacen`);
}

const editWarehouse = id => {
    Alert('warning',`editamos el alamcen ${id}`);
}

const deleteWarehouse = id => {
    Alert('warning',`Eliminamos el alamcen ${id}`);
}