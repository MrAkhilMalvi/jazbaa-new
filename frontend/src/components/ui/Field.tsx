import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";

export const Field = ({
  label,
  children,
  focusState,
}: {
  label: string;
  children: React.ReactNode;
  focusState: boolean;
}) => (
  <div className="space-y-2">
    <Label
      className={cn(
        "text-xs uppercase tracking-widest font-bold transition-colors duration-300",
        focusState ? "text-[#ff6a3d]" : "text-slate-500 dark:text-white/40",
      )}
    >
      {label}
    </Label>
    {children}
  </div>
);