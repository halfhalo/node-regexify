//Note: There are no real tests in here yet.
require('underscore')
var regexMaster=require("./index");
var regex=new regexMaster.master();
regex.construct("hello there!").first("this will be in front! ").last("and this will be last!").if(" interesting...").or("now").allow("test").if("<%[]testymctest[]%><%[]testymctest[]%>").call("home");
console.log(regex.match("this will be in front! hello there! interesting...and this will be last!","teast"))
regex.construct("is <%[]name%>!").last(" are <%[]interest[]%>, <%[]interest[]%>, and <%[]interest[]%>").if(" My Friends").or(" My Interests").first("Hello! My name ").call("home");
regex.construct("this is a test string").build("%s and %n and %m and %i").build("(.*)\\n\\n").call("home")
var reg=regex.all();
_.each(reg,function(m){
	console.log(m.builtRegex)
})