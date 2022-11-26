$(document).ready(function(){
	const amenityId = {};
	const link = "http://0.0.0.0:5001/api/v1/places_search/";

	//checks if a checkox is marked and display the marked checkbox's value
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

	//checks the status of the api
	$.get("http://0.0.0.0:5001/api/v1/status/", function(data, textStatus){
		if (textStatus === "success"){
			$("div#api_status").addClass("available");
		}
		else{
			 $("div#api_status").removeClass("available");
		}
	});

	$.ajax({
		dataType: "json",
                contentType: 'application/json'
  		type: "POST",
  		url: link,
  		data: JSON.stringinfy({}),
  		success: function(places, stat){
			for (let place of places){
			const article = ['<article>',
          	'<div class="title_box">',
        	`<h2>${place.name}</h2>`,
        	`<div class="price_by_night">$${place.price_by_night}</div>`,
        	'</div>',
        	'<div class="information">',
        	`<div class="max_guest">${place.max_guest} Guest(s)</div>`,
        	`<div class="number_rooms">${place.number_rooms} Bedroom(s)</div>`,
        	`<div class="number_bathrooms">${place.number_bathrooms} Bathroom(s)</div>`,
        	'</div>',
		'<div class="user">',
            	'<b>Owner:</b>',
		`${place.user.first_name} ${place.user.last_name}</div>`,
        	'<div class="description">',
        	`${place.description}`,
        	'</div>',
        	'</article>'];
        $('section.places').append(article.join(''));
		}
});
});
