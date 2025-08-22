import { useLocation } from "react-router"
import Navbar from "./nav/Navbar"
import { AnimatePresence, motion } from "motion/react"
import AnimatedOutlet from "../router/AnimatedOutlet";

function App() {
  const location = useLocation();


  return (    
      <div>
        <Navbar />
        <div className="container mx-auto px-10 mt-5">
          <AnimatePresence>
            <motion.div            
              key={location.pathname}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: -0, y: 20 }}
              transition={{ ease: "easeOut", duration: 0.2 }}
            >
              <AnimatedOutlet />
            </motion.div>
          </AnimatePresence>
          
        </div>
      </div>                
  )
}

export default App
