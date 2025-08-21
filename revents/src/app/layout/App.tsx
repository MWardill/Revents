import { useState } from "react";
import EventDashboard from "../../features/events/dashboard/EventDashboard"
import Navbar from "./nav/Navbar"
import type { AppEvent } from "../../lib/types";

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null);
  
  const handleFormToggle = (event: AppEvent | null) => {
     if(formOpen) {
      setFormOpen(false);
      setTimeout(() => {
        setSelectedEvent(event);
        setFormOpen(true);
      }, 600);
    } else {
      setSelectedEvent(event);
      setFormOpen(true);
    }
  }

  
  return (    
      <div>
        <Navbar 
          formToggle={handleFormToggle} 
        />
        <div className="container mx-auto px-10 mt-5">
          <EventDashboard 
            formOpen={formOpen} 
            setFormOpen={setFormOpen}
            selectedEvent={selectedEvent}
            formToggle={handleFormToggle}
          />            
        </div>
      </div>                
  )
}

export default App
