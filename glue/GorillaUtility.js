GorillaUtility = {
    readZipFileAsDataURI: async function(filePath) {

    let fileData = await fs.readBinaryFile(filePath);
    let mediaData =   await GorillaUtility.blobToDataURI(fileData);
    return mediaData;
    },

    blobToDataURI: function(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);  // Full data URI string
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    reader.readAsDataURL(blob);
  });
},

}