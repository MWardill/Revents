import type { AppEvent } from "../../../lib/types";

 type Props = {
      appEvent: AppEvent;
  }

export default function EventDetailChat({ appEvent }: Props) {
            
    return (
        <div className="card bg-white">
            <div className="card-title justify-center bg-gradient-to-r from-primary to-info text-white p-1 rounded-t-lg">
                Chat about this event
            </div>
            <div className="card-body rounded-b-lg">
                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS chat bubble component"
                                src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                            />
                        </div>
                    </div>
                    <div className="chat-bubble">Hey this event looks really good</div>
                </div>
            </div>
        </div>
    )
}