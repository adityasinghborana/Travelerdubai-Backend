const fs = require('fs');
const path = require('path');

const allimageService = {
  listAllImages: () => {
    return new Promise((resolve, reject) => {
      const uploadsDir = path.join(__dirname, '../public/uploads');
      
      fs.readdir(uploadsDir, (err, files) => {
        if (err) {
          return reject('Unable to scan files!');
        }
        const fileList = files.map(file => ({
          name: file,
          url: `public/uploads/${file}`
        }));
        resolve(fileList);
      });
    });
  }
};

module.exports = allimageService;