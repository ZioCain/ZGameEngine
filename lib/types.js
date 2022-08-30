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