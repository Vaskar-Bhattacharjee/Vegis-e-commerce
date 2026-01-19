'use client'
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const NewArrivalsItemCard = ({ imgSrc, productName, price }: { imgSrc: string, productName: string, price: number }) => {
    const [rotateY, setRotateY] = useState(0);

    return (
        <div className="group cursor-pointer">
            {/* The Perspective wrapper is invisible but allows the 3D effect to look real */}
            <div style={{ perspective: "1000px" }}>
                <motion.div
                    // RESTORED: Your exact original size and structure
                    className="relative w-82.5 h-87.5 overflow-hidden rounded-2xl group"
                    animate={{ rotateY: rotateY }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <Image 
                        src={imgSrc}
                        alt={productName} 
                        fill
                        className="object-cover"
                    />

                    {/* SENSORS: These sit on top of the image to detect left/right hover */}
                    <div className="absolute inset-0 flex z-30">
                        <div 
                            className="w-1/2 h-full" 
                            onMouseEnter={() => setRotateY(-15)} // Tilts Left
                            onMouseLeave={() => setRotateY(0)} 
                        />
                        <div 
                            className="w-1/2 h-full" 
                            onMouseEnter={() => setRotateY(15)} // Tilts Right
                            onMouseLeave={() => setRotateY(0)} 
                        />
                    </div>

                    {/* Your original overlay */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />
                </motion.div>
            </div>
            
            <h3 className="mt-2 text-md md:text-xl font-bold text-neutral-900">{productName}</h3>
            <p className="text-sm md:text-lg font-semibold text-neutral-500">${price}</p>
        </div>
    );
};