//declarar clase:

class Reloj {
    constructor(hora,minutos,segundos){
        this.botonEncendido = false; 
        this.botonFecha = false;
        this.botonCronometro = false;
        this.hora = hora;
        this.minutos = minutos;
        this.segundos = segundos;
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
        if(this.botonFecha == false){
            console.log("boton activado");
            this.botonFecha = true;

        }
        else{
            console.log("boton desactivado");
            this.botonFecha = false;
        }
    }

    mostrarCronometro(){
        if(this.botonCronometro == false && this.botonEncendido == true){
            this.botonCronometro = true;
            this.calcularCronometro();
        }
        else{
            console.log("boton desactivado");
            this.botonCronometro = false;
            this.calcularCronometro();

        }
    }

    calcularCronometro(){
            clearInterval(this.intervaloTiempo);

            this.hora.innerHTML = "00";
            this.minutos.innerHTML = "00";
            this.segundos.innerHTML = "00";


            if(this.botonCronometro == true){
            let cCentesimas = 0;
            let cSegundos = 0;
            let cMinutos = 0;

            const sumarMinuto = () =>{
                if(cMinutos < 99) cMinutos++;
            }

            const sumarSegundo = () =>{
                if(cSegundos == 59){
                    cSegundos = 0;
                    sumarMinuto();
                }
                else{
                    cSegundos++;
                    
                }
            }
            
            const incrementar = () =>{    
                if(cCentesimas == 99){
                cCentesimas = 0;
                sumarSegundo();
                }
                else{
                    cCentesimas++;
                }
            }
    
        

            this.intervaloCronometro = setInterval(() => {
            incrementar();

             this.hora.innerHTML = cMinutos.toString().padStart(2, "0");
             this.minutos.innerHTML = cSegundos.toString().padStart(2, "0");
             this.segundos.innerHTML = cCentesimas.toString().padStart(2, "0");
            },10);
            }
            else{
                clearInterval(this.intervaloCronometro);
                this.mostrarPantalla();
            }
        
    }
}





//declarar variables y objeto:

const horaReloj = document.getElementById('hora');
const minutosReloj = document.getElementById('minutos');
const segundosReloj = document.getElementById('segundos');
const pantalla = document.querySelector('.marco-reloj');

const encendido = document.querySelector('.botonInicio');
const fecha = document.getElementById('fecha');
const cronometro = document.getElementById('cronometro');
const timbre = new Audio('js/botonEncendido.mp3');

const display = new Reloj(horaReloj,minutosReloj,segundosReloj);

//Programando llamadas:

encendido.onclick = function(){
    encendido.classList.toggle('active');
    display.encenderReloj(pantalla);
    timbre.play();
}

fecha.onclick = function(){
    display.mostrarFecha();
}

cronometro.onclick = function(){
    display.mostrarCronometro();
}