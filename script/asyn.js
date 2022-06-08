function saveInventory(){
	var data_store = localStorage.getItem(inventory_store);

	$.ajax({
		url: "http://localhost:9999/serve-app/public/api/v1/market/inventory", 
		type : 'post',
		data : {
			'data_store' 	: data_store
		},
		success: function(result){
		 	localStorage.removeItem(inventory_store);
	  	},
	  	error: function(result){
		  	ajaxError();
	    },
	});
}

function saveCsgoempire(){
	var data_store = localStorage.getItem(csgoempire_store);

	$.ajax({
		url: "http://localhost:9999/serve-app/public/api/v1/market/csgoempire", 
		type : 'post',
		data : {
			'data_store' 	: data_store
		},
		success: function(result){
			localStorage.removeItem(csgoempire_store);
		 	setTimeout(function(){
		 		var time = new Date().getTime();
		 		window.location.href = `https://buff.163.com?asyn=${time}`;
		 	}, 5000);
	  	},
	  	error: function(result){
		  	ajaxError();
	    },
	});
}

function saveBuff(){
	var data_store = localStorage.getItem(buff_store);
	$.ajax({
		url: "http://localhost:9999/serve-app/public/api/v1/market/buff", 
		type : 'post',
		data : {
			'data_store' 	: data_store
		},
		success: function(result){
		 	localStorage.removeItem(buff_store);
		 	setTimeout(function(){
		 		var time = new Date().getTime();
	 			window.location.href = `https://www.csgoroll.com/en/top-up/steam/csgo?asyn=${time}`;
		 	}, 5000);
	  	},
	  	error: function(result){
		  	ajaxError();
	    },
	});
}

function emptyTable(){
	var data_store = localStorage.getItem(buff_store);
	$.ajax({
		url: "http://localhost:9999/serve-app/public/api/v1/market/empty", 
		type : 'post',
		data : {},
		success: function(result){
		 	console.log(result);
	  	},
	  	error: function(result){
		  	ajaxError();
	    },
	});
}

function getInventory(){
	var data_store = localStorage.getItem(buff_store);
	$.ajax({
		url: "http://localhost:9999/serve-app/public/api/v1/market/list/inventory", 
		type : 'get',
		data : {},
		success: function(result){
		 	localStorage.setItem(list_inventory_store, JSON.stringify(result));
	  	},
	  	error: function(result){
		  	ajaxError();
	    },
	});
}

function saveCsgoroll(){
	var data_store = localStorage.getItem(csgoroll_store);
	$.ajax({
		url: "http://localhost:9999/serve-app/public/api/v1/market/csgoroll", 
		type : 'post',
		data : {
			'data_store' 	: data_store
		},
		success: function(result){
		 	localStorage.removeItem(csgoroll_store);
		 	localStorage.removeItem(csgoroll_check_store);
		 	localStorage.removeItem(list_inventory_store);
	  	},
	  	error: function(result){
		  	ajaxError();
	    },
	});
}

function saveCsgorollDefault(){
	var data_store = localStorage.getItem(csgoroll_default_store);
	console.log(data_store)
	$.ajax({
		url: "http://localhost:9999/serve-app/public/api/v1/market/csgoroll-default", 
		type : 'post',
		data : {
			'data_store' 	: data_store
		},
		success: function(result){
		 	localStorage.removeItem(csgoroll_default_store);
		 	setTimeout(function(){
    			csgorollWithdraw();
    		}, 1000);
	  	},
	  	error: function(result){
		  	ajaxError();
	    },
	});
}

function dataReady(){
	$.ajax({
		url: "http://localhost:9999/serve-app/public/api/v1/market/check-ready", 
		type : 'get',
		data : {},
		success: function(result){
		 	if(result == 1) {
				downloadData();
		 	}
	  	},
	  	error: function(result){
		  	ajaxError();
	    },
	});
}

function downloadData(){
	var data_store = $.parseJSON(localStorage.getItem(conversionprice_store));

	$.ajax({
		url: "http://localhost:9999/serve-app/public/api/v1/market/download-data", 
		type : 'get',
		data : {
			'csgoempire' : data_store.conversionprice_csgoempire,
			'buff' : data_store.conversionprice_buff,
			'csgoroll' : data_store.conversionprice_csgoroll,
		},
		success: function(result){
		 	var data = [];
		 	$.each(result, function(index, item){
		 		let buff = (item.buff == null) ? '' : item.buff; 
		 		let csgoempire = (item.csgoempire == null) ? '' : item.csgoempire; 
		 		let csgoroll = (item.csgoroll == null) ? '' : item.csgoroll; 
		 		let tick = (item.tick == null) ? '' : item.tick; 

		 		let tmp = [
					item.name,
					buff,
					csgoempire,
					csgoroll,
					tick
				];
				data.push(tmp);
		 	});
		 	var headers = [
				'Ten do',
				`Buff(*${data_store.conversionprice_buff})`,
				`Csgoempire(*${data_store.conversionprice_csgoempire})`,
				`Csgoroll(*${data_store.conversionprice_csgoroll})`,
				'Gia cao nhat'
			];
			data.unshift(headers);
		 	downloadBlob(arrayToCsv(data), getTime() + '_market.csv', 'text/csv;charset=utf-8;');

		 	setTimeout(function(){
    			window.close();
    		}, 5000);
	  	},
	  	error: function(result){
		  	ajaxError();
	    },
	});
}