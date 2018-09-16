document.getElementById("view").addEventListener('click',viewBookMarks);
document.getElementById("addToBookMarks").addEventListener('click',addToBookMarks);
function viewBookMarks()
{
  window.open('bookmarker.html','_blank');
}

function addToBookMarks()
{
	fetchTitle();
	
}

function fetchTitle()
{
	chrome.runtime.sendMessage("addExternal");
}