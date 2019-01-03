const render = function (config) {
	let width = config.width || 200
	let height = config.height || 220
	let bottom = config.bottom || 20
	let right = config.right || 20
	let model = config.model || 'hijiki'
	let headPos = config.headPos || 0.5
	let scale = config.scale || 2
	let opacity = config.opacity || 0.7
	let hoverOpacity = config.hoverOpacity || 1
	let canHover = config.canHover

   	let html =
`
<!-- Copyright (C) Microsoft Corporation. All rights reserved. -->
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<style>
		#live2dcanvas:hover {
			opacity: ${hoverOpacity}!important;
		}
	</style>
	</head>
	<body class="monaco-shell vs-dark" aria-label="">
	</body>

	<!-- Startup via workbench.js -->
	<script src="workbench.js"></script>
	<script src="http://summerscar.me/live2dDemo/bundle.js" type="text/javascript"></script>
	<script>
		let canvas = document.createElement('canvas')
		canvas.id = 'live2dcanvas'
		canvas.width = ${width}
		canvas.height = ${height}
		canvas.style.width = '${width}px'
		canvas.style.height = '${height}px'
		canvas.style.position = 'fixed'
		canvas.style.bottom = '${bottom}px'
		canvas.style.right = '${right}px'
		canvas.style.opacity = ${opacity}
		canvas.style.transition = 'opacity 0.5s'
		canvas.style.zIndex = '999'
		canvas.style.cursor = 'move'
		if (!${canHover}) {
			canvas.style.pointerEvents = 'none'
		}
		document.body.appendChild(canvas)
		var moveElem = canvas

		var dragging;
		var tLeft, tTop;

		document.addEventListener('mousedown', function(e) {
			if (e.target == moveElem) {

				dragging = true;
			var moveElemRect = moveElem.getBoundingClientRect();
				tLeft = e.clientX - moveElemRect.left;
				tTop = e.clientY - moveElemRect.top;
			}
		});

		document.addEventListener('mouseup', function(e) {
			dragging = false;
		});

		document.addEventListener('mousemove', function(e) {
			if (dragging) {
				var moveX = e.clientX - tLeft,
					moveY = e.clientY - tTop;

				moveElem.style.left = moveX + 'px';
				moveElem.style.top = moveY + 'px';

			}
		});

		loadlive2d('live2dcanvas', 'http://summerscar.me/live2dDemo/assets/${model}/${model}.model.json', ${headPos}, ${scale}, ${opacity}, ${hoverOpacity});
	</script>
</html>
`
return html
}

module.exports = render