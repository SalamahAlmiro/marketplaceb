const request = require('supertest');
const app = require('../app');
const db = require('../config/db');

describe('Products routes', () => {
  let token;
  let userId;
  let createdProductId;

  const validProduct = {
    name: 'Test Product',
    price: 19.99,
    description: 'A perfectly ordinary test product description.',
    category: 'Books',
    image_url: 'https://example.com/image.jpg',
    // user_id gets added per-request once we know the real userId
  };

  beforeAll(async () => {
    const uniqueEmail = `producttest${Date.now()}@example.com`;
    const res = await request(app).post('/api/auth/register').send({
      username: 'producttester',
      email: uniqueEmail,
      password: 'password123',
    });
    token = res.body.token;
    userId = res.body.user.id;
  });

  afterAll(async () => {
    await db.promise().end();
  });

  describe('GET /api/products', () => {
    it('returns a list of products with no auth required', async () => {
      const res = await request(app).get('/api/products');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('POST /api/products', () => {
    it('rejects creation with no auth token', async () => {
      const res = await request(app)
        .post('/api/products')
        .send({ ...validProduct, user_id: userId });

      expect(res.statusCode).toBe(401);
    });

    it('rejects creation with invalid fields', async () => {
      const res = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...validProduct, name: 'ab', user_id: userId }); // name too short

      expect(res.statusCode).toBe(400);
    });

    it('creates a product with valid data and a valid token', async () => {
      const res = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...validProduct, user_id: userId });

      expect(res.statusCode).toBe(201);
      expect(res.body.productId).toBeDefined();
      createdProductId = res.body.productId;
    });
  });

  describe('PUT /api/products', () => {
    it('edits an existing product', async () => {
      const res = await request(app)
        .put('/api/products')
        .set('Authorization', `Bearer ${token}`)
        .send({
          ...validProduct,
          id: createdProductId,
          name: 'Updated Product Name',
          user_id: userId,
        });

      expect(res.statusCode).toBe(200);
    });

    it('returns 404 when editing a product that does not exist', async () => {
      const res = await request(app)
        .put('/api/products')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...validProduct, id: 9999999, user_id: userId });

      expect(res.statusCode).toBe(404);
    });
  });

  describe('DELETE /api/products', () => {
    it('deletes the product created earlier', async () => {
      const res = await request(app)
        .delete('/api/products')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: createdProductId, user_id: userId });

      expect(res.statusCode).toBe(200);
    });

    it('returns 404 when deleting a product that no longer exists', async () => {
      const res = await request(app)
        .delete('/api/products')
        .set('Authorization', `Bearer ${token}`)
        .send({ id: createdProductId, user_id: userId });

      expect(res.statusCode).toBe(404);
    });
  });
});