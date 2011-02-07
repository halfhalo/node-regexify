require('underscore');
var regex = exports;
//RegexMatch is the client module to regexMaster and does all the procesing for each regex object.  build is a boolean that determines if the internal object is built on every new addition(default) or only when a match is called(and only once);
var client = regex.client = function(alwaysBuild)
 {
	this.alwaysBuild=alwaysBuild || true;
    this.entries = [];
    this.builtRegex = [];
    this.ignore = [];
		this.before = [];
		this.after = [];
		this.global = true;
    this.matchCount = 0;
    this.phone = "home";
		this.allowed=[];
		this.denied=[];
		this.lastadded=null;
		this.lastbuilt=null;
		this.static=[];
    return this;
}
//Should destroy the regex object, but currently fails and is not in use so not a priority
client.prototype.destroy = function()
 {
    this = null;
}
//Switch from matching everything to only matching categories;
client.prototype.limit=function(str)
{
	this.global=false;
	if(str)
	return this.allow(str);
	else
	return this;
}
client.prototype.each=function(str,count)
{
	count=count||1
	if(str)
	{
		var m=this.toRegex(str);
		for(i=0;i<count;i++)
		{
			this.entries.push(m);
		}
		if(this.alwaysBuild)
		    this.makeRegex()

	}
		return this;
}
//Takes in regular regex and adds a space for it in the fields object, and also can take in a name to assign it
client.prototype.parse=function(regex,name)
{
	var obj={};
	obj.orig=regex;
	obj.reg=regex;
	obj.fields=[name];
	obj.options=[];
	this.entries.push([obj])
	if(this.alwaysBuild)
	    this.makeRegex()
	return this;
}
//Builds a matching string using %<char>, where char can be n,s,i, or m.  n=newline, s=space, i=ignore, m=normal;
client.prototype.build=function(str,arr)
{
	arr=arr||[]
	if(str)
	{
		var obj={};
		arr=arr.reverse()
		obj.fields=[];
		var res=str.replace(/%(n|s|i|m|d)/g,function(key,val){
			switch(val)
			{
				case 'm':
				default:
					if(arr.length>0)
						obj.fields.push(arr.pop())
					else
						obj.fields.push(0)
					return "([^\\s]*)";
				break;
				case 'n':
				if(arr.length>0)
					obj.fields.push(arr.pop())
				else
					obj.fields.push(0)
					return "([\\S\\s]*)";
				break;
				case 's':
				if(arr.length>0)
					obj.fields.push(arr.pop())
				else
					obj.fields.push(0)
					return "(.*)";
				break;
				case 'd':
				if(arr.length>0)
					obj.fields.push(arr.pop())
				else
					obj.fields.push(0)
					return "([\\d]*)";
				break;
			}
		})
	}
	obj.reg=res
	obj.options=[];
	obj.orig=str;
	this.entries.push([obj])
	if(this.alwaysBuild)
	    this.makeRegex()
	return this;
}
client.prototype.allow=function(str)
{
	if(str)
	this.allowed.push(str);
	
	return this;
}
client.prototype.deny=function(str)
{
	return this;
}
//Or forks the previous statement to allow different matches to be performed.  Creates an additional internal regex object that
client.prototype.or = function(regex)
 {
    var m = this.toRegex(regex);
    var t = this.entries.pop();
    t.push(m);
    this.entries.push(t);
if(this.alwaysBuild)
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
if(this.alwaysBuild)
    this.makeRegex();
    return this;
}
//Adds string to the regex stack that is not run through the regex parser
client.prototype.then = function(str)
 {

	//str=str.replace(/[.*+?|()\\[\\]{}\\\\]/g, "\\$&")
	str=str.replace(/\\*/g,"\\*")
    var m = {
        reg: str,
        options: [],
        fields: []
    };
    this.entries.push([m]);
if(this.alwaysBuild)
    this.makeRegex();
    return this;
}
client.prototype.makeRegex=function()
{
	//Test run on before
	//console.log(this.before)
	var obj=[];
	if(this.before.length>0)
	{
		_.each(this.before,function(e){
			if(obj.length==0)
			{
				var copied=[];
				_.each(e,function(ent){
					copied.push({orig:ent.orig,options:ent.options,reg:"^"+ent.reg,fields:ent.fields});
				})
				obj.push(copied)
			}
			else
			obj.push(e)
		})
	}

	var tmp=[]
	var lng=this.after.length-1;
	if(this.after.length>0)
	{
		_.each(this.after,function(e){
			if(tmp.length==lng)
			{
				var copied=[];
				_.each(e,function(ent){
					copied.push({orig:ent.orig,options:ent.options,reg:ent.reg+"$",fields:ent.fields});
				})
				tmp.push(copied)
			}
			else
			{
				tmp.push(e)
			}
		})
	}
		obj=obj.concat(this.entries).concat(tmp);
	this.createRegex(obj)
	return this;
}
//Takes the internal regex stack and makes the final matchable regex objects
client.prototype.createRegex = function(entries,ret)
 {
	entries= entries || this.entries;
    var obj = [];
    for (i = 0; i < entries.length; i++)
    {
        if (obj.length == 0)
        {
            var newobj = [];
            _.each(entries[i],
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
            var tmp = entries[i];
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
if(ret)
	return obj;
else
{
    this.builtRegex = obj;
	return true;	
}


}
//Like .or but on two previous additions
client.prototype.merge=function()
{
	return this;
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
client.prototype.match = function(str,cat)
 {
	var self=this;
	if(this.alwaysBuild)
	{}
	else
	{
		this.makeRegex();
	}
    var obj = {};
    _.each(this.builtRegex,
    function(r) {
        var match = str.match(r.built);
        if (match && (self.global==true || (cat!=null && (self.allowed.indexOf(cat)!=-1 && self.denied.indexOf(cat)==-1))))
        {
						obj=null;
            obj = {};
            obj.matched = str;
            obj.fields = {};
						
            //obj.regex=r.built;
            obj.orig=r;
            for (i = 1; i < match.length; i++)
            {
                if (r.fields[i - 1] && isNaN(r.fields[i-1]))
                {
					if(r.fields[i - 1].indexOf('[]')!=-1)
					{
						var fname=r.fields[i - 1].substr(0,r.fields[i - 1].length-2);
						if(obj.fields[fname] && typeof obj.fields[fname]=="object")
						{}
						else
						{
							obj.fields[fname]=[];
						}
						obj.fields[fname].push(match[i])
					}
					else
					{
						 obj.fields[r.fields[i - 1]] = match[i]
					}

                }
                else
                {
                    obj.fields[obj.fields.length] = match[i]
                }
            }
						obj.static=self.static
						_.each(obj.static,function(s){
							_.each(s,function(val,key){
								obj.fields[key]=val;
							})
						});

        }
        else
        {
            if (obj.matched)
            {

}
            else
            {
                obj = false;
								//obj
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
client.prototype.first = function(regex)
 {
	if(regex)
	{
		var m=this.toRegex(regex);
		this.before.push([m]);
		if(this.alwaysBuild)
		this.makeRegex()
	}
	return this;
    }
//Syntactic Sugar to if but with $ appended to it and placed on the top of the stack at compile time. exists on its own seperate stack until then
client.prototype.last = function(regex)
 {
	if(regex)
	{
		var m=this.toRegex(regex);
		this.after.push([m])
		if(this.alwaysBuild)
		this.makeRegex()
	}
	return this;
    }
//Sets the response type.  Either a function or "home" where home returns a value
client.prototype.call = function(who)
 {
	if(who)
    this.phone = who;
    return this;
}
client.prototype.say = function(obj)
{
	this.static.push(obj);
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
        if (opt.indexOf("d") != -1)
        {
            o = "\\d"
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