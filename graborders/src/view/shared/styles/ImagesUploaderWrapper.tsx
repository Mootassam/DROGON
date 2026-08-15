
import styled from "styled-components";

const ImagesUploaderWrapper = styled.div`
/* ImagesUploader.css or add to your style tag */
.images-uploader-wrapper {
  width: 100%;
  margin-bottom: 16px;
}

.upload-area {
  border: 2px dashed #e7eaee;
  border-radius: 12px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: #f8f9fa;
  position: relative;
}

.upload-area:hover {
  border-color: #106cf5;
  background: #f0f7ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 108, 245, 0.1);
}

.upload-area:active {
  transform: translateY(0);
}

.upload-icon {
  font-size: 48px;
  color: #106cf5;
  margin-bottom: 16px;
  opacity: 0.8;
}

.upload-text {
  font-size: 16px;
  font-weight: 600;
  color: #222;
  margin-bottom: 8px;
}

.upload-subtext {
  font-size: 12px;
  color: #888f99;
  font-weight: 400;
}

/* Upload card for showing uploaded image */
.upload-card {
  border: 1px solid #e7eaee;
  border-radius: 12px;
  padding: 16px;
  background: #fff;
  transition: all 0.3s ease;
}

.upload-card:hover {
  border-color: #106cf5;
  box-shadow: 0 4px 12px rgba(16, 108, 245, 0.1);
}

.uploaded-box {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
}

.uploaded-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 6px;
}

/* Image buttons */
.img-buttons {
  position: absolute;
  bottom: 12px;
  right: 12px;
  display: flex;
  gap: 8px;
  background: rgba(0, 0, 0, 0.6);
  padding: 6px 10px;
  border-radius: 20px;
  backdrop-filter: blur(4px);
}

.img-buttons button {
  background: none;
  border: none;
  color: white;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
}

.img-buttons button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.img-buttons button:active {
  transform: scale(0.95);
}

/* Loading state */
.upload-area.loading {
  opacity: 0.7;
  cursor: not-allowed;
}

.upload-area.loading .upload-icon {
  animation: spin 1s linear infinite;
}

/* Responsive adjustments */
@media (max-width: 380px) {
  .upload-area {
    padding: 30px 16px;
  }
  
  .upload-icon {
    font-size: 36px;
    margin-bottom: 12px;
  }
  
  .upload-text {
    font-size: 14px;
  }
  
  .upload-subtext {
    font-size: 11px;
  }
  
  .uploaded-box {
    height: 160px;
  }
  
  .upload-card {
    padding: 12px;
  }
}

/* Animations */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Progress indicator for upload */
.upload-progress {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: #e7eaee;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
}

.upload-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #106cf5 0%, #0a4fc4 100%);
  transition: width 0.3s ease;
}

/* Error state */
.upload-area.error {
  border-color: #f44336;
  background: #fff5f5;
}

.upload-area.error .upload-icon {
  color: #f44336;
}

.upload-area.error .upload-text {
  color: #f44336;
}

/* Success state */
.upload-area.success {
  border-color: #37b66a;
  background: #f7fdf9;
}

.upload-area.success .upload-icon {
  color: #37b66a;
}

.upload-area.success .upload-text {
  color: #37b66a;
}

`;

export default ImagesUploaderWrapper;
