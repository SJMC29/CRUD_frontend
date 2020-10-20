console.log('holaaa');

var crear = document.getElementsByName("formularioArray")[0];
var leer = document.getElementsByName("formularioArray")[1];
var actualizar = document.getElementsByName("formularioArray")[2];
var borrar = document.getElementsByName("formularioArray")[3];
var botones = document.getElementsByName("formularioArray")[4];


crear.style.display = "block";
leer.style.display = "none";
actualizar.style.display = "none";
borrar.style.display = "none";

botones.addEventListener('submit', function (e) {
  e.preventDefault();

  switch (e.submitter.id) {
    case "contact-crear":
      crear.style.display = "block";
      leer.style.display = "none";
      actualizar.style.display = "none";
      borrar.style.display = "none";
    break;

    case "contact-leer":
      console.log('me diste un click');  
  
  fetch('/basedatos/consultatotalpacientes')
     .then((res) => res.json())
     .then((data) => {      
       console.log(data.length);
       var numColumnas = 3;
       var numFilas = data.length;
       var codigoHTML="<table border=\" 1 \"><tbody>";//border=\" 1 \"
         codigoHTML+="<tr><td><b> Nombre </b></td><td><b> Apellido </b></td><td><b> Identificaci&oacuten </b></td></tr>";
         codigoHTML+="<tr>";
         for (let i = 0; i < numFilas; i++) {
           codigoHTML+="<td>"+data[i].nombre+"</td>";  
           codigoHTML+="<td>"+data[i].apellido+"</td>";  
           codigoHTML+="<td>"+data[i].numid+"</td>";           
           codigoHTML+="</tr>";
         }
       codigoHTML+="</tbody></table>";
       leer.innerHTML = codigoHTML;
     });

      crear.style.display = "none";
      leer.style.display = "block";
      actualizar.style.display = "none";
      borrar.style.display = "none";
    break;

    case "contact-actualizar":
      crear.style.display = "none";
      leer.style.display = "none";
      actualizar.style.display = "block";
      borrar.style.display = "none";
      break;

    case "contact-borrar":
      crear.style.display = "none";
      leer.style.display = "none";
      actualizar.style.display = "none";
      borrar.style.display = "block";
      break;

    default:
      console.log("error");
      break;
    }
  }
);

crear.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('me diste un click');
  let datos = new FormData(crear);
  let nombrepaciente = datos.get('nombre');
  let apellidopaciente = datos.get('apellido');
  let idpaciente = datos.get('identificacion');

  let myHeaders = new Headers();

  const options = {
    method: 'POST',
    headers: myHeaders,
    body: new URLSearchParams({
      'nombre': nombrepaciente,
      'apellido': apellidopaciente,
      'numid': idpaciente
    }),
  }

  fetch('/basedatos/insertarpaciente', options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});

actualizar.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('me diste un click');
  let datos = new FormData(actualizar);
  let nombrepaciente = datos.get('nombre');
  let apellidopaciente = datos.get('apellido');
  let idpaciente = datos.get('identificacion');

  let myHeaders = new Headers();

  const options = {
    method: 'POST',
    headers: myHeaders,
    body: new URLSearchParams({
      'nombre': nombrepaciente,
      'apellido': apellidopaciente,
      'numid': idpaciente
    }),
  }

  fetch('/basedatos/actualizadototalpacientes', options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});

borrar.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('me diste un click');
  let datos = new FormData(borrar);
  let nombrepaciente = datos.get('nombre');
  let apellidopaciente = datos.get('apellido');
  let idpaciente = datos.get('identificacion');

  let myHeaders = new Headers();

  const options = {
    method: 'DELETE',
    headers: myHeaders,
    body: new URLSearchParams({
      'nombre': nombrepaciente,
      'apellido': apellidopaciente,
      'numid': idpaciente
    }),
  }

  fetch('/basedatos/borradototalpacientes', options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});
