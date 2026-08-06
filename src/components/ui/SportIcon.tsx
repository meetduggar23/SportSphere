import { sportIcons } from "@/components/ui/icons/SportIcons";
import { cn } from "@/lib/utils";

interface SportIconProps {
  sport: string;
  className?: string;
}

export function SportIcon({ sport, className }: SportIconProps) {
  const IconComponent = sportIcons[sport];

  if (!IconComponent) {
    return (
      <div className={cn("w-6 h-6 rounded-full bg-muted/20 flex items-center justify-center text-xs", className)}>
        {sport.charAt(0).toUpperCase()}
      </div>
    );
  }

  return <IconComponent className={className} />;
}
