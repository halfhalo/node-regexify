//Note: There are no real tests in here yet.
var regexMaster=require("./index");
var regex=new regexMaster.master();
regex.construct("hello there!").first("this will be in front! ").last("and this will be last!").if(" interesting...").or("now").allow("test").if("<%[]testymctest[]%><%[]testymctest[]%>").call("home");
console.log(regex.match("this will be in front! hello there! interesting...and this will be last!","teast"))