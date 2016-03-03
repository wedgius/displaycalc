var width = 13.06;
var height = 8.16;
var pixelWidth = 2880;
var pixelHeight = 1800;
// var ratio = width / height;


var diagonal = function()
{
	return Math.sqrt(Math.pow(width, 2.0) + Math.pow(height, 2.0));
}

var baseAngle = function()
{
	return Math.acos(height / diagonal()) * (180 / Math.PI);
}

var ppu = function()
{
	var pixelDiagonal = Math.sqrt(Math.pow(pixelWidth, 2.0) + Math.pow(pixelHeight, 2.0));
	return pixelDiagonal / diagonal();
}

$(function()
{
	update();
});

$("#width").change(function()
{
	var formWidth = parseFloat($("#width").val());
	
	if (formWidth > 0.0)
	{
		width = formWidth;
		
		var ratio = width / height;
		pixelWidth = pixelHeight * ratio;
		
		update();
	}
	else
	{
		$("#width").val(width);
	}
});
		
$("#height").change(function()
{
	var formHeight = parseFloat($("#height").val());
	
	if (formHeight > 0.0)
	{
		height = formHeight;
		
		var ratio = height / width;
		pixelHeight = pixelWidth * ratio;
		
		update();
	}
	else
	{
		$("#height").val(height);
	}
});

$("#pixel-width").change(function()
{
	var formWidth = parseFloat($("#pixel-width").val());
	
	if (formWidth > 0.0)
	{
		pixelWidth = formWidth;
		
		var ratio = pixelWidth / pixelHeight;
		width = height * ratio;
		
		update();
	}
	else
	{
		$("#pixel-width").val(pixelWidth);
	}
});

$("#pixel-height").change(function()
{
	var formHeight = parseFloat($("#pixel-height").val());
	
	if (formHeight > 0.0)
	{
		pixelHeight = formHeight;
		
		var ratio = pixelHeight / pixelWidth;
		height = width * ratio;
		
		update();
	}
	else
	{
		$("#pixel-height").val(pixelHeight);
	}
});

$("#ppu").change(function()
{
	var formPPU = parseFloat($("#ppu").val());
	
	if (formPPU > 0.0)
	{
/*
		pixelWidth = width * formPPU;
		pixelHeight = height * formPPU;
*/
		
		width = pixelWidth / formPPU;
		height = pixelHeight / formPPU;
		
		update();
	}
	else
	{
		$("#ppu").val(ppu);
	}
})

$("#diagonal-length").change(function()
{
	var formDiagonal = parseFloat($("#diagonal-length").val());
	
	if (formDiagonal > 0.0)
	{
		var angle = baseAngle();
		height = Math.cos(angle * (Math.PI / 180)) * formDiagonal;
		width = Math.sqrt(Math.pow(formDiagonal, 2) - Math.pow(height, 2));
		
		var per = ppu();
		pixelWidth = width * per;
		pixelHeight = height * per;
		
		update();
	}
	else
	{
		$("#diagonal-length").val(diagonal);
	}
});

function update()
{
	updateValues();
	updateDisplayBox();
	updateDiagonalSkew();
}

function updateValues()
{
	$("#width").val(width.toFixed(2));
	$("#height").val(height.toFixed(2));
	$("#pixel-width").val(Math.round(pixelWidth));
	$("#pixel-height").val(Math.round(pixelHeight));
	$("#diagonal-length").val(diagonal().toFixed(2));
	$("#ppu").val(ppu().toFixed(2));
}

function updateDisplayBox()
{
	var boxWidth = 100.0;
	var boxHeight = 100.0;
	var horizontalMargin = 0.0;
	var verticalMargin = 0.0;
	var marginString = "";
	
// 	console.log("width: " + width + " height: " + height);
	if (width > height)
	{
		boxHeight *= height / width;
// 		console.log(height + "/" + width + " = " + boxHeight);
		verticalMargin = (100.0 - boxHeight) / 2.0;
	}
	else if (height > width)
	{
		boxWidth *= width / height;
// 		console.log(width + "/" + height + " = " + boxWidth);
		horizontalMargin = (100.0 - boxWidth) / 2.0;
	}
	
	marginString = verticalMargin + "% " + horizontalMargin + "%";	
	
	$("#display").css({"width": boxWidth + "%", "height": boxHeight + "%", "margin": marginString})
}

function updateDiagonalSkew()
{	
	$("#display-diagonal").css({"transform": "skewX(-" + baseAngle() + "deg)"});
}
