import { cn } from "@/src/lib/utils";

export const Heading = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
       <h1 className={cn("px-4 md:px-0 text-4xl md:text-6xl text-center md:text-left font-cormorantGaramond font-bold text-neutral-900 dark:text-neutral-100 py-4 tracking-tight", className)}>
        {children}
       </h1>
    );
}
export const SubHeading = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
       <h2 className={cn("px-4 md:px-0 text-[17px] md:text-xl text-center font-serif text-neutral-500 dark:text-neutral-300 py-4 font-light w-90 md:w-150 tracking-tight ", className)}>
        {children}
       </h2>
    );
}