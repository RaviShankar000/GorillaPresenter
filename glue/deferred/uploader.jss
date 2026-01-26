const textExtensions = [
    '.txt', '.csv', '.json', '.js', '.ts', '.html', '.css', 
    '.xml', '.svg', '.md', '.log', '.config', '.yml', '.yaml',
  '.license'];


// Handle selected file
fileInput.addEventListener('change', (e) => {
  e.preventDefault();
  if (e.target.files[0]) {
    handleFile(e.target.files[0]);
    fileInput.value = '';
  }
});


/*
// Drag & drop
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('dragover');
});
dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('dragover');
});
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  e.stopPropagation();
  dropZone.classList.remove('dragover');
  if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
});
*/

// Main function: read and save the file
async function handleFile(file) {
  const fileName = file.name.toLowerCase();
  const isTextFile = textExtensions.some(ext => fileName.endsWith(ext)); 
  
  let filePath;
  
  if(file.name.match(/\.ttf$/i) || file.name.match(/\.otf$/i) || file.name.match(/\.woff$/i) || file.name.match(/\.woff2$/i)){
    filePath = "fonts/" + file.name;
    await writeBinaryFile(filePath, file);
    await GorillaFontLoader.loadFonts();
  }
  else if (file.name.match(/\.license$/i)) {
    filePath = "licenses/" + file.name;
    await writeTextFile(filePath, file);
    await GorillaLicenses.loadLicensesScreen();
  }
  else {
    filePath = "media/" + file.name;
    await writeBinaryFile(filePath, file);
    await GorillaMedia.loadMediaScreen();
  }
}

async function writeBinaryFile(path, file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    await fs.writeBinaryFile(path, uint8Array);
  } catch (error) {
    console.error("Error writing binary file:", error);
  }
}

async function writeTextFile(path, file) {
  try {
    const textData = await file.text();
    await fs.writeTextFile(path, textData);
  } catch (error) {
    console.error("Error writing text file:", error);
  }
}