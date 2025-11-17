import React from 'react';

export const IconWrapper: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    {children}
  </svg>
);

export const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></IconWrapper>
);
export const EducationIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20" /></IconWrapper>
);
export const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L16 6m-2 14l-2.293-2.293a1 1 0 010-1.414L14 18m-4-8v4m-2-2h4" /></IconWrapper>
);
export const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
    <IconWrapper className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></IconWrapper>
);
export const FlagIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></IconWrapper>
);
export const RocketIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></IconWrapper>
);
export const GalleryIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></IconWrapper>
);
export const ProjectIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></IconWrapper>
);
export const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></IconWrapper>
);
export const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></IconWrapper>
);
export const TargetIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></IconWrapper>
);
export const MailIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></IconWrapper>
);
export const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" /></IconWrapper>
);
export const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></IconWrapper>
);
export const ImageIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></IconWrapper>
);
export const VideoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></IconWrapper>
);
export const DocumentIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></IconWrapper>
);
export const LockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></IconWrapper>
);
export const PuzzleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></IconWrapper>
);
export const CommunityIcon: React.FC<{ className?: string }> = ({ className }) => (
    <IconWrapper className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></IconWrapper>
);
export const GiftIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 19.5v-8.25M21 11.25V8.25a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 8.25v3M21 11.25H3M12 21v-9.75M12 5.25v-1.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 5.25c0-1.5 1.5-2.25 3-2.25S13.5 3.75 13.5 5.25" />
  </IconWrapper>
);
export const GameControllerIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M11 18.571a14.88 14.88 0 005.143-1.071M16.143 17.5a14.88 14.88 0 00-5.143 1.071M11 18.571V15M16.143 17.5V15M5.857 15H4a1 1 0 01-1-1V7a1 1 0 011-1h1.857M5.857 15h4.286M5.857 15L8 12.857M10.143 15L8 12.857m2.143-2.857H12m6.143 2.857h1.857a1 1 0 001-1V7a1 1 0 00-1-1h-1.857m-4.286 8.571h4.286m0 0L16 12.857m-2.143 2.857L16 12.857m-2.143-2.857H14m-4 0h2m-4 0L8 10.143M8 12.857L8 10.143m0 0L6 8h2m6 0h2l2 2.143M12 10.143V8m0 0h-2" /></IconWrapper>
);
export const PencilIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconWrapper className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></IconWrapper>
);
export const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
    <IconWrapper className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></IconWrapper>
);


// Hobby Icons
export const FootballIcon: React.FC<{ className?: string }> = ({ className }) => (
    <IconWrapper className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M22 12l-2-7-7-2-7 2-2 7 2 7 7 2 7-2 2-7zm-10 4a4 4 0 100-8 4 4 0 000 8z"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 12l-1.12.38a3.18 3.18 0 00-.88 2.24l.38 3.18m-2.62-5.42l-2.24-.88a3.18 3.18 0 00-3.18.38l-1.5 1.5m8.54-1.9l2.24-.88a3.18 3.18 0 013.18.38l1.5 1.5m-8.54 1.9l1.12.38a3.18 3.18 0 01.88 2.24l-.38 3.18m2.62-5.42l2.24-.88a3.18 3.18 0 003.18.38l1.5 1.5" /></IconWrapper>
  );
  export const CalculatorIcon: React.FC<{ className?: string }> = ({ className }) => (
    <IconWrapper className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M5 2h14a2 2 0 012 2v16a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2zm4 8h6m-3-3v6m-4-2h.01M13 15h.01M9 15h.01M13 18h.01M9 18h.01" /></IconWrapper>
  );
  export const BookIcon: React.FC<{ className?: string }> = ({ className }) => (
    <IconWrapper className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2zm0 0l7 1.5M5 4l7 1.5V20M12 5.5L19 4m0 0v16" /></IconWrapper>
  );
export const CodeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <IconWrapper className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></IconWrapper>
);
export const ChessIcon: React.FC<{ className?: string }> = ({ className }) => (
    <IconWrapper className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C9.243 2 7 4.243 7 7c0 1.52.667 2.88 1.72 3.822L3 22h18l-5.72-11.178A4.957 4.957 0 0017 7c0-2.757-2.243-5-5-5zm0 3c.828 0 1.5.672 1.5 1.5S12.828 8 12 8s-1.5-.672-1.5-1.5S11.172 5 12 5zM9 12v2h6v-2H9z" /></IconWrapper>
);