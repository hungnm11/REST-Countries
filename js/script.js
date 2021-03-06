
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
			e.preventDefault();
			var $this = $(this);
			var btnPrev = $this.parent().is(':first-child');
			var btnNext = $this.parent().is(':last-child');
			var itemActive = $('#nav li.active');
			var childItemNext = itemActive.next('li').children('a').attr('rel');
			var childItemPrev = itemActive.prev('li').children('a').attr('rel');

			if (!btnNext && !btnPrev) {
				goToPage($this, rowsShown, $region);
			}
			
			if (btnNext && childItemNext < numPages) {
				$('#nav li').removeClass('active');
				itemActive.next('li').addClass('active');
				goToPage(childItemNext, rowsShown, $region);
			}
			
			if (btnPrev && childItemPrev >= 0) {
				$('#nav li').removeClass('active');
				itemActive.prev('li').addClass('active');
				goToPage(childItemPrev, rowsShown, $region);
			}
        });
    }
	
	function goToPage($this, rowsShown, $region) {
		var currPage;
		var startItem;
		var endItem;
		
		if (typeof($this) === 'object') {
			currPage = $this.attr('rel');
			$('#nav a').parent().removeClass('active');
			$this.parent().addClass('active');
		} else {
			currPage = $this;
		}
		 
		startItem = currPage * rowsShown;
		endItem = startItem + rowsShown;

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




