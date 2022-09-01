// String
/**
 * Generates a random string
 * @param {number} length Length of the string, 10 is default
 * @param {string} characters Characters to use for the generation, default is 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
 * @returns Random string generated
 */
String.random = function (length, characters) {
	let result = '';
	const finalLength = length || 10;
	const chars = characters || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const dicLen = chars.length;
	for (var i = 0; i < finalLength; i++) {
		result += chars.charAt(Math.floor(Math.random() * dicLen));
	}
	return result;
}

// Math
Math.lerp = function(start, end, by){ return start * (1 - by) + end * by }

class Vector2{
	/**
	 * Creates a new Vector2 with given values
	 * @param {number|object} x The X component of the Vector or another vector to copy
	 * @param {number} y The Y component of the Vector
	 */
	constructor(x,y){
		switch(typeof x){
			case 'undefined':
				this.x = 0;
				this.y = 0;
				break;
			case 'number':
				this.x = x;
				this.y = y;
				break;
			case 'object':
				this.x = x.x;
				this.y = x.y;
				break;
		}
	}
	/**
	 * Makes the vector have magnitude 1
	 * @returns Current, normalized Vector2
	 */
	Normalize(){
		this.x = this.x/Math.abs(this.x);
		this.y = this.y/Math.abs(this.y);
		return this;
	}
	/**
	 * Get normalized version (magnitude=1) of current vector. This will not alter the Vector2 itself
	 * @returns Normalized version of current Vector2
	 */
	GetNormalized(){
		const magnitude = this.Magnitude();
		return magnitude/Math.abs(magnitude);
	}
	/**
	 * Get magnitude of the Vector2
	 * @returns {number} The magnitude of the vector
	 */
	Magnitude(){
		return Math.sqrt(this.sqrMagnitude());
	}
	/**
	 * Get squared magnitude of the Vector2. Useful for comparison with other vectors as it's faster than Magnitude()
	 * @returns {number} The squared magnitude of the vector
	 */
	sqrMagnitude(){
		return this.x*this.x + this.y*this.y;
	}
	Distance(other){
		return Vector2.Distance(this, other);
	}
	MoveTowards(destination, step){
		this.x = Math.lerp(this.x, destination.x, step);
		this.y = Math.lerp(this.y, destination.y, step);
		return this;
	}
	IsZero(){
		return this.x === 0 && this.y === 0;
	}
	/**
	 * Multiply X and Y by the given value
	 * @param {number} value The scalar value to multiply both x and y
	 */
	MultiplyScalar(value){
		this.x *= value;
		this.y *= value;
		return this;
	}
	Add(other){
		this.x += other.x;
		this.y += other.y;
		return this;
	}
	Clone(){
		return new Vector2(this.x, this.y);
	}

	/* STATIC METHODS */
	static Distance(v1,v2){
		const a = v1.x-v2.x, b=v1.y-v2.y;
		return Math.sqrt(a*a+b*b);
	}
	static Lerp(start, end, t){
		return new Vector2(
			Math.lerp(start.x, end.x, t),
			Math.lerp(start.x, end.x, t)
		);
	}

	/* STATIC VALUES */
	static Zero(){ return new Vector2(0,0); }
	static One(){ return new Vector2(1,1); }

	// directions
	static Up(){ return new Vector2(0,1); }
	static Right(){ return new Vector2(1,0); }
	static Down(){ return new Vector2(0,-1); }
	static Left(){ return new Vector2(-1,0); }
}

class KeyItem{
	constructor(name, keyCode, status, key){
		this.name = name;
		this.keyCode = keyCode;
		this.status = status;
		this.key = key;
	}
	Pressed(){return this.status === KeyStatus.PRESSED || this.status === KeyStatus.HELD;}
	Held(){return this.status === KeyStatus.HELD;}
	Idle(){return this.status === KeyStatus.IDLE;}
}
class KeyStatus{
	static PRESSED='PRESSED';
	static HELD='HELD';
	static IDLE='IDLE';
}
class KeyCode{
	static A='KeyA';
	static B='KeyB';
	static C='KeyC';
	static D='KeyD';
	static E='KeyE';
	static F='KeyF';
	static G='KeyG';
	static H='KeyH';
	static I='KeyI';
	static J='KeyJ';
	static K='KeyK';
	static L='KeyL';
	static M='KeyM';
	static N='KeyN';
	static O='KeyO';
	static P='KeyP';
	static Q='KeyQ';
	static R='KeyR';
	static S='KeyS';
	static T='KeyT';
	static U='KeyU';
	static V='KeyV';
	static W='KeyW';
	static X='KeyX';
	static Y='KeyY';
	static Z='KeyZ';

	static Digit1='Digit1';
	static Digit2='Digit2';
	static Digit3='Digit3';
	static Digit4='Digit4';
	static Digit5='Digit5';
	static Digit6='Digit6';
	static Digit7='Digit7';
	static Digit8='Digit8';
	static Digit9='Digit9';
	static Digit0='Digit0';

	static ShiftRight='ShiftRight';
	static ShiftLeft='ShiftLeft';
	static ControRight='ControRight';
	static ControLeft='ControlLeft';
	static AltRight='AltRight';
	static AltLeft='AltLeft';
	static MetaRight='MetaRight';
	static MetaLeft='MetaLeft';
	static ENTER='Enter';
	static SpaceBar='Space';
	static Tab='Tab';
	static Backspace='Backspace';
	static ArrowRight='ArrowRight';
	static ArrowLeft='ArrowLeft';
	static ArrowUp='ArrowUp';
	static ArrowDown='ArrowDown';
	static Period='Period';
}
class Inputs{
	constructor(){
		this.pressed = [];
		this.events = [];
		document.addEventListener("keydown", (e)=>{this.SetDown(e)});
		document.addEventListener("keypress", (e)=>{this.SetHeld(e)});
		document.addEventListener("keyup", (e)=>{this.SetUp(e)});
	}

	CheckEvents(keyCode, status){
		Debug.Info(["CheckEvents",keyCode,status]);
		this.events.forEach(x=>{
			if(x.keyCode === keyCode && x.status == status) x.callback();
		});
	}
	CheckAllPressed(){
		this.events.forEach(x=>{
			if(Inputs.GetPressed(x.keyCode) && x.status == KeyStatus.HELD) x.callback();
		});
	}

	SetDown(e){
		Debug.Info(["SetDown",new KeyItem(
			e.code,
			e.keyCode,
			KeyStatus.PRESSED,
			e.key
		)]);
		// check if key is already in list
		const key = this.pressed.find(x=>x.keyCode === e.keyCode);
		if(key) key.status = KeyStatus.PRESSED;
		else this.pressed.push(new KeyItem(
			e.code,
			e.keyCode,
			KeyStatus.PRESSED,
			e.key
		));
		this.CheckEvents(e.code, KeyStatus.PRESSED);
	}
	SetHeld(e){
		const key = this.pressed.find(x=>x.keyCode === e.keyCode);
		if(key) key.status = KeyStatus.HELD;
		else this.pressed.push(new KeyItem(
			e.code,
			e.keyCode,
			KeyStatus.HELD,
			e.key
		));
		this.CheckEvents(e.code, KeyStatus.HELD);
	}
	SetUp(e){
		const key = this.pressed.find(x=>x.keyCode === e.keyCode);
		if(key) key.status = KeyStatus.IDLE;
		else this.pressed.push(new KeyItem(
			e.code,
			e.keyCode,
			KeyStatus.IDLE,
			e.key
		));
		this.CheckEvents(e.code, KeyStatus.IDLE);
	}

	AddEvent(key, status, callback){
		this.events.push({
			keyCode: key,
			status: status,
			callback: callback
		});
		return this;
	}

	static GetPressed(key){
		if(key.keyCode){
			return this.pressed.find(x=>x.keyCode === key.keyCode && x.Pressed())!==undefined;
		}else if(key.name){
			return this.pressed.find(x=>x.name === key.name && x.Pressed())!==undefined;
		}else if(key.key){
			return this.pressed.find(x=>x.key === key.key && x.Pressed())!==undefined;
		}
		return false;
	}

	static GetIdle(key){
		if(key.keyCode){
			return this.pressed.find(x=>x.keyCode === key.keyCode && x.Idle())!==undefined;
		}else if(key.name){
			return this.pressed.find(x=>x.name === key.name && x.Idle())!==undefined;
		}else if(key.key){
			return this.pressed.find(x=>x.key === key.key && x.Idle())!==undefined;
		}
		return false;
	}

	static GetHeld(key){
		if(key.keyCode){
			return this.pressed.find(x=>x.keyCode === key.keyCode && x.Held())!==undefined;
		}else if(key.name){
			return this.pressed.find(x=>x.name === key.name && x.Held())!==undefined;
		}else if(key.key){
			return this.pressed.find(x=>x.key === key.key && x.Held())!==undefined;
		}
		return false;
	}
}

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

class ZGame{
	static INPUTS;

	static BACKGROUND_COLOR='#000';

	static GLOBAL_GRAVITY=Vector2.Zero();

	static REGISTERED_COLLIDERS=[];
	
	constructor(canvasId, width, height){
		this.canvasId = canvasId;
		this.canvas = document.getElementById(this.canvasId);
		this.canvas.width = width || 1024;
		this.canvas.height = height || 800;
		this.context = this.canvas.getContext('2d');
		this.updateInterval = null;
		this.objects = [];

		this.updateTime = 10;

		this.started = false;

		// global settings
		new Debug(5);
		ZGame.INPUTS = new Inputs();
	}
	AddObject(object){
		this.objects.push(object);
	}

	// lifecycle
	Update(){
		if(!this.started) return;

		// clear screen
		this.context.beginPath();
		this.context.fillStyle = ZGame.BACKGROUND_COLOR;
		this.context.fillRect(0,0,this.canvas.width, this.canvas.height);
		this.context.closePath();
		this.context.fill();

		ZGame.INPUTS.CheckAllPressed();

		// make each object draw
		this.objects.forEach(x=>x.Update());
	}
	Start(){
		if(this.started) return;
		setInterval(()=>{
			this.Update();
		}, this.updateTime);
		this.started = true;
	}
	Stop(){
		this.started = false;
		clearInterval(this.updateInterval);
	}
}

class Sprite{
	constructor(spriteUrl,width,height){
		this.url = spriteUrl;
		this.sprite = new Image();
		this.sprite.width = width;
		this.sprite.height = height;
		this.sprite.onload = (e)=>{this.OnSpriteLoad(e)};
		if(this.url)
			this.sprite.src = this.url;
		this.loaded = false;
	}
	SetUrl(url){
		this.sprite.src = this.url = url;
		this.loaded = false;
		return this;
	}
	OnSpriteLoad(event){
		this.loaded = true;
	}
}

/**
 * Basic class
 */
class Component{
	constructor(name){
		this.name = name || "Unnamed Component";
		this.componentId = String.random()+(new Date().getTime());
	}
	Update(zGame){}
}class Renderer extends Component{
	constructor(imageUrl){
		super("Renderer");
		this.sprite = new Sprite(imageUrl);
	}
	Update(zGame, transform){
		this.Draw(zGame, transform);
	}
	Draw(zGame, transform){
		// if nothing to render, just stop
		if(!this.sprite.url || !this.sprite.loaded) return;

		// actually draw the sprite
		zGame.context.drawImage(this.sprite.sprite,
			transform.position.x,
			transform.position.y,
			this.sprite.sprite.naturalWidth * transform.scale.x,
			this.sprite.sprite.naturalHeight * transform.scale.y
		);
	}
}

class Collider extends Component{
	constructor(opt){
		super(opt.name || "Collider");
		this.transform = opt.transform || null;
		this.position = this.transform?.position.Clone();
		ZGame.REGISTERED_COLLIDERS.push(this);
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
		ZGame.REGISTERED_COLLIDERS.forEach(x=>{
			if(x.componentId !== this.componentId)
				x.CheckCollisions(this);
		});
	}
	CheckCollisions(other){
		other.position.x
	}
}

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

class RigidBody extends Component{
	constructor(){
		super("RigidBody");
		this.speed = Vector2.Zero();
		this.mass = 1;
		this.friction = 1;
		this.gravity = ZGame.GLOBAL_GRAVITY;
	}
	/**
	 * Adds given force to current speed
	 * @param {Vector2} force The force to apply
	 * @returns Current RigidBody
	 */
	AddForce(force){
		this.speed.x += force.x;
		this.speed.y += force.y;
		return this;
	}
	/**
	 * Applies speed and gravity to the transform
	 * @param {ZGame} game The ZGame reference (unsed)
	 * @param {Transform} transform The transform to apply forces to
	 */
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

