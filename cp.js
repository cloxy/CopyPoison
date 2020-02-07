/* CopyPoison 3.2 | (c) 2015 MIT license | http://copypoison.com */
(function() {
	var chars = 'ABEKMHOΠPCTXaeĸopcyxIiJjSs'+'АВЕКМНОПРСТХаекорсухІіЈјЅѕ';
	var cfg = {length : 150, link : 'true', prefix : '', suffix : ''}, script;

	if(script = document.currentScript) {
		cfg.length = script.getAttribute('data-length') || cfg.length;
		cfg.link = script.getAttribute('data-link') || cfg.link;
		cfg.prefix = script.getAttribute('data-prefix') || cfg.prefix;
		cfg.suffix = script.getAttribute('data-suffix') || cfg.suffix;
	}

	function replaceChars(text) {
		var mid = chars.length / 2;
		var ptext = '';
		var n = text.length;
		for(var i=0; i<n; i++) {
			var index=chars.indexOf(text.charAt(i));
			if(index==-1) ptext+=text.charAt(i);
			else if(index >= mid) ptext+=chars.charAt(index-mid);
			else ptext+=chars.charAt(index+mid);
		}
		return(ptext);
	}

	function isCode(text) {
		return(
			(text.indexOf('<') != -1 && text.indexOf('>') != -1) ||
			(text.indexOf('{') != -1 && text.indexOf('}') != -1)
		);
	}

	function copyPoison() {
		if(window.clipboardData && document.selection) { // IE
			var selectionObject = document.selection.createRange();
			var selectionText = selectionObject.text;
			if(selectionText.length > cfg.length && !isCode(selectionText)) {
				selectionText = replaceChars(selectionText);
				if(cfg.link == 'true') {
					selectionText+= "\r\n\r\n"+cfg.prefix+document.location.href+cfg.suffix;
				}
				window.clipboardData.setData('Text', selectionText);
				return(false);
			}
		}
	}

	if(window.addEventListener) {
		window.addEventListener('copy', copyPoison, false);
	} else { // IE
		window.onload = function() {
			document.body.oncopy = copyPoison;
		}
	}
})();
