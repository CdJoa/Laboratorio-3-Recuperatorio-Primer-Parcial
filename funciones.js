class Persona {
    constructor(id, nombre,apellido, edad) {
        
        this.id = id; 
        this.nombre = nombre;
        if (typeof nombre !== 'string' || nombre.trim() === '') {
            throw new Error("nombre debe ser un string no vacío");
        }

        this.apellido = apellido;
        if (typeof apellido !== 'string' || apellido.trim() === '') {
            throw new Error("apellido debe ser un string no vacío");
        }

        this.edad = edad;
        if (typeof edad !== 'number' || edad <= 15) {
            throw new Error("Edad debe ser superior a 15");
        }
    }
    toString() {
        return `Persona [ID: ${this.id}, nombre: ${this.nombre},  apellido: ${this.apellido}, Edad: ${this.edad}`;
    }
}

class Futbolista extends Persona {
    constructor(id, nombre,apellido, edad, equipo, posicion, cantidadGoles) {
        super(id, nombre,apellido, edad);

        this.equipo = equipo;
        if (typeof equipo !== 'string' || equipo.trim() === '') {
            throw new Error("equipo debe ser un string no vacío");
        }
        this.posicion = posicion;
        if (typeof posicion !== 'string' || posicion.trim() === '') {
            throw new Error("posicion debe ser un string no vacío");
        }

        if (typeof cantidadGoles !== 'number' || cantidadGoles <= -1) {
            throw new Error("cantidadGoles debe ser un número mayor a -1");
        }
        this.cantidadGoles = cantidadGoles;

    }

    toString() {
        return `Futbolista [ID: ${this.id}, nombre: ${this.nombre}, apellido: ${this.apellido}, Edad: ${this.edad}, Equipo: ${this.equipo}, Posición: ${this.posicion}, cantidadGoles: ${this.cantidadGoles}]`;
    }
}
class Profesional extends Persona {
    constructor(id, nombre,apellido, edad, titulo, facultad,añoGraduacion) {
        super(id, nombre,apellido, edad);

        if (typeof titulo !== 'string' || titulo.trim() === '') {
            throw new Error("titulo debe ser un string no vacío");
        }
        this.titulo = titulo;


        if (typeof facultad !== 'string' || facultad.trim() === '') {
            throw new Error("facultad debe ser un string no vacío");
        }
        this.facultad = facultad;

        if (typeof añoGraduacion !== 'number' || añoGraduacion <= 1950) {
            throw new Error("añoGraduacion debe ser un número mayor a 1950");
        }
        this.añoGraduacion = añoGraduacion;
    }

    toString() {
        return `Profesional [ID: ${this.id}, nombre: ${this.nombre}, apellido: ${this.apellido}, Edad: ${this.edad}, Título: ${this.titulo}, facultad: ${this.facultad}, Año de Graduación: ${this.añoGraduacion}]`;
    }
}
let Personas = [
    {"id":1, "nombre":"Marcelo", "apellido":"Luque", "edad":45, "titulo":"Ingeniero", "facultad":"UTN", "añoGraduacion":2002},
    {"id":2, "nombre":"Ramiro", "apellido":"Escobar", "edad":35, "titulo":"Medico", "facultad":"UBA", "añoGraduacion":2012},
    {"id":3, "nombre":"Facundo", "apellido":"Cairo", "edad":30, "titulo":"Abogado", "facultad":"UCA", "añoGraduacion":2017},
    {"id":4, "nombre":"Fernando", "apellido":"Nieto", "edad":18, "equipo":"Independiente", "posicion":"Delantero", "cantidadGoles":7},
    {"id":5, "nombre":"Manuel", "apellido":"Loza", "edad":20, "equipo":"Racing", "posicion":"Volante", "cantidadGoles":2},
    {"id":6, "nombre":"Nicolas", "apellido":"Serrano", "edad":23, "equipo":"Boca", "posicion":"Arquero", "cantidadGoles":0}
];


document.addEventListener('DOMContentLoaded', () => {
    actualizarEncabezados();
    rellenarTabla();

    document.querySelectorAll('#tabla-Personas thead').forEach(thead => {
        thead.addEventListener('click', evento => {
            if (evento.target.tagName === 'TH') {
                const indiceColumna = Array.from(evento.target.parentNode.children).indexOf(evento.target);
                ordenarTabla(indiceColumna);
            }
        });
    });
    
});

document.getElementById('filtro').addEventListener('change', function() {
    const filtro = this.value;
    const mostrarProfesional = filtro === '2';
    const mostrarFutbolista = filtro === '1';

    document.querySelector('.Profesional').style.display = mostrarProfesional ? 'inline' : 'none';
    document.querySelector('.Futbolista').style.display = mostrarFutbolista ? 'inline' : 'none';

    document.querySelectorAll('.Profesional input[type="checkbox"]').forEach(checkbox => checkbox.checked = mostrarProfesional);
    document.querySelectorAll('.Futbolista input[type="checkbox"]').forEach(checkbox => checkbox.checked = mostrarFutbolista);

    actualizarEncabezados();
    rellenarTabla();
});

document.querySelectorAll('#checklist input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', actualizarEncabezados);
});


function actualizarEncabezados() {
    const thead = document.querySelector("#tabla-Personas thead tr");
    thead.innerHTML = '';

    document.querySelectorAll("#checklist input[type='checkbox']:checked").forEach(checkbox => {
        const th = document.createElement('th');
        th.textContent = checkbox.parentElement.textContent.trim();
        thead.appendChild(th);
    });
}
function calcular() {
    const tbody = document.querySelector("#tabla-Personas tbody");
    
    const edadCeldaIndex = Array.from(document.querySelectorAll("#checklist input[type='checkbox']"))
        .findIndex(checkbox => checkbox.value === 'edad' && checkbox.checked);

    const edades = Array.from(tbody.querySelectorAll("tr"))
        .map(fila => edadCeldaIndex !== -1 ? parseFloat(fila.children[edadCeldaIndex].textContent) : null)
        .filter(edad => !isNaN(edad)); 

    const promedio = edades.length ? 
        (edades.reduce((sum, v) => sum + v, 0) / edades.length).toFixed(2) : 0;

    document.getElementById("promedio-edad").value = promedio;
}


document.getElementById("calcular-edad").addEventListener("click", calcular);



function rellenarTabla() {
    const filtro = document.getElementById('filtro').value;
    const checklist = Array.from(document.querySelectorAll("#checklist input[type='checkbox']"));
    const datosFiltrados = Personas.filter(Persona => filtrarPersonas(Persona, filtro, checklist));

    const tbody = document.querySelector("#tabla-Personas tbody");
    tbody.innerHTML = ''; 

    datosFiltrados.forEach(Persona => {
        const row = document.createElement('tr');
        checklist.forEach(checkbox => {
            if (checkbox.checked) {
                const cell = document.createElement('td');
                cell.textContent = Persona[checkbox.value] || "0"|| '';
                row.appendChild(cell);
            }
        });
        tbody.appendChild(row);
    });
}


function filtrarPersonas(Persona, filtro, checklist) {
    const esFutbolista = Persona.equipo !== undefined; 
    const esProfesional = Persona.titulo!== undefined; 

    if (filtro === '1' && !esFutbolista) return false; 
    if (filtro === '2' && !esProfesional) return false; 

    return checklist.every(checkbox => !checkbox.checked || Persona.hasOwnProperty(checkbox.value));
}

document.querySelectorAll('#checklist input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', rellenarTabla);
});

function alternarVisibilidad() {
    var x = document.getElementById("form-datos");
    var z = document.getElementById("form-ABM");

    if (z.style.display === "none" || z.style.display === "") {
        z.style.display = "block";
        x.style.display = "none";
    } else {
        z.style.display = "none";
        x.style.display = "block";
    }
}
document.getElementById('btn-agregar').addEventListener('click', function() {
    alternarVisibilidad();

    document.querySelectorAll('#form-ABM input').forEach(input => input.value = '');
    document.getElementById('filtro-abm').value = '0';
    document.getElementById('filtro-abm').dispatchEvent(new Event('change'));
});

function agregarNuevo() {
    const nombre = document.getElementById('abm-nombre').value;
    const apellido = document.getElementById('abm-apellido').value;

    const edad = parseInt(document.getElementById('abm-edad').value, 10);
    
    const filtroAbm = document.getElementById('filtro-abm').value;
    let nuevoPersona;
    let nuevoId = 1;
    while (Personas.some(v => v.id === nuevoId)) {
        nuevoId++;
    }

    if (filtroAbm === '1') {
        const equipo =document.getElementById('abm-equipo').value;
        const posicion =document.getElementById('abm-posicion').value;
        const cantidadGoles = parseInt(document.getElementById('abm-cantidadGoles').value);

        if (![nombre, apellido, equipo, posicion].every(v => typeof v === 'string' && v.trim() !== '') || 
            isNaN(edad) || edad <= 15 || 
            isNaN(cantidadGoles) || cantidadGoles <= -1) {
            console.error('Datos no válidos');
            return;
        }
        nuevoPersona = new Futbolista(nuevoId, nombre,apellido, edad, equipo, posicion, cantidadGoles);
        console.log(nuevoPersona.toString());

        } else if (filtroAbm === '2') { 
        const titulo = document.getElementById('abm-titulo').value;
        const facultad = document.getElementById('abm-facultad').value;
        const añoGraduacion = parseFloat(document.getElementById('abm-añoGraduacion').value);

        if (![nombre, apellido, titulo, facultad].every(v => typeof v === 'string' && v.trim() !== '') || 
            isNaN(edad) || edad <= 15 || 
            isNaN(añoGraduacion) || añoGraduacion < 1950) {
            console.error('Datos no válidos');
            return;
        }

        nuevoPersona = new Profesional(nuevoId, nombre, apellido, edad, titulo, facultad, añoGraduacion);
        console.log(nuevoPersona.toString());
    } else {
        console.error('Tipo de persona no válido');
        return; 
    }

    Personas.push(nuevoPersona);
    alternarVisibilidad();
    rellenarTabla();
}

document.getElementById('btn-agregar-abm').addEventListener('click', agregarNuevo);



document.getElementById('btn-cancelar').addEventListener('click', alternarVisibilidad);


function cargarDatosAbm(item) {
    const campos = ['id', 'nombre','apellido', 'edad', 'equipo', 'posicion','cantidadGoles', 'titulo', 'facultad','añoGraduacion'];
    campos.forEach(campo => {
        const elemento = document.getElementById(`abm-${campo}`);
        if (elemento) {
            elemento.value = item[campo] || '';
        }
    });

    const elementoFiltroAbm = document.getElementById('filtro-abm');
    elementoFiltroAbm.value = item.hasOwnProperty('equipo') ? '1' : item.hasOwnProperty('facultad') ? '2' : '0';
    elementoFiltroAbm.dispatchEvent(new Event('change'));
}

function seleccionarItemArray(id) {
    const Persona = Personas.find(Persona => Persona.id === id);
    if (Persona) {
        cargarDatosAbm(Persona); 
    }
    return Persona;
}


function modificarId() {
    const id = parseInt(document.getElementById('abm-id').value, 10);
    const Persona = Personas.find(v => v.id === id);
    const filtroAbm = document.getElementById('filtro-abm').value;

    if (Persona) {
        const nombre = document.getElementById('abm-nombre').value 
        const apellido = document.getElementById('abm-apellido').value 
        const edad = parseInt(document.getElementById('abm-edad').value, 10) 

        if (!nombre.trim() || !apellido.trim() || isNaN(edad) || edad <= 15) {
            console.error('Datos no válidos');
            return;
        }

        Persona.nombre = nombre;
        Persona.apellido = apellido;
        Persona.edad = edad;

        if (filtroAbm === '1') {
            const equipo =document.getElementById('abm-equipo').value;
            const posicion =document.getElementById('abm-posicion').value;
            const cantidadGoles = parseInt(document.getElementById('abm-cantidadGoles').value);

            if (![nombre, apellido, equipo, posicion].every(v => typeof v === 'string' && v.trim() !== '') || 
            isNaN(edad) || edad <= 15 || 
            isNaN(cantidadGoles) || cantidadGoles <= -1) {
            console.error('Datos no válidos');
            return;
        }
            Persona.posicion = posicion;
            Persona.equipo = equipo;
            Persona.cantidadGoles = cantidadGoles;

        } else if (filtroAbm === '2') { 
            const titulo = document.getElementById('abm-titulo').value;
            const facultad = document.getElementById('abm-facultad').value;
            const añoGraduacion = parseFloat(document.getElementById('abm-añoGraduacion').value);

            if (![nombre, apellido, titulo, facultad].every(v => typeof v === 'string' && v.trim() !== '') || 
            isNaN(edad) || edad <= 15 || 
            isNaN(añoGraduacion) || añoGraduacion < 1950) {
            console.error('Datos no válidos');
            return;}

            Persona.titulo = titulo;
            Persona.facultad = facultad;
            Persona.añoGraduacion = añoGraduacion;
            
        }

        rellenarTabla();
        alternarVisibilidad();

    } else {
        console.error('Persona no encontrada');
    }
}

document.getElementById('btn-modificar').addEventListener('click', modificarId);

function eliminarId() {
    const id = parseInt(document.getElementById('abm-id').value, 10);
    const objetoIndex = Personas.findIndex(obj => obj.id == id);

    if (objetoIndex !== -1) {
        Personas.splice(objetoIndex, 1);
        rellenarTabla(); 
        alternarVisibilidad(); 
    } else {
        console.error('persona no encontrado');
    }
}

document.getElementById('btn-eliminar').addEventListener('click', eliminarId);


document.getElementById('filtro-abm').addEventListener('change', function() {
    const filtroAbm = document.getElementById('filtro-abm').value;
    const Profesional = document.querySelector('#campos_faltantes .Profesional');
    const Futbolista = document.querySelector('#campos_faltantes .Futbolista');

    Profesional.style.display = 'none';
    Futbolista.style.display = 'none';

    if (filtroAbm === '1') {
        Futbolista.style.display = 'block';
    } else if (filtroAbm === '2') {
        Profesional.style.display = 'block';
    }
    else {
        Profesional.style.display = 'none';
        Futbolista.style.display = 'none';
    }
});


document.querySelector("#tabla-Personas tbody").addEventListener("dblclick", function (event) {
    const fila = event.target.closest('tr');
    if (fila) {
        const idCelda = fila.querySelector('td:first-child'); 
        const id = parseInt(idCelda.textContent, 10);
        if (!isNaN(id)) {
            const Persona = seleccionarItemArray(id);
            
            if (Persona) {
                alternarVisibilidad();
            }
        }
    }
});


function ordenarTabla(colIndex) {
    const tbody = document.querySelector("#tabla-Personas tbody");
    const filas = Array.from(tbody.querySelectorAll('tr'));

    const filasOrdenadas = filas.map(fila => {
        const texto = fila.children[colIndex].textContent.trim();
        const numero = parseFloat(texto);
        return {
            fila,
            valor: isNaN(numero) ? texto : numero
        };
    }).sort((a, b) => {
        return (typeof a.valor === 'number' && typeof b.valor === 'number')
            ? a.valor - b.valor 
            : a.valor.localeCompare(b.valor); 
    }).map(item => item.fila); 

    tbody.innerHTML = '';
    filasOrdenadas.forEach(fila => tbody.appendChild(fila));
}


