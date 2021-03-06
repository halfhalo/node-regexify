require('underscore');
var regexMatch = require('./lib/client')
 var regex = exports;
//RegexMaster controls all regex clients and allows for global matching and testing of all associated regex objects
var master = regex.master = function()
 {
    this.matches = [];
}
//Creates a new single option regex client and sets the callback.  Returns self
master.prototype.new = function(regex, cb, cat)
 {
    m = new regexMatch.client();
    if (cb)
    {
        m.
        if (regex).call(cb);
    }
    else
    {
        m.
        if (regex).call("home")
    }
    this.matches.push(m);
    return this;

}
//Creates a regex and returns it to allow for easy chaining
master.prototype.construct = function(regex)
 {
    m = new regexMatch.client();
	if(regex)
    m.if(regex);
    this.matches.push(m);
    return m;
}
//Run match against every regex object in memory
//TODO: Add a limiter to only match certain objects
master.prototype.match = function(str,cat)
 {
    var res = false;
    _.each(this.matches,
    function(m) {
        if (res)
        {}
        else
        {
	
						res=null
            res = m.match(str,cat)
        }
    })
    return res;
}
//Return all Regex objects
//TODO: Function
master.prototype.all = function()
 {
	return this.matches
    }
//Remove a regex object that matches the str
//TODO: Function
master.prototype.remove = function(str)
 {

    }