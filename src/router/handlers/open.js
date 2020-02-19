let open = async (req, res) => {
    res.send('handler open');
};

module.exports = {
    test: open,
};