
let nombreForm = document.getElementById('nombreForm')
let apellidoForm = document.getElementById('apellidoForm')

//#region FUNCIONES

ValidacionFormulario = (nombre, apellido) => {

    let mensajeError = document.getElementById('contenedorDatos')
    let estadoValidacion = false
    let nombreVal = nombre.trim()
    let apellidoVal = apellido.trim()

    if (nombreVal.length == 0) {
        estadoValidacion = false
        mensajeError.innerHTML = ' <span class="mensaje-error" id="mensajeError"> El campo Nombre es obligatorio </span>'
        CerrarMensaje()
    } else if (apellidoVal.length == 0) {
        estadoValidacion = false
        mensajeError.innerHTML = ' <span class="mensaje-error" id="mensajeError" > El campo Apellido es obligatorio </span>'
        CerrarMensaje()
    }
    else {
        estadoValidacion = true
    }

    return estadoValidacion

}

GuardarUsuario = () => {

    document.getElementById('contenedorDatos').innerHTML = ' <span class="mensaje-cargando"> Cargando... </span>'

    let nombre = nombreForm.value
    let apellido = apellidoForm.value

    let validacion = ValidacionFormulario(nombre, apellido)

    if (validacion) {

        nombreForm.setAttribute('readOnly', '')
        apellidoForm.setAttribute('readOnly', '')

        /**/

        axios.post('https://jsonplaceholder.typicode.com/posts', {
            title: nombre,
            body: apellido
        }).then(
            res => {
                console.log(res.data)
                document.getElementById('formularioDatos').reset()

                nombreForm.removeAttribute('readOnly')
                apellidoForm.removeAttribute('readOnly')


                document.getElementById('contenedorDatos').innerHTML = ` <span class="mensaje-exitoso">Dato guardado con éxito </span>
                <br> <br>
                <div class="card">                        
                    <span class="campo-nombre">Nombre :</span> <span class="valor-nombre">${nombre}</span> <br>
                    <span class="campo-apellido">Apellido :</span> <span class="valor-apellido">${apellido}</span> <br>
                </div>`
            }
        ).catch(error => {
            console.log(error)
            document.getElementById('contenedorDatos').innerHTML = '<span class="mensaje-error">No se pudo conectar con el servidor </span>'
            nombreForm.removeAttribute('readOnly')
            apellidoForm.removeAttribute('readOnly')
        })
    }
}

CerrarMensaje = () => {
    setTimeout(() => {
        document.getElementById('mensajeError').classList.add('cerrar-mensaje')
    }, 3000)
}
//#endregion 


//#region EVENTOS DEL DOM

document.getElementById('btnGuardarDatos').addEventListener('click', (e) => {
    e.preventDefault()
    GuardarUsuario()
})

//#endregion


