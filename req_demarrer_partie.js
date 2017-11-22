//=========================================================================
//Traitement de "req_demarrer_partie"
//Auteur : groupe HackingParty
//Version : 20/11/2017
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query){

	var page;
	var data;
	var game_data = {};
	var couleurs = ["bleu","rouge","jaune", "vert","violet","orange"];
	var secret = [];
	var i;
	var k;

	game_data.couleurs = couleurs;
	game_data.secret = secret;
	game_data.essai = 0;
	
	// CREATION DU CODE SECRET
	
	for (i=0; i<4; i++){
		k = Math.floor(Math.random()*6);
		secret[i] = couleurs[k];
	}

	game_data = JSON.stringify(game_data);
	fs.writeFileSync("./jeu.json", game_data, "UTF-8");
	


	// AFFICHAGE DE LA modele_jeu

	page = fs.readFileSync('modele_jeu.html', 'utf-8');

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

}

//-----------------------------------------------------------------------------
module.exports = trait;
