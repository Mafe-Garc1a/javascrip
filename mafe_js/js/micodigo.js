

const equipos = JSON.parse(localStorage.getItem("equipos")) || [];
const marcas =  JSON.parse(localStorage.getItem("marcas")) || [];
const stock =  JSON.parse(localStorage.getItem("stock")) || [];

imprimirEquipos();

//cambiar por modales los prompt
const addEquipo= document.getElementById("addEquipos");
addEquipo.addEventListener("click" ,()=>{
    
        const nombreEquipo1 =document.getElementById("nombreEquipo");
        let nombreEquipo=nombreEquipo1.value;
        console.log(nombreEquipo);
        const marcaEquipo1=document.getElementById("MarcaEquipo");
        let marcaEquipo=marcaEquipo1.value;
        const cantidadEquip=document.getElementById("cantidadEquipo");
        let cantidadEquipo=parseInt(cantidadEquip.value);

        let captura = -1;
        // el ciclo recorre todo el arreglo para poder buscar el nuevo equipo
        for(let i = 0; i < equipos.length; i++){
            // si el equipo y la marca ya estan en los arreglos captura en que indice
            if (nombreEquipo == equipos[i] && marcaEquipo  == marcas[i]){
                captura = i;
            };
        };
        
        // si la captura es diferente a -1 es porque encontro el equipo y la marca
        // entonces simplemente adicionar la cantidad en ese indice
        if (captura != -1){
            stock[captura] += cantidadEquipo;
        }else{
            // si no en es diferente a -1  es porque no encontro coincidencias
            // entonces agregamos todo a un nuevo indice de los arreglos
            equipos.push(nombreEquipo);
            marcas.push(marcaEquipo);
            stock.push(cantidadEquipo);
            
        };
        nombreEquipo1.value="";
        marcaEquipo1.value="";
        cantidadEquip.value="";
        imprimirEquipos();
        localStorage.setItem('equipos', JSON.stringify(equipos));
        localStorage.setItem('marcas', JSON.stringify(marcas));
        localStorage.setItem('stock', JSON.stringify(stock));
} );


function imprimirEquipos(){
    
    // se recomienda cambiar DOM.
const cuerpoequipos = document.getElementById ("equipos");
cuerpoequipos.innerHTML = "" ; // se limpia cuerpo de la tabla 
for (let i=0 ; i<equipos.length ; i++){
    //se crea la fila
    const fila =document.createElement("tr");
    for(let k=0 ; 3>=k ; k++){
        // se crea o captura el elemento td (celdas)
        const td = document.createElement("td");
        (k==0) ? td.textContent=equipos[i] : false;
        (k==1) ? td.textContent=marcas[i] : false;
        (k==2) ? td.textContent=stock[i] : false;
        fila.appendChild(td);

    };
    cuerpoequipos.appendChild(fila); //esta capturando todo lo que se guardo en las filas
};

}

const nombresInstructores = JSON.parse(localStorage.getItem("nombresInstru")) ||[];
const identificacionInstructores =JSON.parse(localStorage.getItem("identificacionInstru")) || [];
imprimirInstructores();
const addInstructor=document.getElementById("addInstructor");
addInstructor.addEventListener("click" , ()=>{
    const inputID = document.getElementById('inputIdInstructor');
    let identificacion = inputID.value;
    let verificar = identificacionInstructores.indexOf(identificacion);
    
    if (verificar == -1){
        const inputNombre = document.getElementById('inputNombre');
        let nombre = inputNombre.value;
        identificacionInstructores.push(identificacion);
        nombresInstructores.push(nombre);
        
    }else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "el instructor ya esta registrado!",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
    }
    
    inputID.value = '';
    inputNombre.value = '';

    imprimirInstructores();
    localStorage.setItem('nombresInstru', JSON.stringify(nombresInstructores));
    localStorage.setItem('identificacionInstru', JSON.stringify(identificacionInstructores));
});


function imprimirInstructores(){
    const tbodyInstructores = document.getElementById('instructores');
    tbodyInstructores.innerHTML = ""; 
    for(let i=0 ; i<=nombresInstructores.length ; i++){
        const fila = document.createElement("tr");
        for (let j=0 ; 2>=j ; j++ ){
            const td = document.createElement("td");
            (j==0) ? td.textContent = identificacionInstructores[i] : false;
            (j==1) ? td.textContent = nombresInstructores[i] : false;
            fila.appendChild(td);
        };
        tbodyInstructores.appendChild(fila);
    };
};

let equiposPrestados = JSON.parse(localStorage.getItem("equiposPres")) || [];
let marcasPrestadas = JSON.parse(localStorage.getItem("marcasPres")) || [];
let cantidadPrestada =  JSON.parse(localStorage.getItem("cantidadPres")) ||[];
let instructoresPrestan =  JSON.parse(localStorage.getItem("InstruPres")) ||[];
imprimirPrestamos();
const prestarEquipos= document.getElementById("prestarEquipos");
prestarEquipos.addEventListener("click" , ()=> {
    
    const equipoPrestar = document.getElementById("equipoPrestar").value;
    const marcaPrestar = document.getElementById("marcaPrestar").value;
    console.log(equipoPrestar, marcaPrestar);
    
    let captura = -1;
    // El ciclo recorre todo el arreglo para poder buscar el nuevo equipo
    for (let i = 0; i < equipos.length; i++) {
        // Si el equipo y la marca ya están en los arreglos captura en qué índice
        if (equipoPrestar == equipos[i] && marcaPrestar == marcas[i]) {
            captura = i;
        };
    };
    const idPresta = document.getElementById("instructorPrestar").value;
            for(let j=0 ; j<identificacionInstructores.length ; j++ ){
                if(idPresta==identificacionInstructores[j]){
                    if (captura == -1) {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "El equipo no existe!",
                            footer: '<a href="#">Why do I have this issue?</a>'
                        });
                    } else {
                        const cantidadPresta = document.getElementById("cantidadPrestar");
                        let cantidadPrestar = parseInt(cantidadPresta.value);
                        if (cantidadPrestar <= stock[captura]) {
                            let captura2 = -1;
                
                            
                
                            for (let i = 0; i < equiposPrestados.length; i++) {
                                if (idPresta == instructoresPrestan[i] && equipoPrestar == equiposPrestados[i] && marcaPrestar == marcasPrestadas[i]) {
                                    captura2 = i;
                                };
                            };
                
                            if (captura2 == -1) {
                                instructoresPrestan.push(idPresta);
                                equiposPrestados.push(equipoPrestar);
                                marcasPrestadas.push(marcaPrestar);
                                cantidadPrestada.push(cantidadPrestar);
                                
                            } else {
                                cantidadPrestada[captura2] += cantidadPrestar;
                            };
                
                            stock[captura] -= cantidadPrestar;
                        } else {
                            
                        };
                        
                    };
                    equipoPrestar.value="";
                    marcaPrestar.value="";
                    imprimirPrestamos();
                    imprimirEquipos();
                    localStorage.setItem('equiposPres', JSON.stringify(equiposPrestados));
                    localStorage.setItem('marcasPres', JSON.stringify(marcasPrestadas));
                    localStorage.setItem('cantidadPres', JSON.stringify(cantidadPrestada));
                    localStorage.setItem('InstruPres', JSON.stringify(instructoresPrestan));
                    
                }else{
                    console.log("no encontrado");
                    let verificar3= identificacionInstructores.indexOf(idPresta);
                    if(verificar3==-1){
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "No esta registrado este instrutor!",
                            footer: '<a href="#">Why do I have this issue?</a>'
                        });
                    }  
        };
        
    };
    
});


function imprimirPrestamos(){
    const tbodyPrestamos = document.getElementById('prestamos');
    tbodyPrestamos.innerHTML = "";
    for (let i=0 ; i<equiposPrestados.length ; i++){
        const fila = document.createElement("tr");
        for (let f=0 ; 4>=f ; f++){
            const td= document.createElement("td");
            (f==0) ? td.textContent = instructoresPrestan[i] : false;
            (f==1) ? td.textContent = equiposPrestados[i] : false;
            (f==2) ? td.textContent = marcasPrestadas[i] : false;
            (f==3) ? td.textContent = cantidadPrestada[i] : false;
            fila.appendChild(td);
        };
        tbodyPrestamos.appendChild(fila);
    };
    console.log(equiposPrestados);
};
const devolverPrestamo =document.getElementById("devolver");
devolverPrestamo.addEventListener("click" , ()=>{
    const idInstructor = document.getElementById("instructorPrestar2").value;
    const nombreEquipo = document.getElementById("nombreEquipo2").value;
    const marcaEquipo = document.getElementById("MarcaEquipo2").value;
    let captura = -1;

    for (let i = 0; i < equiposPrestados.length; i++ ){
        if( idInstructor == instructoresPrestan[i] &&  nombreEquipo == equiposPrestados[i] && marcaEquipo == marcasPrestadas[i] ){
            captura = i;
        };
    };

    if (captura == -1){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "no hay prestamos  con esa informacion!",
            footer: '<a href="#">Why do I have this issue?</a>'
            });
    }else{
        let cantidadDevolver1 = document.getElementById("cantidadEquipo2");
        let cantidadDevolver=parseInt(cantidadDevolver1.value);
        console.log(cantidadDevolver);
        if(cantidadDevolver <= cantidadPrestada[captura]){
            cantidadPrestada[captura] -= cantidadDevolver;
            if (cantidadPrestada[captura] == 0){
                // eliminar datos de los arreglos de prestamos.
                instructoresPrestan.splice(captura, 1);
                equiposPrestados.splice(captura, 1);
                marcasPrestadas.splice(captura, 1);
                cantidadPrestada.splice(captura, 1);
            };
            for(let i = 0; i < equipos.length; i++){
                // si el equipo y la marca ya estan en los arreglos captura en que indice
                if (nombreEquipo == equipos[i] && marcaEquipo == marcas[i]){
                    stock[i] += cantidadDevolver;
                };
            };

        }else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "la cantidad supera lo que prestaste!",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        };
    };
    imprimirPrestamos();
    imprimirEquipos();
});
function limpiar(){
    equipos=[];
    marcas=[];
    stock=[];
    nombresInstructores=[];
    identificacionInstructores=[];
    
};