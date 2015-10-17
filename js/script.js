
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
            
			if ($region == 'All Region') {
				$('.table tbody tr').show();
				$('.table tbody tr').animate({opacity:1}, 300);
				var $rowsTotal = $('.table tbody tr').length;
				 pagination($rowsTotal);
			} else {
                $(".table").find("td:not(:contains(" + $region + "))").parent().hide();
				$(".table").find("td:not(:contains(" + $region + "))").parent().animate({opacity:1}, 300);
                var rowShow = $(".table").find("td:contains(" + $region + ")").parent().show();
                $rowsTotal = rowShow.length;
                pagination($rowsTotal, $region)
            } 
            
        });
        
        
        pagination($rowsTotal);
        
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

		$('#nav').remove();
        $('.table').after('<div id="nav"><ul class="pagination"></ul></div>');
		var rowsShown = 15;
		var rowsTotal = $rowsTotal;

		var numPages = rowsTotal/rowsShown;
		for(i = 0; i < numPages; i++) {
			var pageNum = i + 1;
			$('#nav ul').append('<li><a href="#" rel="'+i+'">'+pageNum+'</a></li> ');
		}
        
        // Previous Button
		$('#nav ul').prepend('<li><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>');
        
        // Next Button
        $('#nav ul').append('<li><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>');
		
		if ($region) {
			$(".table").find("td:not(:contains(" + $region + "))").parent().hide();
			$(".table").find("td:contains(" + $region + ")").parent().slice(0, rowsShown).show();
			$('#nav li:eq(1)').addClass('active');
		} else {
			$('.table tbody tr').hide();
			$('.table tbody tr').slice(0, rowsShown).show();
			$('#nav li:eq(1)').addClass('active');
		}

		
		$('#nav a').bind('click', function(e){
			var that = $(this);
			var btnPrev = that.parent().is(':first-child');
			var btnNext = that.parent().is(':last-child');
			var itemActive = $('#nav li.active');
			
			if (!btnNext && !btnPrev) {
				goToPage(that, rowsShown, $region);
			}
			
			if (btnNext) {
				$('#nav li').removeClass('active');
				itemActive.next('li').addClass('active');
			}
			
			if (btnPrev) {
				$('#nav li').removeClass('active');
				itemActive.prev('li').addClass('active');
			}
			
			console.log(btnPrev);
			console.log(btnNext);
        });
    }
	
	function goToPage(that,rowsShown,$region) {
		var currPage = that.attr('rel');
		var startItem = currPage * rowsShown;
		var endItem = startItem + rowsShown;

		$('#nav a').parent().removeClass('active');
		that.parent().addClass('active');


		if ($region) {
			$(".table").find("td:not(:contains(" + $region + "))").parent().hide();
			$(".table").find("td:contains(" + $region + ")").parent().css('opacity','0.0').hide().slice(startItem, endItem).css('display','table-row').animate({opacity:1}, 300);
		} else {
			$('.table tbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
				css('display','table-row').animate({opacity:1}, 300);
		}
		
	}
	
	function nextPage() {
		console.log('next');
	}
	
	function prevPage() {
		console.log('prev');
	}
});




