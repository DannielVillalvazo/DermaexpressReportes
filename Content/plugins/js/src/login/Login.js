/* Validamos si el navegador ya cuenta con una Sesion Iniciada */
sessionActive("login");

/* Llamamos las variables de entorno */
const { rutes, controllers } = envirement();

/* Variables Globales */
let Shopes = [];

/* Agregar al select las sucursales activas */
const addSelect = () => {
    fetch(`${rutes.back}${controllers.login}Shopes`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(result => {
        let selectShopes = document.getElementById('selectShope')
        selectShopes.value = "0";
        let theOptions = "";
        result.sucursal.sucursal.map(({ id_sucursal, nombre, id_tema }) => {
            Shopes.push({
                id: id_sucursal,
                name: nombre,
                id_tema,
                theme: result.sucursal.Theme.find(e => parseInt(e.id_tema, 10) === parseInt(id_tema,10))
            })
            theOptions += `<option value="${id_sucursal}">${nombre}</option>`;
        })
        selectShopes.insertAdjacentHTML('beforeend', theOptions);
    })
    .catch(error => console.log(error.message))

}

/* Cambia la imagen de la sucursal */
const changeSelect = () => {
    const selected = document.getElementById('selectShope').value;
    let image = document.getElementById('banner-store');

    image.style.animation = "imgOpacityOut 2s"
    setTimeout(() => {
        image.src = `./Content/Images/store/${selected}.jpg`;
        image.style.animation = "imgOpacityIn 1s"
    },1000)
}

/* Funcion para validar el inicio de sesion */
const validateLogin = () => {
    /* Elementos del formulario del login */
    let btn = document.getElementById('btn-login');
    let loading = document.getElementById('loadign-login');


    btn.style.display = 'none';
    loading.style.display = 'grid';

    let select = document.getElementById('selectShope');
    let username = document.getElementById('username');
    let password = document.getElementById('password');
    select.className = 'form-select'
    username.className = 'form-control'
    password.className = 'form-control'
    if (select.value === '0' || select.value === '') {
        select.className = 'form-select is-invalid'
        loading.style.display = 'none';
        btn.style.display = 'inline';
        return;
    }
    if (username.value === '') {
        username.className = 'form-control is-invalid'
        loading.style.display = 'none';
        btn.style.display = 'inline';
        return;
    }
    if (password.value === '' || password.value.length < 8) {
        password.className = 'form-control is-invalid'
        loading.style.display = 'none';
        btn.style.display = 'inline';
        return;
    }
    fetch(`${rutes.back}${controllers.login}Login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            Shope: select.value,
            User: username.value,
            Pwd: password.value
        })
    })
    .then(response => response.json())
    .then(result => {
        if (result.conflicts !== null) {
            Alert('error', result.conflicts[0].Description);
            loading.style.display = 'none';
            btn.style.display = 'inline';
            return 
        }

        const { User, permisos, Turno } = result

        loading.style.display = 'none';
        btn.style.display = 'inline';

        Alert('success', 'Sesión iniciada')

        /* Guarda los datos de la clinica y el usuario */
        let Clinic = [];
        Shopes.map(sh => {
            if (parseInt(sh.id) === parseInt(select.value))  themeClinic = sh 
        })

        localStorage.setItem("clinic", JSON.stringify(themeClinic));
        localStorage.setItem("user", JSON.stringify({ ...User, permissions: permisos}));
        localStorage.setItem('turnOn', Turno)
        /* Configuración del tema de la clinica  */
        //const { theme } = themeClinic
        const configDrawer = themeClinic.theme.tipobarlateral.split(',')

        localStorage.setItem("navbarTypes", themeClinic.theme.tipobarnave);
        localStorage.setItem("colorcustomchart-mode", themeClinic.theme.cuadrocolor);
        localStorage.setItem("color-mode", themeClinic.theme.tipo);
        localStorage.setItem("dir-mode", themeClinic.theme.mododir);
        localStorage.setItem("sidebar-style", themeClinic.theme.estilobarlateral);
        localStorage.setItem("colorcustom-mode", themeClinic.theme.modificolor);
        localStorage.setItem("colorcustominfo-mode", themeClinic.theme.infocolor);
        localStorage.setItem("sidebarType", JSON.stringify(configDrawer));
        localStorage.setItem("sidebar", themeClinic.theme.barlateral);
        
        window.location.href = "diary";
        return
    })
    .catch(error => console.log(error.message))
    //var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
}

/* Si el usuario esta en el campo password podra activar la validacion con la tecla enter */
$("#password").keyup(function (event) {
    if (event.which === 13) {
        validateLogin();
    }
});

/* Comprobar si hay anuncios */
const viewBreakNews = () => {
    document.getElementById('logoUpperSign').style.top = '0px';
    document.getElementById('breakNews').style.display = 'none';
}

viewBreakNews()
addSelect()