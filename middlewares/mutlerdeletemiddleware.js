const fs = require("fs");
const path = require("path");

const deleteFile = (url) => {
  console.log({ hello: url });
  // Construct the absolute path to the file
  filePath = path.join(__dirname, "..", url); // Adjust as per your file structure

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("Error checking file existence:", err);
      return;
    }

    // Delete the file
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        return;
      }
      console.log(`Deleted file: ${filePath}`);
    });
  });
};

module.exports = deleteFile;
