let H = {"l":0,"c":0};
let T=[];
for (let n=1;n<=9;n++) {
	T[n]={};
}
let visited = [];


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
let inputExemple="R 4!U 4!L 3!D 1!R 4!D 1!L 5!R 2";

afficheTotal(inputExemple);




function afficheTotal(texte) {
	let total=calculeTotal(texte);
	console.log('total',total)
	document.getElementById('reponse').value=total;

	//2e partie de l'exercice
	/*
	let total2=tailleSuppr();
	console.log('total2',total2)
	document.getElementById('reponse-2').value=total2;
*/
}


function calculeTotal(texte) {
	H = {"l":0,"c":0};
	for (let n=1;n<=9;n++) {
		T[n]={"l":0,"c":0};
	}
	visited = ["l0c0"];

	
	let moves=texte.split("!");

	moves.forEach((move) => {
		console.log('==========move',move);
		let direction=move.split(" ")[0];
		let n=parseInt(move.split(" ")[1]);
		for (let i=1;i<=n;i++) {
			bougeH(direction);
			bougeTapresN(T[1],H);
			for (let n=2;n<=9;n++) {
				bougeTapresN(T[n],T[n-1]);
			}
			visited.push(positionT(9));
			console.log('position H',positionH());
			console.log('position T9',positionT(9));
		}
		
	})

	console.log('position finale H',H);
	console.log('position finale tous noeuds',T);
	console.log('position finale T9',T[9]);
	
	console.log('visited',visited);
	let uniqueVisited = [...new Set( visited)];
	console.log('unique',uniqueVisited);

	return uniqueVisited.length;
}

function positionH() {
	return "l"+H.l+"c"+H.c;
}

function positionT(i) {
	return "l"+T[i].l+"c"+T[i].c;
}

function bougeH(direction) {
	
	if(direction==="R") {
		H.c++;
	}
	if(direction==="L") {
		H.c--;
	}
	if(direction==="U") {
		H.l++;
	}
	if(direction==="D") {
		H.l--;
	}
	//vérif après mouvement
	//Autoriser à sortir de la grille
	/*if(H.c < 0) {
		console.log('colonne H négative !');
		H.c=0;
	}
	if(H.l < 0) {
		console.log('ligne H négative !');
		H.l=0;
	}*/
}

function bougeTapresN(T,N) {
	let dc=N.c - T.c;
	let dl=N.l - T.l;
	if(dl===0) {
		//sur la même ligne
		if(dc>1) {
			T.c=N.c-1;
		} else if (dc < -1) {
			T.c=N.c +1;
		}
	}
	else if(dc===0) {
		//sur la même colonne
		if(dl>1) {
			T.l=N.l-1;
		} else if (dl < -1) {
			T.l=N.l+1;
		}
	} else if(Math.abs(dc) <= 1 && Math.abs(dl) <=1) {
		//Contact diagonal, on ne bouge pas T
	} else {
		//Besoin d'un mouvement en diagonale d'un cran en direction de H
		if(dc > 0){
			T.c++;
		} else {
			T.c--;
		}
		if(dl > 0){
			T.l++;
		} else {
			T.l--;
		}
	}
}

