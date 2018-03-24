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
		<script>
			(function() {
				function getConfig() {
					let queryParams = window.location.search.substring(1).split('&');
					for (let i = 0; i < queryParams.length; i++) {
						var kv = queryParams[i].split('=');
						if (kv[0] === 'config' && kv[1]) {
							return JSON.parse(decodeURIComponent(kv[1]));
						}
					}
					return {};
				}
				try {
					let config = getConfig();
					let document = window.document;

					// sets the base theme class ('vs', 'vs-dark', 'hc-black')
					let baseTheme = config.baseTheme || 'vs';
					document.body.className = 'monaco-shell ' + baseTheme;

					// adds a stylesheet with the backgrdound color
					let backgroundColor = config.backgroundColor;
					if (!backgroundColor) {
						backgroundColor = baseTheme === 'hc-black' ? '#000000' : (baseTheme === 'vs' ? '#FFFFFF' : '#1E1E1E');
					}
					let style = document.createElement('style');
					style.innerHTML = '.monaco-shell { background-color:' + backgroundColor + '; }';
					document.head.appendChild(style);

				} catch (error) {
					console.error(error);
				}
			})();
		</script>
	</body>
	
	<!-- Startup via index.js -->
	<script src="index.js"></script>
	<script src="http://summerscar.me/live2dDemo/bundle.js"></script>
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
		canvas.style.transition = 'all 0.5s'
		canvas.style.zIndex = '999'
		if (!${canHover}) {
			canvas.style.pointerEvents = 'none'
		}
		document.body.appendChild(canvas)

		loadlive2d('live2dcanvas', 'http://summerscar.me/live2dDemo/assets/${model}/${model}.model.json', ${headPos}, ${scale}, ${opacity}, ${hoverOpacity});
	</script>
</html>
`
return html
}

module.exports = render