require('underscore');
var regex = exports;
//RegexMatch is the client module to regexMaster and does all the procesing for each regex object.
var client = regex.client = function()
 {
    this.entries = [];
    this.builtRegex = [];
    this.ignore = [];
    this.matchCount = 0;
    this.phone = "home";
    return this;
}
//Should destroy the regex object, but currently fails and is not in use so not a priority
client.prototype.destroy = function()
 {
    this = null;
}
//Or forks the previous statement to allow different matches to be performed.  Creates an additional internal regex object that
client.prototype.or = function(regex)
 {
    var m = this.toRegex(regex);
    var t = this.entries.pop();
    t.push(m);
    this.entries.push(t);
    this.makeRegex()
    return this;
}
//Syntactic sugar for an if().or() string
client.prototype.either = function(regone, regtwo)
 {
    this.
    if (regone);
    this.or(regtwo);
    return this;
}
//Adds a new regex segment to the internal stack that is used to build the final regex
client.prototype.
if = function(regex)
 {
    var m = this.toRegex(regex);
    this.entries.push([m]);
    this.makeRegex();
    return this;
}
//Adds string to the regex stack that is not run through the regex parser
client.prototype.then = function(str)
 {
    var m = {
        reg: str,
        options: [],
        fields: []
    };
    this.entries.push([m]);
    this.makeRegex();
    return this;
}
//Takes the internal regex stack and makes the final matchable regex objects
client.prototype.makeRegex = function()
 {
    var obj = [];
    for (i = 0; i < this.entries.length; i++)
    {
        if (obj.length == 0)
        {
            var newobj = [];
            _.each(this.entries[i],
            function(e) {
                var tmpb = new RegExp(e.reg);
                newobj.push({
                    regex: e.reg,
                    options: e.options,
                    fields: e.fields,
                    built: tmpb
                });
            });
        }
        else
        {
            var newobj = [];
            var tmp = this.entries[i];
            _.each(obj,
            function(o) {
                _.each(tmp,
                function(t) {
                    var tmpb = new RegExp(o.regex + t.reg);
                    newobj.push({
                        regex: o.regex + t.reg,
                        options: o.options.concat(t.options),
                        fields: o.fields.concat(t.fields),
                        built: tmpb
                    })
                })
            })
        }
        obj = newobj;
    }
    this.builtRegex = obj;

}
//Runs test on all the regex objects
//TODO: Function
client.prototype.test = function(str)
 {

    }
//Adds a regex object where the match is thrown away
//TODO: Function
client.prototype.ignore = function(regex)
 {
    return this;
}
//Matches given string to all internal regex objects and returns it in accordance to this.phone
client.prototype.match = function(str)
 {
    var obj = {};
    _.each(this.builtRegex,
    function(r) {
        var match = str.match(r.built);
        if (match)
        {
            obj = {};
            obj.matched = str;
            obj.fields = {};
            //obj.regex=r.built;
            //obj.orig=r.regex
            for (i = 1; i < match.length; i++)
            {
                if (r.fields[i - 1])
                {
                    obj.fields[r.fields[i - 1]] = match[i]
                }
                else
                {
                    obj.fields[i - 1] = match[i]
                }
            }
        }
        else
        {
            if (obj.matched)
            {}
            else
            {
                obj = false;
            }

        }
    })
    if (this.phone == "home")
    return obj;
    else
    {
        this.phone(obj);
        return this;
    }

}
//Syntactic Sugar to if but with ^ appended to it, and placed at the bottom of the stack at compile time.  exists on its own seperate stack until then
//TODO: Function
client.prototype.start = function(regex)
 {

    }
//Syntactic Sugar to if but with $ appended to it and placed on the top of the stack at compile time. exists on its own seperate stack until then
client.prototype.end = function(regex)
 {

    }
//Sets the response type.  Either a function or "home" where home returns a value
client.prototype.call = function(who)
 {
    this.phone = who;
    return this;
}
//Finds and replaces input strings with valid RegExp strings, and gathers up the options and keys and returns them
client.prototype.toRegex = function(str)
 {
    var obj = {};
    obj.orig = str;
    obj.options = []
    obj.reg = str;
    obj.fields = [];
    obj.reg = str.replace(/<%\[([^\]]*)\]([^\s%]*)%>/g,
    function(key, opt, val) {
        var res = "";
        var get = ".";
        var count = "*";
        for (var i = 0; i < opt.length; i++)
        {
            obj.options.push(opt[i]);
        }
        if (opt.indexOf('s') != -1)
        {
            o = ".";
        }
        else
        {
            o = "^\\s";
        }
        if (opt.indexOf("n") != -1)
        {
            o = "\\S\\s"
        }
        if (o != ".")
        res = "([" + o + "]" + count + ")"
        else
        res = "(" + o + count + ")"
        obj.fields.push(val);
        return res;
    })
    return obj;
}