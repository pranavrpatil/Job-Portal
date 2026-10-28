import { IconEdit } from '@tabler/icons-react';
import { Avatar, Divider, FileInput, Overlay } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { useDispatch, useSelector } from 'react-redux';
import Info from './Info';
import About from './About';
import Skills from './Skills';
import Experience from './Experience';
import Certifications from './Certification';
import { changeProfile } from '../../Slices/ProfileSlice';

const Profile = (props: any) => {
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);
    const { hovered, ref } = useHover();

    const handleImage = async (image: any) => {
        let picture: any = await getBase64(image);
        console.log(picture);
        let updatedProfile = { ...profile, image: picture.split(',')[1] };
        dispatch(changeProfile(updatedProfile));
    }

    const getBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })
    }

    return <div className="w-4/5 mx-auto">
        <div className=''>
            <div className="relative">
                <img className="rounded-t-2xl" src="./Profile/banner.jpg" alt="" />
                <div ref={ref} className='absolute flex items-center justify-center -bottom-1/3 left-3'>
                    <Avatar className='!h-48 !w-48 border-mine-shaft-950 border-8 rounded-full' src={profile.image ? `data:image/jpeg;base64,${profile.image}` : "./avatar.png"} alt='' />
                    {hovered && <Overlay className='!rounded-full' color='#000' backgroundOpacity={0.75} />}
                    {hovered && <IconEdit className='absolute z-[300] w-16 h-16' />}
                    {hovered && <FileInput onChange={handleImage} className='absolute z-[301] w-full h-full [&_*]:!h-full [&_*]:!rounded-full' variant='transparent' accept='image/png, image/jpeg, image/jpg' />}
                </div>
            </div>
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