# Etape 0 - Installation de l'environnement, création d'un module Angular et du premier TU
Positionnez vous dans le répertoire `step-0`.

## Hello {{AngularJS}}

Créer le fichier `public/index.html`, ce fichier contient le code suivant :

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <title>Workshop AngularJS</title>
</head>
<body ng-app>
    {{'Bienvenue' + ' dans ce ' + 'workshop !'}}

    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min.js"></script>
</body>
</html>
```

Ouvrez la page dans votre navigateur, comme vous pouvez l'observer le template est résolu (la page affiche **Bienvenue dans ce workshop !** et non **{{'Bienvenue' + ' dans ce ' + 'workshop !'}}**). L'attribut `ng-app` dans l'élément `<body>` permet de bootstraper l'application `AngularJS` (le framework étant chargé depuis un **CDN**).

## package.json

Nous allons à présent créer l'application AngularJS qui sera mise en oeuvre dans ce workshop. Créez un nouveau dossier pour votre application. Une fois dans ce dossier lancez la commande :
```
npm init
```

Répondez aux diverses questions de l'assistant afin d'initialiser votre fichier `package.json`, pour aller plus vite vous pouvez taper `Enter` à chaque question.

Une fois le fichier créé, installez les dépendances de la manière suivante :

```
npm install --save angular@1.5.5
```

Avec cette commande, vous spécifiez à `npm` d'aller chercher la version `1.5.5` du paquet `angular` sur [`npmjs.com`](https://www.npmjs.com/), de l'installer en local dans le dossier `node_modules` et de le déclarer comme dépendance dans le fichier `package.json` (grâce à l'argument --save).

Une autre possibilité est de créez un fichier `package.json` et de déclarer manuellement les dépendances `angular` :

```json
{
    "name": "angularjs-workshop",
    "description": "Workshop AngularJS",
    "version": "0.1.0",
    "dependencies": {
        "angular": "1.5.5"
    }
}
```

Si vous avez choisi la seconde option, vous devez maintenant lancer la commande `npm install` afin de télécharger localement les dépendances (elles se trouvent dans le répertoire `node_modules`)

## Build avec Webpack

Nous utilisons l'outil [Webpack](https://webpack.github.io/) afin de construire notre application.

En complément de Webpack, nous utilisons [Babel](https://babeljs.io/), un compilateur Javascript qui permet de traduire les futures versions de JS en ES5.
Dans notre cas, nous utilisons le plugin `es2015`.

Installez les dépendances de développement nécessaires au build Webpack à l'aide de la ligne de commande suivante :

```
npm install --save-dev webpack@1.13.0 babel-loader@6.2.4 babel-preset-es2015@6.6.0
```


Une autre possibilité est de mettre à jour directement le fichier `package.json`, en ajoutant le block suivant :

```json
"devDependencies": {
    "webpack": "1.13.0",
    "babel-loader": "6.2.4",
    "babel-preset-es2015": "6.6.0"
}
```

Ici l'argument `--save-dev` indique que le dépendance doit être inscrite dans les dépendances du build et non du projet lui-même.

Dans la suite de ce workshop, nous utiliserons l'outil en ligne de commande pour installer les dépendances. Si vous préférez, éditer directement le fichier `package.json`, n'hésitez pas (sans oublier de lancer la commande `npm install` après chaque modification).

Créez le fichier `webpack.config.js` permettant de configurer Webpack et Babel :

```javascript
var webpack = require('webpack');

module.exports = {
    output: {
        path: './public/js/',
        publicPath: '/js/',
        filename: 'bundle.js'
    },
    entry: {
        app: ['./app/bootstrap.js']
    },
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
```

La configuration de Webpack est simple :

* Le point d'entrée est le fichier `app/app.js`
* Le fichier `bundle.js` est généré dans le répertoire `public/js`
* Le build exécute le lanceur `babel` avec le plugin `es2015`
    * *Remarque : les plugins babel peuvent également être définis dans le fichier de configuration `.babelrc`*

Vous pouvez ajouter les commandes Webpack sous forme de scripts dans le fichier `package.json`. Par exemple :

```json
"scripts": {
    "bundle": "webpack -p --colors --progress"
}
```

Créez le fichier `app/app.js`, vide pour l'instant.

La commande `npm run bundle` permet de construire le fichier `bundle.js`.

## Création du module principal

### index.html

Remplacez le contenu de la page `public/index.html` par le code suivant :

```html
<!DOCTYPE html>
<html>
  <head>
      <meta charset="UTF-8"/>
      <title>Workshop AngularJS</title>
  </head>
  <body>
    {{'Bienvenue' + ' dans ce ' + 'workshop !'}}

    <script src="./js/bundle.js"></script>
  </body>
</html>
```

A la différence de la version précédente de `index.html` l'ensemble des ressources **JavaScript** (propres aux projets et librairies externes) sont regroupées dans un unique fichier `bundle.js` produit par le build **webpack**.

### app/app.js

Le fichier `app/app.js` est le module principal de l'application, il permet de charger les modules correspondants aux composants de haut-niveau :
```javascript
import angular from 'angular';

export default angular.module('wine', []);
```

Le fichier `app/bootstrap.js` permet le démarrage de l'application et le chargement du module `app`. Il s'agît d'une alternative à l'utilisation de `ng-app` vue précédemment, qui est généralement préférée car plus souple :

```javascript
// import pour l'effet de bord => creation d'un env es6
import 'babel-polyfill';
import angular from 'angular';
import app from './app';

angular.element(document).ready(() => {
  angular.bootstrap(document, [app.name]);
});
```

Vous pouvez à présent exécuter le script :
```
npm run bundle
```

Affichez ensuite la page index.html dans votre navigateur pour observer le résultat.

## Exécution avec Webpack Dev Server

Afin de rendre la page `index.html` dans un navigateur au cours du développement, nous utilisons [Webpack Dev Server](http://webpack.github.io/docs/webpack-dev-server.html).

Ajoutez la dépendance à `webpack-dev-server` via la ligne de commande :

 ```
 npm install --save-dev webpack-dev-server@1.14.1
 ```

Ajoutez un nouveau script permettant de lancer le serveur Webpack :

```
"scripts": {
    ...
    "start": "webpack-dev-server -d --colors --inline --content-base public --port 8880"
}
```

Lancez enfin la commande `npm start` et ouvrez la page `http://localhost:8880`.

Le **Webpack Dev Server** permet prendre en compte les changements dans les sources automatiquement. Changez un caractère du template et rechargez la page de votre navigateur pour observer le résultat.

## ESLint

[ESLint](http://eslint.org/) est un outil qui permet d'analyser votre code Javascript selon un certains nombre de règles. Ces règles permettant à l'équipe d'adopter un style homogène et d'éviter certaines erreurs.

Dans notre cas, nous allons suivre la configuration de base **AirBnB** qui fait référence et qui est assez stricte.

Pour commencer, ajoutez les dépendances permettant d'utiliser ESLint :

```
npm install --save-dev eslint@2.8.0 eslint-config-airbnb-base@1.0.4 eslint-plugin-import@1.6.0
```

Créez ensuite le fichier `.eslintrc` à la racine du projet qui permet de configurer ESLint :

```json
{
  "extends": "airbnb-base"
}
```

* L'attribut `extends` permet d'hériter d'une configuration existante. Par exemple, `eslint:recommended` contient les règles recommandée par ESLint.

Nous allons maintenant créer un fichier `.eslintignore` permettant d'exclure certains fichiers de l'analyse.
Dans notre cas, nous allons exclure les fichiers suivants :

* `node_modules` : les dépendances externes
* `webpack.config.js` : le fichier de configuration `webpack`
* `public` : le répertoire d'output de `webpack` (le fichier `bundle.js` est minifié...)

Le contenu du fichier `.eslintignore` est le suivant :
```
node_modules
webpack.config.js
public
```

Enfin, ajoutez un script dans le fichier `package.json` permettant d'exécuter ESLint grâce à la commande `npm run lint` :

```
"scripts": {
  ...
  "lint": "eslint app"
}
```

Cette opération peut également être prise en charge par webpack à l'aide d'un preloader `npm install --save-dev eslint-loader@1.3.0` que l'on configure dans `module` avant les `loaders` :

```javascript
var path = require('path');
...
preLoaders: [
  {
    test: /\.js$/,
    include: path.resolve(__dirname, "app"),
    loader: "eslint-loader"
  }
],
```

Pour valider la configuration, vous pouvez :
+ démarrer **Webpack Dev Server**
+ modifier une ligne de `app.js` (par exemple, en ajoutant un second `;` à la fin d'une ligne)
+ observer le résultat : une erreur apparaît dans la console!

## Tests

Pour finir la configuration de l'environnement de développement, nous allons maintenant configurer l'environnement de tests.
Nous vous conseillons de réaliser ce workshop en [Test Driven Development](https://fr.wikipedia.org/wiki/Test_driven_development).

Nous utiliserons [Karma](https://karma-runner.github.io/0.13/index.html) comme runner, [Jasmine](http://jasmine.github.io/) pour créer des tests [BDD](https://fr.wikipedia.org/wiki/Behavior_driven_development) et [Chai](http://chaijs.com/) pour les assertions. Les mocks sont fournis par angular-mocks.

Ajoutez les dépendances de développement suivantes :
```
npm install --save-dev angular-mocks@1.5.5 chai@3.5.0 html-loader@0.4.3 jasmine@2.4.1 karma@0.13.22 karma-chai@0.1.0 karma-jasmine@0.3.8 karma-mocha-reporter@2.0.2 karma-phantomjs-launcher@1.0.0 karma-webpack@1.7.0 phantomjs-prebuilt@2.1.7
```

Comme le code souce à tester est en ES6, nous utilisons webpack, afin qu'il transpile et génère un bundle regroupant tous les tests.
A cette fin, nous allons ajouter le fichier `webpack.karma.context.js` qui permet de sélectionner l'ensemble des fichiers `.spec.js` comme sources de tests :

```javascript
const context = require.context('./app', true, /\.spec\.js/);
context.keys().forEach(context);
```

Nous allons configurer `Karma`, qui a pour tâche de lancer les tests, en créant le fichier `karma.conf.js` à la racine du projet :

```javascript
var webpack = require('webpack');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'chai'],
    files: ['webpack.karma.context.js'],
    preprocessors: {
      'webpack.karma.context.js': ['webpack']
    },

    webpack: {
      module: {
        loaders: [
          {
          test: /.js?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015']
          }
        }
        ]
      },
      watch: true
    },
    webpackMiddleware: {
      noInfo: true
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity
  })
}
```

Pensez à ajouter les ligne suivante dans le fichier `.eslintignore`:
```
karma.conf.js
webpack.karma.context.js
```

La configuration de Karma est la suivante :

* Le point d'entrée est le fichier `webpack.karma.context.js`
* Webpack est utilisé pour générer le bundle de test
* On déclare les frameworks de test et d'assertion (Jasmine et Chai)
* Nous activons l'autowatch pour observer le progrès de notre implémentation

Nous allons créer une classe et un test pour valider la configuration des tests.

Créer le fichier `app/FirstClass.js` qui contient notre classe à tester, ce fichier est vide pour l'instant.

Créer le fichier `app/FirstClass.spec.js`, le test qui correspond à `app/FirstClass.js` :
```javascript
/* eslint no-undef:0 */
import { assert } from 'chai';
import FirstClass from './FirstClass';

describe('First Component', () => {
  let firstObject;

  beforeEach(() => {
    firstObject = new FirstClass();
  });

  it('should define basic model', () => {
    assert.equal(firstObject.millesime, '2005');
    assert.equal(firstObject.nom, 'Chateau Poitevin');
  });
});
```

Ajoutez une nouveau script dans le fichier `package.json`, ce script permet de lancer les tests :
```
"scripts": {
  ...
  "test" : "karma start"
}
```

Vous pouvez à présent lancer votre contexte de test :
```
  npm test
```

Vous l'avez remarqué, l'exécution des tests provoque une erreur, ce qui est normal dans la mesure où le fichier `FirstClass.js` n'a pas été implémenté. La configuration mise en oeuvre démarre le contexte de tests et surveille les changements des fichiers afin de relancer les tests automatiquement lorsque les fichiers sont modifiés. Dans le cadre de l'industrialisation vous pouvez modifier ce comportement en modifiant la valeur du paramètre `singleRun` à `true`dans le fichier `karma.conf.js`.

A présent, vous pouvez implémenter `FirstClass.js` :
```javascript
export default class FirstClass {
  constructor() {
    this.nom = '';
    this.millesime = '';
  }
}
```

Modifiez la classe jusqu'à ce que le test passe.


## Prochaine étape

Une fois cette étape terminée, vous pouvez aller consulter la [version corrigée](../step-0-done) puis aller jusqu'à [l'étape suivante](../step-1)
