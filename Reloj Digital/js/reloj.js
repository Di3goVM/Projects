//declarar clase:

class Reloj {
    constructor(tiempo){
        this.botonEncendido = false;
        this.botonFecha = "";
        this.botonCronometro = "";
        this.pantalla = tiempo;
        this.intervalo = 0;
    }

    encenderReloj(){
        if(this.botonEncendido == false){
            
            this.botonEncendido = true;
            this.pantalla.style.color = "rgb(208, 236, 236)";
            this.mostrarPantalla();

        } else {
            
            this.botonEncendido = false;
            this.mostrarPantalla();
            this.pantalla.innerHTML = "00:00:00";
            this.pantalla.style.color = "rgb(113, 133, 133)";
            
        }
    }

    mostrarPantalla(){
        if(this.botonEncendido == true){
        this.intervalo = setInterval(() => {

            const local = new Date();
        
            this.pantalla.innerHTML = local.toLocaleTimeString();

            
            
            
        }, 1000);
        
        } else {
            clearInterval(this.intervalo);

            
        }
    }
}





//declarar variables y objeto:

const hora = document.getElementById('hora');

const display = new Reloj(hora);

