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