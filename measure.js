
(function(register) {

	register.MeasureText = (function() {

		var fontDivs = {};
		var container = document.createElement('DIV');
		container.setAttribute("style", "position:absolute;left:-10000px;top:10px;width:3000px;height:300px;overflow:hidden;")
		document.body.appendChild(container);

		return function Measure(font, size, width, txt) {
			
			var div_id = font+size+"/"+width;
			var view = fontDivs[div_id];

			if(!fontDivs[div_id]) {
				view = document.createElement('DIV');
				view.setAttribute("style", "position:absolute;left:0px;top:0px;white-space:pre-line;font-family:"+font+";font-size:"+size+"px;width:"+width+"px;");
				container.appendChild(view);
				fontDivs[div_id] = view;
			}
			if(view.textContent != txt) view.textContent = txt;
			var res = {
				width  : view.clientWidth,
				height : view.clientHeight
			};
			if(res.height < ( size *2) ) {
				view.style.width = "auto";	
				res.width = view.clientWidth+1;
				view.style.width = width+"px";	
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

		container.setAttribute("style", "position:absolute;left:-10000px;top:10px;width:3000px;height:300px;overflow:hidden;")
		document.body.appendChild(container);

		return function Measure(font, size, width, txt) {
			

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
			var div_id = font+size+"/"+width;
			var view = fontDivs[div_id];

			if(!fontDivs[div_id]) {
				view = document.createElement('DIV');
				view.setAttribute("style", "position:absolute;left:0px;top:0px;white-space:pre-line;font-family:"+font+";font-size:"+size+"px;width:"+width+"px;");
				container.appendChild(view);
				fontDivs[div_id] = view;
			}
			if(view.textContent != txt) view.textContent = txt;
			var res = {
				width  : view.clientWidth,
				height : view.clientHeight
			};
			if(res.height < ( size *2) ) {
				view.style.width = "auto";	
				res.width = view.clientWidth+1;
				view.style.width = width+"px";	
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
		var container = document.createElement('DIV');
		
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");

		container.setAttribute("style", "position:absolute;left:-10000px;top:10px;width:3000px;height:300px;overflow:hidden;")
		document.body.appendChild(container);

		return function Measure(font, size, width, txt) {
			
			var id = "c"+txt+font+size+"/"+width, r;
			if(r = results[id]) {
				return r;
			}

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
					height : parseInt(size)
				}
				results[id] = res;
				return res;
			}

			var div_id = font+size+"/"+width;
			var view = fontDivs[div_id];

			if(!fontDivs[div_id]) {
				view = document.createElement('DIV');
				view.setAttribute("style", "position:absolute;left:0px;top:0px;white-space:pre-line;font-family:"+font+";font-size:"+size+"px;width:"+width+"px;");
				container.appendChild(view);
				fontDivs[div_id] = view;
			}
			if(view.textContent != txt) {
				view.textContent = txt;
			}
			var res = {
				width  : view.clientWidth,
				height : view.clientHeight
			};

			if(res.height < ( size *2) ) {
				
				view.style.width = "auto";	
				res.width = view.clientWidth+1;
				view.style.width = width+"px";	
			}
			results[id] = res;
			return res;
		}
	})();

})(window);

