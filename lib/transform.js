class Transform extends Component{
	constructor(ZGame){
		super("Transform");
		this.position = Vector2.Zero();
		this.rotation = 0;
		this.scale = Vector2.One();
		this.components=[];
		this.zGame = ZGame;
	}
	AddComponent(component){
		this.components.push(component);
		return component;
	}
	GetComponent(type){
		return this.components.find(x=>x instanceof type);
	}
	Update(){
		this.components.forEach(x=>x.Update(this.zGame, this));
	}
}

