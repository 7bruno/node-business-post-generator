const fetch = require('node-fetch');
const fs = require('fs');
const Math = require('mathjs');
const filepath = './APIanswers.json';
let number = Math.round(9*Math.random())+1;
const linkAPI = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count='+number;
console.log(linkAPI)
fetch(linkAPI)
.then(res=>res.json())
.then(
    json=>{
        let jsonContent = json;
        jsonContent = JSON.stringify(jsonContent);
        return fs.writeFileSync(filepath,jsonContent);
    }
    );