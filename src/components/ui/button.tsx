import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
  One shape rule: every button is a pill.
  Primary carries the accent. Secondary is a hairline. Ghost is a text link with padding.
  Press feedback is a 2% scale so it feels physical.
*/
const buttonVariants = cva(
  "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium cursor-pointer select-none transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-out-expo active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 shrink-0 outline-none focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-3",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-soft-sm hover:bg-primary/90",
        secondary:
          "bg-transparent text-foreground ring-1 ring-foreground/[0.12] hover:ring-foreground/[0.24] hover:bg-foreground/[0.03] dark:hover:bg-foreground/[0.05]",
        ghost:
          "bg-transparent text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04]",
        link:
          "rounded-none px-0 text-primary underline-offset-[0.2em] hover:underline",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90",
      },
      size: {
        default: "h-11 px-6 text-sm [&_svg]:size-4",
        sm: "h-9 px-4 text-sm [&_svg]:size-4",
        lg: "h-12 px-7 text-base [&_svg]:size-4",
        icon: "size-10 [&_svg]:size-5",
        "icon-sm": "size-9 [&_svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

/*
  Trailing icon nested in its own circle, flush with the button's right padding.
  On hover it moves diagonally up-right and grows a touch.
*/
function ButtonIcon({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      aria-hidden
      className={cn(
        "-mr-3 ml-1 inline-flex size-7 items-center justify-center rounded-full bg-black/10 transition-transform duration-300 ease-out-expo group-hover/btn:-translate-y-px group-hover/btn:translate-x-0.5 group-hover/btn:scale-105 dark:bg-white/15 [&_svg]:size-3.5",
        className
      )}
    >
      {children}
    </span>
  )
}

export { Button, ButtonIcon, buttonVariants }
