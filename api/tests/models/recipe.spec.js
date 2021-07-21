
const { expect } = require('chai');
const { Recipe, Diet, conn } = require('../../src/db.js')

describe('Recipe model', () => {
  
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  
    describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('title and summary errors', () => {
      it('should throw an error if title or summary are null', (done) => {
        Recipe.create({title:null,summary:null})
          .then(() => done(new Error('It requires a valid title and summary')))
          .catch(() => done());
      });
      it('should throw an error if title is null', (done) => {
        Recipe.create({title:null,summary:'this is how we do it'})
          .then(() => done(new Error('It requires a valid title')))
          .catch(() => done());
      });
      afterEach(()=>Recipe.sync({ force: true }))
    })
    describe('Creating recipes', () => {
      it('should work when its a valid title and summary', () => {
        Recipe.create({ title: 'Milanesa a la napolitana' ,summary:"Se apana la milanesa y se frita y se le pone salsa y queso"})
        .then(() => done())
      });
      it('should return the recipe created', async() => {
        let temp = await Recipe.create({ title: 'Milanesa' ,summary:"So good", spoonacularScore:68, healthScore:92, instructions:"Lavar"})
        expect(temp.title).to.equal('Milanesa')
        expect(temp.summary).to.equal('So good')
        expect(temp.spoonacularScore).to.equal(68)
      });
    });
    
    describe('Getting diets', async() => {
      beforeEach(() => Diet.sync({ force: true }));
      it('should return the diets', () => {
        Diet.create({name:"gluten free"})
        Diet.findAll()
        .then((temp)=>{
          expect(temp.length).to.equal(10)
        expect(temp[0]).to.equal('gluten free')
        })
        
      });
    });

  });

});
