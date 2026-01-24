import Link from "next/link";
import { Logo } from "../ui/navbar";
import { IconBrandGithub, IconBrandLinkedin, IconBrandX } from "@tabler/icons-react";
import { Container } from "../ui/container";
import { cn } from "@/src/lib/utils";


export const Footer = () => {
    return (
        <Container className="bg-neutral-900 flex flex-col  justify-center items-center rounded-t-3xl mt-20 ">
            <div
        className={cn(
          "absolute inset-0",
          "bg-size-[35px_35px]",
          "bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "opacity-7 mask-l-from-70% mask-r-from-70% mask-t-from-70% mask-b-from-70% ",
        )}
      />    
            <div className="z-1 grid grid-cols-1 md:grid-cols-5 gap-8 py-10 px-16 ">
                <div className="py-4 mx-auto px-4 flex flex-col col-span-2 items-start justify-between gap-1 lg:mr-18">
                    <Logo className="text-white md:text-6xl -mb-3 col-span-1" />
                    <p className="text-sm font-semibold text-left text-neutral-400 w-full    mt-2">
                            Fashioneate is where timeless elegance meets modern craftsmanship. 
                            We provide premium quality apparel for men, women, and children 
                            who value style without compromise. Elevate your everyday wardrobe 
                            with the art of dressing well. Shop now and elevate your style.
                    </p>
                    <div className="flex gap-2 mt-5">
                        <span className="text-neutral-400 text-md font-semibold">Follow us on:</span>
                        <div className="flex gap-2 md:gap-3">
                            <Link href="#" className="text-neutral-400 hover:text-white transition-colors"><IconBrandLinkedin /></Link>
                            <Link href="#" className="text-neutral-400 hover:text-white transition-colors"><IconBrandX /></Link>
                            <Link href="#" className="text-neutral-400 hover:text-white transition-colors"><IconBrandGithub /></Link>
                        </div>                   
                
                    </div>
               


                </div>

                <GridElement
                    heading="About Us"
                    element1="Our Story"
                    element2="Our Team"
                    element3="Careers"
                    element4="Press"
                />

                <GridElement
                    heading="Customer Service"
                    element1="Shipping & Returns"
                    element2="Contact Us"
                    element3="FAQs"
                />

                <GridElement
                    heading="Legal"
                    element1="Privacy Policy"
                    element2="Terms & Conditions"
                />
            </div>

            <div className="w-full md:w-300 h-px bg-neutral-400 mb-2"></div>

             <div className="text-neutral-300 mb-2">
                    © {new Date().getFullYear()} <span className="font-semibold">Fashioneate</span>. All rights reserved.
                </div>
            
        </Container>
    );
};
export const GridElement = ({
    heading,
    element1,
    element2,
    element3,
    element4}:{
    heading: string,
    element1: string,
    element2: string,
    element3?: string,
    element4?: string
    }) => {
    return (
               <div className="flex flex-col gap-4 lg:pt-10">
                    <h4 className="text-lg font-bold mb-4">{heading}</h4>
                    
                    <div className="flex flex-col gap-2">
                    <Link href="#" className="text-neutral-400 hover:text-white transition-colors">{element1}</Link>
                    <Link href="#" className="text-neutral-400 hover:text-white transition-colors">{element2}</Link>
                    <Link href="#" className="text-neutral-400 hover:text-white transition-colors">{element3}</Link>
                    <Link href="#" className="text-neutral-400 hover:text-white transition-colors">{element4}</Link>
                    </div>
                   
                </div>
    );
}