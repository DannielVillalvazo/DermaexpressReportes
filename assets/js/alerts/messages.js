function loading(title) {

    Swal.fire({
        title: title,
        text: 'Espere por favor...',
        icon: 'warning',
        timerProgressBar: true,
        backdrop: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading()

        },
    })
}

function mymessage(icon, message) {
    //ENVIAR MENSAJE DE ERROR
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: icon,
        title: message,
        text: ""
    })
}
