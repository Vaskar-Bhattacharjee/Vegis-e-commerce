import { motion } from "framer-motion"

export const SectionHeader = ({Subheading, Heading}:{Subheading:string, Heading:string}) => {
    return (
            <div className="mb-12 flex flex-col items-center text-center">
                    <motion.span
                    initial={{ opacity: 0, y: 60, backdropFilter: "blur(15px)" }}
                    whileInView={{ opacity: 1, y: 0, backdropFilter: "blur(15px)" }}
                    transition={{ duration: 0.7 }}
                    className="text-sm font-bold uppercase tracking-[0.3em] text-neutral-400 mb-3">
                        {Subheading}
                    </motion.span>
                    <motion.h2
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl md:text-7xl font-extrabold font-cormorantGaramond text-neutral-900">
                        {Heading}
                    </motion.h2>
                </div>
    )
}