const request = require('request');
const cheerioHelper = require('../Helpers/cheerio-helper');
const fileHelper = require('../Helpers/file-helper');

module.exports = {
    search(req, res){

        let {search, limit} = req.body;

        if(!search || search == "" || search == null){
            res.json({
                code: "500",
                message: "O campo search é obrigatório!"
            });        
        }

        if(!limit || limit == "" || limit == null){
            res.json({
                code: "500",
                message: "O campo limit é obrigatório!"
            });        
        }

        if(!Number.isInteger(limit)){
            res.json({
                code: "500",
                message: "O campo limit deve ser um número!"
            });
        }

        if(limit > 50){
            res.json({
                code: "500",
                message: "O campo limit tem tamanho máximo de 50!"
            });
        }



        var url = `https://lista.mercadolivre.com.br/${search}#D[A:${search}]`;

        callbackPrimaryBody = (body, adId) => {
            let arrAdsInitial = cheerioHelper.createAdsInitialArray(body, limit);
            arrAdsInitial.forEach(e => {
                requestBody(e.link, callbackAdsBody, e.id);
            });    

            let urlPrincipal = './json/tempPrincipal.json.txt';
            let urlStores = './json/tempStores.json.txt';
            let fileErrMessage = "Ocorreu um erro ao criar o arquivo temporário!!";            
            
            fileHelper.createFile(urlPrincipal, JSON.stringify(arrAdsInitial, null, 4), errCallback, fileErrMessage);
            fileHelper.createFile(urlStores, '', errCallback, fileErrMessage);
        }

        callbackAdsBody = (body, adId) => {
            var arrUrlDataStore = cheerioHelper.createArrayUrlDataStore(body);   
            
            arrUrlDataStore.forEach(e => {
                requestBody(e.linkStore, callbackStoresBody, adId, limit);                
            });
        }

        callbackStoresBody = (body, adId) => {
            var arrLocationStore = cheerioHelper.createArrayLocationStore(body, adId);   
            let url = './json/tempStores.json.txt';
            let fileErrMessage = "Ocorreu um erro ao adicionar dados ao arquivo temporário!";
            fileHelper.appendFile(url, JSON.stringify(arrLocationStore, null, 4), errCallback, fileErrMessage);
            
        }       
        
        errCallback = (message, err) => {
            res.json({
                message: message,
                erro: err
            });
        }

        finalCallback = () => {
            let firstFileUrl = './json/tempPrincipal.json.txt';
            let secondFileUrl = './json/tempStores.json.txt';
            let finalObject = fileHelper.mergeFiles(firstFileUrl, secondFileUrl);
            res.json(finalObject);
        }

        requestBody(url, callbackPrimaryBody, null);
    }
}

function requestBody(url = null, _callback, adId = null, limit = null){
    request(url, function (err, res, body) {
        
        if(err){
            let errMessage = 'Ocorreu um erro ao tentar capturar a página';
            errCallback(errMessage, err);
        }
        else{            
            _callback(body, adId);

        }

        let url = './json/tempStores.json.txt';
        if(limit){
            let amountItems = fileHelper.countItemsFile(url, limit);
            if(amountItems == limit){
                finalCallback();
            }        
        }
        
    });
}
