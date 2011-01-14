require('underscore');
var regexMatch = require('./client')
 var regex = exports;
//RegexMaster controls all regex clients and allows for global matching and testing of all associated regex objects
var master = regex.master = function()
 {
    this.matches = [];
}
//Creates a new single option regex client and sets the callback.  Returns self
master.prototype.new = function(regex, cb)
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
    m.
    if (regex);
    //if(cb)
    //{
    //	m.if(regex).call(cb);
    //}
    //else
    //{
    //	m.if(regex).call("home")
    //}
    this.matches.push(m);
    return m;
}
//Run match against every regex object in memory
//TODO: Add a limiter to only match certain objects
master.prototype.match = function(str)
 {
    var res = false;
    _.each(this.matches,
    function(m) {
        if (res)
        {}
        else
        {
            res = m.match(str)
        }
    })
    return res;
}
//Return all Regex objects
//TODO: Function
master.prototype.all = function()
 {

    }
//Remove a regex object that matches the str
//TODO: Function
master.prototype.remove = function(str)
 {

    }