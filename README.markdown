pkginit
=======

Create a package.json file like `npm init` but with more control over package
defaults.

example
=======

Create a default.json using
[prompter syntax](https://github.com/substack/node-prompter#readme)
to serve as the basis for whenever you type `pkginit`:

``` js
{
  "name": dirname,
  "description": prompt('Description'),
  "version": "0.0.0",
  "repository": {
    "url": "git://github.com/substack/" + dirname + ".git"
  },
  "main": prompt('Entry point', 'index.js'),
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

wrote file /home/substack/projects/beep-boop/package.json
```

variables
=========

In packages, these variables are availble:

* basename - shorthand for `path.basename(process.cwd())`
* process - node's `process`
* require - node's `require`
* env - shorthand for `process.env`
