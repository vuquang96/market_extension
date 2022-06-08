jQuery(document).ready(function(){
	
	async function run(){
		console.log(
	        "%cTạo Dữ Liệu! " + location.hostname,
	        "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
	  	);

	  	if(location.hostname == 'csgoempire.com') {
			var inventoryPages = await getDataInventory(createUrlInventory());
			saveInventory();

	     	var empirePages = 1;
	     	for (var i = 1; i <= empirePages; i++) {
	     		console.log( i +'/'+ empirePages );

	     		empirePages = await getDataCsgoempire(createUrlCsgoempire(i));
	     		$(".progress-empire .progress__bar").css('width', percentage(i, empirePages) + '%');

	     		await sleep(getRandomInt(2) * 1000);
	     	}

	     	saveCsgoempire();
	    }

		if(location.hostname == 'buff.163.com') {
			$(".progress-empire .progress__bar").css('width', '100%');

	     	var buffPages = 1;
	     	for (var i = 1; i <= buffPages; i++) {
	     		console.log(i +'/'+ buffPages);

	     		buffPages = await getDataBuff(createUrlBuff(i));
	     		$(".progress-buff .progress__bar").css('width', percentage(i, buffPages) + '%');

	     		await sleep(getRandomInt(2) * 1000);
	     	}
	     	saveBuff();
	    }

		if(location.hostname == 'www.csgoroll.com') {
			$(".progress-empire .progress__bar").css('width', '100%');
			$(".progress-buff .progress__bar").css('width', '100%');

			$("input#mat-slide-toggle-2-input").prop(":checked", true).trigger('click').trigger('change');

			setTimeout(function(){
				getInventory();
			}, 10000);
			

			setInterval(function () {
				dataReady();

				showNotify('Đang tạo file');
			}, 20000);

			setTimeout(function(){
				window.close();
			}, 3 * 60 * 1000);
	    }
	}


	setTimeout(function(){
		if(window.location.hostname == 'csgoempire.com') {
			localStorage.removeItem(inventory_store);
			localStorage.removeItem(csgoempire_store);

			chrome.storage.sync.get(["export_market_compare"], function (obj) {
			    if(obj.export_market_compare !== undefined && obj.export_market_compare == 1){
			    	chrome.storage.sync.set({"export_market_compare": '0'});
			    	emptyTable();

			    	setTimeout(function(){
		 				createLoading();
			    		run();
			    	}, 2000);
			    }
			});
			
		}

		if(window.location.hostname == 'buff.163.com') {
			localStorage.removeItem(buff_store);
    		var asyn 			= getParam('asyn');
    		if(asyn) {
				var time = new Date().getTime();
				time -= asyn;
				if(time < 60 * 1000) {
					changeurl(`?asyn=0`, 'buff.163.com');
					createLoading();
					run();
				}
    		}
    	}

    	if(window.location.hostname == 'www.csgoroll.com') {
    		localStorage.removeItem(list_inventory_store);
    		localStorage.removeItem(conversionprice_store);
    		localStorage.removeItem(csgoroll_store);

    		var asyn 			= getParam('asyn');
    		if(asyn) {
				var time = new Date().getTime();
				time -= asyn;
				if(time < 60 * 1000) {
					changeurl(`?asyn=0`, 'www.csgoroll.com');
					chrome.storage.sync.get(["conversionprice_csgoroll", "conversionprice_buff", "conversionprice_csgoempire"], function (obj) {
					    var data = {
					    	'conversionprice_csgoroll' : obj.conversionprice_csgoroll,
					    	'conversionprice_buff' : obj.conversionprice_buff,
					    	'conversionprice_csgoempire' : obj.conversionprice_csgoempire
					    };
					    localStorage.setItem(conversionprice_store, JSON.stringify(data));
					});
					createLoading();
					run();
				}
    		}
    	}
	}, 5000);


	function loading(){
		if(window.location.hostname == 'csgoempire.com') {
			chrome.storage.sync.get(["export_market_compare"], function (obj) {
			    if(obj.export_market_compare !== undefined && obj.export_market_compare == 1){
			    	createLoading();
			    }
			});
		}

		if(window.location.hostname == 'buff.163.com') {
    		var asyn 			= getParam('asyn');
    		if(asyn) {
				var time = new Date().getTime();
				time -= asyn;
				if(time < 60 * 1000) {
					createLoading();
				}
    		}
    	}

    	if(window.location.hostname == 'www.csgoroll.com') {
    		var asyn 			= getParam('asyn');
    		if(asyn) {
				var time = new Date().getTime();
				time -= asyn;
				if(time < 60 * 1000) {
					createLoading();
				}
    		}
    	}
	}
	loading();

	setTimeout(function(){

		/*chrome.storage.sync.get(["conversionprice_csgoroll", "conversionprice_buff", "conversionprice_csgoempire"], function (obj) {
		    var data = {
		    	'conversionprice_csgoroll' : obj.conversionprice_csgoroll,
		    	'conversionprice_buff' : obj.conversionprice_buff,
		    	'conversionprice_csgoempire' : obj.conversionprice_csgoempire
		    };
		    localStorage.setItem(conversionprice_store, JSON.stringify(data));
		});
		run();*/

		/*getInventory();
		setTimeout(function(){
			csgorollDefault();
		}, 2000);*/
		//getInventory();

	}, 5000);

});

