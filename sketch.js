$(document).ready( function () {

	var resolution = 15;

	var color = "white";

	var israinbow = false;

	$("select").append(createOptions(65));

	creategrid(resolution, color);

	//handles shake input
	$("form").submit( function() {

		var input = $("select").val();

		if (!input){
			creategrid(resolution, color);	

		}
		else if (isNaN(resolution)) {
			alert("You must enter a number");
		}
		else if (resolution <= 0) {
			alert("Resolution must be greater than 0.");
		}
		else if (resolution > 65) {
			alert("Sorry that's too high");
		}		
		else {
			resolution = input;
			creategrid(resolution, color);			
		}
	});


	//handles rainbow input
	$("input[id=rainbow]").click( function() {

		israinbow = !israinbow;

		if (israinbow) {
			$("#rainbow").prop('value', 'Black & White');
			color = "rainbow";
			creategrid(resolution, color);			
		}
		else {
			$("#rainbow").prop('value', 'Rainbow!');
			color = "white"
			creategrid(resolution, color);			
		}


	});

	//handles window reizing
	$(window).smartresize( function(){
		creategrid(resolution, color);	
	});



});

function createOptions(n) {
	var string = "<option value=\"\"></option>";

	for (i = 2; i < n; i++)
	{
		string += "<option value=\"" + i + "\">" + i + "</option>";
	}

	return string;
};

function hoverSketch(color) {

	var counter = Math.floor(Math.random() * 144);

	//turns changes pixel div class when hover
	$('.pixel').hover( function() {

		switch (color) {

		case "rainbow":
			$(this).css("background-color", rainbowcolor(counter));
			break;

		case "white":
			$(this).css("background-color", "white");
			break;

		default:
			$(this).css("background-color", "black");
		}

		counter++;
		if (counter >= 144)
			counter = 0;
	});

};

function rainbowcolor(n) {

	var r, g, b;

	//determine the color based on n
	if(n < 24) {
		r = 240;
		g = 10 * n;
		b = 0;
	}
	else if(n >= 24 && n < 48) {
		r = 240 - 10 * (n % 24);
		g = 240;
		b = 0;
	}
	else if(n >= 48 && n < 72) {
		r = 0;
		g = 240;
		b = 10 * (n % 24);
	}
	else if(n >= 72 && n < 96) {
		r = 0;
		g = 240 - 10 * (n % 24);
		b = 240;
	}
	else if(n >= 96 && n < 120) {
		r = 10 * (n % 24);
		g = 0;
		b = 240;
	}
	else if(n >= 120 && n < 144) {
		r = 240;
		g = 0;
		b = 240 - 10 * (n % 24);
	}

	var hexstring = "#" + hexcode(r) + hexcode(g) + hexcode(b);

	return hexstring;

};

//convert rgb number to html readable hex
function hexcode (d) {

	var s;

	if (d < 16) {
		s = "0" + d.toString(16);
	}
	else {
		s = d.toString(16);
	}

	return s;
};

//insantiates an new grid
function creategrid (res, color) {
	
	//empty grid div
	$('#grid').empty();

	//varible to store in html for grid
	var gridstring = "";

	//set the pixel width to the width of grid divided by res
	var pxwidth = $("#grid").width() / res;

	if (res > 2)
		var gridrows = Math.floor(res * .7);
	else 
		var gridrows = res;

	//iterate through loops and store html in gridstring
	for (var i = 0; i < gridrows; i++) {
		
		for (var j = 0; j < res; j++) {

			gridstring += "<div class=\"" + color + " pixel \" style=\" width:" + pxwidth + "px; height:" + pxwidth + "px";

			//border raidiuses the corner boxes
			if (i == 0 && j == 0)
				gridstring += "; border-radius:25% 0 0 0 \"></div>";						
			else if (i == 0 && j == res - 1)
				gridstring += "; border-radius: 0 25% 0 0 \"></div>";				
			else if (i == gridrows - 1 && j == 0)
				gridstring += "; border-radius: 0 0 0 25% \"></div>";				
			else if (i == gridrows - 1 && j == res - 1)
				gridstring += "; border-radius: 0 0 25% 0\"></div>";
			else 
				gridstring += "\"></div>";
				
		}

		gridstring += "<br>";
	}

	//append gridstring html into grid div
	$("#grid").append(gridstring);

	//function that creates hover sketching
	hoverSketch(color);

};

(function($,sr){
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize 
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');
