import { uploadToCloudinary } from "../utils/cloudinary.js"
import { UploadApiErrorResponse } from 'cloudinary';
import { NextFunction, Request, Response } from 'express';
import { Project } from "../model/project.model.js";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

export const uploadImage = (method: 'post' | 'put') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (method === 'put' && !req.file) {
      next();
      return;
    }
    if (!req.file) {
      res.status(400).json({
        code: 'ValidationError',
        message: 'Project thumbnail is required',
      });
      return;
    }
    if (req.file.size > MAX_FILE_SIZE) {
      res.status(413).json({
        code: 'ValidationError',
        message: 'File size must be less than 2MB',
      });
      return;
    }
    try {
      const { projectId } = req.params;
      const project = await Project.findById(projectId).select('thumbnail.publicId').exec();

      const data = await uploadToCloudinary(
        req.file.buffer,
        project?.thumbnail.publicId.replace('project/', ''),
      );
      if (!data) {
        res.status(500).json({
          code: 'ServerError',
          message: 'Internal server error',
        });
        return;
      }
      const newThumbnail = {
        publicId: data.public_id,
        url: data.secure_url,
        width: data.width,
        height: data.height,
      };
      req.body.thumbnail = newThumbnail;
      console.log("image uploaded");
      next();
    } catch (error: UploadApiErrorResponse | any) {
      res.status(error.http_code).json({
        code: error.http_code < 500 ? 'ValidationError' : error.name,
        message: error.message,
      });
    }
  };
};