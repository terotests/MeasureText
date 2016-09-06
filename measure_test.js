var txt = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed posuere interdum sem. Quisque ligula eros ullamcorper quis, lacinia quis facilisis sed sapien. Mauris varius diam vitae arcu. Sed arcu lectus auctor vitae, consectetuer et venenatis eget velit. Sed augue orci, lacinia eu tincidunt et eleifend nec lacus. Donec ultricies nisl ut felis, suspendisse potenti. Lorem ipsum ligula ut hendrerit mollis, ipsum erat vehicula risus, eu suscipit sem libero nec erat. Aliquam erat volutpat. Sed congue augue vitae neque. Nulla consectetuer porttitor pede. Fusce purus morbi tortor magna condimentum vel, placerat id blandit sit amet tortor";
var resPre = document.createElement("pre");
document.body.appendChild(resPre);

var res_str = "";

var log = {
	time : function(n) {
		this.ms = (new Date()).getTime()
	},
	timeEnd : function(n) {
		res_str += n +" "+((new Date()).getTime() - this.ms)+"ms\n"
		resPre.innerHTML = res_str;
	}
}

var run = function(fn, times, name) {
	log.time(name+" sameTextOneLine")
	for(var i=0; i<times; i++) {
		fn("Arial", 12, 400, "Hello");
	}
	log.timeEnd(name+" sameTextOneLine")

	log.time(name+" sameTextMultiLine")
	for(var i=0; i<times; i++) {
		fn("Arial", 12, 400, txt);
	}
	log.timeEnd(name+" sameTextMultiLine")	

	log.time(name+" sameTextMultiLineVariableLength")
	for(var i=0; i<times; i++) {
		fn("Arial", 12, 400, txt.substring(0, i%600));
	}
	log.timeEnd(name+" sameTextMultiLineVariableLength")		

	log.time(name+" sameTextMultiLineVariableLengthVariableWidth")
	for(var i=0; i<times; i++) {
		fn("Arial", 12, 200+i%200, txt.substring(0, i%600));
	}
	log.timeEnd(name+" sameTextMultiLineVariableLengthVariableWidth")			
}
run(MeasureText, 10000, "dom");
run(MeasureTextCanvas, 10000, "canvas");
run(MeasureTextCached, 10000, "cached");
