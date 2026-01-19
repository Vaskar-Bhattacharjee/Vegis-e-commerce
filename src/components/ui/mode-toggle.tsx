import { cn } from "@/src/lib/utils";
import { IconBrightness } from "@tabler/icons-react";
import { useTheme } from "next-themes";


export const ModeToggle = () => {
        const { setTheme,resolvedTheme } = useTheme(); 
        const current = (resolvedTheme ?? 'light') as 'light' | 'dark';
    
      const themeChanger = () => {
        setTheme(current === 'dark' ? 'light' : 'dark');
      };
    return (
         <div onClick={themeChanger}> <IconBrightness className={cn("text-neutral-600 dark:text-gray-400 cursor-pointer transition-all duration-300 size-5 md:size-6 ",
                 current === 'dark' ? 'rotate-180' : 'rotate-0'
                 )}/> </div>
    );
}