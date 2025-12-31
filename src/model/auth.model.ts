import mongoose, { Schema, Document } from "mongoose";


export interface User extends Document {
    role: string;
    password: string;
    email: string;
    invitationToken: string;
    isAcceptedbyUser: boolean;
    invitationTokenExpiry: Date;
    isBlocked: boolean
    

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
      select: false, 
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
    
},{
    timestamps: true
});




export default mongoose.model<User>("User", userSchema);
