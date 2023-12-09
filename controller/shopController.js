const shopService = require("../services/shopService");

async function createShop(req, res) {
  const { shopDomain, accessToken } = req;

  try {
    const shop = await shopService.create({ shopDomain, accessToken });
    res.status(201).json(shop);
  } catch (e) {
    console.log('error', e)
    res.status(500).send("Internal Server Error");
  }
}

async function findShop(req, res) {
  const { shopDomain } = req;

  try {
    const shop = await shopService.findByDomain(shopDomain);
    if (shop && shop._id) {
      res.status(200).json(shop);
    } else {
      res.status(404).send(null);
    }
  } catch (e) {
    res.status(500).send("Internal Server Error")
  }
}


module.exports = {
  createShop,
  findShop
}