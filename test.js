//Note: There are no real tests in here yet.
var master=require('./regexMaster');
var regex=new master.master();
console.log(regex.construct().if("hello there <%name%>").if(" this is a <%test%> of the emergency node system").or(" this is NOT a <%nottest%> of the emergency node system").if("more regex <%now%>").or("less regex <%now%>").createRegex().createString());
