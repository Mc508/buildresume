export interface NewUserRequestBody {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface NewSkillsRequestBody {
  userId: string;
  skills: string[];
}

export interface NewProjectRequestBody {
  userId: string;
  name: string;
  github: string;
  liveLink: string;
  technology: string[];
  description: string;
  thumbnail: string;
}

export interface NewProfileRequestBody {
  userId: string;
  first_name: string;
  last_name: string;
  email: string;
  linkedin: string;
  x: string;
  github: string;
  about: string;
}

export interface NewCertificationRequestBody {
  userId: string;
  name: string;
  issuer: string;
  issueDate: Date;
  certificateLink: string;
}

export interface NewExperienceRequestBody {
  userId: string;
  company: string;
  position: string;
  startDate: Date;
  endDate: Date;
  description: string;
}

export interface NewAchievementRequestBody {
  userId: string;
  title: string;
  description: string;
}

export interface NewEducationRequestBody {
  userId: string;
  school: string;
  degree: string;
  startDate: Date;
  endDate: Date;
  description: string;
}
