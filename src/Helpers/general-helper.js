module.exports = {
    unlinkState(location){
        location = location.split(',');
        
        location = location[1].split('.');
    
        return location[0];
    },
    
    removeSpaces(string){
        string = string.replace(" ", "-");
        return string;
    },

    objCombine(obj, variable) {
        for (let key of Object.keys(obj)) {
          if (!variable[key]) variable[key] = {};
      
          for (let innerKey of Object.keys(obj[key]))
            variable[key][innerKey] = obj[key][innerKey];
        }
      }
}