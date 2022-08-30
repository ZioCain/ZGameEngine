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