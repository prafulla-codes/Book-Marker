
document.getElementById("view").addEventListener('click',viewBookMarks);
document.getElmentById("addToBookMarks").addEventListener('click',addToBookMarks);
document.getElementById("addNewCategory").addEventListener('click',addCategory);
function viewBookMarks()
{
	window.open('bookmarker.html','_blank');
}

function addToBookMarks()
{

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
	}
	else
	{
		categories.push(category_name);
		localStorage.setItem('categories',JSON.stringify(categories));
	}
	console.log(categories);
}
}