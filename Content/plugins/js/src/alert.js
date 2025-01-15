const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    // color: 'green',
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});


function Alert(status, message) {
    Toast.fire({
        icon: status,
        title: message
    })
}

function Confirmation(message) {
    return new Promise(resolve => {
        Swal.fire({
            title: message,
            showDenyButton: true,
            confirmButtonText: 'Confirmar',
            confirmButtonColor: '#0d6efd',
            denyButtonText: `Cancelar`,
        }).then((result) => {
            if (result.isConfirmed) {
                resolve(true);
            } else if (result.isDenied) {
                resolve(false);
            }
        })
    })
}


function PaymentInstant(message) {
    return new Promise(resolve => {
        Swal.fire({
            title: message,
            showDenyButton: true,
            confirmButtonText: 'Si',
            confirmButtonColor: '#0d6efd',
            denyButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed) {
                resolve(true);
            } else if (result.isDenied) {
                resolve(false);
            }
        })
    })
}

const ConfirmationDelete = async (options, id, url) => {
    return new Promise(resolves => {
        Swal.fire({
            title: 'Selecciona un motivo de cancelación / eliminación',
            input: 'select',
            inputOptions: options,
            inputPlaceholder: 'Selecciona un motivo',
            confirmButtonColor: 'var(--bs-primary)',
            showCancelButton: true,
            didOpen: () => {
                Swal.getInput().addEventListener('change', (event) => {
                    if(parseInt(event.target.value) === 6){
                      document.getElementsByClassName('swal2-radio')[0].innerHTML = `<section id="cancelPassword">
                      <label for="cancelPasswordInput" class="from-label">Contraseña de confirmación (Administrador)</label>
                          <input id="cancelPasswordInput" class="from-control" placeholder="*****" type="password" />
                      </section>`;
                      document.getElementsByClassName('swal2-radio')[0].style.display = 'block';
                    }
                    else{
                        document.getElementsByClassName('swal2-radio')[0].innerHTML = ``
                    }
                    
                })
              },
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value === '') {
                        resolve('Tienes que seleccionar una opción')
                    } else {
                        resolve()
                    }
                })
            }
        }).then((result) => {
            resolves(result)
        })
    })
}

const ConfirmationDeletePayments = async () => {
    return new Promise(resolves => {
        Swal.fire({
            title: 'Confirme la eliminación del cobro',
            inputLabel: 'Confirmación',
            input: 'password',
            inputPlaceholder: '*******',
            confirmButtonColor: 'var(--bs-primary)',
            focus: true,
            showCancelButton: true,   
            inputValidator: (value) => {
                if (!value) {
                  return 'Debes agregar una clave!'
                }
              }
        }).then((result) => {
            resolves(result)
        })
    })
}

const ConfirmationCloseBoxCut = async () => {
    return new Promise(resolve => {
        Swal.fire({
            title: message,
            showDenyButton: true,
            confirmButtonText: 'Confirmar',
            confirmButtonColor: '#0d6efd',
            denyButtonText: `Cancelar`,
        }).then((result) => {
            if (result.isConfirmed) {
                resolve(true);
            } else if (result.isDenied) {
                resolve(false);
            }
        })
    })
}

function ToastID(id) {
    return Swal.fire({
        title: '<strong>Usuario Generado</strong>',
        icon: 'info',
        html:
            `El numero de expediente es el <p id="expiduser">${id}</p> ` +
            `<button class="btn btn-success" onclick="copyPaper()"> Copiar </button>`,
        showCloseButton: true,
        showConfirmButton: false,
        showCancelButton: true,
        focusConfirm: false,
        cancelButtonText: 'Cerrar',
        cancelButtonAriaLabel: 'Cerrar',
        cancelButtonColor: 'red'
    })
}

function copyPaper() {
    var aux = document.createElement("input");
    aux.setAttribute("value", document.getElementById('expiduser').innerHTML);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    Alert('success', `Expediente ${document.getElementById('expiduser').innerHTML} copiado`)
}


function ToastIDPending(id) {
    return Swal.fire({
        title: '<strong>Consulta en curso</strong>',
        icon: 'info',
        html:
            `Para poder continuar <br/><br/> Finalice la consulta del paciente <p style="font-weight: bold">${id}</p>`,
        showCloseButton: true,
        showConfirmButton: false,
        showCancelButton: true,
        focusConfirm: false,
        cancelButtonText: 'Aceptar',
        cancelButtonAriaLabel: 'Cerrar',
        cancelButtonColor: 'red'
    })
}