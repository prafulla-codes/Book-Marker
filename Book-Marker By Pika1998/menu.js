document.getElementById("view").addEventListener('click',viewBookMarks);
document.getElementById("addToBookMarks").addEventListener('click',addToBookMarks);
document.getElementById("clearAllBookMarks").addEventListener('click',clearBookMarks);
document.getElementById("addNewCategory").addEventListener('click',addCategory);
document.getElementById("deleteCategory").addEventListener('click',deleteCategory);

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

function deleteCategory()
{
	var categories = JSON.parse(localStorage.getItem("categories"));
	var category_name = document.getElementById("select_category").value;
	if(category_name=="")
	{
		if(categories=="")
		{
			alert("No Categories Created");
		}
		else
		{
			alert("Please Select Category To Delete");
		}
	}
	else
	{
	for(var i=0;i<categories.length;i++)
	{
		if(categories[i]==category_name)
		{
			categories.splice(i,1);
			localStorage.setItem("categories",JSON.stringify(categories));
			break;
		}
	}
	window.location.reload();
}
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
		window.location.reload();
	}
	else
	{
		categories.push(category_name);
		localStorage.setItem('categories',JSON.stringify(categories));
		alert("Sucess! Added New Category :"+category_name);
		window.location.reload();
	}
	console.log(categories);
}
}