import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Form } from "react-bootstrap";
import FirebaseStorageService from "../../FirebaseStorageService";

function AddFileForm({
  basePath,
  existingImageUrl,
  handleUploadFinish,
  handleUploadCancel,
}) {
  const [uploadProgress, setUploadProgress] = useState(-1);
  const [fileUrl, setFileUrl] = useState("");

  const fileInputRef = useRef();

  useEffect(() => {
    if (existingImageUrl) {
      setFileUrl(existingImageUrl);
    } else {
      setUploadProgress(-1);
      setFileUrl("");
      fileInputRef.current.value = null;
    }
  }, [existingImageUrl]);

  async function handleFileChanged(event) {
    const files = event.target.files;
    const file = files[0];

    if (!file) {
      alert("Please try again");
      return;
    }

    const generatedFileId = uuidv4();

    try {
      const downloadUrl = await FirebaseStorageService.uploadFile(
        file,
        `${basePath}/${generatedFileId}`,
        setUploadProgress
      );
      setFileUrl(downloadUrl);
      handleUploadFinish(downloadUrl);
    } catch (error) {
      setUploadProgress(-1);
      fileInputRef.current.value = null;
      alert(error.message);
      throw error;
    }
  }

  function handleCancelImageClick() {
    FirebaseStorageService.deleteFile(fileUrl);
    fileInputRef.current.value = null;
    setFileUrl("");
    setUploadProgress(-1);
    handleUploadCancel();
  }

  return (
    <div className="image-upload-preview-container">
      <Form.Control
        type="file"
        //accept="image/*"
        onChange={handleFileChanged}
        ref={fileInputRef}
        disabled={uploadProgress > -1 || fileUrl}
      />

      {!fileUrl && uploadProgress > -1 ? (
        <div>
          <label htmlFor="file">Upload Progress</label>{" "}
          <progress id="file" value={uploadProgress} max="100"></progress>
          {/* {uploadProgress}% */}
          <span>{uploadProgress}%</span>
        </div>
      ) : null}
      <br></br>
      {fileUrl ? (
        <div className="image-preview">
          <button
            type="button"
            onClick={handleCancelImageClick}
            className="primary-button"
          >
            Cancel File
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default AddFileForm;
