import bCrypt from 'bcrypt-nodejs';
class HashService {
    constructor() {
    }

    static generate(text) {
        const salt = bCrypt.genSaltSync(10);
        return bCrypt.hashSync(text, salt);
    }

    static compare(plain, hashed) {
        return bCrypt.compareSync(plain, hashed);
    }
}
export default HashService;