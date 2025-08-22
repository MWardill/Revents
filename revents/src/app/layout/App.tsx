import { useState } from "react";
import EventDashboard from "../../features/events/dashboard/EventDashboard"
import Navbar from "./nav/Navbar"
import type { AppEvent } from "../../lib/types";

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null);
  
  const handleFormToggle = (event: AppEvent | null) => {
     if(formOpen) {
      // If form is already open, just update the selected event
      setSelectedEvent(event);
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
