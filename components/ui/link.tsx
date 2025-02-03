import { ReactNode } from 'react';

export const ExternalLink = ({ href, text }: { href: string; text: ReactNode }) => (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline"
    >
      {text}
    </a>
  );