const express = require('express');
const appOH = express();
const appNH = express();
const fetch = require("node-fetch");
const vhost = require('vhost')

appNH.set('view engine', 'ejs');

appNH.get('/', (req, res) => {
    res.status(200).render(__dirname + '/index.ejs', { domain: "cdp.imm.codes" });
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
    res.status(200).render(__dirname + '/index.ejs', { domain: "cdp.imm.codes", host: req.hostname });
});

appOH.get('/', async (req, res) => {
    res.sendFile(__dirname + '/indexOH.html')
})

const dnsHandler = express()

dnsHandler.use(vhost("cdp.imm.codes", appOH))
dnsHandler.use(vhost("*", appNH))

dnsHandler.listen(3000, () => {
    console.log(`Server started at port ${3000}`);
});