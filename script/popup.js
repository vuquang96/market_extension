chrome.storage.sync.get(["conversionprice_csgoroll", "conversionprice_buff", "conversionprice_csgoempire"], function(items) {
    document.getElementById("conversionprice_csgoroll").value = items["conversionprice_csgoroll"] || "13.5";
    document.getElementById("conversionprice_buff").value = items["conversionprice_buff"] || "3.7";
    document.getElementById("conversionprice_csgoempire").value = items["conversionprice_csgoempire"] || "14.5";

});

$("#save").click(function(){
    let conversionprice_csgoroll = $("#conversionprice_csgoroll").val();
    let conversionprice_buff = $("#conversionprice_buff").val();
    let conversionprice_csgoempire = $("#conversionprice_csgoempire").val();
    
    
    chrome.storage.sync.set({
        "conversionprice_csgoroll": conversionprice_csgoroll,
        "conversionprice_buff": conversionprice_buff,
        "conversionprice_csgoempire": conversionprice_csgoempire
    }, function() {
        chrome.storage.sync.set({"export_market_compare": '1'});
        window.open("https://csgoempire.com/");
    });
});