REGISTERED_COLLIDERS=[];

class Collider extends Component{
	constructor(opt){
		super(opt.name || "Collider");
		this.transform = opt.transform || null;
		this.position = this.transform?.position.Clone();
		REGISTERED_COLLIDERS.push(this);
	}
	CheckCollisions(other){return false}
}

class BoxCollider extends Collider{
	constructor(opt){
		super({name: "BoxCollider", transform:null, ...opt});
	}
	Update(game, transform){

	}
	CheckCollisions(other){

	}
}

class SphereCollider extends Collider{
	constructor(opt){
		super({name: "BoxCollider", transform:null, ...opt});
		this.radius = 1;
	}
	Update(game, transform){
		REGISTERED_COLLIDERS.forEach(x=>{
			if(x.componentId !== this.componentId)
				x.CheckCollisions(this);
		});
	}
	CheckCollisions(other){
		other.position.x
	}
}