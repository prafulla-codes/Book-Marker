document.getElementById("button").addEventListener('click',addBookMark);
document.getElementById("searchInput").addEventListener('keyup',Search);
document.getElementById("bookmarkscolorcode").addEventListener('input',setBookmarkBackground);
document.getElementById("backgroundcolorcode").addEventListener('input',setBackground);
document.getElementById("fontcolorcode").addEventListener('input',setFontColor);
document.getElementById("bookmarkOpacity").addEventListener('input',setOpacity);
document.getElementById("bgimageinput").addEventListener("click",()=>{
var bgsrc=prompt("Enter Link Of The Background Image:");
body.style.backgroundImage=`url(${bgsrc})`;
body.style.imageSize="cover";
document.getElementById("imageselected").innerHTML=bgsrc;
localStorage.setItem("pageimage",bgsrc);
});
document.getElementById("searchInput").addEventListener("search",()=>{
	var bookmarks=document.getElementsByClassName("bookmark");
	for(var j=0;j<bookmarks.length;j++)
	{
		bookmarks[j].style.display="inline-block";
	}
})
var pageimage = localStorage.getItem("pageimage");
if(pageimage===null)
{
	document.getElementById("imageselected").innerHTML="";
	document.getElementById("imagebutton1").style.display="none";
}
else
{
	body.style.backgroundImage=`url(${pageimage})`;
	document.getElementById("imageselected").innerHTML=pageimage;
	document.getElementById("imagebutton1").style.display="";
}

document.getElementById("imagebutton1").addEventListener("click",()=>{
	body.style.backgroundImage="none";
	document.getElementById("imageselected").innerHTML="";
	localStorage.removeItem("pageimage")
	document.getElementById("imagebutton1").style.display="none";
	window.location.reload();
})
var categories = JSON.parse(localStorage.getItem("categories"));
document.getElementById("searchByCategory").innerHTML="<option disabled selected>--Search By Category--</option><option>All Bookmarks</option>";
for(var k=0;k<categories.length;k++)
{
	document.getElementById("searchByCategory").innerHTML +=`<option> ${categories[k]}</option>`
}

document.getElementById("searchByCategory").addEventListener("change",()=>{
	var bookmark_panel = document.getElementById("bookmarks_p");
	var selected_category = document.getElementById("searchByCategory");
	var selected = selected_category.options[selected_category.selectedIndex].text;
	console.log(selected);
	var bookmarks_main = JSON.parse(localStorage.getItem("bookmarks"));
	var bookmarks = document.getElementsByClassName("bookmark");
	console.log(bookmarks);
	for(let i=0;i<bookmarks_main.length;i++)
		{
			console.log(bookmarks_main[i].category);
			var bcategory = bookmarks_main[i].category;
			if(selected=="All Bookmarks")
			{
				for(var j=0;j<bookmarks.length;j++)
				{
					bookmarks[j].style.display="inline-block";
				}
			}
			else
			{
			if(selected!=bcategory)
			{
				var b=document.getElementById(bookmarks_main[i].name);
				console.log(b);
				b.style.display="none";
			}
		
			else
			{ 
				console.log("category matched!");
				var b=document.getElementById(bookmarks_main[i].name);
				console.log(b);
				b.style.display="inline-block";
			}
		}
		}
})
document.getElementById("body").onload = function()
{
	var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
	var b = document.getElementById("bookmarks_count");
	var color_storage = JSON.parse(localStorage.getItem('colors'));
	if(color_storage===null)
	{
		document.getElementById("body").style.backgroundColor="#c9dfff";
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
	if(JSON.parse(localStorage.getItem("bookmarks"))!=null)
	{
	b.innerHTML=" Total Bookmarks: "+bookmarks.length;
	}
	else
	{
		b.innerHTML=" Total Bookmarks: 0";
	}
	if(bookmarks===null)
	{
		alert("please add a bookmark!");
	}
	else
	{
	for(var i=0;i<bookmarks.length;i++)
	{
		document.getElementById('bookmarks_p').innerHTML+=`<div class='bookmark' id="${bookmarks[i].name}"><input class='deletebuttons' type='button' value="X"><h1>${bookmarks[i].name}</h1><br>
		<hr>
		<fieldset class="fieldset">
		<legend class="fieldsetLegend">Set Category</legend>
		<select id="select${bookmarks[i].name}" class="categorieSelect" size=2 selected=${bookmarks[i].category}>
		`+putCategoriesInSelectBoxes()+`
		</select>
		</fieldset>
		<br>
		<fieldset class="fieldset">
		<div class="categoryDiv">
		<p style="display:inline" id="categoryselect${bookmarks[i].name}">${bookmarks[i].category}</p>
		</div>
		</fieldset>
		<a href='${bookmarks[i].url}' target='_new'><input type='button' value='Visit' class="visitbutton"></a></div>`;

	}
	var bkmarks = document.querySelectorAll(".bookmark");
	for(var i=0;i<bkmarks.length;i++)
	{
		if(color_storage!=null)
		{
		bkmarks[i].style.backgroundColor=color_storage[1];
		}
	}
	setListeners();
	setSelectBoxListeners();
}
}

function putCategoriesInSelectBoxes()
{
	var categories = JSON.parse(localStorage.getItem("categories"));
	var x="";
	for(var i=0;i<categories.length;i++)
	{
		x+=`<option class="categorieOptions" value=${categories[i]}>${categories[i]}</option>`;
	}
	return x;
}
// code to set opacity
function setOpacity()
{
	var opacity = document.getElementById("bookmarkOpacity").value;
	var bookmarks = document.querySelectorAll(".bookmark");
	for(var i=0;i<bookmarks.length;i++)
	{
		bookmarks[i].style.opacity=opacity;
	}
}
//code to set font color
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
//code to set bookmark background color
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
// code to add event listners 
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

function setSelectBoxListeners()
{
	var categorySelectors = document.querySelectorAll(`.categorieSelect`);
	console.log(categorySelectors);
	for(let i=0;i<categorySelectors.length;i++)
	{
		categorySelectors[i].addEventListener('change',function(){
			var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
			console.log(bookmarks);
			for(let j=0;j<bookmarks.length;j++)
			{
				if(categorySelectors[i].id == `select${bookmarks[j].name}`)
				{
					bookmarks[j].category = categorySelectors[i].value;
					document.getElementById("category"+categorySelectors[i].id).innerHTML=categorySelectors[i].value;
				}
			}
			localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
		})
	
	}
}
//code to set background color of page
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
	if(searchInput!=null)
	{
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
		url : burl ,
		category : "Default"
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

