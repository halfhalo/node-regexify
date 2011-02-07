require('underscore');
var regexMatch = require('./lib/client')
 var regex = exports;
//RegexMaster controls all regex clients and allows for global matching and testing of all associated regex objects
var master = regex.master = function()
 {
    this.matches = [];
}

//Creates a regex and returns it to allow for easy chaining
master.prototype.construct = function(regex)
 {
    m = new regexMatch.client();
	if(regex)
	return m.if(regex);
	else
	return m;
}
