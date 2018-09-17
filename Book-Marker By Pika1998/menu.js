document.getElementById("view").addEventListener('click',viewBookMarks);
document.getElementById("addToBookMarks").addEventListener('click',addToBookMarks);
document.getElementById("clearAllBookMarks").addEventListener('click',clearBookMarks);
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

function clearBookMarks()
{
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	bookmarks=null;
	localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
}