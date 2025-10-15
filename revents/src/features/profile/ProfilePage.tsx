import { useParams } from "react-router";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";
import { useDelayedDocument } from "../../lib/hooks/useDelayedDocument";
import LoadingSpinner from "../../app/shared/components/LoadingSpinner";
import NotFound from "../../app/shared/components/NotFound";

export default function ProfilePage() {
    const { id } = useParams<{ id: string }>();
    const { data: profile, loading } = useDelayedDocument<{ id: string }>({ path: 'profiles', id });

    if (loading) {
        return (
            <LoadingSpinner
                title="Loading Profile..."
                message="Please wait while we fetch the latest information..."
            />
        );
    }

    if (!profile) {
        const profileIcon = (
            <svg 
                className="w-16 h-16 text-error" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                />
            </svg>
        );

        return (
            <NotFound
                title="Profile Not Found"
                message="Sorry, we couldn't find the profile you're looking for. The user may not exist or the link might be incorrect."
                icon={profileIcon}
                primaryAction={{ text: "Browse Events", to: "/events" }}
                secondaryAction={{ text: "Go Home", to: "/" }}
            />
        );
    }

    return (
        <div className="flex flex-col w-full gap-5">
            <div className="flex w-full">
                <ProfileHeader profile={profile} />
            </div>
            <div className="flex w-full">
                <ProfileContent profile={profile} />
            </div>
        </div>
    )
}