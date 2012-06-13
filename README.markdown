pkginit
=======

Script building package.json files, like `npm init`.

example
=======

Create a default.json using
[prompter syntax](https://github.com/substack/node-prompter#readme)
to serve as the basis for whenever you type `pkginit`:

``` js
{
  "name": basename.replace(/^node-/, ''),
  "description": prompt(),
  "version": "0.0.0",
  "repository": {
    "url": "git://github.com/substack/" + basename + ".git"
  },
  "main": prompt('entry point', 'index.js'),
  "scripts": {
    "test": "tap test/*.js"
  },
  "dependencies": {},
  "devDependencies": {
    "tap": "~0.2.5"
  }
}
```

Then add this file as the default:

```
$ pkginit add default default.json
```

Now when you type `pkginit`, you will only be prompted for the entries you've
scripted:

```
$ mkdir beep-boop; cd beep-boop
$ pkginit
description: make beep and boop sounds
entry point: (index.js)
```

variables
=========

In packages, these variables are availble:

* basename - shorthand for `path.basename(process.cwd())`
* process - node's `process`
* require - node's `require`, rebased to `process.cwd()`
* env - shorthand for `process.env`

install
=======

With [npm](http://npmjs.org) do:

```
npm install pkginit
```

license
=======

MIT
