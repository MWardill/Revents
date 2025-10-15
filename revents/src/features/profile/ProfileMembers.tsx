import { useNavigate } from "react-router"
import { useDelayedCollection } from "../../lib/hooks/useDelayedCollection"
import type { Profile } from "../../lib/types"

export default function ProfileMembers() {
    const { data: members } = useDelayedCollection<Profile>({ path: 'profiles' })
    const navigate = useNavigate();


    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Joined</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members?.map(member => (   
                        <tr key={member.id}
                            onClick={() => navigate(`/profile/${member.id}`)}
                            className="hover:bg-base-300 cursor-pointer"
                        >
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="w-12 h-12 rounded-full">
                                            <img src={member.photoURL || '/user.png'} alt="User Avatar" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{member.displayName}</div>
                                        <div className="text-sm opacity-50">{member.email}</div>    
                                    </div>
                                </div>
                            </td>
                            <td>{member.createdAt}</td>
                            <td>
                                <div className="flex gap-2">
                                    <button className="btn btn-xs">Follow</button>                                    
                                </div>
                            </td>
                        </tr>
                    ))}                  
                </tbody>
            </table>
        </div>
    )
}