$(document).ready(function(){
	$.ajax({
		url: 'https://restcountries.eu/rest/v1/all',
		type: "GET",
		dataType: "json",
		success: function(data) {
			console.log(data);
		}
	});
});