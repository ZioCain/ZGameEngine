class Component{
	constructor(name){
		this.name = name || "Unnamed Component";
		this.componentId = String.random()+(new Date().getTime());
	}
	Update(zGame){}
}