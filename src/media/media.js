GorillaPresenter.uploadMediaFile = function(){
    BrowserFileSystem.uploadFile('.jpg,.gif,.png,.svg,.mp3,.mp4',false,'data',GorillaPresenter.mediaFileUploaded)
}

GorillaPresenter.mediaFileUploaded = function(filename,data){
    let basename = BrowserFileSystem.file_basename_no_extension(filename);
    let filepath = "userdata/media/" + filename;
    if(BrowserFileSystem.fs[filepath] === undefined){
        BrowserFileSystem.fs[filepath] = {}
      }
    BrowserFileSystem.fs[filepath]["data"] = data;
    BrowserFileSystem.fs[filepath]["timestamp"] = Date.now();
    let infoname = "userdata/media/" + basename + ".info";
    BrowserFileSystem.writeInternalTextFile(infoname,filepath);
    setTimeout(function(){
        GorillaPresenter.showMediaLibrary();
      },50);

}





GorillaPresenter.showMediaLibrary = function () {
  let mediaLibrary = document.getElementById("gorilla-presenter-media-library");
  mediaLibrary.innerHTML = "";
  let mediaInfoFiles = BrowserFileSystem.getInternalDir("userdata/media/*.info").sort();
  for (let i = 0; i < mediaInfoFiles.length; i++) {
    let mediaInfoFile = mediaInfoFiles[i];
    let mediaElement = document.createElement("div");
    let mediaFileName = BrowserFileSystem.readInternalTextFile(mediaInfoFile);
    let mediaFileData = BrowserFileSystem.readInternalFileDataURL(  mediaFileName);

    mediaElement.className = "gorilla-presenter-media-library-item";
    let mediaNickname = BrowserFileSystem.file_basename_no_extension(mediaInfoFile);
    let mediaType = GorillaPresenter.getMediaType(mediaFileName);
    let mediaIcon = GorillaPresenter.getMediaIcon(mediaType);
    mediaElement.innerHTML = mediaIcon;
    if(mediaType === "image"){
       mediaElement.innerHTML = mediaElement.innerHTML + "<img src='" + mediaFileData + "' height='100px'/>";
      }
      mediaElement.innerHTML = mediaElement.innerHTML +  "&nbsp;&nbsp;<span class='gorilla-presenter-media-file-name' original-file-name='" + mediaNickname + "' contenteditable='plaintext-only'>" + mediaNickname + "</span>";
    mediaLibrary.appendChild(mediaElement);
  }
  let elements = document.getElementsByClassName("gorilla-presenter-media-file-name");
  for(let i = 0; i < elements.length; i++){
    elements[i].onkeydown = function(evt){
      if (evt.keyCode === 13) {
          evt.preventDefault();
          // commit on return
          this.blur(); 
      }
  };
    elements[i].onblur = function(event){
      let element = event.target;
      if(element.innerText === ""){
        element.innerText = element.getAttribute("original-file-name");
        return;
      }
      let originalFileName = element.getAttribute("original-file-name");
      let originalFileFullPath = "userdata/media/" + originalFileName + ".info";
      let newFileName = element.innerText.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
      element.innerText = newFileName;
      let newFileFullPath = "userdata/media/" + newFileName + ".info";
      BrowserFileSystem.file_rename(originalFileFullPath,newFileFullPath);
      setTimeout(function(){
        GorillaPresenter.showMediaLibrary();
      },50);
    }
  }

  GorillaPresenter.showUIScreen("gorilla-presenter-media-library-container");
  mediaLibrary.focus();
  GorillaPresenter.currentScreen = "Media Library";
}