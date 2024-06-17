import mongoose from "mongoose";
import userModel from "../src/models/User.js";
import chai from 'chai'
const expect = chai.expect

await mongoose.connect(`MONGO_DB_URL`)

describe('Test CRUD de usuarios en la ruta /api/users', function () {

    //Previo a comenzar todo el test
    before(() => {
        console.log("Arrancando el test")
    })

    //Previo a comenzar cada test individual
    beforeEach(() => {
        console.log("Comienza el test!")
    })

    it('Obtener todos los usuarios mediante el metodo GET', async () => {
        const users = await userModel.find()

        //expect(users).equal([])
        //expect(Array.isArray(users)).to.be.ok //Si es verdadero o no
        //expect(users).not.to.be.deep.equal([]) //Que el interior del array no sea igual a array vacio
        expect(users).to.have.lengthOf(0)
    })
})