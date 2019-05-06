window.addEventListener('load', function(){

    //var laVariable = "hola";
    //localStorage.setItem('laVariable', 'hola');
    console.log(localStorage.getItem('laVariable'));

    var correo = document.querySelector('.correo');

    if(localStorage.getItem('correo') != null){
        correo.value = localStorage.getItem('correo');
    }

    function guardarCorreo(){
        localStorage.setItem('correo', correo.value);
    }
    correo.addEventListener('input', guardarCorreo);

    function cambioDeVariable(){
        //laVariable = "adios";
        localStorage.setItem('laVariable', 'adios');
        console.log(localStorage.getItem('laVariable'));
    }
    window.addEventListener('click', cambioDeVariable);

});