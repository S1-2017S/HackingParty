//=========================================================================
//Traitement de "req_demarrer_partie"
//Auteur : groupe HackingParty
//Version : 20/11/2017
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query){
	
	var marqueurs;
	var page;
	var data;
	var game_data = {};
	var couleurs = ["bleu","rouge","jaune", "vert","violet","orange"];
	var couleurs_ordi = ["rien","blanc", "noir"];
	var secret = [];
	var i;
	var k;
	var tableau = [];

	game_data.couleurs_ordi = couleurs_ordi;
	game_data.tableau;
	game_data.couleurs = couleurs;
	game_data.secret = secret;
	game_data.essai = 0;

// COMMENTAIRE MARQUEUR 

	var ligne1 = {};

	ligne1.marqueur11 = "\n";
	ligne1.marqueur21 = "\n";
	ligne1.marqueur31 = "\n";
	ligne1.marqueur41 = "\n";
	ligne1.marqueur51 = "\n";
	ligne1.marqueur61 = "\n";
	ligne1.marqueur71 = "\n";
	ligne1.marqueur81 = "\n";

	var ligne2 = {};

	ligne2.marqueur12 = "\n";
	ligne2.marqueur22 = "\n";
	ligne2.marqueur32 = "\n";
	ligne2.marqueur42 = "\n";
	ligne2.marqueur52 = "\n";
	ligne2.marqueur62 = "\n";
	ligne2.marqueur72 = "\n";
	ligne2.marqueur82 = "\n";

	var ligne3 = {};

	ligne3.marqueur13 = "\n";
	ligne3.marqueur23 = "\n";
	ligne3.marqueur33 = "\n";
	ligne3.marqueur43 = "\n";
	ligne3.marqueur53 = "\n";
	ligne3.marqueur63 = "\n";
	ligne3.marqueur73 = "\n";
	ligne3.marqueur83 = "\n";

	var ligne4 = {};

	ligne4.marqueur14 = "\n";
	ligne4.marqueur24 = "\n";
	ligne4.marqueur34 = "\n";
	ligne4.marqueur44 = "\n";
	ligne4.marqueur54 = "\n";
	ligne4.marqueur64 = "\n";
	ligne4.marqueur74 = "\n";
	ligne4.marqueur84 = "\n";

	var ligne5 = {};

	ligne5.marqueur15 = "\n";
	ligne5.marqueur25 = "\n";
	ligne5.marqueur35 = "\n";
	ligne5.marqueur45 = "\n";
	ligne5.marqueur55 = "\n";
	ligne5.marqueur65 = "\n";
	ligne5.marqueur75 = "\n";
	ligne5.marqueur85 = "\n";

	var ligne6 = {};

	ligne6.marqueur16 = "\n";
	ligne6.marqueur26 = "\n";
	ligne6.marqueur36 = "\n";
	ligne6.marqueur46 = "\n";
	ligne6.marqueur56 = "\n";
	ligne6.marqueur66 = "\n";
	ligne6.marqueur76 = "\n";
	ligne6.marqueur86 = "\n";

	var ligne7 = {};

	ligne7.marqueur17 = "\n";
	ligne7.marqueur27 = "\n";
	ligne7.marqueur37 = "\n";
	ligne7.marqueur47 = "\n";
	ligne7.marqueur57 = "\n";
	ligne7.marqueur67 = "\n";
	ligne7.marqueur77 = "\n";
	ligne7.marqueur87 = "\n";
	
	var ligne8 = {};

	ligne8.marqueur18 = "\n";
	ligne8.marqueur28 = "\n";
	ligne8.marqueur38 = "\n";
	ligne8.marqueur48 = "\n";
	ligne8.marqueur58 = "\n";
	ligne8.marqueur68 = "\n";
	ligne8.marqueur78 = "\n";
	ligne8.marqueur88 = "\n";
	
	var ligne9 = {};

	ligne9.marqueur19 = "\n";
	ligne9.marqueur29 = "\n";
	ligne9.marqueur39 = "\n";
	ligne9.marqueur49 = "\n";
	ligne9.marqueur59 = "\n";
	ligne9.marqueur69 = "\n";
	ligne9.marqueur79 = "\n";
	ligne9.marqueur89 = "\n";

	var ligne10 = {};

	ligne10.marqueur110 = "\n";
	ligne10.marqueur210 = "\n";
	ligne10.marqueur310 = "\n";
	ligne10.marqueur410 = "\n";
	ligne10.marqueur510 = "\n";
	ligne10.marqueur610 = "\n";
	ligne10.marqueur710 = "\n";
	ligne10.marqueur810 = "\n";

	var ligne11 = {};

	ligne11.marqueur111 = "\n";
	ligne11.marqueur211 = "\n";
	ligne11.marqueur311 = "\n";
	ligne11.marqueur411 = "\n";
	ligne11.marqueur511 = "\n";
	ligne11.marqueur611 = "\n";
	ligne11.marqueur711 = "\n";
	ligne11.marqueur811 = "\n";

	var ligne12 = {};

	ligne12.marqueur112 = "\n";
	ligne12.marqueur212 = "\n";
	ligne12.marqueur312 = "\n";
	ligne12.marqueur412 = "\n";
	ligne12.marqueur512 = "\n";
	ligne12.marqueur612 = "\n";
	ligne12.marqueur712 = "\n";
	ligne12.marqueur812 = "\n";


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

	game_data.tableau = tableau;

	// CREATION DU CODE SECRET

	for (i=0; i<4; i++){
		k = Math.floor(Math.random()*6);
		secret[i] = couleurs[k];
	}

	// AFFICHAGE DE LA modele_jeu

	page = fs.readFileSync('modele_jeu.html', 'utf-8');

	for (i=0; i<12; i++){
		console.log(game_data.tableau[i]);
		page = page.supplant(game_data.tableau[i]);
	}

	marqueurs = {}
	marqueurs.pseudo = query.pseudo;
	page = page.supplant(marqueurs);

	game_data = JSON.stringify(game_data);
	fs.writeFileSync("./jeu.json", game_data, "UTF-8");

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

}

//-----------------------------------------------------------------------------
module.exports = trait;
