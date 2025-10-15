import type { Profile } from "../../lib/types";

type Props = {
    profile: Profile
    editMode: boolean;
}


export default function ProfilePhotos({ profile, editMode }: Props) {
  return (
    <>
      {editMode ? (
        <div>Edit Mode - Photo Upload Here</div>
      ) : (
        <div className="grid grid-cols-5 gap-3 h-[50vh] overflow-y-scroll">
           <img 
                className="rounded w-full"
                src={profile.photoURL} alt="Profile image" />
                {
                    Array.from({ length: 4 }).map((_, idx) => (
                        <img 
                            key={idx}
                            className="rounded w-full"
                            src={profile.photoURL} alt={`Profile image ${idx + 1}`} />
                    ))
                }                
        </div>
      )}
    </>
  );
}