import mongoose from 'mongoose';
import HashService from './../services/hashService';

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const userSchema = new Schema(
    {
        firstname: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, 'First Name must be of 3 or more alphabets']
        },
        middlename: {
            type: String,
            trim: true,
            default: null
        },
        lastname: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, 'Last Name must be of 3 or more alphabets']
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: [8, 'Last Name must be of 8 or more characters']
        },
        lastlogin: {
            type: Date,
            default: Date.now
        },
        ips: [],
        active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        autoindex: true
    }
);

userSchema.set('toJSON', {
    getters: true,
    virtuals: false,
    transform: (doc, ret, options) => {
        delete ret.password;
        delete ret.__v;
        return ret;
    }
});

userSchema.pre('save', function (next) {
    if (this.isModified('password') || this.isNew) {
        this.password = HashService.generate(this.password);
    }
    return next();
});

const User = mongoose.model('User', userSchema);
export default User;