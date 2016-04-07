Simple Angular directive to show/hide a label
======================

## Description

Currently supported elements are `input[type='text/email/password/number']`, `select` and `textarea`. Currently it uses the `placeholder` value for the label text.

So what is cool about it?

- label and form element are both animated and are **NOT** positioned absolute (meaning the label will stay in the normal document flow)
- very simple (happy extending)

## Demo

![someimage](https://joinpoint.org/saebl/temp/angular-flabel_demo_v0.0.1.gif)

TODO: ~~<https://joinpoint.org/baranowski/angular-flabel/example/index.html>~~

## Install

#### Bower:

```shell
$ bower install angular-flabel --save
```

## Usage

Inject the directive into your app:

```js
var app = angular.module('app', ['thegitfather.flabel']);
```

Add `flabel` directive to a form element:

```html
<div class="form-group">
  <input id="normalTextInput" type="text" class="form-control"
    placeholder="Placeholder..."
    name="normalTextInput"
    required
    ng-model="normalTextInput1"
    flabel />
</div>
```

The form element should be enclosed by some kind of container (e.g. `<div class="form-group">...</div>`). You also need to specify a model (`ng-model="..."`) for the directive to work.

## Develop

Just fork or clone this repo, then:

```shell
$ cd angular-flabel && npm install
```

If your project is using bower and your clone is outside your project directory, you can use [`$ bower link`:link:](http://bower.io/docs/api/#link)

If you have a gulp installed globally just run `$ gulp watch`. Otherwise use `$ npm start`.
