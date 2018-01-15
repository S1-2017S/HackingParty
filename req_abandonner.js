//================================================================================// Requête qui permet d'abandonner la partie
// Auteur : Groupe HackingParty
// Version : 27/11/2017
//================================================================================

"use strict"

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
	
	var marqueurs = {};
	var page;
	var i;
	var game_data = fs.readFileSync(query.pseudo +".json", "UTF-8");
	game_data = JSON.parse(game_data);
	var tableau = game_data.tableau;
	
	// ABANDON DE LA PARTIE

	page = fs.readFileSync('./modele_jeu.html', 'Utf-8')
	
	marqueurs = {};
	marqueurs.marqueur00 = "<br>Dommage, en espérant que vous reviendrez.   <form action='req_retour_page_accueil_membre'> <input type='submit' name'Return' value='Retour accueil membre'></a> <input type='hidden' name='pseudo' value={pseudo}> </form>";

	page = page.supplant(marqueurs);
	marqueurs.pseudo = query.pseudo;
	page = page.supplant(marqueurs);
	for (i=0; i<8; i++){
		page = page.supplant(game_data.tableau[i]);
	}

	res.writeHead(200, {'Content-Type' : 'text/html'});
	res.write(page);
	res.end();

};
//--------------------------------------------------------------------------------

module.exports = trait;
