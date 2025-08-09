import EventDashboard from "../../features/events/dashboard/EventDashboard"

function App() {

  return (
    <>
      <div className="p-5">
        <h1 className="text-4xl text-red-500 font-heading">Revents app</h1>
        <button type="button" className="btn btn-primary">Click Me</button>
        <EventDashboard />
      </div>            
    </>
  )
}

export default App
