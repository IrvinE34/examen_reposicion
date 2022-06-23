var generarIdUnicoFecha = ()=>{
    let fecha = new Date();
    return Math.floor(fecha.getTime()/1000).toString(16);
};
var appvehiculos = new Vue({
    el: '#appvehiculos',
    data: {
        forms:{
            'vehiculo':{mostrar:false},
            
        }
    },
});
document.addEventListener('DOMContentLoaded', e=>{
    let formulario = document.querySelectorAll('.mostrar').forEach(formulario=>{
        formulario.addEventListener('click', evento=>{
            let formulario = evento.target.dataset.form;
            appvehiculos.forms[formulario].mostrar = true;
        });
    });
});