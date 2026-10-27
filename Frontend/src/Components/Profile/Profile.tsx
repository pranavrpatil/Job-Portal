import { Divider } from '@mantine/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Info from './Info';
import About from './About';
import Skills from './Skills';
import Experience from './Experience';
import { getProfile } from '../../Services/ProfileService';
import { setProfile } from '../../Slices/ProfileSlice';
import Certifications from './Certification';

const Profile = (props: any) => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);

    useEffect(() => {
        getProfile(user.profileId)
            .then((data: any) => {
                dispatch(setProfile(data));
            })
            .catch(error => console.log(error));
    }, []);

    return <div className="w-4/5 mx-auto">
        <div className="relative">
            <img className="rounded-t-2xl" src="./Profile/banner.jpg" alt="" />
            <img className="rounded-full h-48 w-48 border-mine-shaft-950 border-8 absolute -bottom-1/3 left-3" src="./avatar.png" alt="" />
        </div>
        <div className="px-3 mt-20">
            <Info />
        </div>
        <Divider my="xl" size="xs" color="mine-shaft.7" mx={"xs"} />
        <div className='px-3'>
            <About />
        </div>

        <Divider size="xs" color="mine-shaft.7" my="xl" mx={"xs"} />

        <div className='px-3'>
            <Skills />
        </div>

        <Divider size="xs" color="mine-shaft.7" my="xl" mx={"xs"} />

        <div className='px-3'>
            <Experience />
        </div>

        <Divider size="xs" color="mine-shaft.7" my="xl" mx={"xs"} />
        <div className='px-3'>
            <Certifications />
        </div>
    </div>
}

export default Profile;