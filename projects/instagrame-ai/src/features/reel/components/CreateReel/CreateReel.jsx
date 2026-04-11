import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReel } from '../../context/ReelContext';
import { useAuth } from '../../../auth/context/AuthContext';
import { CameraIcon, MusicIcon } from '../../../../shared/ui/Icons/Icons';
import styles from './CreateReel.module.scss';

export default function CreateReel() {
  const [caption, setCaption] = useState('');
  const [audio, setAudio] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const { createReel } = useReel();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleShare = () => {
    if (previewImage) {
      createReel({
        id: `reel-${Date.now()}`,
        user: currentUser,
        video: previewImage,
        thumbnail: previewImage,
        caption,
        likes: 0,
        isLiked: false,
        isSaved: false,
        comments: [],
        views: 0,
        audio: audio || `Original Audio - ${currentUser?.username}`,
        timestamp: 'Just now',
      });
      navigate('/reels');
    }
  };

  return (
    <div className={styles.createReel}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Create new reel</h2>
          {previewImage && (
            <button className={styles.shareBtn} onClick={handleShare}>
              Share
            </button>
          )}
        </div>

        <div className={styles.content}>
          {!previewImage ? (
            <div className={styles.uploadArea}>
              <CameraIcon size={48} />
              <p className={styles.uploadText}>Upload a video or photo for your reel</p>
              <label className={styles.selectBtn}>
                Select file
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                  hidden
                />
              </label>
            </div>
          ) : (
            <div className={styles.editor}>
              <div className={styles.preview}>
                <img src={previewImage} alt="Preview" className={styles.previewImg} />
              </div>
              <div className={styles.form}>
                <textarea
                  className={styles.captionInput}
                  placeholder="Write a caption..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  maxLength={2200}
                  rows={6}
                />

                <div className={styles.audioInput}>
                  <MusicIcon size={20} />
                  <input
                    type="text"
                    placeholder="Add audio name..."
                    value={audio}
                    onChange={(e) => setAudio(e.target.value)}
                    className={styles.textInput}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
