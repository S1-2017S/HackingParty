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

	// AFFICHAGE DE LA modele_jeu

	page = fs.readFileSync('modele_jeu.html', 'utf-8');

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

}


//-----------------------------------------------------------------------------
module.exports = trait;
