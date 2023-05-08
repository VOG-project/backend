// export const setUploadDtoDummy = (): Omit<
//   Express.Multer.File,
//   'stream' | 'destination' | 'path' | 'filename'
// > => {
//   return {
//     fieldname: 'image',
//     originalname: '2t3.png',
//     encoding: '7bit',
//     mimetype: 'image/png',
//     size: 287326,
//     buffer: Buffer.from('dummy'),
//   };
// };

import { Readable } from 'stream';

export const setUploadDtoDummy = (): Express.Multer.File => {
  return {
    fieldname: 'image',
    originalname: '2t3.png',
    encoding: '7bit',
    mimetype: 'image/png',
    size: 287326,
    buffer: Buffer.from('foo'),
    stream: new Readable(),
    destination: 'db',
    filename: 'foo',
    path: 'foo',
  };
};
