import { ping } from 'tcp-ping';

describe('Health', () => {
  describe('Reservations', () => {
    it('should be healthy', async () => {
      const response = await fetch('http://reservations:3000');
      expect(response.ok).toBeTruthy();
    });
  });

  describe('Auth', () => {
    it('should be healthy', async () => {
      const response = await fetch('http://auth:3001');
      expect(response.ok).toBeTruthy();
    });
  });

  describe('Payments', () => {
    it('should be healthy', (done) => {
      ping({ address: 'payments', port: 3003 }, (err) => {
        if (err) {
          fail();
        }
        done();
      });
    });
  });

  describe('Notifications', () => {
    it('should be healthy', (done) => {
      ping({ address: 'notifications', port: 3004 }, (err) => {
        if (err) {
          fail();
        }
        done();
      });
    });
  });
});
