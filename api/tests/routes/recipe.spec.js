/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../../src/app.js');
const { Recipe, Diet, conn } = require('../../src/db.js');
const agent = supertest(app);

describe('Recipe routes testing', () => {
  before(() => conn.authenticate()
  .catch((err) => {
  }));  
  beforeEach(async function(){
    await Recipe.sync({ force: true })
    await Recipe.create({
      title: 'Milanesa a la napolitana',
      summary:"Una milanesa, cubierta en salsa, jamon, queso y con papas fritas de side",
      spoonacularScore:"88",
      healthScore:"52",
      instructions:"Luego de apanar milanesa, cubrir con salsa, luego con jamon, luego con queso y va al horno a 180 por 20 minutos"
    });

    await Recipe.create({
      title: 'Fideos con salsa de tomate',
      summary:"Un plato de fideos spaguetti, salteados con un poco de manteca y luego servidos con una salsa de tomate casera",
      spoonacularScore:"75",
      healthScore:"62",
      instructions:"Hervir agua, cocinar fideos por 10 minutos, luego saltear con un poco de manteca y calentar la salsa y colocarle los fideos y luego servir"
    });

    await Recipe.create({
      title: 'Ensalada ceasar',
      summary:"Ensalada con mix de hojas verdes, croutones, fetas de queso parmesano, salsa cesar",
      spoonacularScore:"68",
      healthScore:"92",
      instructions:"Lavar las hojas verdes, colocarlas en un bowl, con el aderezo y los croutones, sacudir para condimentar homogeneo, servir y agregar escamas de queso"
    });
  })
  afterEach(()=>Recipe.sync({ force: true }))
  
  xdescribe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
    );
    it('should search by name', async() => {
      let recin = await Recipe.create({
        title: 'milanesa',
        summary:"chau",
        spoonacularScore:"68",
        healthScore:"92",
        instructions:"me fui"
      })
      agent.get('/recipes?name=milanesa')
      .then(recipes => {
        expect(recipes.body[0].title).to.equal('milanesa');
      })
    });
})
  
  xdescribe('pedidos http RECIPES', function () {
    beforeEach(function(){
      return Recipe.sync({ force: true })
    })

    describe('GET /recipes/', function () {
      it('responde con 200', function(){
        return agent.get('/recipes')
          .expect(200);
      });
      it('espera que sea html', function(){
        return agent.get('/recipes')
          .expect('Content-Type', /json/);
      });
    });

    xdescribe('GET /recipes/:idRecipe', function () {
      it('responde con 404 cuando la página no existe', function() {
        return agent.get('/recipes/00')
          .expect(404);
      });
      it('responde con 200 cuando la página existe', function() {
        let recipe = Recipe.create({
          title: 'hola',
          summary: 'hola',
        })
        .then(() => {
          return agent.get('/recipes/'+recipe.id)
            .expect(200);
        })
      });
    });
  });
    describe('POST /recipes', function () {
      it('responde con 200', function(){
        let recipe = Recipe.create({
          title: 'hola',
          summary: 'hola',
        }).then()
          .expect(200);
      });
      it('crea una receta en la base de datos', function(){
        return agent.post('/recipe')
          .send({
            title: 'hola rey',
            summary:"chau rey",
            spoonacularScore:"68",
            healthScore:"92",
            instructions:"me fui",
            diets: [1,2]
          })
          .then(() => {
            return Recipe.findOne({
              where: {
                title: 'hola rey',
                summary:"chau rey",
              }
            });
          })
          .then(recipe => {
            expect(recipe).to.exist;
          });
      });
      it('setea correctamente la dieta en la base de datos', function(){
        return agent.post('/recipe')
          .send({
            title: 'hola pa',
            summary:"chau pa",
            spoonacularScore:"68",
            healthScore:"92",
            instructions:"me fui",
            diets: [1,2]
          })
          .then(() => {
            return Recipe.findOne({
              where: {
                title: 'hola pa',
                summary:"chau pa"
              },
              include: Diet
            });
          })
          .then(recipe => {
            expect(recipe.diets[0].name).to.equal('gluten free');
          });
      });
    });

  
  xdescribe('pedidos http DIETS', function () {
    beforeEach(function(){
      return Diet.sync({ force: true })
    })

    describe('GET /types', function () {
        it('responde con 200', function() {
          return agent.get('/types')
          .send({
            name: 'lechuguita',
          })
          .then(() => {
            return agent.get('/types')
              .expect(200);
          })
        });
        it('espera que sea html', function(){
          return agent.get('/types')
            .expect('Content-Type', /json/);
        });
    });
  });
  
  xdescribe('pedidos HTTP recipes', function () {
    beforeEach(function(){
      return Diet.sync({ force: true })
    })

    describe('GET /recipes', function () {
      it('responde con 200', function() {
        return agent.get('/recipes')
        .expect(200);
      });
      it('responde con un json con todas las dietas.', function() {
        return Recipe.create({
          title: 'hola',
          summary:"chau",
          spoonacularScore:"68",
          healthScore:"92",
          instructions:"me fui"
        })
        .then(() => {
          Recipe.sync()
          return agent.get('/types')
        })
        .then(recipes => {
          expect(recipes.body.length).to.equal(10);
        })
      });
    });
  
    describe('get /recipes/:idRecipe', function () {
      it('responde con 404 cuando la receta no existe', function() {
        return agent.get('/recipes/00')
          .expect(404);
      });
    })
  })

});