import { Metadata } from "./metadata";
import { LanguageProvider } from "../contexts/LanguageContext";

interface ProviderProps {
  children: React.ReactNode;
  hideRunableBadge?: boolean;
}

export function Provider({ children, hideRunableBadge = false }: ProviderProps) {
  return (
    <LanguageProvider>
      <Metadata />
      {children}
      {!hideRunableBadge && (
        <style>{`
          /* Hide Runable badge */
          [data-runable-badge],
          a[href*="runable.io"],
          div[class*="runable"],
          div[class*="badge"] {
            display: none !important;
          }
        `}</style>
      )}
    </LanguageProvider>
  );
}