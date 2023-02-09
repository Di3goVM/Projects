//declarar clase:

class Reloj {
    constructor(hora,minutos,segundos,minCronometro,segCronometro,cenCronometro,recordCronometro){
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
        this.minCronometro = minCronometro;
        this.segCronometro = segCronometro;
        this.cenCronometro = cenCronometro;
        this.recordCronometro = recordCronometro;
    }

    encenderReloj(){
        if(this.botonEncendido == false){
            
            this.botonEncendido = true;
            
            this.mostrarPantalla();

        } else {
            
            this.botonEncendido = false;
            this.mostrarPantalla();
            this.mostrarCronometro();
            
            
           
            
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

        if(this.botonEncendido == true){

            

            const mesesNombre = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    
            const local = new Date();
    
            let dia = local.getDate(),
                mes = local.getMonth(),
                año = local.getFullYear();

            dia = dia.toString().padStart(2, "0");
            insertarDiaFecha.innerHTML =`${dia},${mesesNombre[mes]} 21`;
            insertarAño.innerHTML =`${año}`
        }
    }

    mostrarFecha(){
    }

    mostrarClima(){
        if(this.botonEncendido === true){
            displayClima.classList.toggle('desactivado');
            displayTiempo.classList.toggle('desactivado');
            }
    }

    mostrarCronometro(){
        
        if(this.botonEncendido === true){
            displayCronometro.classList.toggle('desactivado');
            displayTiempo.classList.toggle('desactivado');
            }
        

    }

    calcularCronometro(comenzar,detener){
            
            const llevarPantalla = () =>{
                this.minCronometro.innerHTML = this.cMinutos.toString().padStart(2, "0");
                this.segCronometro.innerHTML = this.cSegundos.toString().padStart(2, "0");
                this.cenCronometro.innerHTML = this.cCentesimas.toString().padStart(2, "0"); 
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
                this.recordCronometro.innerHTML = `Tiempo anterior:"${this.cMinutos.toString().padStart(2, "0")}:${this.cSegundos.toString().padStart(2, "0")}:${this.cCentesimas.toString().padStart(2, "0")}"`;

                this.cCentesimas = 0;
                this.cSegundos = 0;
                this.cMinutos = 0;

                llevarPantalla();
                
                detener = false;
                }
            }

            console.log(detener);
            
        
    }
    backToMenu(){
        displayTiempo.className = "tiempo";
        displayClima.className = "clima desactivado";
        displayCronometro.className = "cronometro desactivado";
    }
}

//declarar variables y objeto:

//Hora del reloj:
const horaReloj = document.getElementById('hora');
const minutosReloj = document.getElementById('minutos');
const segundosReloj = document.getElementById('segundos');

//menu del reloj:

const power = document.getElementById('power');
const activarFecha = document.getElementById('activarFecha');
const activarCronometro = document.getElementById('activarCronometro');
const activarClima = document.getElementById('activarClima');
const back = document.querySelectorAll('.back');

//pantallas variables:

const displayTiempo = document.querySelector('.tiempo');
const displayClima = document.querySelector('.clima');
const displayCronometro = document.querySelector('.cronometro');
const displayFecha = document.querySelector('.fecha');


//calendario variable:
const insertarDiaFecha = document.querySelector('.diaFecha');
const insertarAño = document.querySelector('.año'); 

// botones cronometro:

const play = document.querySelector('.iniciar');
const stop = document.querySelector('.detener');

const minutosCronometro = document.getElementById('minutosCronometro');
const segundosCronometro = document.getElementById('segundosCronometro');
const centecimasCronometro = document.getElementById('centecimasCronometro');
const record = document.getElementById('record');
//display pertenece a la clase:

const display = new Reloj(horaReloj,minutosReloj,segundosReloj,minutosCronometro,segundosCronometro,centecimasCronometro,record);

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
                //descripcion.textContent = desc;
                console.log(data);
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
function kelvinGrados(valor){
    return parseInt(valor - 273.15);
}
//funciones botones menu:
power.onclick = function(){
    display.encenderReloj();
}

activarClima.onclick = function(){
    display.mostrarClima();
}

activarCronometro.onclick = function(){
    display.mostrarCronometro();
}

back.forEach(boton =>{
    boton.addEventListener('click',()=>display.backToMenu());
});

//funciones cronometro:
let playAndPause = false;
let stopCronometro = false;


back.onclick = function(){
    stopCronometro = true;
    playAndPause= false;
    display.calcularCronometro(playAndPause,stopCronometro);
    stopCronometro = false;
    display.mostrarPantalla();
}

play.onclick = function(){
    if(playAndPause == false){
    playAndPause = true;
    play.innerHTML = "Pausar";
    display.calcularCronometro(playAndPause,stopCronometro);
    }else{
    play.innerHTML = "Iniciar";    
    playAndPause = false;
    display.calcularCronometro(playAndPause,stopCronometro);  
    }
}

stop.onclick = function(){
    play.innerHTML = "Iniciar";
    stopCronometro = true;
    playAndPause= false;
    display.calcularCronometro(playAndPause,stopCronometro);
    stopCronometro = false;
}

