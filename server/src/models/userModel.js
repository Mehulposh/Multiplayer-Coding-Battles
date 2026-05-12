import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minLength: [5, 'Username should have atleast 5 characters'],
        maxLenght: [20, 'Username cannot exceed 20 characters'],
        match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password should have atleast 8 characters'],
        select: false
    },
    avatar: {
        type: String,
        default: '',
    },
    eloRating: {
        type: Number,
        default: 1000,
        min: 0,
    },
    battlesPlayed: {
        type: Number,
        default: 0,
    },
    wins: {
        type: Number,
        default: 0,
    },
    losses: {
        type: Number,
        default: 0,
    },
    achievements: [
        {type: String}
    ],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    isOnline: {
        type: Boolean,
        default: false,
    },
    lastSeen: {
        type: Date,
        default: Date.now
    }
},{
    timestamps: true
})



//hash password before saving
UserSchema.pre('save' , async function (next) {
    if(!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password,12)
    next()
})


//compare password
UserSchema.methods.ComparePassword = async function (candiatePassword) {
    return bcrypt.compare(candiatePassword, this.password)
}


//ELO calculation
UserSchema.methods.updareElo = function (opponentElo , won) {
    const k = 32
    const expected = 1/ (1 + Math.pow(10, (opponentElo - this.eloRating)/400))
    const score = won ? 1 : 0
    this.eloRating =  Math.round(this.eloRating + k * (score - expected))

    if(won){
        this.wins += 1
    }else{
        this.losses += 1
    }

    this.battlesPlayed += 1
}


//virtual for win rate
UserSchema.virtual('winRate').get(function () {
    if(this.battlesPlayed == 0) return 0
    return Math.round((this.wins/this.battlesPlayed) *100)
}) 


UserSchema.set('toJSON', {virtuals: true})

export default mongoose.model('User', UserSchema)