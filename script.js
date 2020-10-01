const axios = require('axios');
const Math = require('mathjs');
const Generate = require("project-name-generator");
const Leite = require("leite");

class JsonCreator {
  constructor(brand, cnpj, adress, business, ifCollector, businessSize, score) {
    this.email = brand + "@email.com";
    this.password = "1234"
    this.brand = brand + " LTDA";
    this.cnpj = cnpj;
    this.adress = adress;
    this.business = business;
    this.ifCollector = ifCollector;
    this.businessSize = businessSize;
    this.website = "www." + brand + ".com";
    this.imageUrl = "https://picsum.photos/200";
    this.score = score;
    this.complaints = [];
    this.award = {};
    this.os = [];
  }
}
const trueOrFalseGenerator = () => Math.floor(Math.random() * 1000) % 2 === 0 ? true : false;

const leite = new Leite()

const brand = () => {
  let name = Generate({ words: 1, alliterative: false }).spaced + Math.floor(Math.random() * 1000)
  return name;
}
const cnpj = () => leite.empresa.cnpj({ formatado: false });

const adressGenerator = () => {
  const logradouro = leite.localizacao.logradouro();
  const numero = Math.floor(Math.random() * 1000);
  const bairro = leite.localizacao.bairro();
  const cidade = leite.localizacao.cidade();
  const estado = leite.localizacao.estado();
  const cep = leite.localizacao.cep();

  return {
    street: logradouro,
    number: numero,
    neighborhood: bairro,
    zip: cep,
    city: cidade,
    state: estado
  }
}
const ifCollectorGenerator = () => {
  return {
    organic: trueOrFalseGenerator(),
    plastic: trueOrFalseGenerator(),
    glass: trueOrFalseGenerator(),
    paper: trueOrFalseGenerator(),
    metal: trueOrFalseGenerator(),
    battery: trueOrFalseGenerator(),
    cloth: trueOrFalseGenerator(),
    electronic: trueOrFalseGenerator(),
    rubber: trueOrFalseGenerator()
  }
}

const scoreGenerator = () => {
  const monthPoints = Math.floor(Math.random() * 1000)
  const anualPoints = Math.floor(Math.random() * 8000 + monthPoints)
  return ({
    mensal: monthPoints,
    anual: anualPoints
  })
}

const requestRegister = (json) => {

  axios.post("http://localhost:3001/register", json)
    .then(res => {
      if (res.data === undefined) {
        if (business[i] === 'Coleta') {
          const postJson = new JsonCreator(brand(), cnpj(), adressGenerator(), business[i], ifCollectorGenerator(), businessSize[j], scoreGenerator())
          requestRegister(postJson);

        }
        else {
          const postJson = new JsonCreator(brand(), cnpj(), adressGenerator(), business[i], false, businessSize[j], scoreGenerator())
          requestRegister(postJson);

        }
      }
      else { console.log(res.data) }

    })
    .catch(err => console.log(err.data))

}

const business = [
  'Coleta',
  'Indústria',
  'Restaurante/Bar',
  'Mercearia',
  'Padaria',
  'Supermercado/Hipermercado',
  'Drogaria',
  'Varejista',
  'Shopping',
  'Condominio',
  'Hotel/Motel'
];

const businessSize = [
  "microempresa",
  "pequena",
  "media",
  "grande"
];

for (let i in business) {
  for (let j in businessSize) {
    for (let count = 0; count <= 19; count++) {

      if (business[i] === 'Coleta') {
        const postJson = new JsonCreator(brand(), cnpj(), adressGenerator(), business[i], ifCollectorGenerator(), businessSize[j], scoreGenerator())
        requestRegister(postJson);

      }
      else {
        const postJson = new JsonCreator(brand(), cnpj(), adressGenerator(), business[i], false, businessSize[j], scoreGenerator())
        requestRegister(postJson);

      }
    }

  }
}
/*
{
  "users": [],
  "services": []
}
*/