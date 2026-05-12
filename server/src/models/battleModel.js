import mongoose, { mongo } from "mongoose";

const SubmissionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    language: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    executionTime: {
        type: Number,
        default: 0
    },
    memoryUsage: {
        type: Number,
        default: 0
    },
    passed: {
        type: Boolean,
        default: false
    },
    passedCount: {
        type: Number,
        default: 0
    },
    totalTests: {
        type: Number,
        default: 0
    },
    error: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const chatMessageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    username: String,
    message: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
})


const BattleSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        unique: true
    },
    players: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username : String,
        eloRating: Number,
        ready: {
            type: Boolean,
            default: false
        },
        currentCode: {
            type: String,
            default: ''
        },
        language: {
            type: String,
            default: 'Javascript'
        },
        isTyping: {
            type: Boolean,
            default: false
        },
        lastActivity: {
            type: Date,
            default: Date.now
        }
    }],
    spectators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    problem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem'
    },
    status: {
        type: String,
        enum:['waiting', 'countdown', 'active', 'finished'],
        default: 'waiting'
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    startedAt : Date,
    endedAt: Date,
    duration: Number, //in seconds
    submissions: [SubmissionSchema],
    chatMessages: [chatMessageSchema],
    isPrivate: {
        type: Booleaan,
        default: false
    },
    maxPlayers: {
        type: Number,
        default: 2
    }
}, {
    timestamps: true
})


export default mongoose.model('Battle', BattleSchema)