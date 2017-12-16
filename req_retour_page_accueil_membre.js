//==============================================================================// Requête retour page accueil
// Auteur : groupe HackingParty
// version : 23/11/2017
//==============================================================================

"use strict"

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var page;
	var marqueurs = {};

	// RETOUR SUR LA PAGE ACCUEIL MEMBRES

	page = fs.readFileSync('./modele_accueil_membre.html', 'utf-8');
	
	marqueurs.pseudo = query.pseudo;
	page = page.supplant(marqueurs);
	res.writeHead(200, {'Content-Type' : 'text/html'});
	res.write(page);
	res.end();

};
//------------------------------------------------------------------------------

module.exports = trait;
