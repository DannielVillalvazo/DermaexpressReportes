var $table = $('#report-table')
let firstTime = true


const refreshData = () => {
    GetItems()
        .then(data => {
             
            if (!data.Success) { 
                mymessage("error", data.Error.Description)
                return
            } 

            $table.bootstrapTable("refreshOptions", { data: data.Data })

            firstTime ? "" : mymessage("success", "Informaci\u00f3n actualizada")

            firstTime = false

        })
        .catch(error => console.error("Error:", error));
}
$(function () { 

    // Inicializar Tabla
    $table.bootstrapTable({ data: [] })
    refreshData();
   


})