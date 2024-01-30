let numeroMaximo = +prompt('Ingrese el numero maximo a adivinar: ');
let maxIntentos = Math.ceil(Math.log2(numeroMaximo));
let cantidadJuegos = 3;
let jugadas = 0;
let numeroSecreto;
let veces;
let lista = [];
let usadas;

asignarTexto = (obj, txt) => document.querySelector(obj).innerHTML = txt;

limpiarInput = () => document.querySelector('#valorUsuario').value = '';

prenderBoton = boton => document.getElementById(boton).removeAttribute('disabled');

apagarBoton = boton => document.getElementById(boton).setAttribute('disabled','true');;

function generarNumeroRamdom() {
	let random = Math.floor(Math.random()*numeroMaximo)+1;
	if (lista.includes(random)) return generarNumeroRamdom();
	else {
		lista.push(random);
		return random;
	}
}

condicionesIniciales = () => {
	jugadas++;
	asignarTexto('h1','Juego del numero secreto');
	asignarTexto('p',`Ingrese un numero del 1 al ${numeroMaximo} (max. ${maxIntentos} intentos)`);
	asignarTexto('#reiniciar',`Nuevo Juego (${cantidadJuegos-jugadas} restantes)`);
	numeroSecreto = generarNumeroRamdom();
	veces = 1;
	usadas = [];
}

function verificarIntento() {
		let intento = +document.getElementById('valorUsuario').value;
		if (intento == 0) return verificarIntento();
		if (usadas.includes(intento)) {
			alert('Ya usaste ese numero, intenta de nuevo');
			limpiarInput();
			return verificarIntento();
		}
		else usadas.push(intento);
		asignarTexto('#intentar','Intentar\n'+`Usados: ${usadas}`);
		if (intento == numeroSecreto) {
			asignarTexto('p', `Acertaste el numero en ${veces} ${(veces == 1) ? 'intento' : 'intentos'}`);
			prenderBoton('reiniciar');
			apagarBoton('intentar');
		}
		else if (intento > numeroSecreto) asignarTexto('p', `El numero secreto es menor (${maxIntentos-veces} restantes)`);
		else asignarTexto('p',`El numero secreto es mayor (${maxIntentos-veces} restantes)`);
		limpiarInput();
		if (veces == maxIntentos && intento != numeroSecreto) {
			asignarTexto('p', `Perdiste, agotaste los ${maxIntentos} intentos, el numero secreto era ${numeroSecreto}`);
			apagarBoton('intentar');
			prenderBoton('reiniciar');
		}
		veces++;
}

function reiniciarJuego() {
	if (jugadas == cantidadJuegos) {
		asignarTexto('p','Ya se usaron todas las jugadas, vuelve mas tarde');
		asignarTexto('#intentar','Intentar');
		apagarBoton('reiniciar');
		apagarBoton('intentar');
	}
	else {
		limpiarInput();
		condicionesIniciales();
		prenderBoton('intentar');
		apagarBoton('reiniciar');
		asignarTexto('#intentar','Intentar\n'+`Usados: ${usadas}`);
	}
}

condicionesIniciales();