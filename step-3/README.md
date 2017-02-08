# Etape 3 - Les Services
Durant l'étape 3, vous allez découvrir les services `Angular`.

## Back-end
A partir de maintenant, nous allons utiliser un **back-end**. Nous avons développé un back-end à l'aide de **Node.js** que vous pouvez retrouver dans le répertoire [api](../api).

Pour démarrer ce backend, ouvrez un nouveau terminal, positionnez vous à la racine du répertoire, si c'est votre première utilisation, n'oubliez pas de lancer `npm install` avant l'exécution. Vous pouvez à présent lancer le back-end à l'aide de la commande :
```
npm start
```

L'API est exposée sur le port 3000. Vous pouvez par exemple tester la route :
```
http://localhost:3000/wines
```

## WineResource
Le répertoire [`./app/services`](./app/services) contiendra les services de l'application. Nous avons créé le module [`Services`](./app/services/Services.js) qui contiendra les services de notre application. Nous avons créé [`WineResource`](./app/services/WineResource.js) qui, à l'aide du service *Angular* `$resource` permet de consommer l'API exposée par notre **back-end**.

Afin de gérer les constantes de l'application, nous avons créé le module [`constants`](.app/constants) qui permet de stocker l'adresse du **back-end**, **WINE_API**.

Ce service ne doit pas être exposé directement dans le controller. Il nous faut passer par un Service custom qui encapsulera la logique et l'exposera à travers une API générique.

## WineService
Nous allons maintenant implémenter **WineService**, qui sera le modèle de notre application. Ce service encapsule **WineResource**.

Créez le fichier `WineService.js` dans le répertoire `services` et ajoutez le au module.

Ce service contient les fonctions suivantes :
* load(id) : pour charger un vin par son **id**
* loadRated() : pour charger un vin "noté"
* update(wine) : pour mettre à jour un vin, qui retourne une promesse

## CellarContoller
Nous allons maintenant procéder à quelques modifications dans `CellarContoller` afin d'intégrer `WineService`.

Injectez `WineService` dans `CellarContoller`.

Remplacez le contenu de **loadWines** par l'appel au service.

Créez la fonction **loadMyWines** qui encapsule **this.WineService.loadRated()**. Cette fonction doit être appelée dans le constructeur afin d'initialiser `this.wines`.

Ajoutez la fonction **updateWine** qui encapsule **this.WineService.update(wine)**.

Ajoutez la fonction **editWine** qui permet de renseigner le vin en cours d'édition.
```
editWine(wine) {
  this.editedWine = wine;
}
```

Ajoutez la fonction **cancelEdition** qui permet d'annuler l'édition en cours.
```
cancelEdition() {
  delete this.editedWine;
}
```

## Modifier le composant edit-wine
La dernière étape consiste à modifier le composant `edit-wine` afin d'utiliser le service.

Nous allons modifier le binding :
* modifiez **wine** afin qu'il s'appuie désormais sur du *one-way* binding
* ajoutez **save** et **cancel** (*expressions*)

Save doit permettre de mettre à jour le vin dans l'API, mettre fin à l'édition et recharger les vins du modèle.
Cancel met seulement fin à l'édition, sans sauvegarde.

Dans le template [`app/components/cellar/edit/edit-template.html`](app/components/cellar/edit/edit-template.html), effectuez les modifications en fonctions des dernières évolutions du contrôleur.

### Deep copy
Testez maintenant votre application. Faites une moficiation sur un des vins et annulez à l'aide du bouton `Cancel`. Recherchez le vin modifié dans la liste, vous pouvez constater que les modifications sur ce vin n'ont pas été annulées.

Modifiez la fonction **editWine**. Nous allons utiliser la fonction [**cloneDeep de lodash**](https://lodash.com/docs#cloneDeep) qui permet de réaliser une copie en profondeur de l'objet édité afin de ne pas "polluer" le contexte.
```
editWine(wine) {
  this.editedWine = _.cloneDeep(wine);
}
```

Testez afin de valider la résolution du problème.

### Tests
Vous pouvez maintenant modifier les tests dans [`step-3/app/components/cellar/CellarController.spec.js`](step-3/app/components/cellar/CellarController.spec.js) afin qu'ils soient conformes à la nouvelle implémentation des services. Ces tests s'appuient sur [**ngMock**](https://docs.angularjs.org/api/ngMock), le module natif de mocks de *Angluar*.

La préparation de la fixture est effectuée de la manière suivante :
```javascript
beforeEach(inject((_$timeout_, _$httpBackend_, _$log_, _$http_) => {
  $timeout = _$timeout_;
  $httpBackend = _$httpBackend_;
  $log = _$log_;
  $http = _$http_;
  $httpBackend.whenGET('./data/wines.json').respond(200, JSON.stringify(wineData));
  $httpBackend.expectGET('./data/wines.json');
  controller = new CellarController($http, $log);
}));
```

Vous pouvez ensuite écrire vos tests et vos assertions de la même manière que les tests unitaires écrits jusque là.

## Prochaine étape

Une fois cette étape terminée, vous pouvez aller consulter la [version corrigée](../step-3-done) puis aller jusqu'à [l'étape suivante](../step-4)
