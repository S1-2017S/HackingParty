//=========================================================================
// Affichage d'une page d'erreur
// Auteur : P. Thiré
// Modifié par : groupe HackingParty
// Version : 09/10/2015
//=========================================================================

"use strict";

var fs = require("fs");
var path = require("path");
"use strict";


var show_erreur = function (req, res, query) {

	res.writeHead(200, {'Content-Type': 'text/plain'});

	res.write('ERREUR SERVEUR');

	res.end();
};

//--------------------------------------------------------------------------

module.exports = show_erreur;

