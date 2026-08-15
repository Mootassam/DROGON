import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import FileUploader from "src/modules/shared/fileUpload/fileUploader";
import Errors from "src/modules/shared/error/errors";
import ImagesUploaderWrapper from "src/view/shared/styles/ImagesUploaderWrapper";
import ImageModal from "src/view/shared/modals/ImageModal";

function ImagesUploader(props) {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<any>(null);
  const input = useRef<any>();

  const value = () => {
    const { value } = props;
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  };

  const handleRemove = (id) => {
    const newValue = value().filter((item) => item.id !== id);
    props.onChange(newValue);
  };

  const handleChange = async (event) => {
    try {
      const files = event.target.files;
      if (!files || !files.length) return;

      let file = files[0];

      FileUploader.validate(file, {
        storage: props.storage,
        image: true,
      });

      setLoading(true);

      file = await FileUploader.upload(file, {
        storage: props.storage,
        image: true,
      });

      if (input?.current) input.current.value = null;
      setLoading(false);

      // always keep only one image
      props.onChange([file]);
    } catch (error) {
      if (input?.current) input.current.value = null;
      console.error(error);
      setLoading(false);
      Errors.showMessage(error);
    }
  };

  const doPreviewImage = (image) => {
    setImage({
      src: image.downloadUrl,
      alt: image.name,
    });
  };

  const doCloseImageModal = () => {
    setImage(null);
  };

  const { readonly } = props;

  const uploadButton = (
    <label>
      <div className="upload-area">
        <div className="upload-icon">
          <i className="fas fa-cloud-upload-alt" />
        </div>
        <div className="upload-text">{props.text}</div>
        <div className="upload-subtext">JPG, PNG or PDF, max 5MB</div>

        <input
          style={{ display: "none" }}
          disabled={loading || readonly}
          accept="image/*"
          type="file"
          onChange={handleChange}
          ref={input}
        />
      </div>
    </label>
  );

  return (
    <ImagesUploaderWrapper>
      {/* Show Upload button only if no image */}
      {readonly || value().length > 0 ? null : uploadButton}

      {/* Show uploaded image(s) */}
      {value().length > 0 && (
        <div className="upload-card">
          {value().length === 0
            ? // Show Upload button
              uploadButton
            : // Show Uploaded Image (inside same styled box)
              value().map((item) => (
                <div className="uploaded-box" key={item.id || item.name}>
                  <img
                    alt={item.name}
                    src={item.downloadUrl}
                    className="uploaded-img"
                  />

                  <div className="img-buttons">
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={() => doPreviewImage(item)}
                    >
                      <i className="fas fa-search"></i>
                    </button>
                    {!readonly && (
                      <button
                        type="button"
                        className="btn btn-link ml-2"
                        onClick={() => handleRemove(item.id)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    )}
                  </div>
                </div>
              ))}
        </div>
      )}

      {image && (
        <ImageModal
          src={image.src}
          alt={image.alt}
          onClose={doCloseImageModal}
        />
      )}
    </ImagesUploaderWrapper>
  );
}

ImagesUploader.propTypes = {
  readonly: PropTypes.bool,
  storage: PropTypes.object,
  value: PropTypes.any,
  onChange: PropTypes.func,
  text: PropTypes.string,
};

ImagesUploader.defaultProps = {
  text: "Upload",
};

export default ImagesUploader;
