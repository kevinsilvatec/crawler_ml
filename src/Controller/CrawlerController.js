const request = require('request');
const cheerio = require('cheerio');

module.exports = {
    async search(req, res){

        let {search, limit} = req.body;

        const url = `https://lista.mercadolivre.com.br/${search}`;
        
        var bodyMl = await createBodyMl(url);
                
        console.log(bodyMl);
        // console.log(bodyMl);
        return bodyMl;
        
    }
}
function createBodyMl(url){
    console.log(url);
    request(url, function (err, res, body) {
        if(err)
        {
            console.log(err, "error occured while hitting URL");
        }
        else
        {
            return body;
        }
    });
}
