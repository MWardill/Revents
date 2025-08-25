import { Link } from "react-router";

export default function Home() {
  return (
    <div className="hero">
      <div className="hero-content text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold">Welcome to Re-vents</h1>
          <p className="mt-2">Mats learning app for React 😊</p>
          <Link to="/events" className="btn btn-primary btn-lg mt-4">View the events</Link>
        </div>
      </div>
    </div>
  )
}