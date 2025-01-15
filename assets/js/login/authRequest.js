const userAuth = async (user, pass) => {
    try {
        const response = await fetch(`/Login/GetLogin?sUser=${user}&sPass=${pass}`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        alert(error.message);
        throw error; // Rechaza la promesa con el error capturado
    }
}

const GetIDsPeticiones = (data) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/ComparacionLaboratorios/GetIDsPeticiones',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: data,
            success: function (response) {
                resolve(response);
            },
            error: function (response) {
                messageAlert('error', response.responseText)
                reject(response.responseText);
            },
            failure: function (response) {
                messageAlert('error', response.responseText)
                reject(response.responseText);
            }
        });
    });
}
