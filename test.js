import * as chai from 'chai';
import chaiHttp from 'chai-http';
import server from './server.js';

const { expect } = chai; // استخراج expect من chai
chai.use(chaiHttp);

describe('Basic Tests', function () {
    it('should assert that true is equal to true', function () {
        expect(true).to.equal(true);
    });
});

describe('Server Tests', () => {
    it('should return 200 OK for the homepage (/)', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('should return HTML content for the homepage (/)', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                expect(res).to.be.html;
                done();
            });
    });

    it('should respond with 404 for a non-existent endpoint', (done) => {
        chai.request(server)
            .get('/nonexistent')
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });
});

