const fs = require ('fs');
const generalHelper = require('./general-helper');

module.exports = {

    async createFile(url, json, _callback, errMessage){
        await fs.writeFileSync(url, json, function(err){
            if(err){
                _callback(errMessage, err);
            }        
        });
    },

    async appendFile(url, json, _callback, errMessage){
        await fs.appendFileSync(url, json + ",", function (err) {
            if(err){
                _callback(errMessage, err);
            }        
        });
    },

    mergeFiles(firstFileUrl, secondFileUrl){
        jsonFirstFile = fs.readFileSync(firstFileUrl, "utf8");
        jsonSecondFile = fs.readFileSync(secondFileUrl, "utf8");
        
        jsonFirstFile = JSON.parse(jsonFirstFile); 
        
        jsonSecondFile = jsonSecondFile.substring(0,(jsonSecondFile.length - 1));


        var searchString = eval(/\],\[/g); 
        var jsonSecondFile = jsonSecondFile.replace(searchString,','); 
    
        jsonSecondFile = JSON.parse(jsonSecondFile);

        newObjFirst = [], newObjSecond = [];

        jsonFirstFile.forEach(e => {
            delete e.id;
            newObjFirst.push(e);
        });

        jsonSecondFile.forEach(e => {
            delete e.adId;
            newObjSecond.push(e);
        });

        let objCombined = [];
        generalHelper.objCombine(newObjFirst, objCombined);
        generalHelper.objCombine(newObjSecond, objCombined);
        
        return objCombined;
    },

    deleteFiles(url){
        fs.unlinkSync(url);
    },

    countItemsFile(url, limit){
        stringJson = fs.readFileSync(url, "utf8");
   
        let amountItems = (stringJson.match(/\[/g) || []).length;
        if(amountItems == limit){
            return amountItems;
        }
              
    }



}