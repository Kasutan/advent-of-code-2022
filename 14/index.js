let roches = [];
let grains = [];
let fond = 0;


function readFile(input) {
	let f = input.files[0];
	let reader = new FileReader();
	reader.readAsText(f);
	reader.onload = function() {
		let texte=reader.result.replace(/(?:\r|\n|\r\n)/g, '!');
		afficheTotal(texte)
	};
	reader.onerror = function() {
		console.log(reader.error);
	};
}

/*Exemple*/
let inputExemple="498,4 -> 498,6 -> 496,6!503,4 -> 502,4 -> 502,9 -> 494,9";

afficheTotal(inputExemple);




function afficheTotal(texte) {
	roches=[];
	grains=[];
	fond=0;

	traceRoches(texte);
	let rochesU=[... new Set(roches)];
	rochesU.sort();
	console.log('rochesU',rochesU);
	//Exo 2 : le vrai fond est deux crans plus bas que la dernière ligne de rochers
	fond+=2;
	console.log('fond',fond);



	total=calculeTotal(texte);

	//let total=0;
	console.log('total',total)
	document.getElementById('reponse').value=total;

	//2e partie de l'exercice
	/*
	let total2=tailleSuppr();
	console.log('total2',total2)
	document.getElementById('reponse-2').value=total2;
*/
}

function traceRoches(texte) {
	let lignes=texte.split("!");
	lignes.forEach((ligneS)=> {
		let ligne=ligneS.split(' -> ');
		for(let i=0; i < ligne.length - 1;i++ ) {
			traceLigne(ligne[i],ligne[i+1]);
		}
	})
}

function traceLigne(a,b) {
	roches.push(a);
	roches.push(b);
	let xa=parseInt(a.split(',')[0]);
	let ya=parseInt(a.split(',')[1]);
	let xb=parseInt(b.split(',')[0]);
	let yb=parseInt(b.split(',')[1]);
	if(ya > fond) {
		fond=ya;
	}
	if(yb > fond) {
		fond=yb;
	}
	if(xa > xb) {
		for(let z = xb + 1; z < xa; z++) {
			roches.push(z+','+ya);
		}
	} else if(xa < xb) {
		for(let z = xa + 1; z < xb; z++) {
			roches.push(z+','+ya);
		}
	} else if (ya > yb) {
		for(let z = yb + 1; z < ya; z++) {
			roches.push(xa+','+z);
		}
	} else if (ya < yb) {
		for(let z = ya + 1; z < yb; z++) {
			roches.push(xa+','+z);
		}
	} 
}


function calculeTotal() {

	let suite=true;
	let nb=0;
	while(suite) {
		nb++;
		console.log("==========calcule position grain",nb);
		let positionGrain=calculePositionGrain();
		if(positionGrain==="source") {
			suite=false;
		}
	}

	let grainsU=[... new Set(grains)];
	console.log('grainsU',grainsU);
	console.log('nb',nb);
	console.log('fond',fond);
	return grains.length;
}

function calculePositionGrain(){
	let position="500,0";
	while(position !=="stop" && position!=="source") {
		position=descend(position);
	}

	return position;
}

function descend(position) {
	let x=parseInt(position.split(',')[0]);
	let y=parseInt(position.split(',')[1]);
	let dessous=x+','+(y+1);
	let droite=(x+1)+','+(y+1);
	let gauche=(x-1)+','+(y+1);
	if(y===fond - 1) {
		grains.push(position);
		console.log("fond",position);
		position="stop";
	} else if(libre(dessous)) {
		position=dessous;
	} else if(libre(gauche)) {
		position=gauche;
	} else if(libre(droite)) {
		position=droite;
	} else {
		grains.push(position);
		console.log(position);
		if(position==="500,0") {
			position="source";
		} else {
			position="stop";
		}
	}
	return position;
}

function libre(emplacement) {
	return (grains.indexOf(emplacement)===-1 && roches.indexOf(emplacement)===-1)
}
