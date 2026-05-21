import React from "react";

export const InstagramLogo = ({ className }) => (
  <svg
    aria-label="Instagram"
    className={className}
    fill="currentColor"
    height="29"
    viewBox="0 0 119.5 35"
    width="103"
  >
    <path
      d="M7.64 35c-4.2 0-7.64-3.32-7.64-7.4V7.4C0 3.32 3.44 0 7.64 0h104.2c4.2 0 7.64 3.32 7.64 7.4v20.2c0 4.08-3.44 7.4-7.64 7.4H7.64z"
      fill="transparent"
    />
    <path d="M6.44 7.65c0 1.43-1.15 2.58-2.58 2.58S1.28 9.08 1.28 7.65 2.43 5.07 3.86 5.07s2.58 1.15 2.58 2.58z" />
  </svg>
);

export const HomeIcon = ({ size = 24, className, filled }) => (
  <svg className={className} height={size} width={size} viewBox="0 0 24 24">
    {filled ? (
      <path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543l10-9.543 10 9.543V22a1 1 0 0 1-1 1Z" />
    ) : (
      <path
        d="M2 11.543 12 2l10 9.543V22h-7v-5.455a3 3 0 0 0-6 0V22H2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    )}
  </svg>
);

export const SearchIcon = ({ size = 24, className, filled }) => (
  <svg className={className} height={size} width={size} viewBox="0 0 24 24">
    <circle
      cx="10.5"
      cy="10.5"
      r={filled ? 8 : 8.5}
      fill="none"
      stroke="currentColor"
      strokeWidth={filled ? 3 : 2}
    />
    <line
      x1="16.5"
      y1="16.5"
      x2="22"
      y2="22"
      stroke="currentColor"
      strokeWidth={filled ? 3 : 2}
    />
  </svg>
);

export const ExploreIcon = ({ size = 24, className, filled }) => (
  <svg className={className} height={size} width={size} viewBox="0 0 24 24">
    {filled ? (
      <path d="m13.173 13.164 1.491-3.829-3.83 1.49Z" />
    ) : (
      <>
        <polygon
          points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="12"
          cy="12"
          r="10.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </>
    )}
  </svg>
);

export const CreateIcon = ({ size = 24, className }) => (
  <svg className={className} height={size} width={size} viewBox="0 0 24 24">
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="12"
      y1="6"
      x2="12"
      y2="18"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="6"
      y1="12"
      x2="18"
      y2="12"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export const HeartIcon = ({ size = 24, className, filled }) => (
  <svg className={className} height={size} width={size} viewBox="0 0 24 24">
    <path
      d="M12 21s-7-4.35-9-8.5S4.5 3 8 3c2 0 3 1.5 4 2.5C13 4.5 14 3 16 3c3.5 0 5 2.5 5 5.5S12 21 12 21z"
      fill={filled ? "#ed4956" : "none"}
      stroke="currentColor"
    />
  </svg>
);

export const CommentIcon = ({ size = 24, className }) => (
  <svg className={className} height={size} width={size} viewBox="0 0 24 24">
    <path
      d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export const ShareIcon = ({ size = 24, className }) => (
  <svg className={className} height={size} width={size} viewBox="0 0 24 24">
    <line x1="22" y1="3" x2="9" y2="10" stroke="currentColor" strokeWidth="2" />
    <polygon
      points="22 3 2 3 9 10 11 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export const SaveIcon = ({ size = 24, className }) => (
  <svg className={className} height={size} width={size} viewBox="0 0 24 24">
    <polygon
      points="20 21 12 13 4 21 4 3 20 3"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export const ProfileIcon = ({ size = 24, className }) => (
  <svg className={className} height={size} width={size} viewBox="0 0 24 24">
    <circle
      cx="12"
      cy="8"
      r="3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M4 20a8 8 0 0 1 16 0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export const GridIcon = ({ size = 24, className }) => (
  <svg className={className} height={size} width={size} viewBox="0 0 24 24">
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" />
    <line x1="3" y1="15" x2="21" y2="15" stroke="currentColor" />
  </svg>
);

export const SettingsIcon = ({ size = 24, className }) => (
  <svg className={className} height={size} width={size} viewBox="0 0 24 24">
    <circle
      cx="12"
      cy="12"
      r="8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export const CloseIcon = ({ size = 24, className }) => (
  <svg className={className} height={size} width={size} viewBox="0 0 24 24">
    <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="2" />
    <line x1="21" y1="3" x2="3" y2="21" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const MoreIcon = ({ size = 24, className }) => (
  <svg className={className} height={size} width={size}>
    <circle cx="5" cy="12" r="1.5" />
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="19" cy="12" r="1.5" />
  </svg>
);

export const BackIcon = ({ size = 24, className }) => (
  <svg className={className} height={size} width={size} viewBox="0 0 24 24">
    <line
      x1="2"
      y1="12"
      x2="22"
      y2="12"
      stroke="currentColor"
      strokeWidth="2"
    />
    <polyline
      points="9 5 2 12 9 19"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export const PlayIcon = ({ size = 24, className }) => (
  <svg
    className={className}
    height={size}
    width={size}
    viewBox="0 0 24 24"
    fill="none"
  >
    <polygon points="8 5 19 12 8 19" fill="currentColor" />
  </svg>
);

export const PauseIcon = ({ size = 24, className }) => (
  <svg
    className={className}
    height={size}
    width={size}
    viewBox="0 0 24 24"
    fill="none"
  >
    <rect x="6" y="5" width="4" height="14" fill="currentColor" />
    <rect x="14" y="5" width="4" height="14" fill="currentColor" />
  </svg>
);

export const SoundOnIcon = ({ size = 24, className }) => (
  <svg
    className={className}
    height={size}
    width={size}
    viewBox="0 0 24 24"
    fill="none"
  >
    <polygon points="3 9 7 9 12 5 12 19 7 15 3 15" fill="currentColor" />

    <path
      d="M16 9C17.5 10.2 17.5 13.8 16 15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />

    <path
      d="M18.5 6.5C21.5 9 21.5 15 18.5 17.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const SoundOffIcon = ({ size = 24, className }) => (
  <svg
    className={className}
    height={size}
    width={size}
    viewBox="0 0 24 24"
    fill="none"
  >
    <polygon points="3 9 7 9 12 5 12 19 7 15 3 15" fill="currentColor" />

    <line
      x1="16"
      y1="8"
      x2="21"
      y2="16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />

    <line
      x1="21"
      y1="8"
      x2="16"
      y2="16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
