import { AnimatePresence, motion } from "motion/react";
import { cloneElement } from "react";
import { useLocation, useOutlet } from "react-router"

export default function AnimatedOutlet() {
    const location = useLocation();
    // Outlet is a react router thing - it will inject whatever is configured in react-router
    // This component effectively mimics what Outlet would do but allows AnimatePresence to work
    const element = useOutlet();

    // wait: wait till the last component is completely unloaded before animating the new one in
    // initial=false: don't animate the first component on mount for better UX
    return (
        <AnimatePresence mode="wait" initial={true}>
            <motion.div            
                key={location.pathname}
                style={{ 
                    width: '100%',
                    position: 'relative'
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: {
                        duration: 0.4,
                        ease: [0.25, 0.8, 0.25, 1], // Smooth entrance
                        delay: 0.3 // Small delay to let exit animation finish
                    }
                }}
                exit={{ 
                    opacity: 0, 
                    y: -30,
                    transition: {
                        duration: 0.3,
                        ease: [0.4, 0, 0.6, 1] // Smooth exit
                    }
                }}
                onAnimationStart={() => {
                    document.body.style.overflowY = 'hidden';
                }}
                onAnimationComplete={() => {
                    document.body.style.overflowY = 'auto';
                }}
            >                
                {element && cloneElement(element, { key: location.pathname })}
            </motion.div>
        </AnimatePresence>
    )
}