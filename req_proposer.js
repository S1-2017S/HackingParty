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
	var ligne= tableau[game_data.essai];
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



	}else{


		for (i=0; i<4; i++){
			if (game_data.secret[i] === couleurs_joueur[i]){
				verif++;
			}
		}



		// SI VICTOIRE AFFICHAGE PAGE FIN DE PARTIE AVEC MESSAGE VICTOIRE
		if (verif === 4){
			// INCREMENTAION DU NBR D'ESSAIES
			game_data.essai++;

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
			console.log(game_data.essai);

			if (game_data.essai === 0) {
			//	console.log(tableau[0]);
			//	console.log(ligne);

				ligne.marqueur11 = couleurs_joueur[0];
				ligne.marqueur21 = couleurs_joueur[1];
				ligne.marqueur31 = couleurs_joueur[2];
				ligne.marqueur41 = couleurs_joueur[3];
				game_data.tableau[0]=ligne;

			} else if (game_data.essai === 1) {
				ligne.marqueur12 = couleurs_joueur[0];
				ligne.marqueur22 = couleurs_joueur[1];
				ligne.marqueur32 = couleurs_joueur[2];
				ligne.marqueur42 = couleurs_joueur[3];

			} else if (game_data.essai === 2) {
				ligne.marqueur13 = couleurs_joueur[0];
				ligne.marqueur23 = couleurs_joueur[1];
				ligne.marqueur33 = couleurs_joueur[2];
				ligne.marqueur43 = couleurs_joueur[3];

			} else if (game_data.essai === 3) {
				console.log("Chibre");
				ligne.marqueur14 = couleurs_joueur[0];
				ligne.marqueur24 = couleurs_joueur[1];
				ligne.marqueur34 = couleurs_joueur[2];
				ligne.marqueur44 = couleurs_joueur[3];
				console.log(ligne);

			} else if (game_data.essai === 4) {
				ligne.marqueur15 = couleurs_joueur[0];
				ligne.marqueur25 = couleurs_joueur[1];
				ligne.marqueur35 = couleurs_joueur[2];
				ligne.marqueur45 = couleurs_joueur[3];

			} else if (game_data.essai === 5) {
				ligne.marqueur16 = couleurs_joueur[0];
				ligne.marqueur26 = couleurs_joueur[1];
				ligne.marqueur36 = couleurs_joueur[2];
				ligne.marqueur46 = couleurs_joueur[3];

			} else if (game_data.essai === 6) {
				ligne.marqueur17 = couleurs_joueur[0];
				ligne.marqueur27 = couleurs_joueur[1];
				ligne.marqueur37 = couleurs_joueur[2];
				ligne.marqueur47 = couleurs_joueur[3];

			} else if (game_data.essai === 7) {
				ligne.marqueur18 = couleurs_joueur[0];
				ligne.marqueur28 = couleurs_joueur[1];
				ligne.marqueur38 = couleurs_joueur[2];
				ligne.marqueur48 = couleurs_joueur[3];
			} else if (game_data.essai === 8) {
				ligne.marqueur19 = couleurs_joueur[0];
				ligne.marqueur29 = couleurs_joueur[1];
				ligne.marqueur39 = couleurs_joueur[2];
				ligne.marqueur49 = couleurs_joueur[3];

			} else if (game_data.essai === 9) {
				ligne.marqueur110 = couleurs_joueur[0];
				ligne.marqueur210 = couleurs_joueur[1];
				ligne.marqueur310 = couleurs_joueur[2];
				ligne.marqueur410= couleurs_joueur[0];

			} else if (game_data.essai === 10) {
				ligne.marqueur111 = couleurs_joueur[0];
				ligne.marqueur211 = couleurs_joueur[1];
				ligne.marqueur311 = couleurs_joueur[2];
				ligne.marqueur411 = couleurs_joueur[3];

			}

			// INCREMENTAION DU NBR D'ESSAIES
//			console.log(game_data.essai);
			game_data.tableau[game_data.essai] = ligne;
			game_data.essai++;

			//game_data = JSON.stringify(game_data);
			//fs.writeFileSync("./jeu.json", game_data, "UTF-8");

			page = fs.readFileSync('modele_jeu.html', 'utf-8');
			for (i=0; i<12; i++){
				console.log(game_data.tableau[i]);
				page = page.supplant(game_data.tableau[i]);
			}
			game_data = JSON.stringify(game_data);
			fs.writeFileSync("./jeu.json", game_data, "UTF-8");

			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(page);
			res.end();
		}
	}


}
//---------------------------------------------------------------------
module.exports = trait;

