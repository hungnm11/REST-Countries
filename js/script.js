
$(document).ready(function(){
	
	var url = 'https://restcountries.eu/rest/v1/all';
    var jqxhr = $.getJSON(url, function(data) {
    var $region = "undefined";
        
        drawTable(data);
        
	}).success(function(data) {
        
        $(".dropdown-menu li").click(function() {
            var $region = $(this).text();
            var $node = document.querySelector("#dropdownMenu1").firstChild;
            console.log($region);
            if ($region) {
                $(".table").find("td:not(:contains(" + $region + "))").parent().slideUp();
                $(".table").find("td:contains(" + $region + ")").parent().slideDown();
            }
        });
        
        $('.table').after('<div id="nav"><ul class="pagination"></ul></div>');
            var rowsShown = 25;
            var rowsTotal = $('.table tbody tr').length;
            console.log(rowsTotal);
            var numPages = rowsTotal/rowsShown;
            for(i = 0;i < numPages;i++) {
                var pageNum = i + 1;
                $('#nav ul').append('<li><a href="#" rel="'+i+'">'+pageNum+'</a></li> ');
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
        
	
    }).fail(function() {
        console.log("error");
    });
    
    jqxhr.complete(function() {
        console.log("third success");
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




