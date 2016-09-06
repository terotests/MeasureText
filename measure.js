
(function(register) {
	register.MeasureText = (function() {

		var fontDivs = {};
		var container = document.createElement('DIV');
		container.setAttribute("style", "position:absolute;left:10;top:10;width:0px;height:0px;overflow:hidden;")
		document.body.appendChild(container);

		return function Measure(font, size, width, txt) {
			
			var view = fontDivs[font+size];

			if(!fontDivs[font+size]) {
				view = document.createElement('DIV');
				view.setAttribute("style", "position:absolute;left:0px;top:0px;white-space:pre-line;font-family:"+font+";font-size:"+size+"px;width:"+width+"px;");
				container.appendChild(view);
				fontDivs[font+size] = view;
			}
			if(view.textContent != txt) view.textContent = txt;
			var res = {
				width  : view.clientWidth,
				height : view.clientHeight
			};
			if(res.height < ( size *2) ) {
				view.style.width = "auto";	
				res.width = view.clientWidth+1;
				view.style.width = width+"px;";	
			}
			return res;
		}
	})();


	register.MeasureTextCanvas = (function() {

		var fontDivs = {};
		var canvases = {};
		var container = document.createElement('DIV');
		
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");

		container.setAttribute("style", "position:absolute;left:10;top:10;width:0px;height:0px;overflow:hidden;")
		document.body.appendChild(container);

		return function Measure(font, size, width, txt) {
			
			var view = fontDivs[font+size];

			if(width > (txt.length*size)) {
				var ctx = canvases[font+size];
				if(!ctx) {
					var canvas = document.createElement("canvas");
					ctx = canvas.getContext("2d");
					ctx.font = size+"px "+font;
					canvases[font+size] = ctx;
				}
				var s = ctx.measureText(txt);
				return {
					width  : s.width,
					height : size
				}
			}

			if(!fontDivs[font+size]) {
				view = document.createElement('DIV');
				view.setAttribute("style", "position:absolute;left:0px;top:0px;white-space:pre-line;font-family:"+font+";font-size:"+size+"px;width:"+width+"px;");
				container.appendChild(view);
				fontDivs[font+size] = view;
			}
			if(view.textContent != txt) view.textContent = txt;
			var res = {
				width  : view.clientWidth,
				height : view.clientHeight
			};
			if(res.height < ( size *2) ) {
				view.style.width = "auto";	
				res.width = view.clientWidth+1;
				view.style.width = width+"px;";	
			}
			return res;
		}
	})();

	/*

	*/
	register.MeasureTextCached= (function() {

		var fontDivs = {};
		var canvases = {};

		var results = {};
		var _id = 1;

		var container = document.createElement('DIV');
		
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");

		container.setAttribute("style", "position:absolute;left:10;top:10;width:0px;height:0px;overflow:hidden;")
		document.body.appendChild(container);

		return function Measure(font, size, width, txt) {
			
			var id = txt;
			if(id) {
				if(r = results[id+font+size]) {
					return r;
				}
			} else {
				txt._id = _id++;
				id = txt._id;
			}
			var view = fontDivs[font+size];

			if(width > (txt.length*size)) {
				var ctx = canvases[font+size];
				if(!ctx) {
					var canvas = document.createElement("canvas");
					ctx = canvas.getContext("2d");
					ctx.font = size+"px "+font;
					canvases[font+size] = ctx;
				}
				var s = ctx.measureText(txt);
				var res = {
					width  : s.width,
					height : size
				}
				results[id+font+size] = res;
				return res;
			}

			if(!fontDivs[font+size]) {
				view = document.createElement('DIV');
				view.setAttribute("style", "position:absolute;left:0px;top:0px;white-space:pre-line;font-family:"+font+";font-size:"+size+"px;width:"+width+"px;");
				container.appendChild(view);
				fontDivs[font+size] = view;
			}
			if(view.textContent != txt) view.textContent = txt;
			var res = {
				width  : view.clientWidth,
				height : view.clientHeight
			};
			if(res.height < ( size *2) ) {
				view.style.width = "auto";	
				res.width = view.clientWidth+1;
				view.style.width = width+"px;";	
			}
			results[id+font+size] = res;
			return res;
		}
	})();

})(window);

