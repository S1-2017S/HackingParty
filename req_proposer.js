//============================================================================
//Traitement de "req_proposer"
//Auteur : groupe HackingParty
//Version : 21/11/2017
//===========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query){
	
	var page;
	var game_data = fs.readFileSync("./jeu.json", "UTF-8");
	game_data = JSON.parse(game_data);
	
	var couleurs_joueur = [];

	couleurs_joueur[0] = query.couleur1;
	couleurs_joueur[1] = query.couleur2;
	couleurs_joueur[2] = query.couleur3;
	couleurs_joueur[3] = query.couleur4;
/*
	var i;
	for (i=0; i<4; i++){
		console.log(couleurs_joueur[i]);
	}
*/

	l
	page = fs.readFileSync('modele_jeu.html', 'utf-8');


	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

}
//---------------------------------------------------------------------

module.exports = trait;

