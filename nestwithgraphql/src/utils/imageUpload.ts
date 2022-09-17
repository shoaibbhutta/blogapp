import { FileFilterCallback, diskStorage } from 'multer';
import { Request } from 'express';

export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    // file.filename = Date.now() + '-' + file.originalname + file.mimetype;
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const fileStorage = diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
  destination: (req, file, cb) => {
    cb(null, './images');
  },
});
