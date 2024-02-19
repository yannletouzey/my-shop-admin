# My Shop

## Connexion

### Admin et super admin
- Consulter les détails d’un article
- Consulter les données utilisateur (panier, historique,…)
- Ajouter des articles
	- Rentrer les infos minimum requises ainsi qu’une image minimum pour le présenté.
- Supprimer des articles
	- Supprime l’article dans la table "product" ainsi que toutes les images liées à celui-ci
- Modifier des articles
- Super admin
	- Création de compte admin
	- Accès total au back-office
	- Création opération de promotion,…

### Utilisateur
- Consulter historique des commandes, demande de retour, …
- Accès au service après vente
- Ajouter des articles dans le panier
	- Panier existant
		- Supprimer des articles
			- Mise à jour de la table "product"  du nombre d’article supprimé  du panier. 
			- Quantité supérieur à 1.
				- Mettre à jour le panier (table "cartItem") en soustrayant le nombre d’article supprimé.
				- Mettre à jour la table "cart" avec le nouveau montant du panier (table "cartItem")
			- Quantité 1
				- Mettre à jour le panier (table "cartItem") en soustrayant le nombre d’article supprimé et comme la quantité sera de 0, supprimé l’article complètement du panier
				- Mettre à jour la table "cart" avec le nouveau montant du panier (table "cartItem")
		- Ajout de l’article dans la table "cartItem" avec l’id de l’utilisateur, l’id de l’article ainsi que la quantité.
			- Mise à jour de la table "product"  du nombre d’article mis dans le panier. 
				- Si la quantité du produit restant dans la table "product" est à 0, mettre à jour la donnée sur le site pour que l’article ne soit plus disponible
		- Mise à jour de la table "cart" avec le montant total des articles de la table "cartItem"
	- Panier non existant
		- Création du premier article dans la table "cart" avec l’id de l’utilisateur, l’id de l’article ainsi que la quantité.
		- Mise à jour de la table "product"  du nombre d’article mis dans le panier. 
			- Si la quantité du produit est à 0, mettre à jour la donnée sur le site pour que l’article ne soit plus disponible

## Inscription

### Connexion

## Consulter les articles

### Ajouter des articles dans le panier
- Connexion
- inscription
