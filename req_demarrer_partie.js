//=========================================================================
//Traitement de "req_demarrer_partie"
//Auteur : groupe HackingParty
//Version : 20/11/2017
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query){

	var marqueurs = {};
	var page;
	var data;
	var game_data = {};
	var couleurs = ["bleu","rouge","jaune", "vert","violet","orange"];
	var secret = [];
	var i;
	var k;
	
	var tableau = [];
	game.data.tableau;

	game_data.couleurs = couleurs;
	game_data.secret = secret;
	game_data.essai = 0;
	
	var ligne1 = {};

	ligne1.marqueur11 = " ";
	ligne1.marqueur21 = " ";
	ligne1.marqueur31 = " ";
	ligne1.marqueur41 = " ";
	ligne1.marqueur51 = " ";
	ligne1.marqueur61 = " ";
	ligne1.marqueur71 = " ";
	ligne1.marqueur81 = " ";

	var ligne2 = {};

	ligne2.marqueur12 = " ";
	ligne2.marqueur22 = " ";
	ligne2.marqueur32 = " ";
	ligne2.marqueur42 = " ";
	ligne2.marqueur52 = " ";
	ligne2.marqueur62 = " ";
	ligne2.marqueur72 = " ";
	ligne2.marqueur82 = " ";

	var ligne3 = {};

	ligne3.marqueur13 = " ";
	ligne3.marqueur23 = " ";
	ligne3.marqueur33 = " ";
	ligne3.marqueur43 = " ";
	ligne3.marqueur53 = " ";
	ligne3.marqueur63 = " ";
	ligne3.marqueur73 = " ";
	ligne3.marqueur83 = " ";

	var ligne4 = {};

	ligne4.marqueur14 = " ":
	ligne4.marqueur24 = " ";
	ligne4.marqueur34 = " ";
	ligne4.marqueur44 = " ";
	ligne4.marqueur54 = " ";
	ligne4.marqueur64 = " ";
	ligne4.marqueur74 = " ";
	ligne4.marqueur84 = " ";

	var ligne5 = {};

	ligne5.marqueur15 = " ";
	ligne5.marqueur25 = " ";
	ligne5.marqueur35 = " ";
	ligne5.marqueur45 = " ";
	ligne5.marqueur55 = " ";
	ligne5.marqueur65 = " ";
	ligne5.marqueur75 = " ";
	ligne5.marqueur85 = " ";

	var ligne6 = {};

	ligne6.marqueur16 = " ";
	ligne6.marqueur26 = " ";
	ligne6.marqueur36 = " ";
	ligne6.marqueur46 = " ";
	ligne6.marqueur56 = " ";
	ligne6.marqueur66 = " ";
	ligne6.marqueur76 = " ";
	ligne6.marqueur86 = " ";

	var ligne7 = {};

	ligne7.marqueur17 = " ";
	ligne7.marqueur27 = " ";
	ligne7.marqueur37 = " ";
	ligne7.marqueur47 = " ";
	ligne7.marqueur57 = " ";
	ligne7.marqueur67 = " ";
	ligne7.marqueur77 = " ";
	ligne7.marqueur87 = " ";
	
	var ligne8 = {};

	ligne8.marqueur18 = " ";
	ligne8.marqueur28 = " ";
	ligne8.marqueur38 = " ";
	ligne8.marqueur48 = " ";
	ligne8.marqueur58 = " ";
	ligne8.marqueur68 = " ";
	ligne8.marqueur78 = " ";
	ligne8.marqueur88 = " ";
	
	var ligne9 = {};

	ligne9.marqueur19 = " ";
	ligne9.marqueur29 = " ";
	ligne9.marqueur39 = " ";
	ligne9.marqueur49 = " ";
	ligne9.marqueur59 = " ";
	ligne9.marqueur69 = " ";
	ligne9.marqueur79 = " ";
	ligne9.marqueur89 = " ";

	var ligne10 = {};

	ligne10.marqueur110 = " ";
	ligne10.marqueur210 = " ":
	ligne10.marqueur310 = " ";
	ligne10.marqueur410 = " ";
	ligne10.marqueur510 = " ";
	ligne10.marqueur610 = " ";
	ligne10.marqueur710 = " ";
	ligne10.marqueur810 = " ";

	var ligne11 = {};

	ligne11.marqueur111 = " ";
	ligne11.marqueur211 = " ";
	ligne11.marqueur311 = " ";
	ligne11.marqueur411 = " ";
	ligne11.marqueur511 = " ";
	ligne11.marqueur611 = " ";
	ligne11.marqueur711 = " ";
	ligne11.marqueur811 = " ";

	var ligne12 = {};

	ligne12.marqueur112 = " ";
	ligne12.marqueur212 = " ";
	ligne12.marqueur312 = " ";
	ligne12.marqueur412 = " ";
	ligne12.marqueur512 = " ";
	ligne12.marqueur612 = " ";
	ligne12.marqueur712 = " ";
	ligne12.marqueur812 = " ";


	tableau[0] = ligne1;
	tableau[1] = ligne2;
	tableau[2] = ligne3;
	tableau[3] = ligne4;
	tableau[4] = ligne5;
	tableau[5] = ligne6;
	tableau[6] = ligne7;
	tableau[7] = ligne8;
	tableau[8] = ligne9;
	tableau[9] = ligne10;
	tableau[10] = ligne11;
	tableau[11] = ligne12;

	// CREATION DU CODE SECRET
	
	for (i=0; i<4; i++){
		k = Math.floor(Math.random()*6);
		secret[i] = couleurs[k];
	}

	game_data = JSON.stringify(game_data);
	fs.writeFileSync("./jeu.json", game_data, "UTF-8");
	


	// AFFICHAGE DE LA modele_jeu

	page = fs.readFileSync('modele_jeu.html', 'utf-8');

	marqueurs.pseudo = query.pseudo;
	page = page.supplant(marqueurs);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

}

//-----------------------------------------------------------------------------
module.exports = trait;
