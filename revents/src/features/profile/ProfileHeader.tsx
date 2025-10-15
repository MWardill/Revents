import { useAppSelector } from "../../lib/stores/store";
import type { Profile } from "../../lib/types";

export default function ProfileHeader({ profile }: { profile: Profile }) {

    const currentUser = useAppSelector(state => state.account.user);
    const isCurrentUser = currentUser?.uid === profile.id;
    const following = false;

    return (
        <div className="card w-full bg-base-100 rounded-2xl shadow">
            <div className="flex w-full py-3 px-6 justify-between">
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="w-28 h-28 rounded-full">
                            <img src={profile.photoURL || "/user.png"} alt="User Avatar" />
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-3">
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-semibold">{profile.displayName}</h2>
                            {following && !isCurrentUser && <div className="badge badge-primary badge-sm rounded-full self-start mt-2">Following</div>}
                        </div>
                        {!isCurrentUser && <button className="btn btn-outline btn-wide btn-sm">Follow</button>}
                    </div>
                </div>
                <div className="flex gap-3 items-center">
                    <div className="stats">
                        <div className="stat place-items-center">
                            <div className="stats-title text-xl">Followers</div>
                            <div className="stats-value text-7xl font-bold">10</div>
                        </div>
                        <div className="stat place-items-center">
                            <div className="stats-title text-xl">Following</div>
                            <div className="stats-value text-7xl font-bold">42</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}