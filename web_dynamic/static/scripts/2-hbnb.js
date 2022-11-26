$(document).ready(function(){
	values = [];
	$("input[type=checkbox]").change(function(){
		if (this.checked)
		{
			values.append(this.attr("data-id"));
		}
		else
		{
			let index = values.indexOf(this.attr("data-id"));
			if (index !== -1) {
			values.splice(index, 1);
			}
		}
		
	});
	
	for (let val of values){
		$(".amenities > h4").append("<li>"+val+"</li>");
	}
	
	$.get("http://0.0.0.0:5001/api/v1/status/", function(data, textStatus){
		if (textStatus === "success"){
			$("div#api_status").addClass("available");
		}
		else{
			 $("div#api_status").removeClass("available");
		}
	});
});
