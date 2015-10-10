
$(document).ready(function(){
	
	var url = 'https://restcountries.eu/rest/v1/all';
	$.getJSON(url, function(data) {
		drawTable(data);
	});
	
	function drawTable(data) {
		for (var i = 0; i < data.length; i++) {
			drawRow(data[i], i+1);
		}
	}
	
	function drawRow(rowData, id) {
		var row = $("<tr/>");
		$(".table").append(row);
		row.append($("<td>" + id + "</td>"));
		row.append($("<td>" + rowData.name + "</td>"));
		row.append($("<td>" + rowData.altSpellings[0] + "</td>"));
		row.append($("<td>" + rowData.capital + "</td>"));
		row.append($("<td>" + rowData.region + "</td>"));
		row.append($("<td>" + rowData.population + "</td>"));
	}
});




