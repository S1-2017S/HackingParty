//============================================================================
//Traitement de "req_proposer"
//Auteur : groupe HackingParty
//Version : 21/11/2017
//===========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query){

	var i;
	var verif = 0;
	var marqueurs = {};
	var page;
	var game_data = fs.readFileSync("./jeu.json", "UTF-8");
	game_data = JSON.parse(game_data);
	var tableau = game_data.tableau;
	console.log(tableau);
	console.log(tableau[0]);

	var couleurs_joueur = [];

	couleurs_joueur[0] = query.couleur1;
	couleurs_joueur[1] = query.couleur2;
	couleurs_joueur[2] = query.couleur3;
	couleurs_joueur[3] = query.couleur4;

	// ESSAIE EPUISER, AFFICHAGE PAGE FIN DE PARTIE AVEC MESSAGE DE LOSE
	if(game_data.essai === 11){

		page = fs.readFileSync('modele_fin_de_partie.html', 'utf-8');


		marqueurs.lose = "Vous n'avez pas réussi à trouver la combinaison.";
		marqueurs.win = "";
		page = page.supplant(marqueurs);
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(page);
		res.end();



	}else {

		// INCREMENTAION DU NBR D'ESSAIES
		game_data.essai++;


		for (i=0; i<4; i++){
			if (game_data.secret[i] === couleurs_joueur[i]){
				verif++;
			}
		}



		// SI VICTOIRE AFFICHAGE PAGE FIN DE PARTIE AVEC MESSAGE VICTOIRE
		if (verif === 4){
			game_data = JSON.stringify(game_data);
			fs.writeFileSync("./jeu.json", game_data, "UTF-8");

			page = fs.readFileSync('modele_fin_de_partie.html', 'utf-8');
			marqueurs.lose = "";
			marqueurs.win = "Vous avez réussi à trouver la combinaison";
			page = page.supplant(marqueurs);

			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(page);
			res.end();

		}else{


			// AFFICHAGE DES CHOIX 

			var j = 0;

			marqueurs.marqueur11 = couleurs_joueur[0];
			marqueurs.marqueur21 = couleurs_joueur[1];
			marqueurs.marqueur31 = couleurs_joueur[2];
			marqueurs.marqueur41 = couleurs_joueur[3];
			var table = []
			table [j] = marqueurs;
			console.log(marqueurs);


			game_data = JSON.stringify(game_data);
			fs.writeFileSync("./jeu.json", game_data, "UTF-8");

			page = fs.readFileSync('modele_jeu.html', 'utf-8');
			page = page.supplant(table[j]);
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(page);
			res.end();
		}
	}


}
//---------------------------------------------------------------------
module.exports = trait;

