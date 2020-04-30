const request = require('request');
const cheerio = require('cheerio');

module.exports = {
    search(req, res){

        let {search, limit} = req.body;

        var url = `https://lista.mercadolivre.com.br/${search}#D[A:${search}]`;
        
        callbackPrimaryBody = (url, body) => {
            let adsInitialArray = createAdsInitialArray(body, limit);        
            
            adsInitialArray.forEach(e => {
                requestBody(e.link, callbackAdsBody);
            });

        }

        callbackAdsBody = (url, body) => {
            var arrayUrlDataStore = createArrayUrlDataStore(url, body);            
            arrayUrlDataStore.forEach(e => {
                requestBody(e.linkStore, callbackStoresBody);
            });
        }

        callbackStoresBody = (url, body) => {
            var arrayLocationStore = createArrayLocationStore(url, body);
            console.log(arrayLocationStore);
        }       
        
        requestBody(url, callbackPrimaryBody);
        
    }
}

function createArrayLocationStore(url, body){
    let $ = cheerio.load(body);
    arrLocationStore = [];
    let nameStore = $('#store-info__name').text();  
    let locationStore =   $('.location-subtitle').text();
    let stateStore;
    
    if(!locationStore){
        stateStore = null;
    }else{
        stateStore = unlinkState(locationStore);
    }

    if(!nameStore){
        nameStore = $(".breadcrumb__title").text();
    }

    const obj = { 
        nameStore : nameStore,
        stateStore: stateStore        
    }; 

    arrLocationStore.push(obj);
    return arrLocationStore;

}

function createArrayUrlDataStore(url, body){
    let $ = cheerio.load(body);
    let arrStore = [];

    //Caso vendedor
    let urlDataStore = $('#seller-view-more-link').attr("href");
    let amountElements = $('.ui-pdp-seller__header__subtitle').length;
    
    //caso loja
    if(!urlDataStore){
        $('.ui-pdp-seller__header__subtitle').each(function(){
            
            if(amountElements > 1){
                //caso loja oficial
                let store = $(this).parent().find('.ui-pdp-action-modal__link').text().toLowerCase();
                store = removeSpaces(store);
                urlDataStore = `https://loja.mercadolivre.com.br/${store}`;
            }else{
                //caso loja apenas
                let store = $(this).parent().find('.ui-pdp-seller__link-trigger').text().toUpperCase();
                urlDataStore = `https://perfil.mercadolivre.com.br/${store}`;
            }
            
        });
    }

    const obj = { 
        linkStore : urlDataStore        
    }; 
    
    arrStore.push(obj);
    return arrStore;
}

function unlinkState(location){
    location = location.split(',');
    
    location = location[1].split('.');

    return location[0];
}

function removeSpaces(string){
    string = string.replace(" ", "-");
    return string;
}

function createAdsInitialArray(body, limit){
    const arrAds = []; 
    
    let $ = cheerio.load(body); 
    //VERIFICAÇÃO DE LIMIT DEVERÁ SER FEITA AQUI PARA INTEGRAR A PAGINAÇÃO
    //USAR O THIS.LENGTH

    $('#searchResults li.article').each(function(index){
        let nameAd = $(this).find('.list-view-item-title').text();
        let linkAd =  $(this).find('.item__info-link').attr('href');
        if(!linkAd){
            linkAd = $(this).find('.item__info-title').attr('href');
        }
        let decimal = $(this).find('div.item__price > span.price__decimals').text();
        let priceAd = $(this).find('div.item__price > span.price__fraction').text();
        
        
        priceAd = priceAd.replace('.', '') + (decimal != '' ? '.' + decimal : '.00');
        
        const obj = { 
            name : nameAd, 
            link : linkAd,
            price: priceAd
        }; 

        arrAds.push(obj);
        
        if(index == limit -1){
            return false;
        }

    });

    return arrAds;

}

function requestBody(url, callback){
    request(url, function (err, res, body) {
        
        if(err){
            console.log(err, "error occured while hitting URL");
        }
        else{
            if(callback){
                callback(url, body);
            }
        }
    });
}
