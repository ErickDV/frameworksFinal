//Funcion para obtener el token a traves de localStorage
export function getAuthHeaders() {
    let headers = null;

    if(localStorage.getItem("token")){
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token"),
                'Role': "bearer " + localStorage.getItem("roleToken")
            }
        }
    }

    return headers;
}
