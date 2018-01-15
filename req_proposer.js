//=============================================================================
//Traitement de "req_proposer"
//Auteur : groupe HackingParty
//Version : 21/11/2017
//===============================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query){

	var i;
	var verif = 0;
	var marqueurs = {};
	var page;
	var game_data = fs.readFileSync(query.pseudo +".json", "UTF-8");
	game_data = JSON.parse(game_data);
	var tableau = game_data.tableau;
	var ligne= tableau[game_data.essai];
	var couleurs_joueur = [];
	var couleur = game_data.couleurs;

	couleurs_joueur[0] = query.couleur1;
	couleurs_joueur[1] = query.couleur2;
	couleurs_joueur[2] = query.couleur3;
	couleurs_joueur[3] = query.couleur4;


	var choix_pion_ordi = function (couleur, secret){
		var i;
		var j;
		var col = [0,0,0,0];
		var test;

		for (i=0; i<4; i++){
			if (couleur[i] === secret[i]){
				col[i] = 2;
			}
		}

		for (i=0; i<4; i++){
			test = 0;

			for (j=0; j<4; j++){
				if (couleur[i] === secret[j] && col[j] !== 2 && col[i] !== 2){
					col[i] = 1;
				}
			}
		}

		return col;
	};

	var image = function (couleur,couleur_j){
		var i=0;
		for (i=0; i<4; i++) {
			if (couleur_j[i] === "bleu"){
				couleur_j[i] = couleur[0];
			} else if (couleur_j[i] === "rouge"){
				couleur_j[i] = couleur[1];
			} else if (couleur_j[i] === "jaune"){
				couleur_j[i] = couleur[2];
			} else if (couleur_j[i] === "vert"){
				couleur_j[i] = couleur[3];
			} else if (couleur_j[i] === "violet"){
				couleur_j[i] = couleur[4];
			} else {
				couleur_j[i] = couleur[5];
			}
		}
		return couleur_j;
	}
	couleurs_joueur = image (couleur, couleurs_joueur);

	// ESSAIE EPUISER, AFFICHAGE PAGE FIN DE PARTIE AVEC MESSAGE DE LOSE
	if(game_data.essai === 7){

		page = fs.readFileSync('./modele_jeu.html', 'utf-8');


		marqueurs.marqueur00 = "<br>Vous n'avez pas réussi à trouver la combinaison. La bonne combinaison était: " + game_data.secret + "   <form action='/req_retour_page_accueil_membre'> <input type='submit' name='Return' value='Retour accueil membre'></a> <input type='hidden' name='pseudo' value='{pseudo}'> </form>";

		page = page.supplant(marqueurs);
		marqueurs.pseudo = query.pseudo;
		for (i=0; i<8; i++){
			page = page.supplant(game_data.tableau[i]);
		}
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

			page = fs.readFileSync('./modele_jeu.html', 'utf-8');
			marqueurs.marqueur00 = "<br>Félicitations, vous avez réussi à trouver la combinaison en : "+ game_data.essai+ " essaie(s)." + "   <form action='/req_retour_page_accueil_membre'> <input type='submit' name='Return' value='Retour accueil membre'></a> <input type='hidden' name='pseudo' value='{pseudo}'> </form>";

			page = page.supplant(marqueurs);
			marqueurs.pseudo = query.pseudo;
			for (i=0; i<8; i++){
				page = page.supplant(game_data.tableau[i]);
			}
			game_data = JSON.stringify(game_data);
			fs.writeFileSync(query.pseudo +".json", game_data, "UTF-8");

			marqueurs.abandon = "";
			page = page.supplant(marqueurs);

			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(page);
			res.end();

		}else{
			// AFFICHAGE DES CHOIX DU JOUEUR

			if (game_data.essai === 0) {
				tableau = choix_pion_ordi (couleurs_joueur, game_data.secret);
				ligne.marqueur11 = couleurs_joueur[0];
				ligne.marqueur21 = couleurs_joueur[1];
				ligne.marqueur31 = couleurs_joueur[2];
				ligne.marqueur41 = couleurs_joueur[3];

				if (tableau[0] === 0) {
					ligne.marqueur51 = game_data.couleurs_ordi[0];
				} else if (tableau[0] === 1){
					ligne.marqueur51 = game_data.couleurs_ordi[1];
				} else {
					ligne.marqueur51 = game_data.couleurs_ordi[2];
				}

				if (tableau[1] === 0) {
					ligne.marqueur61 = game_data.couleurs_ordi[0];
				} else if (tableau[1] === 1){
					ligne.marqueur61 = game_data.couleurs_ordi[1];
				} else {
					ligne.marqueur61 = game_data.couleurs_ordi[2];
				}

				if (tableau[2] === 0) {
					ligne.marqueur71 = game_data.couleurs_ordi[0];
				} else if (tableau[2] === 1) {
					ligne.marqueur71 = game_data.couleurs_ordi[1];
				} else {
					ligne.marqueur71 = game_data.couleurs_ordi[2];
				}

				if (tableau[3] === 0) {
					ligne.marqueur81 = game_data.couleurs_ordi[0];
				} else if (tableau[3] === 1) {
					ligne.marqueur81 = game_data.couleurs_ordi[1];
				} else {
					ligne.marqueur81 = game_data.couleurs_ordi[2];
				}

			} else if (game_data.essai === 1) {
				ligne.marqueur12 = couleurs_joueur[0];
				ligne.marqueur22 = couleurs_joueur[1];
				ligne.marqueur32 = couleurs_joueur[2];
				ligne.marqueur42 = couleurs_joueur[3];
				tableau = choix_pion_ordi (couleurs_joueur, game_data.secret);

				if (tableau[0] === 0) {
					ligne.marqueur52 = game_data.couleurs_ordi[0];
				} else if (tableau[0] === 1) {
					ligne.marqueur52 = game_data.couleurs_ordi[1];
				} else {
					ligne.marqueur52 = game_data.couleurs_ordi[2];
				}

				if (tableau[1] === 0) {
					ligne.marqueur62 = game_data.couleurs_ordi[0];
				} else if (tableau[1] === 1) {
					ligne.marqueur62 = game_data.couleurs_ordi[1];
				} else {
					ligne.marqueur62 = game_data.couleurs_ordi[2];
				}

				if (tableau[2] === 0) {
					ligne.marqueur72 = game_data.couleurs_ordi[0];
				} else if (tableau[2] === 1) {
					ligne.marqueur72 = game_data.couleurs_ordi[1];
				} else {
					ligne.marqueur72 = game_data.couleurs_ordi[2];
				}

				if (tableau[3] === 0) {
					ligne.marqueur82 = game_data.couleurs_ordi[0];
				} else if (tableau[3] === 1) {
					ligne.marqueur82 = game_data.couleurs_ordi[1];
				} else {
					ligne.marqueur82 = game_data.couleurs_ordi[2];
				}


			} else if (game_data.essai === 2) {
				ligne.marqueur13 = couleurs_joueur[0];
				ligne.marqueur23 = couleurs_joueur[1];
				ligne.marqueur33 = couleurs_joueur[2];
				ligne.marqueur43 = couleurs_joueur[3];
				tableau = choix_pion_ordi (couleurs_joueur, game_data.secret);

				if (tableau[0] === 0) {
					ligne.marqueur53 = game_data.couleurs_ordi[0];
				} else if (tableau[0] === 1) {
					ligne.marqueur53 = game_data.couleurs_ordi[1];
				} else { 
					ligne.marqueur53 = game_data.couleurs_ordi[2];
				}

				if (tableau[1] === 0) {
					ligne.marqueur63 = game_data.couleurs_ordi[0];
				} else if (tableau[1] === 1) {
					ligne.marqueur63 = game_data.couleurs_ordi[1];
				} else { 
					ligne.marqueur63 = game_data.couleurs_ordi[2];
				}

				if (tableau[2] === 0) {
					ligne.marqueur73 = game_data.couleurs_ordi[0];
				} else if (tableau[2] === 1) {
					ligne.marqueur73 = game_data.couleurs_ordi[1];
				} else {
					ligne.marqueur73 = game_data.couleurs_ordi[2];
				}

				if (tableau[3] === 0) {
					ligne.marqueur83 = game_data.couleurs_ordi[0];
				} else if (tableau[3] === 1) {
					ligne.marqueur83 = game_data.couleurs_ordi[1];
				} else {
					ligne.marqueur83 = game_data.couleurs_ordi[2];
				}

			} else if (game_data.essai === 3) {
				ligne.marqueur14 = couleurs_joueur[0];
				ligne.marqueur24 = couleurs_joueur[1];
				ligne.marqueur34 = couleurs_joueur[2];
				ligne.marqueur44 = couleurs_joueur[3];
				tableau = choix_pion_ordi (couleurs_joueur, game_data.secret);

				if (tableau[0] === 0) {
					ligne.marqueur54 = game_data.couleurs_ordi[0];
				} else if (tableau[0] === 1) {
					ligne.marqueur54 = game_data.couleurs_ordi[1];
				} else { 
					ligne.marqueur54 = game_data.couleurs_ordi[2];
				}

				if (tableau[1] === 0) {
					ligne.marqueur64 = game_data.couleurs_ordi[0];
				} else if (tableau[1] === 1) {
					ligne.marqueur64 = game_data.couleurs_ordi[1];
				} else { 
					ligne.marqueur64 = game_data.couleurs_ordi[2];
				}

				if (tableau[2] === 0) {
					ligne.marqueur74 = game_data.couleurs_ordi[0];
				} else if (tableau[2] === 1) {
					ligne.marqueur74 = game_data.couleurs_ordi[1];
				} else {
					ligne.marqueur74 = game_data.couleurs_ordi[2];
				}

				if (tableau[3] === 0) {
					ligne.marqueur84 = game_data.couleurs_ordi[0];
				} else if (tableau[3] === 1) {
					ligne.marqueur84 = game_data.couleurs_ordi[1];
				} else {
					ligne.marqueur84 = game_data.couleurs_ordi[2];
				}


			} else if (game_data.essai === 4) {
				ligne.marqueur15 = couleurs_joueur[0];
				ligne.marqueur25 = couleurs_joueur[1];
				ligne.marqueur35 = couleurs_joueur[2];
				ligne.marqueur45 = couleurs_joueur[3];
				tableau = choix_pion_ordi (couleurs_joueur, game_data.secret);

				if (tableau[0] === 0) {
					ligne.marqueur55 = game_data.couleurs_ordi[0];
				} else if (tableau[0] === 1) {
					ligne.marqueur55 = game_data.couleurs_ordi[1];
				} else { 
					ligne.marqueur55 = game_data.couleurs_ordi[2];
				}

				if (tableau[1] === 0) {
					ligne.marqueur65 = game_data.couleurs_ordi[0];
				} else if (tableau[1] === 1) {
					ligne.marqueur65 = game_data.couleurs_ordi[1];
				} else { 
					ligne.marqueur65 = game_data.couleurs_ordi[2];
				}

				if (tableau[2] === 0) {
					ligne.marqueur75 = game_data.couleurs_ordi[0];
				} else if (tableau[2] === 1) {
					ligne.marqueur75 = game_data.couleurs_ordi[1];
				} else {
					ligne.marqueur75 = game_data.couleurs_ordi[2];
				}

				if (tableau[3] === 0) {
					ligne.marqueur85 = game_data.couleurs_ordi[0];
				} else if (tableau[3] === 1) {
					ligne.marqueur85 = game_data.couleurs_ordi[1];
				} else {
					ligne.marqueur85 = game_data.couleurs_ordi[2];
				}


			} else if (game_data.essai === 5) {
				ligne.marqueur16 = couleurs_joueur[0];
				ligne.marqueur26 = couleurs_joueur[1];
				ligne.marqueur36 = couleurs_joueur[2];
				ligne.marqueur46 = couleurs_joueur[3];
				tableau = choix_pion_ordi (couleurs_joueur, game_data.secret);

				if (tableau[0] === 0) {
					ligne.marqueur56 = game_data.couleurs_ordi[0];
				} else if (tableau[0] === 1) {
					ligne.marqueur56 = game_data.couleurs_ordi[1];
				} else { 
					ligne.marqueur56 = game_data.couleurs_ordi[2];
				}

				if (tableau[1] === 0) {
					ligne.marqueur66 = game_data.couleurs_ordi[0];
				} else if (tableau[1] === 1) {
					ligne.marqueur66 = game_data.couleurs_ordi[1];
				} else { 
					ligne.marqueur66 = game_data.couleurs_ordi[2];
				}

				if (tableau[2] === 0) {
					ligne.marqueur76 = game_data.couleurs_ordi[0];
				} else if (tableau[2] === 1) {
					ligne.marqueur76 = game_data.couleurs_ordi[1];
				} else {
					ligne.marqueur76 = game_data.couleurs_ordi[2];
				}

				if (tableau[3] === 0) {
					ligne.marqueur86 = game_data.couleurs_ordi[0];
				} else if (tableau[3] === 1) {
					ligne.marqueur86 = game_data.couleurs_ordi[1];
				} else {
					ligne.marqueur86 = game_data.couleurs_ordi[2];
				}



			} else if (game_data.essai === 6) {
				ligne.marqueur17 = couleurs_joueur[0];
				ligne.marqueur27 = couleurs_joueur[1];
				ligne.marqueur37 = couleurs_joueur[2];
				ligne.marqueur47 = couleurs_joueur[3];
				tableau = choix_pion_ordi (couleurs_joueur, game_data.secret);

				if (tableau[0] === 0) {
					ligne.marqueur57 = game_data.couleurs_ordi[0];
				} else if (tableau[0] === 1) {
					ligne.marqueur57 = game_data.couleurs_ordi[1];
				} else { 
					ligne.marqueur57 = game_data.couleurs_ordi[2];
				}

				if (tableau[1] === 0) {
					ligne.marqueur67 = game_data.couleurs_ordi[0];
				} else if (tableau[1] === 1) {
					ligne.marqueur67 = game_data.couleurs_ordi[1];
				} else { 
					ligne.marqueur67 = game_data.couleurs_ordi[2];
				}

				if (tableau[2] === 0) {
					ligne.marqueur77 = game_data.couleurs_ordi[0];
				} else if (tableau[2] === 1) {
					ligne.marqueur77 = game_data.couleurs_ordi[1];
				} else {
					ligne.marqueur77 = game_data.couleurs_ordi[2];
				}

				if (tableau[3] === 0) {
					ligne.marqueur87 = game_data.couleurs_ordi[0];
				} else if (tableau[3] === 1) {
					ligne.marqueur87 = game_data.couleurs_ordi[1];
				} else {
					ligne.marqueur87 = game_data.couleurs_ordi[2];
				}


			} else if (game_data.essai === 7) {
				ligne.marqueur18 = couleurs_joueur[0];
				ligne.marqueur28 = couleurs_joueur[1];
				ligne.marqueur38 = couleurs_joueur[2];
				ligne.marqueur48 = couleurs_joueur[3];
				tableau = choix_pion_ordi(couleurs_joueur, game_data.secret);
				if (tableau[0] === 0) {
					ligne.marqueur58 = game_data.couleurs_ordi[0];
				} else if (tableau[0] === 1) {
					ligne.marqueur58 = game_data.couleurs_ordi[1];
				} else {
					ligne.marqueur58 = game_data.couleurs_ordi[2];
				}

				if (tableau[1] === 0) {
					ligne.marqueur68 = game_data.couleurs_ordi[0];
				} else if (tableau[1] === 1) {
					ligne.marqueur68 = game_data.couleurs_ordi[1];
				} else {
					ligne.marqueur68 = game_data.couleurs_ordi[2];
				}

				if (tableau[2] === 0) {
					ligne.marqueur78 = game_data.couleurs_ordi[0];
				} else if (tableau[2] === 1) {
					ligne.marqueur78 = game_data.couleurs_ordi[1];
				} else {
					ligne.marqueur78 = game_data.couleurs_ordi[2];
				}

				if (tableau[3] === 0) {
					ligne.marqueur88 = game_data.couleurs_ordi[0];
				} else if (tableau[3] === 1) {
					ligne.marqueur88 = game_data.couleurs_ordi[1];
				} else {
					ligne.marqueur88 = game_data.couleurs_ordi[2];
				}

			}

			// INCREMENTAION DU NBR D'ESSAIES
			game_data.tableau[game_data.essai] = ligne;
			game_data.essai++;
			page = fs.readFileSync('./modele_jeu.html', 'utf-8');
			marqueurs.marqueur00 = "<tr> <th>Couleurs : </th> </tr> <tr> <td class='couleurs'> <form action='req_proposer' method='GET'> <select name='couleur1'> <option value='bleu'>Bleu</option> <option value='rouge'>Rouge</option> <option value='jaune'>Jaune</option> <option value='vert'>Vert</option>   <option value='violet'>Violet</option> <option value='orange'>Orange</option> </td> <td class='couleurs'> <select name='couleur2'> <option value='bleu'>Bleu</option> <option value='rouge'>Rouge</option> <option value='jaune'>Jaune</option> <option value='vert'>Vert</option> <option value='violet'>Violet</option> <option value='orange'>Orange</option> </td> <td class='couleurs'> <select name='couleur3'> <option value='bleu'>Bleu</option> <option value='rouge'>Rouge</option> <option value='jaune'>Jaune</option> <option value='vert'>Vert</option> <option value='violet'>Violet</option> <option value='orange'>Orange</option> </td> <td class='couleurs'> <select name='couleur4'> <option value='bleu'>Bleu</option> <option value='rouge'>Rouge</option> <option value='jaune'>Jaune</option> <option value='vert'>Vert</option> <option value='violet'>Violet</option> <option value='orange'>Orange</option> </td> <td class='valider'> <input type='submit' name='valider' value='Valider'> <input type='hidden' name='pseudo' value={pseudo}> </form> </td> </tr>";

			page = page.supplant(marqueurs);
			marqueurs.pseudo = query.pseudo;
			page = page.supplant(marqueurs);

			for (i=0; i<8; i++){
				page = page.supplant(game_data.tableau[i]);
			}
			game_data = JSON.stringify(game_data);
			fs.writeFileSync(query.pseudo  +".json", game_data, "UTF-8");

			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(page);
			res.end();
		}
	}


};
//---------------------------------------------------------------------
module.exports = trait;

