const app = require('../server')
const request = require('supertest')

const baseUrl = 'https://inventify-app.herokuapp.com';

describe('GET endpoint', () => {
	it('should return a 200 status code', async () => {
		const response = await request(baseUrl)
			.get('/items');

		expect(response.statusCode).toBe(200);
	});
})

describe('POST Endpoints', () => {
  it('should create a new item', async () => {
    const res = await request(baseUrl)
      .post('/items')
      .send({
        name: "Orange",
        dateAdded: new Date("2022-01-01"),
        count: 3,
        description: "Oranges",
        tag: "fruit"
      })
    expect(res.statusCode).toEqual(200);
  })

  it('should create a new item', async () => {
    const res = await request(baseUrl)
      .post('/items')
      .send({
        name: "",
        dateAdded: new Date("2022-01-01"),
        count: 10,
        description: "",
        tag: ""
      })
    expect(res.statusCode).toEqual(200)
  })
})

describe('PUT endpoint', () => {
	it('should redirect after editing', async () => {
		const response = await request(app)
			.put('/items/1')
      .send({
        name: "New"
      });

		expect(response.statusCode).toBe(302);
	});
})

describe('DELETE endpoint', () => {
	it('should redirect after deleting', async () => {
		const response = await request(app)
			.delete('/items/61e7348b15b5987d2f900b4b');

		expect(response.statusCode).toBe(302);
	});
})

