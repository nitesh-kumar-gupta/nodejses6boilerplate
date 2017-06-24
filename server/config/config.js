import mongoose from 'mongoose';
import Seed from './seeds/seed';
import Errors from './constants/errors';
import Response from './responses/response';
class Config {
    constructor() {
    }

    static connectMongoDb(database){
        mongoose.connect(database, () => {
            console.log(database, 'Mongodb connected');
        });
    }
    static resetMongoDb(){
        Seed.clearSeadDatabase();
    }
    static invalidCSRF(res){
        Response.response(res, { status: false, error: Errors.E_INVALID_CSRF});
    }
}
export default Config;