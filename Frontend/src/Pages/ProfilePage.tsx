import { Divider } from "@mantine/core";
import { useEffect, useState } from "react";
import Profile from "../Components/Profile/Profile";
import { profile } from "../Data/TalentData";
import { getProfile } from "../Services/ProfileService";
import { useSelector } from "react-redux";

const ProfileData = {
    name: "",
    role: "",
    company: "",
    location: "",
    about: "",
    skills: [],
    experience: [],
    certifications: []
}

const ProfilePage = () => {
    const user = useSelector((state: any) => state.user);
    const profile = useSelector((state: any) => state.profile)

    // const [profile, setProfile] = useState(ProfileData);

    const fetchProfile = async () => {
        try {
            const data = await getProfile(user.profileId);
            // console.log("Fetched profile data:", data);
            // setProfile(data);
            // setProfile(prev => ({ ...prev, name: user.name }));
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    // useEffect(() => {
    //     getProfile(user.profileId).
    //         then((data: any) => console.log(data))
    //         .catch(error => console.log(error));
    //     // fetchProfile();
    // }, []);

    return <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins']">
        <Divider mx="md" mb="xl" />
        <div className="flex ">
            <div className="flex gap-5 mx-4">
                <Profile />
            </div>

        </div>
    </div>
}

export default ProfilePage;