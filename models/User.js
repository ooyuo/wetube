import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatarUrl: String,
    facebookId: Number,
    githubId: Number,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ]
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" }); // usernameField는 username이 될 것을 명시해줘야하는데 email을 username으로 보게함


const model = mongoose.model("User", UserSchema);
export default model;