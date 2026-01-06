import mongoose, { Schema, Document } from "mongoose";


export interface User extends Document {
    role: string;
    password: string;
    email: string;
    invitationToken: string;
    isAcceptedbyUser: boolean;
    invitationTokenExpiry: Date;
    isBlocked: boolean;
    refreshToken: string;   
    resetPasswordToken: string;
    resetPasswordExpire: Date;
    

}

const userSchema: Schema<User> = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },
     password: {
      type: String,
      required: false,
      minLength: [6, "password must be at least 6 characters"],

    },
    role: {
      type: String,
      enum: ["admin", "moderator", "superadmin"],
      required: true,
      default: "moderator",
    },
    invitationToken: {
      type: String,
      required: false,
      
    },
    invitationTokenExpiry: {
      type: Date,
      required: true,
    },

    isAcceptedbyUser: {
        type: Boolean,
        default: false
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    refreshToken: {
      type: String,
      required: false,
    },
    resetPasswordToken: {
      type: String,
      required: false,
    },
    resetPasswordExpire: {
      type: Date,
      required: false,
    },
    
},{
    timestamps: true
});




const User = mongoose.models.User || mongoose.model<User>("User", userSchema);

export default User;