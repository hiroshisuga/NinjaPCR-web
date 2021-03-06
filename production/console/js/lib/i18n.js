function getLang () {

  var r = new RegExp('.*\\/([a-z]{2})\\/console\\/.*');
  if (r.test(location.href)) {
    return RegExp.$1;
  }
	if (navigator.languages) { 
		return navigator.languages[0];
 	} 
	return navigator.language;
}
if (getLang()=='ja') {
	window.MESSAGE = window.MESSAGE_JA;
} else {
	window.MESSAGE = window.MESSAGE_EN;
}
LOCALIZE_CLASS_REGEXP = new RegExp('.*pcr_localize_([^ ]+)');
function getLocalizedMessage (messageId) {
	if (window.chrome && chrome.i18n) {
		chrome.i18n.getMessage(messageId);
	} else if (window.MESSAGE) {
		if (window.MESSAGE[messageId] && window.MESSAGE[messageId]["message"]) {
			return window.MESSAGE[messageId]["message"];
		}
		else {
			return messageId;
		}
	} else {
		return messageId;
		
	}
}
function localize() {
	var tags = [];
	var all = document.getElementsByTagName('*');
	for (var i=0; i<all.length; i++) {
		if ('INPUT'!=all[i].tagName)
			tags.push(all[i]);
	}
	var buttons = document.getElementsByTagName('INPUT');
	
	for (var i=0, l=tags.length; i<l; i++) {
		var element = tags[i];
		if (element.className && element.className.match(LOCALIZE_CLASS_REGEXP)) {
			element.innerHTML = getLocalizedMessage(RegExp.$1);
			if (!getLocalizedMessage(RegExp.$1)) {
				console.error("I18N ERROR. NO MESSAGE FOUND FOR THE KEY " + RegExp.$1);
			}
		}
	}
	for (var i=0, l=buttons.length; i<l; i++)
	{
		var element = buttons[i];
		if ('button'!=element.type) continue;
		if (null!=element.className && element.className.match(LOCALIZE_CLASS_REGEXP))
		{
			element.value = getLocalizedMessage(RegExp.$1);
		}
	}
};