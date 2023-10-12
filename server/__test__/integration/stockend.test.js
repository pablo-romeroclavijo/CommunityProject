const request = require("supertest");
const app = require("../../../app");

describe("api server", () => {
	let api;

	beforeAll(() => {
		api = app.listen(5000, () => {
			console.log("🌕Test server running in port 5000");
		});
	});

	afterAll((done) => {
		// console.log('Gracefully stopping the test server')
		api.close(done);
	});

	it("should respond with an array when calling Get /stock", async () => {
		const response = await request(app).get("/stock");

		expect(response.status).toBe(200);
		expect(response.header["content-type"]).toMatch(/json/);

		expect(Array.isArray(response.body)).toBe(true);
	});
});
