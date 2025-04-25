(() => {
    const width = 320;
    let height = 0;
    let streaming = false;
  
    let video = null;
    let canvas = null;
    let photo = null;
    let startButton = null;
    let downloadButton = null;
  
    function startup() {
      video = document.getElementById("video");
      canvas = document.getElementById("canvas");
      photo = document.getElementById("photo");
      startButton = document.getElementById("start-button");
      downloadButton = document.getElementById("download-button");
  
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          video.srcObject = stream;
          video.play();
        })
        .catch((err) => {
          console.error(`An error occurred: ${err}`);
        });
  
      video.addEventListener(
        "canplay",
        (ev) => {
          if (!streaming) {
            height = (video.videoHeight / video.videoWidth) * width;
  
            video.setAttribute("width", width);
            video.setAttribute("height", height);
            canvas.setAttribute("width", width);
            canvas.setAttribute("height", height);
            streaming = true;
          }
        },
        false
      );
  
      startButton.addEventListener(
        "click",
        (ev) => {
          takePicture();
          ev.preventDefault();
        },
        false
      );
  
      downloadButton.addEventListener("click", () => {
        const data = photo.getAttribute("src");
  
        const link = document.createElement("a");
        link.href = data;
        link.download = "photo.png";
        link.click();
      });
  
      clearPhoto();
    }
  
    function clearPhoto() {
      const context = canvas.getContext("2d");
      context.fillStyle = "#AAA";
      context.fillRect(0, 0, canvas.width, canvas.height);
  
      const data = canvas.toDataURL("image/png");
      photo.setAttribute("src", data);
    }
  
    function takePicture() {
      const context = canvas.getContext("2d");
      if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);
  
        const data = canvas.toDataURL("image/png");
        photo.setAttribute("src", data);
      } else {
        clearPhoto();
      }
    }
  
    window.addEventListener("load", startup, false);
  })();
  