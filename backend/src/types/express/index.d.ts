// types/express/index.d.ts
import { IUser } from "../types.js"; // Adjust path as needed

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}
