document.getElementById("button").addEventListener('click',addBookMark);
document.getElementById("searchInput").addEventListener('keyup',Search);
document.getElementById("bookmarkscolorcode").addEventListener('input',setBookmarkBackground);
document.getElementById("backgroundcolorcode").addEventListener('input',setBackground);
document.getElementById("fontcolorcode").addEventListener('input',setFontColor);
document.getElementById("bookmarkOpacity").addEventListener('input',setOpacity);
document.getElementById("body").onload = function()
{
	var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
	var b = document.getElementById("bookmarks_count");
	var color_storage = JSON.parse(localStorage.getItem('colors'));
	if(color_storage===null)
	{
		document.getElementById("body").style.backgroundColor="black";
		document.getElementById("bookmarks_p").style.backgroundColor="black";
	}
	else
	{
		document.getElementById("body").style.backgroundColor=color_storage[0];
		document.getElementById("bookmarks_p").style.backgroundColor=color_storage[0];
		document.getElementById("bookmarks_p").style.color=color_storage[2];
		document.getElementById("backgroundcolorcode").value=color_storage[0];
		document.getElementById("bookmarkscolorcode").value=color_storage[1];
		document.getElementById("fontcolorcode").value=color_storage[2];
	}
	b.innerHTML=" Total Bookmarks: "+bookmarks.length;
	if(bookmarks===null)
	{
		alert("please add a bookmark!");
	}
	else
	{
	for(var i=0;i<bookmarks.length;i++)
	{
		document.getElementById('bookmarks_p').innerHTML+="<center><div class='bookmark' id='"+bookmarks[i].name+"'><h1>"+bookmarks[i].name+"</h1><a href='"+bookmarks[i].url+"' target='_new'><input type='button' value='Visit'></input></a> <input type='button' value='Delete' class='deletebuttons'></input></div></center><br/>";

	}
	var bkmarks = document.querySelectorAll(".bookmark");
	for(var i=0;i<bkmarks.length;i++)
	{
		bkmarks[i].style.backgroundColor=color_storage[1];
	}
	setListeners();
}
}

function setOpacity()
{
	var opacity = document.getElementById("bookmarkOpacity").value;
	var bookmarks = document.querySelectorAll(".bookmark");
	for(var i=0;i<bookmarks.length;i++)
	{
		bookmarks[i].style.opacity=opacity;
	}
}
function setFontColor()
{	
	var color=document.getElementById("fontcolorcode").value;
	document.getElementById("bookmarks_p").style.color=color;
	var color_storage = JSON.parse(localStorage.getItem('colors'));
	if(color_storage===null)
	{
		var color_storage=[];
		color_storage[2] = color;
		localStorage.setItem('colors',JSON.stringify(color_storage));
	}
	else
	{
		color_storage[2] = color;
		localStorage.setItem('colors',JSON.stringify(color_storage));
	}
	
}
function setBookmarkBackground()
{
	var color = document.getElementById("bookmarkscolorcode").value;
	var bookmarks = document.querySelectorAll(".bookmark");
	for(var i=0;i<bookmarks.length;i++)
	{
		bookmarks[i].style.backgroundColor=color;
	}
	var color_storage = JSON.parse(localStorage.getItem('colors'));
	if(color_storage===null)
	{
		color_storage=[];
		color_storage[1]=color;
		localStorage.setItem('colors',JSON.stringify(color_storage));
	}
	else
	{
		color_storage[1]=color;
		localStorage.setItem('colors',JSON.stringify(color_storage));
	}

}
function setListeners()
{
	var buttons = document.querySelectorAll('.deletebuttons');
	console.log(buttons);
	for(let i=0;i<buttons.length;i++)
	{
		buttons[i].addEventListener('click',function()
			{
			deleteBookMark(i);
			});
	}
}


function setBackground()
{
	var color = document.getElementById("backgroundcolorcode").value;
	var body = document.getElementById("body");
	body.style.backgroundColor=color;
	document.getElementById("bookmarks_p").style.backgroundColor=color;
	var color_storage = JSON.parse(localStorage.getItem("colors"));
	if(color_storage===null)
	{
		var color_storage=[color];
		localStorage.setItem('colors',JSON.stringify(color_storage));
	}
	else
	{
		color_storage[0]=color;
		localStorage.setItem('colors',JSON.stringify(color_storage));
	}
}
function Search()
{
	var searchInput = document.getElementById("searchInput").value.toUpperCase();
	var bookmark_panel = document.getElementById("bookmarks_p");
	var bookmarks = bookmark_panel.querySelectorAll("div.bookmark");
	for(var i=0;i<bookmarks.length;i++)
		{
			var id = bookmarks[i].id.toUpperCase();
			if(id.includes(searchInput))
			{
				bookmarks[i].style.display='';
			}
			else
			{
				bookmarks[i].style.display='none';
			}
	}
}
function deleteBookMark(k)
{
var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
bookmarks.splice(k,1);
localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
window.location.reload();
}

function addBookMark(e)
{
	var bname=document.getElementById("name").value;
	var burl=document.getElementById("url").value;
	var bookmark = {
		name : bname ,
		url : burl
	}
	if(bname==""||burl=="")
	{
		alert("Please Enter Bookmark Name & URL!");
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

