import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "glow";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98]": variant === "default",
            "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40": variant === "destructive",
            "border border-border bg-transparent hover:bg-secondary/50 hover:border-cyan-500/50": variant === "outline",
            "bg-secondary/50 text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
            "hover:bg-secondary/50 hover:text-foreground": variant === "ghost",
            "text-cyan-400 underline-offset-4 hover:underline": variant === "link",
            "bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/10": variant === "glow",
            "h-10 px-5 py-2": size === "default",
            "h-8 rounded-lg px-3 text-xs": size === "sm",
            "h-12 rounded-xl px-8 text-base": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
