import request from 'supertest'; // استيراد Supertest
import server from './server.js'; // استيراد السيرفر

describe('Server Tests', () => {
  it('should return 200 OK for the homepage (/)', (done) => {
    request(server)
      .get('/')
      .end((err, res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it('should return HTML content for the homepage (/)', (done) => {
    request(server)
      .get('/')
      .end((err, res) => {
        expect(res.type).toBe('text/html');
        done();
      });
  });

  it('should respond with 404 for a non-existent endpoint', (done) => {
    request(server)
      .get('/nonexistent')
      .end((err, res) => {
        expect(res.status).toBe(404);
        done();
      });
  });
});
