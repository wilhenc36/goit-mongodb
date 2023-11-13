const axios = require("axios");

describe("Testing GET /api/users", () => {
    let token;

    beforeAll(async () => {
        const result = await axios.post("http://127.0.0.1:3000/api/auth/log-in", {
            email: "apaz@email.com",
            password: "123"
        })

        token = result.data.result.token
    }, 100000)

    test("respond with HTTP status code 200", async () => {
        const result = await axios({
            url: "http://127.0.0.1:3000/api/users",
            method: "get",
            headers: {'Authorization': `Bearer ${token}`},
        })
        
        expect(result.status).toBe(200)
        expect(result.data.message).toBe("List of users")
    }, 10000)

    test("respond with HTTP status code 200", async () => {
        const result = await axios({
            url: "http://127.0.0.1:3000/api/users/6539ce01abe63f8a09552a15",
            method: "get",
            headers: {'Authorization': `Bearer ${token}`},
        })
        expect(result.status).toBe(200)
        expect(result.data.result).not.toBeNull()
    }, 10000)
})