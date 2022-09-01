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

