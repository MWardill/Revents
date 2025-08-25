import type { AppEvent } from "../../../lib/types";

type Props = {
    appEvent: AppEvent;
}

export default function EventDetailSidebar({ appEvent }: Props) {
    return (
        <div className="card bg-white">
            <div className="card-title bg-gradient-to-r from-primary justify-center to-info text-white p-1 rounded-t-lg">
                {appEvent.attendees.length} People Going
            </div>
            <div className="card-body p-3">
                <div className="flex flex-col gap-1">
                    {
                        appEvent.attendees.map((attendee, idx) => (
                            <div key={attendee.id} >
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <div className="avatar">
                                            <div className="w-8 h-8 rounded-full">
                                                <img
                                                    alt="User Avatar"
                                                    src={attendee.photoURL || '/user.png'}
                                                />
                                            </div>
                                            <span className="pl-2 text-2xl">{attendee.displayName}</span>
                                        </div>
                                    </div>
                                    {
                                        appEvent.hostUid === attendee.id && (
                                            <div className="badge badge-sm rounded-2xl mt-1 items-center align-middle">
                                                Host
                                            </div>
                                        )
                                    }
                                </div>
                                {idx < appEvent.attendees.length - 1 && (
                                    <div className="divider my-0 -mx-3 before:h-px after:h-px"></div>
                                )}
                            </div>
                        )
                        )}
                </div>
            </div>
        </div>
    )
}