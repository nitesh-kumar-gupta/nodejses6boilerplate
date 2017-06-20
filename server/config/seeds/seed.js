import mongoose from 'mongoose';
import User from './../../app/models/User';
import _ from 'lodash';
import jsonFile from 'jsonfile';
const userData = __dirname+'/data/user.json';
class Seed {
    constructor() {
    }
    static seedDatabase() {
        jsonFile.readFile(userData, function(error, jsonData) {
            if(error){
                console.log('error', error);
            }else{
                jsonData.forEach((user) => {
                    const admin = new User(user);
                    return admin.save().then((admin) => {
                        console.log(admin,'Admin seeded!');
                    }).catch((err) => {
                        console.log(admin, 'Admin seed error!', err);
                    });
                });
            }
        });
    }
    static clearDatabase() {
        return null;
    }
    static clearSeadDatabase(){
        const collections = mongoose.connection.collections;
        _.forEach(collections, function (value, key) {
            var collection = mongoose.connection.collections[key];
            collection.drop();
            console.log(key, 'collections Dropped');
        });
        this.seedDatabase();
    }
}
export default Seed;