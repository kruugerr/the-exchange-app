const { Exchange } = require('../models');

exports.getAllExchanges = async(req, res) => {
    try{
        const exchanges = await Exchange.findAll();
        res.json(exchanges)
    } catch(error){
        console.error('Failed to fetch exchanges:', error);
        res.status(500).json({ error: 'Failed to fetch exchanges' });
    }
};