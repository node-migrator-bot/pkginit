var mkdirp = require('mkdirp');
var prompter = require('prompter');
var merge = require('merge');

var fs = require('fs');
var path = require('path');
var home = process.env.HOME || process.env.USERPROFILE;

exports = module.exports = function (opts, cb) {
    if (!opts) opts = {};
    opts.configDir = opts.configDir || path.join(home, '.config', 'pkginit');
    opts.context = merge({
        basename : path.basename(process.cwd()),
        process : process,
        env : process.env,
        require : function (name) {
            if (/^[.\/]/.test(name)) {
                return require(path.resolve(opts.configDir, name))
            }
            else return require(name)
        }
    }, opts.context || {});
    
    mkdirp(opts.configDir, function (err) {
        if (err) cb(err)
        else cb(null, new PkgInit(opts))
    });
};

function PkgInit (opts) {
    this.configDir = opts.configDir;
    this.opts = opts;
    this.context = opts.context;
}

PkgInit.prototype.build = function (name, cb) {
    var self = this;
    var opts = self.opts;
    var stderr = opts.stderr || process.stderr;
    var stdout = opts.stdout || process.stdout;
    var stdin = opts.stdin || process.stdin;
    var file = path.join(self.configDir, name + '.json');
    
    fs.readFile(file, function (err, src) {
        if (err) return cb(err);
        var s = prompter(src, self.context, function (err, output) {
            cb(err, output);
            stdin.pause();
        });
        s.pipe(stderr, { end : false });
        stdin.pipe(s);
        if (typeof stdin.resume === 'function') stdin.resume();
    });
};

PkgInit.prototype.add = function (name, src, cb) {
    var file = path.join(this.configDir, name + '.json');
    fs.writeFile(file, src, cb);
};

PkgInit.prototype.rm = function (name, cb) {
    var file = path.join(this.configDir, name + '.json');
    fs.unlink(file, cb);
};

PkgInit.prototype.list = function (cb) {
    fs.readdir(this.configDir, function (err, files) {
        if (err) cb(err)
        else cb(null, files
            .filter(function (x) { return /\.json$/.test(x) })
            .map(function (x) { return /\.json$/.replace('') })
        )
    });
};
