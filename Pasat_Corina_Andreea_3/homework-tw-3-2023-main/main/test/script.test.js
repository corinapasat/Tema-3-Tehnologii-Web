import request from 'supertest'
import app from '../script.js'

beforeAll((done) => {
    request(app).get('/create').send()
        .then(() => {
            done()
        })
})

describe('Test post /food-items', () => {
  
    test(' "body is missing"', (done) => {
        request(app).post('/food-items')
            .send()
            .expect(400)
            .then(res => {
                expect(JSON.parse(res.text).message).toBe('body is missing')
                done()
            })
    })

    test(' "malformed request"', (done) => {
        request(app).post('/food-items')
            .send({name : 'x', calories : 22})
            .expect(400)
            .then(res => {
                expect(JSON.parse(res.text).message).toBe('malformed request')
                done()
            })
    })


    test(' negative', (done) => {
        request(app).post('/food-items').send({
            name: "milk",
            category: "DAIRY",
            calories: -4
        }).expect(400).then(res => {
            expect(JSON.parse(res.text).message).toBe(' positive number')
            done()
        })
    })

    test('A food item can be added', (done) => {
        request(app).post('/food-items').send({
            name: "milk",
            category: "DAIRY",
            calories: 42
        }).expect(201).then(res => {
            expect(JSON.parse(res.text).message).toBe('created')
            done()
        })
    })

    test(' "not a valid type"', (done) => {
        request(app).post('/food-items').send({
            name: "milk",
            category: "S",
            calories: 100
        }).expect(400).then(res => {
            expect(JSON.parse(res.text).message).toBe('not a valid category')
            done()
        })
    })

})



