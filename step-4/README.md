# Etape 4 - Le Routeur
Durant l'étape 4, vous allez découvrir le routeur `Angular`.

## Les états
Nous avons ajouté un menu dans l'application. Ce menu contient les items suivants :
* **Ma cave** : Les vins que vous avez évalué (qui ont une note)
* **A découvrir** : Les vins à découvrir
* **Accord Mets/Vins** : Pour découvrir les accords mets/vins pour un sélectionné

Les items de ce menu correspondent aux différents états de l'application.

Nous avons ajouté les composants `wine-discover` et `wine-food` qui correspodent aux deux nouvelles pages.

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
* state : **cellar**, route : **/cellar**, composant : **`<wine-cellar></wine-cellar>`**
* state : **discover**, route : **/discover**, composant : **`<wine-discover></wine-discover>`**

### Redirections et routes par défaut
Dans `$urlRouterProvider` ajoutez les redirections suivantes :
* /cellar -> /cellar/cards
* /discover -> /discover/cards

Ajoutez la route par défaut :
* /cellar

## Paramètres des URLs
Nous allons maintenant ajouter une route paramètrée `/food/:id` (state : **food**, route : **/food/:id**, composant : **`<wine-food wines="wines"></wine-food>`**):
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

## Vues imbriquées
Les composants `wine-cellar` et `wine-discover` ont été refactoriser afin de se baser sur des routes imbriquées pour gérer leur état interne, ces routes imbriquées sont gérées, respectivement, par les fichiers [`app/components/cellar/cellarRoutes.js`](app/components/cellar/cellarRoutes.js) et [`app/components/discover/discoverRoutes.js`](app/components/discover/discoverRoutes.js). Les templates [`app/components/cellar/cellar-template.html`](app/components/cellar/cellar-template.html) et [`app/components/discover/discover-template.html`](app/components/discover/discover-template.html) ont été adaptés pour permettre les changements d'états, les composants communs ont été déplacés dans le répertoire [`app/components/common`](app/components/common).

Implémentez les vues imbriquées restantes :
* state : **cellar.cards**, route : **/cards**, composant : **`<wine-cards wines="wines" with-input="true"></wine-cards>`**
  * **wines** est chargé à partir de `WineService.loadRated()`
* state : **cellar.edit**, route : **/card/:id**, composant : **`<wine-edit wine="wines[0]" save="$ctrl.save(wines[0])"></wine-edit>`**
  * **wines** est chargé à partir de `WineService.load($stateParams.id)`
* state : **discover.cards**, route : **/cards**, composant : **`<wine-cards wines="wines" with-input="false"></wine-cards>`**
  * **wines** est alimenté à partir de `WineService.loadAll()`

## Prochaine étape

Une fois cette étape terminée, vous pouvez aller consulter la [version corrigée](../step-4-done) puis aller jusqu'à [l'étape suivante](../step-5)
