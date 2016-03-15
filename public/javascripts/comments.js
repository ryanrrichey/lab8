$(document).ready(function(){
    $("#serialize").click(function(){
        var myobj = {Name:$("#Name").val(),Comment:$("#Comment").val()};
        jobj = JSON.stringify(myobj);
        $("#json").text(jobj);
    
		var url = "comment";
		$.ajax({
		  url:url,
		  type: "POST",
		  data: jobj,
		  contentType: "application/json; charset=utf-8",
		  success: function(data,textStatus) {
		      $("#done").html(textStatus);
		  }
		})
	
	
	
	});
	$("#getThem").click(function() 
	{
	      $.getJSON('comment', function(data) {
	        console.log(data);
	        var everything = "<ul>";
	        for(var comment in data) {
	          com = data[comment];
	          everything += "<li>Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
	        }
	        everything += "</ul>";
	        $("#comments").html(everything);
	      })
	});
	$("#analyze").click(function() 
	{
		var allComentsString = "";
		
        $.getJSON('comment', function(data) {
        
        for(var comment in data) {
          com = data[comment];
          allComentsString += com.Comment + " ";
        }
		
		// clean the string
		var cleanedWords = allComentsString.split(/[\s*\.*\,\;\+?\#\|:\-\/\\\[\]\(\)\{\}$%&0-9*]/);
		// split into array
		
		// create a map
		frequency = {};
		
		// iterate over array and insert into map
		for (i in cleanedWords) {
			if (frequency[cleanedWords[i]]) {
				frequency[cleanedWords[i]] += 1;
			} else {
				frequency[cleanedWords[i]] = 1;
			}
		}
		console.log(frequency);
		
		var resultString = "Word : Number of occurences</br>";
		for (word in frequency){
			resultString+=word + ":" + frequency[word] + "</br>";
		}
		
		$("#analysis").html(resultString);
      })
	});

});