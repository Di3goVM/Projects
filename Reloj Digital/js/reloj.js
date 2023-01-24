//declarar clase:

class Reloj {
    constructor(hora,minutos,segundos){
        this.botonEncendido = false; 
        this.botonFecha = false;
        this.hora = hora;
        this.minutos = minutos;
        this.segundos = segundos;
        this.cSegundos = 0;
        this.cCentesimas = 0;
        this.cMinutos = 0;
        this.intervaloTiempo = 0;
        this.intervaloCronometro = 0;
    }

    encenderReloj(colorPantalla){
        if(this.botonEncendido == false){
            
            this.botonEncendido = true;
            colorPantalla.style.color = "rgb(208, 236, 236)";
            this.mostrarPantalla();

        } else {
            
            this.botonEncendido = false;
            this.mostrarPantalla();
            this.mostrarCronometro();
            colorPantalla.style.color = "rgb(113, 133, 133)";
            
           
            
        }
        

    }

    mostrarPantalla(){
        if(this.botonEncendido == true){
        this.intervaloTiempo = setInterval(() => {

            const local = new Date();
        
            this.hora.innerHTML = local.getHours();
            this.minutos.innerHTML = local.getMinutes();
            this.segundos.innerHTML = local.getSeconds();
            
            this.hora.innerHTML = this.hora.innerHTML.padStart(2, "0");
            this.minutos.innerHTML = this.minutos.innerHTML.padStart(2, "0");
            this.segundos.innerHTML = this.segundos.innerHTML.padStart(2, "0");
            
            
            
        }, 1000);
        
        } else {
            clearInterval(this.intervaloTiempo);
            this.hora.innerHTML = "00";
            this.minutos.innerHTML = "00";
            this.segundos.innerHTML = "00";

            
        }
    }

    mostrarFecha(){
        if(this.botonEncendido == true){

            displayCalendario.classList.toggle('calendarioDesactivado');
            tiempoPantalla.forEach(elemento => {
            elemento.classList.toggle('desactivar');
            });
            puntosPantalla.forEach(elemento => {
            elemento.classList.toggle('desactivar');
            });   

        const mesesNombre = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

        const local = new Date();

        let dia = local.getDate(),
            mes = local.getMonth(),
            año = local.getFullYear();

        insertarFecha.innerHTML =`${dia} de ${mesesNombre[mes]} del ${año}`;
        }

        
    }

    mostrarClima(){
        if(this.botonEncendido === true){
            displayClima.classList.toggle('climaDesactivado');
            tiempoPantalla.forEach(elemento => {
            elemento.classList.toggle('desactivar');
            });
            puntosPantalla.forEach(elemento => {
            elemento.classList.toggle('desactivar');
            });
            }
    }

    mostrarCronometro(){
        clearInterval(this.intervaloTiempo);
        this.hora.innerHTML = "00";
        this.minutos.innerHTML = "00";
        this.segundos.innerHTML = "00";

    }

    calcularCronometro(comenzar,detener){
            
            const llevarPantalla = () =>{
                this.hora.innerHTML = this.cMinutos.toString().padStart(2, "0");
                this.minutos.innerHTML = this.cSegundos.toString().padStart(2, "0");
                this.segundos.innerHTML = this.cCentesimas.toString().padStart(2, "0"); 
            }

            if(comenzar == true && this.botonEncendido == true){
            
        
            const sumarMinuto = () =>{
                if(this.cMinutos < 99) this.cMinutos++;
            }

            const sumarSegundo = () =>{
                if(this.cSegundos == 59){
                    this.cSegundos = 0;
                    sumarMinuto();
                }
                else{
                    this.cSegundos++;
                    
                }
            }
            
            const incrementar = () =>{    
                if(this.cCentesimas == 99){
                this.cCentesimas = 0;
                sumarSegundo();
                }
                else{
                    this.cCentesimas++;
                }
            }
    
        

            this.intervaloCronometro = setInterval(() => {
                incrementar();
                llevarPantalla();
            },10);
            }else{
                clearInterval(this.intervaloCronometro);
                llevarPantalla();
                
                if(detener == true){
                
                this.cCentesimas = 0;
                this.cSegundos = 0;
                this.cMinutos = 0;

                llevarPantalla();
                
                detener = false;
                }
            }

            console.log(detener);
            
        
    }
}

//declarar variables y objeto:

//Hora del reloj:
const horaReloj = document.getElementById('hora');
const minutosReloj = document.getElementById('minutos');
const segundosReloj = document.getElementById('segundos');
const pantalla = document.querySelector('.marco-reloj');
const tiempoPantalla = document.querySelectorAll('.tiempo');
const puntosPantalla = document.querySelectorAll('.puntos'); 

//botones del reloj:

const botonesPrincipales = document.querySelector(".botones-principales");

const encendido = document.querySelector('.botonInicio');
const fecha = document.getElementById('fecha');
const cronometro = document.getElementById('cronometro');
const timbre = new Audio('js/botonEncendido.mp3');
const clima = document.getElementById('clima');

//clima variables:
const displayClima = document.querySelector('.clima');

//calendario variable:
 const displayCalendario = document.querySelector('.calendario');
 const insertarFecha = document.getElementById('fechaEnPantalla');

// botones cronometro:

const play = document.getElementById("playAndPauseCronometro");
const stop = document.getElementById("stopCronometro");
const backToMenu = document.getElementById("backToMenu");

//display pertenece a la clase:

const display = new Reloj(horaReloj,minutosReloj,segundosReloj);

//API:

window.addEventListener('load', ()=>{
    let lon;
    let lat;

    let temperatura = document.getElementById('grados');
    let iconoAnimado = document.getElementById('iconoAnimado');
    let descripcion = document.getElementById('descripcion');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( posicion => {
            lon = posicion.coords.longitude;
            lat = posicion.coords.latitude;

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1c4ec1ff3ed33e0f6bd9d714c833ba4b`;

            fetch(url)
             .then( response => { return response.json()})
             .then(data => {
                let temp = Math.round(data.main.temp);
                temp = kelvinGrados(temp);
                temperatura.textContent = `${temp}°C`;
                desc = data.weather[0].description;
                descripcion.textContent = desc;

                console.log(data.weather[0].main)
                switch (data.weather[0].main) {
                    case 'Thunderstorm':
                      iconoAnimado.src='animated/thunder.svg'
                      console.log('TORMENTA');
                      break;
                    case 'Drizzle':
                      iconoAnimado.src='animated/rainy-2.svg'
                      console.log('LLOVIZNA');
                      break;
                    case 'Rain':
                      iconoAnimado.src='animated/rainy-7.svg'
                      console.log('LLUVIA');
                      break;
                    case 'Snow':
                      iconoAnimado.src='animated/snowy-6.svg'
                        console.log('NIEVE');
                      break;                        
                    case 'Clear':
                        iconoAnimado.src='animated/day.svg'
                        console.log('LIMPIO');
                      break;
                    case 'Atmosphere':
                      iconoAnimado.src='animated/weather.svg'
                        console.log('ATMOSFERA');
                        break;  
                    case 'Clouds':
                        iconoAnimado.src='animated/cloudy-day-1.svg'
                        console.log('NUBES');
                        break;  
                    default:
                      iconoAnimado.src='animated/cloudy-day-1.svg'
                      console.log('por defecto');
                  }
                
             })
             .catch( error =>{
                console.log(error);
             })
        })
    }
})

//funciones clima:

clima.onclick = function(){
    display.mostrarClima();
}

function kelvinGrados(valor){
    return parseInt(valor - 273.15);
}

//Programando llamadas:

encendido.onclick = function(){
    encendido.classList.toggle('active');
    display.encenderReloj(pantalla);
    timbre.play();
}

fecha.onclick = function(){
    display.mostrarFecha();
}

//funciones cronometro:
let playAndPause = false;
let stopCronometro = false;

cronometro.onclick = function(){
    botonesPrincipales.classList.toggle('cronometroActivo');
    display.mostrarCronometro();
    
}
backToMenu.onclick = function(){
    botonesPrincipales.classList.toggle('cronometroActivo');
    stopCronometro = true;
    playAndPause= false;
    display.calcularCronometro(playAndPause,stopCronometro);
    stopCronometro = false;
    display.mostrarPantalla();
}

play.onclick = function(){
    if(playAndPause == false){
    playAndPause = true;
    display.calcularCronometro(playAndPause,stopCronometro);
    }else{
    playAndPause = false;
    display.calcularCronometro(playAndPause,stopCronometro);  
    }
}

stop.onclick = function(){
    stopCronometro = true;
    playAndPause= false;
    display.calcularCronometro(playAndPause,stopCronometro);
    stopCronometro = false;
}

