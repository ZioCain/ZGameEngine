class Renderer extends Component{
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