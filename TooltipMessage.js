(function () {
	"use strict";
	var extensionId = chrome.runtime.id;
	var messageAttrName = `data-message_${extensionId}`;
	
	var container = document.createElement("div");
	container.id = `TooltipMessage-Container-${extensionId}`;
	container.setAttribute("data-chrome-extension-id", extensionId);
	document.body.appendChild(container);
	
	function set(elem, message) {
		if (!elem.hasAttribute(messageAttrName)) {
			elem.setAttribute(messageAttrName, message);
			var tooltipElem = create(message);
			setEvent(elem, tooltipElem);
		}
	}
	
	function create(message) {
		var tooltipElem = document.createElement("div");
		tooltipElem.innerText = message;
		tooltipElem.style.display = "none";
		
		container.appendChild(tooltipElem);
		return tooltipElem;
	}
	
	function setEvent(targetElem, tooltipElem) {
		targetElem.addEventListener("mouseover", (evt) => {
			tooltipElem.style.display = "block";
			var {top, left} = getOffsets(targetElem);
			var marginBottom = 10;
			top += -tooltipElem.offsetHeight - marginBottom;
			left += (targetElem.offsetWidth - tooltipElem.offsetWidth) / 2;
			tooltipElem.style.top = `${top}px`;
			tooltipElem.style.left = `${left}px`;
		});
		targetElem.addEventListener("mouseout", () => {
			tooltipElem.style.display = "none";
		});
	}
	
	function getOffsets(elem) {
		var top = 0;
		var left = 0;
		while (elem) {
			top += elem.offsetTop;
			left += elem.offsetLeft;
			elem = elem.offsetParent;
		}
		return {top, left};
	}
	
	window.TooltipMessage = {
		set: set
	};
})();