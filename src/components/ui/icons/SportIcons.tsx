import { cn } from "@/lib/utils";

interface IconProps {
  className?: string;
}

export function CricketIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("w-6 h-6", className)}>
      <path d="M12 2L13.09 8.26L19 6L14.74 10.91L21 12L14.74 13.09L19 18L13.09 15.74L12 22L10.91 15.74L5 18L9.26 13.09L3 12L9.26 10.91L5 6L10.91 8.26L12 2Z" fill="currentColor" opacity="0.2"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M12 9V3M12 15V21M9 12H3M15 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <rect x="10.5" y="2" width="3" height="2" rx="0.5" fill="currentColor"/>
    </svg>
  );
}

export function FootballIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("w-6 h-6", className)}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 3L14.5 7.5L19.5 8L16 11.5L17 16.5L12 14L7 16.5L8 11.5L4.5 8L9.5 7.5L12 3Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.15"/>
      <path d="M12 3V7.5M19.5 8L16 11.5M17 16.5L12 14M7 16.5L8 11.5M4.5 8L9.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function BasketballIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("w-6 h-6", className)}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 3C12 3 12 12 12 21M3 12C3 12 12 12 21 12" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5.64 5.64C5.64 5.64 9.5 9.5 12 12C14.5 14.5 18.36 18.36 18.36 18.36" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M18.36 5.64C18.36 5.64 14.5 9.5 12 12C9.5 14.5 5.64 18.36 5.64 18.36" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

export function NBAIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("w-6 h-6", className)}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M12 3V21M4.5 8.5L19.5 15.5M19.5 8.5L4.5 15.5" stroke="currentColor" strokeWidth="1"/>
      <path d="M12 12L12.9 13.8L14.9 14.05L13.45 15.45L13.75 17.45L12 16.5L10.25 17.45L10.55 15.45L9.1 14.05L11.1 13.8L12 12Z" fill="currentColor"/>
    </svg>
  );
}

export function NFLIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("w-6 h-6", className)}>
      <ellipse cx="12" cy="12" rx="8" ry="5" stroke="currentColor" strokeWidth="1.5" transform="rotate(-15 12 12)"/>
      <path d="M8 12H16M9 9.5L15 9.5M9 14.5L15 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 7V17" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5.5 8.5L4 7M18.5 8.5L20 7M5.5 15.5L4 17M18.5 15.5L20 17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

export function F1Icon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("w-6 h-6", className)}>
      <rect x="4" y="9" width="16" height="6" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 9V7H11V9M13 9V7H17V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="8" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="16" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 13.5V12M16 13.5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="2" y="10" width="2" height="4" rx="0.5" fill="currentColor" opacity="0.3"/>
      <rect x="20" y="10" width="2" height="4" rx="0.5" fill="currentColor" opacity="0.3"/>
    </svg>
  );
}

export function HandballIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("w-6 h-6", className)}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" fill="currentColor" opacity="0.1"/>
      <path d="M12 3.5V20.5" stroke="currentColor" strokeWidth="1"/>
      <path d="M5.5 8C5.5 8 3 10 3 12.5M18.5 8C18.5 8 21 10 21 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M7 5.5C7 5.5 5 7 5.5 9M17 5.5C17 5.5 19 7 18.5 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
      <path d="M9.5 4.5L10.5 6.5M14.5 4.5L13.5 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
    </svg>
  );
}

export function BaseballIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("w-6 h-6", className)}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
      <path d="M5.5 6.5C6 7 6.5 8 6.5 9C6.5 10 6 11 5.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8.5 4C9 5 9.5 6.5 9.5 8C9.5 9.5 9 11 8.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M15.5 4C15 5 14.5 6.5 14.5 8C14.5 9.5 15 11 15.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M18.5 6.5C18 7 17.5 8 17.5 9C17.5 10 18 11 18.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function HockeyIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("w-6 h-6", className)}>
      <rect x="3" y="14" width="18" height="3" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.15"/>
      <path d="M6 14V11L12 8L18 11V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="13" r="1.5" fill="currentColor"/>
      <path d="M8 8H16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

export function RugbyIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("w-6 h-6", className)}>
      <ellipse cx="12" cy="12" rx="8" ry="5" stroke="currentColor" strokeWidth="1.5" transform="rotate(15 12 12)" fill="currentColor" opacity="0.1"/>
      <path d="M9 8.5L9 15.5M11 8.5L11 15.5M13 8.5L13 15.5M15 8.5L15 15.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M8 11H16" stroke="currentColor" strokeWidth="1"/>
    </svg>
  );
}

export function VolleyballIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("w-6 h-6", className)}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 3C12 3 8 7.5 8 12C8 16.5 12 21 12 21" stroke="currentColor" strokeWidth="1.2" fill="currentColor" opacity="0.1"/>
      <path d="M12 3C12 3 16 7.5 16 12C16 16.5 12 21 12 21" stroke="currentColor" strokeWidth="1.2" fill="currentColor" opacity="0.1"/>
      <path d="M3 12H21" stroke="currentColor" strokeWidth="1"/>
      <path d="M4.5 7H19.5" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
      <path d="M4.5 17H19.5" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
    </svg>
  );
}

export function MMAIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("w-6 h-6", className)}>
      <path d="M6 8C6 8 6 4 10 4C14 4 14 8 14 8V12C14 12 14 16 10 16C6 16 6 12 6 12V8Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.1"/>
      <path d="M10 8C10 8 10 5 13 5C16 5 16 8 16 8V12C16 12 16 15 13 15" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 10H4M14 10H16M16 10H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="9" cy="10" r="0.8" fill="currentColor"/>
      <circle cx="12" cy="10" r="0.8" fill="currentColor"/>
    </svg>
  );
}

export function AFLIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("w-6 h-6", className)}>
      <ellipse cx="12" cy="12" rx="9" ry="7" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.08"/>
      <path d="M8 8L10 12L8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 8L14 12L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9 6L12 4L15 6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
    </svg>
  );
}

export const sportIcons: Record<string, React.ComponentType<IconProps>> = {
  cricket: CricketIcon,
  football: FootballIcon,
  basketball: BasketballIcon,
  nfl: NFLIcon,
  "formula-1": F1Icon,
  handball: HandballIcon,
  baseball: BaseballIcon,
  hockey: HockeyIcon,
  rugby: RugbyIcon,
  volleyball: VolleyballIcon,
  mma: MMAIcon,
  afl: AFLIcon,
  nba: NBAIcon,
};
