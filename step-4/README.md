# Etape 4 - Le Routeur
Durant l'étape 4, vous allez découvrir le routeur `Angular`.

## Les états
Nous avons ajouté un menu dans l'application. Ce menu contient les items suivants :
* **Ma cave** : Les vins que vous avez évélué
* **A découvrir** : Les vins à découvrir
* **Accord Mets/Vins** : Pour découvrir les accords mets/vins pour un sélectionné

Les items de ce menu correspondent aux différents états de l'application.

Nous avons ajouté les components `wine-discover` et `wine-food` qui correspodent aux deux nouvelles pages.

## appRoutes
Nous avons ajouté la dépendance `"angular-ui-router": "0.2.18"` dans le `package.json`.

Nous allons à présent configurer le routeur dans le fichier [`appRoutes.js`](./app/appRoutes.js).

### <ui-view></ui-view>
Dans `index.html`, ajoutez, sous le composant `<wine-menu></wine-menu>`, le composant suivant :
```
<ui-view></ui-view>
```
Ce composant nous permet d'indiquer au routeur à quel endroit injecter les templates.

### configuration des routes
Dans le fichier [`appRoutes.js`](./app/appRoutes.js), le `$stateProvider` nous permet de configurer les routes.

Nous allons configurer les routes suivantes :
* **cellar ->  ```<wine-cellar></wine-cellar>```**
* **discover -> ```<wine-discover></wine-discover>```**
* **/food -> ```<wine-food wines="wines"></wine-food>```**

### Redirections et routes par défaut
Dans `$urlRouterProvider` ajoutez les redirections suivantes :
* /cellar -> /cellar/cards
* /discover -> /discover/cards

Ajoutez la route par défaut :
* /cellar

### Paramètres
Nous allons maintenant ajouter une route paramètrée `/food/id` :

```
.state('food', {
  url: '/food/:id',
  template: '<wine-food wines="wines"></wine-food>',
  controller: ($scope, wines) => Object.assign($scope, { wines }),
  resolve: {
    WineService: 'WineService',
    wines: ['WineService', '$stateParams', (WineService, $stateParams) =>
      WineService.load($stateParams.id)],
  }
```

Le paramètre `id` est utiliser pour appeler `WineService.load()` et pour charger la valeur de `wines` passée en paramètre du template.

## Prochaine étape

Une fois cette étape terminée, vous pouvez aller consulter la [version corrigée](../step-4-done) puis aller jusqu'à [l'étape suivante](../step-5)
