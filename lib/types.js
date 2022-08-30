class Vector2{
	
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
	Normalize(){
		this.x = this.x/Math.abs(this.x);
		this.y = this.y/Math.abs(this.y);
		return this;
	}
	GetNormalized(){
		const magnitude = this.Magnitude();
		return magnitude/Math.abs(magnitude);
	}
	Magnitude(){
		return Math.sqrt(this.sqrMagnitude());
	}
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