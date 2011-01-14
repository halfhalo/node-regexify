##What it does
This module makes regex easy!

It consists of two parts, the Master and the Client.  The master is what holds all the clients in line and creates new ones.



###How to use
var regexMaster=require("./regexMaster");
var regex=new regexMaster.master();

//make a new single option regex and close it out with a callback function.
regex.new("This is a test <%[]option%>").call(function(res){console.log(res)});
//res is an object with the matched string, and the fields that were matched (in this case option);
//make a new chainable regex that returns res instead of running a callback, and can match two different strings;
regex.construct("This is").then(" A ").if("<%[]type%> ").then(" and not ").if(" <%[]secondtype%> ").or("<%[]thirdtype%>").call("home");
//Run a global match
var response=regex.match(str);

##Internal regex working functions for chaining:

if
	Standard Regex Matching
or
	Matches the regex OR the previous regex, if any
then
	Plain non parsed string
either
	syntactic sugar for an if().or()
