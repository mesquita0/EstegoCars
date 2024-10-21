import React, { useState, useEffect } from 'react';

export default ({ JWT }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleUploadImage = (jwt) => {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", jwt);

      const formdata = new FormData();
      formdata.append("image", file, file.name);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };

      fetch("/api/images/", requestOptions)
        .then(async (response) => {
          const imageResponse = await response.json();
          setUploadedImage(imageResponse.image_url);
        });
  }

  const handleSelectImage = (event) => {
      const file = event.target.files[0];
      setFile(file);
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
          setPreviewImage(fileReader.result);
      });
      fileReader.readAsDataURL(file);
  }

  return (
      <div>
          <input type="file" onChange={handleSelectImage} />
          {
              previewImage ?
                  <img src={previewImage} alt="preview-image" />
              :
                  null
          }
          {
              uploadedImage ?
                  <img src={uploadedImage} alt="uploaded-image" />
              :
                  null
          }
          <button onClick={() => handleUploadImage(JWT)}>Upload</button>
      </div>
  );
}
