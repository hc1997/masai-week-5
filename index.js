var slideIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {slideIndex = 1}
  x[slideIndex-1].style.display = "block";
  setTimeout(carousel, 2000); // Change image every 2 seconds
}


var result=null;
function search_movie_details(get_func)
{
	var xhr= new XMLHttpRequest();
	var url="https://raw.githubusercontent.com/masai-school/assignments-data/master/data/dummy/json/movies_collections.json";
	xhr.open("GET",url);
	xhr.send()
		
	if(get_func=="search")
	{
		xhr.onload = function()
		{
			if(xhr.status==200)
			{
				result=xhr.response;
				print_data(result);
			}
			else
			{
				console.log("Error Code is: " +xhr.status);	
			}	
		}
	}
	if (get_func=="sort") 
	{
		xhr.onload = function()
		{
			if(xhr.status==200)
			{
				result=xhr.response;
				sort_data(result);
				 console.log(result)
			}
			else
			{
				console.log("Error Code is: " +xhr.status);	
			}
		}
	}
}

var print_data=function(input)
{
	var display=document.createElement("p")

	if(input==null)
	{
		display.textContent="Error! No Movie data Present";
	}
	else
	{
        var json=JSON.parse(input)
        console.log(json);
		var genre=[ ];
		var type=document.getElementById("genre").value;
		for (var i=0;i < json.length; i++) 
		{
			if(type== json[i].genre)
			{
                genre.push(json[i])	
                console.log(genre);                         
			}		
		}
		card(genre)
	}
}

var sort_data=function(input)
{
	if(input == null)
	{
		alert("No data")
	}
	else
	{
		var json=JSON.parse(input)
		var name=document.getElementById("sort_data").value;
		if(name == "low_to_high_year" || name=="low_to_high_box_office")
		{
			sort_low_to_high(json,name)
		}
		if(name == "high_to_low_year" || name=="high_to_low_box_office")
		{
			sort_high_to_low(json,name)
		}
		card(json)
	}
	document.getElementById("sort_data").value=""
}

function card(array)
{
	for (var i = 0; i < array.length; i++) 
	{
		if(i==0)
		{
			var div1=document.querySelector(".grid_box");
			div1.innerHTML=""
			var div2=document.createElement("div")
			div1.appendChild(div2)
			var div3=document.createElement("div")
			div2.appendChild(div3)
			div3.setAttribute("class","details")
			var first_title=document.createElement("h3")
			var second_genre=document.createElement("p")
			var third_year=document.createElement("p")
			var fourth_box_office=document.createElement("p")
			div3.appendChild(first_title)
			div3.appendChild(second_genre)
			div3.appendChild(third_year)
			div3.appendChild(fourth_box_office)
			first_title.textContent="TITLE :" +array[i].title;
			second_genre.textContent="GENRE :"+array[i].genre;
			third_year.textContent="YEAR:"+array[i].year;
			fourth_box_office.textContent="BOX OFFICE :"+array[i].box_office;
		}
		else
		{
			var div2=document.createElement("div")
			div1.appendChild(div2)
			var div3=document.createElement("div")
			div2.appendChild(div3)
			div3.setAttribute("class","details")
			first_title=document.createElement("h3")
			second_genre=document.createElement("p")
			third_year=document.createElement("p")
			fourth_box_office=document.createElement("p")
			div3.appendChild(first_title)
			div3.appendChild(second_genre)
			div3.appendChild(third_year)
			div3.appendChild(fourth_box_office)
			first_title.textContent="TITLE :" +array[i].title;
			second_genre.textContent="GENRE :"+array[i].genre;
			third_year.textContent="YEAR:"+array[i].year;
			fourth_box_office.textContent="BOX OFFICE :"+array[i].box_office;
		}
	}
}

var display_btn=document.querySelector("#search")
display_btn.addEventListener("click",function()
{
	var search=document.getElementById("genre").value
	var fun_name="search"
		search_movie_details(fun_name);
});

var display_btn1=document.querySelector("#search_one")
display_btn1.addEventListener("click",function()
{
	var sort_value=document.getElementById('sort_data').value;
	console.log(sort_value)
	var fun_name="sort"
	if(sort_value=="low_to_high_year" || sort_value == "low_to_high_box_office" || sort_value == "high_to_low_year" || sort_value=="high_to_low_box_office")
	{
		search_movie_details(fun_name);
	}
	else
	{
		document.querySelector(".grid_box").innerHTML=""
	}
});

function sort_low_to_high(array,name)
{
	for(var i=0;i<array.length-1;i++)
  	{
    	for( var j=0;j<array.length-1;j++)
    	{
    		var temp=[];
			var temp_one=[];
    		if (name == "low_to_high_year") 
    		{
    			if(array[j].year > array[j+1].year)
        		{
          			temp[0]=array[j];
          			array[j]=array[j+1];
          			array[j+1]=temp[0];
        		}
    		}
    		if (name =="low_to_high_box_office") 
    		{
   				if (array[j].box_office > array[j+1].box_office) 
   				{
    				temp_one[0]=array[j]
    				array[j]=array[j+1];
          			array[j+1]=temp_one[0];
    			}
    		}
   		}
   	}
   	return array
}

function sort_high_to_low(array,name)
{
	for(var i=0;i<array.length-1;i++)
  	{
    	for( var j=0;j<array.length-1;j++)
    	{
    		var temp=[];
			var temp_one=[];
    		if (name == "high_to_low_year") 
    		{
    			if(array[j].year < array[j+1].year)
        		{
          			temp[0]=array[j];
          			array[j]=array[j+1];
          			array[j+1]=temp[0];
        		}
    		}
    		if (name =="high_to_low_box_office") 
    		{
   				if (array[j].box_office < array[j+1].box_office) 
   				{
    				temp_one[0]=array[j]
    				array[j]=array[j+1];
          			array[j+1]=temp_one[0];
    			}
    		}
   		}
   	}
   	return array
}