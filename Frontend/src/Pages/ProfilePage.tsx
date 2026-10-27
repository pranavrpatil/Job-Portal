import { Divider } from "@mantine/core";
import Profile from "../Components/Profile/Profile";

const ProfilePage = () => {

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