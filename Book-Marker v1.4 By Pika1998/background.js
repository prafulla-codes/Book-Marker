var title=0;
var url=0;
chrome.runtime.onMessage.addListener(
function(response, sender, sendResponse) {
if(response=="addExternal")
 {
 addExternalBookMark(title,url);
}
else
{
title=response.required_title;
url=response.required_url;
}
} );

function addExternalBookMark(title,url)
{
	var bookmark = {
		name : title ,
		url : url,
		category: "Default"
	}
	if(title==""||url=="")
	{
		alert("Failed to add bookmark , please reload the page.");
	}
	else
	{
		var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
		var barray=[];
		if(bookmarks===null)
		{
			barray.push(bookmark);
			localStorage.setItem('bookmarks',JSON.stringify(barray));
			alert("Success: Added Bookmark");
			window.location.reload();
		}
		else
		{
			var b = JSON.parse(localStorage.getItem('bookmarks'));
			b.push(bookmark);
			localStorage.setItem('bookmarks',JSON.stringify(b));
			alert("Success: Added Bookmark");
			window.location.reload();
		}
	}
}