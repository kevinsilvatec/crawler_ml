const cheerio = require('cheerio');
const generalHelper = require('./general-helper');

module.exports = {

    createArrayLocationStore(body, adId){
        let $ = cheerio.load(body);
        arrLocationStore = [];
        let nameStore = $('#store-info__name').text();  
        let locationStore =   $('.location-subtitle').text();
        let stateStore;
        
        if(!locationStore){
            stateStore = null;
        }else{
            stateStore = generalHelper.unlinkState(locationStore);
        }
    
        if(!nameStore){
            nameStore = $(".breadcrumb__title").text();
        }
    
        const obj = { 
            adId: adId,
            store : nameStore,
            state: stateStore        
        }; 
    
        arrLocationStore.push(obj);
        return arrLocationStore;
    
    },

    createArrayUrlDataStore(body, adId){
        let $ = cheerio.load(body);
        let arrStore = [];
    
        let urlDataStore = $('#seller-view-more-link').attr("href");
        let amountElements = $('.ui-pdp-seller__header__subtitle').length;
        
        if(!urlDataStore){
            $('.ui-pdp-seller__header__subtitle').each(function(){
                
                if(amountElements > 1){
                    let store = $(this).parent().find('.ui-pdp-action-modal__link').text().toLowerCase();
                    store = generalHelper.removeSpaces(store);
                    urlDataStore = `https://loja.mercadolivre.com.br/${store}`;
                }else{
                    let store = $(this).parent().find('.ui-pdp-seller__link-trigger').text().toUpperCase();
                    urlDataStore = `https://perfil.mercadolivre.com.br/${store}`;
                }
                
            });
        }
    
        const obj = { 
            adId: adId,
            linkStore : urlDataStore        
        }; 
        
        arrStore.push(obj);
        return arrStore;
    },

    createAdsInitialArray(body, limit){
        const arrAdsInitial = []; 
        
        let $ = cheerio.load(body); 
        //VERIFICAÇÃO DE LIMIT DEVERÁ SER FEITA AQUI PARA INTEGRAR A PAGINAÇÃO
        //USAR O THIS.LENGTH
    
        $('#searchResults li.article').each(function(index){
            let adId = $(this).find('div.rowItem').attr('id');
            let nameAd = $(this).find('.list-view-item-title').text();
            let linkAd =  $(this).find('.item__info-link').attr('href');
            if(!linkAd){
                linkAd = $(this).find('.item__info-title').attr('href');
            }
            let decimal = $(this).find('div.item__price > span.price__decimals').text();
            let priceAd = $(this).find('div.item__price > span.price__fraction').text();
            
            
            priceAd = priceAd.replace('.', '') + (decimal != '' ? '.' + decimal : '.00');
            
            const obj = { 
                id: adId,
                name : nameAd, 
                link : linkAd,
                price: priceAd
            }; 
    
            arrAdsInitial.push(obj);
            
            if(index == limit -1){
                return false;
            }
    
        });
    
        return arrAdsInitial;
    
    }

}