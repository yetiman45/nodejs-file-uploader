function uploadFile() {
    const fileInput = document.getElementById('fileInput').files[0];
    if (!fileInput) return alert("Please select a file!");

    const formData = new FormData();
    formData.append("file", fileInput);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/upload", true);

    xhr.upload.onprogress = function(event) {
        if (event.lengthComputable) {
            const percent = (event.loaded / event.total) * 100;
            document.getElementById('progressBar').value = percent;
        }
    };

    xhr.onload = function() {
        if (xhr.status == 200) {
            alert("Upload complete!");
        } else {
            alert("Upload failed!");
        }
    };

    xhr.send(formData);
}
