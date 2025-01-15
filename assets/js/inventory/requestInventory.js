const GetItems = async (user, pass) => {
    try {
        const response = await fetch(`/Home/GetItems`, {
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