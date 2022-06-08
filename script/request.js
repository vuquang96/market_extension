function createUrlInventory() {
	return `https://csgoempire.com/api/v2/trading/user/inventory`;
}

function createUrlBuff(paged = 1, page_size = 80) {
	return `https://buff.163.com/api/market/goods/buying?game=csgo&page_num=${paged}&page_size=${page_size}&sort_by=price.desc`;
}

function createUrlCsgoempire(paged = 1, page_size = 500) {
	return `https://csgoempire.com/api/v2/trading/items?per_page=${page_size}&page=${paged}&price_max_above=15&sort=asc&order=market_value`;
}


function csgorollWithdraw(){
	var inventory = $.parseJSON(localStorage.getItem(list_inventory_store));
				
 	$.each(inventory, function(index, item){
 		console.log(index +'/'+ inventory.length);

 		searchCsgoroll(item.name);
 		$(".progress-csgoroll .progress__bar").css('width', percentage(index, inventory.length) + '%');
 	})
}

function searchCsgoroll(name){
	$.ajax({
		url: "https://api.csgoroll.com/graphql", 
		type : 'get',
		data : {
			'operationName' : 'TradeList',
			'variables' : `{"first":1,"orderBy":"TOTAL_VALUE","status":"LISTED","marketName":"${name}","steamAppName":"CSGO"}`,
			'extensions' : '{"persistedQuery":{"version":1,"sha256Hash":"fbb0ada835e37bdb9121cdce237f15d14f167850e8b2ccf919344844270d67d0"}}',
		},
		success: function(result){
			console.log(result);
			var data = [];
			if(result.data.trades.edges.length > 0) {
				var tmp = {
					'name' 				: result.data.trades.edges[0].node.tradeItems[0].marketName,
					'price' 			: result.data.trades.edges[0].node.tradeItems[0].value,
				};
				data.push(tmp);
			} else {
				var tmp = {
					'name' 				: name,
					'price' 			: 0,
				};
				data.push(tmp);
			}

			if(localStorage.getItem(csgoroll_store) == null){
				localStorage.setItem(csgoroll_store, JSON.stringify(data));

				var csgorollStore = data;
	     	} else {	
	     		var oldData = $.parseJSON(localStorage.getItem(csgoroll_store));
	     		var merData = [...oldData, ...data];
	     		localStorage.setItem(csgoroll_store, JSON.stringify(merData));

	     		var csgorollStore = merData;
	     	}

     		var inventoryStore = $.parseJSON(localStorage.getItem(list_inventory_store));
     		if(csgorollStore.length == inventoryStore.length) {
     			saveCsgoroll();
     		}
	  	},
	  	error: function(result){
		  	ajaxError();
	    },
	});
}

async function getDataInventory(url){
	const response = await fetch(url);
	var result = await response.json();
	var data = [];

	if(result.data.length > 0) {
		console.log(result)
		$.each(result.data, function(index, item){
			var tmp = {
				'name' 				: item.market_name,
				'price' 			: item.market_value,
			};
			data.push(tmp);
		});

		if(localStorage.getItem(inventory_store) == null){
			localStorage.setItem(inventory_store, JSON.stringify(data));
     	} else {	
     		var oldData = $.parseJSON(localStorage.getItem(inventory_store));
     		var merData = [...oldData, ...data];
     		localStorage.setItem(inventory_store, JSON.stringify(merData));
     	}
     	return 1;
	} else {
		return -1;
	}
}

async function getDataCsgoempire(url){
	const response = await fetch(url);
	var result = await response.json();
	var data = [];

	if(result.data.length > 0) {
		$.each(result.data, function(index, item){
			var tmp = {
				'name' 				: item.market_name,
				'price' 			: item.market_value,
			};
			data.push(tmp);
		});

		if(localStorage.getItem(csgoempire_store) == null){
			localStorage.setItem(csgoempire_store, JSON.stringify(data));
     	} else {	
     		var oldData = $.parseJSON(localStorage.getItem(csgoempire_store));
     		var merData = [...oldData, ...data];
     		localStorage.setItem(csgoempire_store, JSON.stringify(merData));
     	}
     	return result.last_page;
	} else {
		return -1;
	}
}


async function getDataBuff(url){
	const response = await fetch(url);
	var result = await response.json();
	var data = [];

	/*item.name,
	item.sell_min_price,
	item.buy_max_price*/
	if(result.code == "OK") {
		$.each(result.data.items, function(index, item){
			var tmp = {
				'name' 				: item.name,
				'price' 			: item.sell_min_price,
			};
			data.push(tmp);
		});

		if(localStorage.getItem(buff_store) == null){
			localStorage.setItem(buff_store, JSON.stringify(data));
     	} else {	
     		var oldData = $.parseJSON(localStorage.getItem(buff_store));
     		var merData = [...oldData, ...data];
     		localStorage.setItem(buff_store, JSON.stringify(merData));
     	}
     	return result.data.total_page;
	} else {
		return -1;
	}
}

async function getDataCsgorollInventory(){
	const response = await fetch("https://api.csgoroll.com/graphql", {
	  "headers": {
	    "accept": "application/json, text/plain, */*",
	    "accept-language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6",
	    "content-type": "application/json",
	    "ngsw-bypass": "true",
	    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\", \"Google Chrome\";v=\"102\"",
	    "sec-ch-ua-mobile": "?0",
	    "sec-ch-ua-platform": "\"Windows\"",
	    "sec-fetch-dest": "empty",
	    "sec-fetch-mode": "cors",
	    "sec-fetch-site": "same-site"
	  },
	  "referrer": "https://www.csgoroll.com/",
	  "referrerPolicy": "strict-origin-when-cross-origin",
	  "body": "{\"operationName\":\"InventoryItemVariants\",\"variables\":{\"steamAppName\":\"CSGO\",\"userId\":\"VXNlcjo2MDEyMTU3\"},\"query\":\"query InventoryItemVariants($steamAppName: SteamAppName!, $steamId: String, $userId: ID) {\\n  inventoryItemVariants(\\n    steamAppName: $steamAppName\\n    steamId: $steamId\\n    userId: $userId\\n  ) {\\n    steamItems {\\n      itemVariant {\\n        ...ItemVariant\\n        __typename\\n      }\\n      cacheExpiration\\n      tradable\\n      __typename\\n    }\\n    activeTradeItems {\\n      ...ItemVariant\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\\nfragment ItemVariant on ItemVariant {\\n  id\\n  itemId\\n  name\\n  brand\\n  iconUrl\\n  value\\n  currency\\n  displayValue\\n  exchangeRate\\n  shippingCost\\n  usable\\n  obtainable\\n  withdrawable\\n  depositable\\n  externalId\\n  type\\n  category {\\n    id\\n    name\\n    __typename\\n  }\\n  color\\n  size\\n  rarity\\n  availableAssets {\\n    steamAssetId\\n    availableAt\\n    __typename\\n  }\\n  purchasable\\n  totalRequested\\n  totalAvailable\\n  totalFulfilled\\n  totalUnfulfilled\\n  createdAt\\n  __typename\\n}\\n\"}",
	  "method": "POST",
	  "mode": "cors",
	  "credentials": "include"
	});
	var result = await response.json();
	
	if(response.status == 200) {
		var data = [];
		$.each(result.data.inventoryItemVariants.steamItems, function(index, item){
			var tmp = {
				'name' 				: item.itemVariant.externalId,
				'price' 			: item.itemVariant.displayValue,
			};
			data.push(tmp);
		});

		localStorage.setItem(csgoroll_default_store, JSON.stringify(data));

		return true;
	}

	return false;
}