require('underscore');
Object.prototype.clone = function() {
  var newObj = (this instanceof Array) ? [] : {};
  for (i in this) {
    if (i == 'clone') continue;
    if (this[i] && typeof this[i] == "object") {
      newObj[i] = this[i].clone();
    } else newObj[i] = this[i]
  } return newObj;
};
var regex = exports;
//RegexMatch is the client module to regexMaster and does all the procesing for each regex object.  build is a boolean that determines if the internal object is built on every new addition(default) or only when a match is called(and only once);
var client = regex.client = function(alwaysBuild)
 {
	//this.stack contains arrays of objects with the following properties: original, regex, fields(which itself is an object containing name and type), and whatever else I forgot that may be needed
	this.stack=[];
	//this.first is a equal to this.stack but for objects that are to be first in the match group;
	this.first=[];
	//this.last is 
	this.last=[];
	this.created=[];
	//this.types contains the different type of input strings that we may encounter
	this.types=[];
	this.types.push({"input":new RegExp("<%([^\\s%>]*)%>","g"),"type":"all","regex":"(.*)","string":"if :key is a :type","key_type":"string"})
    return this;
}
client.prototype.createString=function()
{
	var str="";
	var self=this;
	_.each(this.created,function(entry){
		str+="Given we have a matchable string, ";
		for(i=0;i<entry.fields.length;i++)
		{
			if(i!=0)
			{str+=", and "}
			str+=entry.fields[i].string.replace(/:([^\s]*)/g,function(val,key){
				
				if(key=="key")
				{
					return ":"+entry.fields[i][key]
				}
				else
				{
					if(entry.fields[i]["key_"+key])
						return entry.fields[i]["key_"+key]
				}
			});
		}
		str+=", and the string is in the format: \""+entry.original+"\", then we can match the string"
		str+="\n"
		console.log(entry)
	})
	return str;
}
client.prototype.or=function(str,where)
{
	if(str)
	{
		where=where || "stack";
		var to=null;
		switch(where)
		{
			default:
			case "stack":
				to=this.stack;
				break;
			case 'first':
				to=this.first;
				break;
			case 'last':
				to=this.last;
				break;
		}
		if(to.length>0)
		{
			var tmp=to.pop();
			tmp.push(this.parseInput(str));
			to.push(tmp);
			
		}
	}

	return this;
}
client.prototype.if=function(str)
{
	var obj=this.parseInput(str);
	this.stack.push([obj])
	return this;
}
client.prototype.parseInput=function(input,fields)
{
	var obj={};
	obj.original=input;
	obj.fields=[];
	obj.regex=input;
	_.each(this.types,function(type){
		obj.regex=obj.regex.replace(type.input,function(val,key){
			if(key){
				var tmp=type.clone();
				tmp.key=key
				obj.fields.push(tmp)
			}
			else if(fields && fields.length>0)
			{
				obj.fields.push(fields.shift())
			}
			return type.regex;
			
		})
	})
	return obj;
}
client.prototype.createRegex=function()
{
	var total=[];
	_.each(this.first,function(o){
		total.push(o)
	})
	_.each(this.stack,function(o){
		total.push(o)
	})
	_.each(this.last,function(o){
		total.push(o)
	})
	var obj=[];
//	console.log(total)
	//each individual object in the stack.  objects may contain more than one entry
	_.each(total,function(arr){
		if(obj.length==0)
		{obj=arr}
		else
		{

				var newobj=[];
				_.each(obj,function(path){
					_.each(arr,function(entry){
						var tmp={};
						tmp.regex=path.regex+entry.regex;
						tmp.original=path.original+entry.original;
						tmp.fields=[];
						tmp.fields=tmp.fields.concat(path.fields,entry.fields);
						newobj.push(tmp)
					})
				//console.log(obj)
				//console.log(newobj)
				obj=newobj
			});
		}
	});
	//console.log(obj)
	var finalObj=[];
	_.each(obj,function(entry){
		entry.regex=new RegExp(entry.regex);
		finalObj.push(entry)
	});
	this.created=finalObj;
	return this;
}