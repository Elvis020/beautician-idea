import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-pink-100 text-pink-700",
        secondary: "bg-zinc-100 text-zinc-700",
        nails: "bg-purple-100 text-purple-700",
        makeup: "bg-rose-100 text-rose-700",
        wig: "bg-amber-100 text-amber-700",
        wedding: "bg-pink-100 text-pink-700",
        party: "bg-violet-100 text-violet-700",
        funeral: "bg-zinc-200 text-zinc-700",
        office: "bg-blue-100 text-blue-700",
        casual: "bg-green-100 text-green-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
