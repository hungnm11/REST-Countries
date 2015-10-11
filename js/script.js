
$(document).ready(function(){
	
	var url = 'https://restcountries.eu/rest/v1/all';
	var test = false;
	
	$.getJSON(url, function(data) {
		if (data != null) {
			drawTable(data);
		} else {
			console.log("hello");
		}
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
	
	$(".dropdown-menu li").click(function() {
		var $region = $(this).text();
		if ($region) {
			$(".table").find("td:not(:contains(" + $region + "))").parent().slideUp();
			$(".table").find("td:contains(" + $region + ")").parent().slideDown();
		}
	});
	
	
	$('.table').after('<div id="nav"></div>');
		var rowsShown = 4;
		var rowsTotal = $('.table tbody tr').length;
		console.log(rowsTotal);
		var numPages = rowsTotal/rowsShown;
		for(i = 0;i < numPages;i++) {
			var pageNum = i + 1;
			$('#nav').append('<a href="#" rel="'+i+'">'+pageNum+'</a> ');
		}
		$('.table tbody tr').hide();
		$('.table tbody tr').slice(0, rowsShown).show();
		$('#nav a:first').addClass('active');
		$('#nav a').bind('click', function(){

			$('#nav a').removeClass('active');
			$(this).addClass('active');
			var currPage = $(this).attr('rel');
			var startItem = currPage * rowsShown;
			var endItem = startItem + rowsShown;
			$('.table tbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
					css('display','table-row').animate({opacity:1}, 300);
	});
	
	
});




