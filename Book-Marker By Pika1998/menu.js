document.getElementById("view").addEventListener('click',viewBookMarks);
document.getElementById("addToBookMarks").addEventListener('click',addToBookMarks);
document.getElementById("clearAllBookMarks").addEventListener('click',clearBookMarks);
document.getElementById("addNewCategory").addEventListener('click',addCategory);
var select = document.getElementById("select_category");
console.log(select);
var categories = JSON.parse(localStorage.getItem("categories"));
for(var i=0;i<categories.length;i++)
{
	select.innerHTML+="<option value='"+categories[i]+"'>"+categories[i]+"</option>"
}
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

function addCategory()
{
	var category_name = document.getElementById("category_name").value;
	if(category_name=="")
	{
		alert("Please Enter Category Name!")
	}
	else
	{
	var categories = JSON.parse(localStorage.getItem('categories'));
	if(categories==null)
	{
		categories=[];
		categories.push(category_name);
		localStorage.setItem('categories',JSON.stringify(categories));
		alert("Sucess! Added New Category :"+category_name);
		document.getElementById("category_name").value="";
	}
	else
	{
		categories.push(category_name);
		localStorage.setItem('categories',JSON.stringify(categories));
		alert("Sucess! Added New Category :"+category_name);
		document.getElementById("category_name").value="";
	}
	console.log(categories);
}
}