//Création du module AngularJS "rainbowCake"
var app = angular.module('rainbowCake', []);

// Ajout de l'URL du service greenvelvet de messagerie à la white liste d'angularjs
app.config(function($sceDelegateProvider) {
	$sceDelegateProvider.resourceUrlWhitelist([
	    // Allow same origin resource loads.
	    'self',
	    // Allow loading from our assets domain.  Notice the difference between * and **.
	    'https://greenvelvet.alwaysdata.net/kwick/api/**'
	  ]);
});

app.controller('HomeController', function($http, $scope) {

	$scope.pseudo_inscription = '';
	$scope.mdp_inscription = '';

	$scope.inscription = function() {
		var url_cible = 'https://greenvelvet.alwaysdata.net/kwick/api/signup/'+ $scope.pseudo_inscription +'/'+ $scope.mdp_inscription;

		$http
		.jsonp(url_cible)
		.then(function(reponse_serveur) {
			// Le serveur a répondu qqch
			var token = reponse_serveur.data.result.token;
			var user_id = reponse_serveur.data.result.id;

			if (token) {
				// Sauvegarde de ces infos dans le local storage (pour conserver les valeurs pour l'autre page de messagerie)
				localStorage.setItem('kwick.token', token);
				localStorage.setItem('kwick.user_id', user_id);

				location.href = 'messagerie.html';
			} else {
				alert('Erreur de connexion. Veuillez réessayer.');
			}
		});
	};

	$scope.pseudo_connexion = '';
	$scope.mdp_connexion = '';

	$scope.connexion = function() {
		var url_cible = 'https://greenvelvet.alwaysdata.net/kwick/api/login/'+ $scope.pseudo_connexion +'/'+ $scope.mdp_connexion;

		$http
		.jsonp(url_cible)
		.then(function(reponse_serveur) {
			// Le serveur a répondu qqch
			var token = reponse_serveur.data.result.token;
			var user_id = reponse_serveur.data.result.id;

			if (token) {
				// Sauvegarde de ces infos dans le local storage (pour conserver les valeurs pour l'autre page de messagerie)
				localStorage.setItem('kwick.token', token);
				localStorage.setItem('kwick.user_id', user_id);

				location.href = 'messagerie.html';					
			} else {
				alert("Mot de passe invalide. Veuillez réessayer.");
			}
		});
	};

});

//Enregistrer le controlleur sous le nom "MessageController"
app.controller('MessageController', function($http, $scope) {

	const TOKEN = localStorage.getItem('kwick.token');
	const USER_ID = localStorage.getItem('kwick.user_id');

	$scope.deconnexion = function() {

		var url_cible = 'https://greenvelvet.alwaysdata.net/kwick/api/logout/'+ TOKEN +'/'+ USER_ID;

		$http
		.jsonp(url_cible)
		.then(function(reponse_serveur) {
			// Le serveur a répondu qqch
			var token = reponse_serveur.data.result.token;
			var user_id = reponse_serveur.data.result.id;

			// Supprime les infos stockées dans le local storage
			localStorage.removeItem('kwick.token');
			localStorage.removeItem('kwick.user_id');

			location.href = 'index.html';
		});
	};

	/**
	 * Déclaration des méthodes angularJS
	 */
	$scope.message = '';
	$scope.messages = [];
	$scope.liste_utilisateurs = [];

	$scope.recuperer_utilisateurs = function() {
		var url_cible = 'https://greenvelvet.alwaysdata.net/kwick/api/user/logged/' + TOKEN;

		$http
		.jsonp(url_cible)
		.then(function(reponse_serveur) {
			$scope.liste_utilisateurs = reponse_serveur.data.result.user;
			setTimeout($scope.recuperer_utilisateurs, 10000);
		});
	}

	$scope.envoyer_message = function() {
		var url_cible = 'https://greenvelvet.alwaysdata.net/kwick/api/say/'+ TOKEN + '/' + USER_ID + '/' + $scope.message ;
		$http
		.jsonp(url_cible)
		.then(function(reponse_serveur) {
			$scope.message = '';
			$scope.afficher_messages();
		});
	}
		

	$scope.afficher_messages = function() {
		//remplacer avec le token et laisser le timestamp (= signature intemporelle) (0 = tous les msgs)
		var url_cible = 'https://greenvelvet.alwaysdata.net/kwick/api/talk/list/' + TOKEN + '/0';
		$http
		.jsonp(url_cible)
		.then(function(reponse_serveur) {
			$scope.messages = reponse_serveur.data.result.talk;
		});
	}

	$scope.maj_messages = function() {
		$scope.afficher_messages();
		setTimeout($scope.maj_messages, 10000);
	}

	$scope.recuperer_utilisateurs();
	$scope.maj_messages();
});
