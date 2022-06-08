var list_inventory_store 	= 'market_list_inventory';
var inventory_store 		= 'market_inventory';
var csgoempire_store 		= 'market_csgoempire_store';
var buff_store 				= 'market_buff_store';
var csgoroll_store 			= 'market_csgoroll_store';
var csgoroll_default_store 	= 'market_csgoroll_default_store';
var conversionprice_store 	= 'market_conversionprice_store';
var user_id_store 			= 'market_user_id';
var csgoroll_check_store 	= 'market_csgoroll_check';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(max) {
  return Math.ceil(Math.random() * max);
}

function ajaxError(){
	showNotify('Có lỗi xảy ra, vui lòng thử lại', 'error');
  	setTimeout(function(){
		window.close();
	}, 5000);
}

function getTime(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();
	var hour = today.getHours();
	var minute = today.getMinutes();
	if( dd<10 ) {
	    dd='0'+dd;
	} 
	if( mm<10 ) {
	    mm='0'+mm;
	} 
	today = `${yyyy}${mm}${dd}${hour}${minute}`;
	return today;
}

function getParam(key){
	var url_string = window.location;
	var url = new URL(url_string);
	return url.searchParams.get(key);
}

function changeurl(url, title) {
    var new_url = '/' + url;
    window.history.pushState('data', title, new_url);
}

function sortArray(array, property, direction) {
    direction = direction || 1;
    array.sort(function compare(a, b) {
        let comparison = 0;
        if(property == 1 || property == 2 || property == 3) {
        	if (parseFloat(a[property]) > parseFloat(b[property])) {
	            comparison = 1 * direction;
	        } else if (parseFloat(a[property]) < parseFloat(b[property])) {
	            comparison = -1 * direction;
	        }
        } else {
        	if (a[property] > b[property]) {
	            comparison = 1 * direction;
	        } else if (a[property] < b[property]) {
	            comparison = -1 * direction;
	        }
        }
        
        return comparison;
    });
    return array; 
}

function downloadBlob(content, filename, contentType) {
  	// Create a blob
  	var blob = new Blob([content], { type: contentType });
  	var url = URL.createObjectURL(blob);

  	// Create a link to download it
  	var pom = document.createElement('a');
  	pom.href = url;
  	pom.setAttribute('download', filename);
  	pom.click();
}

function arrayToCsv(data){
  	return data.map(row =>
    	row
    	.map(String)  // convert every value to String
    	.map(v => v.replaceAll('"', '""'))  // escape double colons
    	.map(v => `"${v}"`)  // quote it
    	.join(',')  // comma-separated
  	).join('\r\n');  // rows starting on new lines
}

function percentage(partialValue, totalValue) {
   	return Math.ceil((100 * partialValue) / totalValue);
} 

function createLoading(){
	$('.loader').remove();
	$('body').addClass('container-extension');
	$("body").append(`<div class="loader">
					  	<div class="loader-inner">
					    	<div class="loader-line-wrap">
					      	<div class="loader-line"></div>
					    </div>
					    <div class="loader-line-wrap">
					      	<div class="loader-line"></div>
					    </div>
					    <div class="loader-line-wrap">
					      	<div class="loader-line"></div>
					    </div>
					    <div class="loader-line-wrap">
					      	<div class="loader-line"></div>
					    </div>
					    <div class="loader-line-wrap">
					      	<div class="loader-line"></div>
					    </div>
					  	</div>
					  	<div class="progress-empire"> 
						  	<div class="progress__bar"></div>
						</div>
						<div class="progress-buff"> 
						  	<div class="progress__bar"></div>
						</div>
						<div class="progress-csgoroll"> 
						  	<div class="progress__bar"></div>
						</div>
					</div>
				`);
}

function arrayToCsv(data){
  	return data.map(row =>
    	row
    	.map(String)  // convert every value to String
    	.map(v => v.replaceAll('"', '""'))  // escape double colons
    	.map(v => `"${v}"`)  // quote it
    	.join(',')  // comma-separated
  	).join('\r\n');  // rows starting on new lines
}

function showNotify(mess, type = 'success', time = 10000){
    $.notify(mess, type, {
        autoHideDelay: time
    });
}