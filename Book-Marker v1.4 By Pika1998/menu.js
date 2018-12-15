document.getElementById("view").addEventListener('click',viewBookMarks);
document.getElementById("addToBookMarks").addEventListener('click',addToBookMarks);
// Clear BookMarks
document.getElementById("clearBookMarks").addEventListener('click',()=>{
	localStorage.setItem("bookmarks",JSON.stringify([]));
});

var categories = JSON.parse(localStorage.getItem("categories"));
if(categories===null)
{
	var categories = ["Default"];
	localStorage.setItem("categories",JSON.stringify(categories));
}
else
{
	//do nothing
}
// Code  To Load Categories in popup
	var select_bar=document.getElementById("categories_view");
	var categories = JSON.parse(localStorage.getItem("categories"));
	if(categories===null)
	{

	}
	else
	{
	for(var i=0;i<categories.length;i++)
	{
		select_bar.innerHTML+=`<option> ${categories[i]}</option>`;
	}
}
// Code To Add Categories
document.getElementById("addCategory").addEventListener('click',()=>{
	var c_name = document.getElementById("category_name").value;
	var categories = JSON.parse(localStorage.getItem("categories"));
	if(categories===null)
	{
		categories = ["Default"];
		categories.push(c_name);
		localStorage.setItem("categories",JSON.stringify(categories));
		console.log("%c Category "+c_name+" Added!","color:green;font-weight:bolder");
		location.reload(true);
	
	}
	else
	{
		var ff=0;
		for(let i=0;i<categories.length;i++)
		{
			if(c_name == categories[i])
			{
				alert("Category Already Exists");
				console.log("%c Failed to add category!","color:red;font-weight:bolder");
				ff=1;
				break
			}
		}
		if(ff==0)
		{
				categories.push(c_name);
				localStorage.setItem("categories",JSON.stringify(categories));
				console.log("%c Category "+c_name+"Added!","color:green;font-weight:bolder");
				location.reload(true);
		}
		
	}
});
//Code To Delete Categories
document.getElementById("deleteCategory").addEventListener('click',()=>{
	var selected=document.getElementById("categories_view").value;
	console.log(selected);
	var categories = JSON.parse(localStorage.getItem("categories"));
	for(var i=0;i<categories.length;i++)
	{
		if(selected==categories[i])
		{
			categories.splice(i,1);
			break;
		}
	}
	localStorage.setItem("categories",JSON.stringify(categories));
location.reload(true);
})
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