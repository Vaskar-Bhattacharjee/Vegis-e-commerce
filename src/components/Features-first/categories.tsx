'use client';
import { IconArrowUpRight } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeader } from "../ui/section-header";


const categoryData = [
    { 
        name: "Women's Fashion", 
        image: "https://images.pexels.com/photos/3965543/pexels-photo-3965543.jpeg",
        count: "120+ Items"
    },
    { 
        name: "Men's Fashion", 
        image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
        count: "85+ Items"
    },
    { 
        name: "Kids' Fashion", 
        image: "https://images.pexels.com/photos/1619697/pexels-photo-1619697.jpeg",
        count: "60+ Items"
    },
    { 
        name: "Wedding Collection", 
        image: "https://images.pexels.com/photos/1730877/pexels-photo-1730877.jpeg",
        count: "40+ Items"
    },
];

export const Categories = () => {
    return (
        <section className=" bg-white">
            <div className="max-w-350 mx-auto px-6">
                
               
                <SectionHeader Subheading="Curated Collections" Heading="Top Categories" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {categoryData.map((cat, i) => (
                        <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2}}
                        key={i} className="group cursor-pointer flex flex-col">
                            
                            <div className="relative w-62.5 h-87.5 overflow-hidden rounded-2xl bg-neutral-100 shadow-sm transition-shadow hover:shadow-xl">
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    fill
                                    sizes="width: 100px "
                                    priority={i < 4}
                                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                                />
                                
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                {/* Icon Button */}
                                <div className="absolute bottom-6 group right-6 bg-white/90 backdrop-blur-md p-4 rounded-full translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-lg">
                                    <IconArrowUpRight  className="text-black size-4 group-hover:size-6 transition-all" />
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className="mt-6 text-center lg:text-left">
                                <h3 className="text-2xl font-bold font-cormorantGaramond text-neutral-800">
                                    {cat.name}
                                </h3>
                                <div className="flex items-center justify-center lg:justify-start gap-2 mt-1">
                                    <span className="h-px w-4 bg-neutral-300"></span>
                                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                                        {cat.count}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};