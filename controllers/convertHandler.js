    
  const getNum = function(input) {
    let result;
    
    if(!/\d+(.\d+)?(\/\d+(.\d+)?)? || [A-z]+\d+(.\d+)?/.test(input) || /\d+(.\d+)?\/\/\d+(.\d+)?/.test(input) || /\d+(.\d+)?\/\d+(.\d+)?\/\d+(.\d+)?/.test(input) || /\d+\s+.?\d+(.\d+)?/.test(input) || /[A-z]+\d+(.\d+)?/.test(input)){
        return false; 
    }
    else if(/\d+.\d+\/\d+.\d+/.test(input)){
        let intStr = input.match(/\d+.\d+\/\d+.\d+/)[0];
        let arr = intStr.split('/');
        return Number.parseFloat(arr[0]) / Number.parseFloat(arr[1]);
    }
    else if(/\d+\/\d+.\d+/.test(input) || /\d+.\d+\/\d+/.test(input)){
        let arr = input.split('/');
        return Number.parseFloat(arr[0]) / Number.parseFloat(arr[1]);
    }
    else if(/\d+\/\d+/.test(input)){
        let intStr = input.match(/\d+\/\d+/)[0];
        let arr = intStr.split('/');
        return Number.parseFloat(arr[0]) / Number.parseFloat(arr[1]);
    }
    else if(/\d+/.test(input) || /\d+.\d+/.test(input)){
        return Number.parseFloat(input);
    }
    else if(/^[A-z]+/.test(input)){
        return 1;
    }
    else{
        console.log(1)
        return false;
    }

  };
  
  const getUnit = function(input) {
      if(/([A-z]+\s*?)$/.test(input)){
        let intStr = input.match(/([A-z]+\s*?)$/);
        let unit = intStr[0].split(' ')[0].toLowerCase() || false;
        if(unit != 'kg' && unit != 'km' && unit != 'lbs' && unit != 'gal' && unit != 'l' && unit != 'mi'){
            return false;
        }
        else{
            return unit;
        }
      }
  };
  
  const getReturnUnit = function(initUnit) {
      if(initUnit == 'kg'){
          return 'lbs';
      }
      else if(initUnit=='lbs'){
          return 'kg';
      }
      else if(initUnit=='km'){
          return 'mi';
      }
      else if(initUnit=='mi'){
          return 'km';
      }
      else if(initUnit=='gal'){
          return 'L';
      }
      else if(initUnit=='l'){
          return 'gal'
      }
      else{
          return false;
      }
  };

  const spellOutUnit = function(initUnit) {
    if(initUnit == 'kg'){
        return 'kilograms';
    }
    else if(initUnit=='lbs'){
        return 'pounds';
    }
    else if(initUnit=='km'){
        return 'kilometers';
    }
    else if(initUnit=='mi'){
        return 'miles';
    }
    else if(initUnit=='gal'){
        return 'gallons';
    }
    else if(initUnit=='l'){
        return 'liters'
    }
    else{
        return false;
    }
  };
  
  const convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    if(initUnit=='gal'){
        return Number.parseFloat((initNum * galToL).toFixed(5))
    }
    else if(initUnit=='l'){
        return Number.parseFloat((initNum / galToL).toFixed(5));
    }
    else if(initUnit=='kg'){
        return Number.parseFloat((initNum / lbsToKg).toFixed(5));
    }
    else if(initUnit=='lbs'){
        return Number.parseFloat((initNum * lbsToKg).toFixed(5));
    }
    else if(initUnit=='mi'){
        return Number.parseFloat((initNum * miToKm).toFixed(5));
    }
    else if(initUnit=='km'){
        return Number.parseFloat((initNum / miToKm).toFixed(5));
    }
  };
  
  const getString = function(initNum, initUnit, returnNum, returnUnit) {

      return `${initNum} ${spellOutUnit(initUnit)} converts to ${returnNum} ${spellOutUnit(returnUnit.toLowerCase())}`
  };
  
  function ConvertHandler(data) {
    let iNumb = getNum(data), iUnit = getUnit(data), rNumb = convert(iNumb, iUnit), rUnit = getReturnUnit(iUnit);

    if(!iNumb && !iUnit){
        return {ok: false, errorMessage: 'Invalid number and unit.'}
    }
    else if(!iNumb){
        return {ok: false, errorMessage: 'Invalid number.'}
    }
    else if(!iUnit){
        return {ok: false, errorMessage: 'Invalid unit.'}
    }
    else if(!rUnit || !rNumb){
        return {ok: false, errorMessage: 'An error has occured'}
    }

  return {ok: true, spellInitUnit:spellOutUnit(iUnit), spellResultUnit:spellOutUnit(rUnit) ,string: getString(iNumb, iUnit, rNumb, rUnit), json: {initNum: iNumb,  initUnit: iUnit, returnNum: rNumb, returnUnit: rUnit, string: getString(iNumb, iUnit, rNumb, rUnit)}}
}

module.exports = ConvertHandler;
