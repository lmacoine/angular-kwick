angular.module('authentificationApp')
	.factory('Auth', [ '$http', '$rootScope', '$window', 
	'Session', 'AUTH_EVENTS', 
		function($http, $rootScope, $window, Session, AUTH_EVENTS) {
			authService.connexion() = [...]
			authService.estConnecte() = [...]
			authService.estAutorise() = [...]
			authService.deconnexion() = [...]
			return authService;
		} ]);