const mongoose = require('mongoose');

const UserFormSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    userId: String,
    name: {
        salutation: {
            type: String,
            enum: ['Mr.', 'Mrs.', 'Ms']
        },
        firstName: String,
        lastName: String
    },
    fathersName: {
        firstName: String,
        lastName: String
    },
    mothersName: {
        firstName: String,
        lastName: String
    },
    dob: Date,
    address: {
        streetAddress: String,
        streetAddress2: String,
        district: String,
        state: String,
        zipcode: String
    },
    email: String,
    phno: String,
    languages: {
        type: String,
        enum: ['HINDI', 'ENGLISH', 'BENGALI']
    },
    teacherCategory: {
        type: String,
        enum: [
                'Primary Teacher for classes I-IV', 
                'GT Arts for classes VI-VIII', 
                'GT Science/Maths for classes VI-VIII'
            ]
    },
    education: {
        class10: {
            stream: {
                type: Number,
                enum: [1,2,3,4,5,6,7,8]
            },
            uniName: String,
            passingYear: Number,
            maxMarks: Number,
            obtained: Number,
            percentage: Number
        },
        class12: {
            stream: {
                type: Number,
                enum: [1,2,3,4,5,6,7,8]
            },
            uniName: String,
            passingYear: Number,
            maxMarks: Number,
            obtained: Number,
            percentage: Number
        },
        grad: {
            stream: {
                type: Number,
                enum: [1,2,3,4,5,6,7,8]
            },
            uniName: String,
            passingYear: Number,
            maxMarks: Number,
            obtained: Number,
            percentage: Number
        },
        ded: {
            stream: {
                type: Number,
                enum: [1,2,3,4,5,6,7,8]
            },
            uniName: String,
            passingYear: Number,
            maxMarks: Number,
            obtained: Number,
            percentage: Number
        },
        bed: {
            stream: {
                type: Number,
                enum: [1,2,3,4,5,6,7,8]
            },
            uniName: String,
            passingYear: Number,
            maxMarks: Number,
            obtained: Number,
            percentage: Number
        }
    },
    photoUrl: String,
    communityCode: {
        type: Number,
        enum: [1,2,3,4,5,6,7]
    },
    locomotorImpaired: Boolean,
    percentageImpaired: Number,
    appearedEarlier: Boolean,
    signUrl: String
});

module.exports = mongoose.model('UserForm', UserFormSchema);