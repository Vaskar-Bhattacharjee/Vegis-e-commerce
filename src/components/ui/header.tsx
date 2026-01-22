import { cn } from "@/src/lib/utils";

export const Heading = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
       <h1 className={cn("text-6xl text-left font-cormorantGaramond font-bold text-neutral-900 dark:text-neutral-100 py-4 tracking-tight", className)}>
        {children}
       </h1>
    );
}
export const SubHeading = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
       <h2 className={cn("text-2xl md:text-xl text-left font-serif text-neutral-500 dark:text-neutral-300 py-4 font-light w-150 text-center", className)}>
        {children}
       </h2>
    );
}