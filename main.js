const game = new ZGame("canvas", window.innerWidth, window.innerHeight);

// create the player object
const player = new Transform(game);
player.AddComponent(new Renderer("https://picsum.photos/100/100")); // add a sprite to it
player.AddComponent(new RigidBody()); // add rigidbody to make it move with physics

// Adds gravity to the game -> it will be applied to all Objects
//ZGame.GLOBAL_GRAVITY.Add(Vector2.Down());

// Handle inputs to make the player move
ZGame.INPUTS.AddEvent(KeyCode.A, KeyStatus.HELD, ()=>{
	player.GetComponent(RigidBody).AddForce(Vector2.Left());
});
ZGame.INPUTS.AddEvent(KeyCode.D, KeyStatus.HELD, ()=>{
	player.GetComponent(RigidBody).AddForce(Vector2.Right());
});
ZGame.INPUTS.AddEvent(KeyCode.S, KeyStatus.HELD, ()=>{
	player.GetComponent(RigidBody).AddForce(Vector2.Down());
});
ZGame.INPUTS.AddEvent(KeyCode.W, KeyStatus.HELD, ()=>{
	player.GetComponent(RigidBody).AddForce(Vector2.Up());
});

ZGame.INPUTS.AddEvent(KeyCode.Period, KeyStatus.PRESSED, ()=>{
	const bullet = new Transform(game);
	bullet.position.x = 500;
	bullet.position.y = 50;
	bullet.AddComponent(new Renderer("https://picsum.photos/10/10"));
	bullet.AddComponent(new RigidBody()).AddForce(Vector2.Left().MultiplyScalar(5));
	game.AddObject(bullet);
});

game.updateTime = 1000/60; // set frames per second
game.Start(); // make the game start
game.AddObject(player); // add player to the scene
