var authentificationApp = angular.module
('authentificationApp', ['ui.router', 'ui.bootstrap'])
/*Constantes gérant la connexion*/
	.constant('USER_ROLES', {
		 all : '*',
		 admin : 'admin',
		 utilisateur : 'utilisateur',
		 invite : 'invite'
	}).constant('AUTH_EVENTS', {
		 connexionReussie : 'auth-connexion-reussie',
		 connexionEchouee : 'auth-connnexion-echouee',
		 deconnexionReussie : 'auth-deconnexion-reussie',
		 sessionExpiree : 'auth-session-expiree',
		 nonConnecte : 'auth-non-connecte',
		 nonAutorise : 'auth-not-autorise'
	})