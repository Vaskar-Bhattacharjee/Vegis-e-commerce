import { cn } from "@/src/lib/utils"
import {  IconCaretDownFilled } from "@tabler/icons-react"
import { useState } from "react"
import {motion} from 'framer-motion'


export const Dropdown = ({
    sortname,
    items,
    onSelect

}:{
    sortname: string,
    items: string[],
    onSelect: (val: string) => void

}) => {
      const [open, setOpen] = useState<boolean>(false)
      const [display, setDisplay] = useState<string>("")

    return(
            <div className="relative z-20">  
            <div
            onClick={()=> {
              setOpen(!open)
              
            }}
            
            className="flex items-center justify-center gap-2 cursor-pointer border border-neutral-200 hover:bg-neutral-100 rounded-lg px-6 ">
              <p className="text-neutral-600 text-[16px] font-bold">
                {display ? display : `${sortname}`} 
              </p>
              <span>
                <IconCaretDownFilled className={cn("text-neutral-900 size-4",
                    open === true? "rotate-180 transition-all duration-200" : 'rotate-0 transition-all duration-200'
                )} />
              </span>
            </div>

            {open && 
            <motion.div
            initial={{y:30, opacity: 0 }}   
            animate={{y:0, opacity: 1}}
            transition={{duration: 0.2}}
            className="flex flex-col items-start pl-4 gap-4 justify-center w-40 bg-white border border-neutral-300 rounded-lg py-3 absolute top-10">
             
             {
                items.map((item)=>{
                  return(
                    <p
                    key={item}
                    onClick={()=>{
                      setDisplay(item)
                      setOpen(false)
                      onSelect(item)
                    }}
                    className="text-neutral-500 font-semibold text-[16px] cursor-pointer hover:text-neutral-800 w-full">
                      {item}
                    </p>
                  )
                })
             }
            </motion.div>            
            }

          </div>
    )
}