class RigidBody extends Component{
	constructor(){
		super("RigidBody");
		this.speed = Vector2.Zero();
		this.mass = 1;
		this.friction = 1;
		this.gravity = ZGame.GLOBAL_GRAVITY;
	}
	AddForce(force){
		this.speed.x += force.x;
		this.speed.y += force.y;
		return this;
	}
	Update(game, transform){
		// no speed = nothing to do
		if(this.speed.IsZero() && this.gravity.IsZero()) return;

		// apply motion
		transform.position.x += this.speed.x + this.gravity.x;
		transform.position.y -= this.speed.y + this.gravity.y;

		// apply friction
		if(this.friction>0){
			const frictionToApply = this.friction * this.mass;
			this.speed.x += this.speed.x * -frictionToApply/100;
			this.speed.y += this.speed.y * -frictionToApply/100;
		}
	}
}