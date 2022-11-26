$(document).ready(function(){
	const amenityId = {};;
	$("input[type=checkbox]").change(function(){
		if (this.checked)
		{
			amenityId[$(this).attr('data-id')] = $(this).attr('data-name');
		}
		else
		{
			delete amenityId[$(this).attr('data-id')];
		}
		if (Object.keys(amenityId).length === 0) {
			$('div.amenities h4').html('&nbsp');
		} else {
			$('div.amenities h4').text(Object.values(amenityId).join(', '));
		}
	});

	$.get("http://0.0.0.0:5001/api/v1/status/", function(data, textStatus){
		if (textStatus === "success"){
			$("div#api_status").addClass("available");
		}
		else{
			 $("div#api_status").removeClass("available");
		}
	});
});
