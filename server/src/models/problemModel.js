import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true
    },
    description: {
        type: String,
        default: '',
        required: true
    },
    examples: [{
        input: String,
        output: String,
        explanation: String
    }],
    constraints: [String],
    starterCode: {
        javascript: {
            type: String,
            default: ''
        },
        python:  {
            type: String,
            default: ''
        },
        java:  {
            type: String,
            default: ''
        },
        cpp:  {
            type: String,
            default: ''
        },
        go:  {
            type: String,
            default: ''
        }
    },
    testCases: [{
        input: String,
        expected: String
    }],
    hiddenTestCases: [{
        input: String,
        expected: String
    }],
    tags: [String],
    timeLimitMs: {
        type: Number,
        default: 2000
    },
    memoryLimitMb: {
        type: Number,
        default: 128
    },
    isActive: {
        type: Boolean,
        default: true
    },
},{
    timestamps: true
})


export default mongoose.model('Problem', ProblemSchema)