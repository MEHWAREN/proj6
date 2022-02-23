const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = ConvertHandler;

suite('Unit Tests', function(){
    test('#equal #notEqual', ()=>{
        assert.equal(convertHandler('12kg').json.initNum, 12,'should correctly read a whole number input');
        assert.equal(convertHandler('2.7kg').json.initNum, 2.7, 'should correctly read a decimal number input');
        assert.equal(convertHandler('3/2kg').json.initNum, 1.5, ' should correctly read a fractional input');
        assert.equal(convertHandler('3.5/2.3kg').json.initNum, 3.5/2.3, 'should correctly read a fractional input with a decimal.');
        assert.equal(convertHandler('kg').json.initNum, 1, 'should correctly default to a numerical input of 1 when no numerical input is provided');
        assert.equal(convertHandler('5lbs').json.initUnit, 'lbs', 'should correctly read each valid input unit');
        assert.equal(convertHandler('5lbs').json.returnUnit, 'kg', 'should return the correct return unit for each valid input unit');
        assert.equal(convertHandler('5kg').spellInitUnit, 'kilograms','should correctly return the spelled-out string unit for each valid input unit');
        assert.equal(convertHandler('5gal').json.returnNum, 18.92705, 'should correctly convert gal to L');
        assert.equal(convertHandler('5l').json.returnNum, 1.32086, 'should correctly convert L to gal');
        assert.equal(convertHandler('5mi').json.returnNum, 8.0467, 'should correctly convert mi to km');
        assert.equal(convertHandler('5km').json.returnNum, 3.10686, 'should correctly convert km to mi');
        assert.equal(convertHandler('5lbs').json.returnNum, 2.26796, 'should correctly convert lbs to kg');
        assert.equal(convertHandler('5kg').json.returnNum, 11.02312, 'should correctly convert kg to lbs');
    })
    test('#isTrue #isNotTrue', ()=>{
        assert.isNotTrue(convertHandler('3/2/3kg').ok, 'should correctly return an error on a double-fraction');
        assert.isNotTrue(convertHandler('5kgg').ok, 'should correctly return an error for an invalid input unit')
    })
});