let open = async (req, res) => {
    res.send('handler admin');
};

module.exports = {
    test: open,
};