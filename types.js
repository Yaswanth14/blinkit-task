const zod = require("zod");

const createUser = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
})


module.exports = {
    createUser
}