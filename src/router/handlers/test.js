const dal = require('../../dal/dal');

let test = async (req, res) => {
    dal.testFunction('dal test').then((res) => console.log(res));
    res.send('handler test');
};

module.exports = {
    test: test,
};