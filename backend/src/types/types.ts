import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  provider: string;
  providerId?: string;
  name: string;
  email?: string;
  password?: string;
  avatar?: string;
}

export interface ISkills {
  userId: Types.ObjectId | IUser;
  skills: string[];
}

export interface IProject {
  userId: Types.ObjectId | IUser;
  name: string;
  github: string;
  liveLink: string;
  technology: string[];
  description: string;
  thumbnail: {
    publicId: string;
    url: string;
    width: number;
    height: number;
  };
}

export interface IProfile {
  userId: Types.ObjectId | IUser;
  first_name: string;
  last_name: string;
  email: string;
  linkedin: string;
  x: string;
  github: string;
  about: string;
}

export interface ICertification {
  userId: Types.ObjectId | IUser;
  name: string;
  issuer: string;
  issueDate: Date;
  certificateLink: string;
}

export interface IExperience {
  userId: Types.ObjectId | IUser;
  company: string;
  position: string;
  startDate: Date;
  endDate: Date;
  description: string;
}

export interface IAchievement {
  userId: Types.ObjectId | IUser;
  title: string;
  description: string;
}

export interface IEducation {
  userId: Types.ObjectId | IUser;
  university: string;
  degree: string;
  passingYear: number;
  percentage: number;
}

declare namespace Express {
  interface Request {
    user?: any;
  }
}
