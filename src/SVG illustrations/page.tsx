import React from "react";
import { cn } from "@/src/lib/utils";

interface BarViewProps extends  React.HTMLAttributes<HTMLDivElement>{
  size?: number; 
  rotate?: string
}

export const BarView = ({ className, size = 16,rotate, ...props }: BarViewProps) => {
  return (
    <div 
      {...props}
    className={cn("size-8 md:size-10 flex justify-center items-center bg-transparent border border-neutral-400 hover:border-neutral-600 cursor-pointer rounded-md", className)}>
      <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      style={{
        rotate: rotate
      }}
      className={cn("shrink-0")}
     
    >
      <rect x="1" y="1" width="3" height="14" />
      <rect x="5" y="1" width="3" height="14" />
      <rect x="9" y="1" width="3" height="14" />
      <rect x="13" y="1" width="2" height="14" />
    </svg>

    </div>

  );
};

export const BarViewThree = ({
  className,
  size = 16,
  ...props
}: BarViewProps) => {
  return (
    <div 
    {...props}
    className={cn("hidden md:size-10  md:flex justify-center items-center bg-transparent border border-neutral-400 hover:border-neutral-600 cursor-pointer rounded-md", className)}>
      <svg 
      className={cn("hidden md:flex shrink-0", className)}
      width={size}
      height={size}
      viewBox="0 0 16 16" 
      fill="currentColor"

>
              <rect x="1" y="1" width="4" height="14"></rect>
              <rect x="6" y="1" width="4" height="14"></rect>
              <rect x="11" y="1" width="4" height="14"></rect>
            </svg>
    </div>
  )
}

export const BarViewTwo = ({
  className,
  size = 16,
  ...props
}: BarViewProps) => {
  return (
    <div
    {...props}
    className={cn("hidden md:size-10 md:flex justify-center items-center bg-transparent border border-neutral-400 hover:border-neutral-600 cursor-pointer rounded-md", className)}>
        <svg 
          width={size}
          height={size}
          viewBox="0 0 16 16"
          fill="currentColor"         
          className={cn("hidden md:flex shrink-0", className)}
          
        >
                <rect x="1" y="1" width="6" height="14"></rect>
                <rect x="9" y="1" width="6" height="14"></rect>
        </svg>
    </div>
  )
}

export const GridView = ({
  className,
  size = 16,
  ...props
}: BarViewProps) => {
  return (
    <div 
    {...props}
    className={cn("size-8 md:size-10 flex justify-center items-center bg-transparent border border-neutral-400 hover:border-neutral-600 cursor-pointer rounded-md", className)}>
       <svg 
       className={cn("shrink-0", className)}
       width={size}
       height={size}
       viewBox="0 0 16 16" 
       fill="currentColor"
       >
              <rect x="1" y="1" width="4" height="4"></rect>
              <rect x="7" y="1" width="4" height="4"></rect>
              <rect x="13" y="1" width="2" height="4"></rect>
              <rect x="1" y="7" width="4" height="4"></rect>
              <rect x="7" y="7" width="4" height="4"></rect>
              <rect x="13" y="7" width="2" height="4"></rect>
              <rect x="1" y="13" width="4" height="2"></rect>
              <rect x="7" y="13" width="4" height="2"></rect>
              <rect x="13" y="13" width="2" height="2"></rect>
            </svg>
    </div>
  )
}