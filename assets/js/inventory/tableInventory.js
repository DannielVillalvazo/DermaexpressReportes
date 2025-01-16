var $table = $('#report-table')
let firstTime = true
const btnUpdate = document.getElementById("refreshTable");


const refreshData = () => {
    btnUpdate.disabled = true;
    loading("Cargando...")
    GetItems()
        .then(data => {
            Swal.close()
             
            if (!data.Success) { 
                mymessage("error", data.Error.Description)
                return
            } 
            // Actualizar la tabla
            $table.bootstrapTable("refreshOptions", { data: data.Data })
            // Mandar mensaje de Exito
            firstTime ? "" : mymessage("success", "Informaci\u00f3n actualizada")
            // Cambiar Variable de primera vez
            firstTime = false
            // Activar el boton
            btnUpdate.disabled = false;


        })
        .catch(error => {
            console.error("Error:", error)
        });
}
$(function () { 

    // Inicializar Tabla
    $table.bootstrapTable({ data: [] })
    refreshData();
   


})