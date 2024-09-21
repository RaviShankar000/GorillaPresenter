
  GorillaPresenter.getMatchingInfoFileName = function(nickname){
    nickname = nickname.trim().toLowerCase();
    let files = BrowserFileSystem.dir("userdata/media/*.info").sort();
    for(let i = 0; i < files.length; i++){
      let filelc = files[i].toLowerCase();
      if(filelc.indexOf(nickname) !== -1){
        return files[i];
      }
    }
    return null;
  }

  
GorillaPresenter.getMediaIcon = function(mediaType){
  switch(mediaType){
  /*   case "image":
      return "<span style='height:100px;font-size=100px;'>🖼️</span>";
    case "audio":
      return "<span style='height:100px;;font-size=100px;'>🔊<span style='height:100px;'>";
    case "video":
      return "<span style='height:100px;;font-size=100px;'>🎥</span>"; */
      case "image":
        return "<span style='height:100px;font-size=100px;'  class='icon-picture'> </span>";
      case "audio":
        return "<span style='height:100px;;font-size=100px;'><span style='height:100px;' class='icon-file-audio'> </span>";
      case "video":
        return "<span style='height:100px;;font-size=100px;' class='icon-video'> </span>";
    default: 
      return "";
  }
}

GorillaPresenter.getMediaType = function(filename){
  let extension = filename.split('.').pop();
  switch(extension){
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return "image";
    case "mp3":
    case "wav":
    case "ogg":
      return "audio";
    case "mp4":
    case "webm":
      return "video";
    default:
      return null;
  }
}