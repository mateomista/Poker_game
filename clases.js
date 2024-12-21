export class Carta {
   #valor;
   #etiqueta;
   #palo;

    constructor(valor, etiqueta, palo){
        this.#valor = valor;
        this.#etiqueta = etiqueta;
        this.#palo = palo;
    }

    get valor(){
        return this.#valor;
    }

    get etiqueta(){
        return this.#etiqueta;
    }

    get palo(){
        return this.#palo;
    }
}

export class Baraja {
    #valores = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    #etiquetas = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    #palos = ['Corazon', 'Diamante', 'Trebol', 'Pica'];
    #baraja = [];

    constructor(){
        for (let palo of this.#palos) {
            for (let i = 0; i < this.#valores.length; i++) {
                
                
                let carta = new Carta(this.#valores[i], this.#etiquetas[i], palo)
                
                this.#baraja.push(carta);
            }
        }
    }

    sacarCartaAlAzar() {
    
        let indiceAleatorio = Math.floor(Math.random() * this.baraja.length);
     
        let cartaAlAzar = this.#baraja[indiceAleatorio];
        
        this.baraja.splice(indiceAleatorio, 1);
        
        return cartaAlAzar;
    }     

    get baraja(){
        return this.#baraja;
    }

}

export class Player {
    #puntaje;
    #rankingCartas = ["Escalera real", "Escalera color", "Poker", "Full", "Color", "Escalera", "Trio", "Dos Pares", "Par", "Carta mas alta"];
    #mano;
    #bankroll;

    constructor(){
        this.#puntaje = 0;
        this.#mano = [];
        this.#bankroll = 20;
    }

    verificaEscaleraReal(mano) {

        const mismoPalo = mano.every(carta => carta.palo === mano[0].palo);
        
    
        const esEscaleraReal = 
            mano[0].valor === 10 &&
            mano[1].valor === 11 &&
            mano[2].valor === 12 &&
            mano[3].valor === 13 &&
            mano[4].valor === 14;
    
        if (mismoPalo && esEscaleraReal) {
            return {
                mano: "Escalera Real",
                cartas: mano
            };
        } else {
            return false;
        }
    }
    
    verificaEscaleraColor(mano){
        
        const mismoPalo = mano.every(carta => carta.palo === mano[0].palo);
    
        let escalera = false;
    
        for (let i = 0; i < mano.length - 1; i++) {
            if (mano[i].valor + 1 !== mano[i + 1].valor) {
                escalera=true;
            } else {
                return false;
            }
        }
    
        if (escalera && mismoPalo)  {
            return {
                mano: "Escalera color",
                cartas: mano
            };
        } else {
            return false;
        }
    
    }
    
    conteoPares(mano){
        
        let conteo = {};
    
        for (let carta of mano) {
            if (conteo[carta.valor]) {
                conteo[carta.valor] += 1;  
            } else {
                conteo[carta.valor] = 1;  
            }
        }
    
        return conteo;
    }
    
    verificaPoker(mano){
        
        let conteo = this.conteoPares(mano);
        let repeticiones = Object.values(conteo)
    
        if (repeticiones.includes(4)){
            let resultado = {
                mano: "Poker",
                cartas: mano
            }
            return resultado;
        } else {
            return false;
        }
        
    
    }
    
    verificaFull(mano){
        let conteo = this.conteoPares(mano);
        let repeticiones = Object.values(conteo);
    
        if (repeticiones.includes(2) && repeticiones.includes(3)) {
            let resultado = {
                mano: "Full",
                cartas: mano
            }
            return resultado;
        } else {
            return false;
        }
    
    }
    
    verificaColor(mano){
        
        const mismoPalo = mano.every(carta => carta.palo === mano[0].palo);
        
        if (mismoPalo){
            let resultado = {
                mano: "Color",
                cartas: mano
            }
            return resultado;
        }else{
            return false;
        }
    }
    
    verificaEscalera(mano){
        for (let i = 0; i < mano.length - 1; i++) {
            if (mano[i].valor + 1 !== mano[i + 1].valor) {
                return false;
            }
        }
        
        let resultado = {
            mano: "Escalera",
            cartas: mano
        };
        return resultado;
    }
    
    
    verificaTrio(mano){
        
        let conteo = this.conteoPares(mano);
        let repeticiones = Object.values(conteo)
        
        if (repeticiones.includes(3)) {
            let resultado = {
                mano: "Trio",
                cartas: mano
            }
            return resultado;
        } else {
            return false;
        }
        
    }
    
    verificaDosPares(mano){
        
        let conteo = this.conteoPares(mano);
        let repeticiones = Object.values(conteo)
        let pares = 0;
        
        for (let item of Object.keys(conteo)) {
            if (conteo[item]==2) {
                pares = pares + 1;
            }
        } 
        
        if (pares==2) {
            let resultado = {
                mano: "Dos pares",
                cartas: mano
            }
            return resultado;
        } else {
            return false;
        }
    }
    
    verificaPar(mano){
        
        let conteo = this.conteoPares(mano);
        let repeticiones = Object.keys(conteo)
        let pares = 0;
        
        for (let item of Object.keys(conteo)) {
            if (conteo[item]==2) {
                pares = pares + 1;
            }
        } 
            
        if (pares==1) {
            let resultado = {
                mano: "Par",
                cartas: mano
            };
            return resultado;
        } else {
            return false;
        }
    }
    
    verificaCartaAlta(mano) {
        
        let cartaMasAlta = mano[0];
    
        for (let carta of mano) {
            if (carta.valor > cartaMasAlta.valor) {
                cartaMasAlta = carta;
            }
        }
        
        return cartaMasAlta;
    }

    determinarMano() {
        

        let mano = {
            mano: "Carta mas alta",
            cartaAlta: this.verificaCartaAlta(this.#mano)
        }

        if (this.verificaEscaleraReal(this.#mano).mano == "Escalera Real") {
            mano.mano = this.#rankingCartas[0];
            return mano;
        } else if (this.verificaEscaleraColor(this.#mano).mano == "Escalera color") {
            mano.mano = this.#rankingCartas[1];
            return mano;
        } else if (this.verificaPoker(this.#mano).mano == "Poker") {
            mano.mano = this.#rankingCartas[2];
            return mano;
        } else if (this.verificaFull(this.#mano).mano == "Full") {
            mano.mano = this.#rankingCartas[3];
            return mano;
        } else if (this.verificaColor(this.#mano).mano == "Color") {
            mano.mano = this.#rankingCartas[4];
            return mano;
        } else if (this.verificaEscalera(this.#mano).mano == "Escalera") {
            mano.mano = this.#rankingCartas[5];
            return mano;
        } else if (this.verificaTrio(this.#mano).mano == "Trio") {
            mano.mano = this.#rankingCartas[6];
            return mano;
        } else if (this.verificaDosPares(this.#mano).mano == "Dos pares") {
            mano.mano = this.#rankingCartas[7];
            return mano;
        } else if (this.verificaPar(this.#mano).mano == "Par") {
            mano.mano = this.#rankingCartas[8];
            return mano;
        }               
        return mano;

    }

    get rankingCartas() {
        return this.#rankingCartas;
    }

    get mano(){
        return this.#mano;
    }

    set mano(mano){
        this.#mano = mano;
    }

    get bankroll (){
        return this.#bankroll;
    }

    set bankroll (bankroll){
        this.#bankroll = bankroll
    }
}

export class Jugador extends Player{

    constructor() {
        super();
    }

    mostrarMano() {
        const contenedor = document.getElementById('contenedor-Player');
        let index = 0;
      
        for (let carta of this.mano){
            const cartaElemento = document.createElement('div');
            cartaElemento.className = 'carta'; 
            cartaElemento.setAttribute('data-id', index); 
            
            cartaElemento.innerHTML = `
                <div>${carta.etiqueta}</div> <!-- Parte superior -->
                <div>${carta.palo}</div> <!-- Parte inferior -->
            `;
    
            contenedor.appendChild(cartaElemento);
            index += 1;
        }   
    }

    

}

export class Computer extends Player {

    #probabilidadesManos;
    
    constructor() {
        super();
        this.#probabilidadesManos = {
            "Escalera Real": 0.000154,
            "Escalera color": 0.0015,
            "Poker": 0.0256,
            "Full": 0.17,
            "Color": 0.367,
            "Escalera": 0.76,
            "Trio": 2.87,
            "Dos pares": 7.62,
            "Par": 49.9,
            "Carta mas alta": 100
        };
    }

    descartarCartas() {

    }

    mostrarMano() {
        const contenedor = document.getElementById('contenedor-PC');
            
       
        for (let carta of this.mano){
            const cartaElemento = document.createElement('img');
            cartaElemento.src = `https://th.bing.com/th/id/R.a0f07efb670ccf169dd2e8e4f5dba3d5?rik=bSLlR4qZrd11jQ&riu=http%3a%2f%2fa.trionfi.eu%2fWWPCM%2fdecks23%2fd21804%2fd21804r01.jpg&ehk=S7q61lWPDmcIfjj4mxkfg9%2bjVtjrSNdMvLHG2Knh9nA%3d&risl=&pid=ImgRaw&r=0.png`
            cartaElemento.className = 'carta'; 
            
            cartaElemento.classList.add('carta'); 
            contenedor.appendChild(cartaElemento);
        } 
    
    }

    manejoDescarte(baraja) {
       
        if (this.determinarMano().mano === "Carta mas alta" || this.determinarMano().mano === "Par") {
            let cantidadDescartar = Math.floor(Math.random() * 5) + 1;
            console.log(`La computadora descarto ${cantidadDescartar} cartas`);

            for (let i = 0; i < cantidadDescartar; i++) {
                
                this.mano.splice(i, 1);
                this.mano.push(baraja.sacarCartaAlAzar());
    
            }
            
        }
    }

    get probabilidadesManos () {
        return this.#probabilidadesManos;
    }

}
