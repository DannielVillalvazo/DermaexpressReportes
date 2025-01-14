/* Llamamos las variables de entorno */
const envSec = envirement();

const sessionActive = (petition) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (petition === 'login') {
        if (user) {
            const { id_rol } = user;           
            if (id_rol === 1)
                window.location.href = "diary";
            if (id_rol === 2)
                window.location.href = "diary";
            if (id_rol === 3)
                window.location.href = "diary";
            if (id_rol === 4)
                window.location.href = "diary";
            if (id_rol === 5)
                window.location.href = "diary";
            if (id_rol === 6)
                window.location.href = "diary";
            if (id_rol === 7)
                window.location.href = "diary";        
            if (id_rol === 8)
                window.location.href = "reports";
            if (id_rol === 9)
                window.location.href = "diary";
            if (id_rol === 10)
                window.location.href = "diary";
            if (id_rol === 11)
                window.location.href = "WaitingList";
            return
        }
    } else if (petition !== 'login') {
        if (!user) {
            window.location.href = "/";
            localStorage.clear();
            sessionStorage.clear();
        };

        return
        fetch(`${envSec.rutes.back}${envSec.controllers.diary}`)
        .then(response => response.json())
        .then(result => {
        })
        .catch(error => Alert('error', error.message))

    }
}

const destroySession = () => {
    /* Llamamos las variables de entorno */
    const { rutes, controllers } = envirement();
    const { id_usuario } = JSON.parse(localStorage.getItem('user'));
    fetch(`${rutes.back}${controllers.login}logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ idUser: id_usuario })
    })
    .then(response => response.json())
    .then(result => {
        if (result.conflicts !== null) {
            Alert('error', result.conflicts.Description);
            return
        }
        const { Success } = result;
        Alert('error', Success.Description);
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/";
    })
    .catch(error => Alert('error', error.message))
}