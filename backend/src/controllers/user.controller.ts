import { Request } from "express";
import { NewUserRequestBody } from "../types/types";
import { User } from "../model/user.model";

export const register =async (req: Request<NewUserRequestBody>, res: Response) => {
  try {
    const { first_name, last_name, email, password } = req.body;
  
    const user = new User({
      first_name,
      last_name,
      email,
      password,
    });
  
    await user.save()


  } catch (error) {
    
  }
};
