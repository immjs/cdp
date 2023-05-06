const express = require('express');
const appOH = express.Router();
const appNH = express.Router();
const fetch = require("node-fetch");
const vhost = require('vhost')

appNH.set('view engine', 'ejs');

appNH.get('/', (req, res) => {
    res.status(200).render(__dirname + '/index.ejs', { domain: "cdp.immjs.dev" });
});

appOH.get('/new_cat', async (req, res) => {
    let data = await (await fetch('https://api.thecatapi.com/v1/images/search')).json()
    res.redirect(data[0].url)
})

appOH.get('/new_dog', async (req, res) => {
    let data = await (await fetch('https://dog.ceo/api/breeds/image/random')).json()
    res.redirect(data.message)
})

appOH.get('/new_panda', async (req, res) => {
    let data = await (await fetch('https://some-random-api.com/img/panda')).json()
    res.redirect(data.link)
})

appOH.get('/new_koala', async (req, res) => {
    let data = await (await fetch('https://some-random-api.com/img/koala')).json()
    res.redirect(data.link)
})

appOH.get('/', (req, res) => {
    res.status(200).render(__dirname + '/index.ejs', { domain: "cdp.immjs.dev", host: req.hostname });
});

appOH.get('/', async (req, res) => {
    res.sendFile(__dirname + '/indexOH.html')
})

const dnsHandler = express.Router()

dnsHandler.use(vhost("cdp.immjs.dev", appOH))
dnsHandler.use(vhost("*", appNH))

module.exports = dnsHandler;
