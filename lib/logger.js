class Debug{
	constructor(level){
		Debug.level = level || 5;
	}
	static level = 5;
	static Error(msg){if(Debug.level>0) console.error(msg);}
	static Warning(msg){if(Debug.level>1) console.warn(msg);}
	static Log(msg){if(Debug.level > 2) console.log(msg);}
	static Info(msg){if(Debug.level > 3) console.log(msg);}
}
