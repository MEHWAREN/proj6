const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');
const ConvertHandler = require('../controllers/convertHandler');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('#isTrue #isNotTrue',()=>{
        assert.isTrue(ConvertHandler('10L').ok, 'Convert a valid input such as 10L');
        assert.isNotTrue(ConvertHandler('32g').ok, 'Convert an invalid input such as 32g');
        assert.isNotTrue(ConvertHandler('3/7.2/4kg').ok, 'Convert an invalid number such as 3/7.2/4kg');
        assert.isNotTrue(ConvertHandler('3/7.2/4kilomegagram').ok, 'Convert an invalid number AND unit such as 3/7.2/4kilomegagram');
        assert.isTrue(ConvertHandler('kg').ok, 'Convert with no number such as kg');
    })
});
