import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePost } from '../../context/PostContext';
import { useAuth } from '../../../auth/context/AuthContext';
import Avatar from '../../../../shared/ui/Avatar/Avatar';
import { CameraIcon, CloseIcon } from '../../../../shared/ui/Icons/Icons';
import styles from './CreatePost.module.scss';

export default function CreatePost() {
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const { createPost } = usePost();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleShare = () => {
    if (previewImage) {
      createPost({
        id: `post-${Date.now()}`,
        user: currentUser,
        images: [previewImage],
        caption,
        likes: 0,
        isLiked: false,
        isSaved: false,
        comments: [],
        timestamp: 'Just now',
        location,
      });
      navigate('/');
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
  };

  return (
    <div className={styles.createPost}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Create new post</h2>
          {previewImage && (
            <button className={styles.shareBtn} onClick={handleShare}>
              Share
            </button>
          )}
        </div>

        <div className={styles.content}>
          {!previewImage ? (
            <div
              className={`${styles.dropzone} ${dragActive ? styles.dragActive : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <CameraIcon size={48} />
              <p className={styles.dropzoneText}>Drag photos and videos here</p>
              <label className={styles.selectBtn}>
                Select from computer
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  hidden
                />
              </label>
            </div>
          ) : (
            <div className={styles.editor}>
              <div className={styles.preview}>
                <img src={previewImage} alt="Preview" className={styles.previewImg} />
                <button className={styles.removeBtn} onClick={handleRemoveImage}>
                  <CloseIcon size={16} />
                </button>
              </div>
              <div className={styles.form}>
                <div className={styles.formUser}>
                  <Avatar src={currentUser?.avatar} size={28} />
                  <span>{currentUser?.username}</span>
                </div>
                <textarea
                  className={styles.captionInput}
                  placeholder="Write a caption..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  maxLength={2200}
                  rows={8}
                />
                <div className={styles.charCount}>
                  {caption.length}/2,200
                </div>
                <input
                  type="text"
                  className={styles.locationInput}
                  placeholder="Add location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
