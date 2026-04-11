export function HomeIcon({ active = false, size = 24 }) {
  if (active) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005z" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005z" />
    </svg>
  );
}

export function ExploreIcon({ active = false, size = 24 }) {
  if (active) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20m0 2a8 8 0 0 1 6.32 12.906l-5.375-5.375A1 1 0 0 0 9.24 9.24l5.375 5.375A8 8 0 1 1 10 2" transform="translate(1 1)" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function ReelsIcon({ active = false, size = 24 }) {
  if (active) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0m4.3 13.3-6 4c-.2.1-.3.2-.5.2-.2 0-.3 0-.5-.1-.3-.2-.5-.5-.5-.9V7.5c0-.4.2-.7.5-.9s.7-.2 1 0l6 4c.3.2.4.5.4.9s-.2.6-.4.8" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2" />
      <path d="m9.5 8.5 7 3.5-7 3.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function NewPostIcon({ active = false, size = 24 }) {
  if (active) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M2 12v3.45c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.849 0 4.006-.699 4.946-1.607C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z" />
        <line x1="6.545" y1="12.001" x2="17.455" y2="12.001" stroke="var(--bg-primary, #000)" strokeWidth="2" strokeLinecap="round" />
        <line x1="12" y1="6.545" x2="12" y2="17.455" stroke="var(--bg-primary, #000)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <line x1="7.5" y1="12" x2="16.5" y2="12" />
      <line x1="12" y1="7.5" x2="12" y2="16.5" />
    </svg>
  );
}

export function HeartIcon({ active = false, size = 24 }) {
  if (active) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#ed4956">
        <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-1.834-1.526-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-1.834-1.526-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938" />
    </svg>
  );
}

export function CommentIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22z" strokeLinejoin="round" />
    </svg>
  );
}

export function ShareIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="22" y1="3" x2="9.218" y2="10.083" />
      <polygon points="22 3 15 22 11 13 2 9" />
    </svg>
  );
}

export function SaveIcon({ active = false, size = 24 }) {
  if (active) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <polygon points="20 21 12 13.44 4 21 4 3 20 3" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="20 21 12 13.44 4 21 4 3 20 3" />
    </svg>
  );
}

export function MoreIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="6" cy="12" r="1.5" />
      <circle cx="18" cy="12" r="1.5" />
    </svg>
  );
}

export function GridIcon({ active = false, size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 1.5}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

export function ReelsGridIcon({ active = false, size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 1.5}>
      <rect x="3" y="1" width="18" height="22" rx="2" />
      <line x1="9.015" y1="1" x2="9.015" y2="23" />
      <line x1="14.985" y1="1" x2="14.985" y2="23" />
      <line x1="3" y1="8" x2="21" y2="8" />
      <line x1="3" y1="16" x2="21" y2="16" />
    </svg>
  );
}

export function SavedGridIcon({ active = false, size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 1.5}>
      <polygon points="20 21 12 13.44 4 21 4 3 20 3" />
    </svg>
  );
}

export function BackIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16.502 3 7.498 12 16.502 21" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
      <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
    </svg>
  );
}

export function SettingsIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="4" x2="21" y2="4" strokeLinecap="round" />
      <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
      <line x1="3" y1="20" x2="21" y2="20" strokeLinecap="round" />
    </svg>
  );
}

export function CameraIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

export function MusicIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
    </svg>
  );
}

export function VerifiedIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="#0095f6">
      <path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0z" />
      <path d="M17.79 27.61 10.55 20.37l2.83-2.83 4.41 4.41 10.2-10.2 2.83 2.83z" fill="#fff" />
    </svg>
  );
}

export function InstagramLogo({ size = 103 }) {
  return (
    <svg width={size} height={29} viewBox="0 0 103 29" fill="currentColor">
      <path d="M5.23 7.18a3.41 3.41 0 1 1-6.82 0 3.41 3.41 0 0 1 6.82 0m.29 3.27H-1.3v18.37h6.82zm10.87 0h-6.55v18.37h6.55v-9.63c0-5.36 6.96-5.8 6.96 0v9.63h6.58v-11.6c0-9.05-10.3-8.72-13.54-4.27zM48.7 7.18c0-4.08-3.31-7.18-7.68-7.18-4.24 0-7.89 3.27-7.89 7.18 0 4.08 3.49 7.28 7.89 7.28 4.27 0 7.68-3.17 7.68-7.28m-6.55 0a1.23 1.23 0 0 1-1.13 1.3c-.7 0-1.33-.53-1.33-1.3s.56-1.2 1.33-1.2 1.13.5 1.13 1.2" transform="translate(1 0)" />
      <text x="1" y="24" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" fontSize="22" fontWeight="400" fontStyle="italic" fill="currentColor">Instagram</text>
    </svg>
  );
}

export function InstagramTextLogo() {
  return (
    <div style={{ fontFamily: 'inherit', fontSize: '22px', fontWeight: 500, letterSpacing: '-0.5px' }}>
      Instagram
    </div>
  );
}
