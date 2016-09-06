
var txt = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed posuere interdum sem. Quisque ligula eros ullamcorper quis, lacinia quis facilisis sed sapien. Mauris varius diam vitae arcu. Sed arcu lectus auctor vitae, consectetuer et venenatis eget velit. Sed augue orci, lacinia eu tincidunt et eleifend nec lacus. Donec ultricies nisl ut felis, suspendisse potenti. Lorem ipsum ligula ut hendrerit mollis, ipsum erat vehicula risus, eu suscipit sem libero nec erat. Aliquam erat volutpat. Sed congue augue vitae neque. Nulla consectetuer porttitor pede. Fusce purus morbi tortor magna condimentum vel, placerat id blandit sit amet tortor";

var run = function(fn, times, name) {
	console.time("sameTextOneLine"+name)
	for(var i=0; i<times; i++) {
		fn("Arial", 12, 400, "Hello");
	}
	console.timeEnd("sameTextOneLine"+name)

	console.time("sameTextMultiLine"+name)
	for(var i=0; i<times; i++) {
		fn("Arial", 12, 400, txt);
	}
	console.timeEnd("sameTextMultiLine"+name)	

	console.time("sameTextMultiLineVariableLength"+name)
	for(var i=0; i<times; i++) {
		fn("Arial", 12, 400, txt.substring(0, i%600));
	}
	console.timeEnd("sameTextMultiLineVariableLength"+name)		
}

run(MeasureText, 10000, "dom");
run(MeasureTextCanvas, 10000, "canvas");
run(MeasureTextCached, 10000, "cached");
