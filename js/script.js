
$(document).ready(function(){
	
	var url = 'https://restcountries.eu/rest/v1/all';
    var $region = "undefined";
    var $countRowTotal = 0;
    var $rowsTotal = 0
    
    
    var jqxhr = $.getJSON(url, function(data) {
    
        drawTable(data);
        
	}).success(function(data) {
        
        var $rowsShown = 15;
            $rowsTotal = $('.table tbody tr').length;
        
        $(".dropdown-menu li").click(function(e) {
            
            var $region = $(this).text();
            var $node = $("#dropdownMenu1").contents().first()[0].nodeValue = $region + " ";
            
            
            
            if ($region) {
                var rowNotShow = $(".table").find("td:not(:contains(" + $region + "))").parent().slideUp();
                var rowShow = $(".table").find("td:contains(" + $region + ")").parent().slideDown();
                $rowsTotal = rowShow.length;
                if ($region == "All Region") {
                    $region = false;
                    console.log($rowsTotal);
                }
                console.log($region);
                pagination($rowsTotal, $region)
            }
            
            
            
        });
        
        
        pagination($rowsTotal);
	   console.log($rowsTotal);
        
    }).fail(function() {
        console.log("error");
    });
    
    jqxhr.complete(function() {
        console.log("third success");
    });
	
	function drawTable(data) {
        var $rowsTotal = data.length;
		for (var i = 0; i < $rowsTotal; i++) {
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
	
	function pagination($rowsTotal, $region) {
        console.log($rowsTotal);
        $('#nav').remove();
        $('.table').after('<div id="nav"><ul class="pagination"></ul></div>');
            var rowsShown = 15;
            var rowsTotal = $rowsTotal;

            var numPages = rowsTotal/rowsShown;
            for(i = 0; i < numPages; i++) {
                var pageNum = i + 1;
                $('#nav ul').append('<li><a href="#" rel="'+i+'">'+pageNum+'</a></li> ');
            }
        
            if ($region) {
                $(".table").find("td:not(:contains(" + $region + "))").parent().slideUp();
                $(".table").find("td:contains(" + $region + ")").parent().slice(0, rowsShown).slideDown();
            } else {
                $('.table tbody tr').hide();
                $('.table tbody tr').slice(0, rowsShown).show();
                $('#nav a:first').addClass('active');
            }
        
            $('#nav a').bind('click', function(){
                
                $('#nav a').removeClass('active');
                $(this).addClass('active');
                var currPage = $(this).attr('rel');
                var startItem = currPage * rowsShown;
                var endItem = startItem + rowsShown;
                var regionRows = $(".table").find("td:not(:contains(" + $region + "))");

                if ($region && $('.table tbody tr').css('display') == 'table-row') {
                    $(".table").find("td:contains(" + $region + ")").parent().slideUp().slice(startItem, endItem).slideDown();
                } else {
                    $('.table tbody tr').slideUp().slice(startItem, endItem).slideDown();
//                    $('.table tbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
//                        css('display','table-row').animate({opacity:1}, 300);
                }
        });
    }
});




