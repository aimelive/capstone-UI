import request from 'supertest'
import app from '../../index.js'


describe('User tests', () => {
    describe('test user sign up', () => {
        let user, res;
        it('should sig up a unique user', async() => {
            user = { name: "nemeyeplatini", email: "nemeyeplatini@gmail.com", password: "nemeyeplatini123", confirmPassword: "nemeyepatini123", phone: 7898765 }
            res = await request(app)
                .post('/api/v1/users/signup')
                .send(user)
            expect(res.Congratulation).toContain('successfully')
        })
    })
})