import { Carta, Baraja, Player, Computer, Jugador } from './clases.js';


function repartirMano(baraja){

    let mano = [];

    for (let i=0; i<5; i++){
        mano.push(baraja.sacarCartaAlAzar());
    }
    
    mano.sort((a, b) => a.valor - b.valor);
    
    return mano;

}

function determinarManoMasAlta(jugador,computadora) {
    
    let tablaValores = computadora.rankingCartas;
    let cartaParJugador = null;
    let cartaParComputadora = null;

    let manoJugador = jugador.determinarMano();
    let manoComputadora = computadora.determinarMano();
    let valorManoJugador = tablaValores.indexOf(manoJugador.mano);
    let valorManoComputadora = tablaValores.indexOf(manoComputadora.mano);


    if (valorManoJugador < valorManoComputadora) {
        let manoGanadora = {
            ganador: "Jugador",
            mano: manoJugador.mano,
        };
        return manoGanadora;
    } else if (valorManoComputadora < valorManoJugador) {
        let manoGanadora = {
            ganador: "Computadora",
            mano: manoComputadora.mano,
        };
        return manoGanadora;
    } else if (manoJugador.cartaAlta.valor > manoComputadora.cartaAlta.valor) {
        let manoGanadora = {
            ganador: "Jugador",
            mano: manoJugador.mano,
        };
        return manoGanadora;
    } else if (manoComputadora.cartaAlta.valor > manoJugador.cartaAlta.valor) {
        let manoGanadora = {
            ganador: "Computadora",
            mano: manoComputadora.mano,
        };
        return manoGanadora;
    } else if (valorManoComputadora == valorManoJugador) {
        if (manoJugador.mano == "Par") {
            let parJugador = jugador.conteoPares(jugador.mano);
            let parComputadora = computadora.conteoPares(computadora.mano);

            for (let item of Object.keys(parJugador)) {
                if (parJugador[item]==2) {
                    cartaParJugador = item;
                }
            }

            for (let item of Object.keys(parComputadora)) {
                if (parComputadora[item]==2) {
                    cartaParComputadora = item;
                }
            }

            if (cartaParJugador > cartaParComputadora) {
                let manoGanadora = {
                    ganador: "Jugador",
                    mano: manoJugador.mano,
                    };
                    return manoGanadora;
            } else if (cartaParJugador < cartaParComputadora) {
                let manoGanadora = {
                    ganador: "Computadora",
                    mano: manoComputadora.mano,
                    };
                    return manoGanadora;
            } else if (cartaParJugador == cartaParComputadora) {
                if (manoJugador.cartaAlta.valor > manoComputadora.cartaAlta.valor) {
                    let manoGanadora = {
                        ganador: "Jugador",
                        mano: manoJugador.mano,
                    };
                    return manoGanadora;
                } else if (manoComputadora.cartaAlta.valor > manoJugador.cartaAlta.valor) {
                    let manoGanadora = {
                        ganador: "Computadora",
                        mano: manoComputadora.mano,
                    };
                    return manoGanadora;
                } else {
                    let manoGanadora = {
                        ganador: "Empate",
                        mano: null,
                    };
                    return manoGanadora;
                }
            }
        } else {
            let manoGanadora = {
                ganador: "Empate",
                mano: null,
            };
            return manoGanadora;
        }
    } else if (manoComputadora.cartaAlta.valor == manoJugador.cartaAlta.valor) {
        let manoGanadora = {
            ganador: "Empate",
            mano: null,
        };
        return manoGanadora;
    }
}
   
function determinarGanador(mano1,mano2){
   manoGanadora = determinarManoMasAlta(mano1,mano2);
   if (manoGanadora.ganador == "Jugador") {
    console.log("Gana el jugador con ",manoGanadora.mano);
    return manoGanadora;
   } else if (manoGanadora.ganador == "Computadora") {
    console.log("Gana la computadora con ", manoGanadora.mano);
    return manoGanadora;
   } else {  
    console.log("Empate.")
   }
} 

function manoAString(mano) {
    return mano.map(carta => `${carta.etiqueta} de ${carta.palo}`).join(', ');
}

function determinarGanadorFinal(historial){
    
    let conteoJugador = 0;
    let conteoComputadora = 0;

    for (let ganador of historial) {
        if (ganador=="Jugador"){
            conteoJugador = conteoJugador + 1;
        } else if (ganador=="Computadora"){
            conteoComputadora = conteoComputadora + 1;
        }
    }

    if (conteoComputadora>conteoJugador) {
        return "Computadora";
    } else if (conteoComputadora<conteoJugador) {
        return "Jugador";
    } else if (conteoComputadora==conteoJugador) {
        return "empate";
    }
}

function manejoDeApuestaPC(ronda, computadora, pozo) {
    let mano = computadora.determinarMano();
    let probabilidad = computadora.probabilidadesManos[mano.mano];
    let paga = false;
    let apuesta = false;
    let abandona = false;
   

    if (ronda === 1 && probabilidad <= 2.87){
        
        apuesta = Math.random() < 0.80;
        if (!apuesta) {
            paga = true;
        }
        if (apuesta) {
            pozo += 20;
            computadora.bankroll = computadora.bankroll - 20;
            return "apuesta";
        } else if (paga) {
            pozo += 10;
            computadora.bankroll = computadora.bankroll - 10;
            return "paga";
        }
        
    } else if (ronda === 1 && probabilidad===7.62) {
        apuesta = Math.random() < 0.60;
        if (!apuesta) {
            paga = Math.random() < 0.85;
        }
        if (apuesta) {
            pozo += 20;
            computadora.bankroll = computadora.bankroll - 20;
            return "apuesta";
        } else if (paga) {
            pozo += 10;
            computadora.bankroll = computadora.bankroll - 10;
            return "paga";
        }
    } else if (ronda === 1 && probabilidad == 49.9) {
        paga = Math.random() < 0.85;
        if (!paga) {
            apuesta = Math.random() < 0.25;
        }
        if (apuesta) {
            pozo += 20;
            computadora.bankroll = computadora.bankroll - 20;
            return "apuesta";
        } else if (paga) {
            pozo += 10;
            computadora.bankroll = computadora.bankroll - 10;
            return "paga";
        }
    } else if (ronda === 1 && probabilidad > 49.9) {
        paga = Math.random() < 0.60;
        if (!paga){
            apuesta = Math.random() < 0.10;
        }
        if (apuesta) {
            pozo += 20;
            computadora.bankroll = computadora.bankroll - 20;
            return "apuesta";
        } else if (paga) {
            pozo += 10;
            computadora.bankroll = computadora.bankroll - 10;
            return "paga";
        }
    
    } else if (ronda == 2 && probabilidad <= 0.0256){
        apuesta = true;
        pozo += 20;
        computadora.bankroll = computadora.bankroll - 20;
    } else if (ronda === 2 && 0.0256 < probabilidad && probabilidad <= 0.76) {
        apuesta = Math.random() < 0.85;
        if (!apuesta) {
            paga = Math.random() < 0.95;  
        }
        if (apuesta) {
            pozo += 20;
            computadora.bankroll = computadora.bankroll - 20;
            return "apuesta";
        } else if (paga) {
            pozo += 10;
            computadora.bankroll = computadora.bankroll - 10;
            return "paga";
        }
    } else if (ronda == 2 && 0.76 < probabilidad && probabilidad < 49.9) {
        paga = Math.random() < 0.60;
        if (!paga) {
            apuesta = Math.random() < 0.30
        }
        if (apuesta) {
            pozo += 20;
            computadora.bankroll = computadora.bankroll - 20;
            return "apuesta";
        } else if (paga) {
            pozo += 10;
            computadora.bankroll = computadora.bankroll - 10;
            return "paga";
        }
    } else if (ronda == 2 && probabilidad == 49.9) {
        paga = Math.random() < 0.25;
        if (!paga) {
            apuesta = Math.random() < 0.20
        }
        if (apuesta) {
            pozo += 20;
            computadora.bankroll = computadora.bankroll - 20;
            return "apuesta";
        } else if (paga) {
            pozo += 10;
            computadora.bankroll = computadora.bankroll - 10;
            return "paga";
        }
    } else if (ronda == 2 && probabilidad == 100) {
        paga = Math.random() < 0.15;
        if (!paga) {
            apuesta = Math.random() < 0.05 
        }
        if (apuesta) {
            pozo += 20;
            computadora.bankroll = computadora.bankroll - 20;
            return "apuesta";
        } else if (paga) {
            pozo += 10;
            computadora.bankroll = computadora.bankroll - 10;
            return "paga";
        } 
    }

    if (!paga && !apuesta) {
        return "abandona";
    }
}

async function manejoApuestaJugador() {

    document.getElementById("bet-btn").style.visibility = 'hidden';

    return new Promise((resolve) => {
        const pagarBtn = document.getElementById('see-btn');
        const abandonarBtn = document.getElementById('fold-btn');
    

        const manejarPaga = () => {
                console.log("El jugador ha pagado.");
                resolve("paga");            
        };


        const manejarAbandonar = () => {
            console.log("El jugador ha abandonado.");
            resolve("abandona");
        };

        pagarBtn.addEventListener('click', manejarPaga);
        abandonarBtn.addEventListener('click', manejarAbandonar);
    });
}

async function rondaDeApuestas(computadora, numeroDeRonda, pozo, jugador) {
    
    return new Promise((resolve) => {
        const apostarBtn = document.getElementById('bet-btn');
        const abandonarBtn = document.getElementById('fold-btn');


        const clearListeners = () => {
            apostarBtn.replaceWith(apostarBtn.cloneNode(true)); 
            abandonarBtn.replaceWith(abandonarBtn.cloneNode(true));
        };

        clearListeners();


        const manejarApuesta = () => {
           
            let accionComputadora = manejoDeApuestaPC(numeroDeRonda, computadora, pozo);
            
            jugador.bankroll = jugador.bankroll - 10;
            let pozoJugador = document.getElementById("total-jugador");
            pozoJugador.innerText = jugador.bankroll;

            if (accionComputadora === "abandona") {
                resolve("abandona");
                console.log("El oponente abandonó.");
            } else if (accionComputadora === "paga") {
                resolve("paga");
                console.log("El oponente paga la apuesta.");
            } else if (accionComputadora === "apuesta") {
                resolve("apuesta");
                console.log("El oponente sube la apuesta.");
            }

            clearListeners();
        };

        const manejarAbandonar = () => {
            console.log("El jugador ha abandonado.");
            computadora.bankroll += pozo;
            resolve("abandonaJugador");

            clearListeners();
        };

        document.getElementById('bet-btn').addEventListener('click', manejarApuesta);
        document.getElementById('fold-btn').addEventListener('click', manejarAbandonar);
    });
}



function limpiarCartasJugador() {
    document.getElementById('contenedor-Player').innerHTML = '';
}

function descartarCartas(jugador,baraja){
    
    const cartasSeleccionadas = document.querySelectorAll(".carta.seleccionada");
            
    if (cartasSeleccionadas.length > 0) {
                
        const cantidadCartasARepartir = cartasSeleccionadas.length;
                
        cartasSeleccionadas.forEach(carta => {
            const cartaIndex = Array.from(carta.parentElement.children).indexOf(carta);
            carta.remove(); // Elimina del DOM
            jugador.mano.splice(cartaIndex, 1); 
        });

        for (let i = 0; i < cantidadCartasARepartir; i++) {
                    
            jugador.mano.push(baraja.sacarCartaAlAzar())

        }
    
        limpiarCartasJugador();
        jugador.mostrarMano();
    }
}

function confirmarDescarte(jugador, baraja) {
    
    let cartasJugador;
    document.getElementById("discard-btn").style.visibility = 'hidden';
    cartasJugador = document.querySelectorAll("#contenedor-Player .carta");
    console.log(cartasJugador);
    document.getElementById("confirm-discard-btn").style.visibility = 'visible';

    cartasJugador.forEach(carta => {
        
        let cartaClone = carta.cloneNode(true);
        carta.parentNode.replaceChild(cartaClone, carta);
    });

   
    cartasJugador = document.querySelectorAll("#contenedor-Player .carta"); 
    cartasJugador.forEach(carta => {
        carta.addEventListener("click", () => {
            carta.classList.toggle("seleccionada");
        });
    });

    
    document.getElementById("confirm-discard-btn").addEventListener("click", () => {
        descartarCartas(jugador, baraja);

        cartasJugador.forEach(carta => {
            carta.replaceWith(carta.cloneNode(true)); 
        });

        document.getElementById("confirm-discard-btn").style.visibility = 'hidden'; 
    });
}



function limpiarCartas() {
    document.getElementById('contenedor-PC').innerHTML = '';
    document.getElementById('contenedor-Player').innerHTML = '';
}

function cargarHistorialEnTabla(historial) {
    let tabla = document.getElementById('tablaResultadosBody'); 
    tabla.innerHTML = ''; 
    historial.forEach(mano => {
        console.log(mano); 
        let fila = `
            <tr>
                <td>${mano.numero_de_mano}</td>
                <td>${mano.mano_jugador}</td>
                <td>${mano.mano_computadora}</td>
                <td>${mano.ganador_de_la_mano}</td>
            </tr>
        `;
        tabla.innerHTML += fila;
    });
}

async function juego(){
    
    let tabla = document.getElementById("tablaResultados");
    let seguro = window.confirm("Desea jugar?");
    let historial = [];
    let tablaFinal = [];
    let i = 1;
    let jugador = new Jugador();
    let computadora = new Computer();
    let pozo;
    let pozoJugador = document.getElementById("total-jugador");
    let pozoComputadora = document.getElementById("total-oponente");
    let pozoGeneral = document.getElementById("total-mano");


    while (computadora.bankroll>0 && jugador.bankroll>0) {

        document.getElementById("resumen").style.visibility = 'hidden';

        tabla.style.display = "none";
        console.log(computadora.bankroll)
        pozo=0;
        document.getElementById("confirm-discard-btn").style.visibility = 'hidden';
        let baraja = new Baraja();
        let numeroDeRonda = 1;
        let abandono = false;
        let resultado;
        let accionJugador;
        let mano = {};
        
 
        pozoGeneral.innerText = pozo;
        pozoComputadora.innerText = computadora.bankroll; 
        pozoJugador.innerText = jugador.bankroll;   
        jugador.mano = repartirMano(baraja); 
        jugador.mostrarMano();                                            
        console.log(jugador.mano);

        computadora.mano = repartirMano(baraja);
        computadora.mostrarMano();
        console.log(computadora.mano);
        
        document.getElementById("see-btn").style.visibility = 'visible';
        document.getElementById("raise-btn").style.visibility = 'visible';
    
        
        
        while (!abandono && numeroDeRonda<=2){
            
            
            document.getElementById("bet-btn").style.visibility = 'visible';
            
            if (numeroDeRonda===1){    
                
                document.getElementById("discard-btn").style.visibility = 'hidden';
                document.getElementById("see-btn").style.visibility = 'hidden';
                document.getElementById("raise-btn").style.visibility = 'hidden';
                
                resultado = await rondaDeApuestas(computadora,numeroDeRonda,pozo,jugador);
                pozoGeneral.innerText = pozo;

                if (resultado == "apuesta") {
                    document.getElementById("see-btn").style.visibility = 'visible';
                    pozo += 30;
                    pozoGeneral.innerText = pozo;
                    pozoComputadora.innerText = computadora.bankroll; 
                    accionJugador = await manejoApuestaJugador();
                    if (accionJugador == "paga") {
                        pozo += 20;
                        jugador.bankroll = jugador.bankroll - 10;
                        pozoGeneral.innerText = pozo;
                    } else if (accionJugador == "abandona") {
                        computadora.bankroll = computadora.bankroll + pozo;
                        mano = {
                            numero_de_mano: i,
                            mano_jugador: manoAString(jugador.mano),
                            mano_computadora: manoAString(computadora.mano),
                            ganador_de_la_mano: "Computadora"
                        }
                        abandono = true;
                    }
                    
                } else if (resultado == "abandona") {
                    pozo += 10;
                    jugador.bankroll = jugador.bankroll + pozo;
                    mano = {
                        numero_de_mano: i,
                        mano_jugador: manoAString(jugador.mano),
                        mano_computadora: manoAString(computadora.mano),
                        ganador_de_la_mano: "Jugador"
                    }
                    abandono = true;
                    
                } else if (resultado == "abandonaJugador") {
             
                    computadora.bankroll = computadora.bankroll + pozo;
                    mano = {
                        numero_de_mano: i,
                        mano_jugador: manoAString(jugador.mano),
                        mano_computadora: manoAString(computadora.mano),
                        ganador_de_la_mano: "Computadora"
                    }
                    abandono = true;
                } else if (resultado==="paga") {
                    pozo += 20;
                    pozoGeneral.innerText = pozo;
                    pozoComputadora.innerText = computadora.bankroll; 
                    document.getElementById("see-btn").style.visibility = 'hidden';
                    document.getElementById("raise-btn").style.visibility = 'hidden';
                }
            } else if (numeroDeRonda===2) {
                computadora.manejoDescarte(baraja);
                document.getElementById("discard-btn").style.visibility = 'visible';
                document.getElementById("discard-btn").addEventListener("click", () => {
                    confirmarDescarte(jugador, baraja);
                });
                document.getElementById("confirm-discard-btn").style.visibility = 'hidden';
                
                resultado = await rondaDeApuestas(computadora,numeroDeRonda,pozo,jugador);
                if (resultado == "apuesta") {
                    pozo += 30;
                    document.getElementById("see-btn").style.visibility = 'visible';
                    document.getElementById("raise-btn").style.visibility = 'visible';
                    accionJugador = await manejoApuestaJugador();
                    if (accionJugador == "paga") {
                        pozo += 10;
                        jugador.bankroll = jugador.bankroll - 10;
                    } else if (accionJugador == "abandona") {
                        computadora.bankroll = computadora.bankroll + pozo;
                        mano = {
                            numero_de_mano: i,
                            mano_jugador: manoAString(jugador.mano),
                            mano_computadora: manoAString(computadora.mano),
                            ganador_de_la_mano: "Computadora"
                        }
                        abandono = true;
                    }
                } else if (resultado == "abandona") {
                    pozo += 10;
                    jugador.bankroll = jugador.bankroll + pozo;
                    mano = {
                        numero_de_mano: i,
                        mano_jugador: manoAString(jugador.mano),
                        mano_computadora: manoAString(computadora.mano),
                        ganador_de_la_mano: "Jugador"
                    }
                    abandono = true;
                } else if (resultado == "abandonaJugador") {
                    computadora.bankroll = computadora.bankroll + pozo;
                    mano = {
                        numero_de_mano: i,
                        mano_jugador: manoAString(jugador.mano),
                        mano_computadora: manoAString(computadora.mano),
                        ganador_de_la_mano: "Computadora"
                    }
                    abandono = true;
                } else if (resultado==="paga") {
                    pozo += 20;
                    pozoGeneral.innerText = pozo;
                    pozoComputadora.innerText = computadora.bankroll; 
                    document.getElementById("see-btn").style.visibility = 'hidden';
                    document.getElementById("raise-btn").style.visibility = 'hidden';
                }
                
            }


            numeroDeRonda += 1;
        }

        if (!abandono) { 
            mano = {
            numero_de_mano: i,
            mano_jugador: manoAString(jugador.mano),
            mano_computadora: manoAString(computadora.mano),
            ganador_de_la_mano: determinarManoMasAlta(jugador,computadora).ganador
            }
        }
       

        if (mano.ganador_de_la_mano === "Jugador" && !abandono) {
            jugador.bankroll = jugador.bankroll + pozo;
        } else if (mano.ganador_de_la_mano === "Computadora" && !abandono) {
            computadora.bankroll = computadora.bankroll + pozo;
        } else if (mano.ganador_de_la_mano === "Empate" && !abandono) {
            computadora.bankroll = computadora.bankroll + pozo/2;
            jugador.bankroll = jugador.bankroll + pozo/2;
        }
        
        tablaFinal.push(mano);
        
        historial.push(mano.ganador_de_la_mano);
        
        seguro = window.confirm("Desea volver a jugar?");
        console.log(historial);

        i++

        limpiarCartas();
    }

    document.getElementById("resumen").style.visibility = 'visible';
    document.getElementById("contenedor-baraja").style.visibility = 'hidden';
    document.getElementById("confirm-discard-btn").style.visibility = 'hidden'
    document.getElementById("see-btn").style.visibility = 'hidden';
    document.getElementById("raise-btn").style.visibility = 'hidden';
    document.getElementById("bet-btn").style.visibility = 'hidden';
    document.getElementById("fold-btn").style.visibility = 'hidden';
    document.getElementById("discard-btn").style.visibility = 'hidden';
    tabla.style.display = "table"; 

    console.log(tablaFinal);
    cargarHistorialEnTabla(tablaFinal);
    
}
console.log(15 == '15');
console.log(15 == '10 + 5');
console.log(true == 1);
console.log(false == 0);
juego();




                                             




      
   
             