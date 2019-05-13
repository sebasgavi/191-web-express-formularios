window.addEventListener('load', function(){
    var form = document.querySelector('form');
    function enviarProductos(evento){
        //evento.preventDefault();
        console.log('hola');

        var input = document.querySelector('.input-productos');
        input.value = localStorage.getItem('listaProductos');

        localStorage.removeItem('listaProductos');
    }
    form.addEventListener('submit', enviarProductos);
});