# Etape 2 - Les Contrôleurs & les formulaires
Ce TP a pour objectif de vous familiariser avec les **contrôleurs** et les **formulaires** *AngularJS*.

Positionnez vous dans le répertoire `step-2`.

## CellarController
Nous allons maintenant créer un contrôleur dans le composant `wine-cellar`. Ce contrôleur a pour objectif de gérer les échanges entre le composant et le modèle de l'application (les services). Dans un premier temps (TP2), ce contrôleur contient de la logique. Cet état est transitoire, le temps du développement et du `workshop` afin de découvrir les concepts au fur et à mesure. A terme le contrôleur ne contient que des functions permettant de faire le lien avec les services.

Jusqu'à présent, les composants créés disposaient bien d'un contrôleur (accessible par $ctrl), mais celui-ci est initialisé à :
```
function() {}
```

Créez un fichier `CellarController.js`, le controller expose 2 fonctions :
* **loadWines** : permet de charger les vins (pour l'instant à partir du fichier [`data/wines.json`](./public/data/wines.json). Vous pouvez utiliser `$http.get('./data/wines.json', ... )` pour charger les données depuis le fichier. Les données sont chargées sous la forme d'un tableau d'objets, stockées dans `this.wines`. **Attention**, vous devrez modifier la structure des objets pour les faire correspondre au format attendu : [`./app/components/cellar/test-data/wines.js`](./app/components/cellar/test-data/wines.js).
* **editWine** : permet de renseigner le vin en cours d'édition au niveau du contrôleur (à stocker dans `this.editedWine`)

Dans le constructeur du contrôleur, effectuez un appel à **loadWines** afin de charger la liste des vins.

## ngRepeat et barre de recherche
Nous allons implémenter le chargement des cartes en fonction de la source de données et la barre de recherche.

### ngRepeat sur les cartes
Nous allons afficher l'ensemble des `wine-card` à partir des données fournies par le contrôleur. On ne conserve qu'un seul élément `<wine-card>` que nous allons répéter à l'aide de la directive *AngularJS* [**ngRepeat**](https://docs.angularjs.org/api/ng/directive/ngRepeat).

Nous allons remplacer, dans le template, la liste de `wine-card` par l'élément suivant :
```
  <wine-card ng-repeat="wine in $ctrl.wines" desc="wine" ></wine-card>
```

La directive **ngRepeat** permet de répéter autant de fois qu'il y a d'éléments dans le tableau `wines` le composant, `wine` est la variable d'itération.

### Barre de recherche
Nous allons utiliser la barre de recherche pour filtrer les cartes affichées. Comme vous pouvez le constater, la barre de recherche contient la directive `ng-model="$ctrl.query"` qui permet de binder le contenu de l'input dans la variable `$ctrl.query`.

Vous pouvez utiliser cette variable directement dans le filtre [**filter**](https://docs.angularjs.org/api/ng/filter/filter) afin de filtrer les `wine-card` à afficher en fonction du contenu du champ de recherche.

L'idée ici étant que la liste des cartes se mette à jour automatiquement lorsque `$ctrl.query` est modifié.

A l'aide du filtre [**orderBy**](https://docs.angularjs.org/api/ng/filter/orderBy), ordonnez les vins par **date** décroissante.

## Composant d'édition
Le composant d'édition permet d'éditer le vin sélectionné par l'utilisateur.

### Passage en mode édition
Pour passer en mode édition, nous allons utiliser l'attibut `edit` du composant `wine-card`.

Modifiez le binding de `edit` afin de le passer en **expression** plutôt que **two-way**.

Nous allons nous appuyer sur la fonction `editWine` de `CellarController` (`edit="$ctrl.editWine(wine)"`) qui sera évaluée dans le scope parent à la suite d'un événement dans le composant enfant. L'argument de cette expression (`wine`) étant valorisé par l'enfant au moment de l'appel.

### Composant Edit
Le répertoire `edit` dans le répertoire `cellar` contient les éléments du composant `wine-edit`. Ce composant va nous permettre d'éditer un des vins.

Créez les fichiers suivants dans ce répertoire :
* `Edit.js` : le module
* `EditComponent.js` : le composant

Le composant `wine-edit` contient un attribut (binding) :
* **wine** : la description du vin (l'objet), *two-way*, qui permet d'éditer l'objet vin passé en paramètre.

Le fichier [`edit-template.html`](app/components/cellar/edit/edit-template.html), fourni, correspond au template du composant `wine-edit`, vous devez maintenant, à l'aide de la directive native *Angular*  [**ngModel**](https://docs.angularjs.org/api/ng/directive/ngModel), binder l'objet et le formulaire.

### Validation
Nous allons utiliser la validation **AngularJS** pour valider le formulaire, nous devons d'abord désactiver la validation HTML5 en ajoutant l'attribut `novalidate` dans l'élément `form`.

Vous pouvez à présent ajouter des validateurs en utilisant les éléments suivants :
```
<p ng-show="wineForm.name.$invalid && !wineForm.name.$pristine" class="help-block text-danger">Le nom est obligatoire</p>
```

Il est possible de désactiver le bouton submit à l'aide de la directive :
```
ng-disabled="valeurATester"
```

À vous de trouver quelle expression signifie que le formulaire est invalide.

## Tests unitaires
Créez un fichier `CellarController.spec.js` afin de créer les tests unitaires de `CellarController.js`.
Ces tests peuvent valider que les données renvoyées par `CellarController.loadWines` correspondent bien au contenu du fichier [`./app/components/cellar/test-data/wines.js`](./app/components/cellar/test-data/wines.js).

## Prochaine étape

Une fois cette étape terminée, vous pouvez aller consulter la [version corrigée](../step-2-done) puis aller jusqu'à [l'étape suivante](../step-3).
