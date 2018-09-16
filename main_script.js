document.getElementById("button").addEventListener('click',addBookMark);
document.getElementById("searchInput").addEventListener('keyup',Search);
document.getElementById("backgroundcolorcode").addEventListener('keyup',setBackground);
document.getElementById("body").onload = function()
{
		var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
	var b = document.getElementById("bookmarks_count");
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
	setListeners();
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

