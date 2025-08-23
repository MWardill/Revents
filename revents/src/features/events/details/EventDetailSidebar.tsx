import { users } from "../../../lib/data/sampleData";

export default function EventDetailSidebar() {
  return (
    <div className="card bg-white">
        <div className="card-title bg-gradient-to-r from-primary justify-center to-info text-white p-1 rounded-t-lg">
            2 People Going
        </div>
        <div className="card-body">
            <div className="flex flex-col gap-3">
               <div className="flex gap-5 align-middle items-center">
                    <div className="avatar">
                        <div className="w-8 h-8 rounded-full">
                            <img
                                alt="User Avatar"
                                src={users[0].photoURL}
                            />                            
                        </div>
                        <span className="pl-2 text-2xl">Bob</span>
                    </div>
               </div>
            </div>
        </div>
    </div>
  )
}