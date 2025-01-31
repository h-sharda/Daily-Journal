const { createHmac, randomBytes } = require("crypto");
const { Schema, model} = require("mongoose");
const { createTokenForUser } = require("../services/authentication");

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    profileImageURL: {
        type: String,
        default: "/images/deafault.png",
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    }
}, { timestamps: true });


userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return;
    
    const salt = randomBytes(16).toString();
    const hashed = createHmac('sha256', salt).update(user.password).digest('hex');

    this.salt = salt;
    this.password = hashed;

    next();
})

userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
    const user = await this.findOne({email});
    if (!user) throw new Error("User not found");;

    const salt = user.salt;
    const hashed = user.password;
    
    const userProvided = createHmac('sha256', salt).update(password).digest('hex');

    if (hashed !== userProvided) throw new Error("Wrong Password");

    const token = createTokenForUser(user);

    return token;
});

const User = model("User", userSchema);

module.exports = User;
