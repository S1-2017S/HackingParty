//================================================================================// Requête qui permet d'abandonner la partie
// Auteur : Groupe HackingParty
// Version : 27/11/2017
//================================================================================

"use strict"

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
	
	var page;
	
	// ABANDON DE LA PARTIE

	page = fs.readFileSync('modele_fin_de_partie.html', 'Utf-8')

	res.writeHead(200, {'Content-Type' : 'text/html'});
	res.write(page);
	res.end();

};
//--------------------------------------------------------------------------------

module.exports = trait;
