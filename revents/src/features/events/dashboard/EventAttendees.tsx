export default function EventAttendees() {
  return (
    <div className="avatar-group -space-x-5">
        {Array.from({ length: 5 }).map((_, index) => (
            <div className="avatar" key={index}>
                <div className="w-10">
                    <img 
                        src={`https://img.daisyui.com/images/profile/demo/yellingcat@192.webp`} 
                        alt={`Attendee`} 
                        className="object-cover" />
                </div>
            </div>
        ))}
    </div>
  )
}