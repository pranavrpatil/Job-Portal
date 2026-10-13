import { IconPencil, IconDeviceFloppy, IconPlus } from '@tabler/icons-react';
import { ActionIcon, Divider } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExpCard from './ExpCard';
import CertiCard from './CertiCard';
import ExpInput from './ExpInput';
import CertiInput from './CertiInput';
import Info from './Info';
import About from './About';
import Skills from './Skills';
import { getProfile } from '../../Services/ProfileService';
import { setProfile } from '../../Slices/ProfileSlice';

const Profile = (props: any) => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    const profile = useSelector((state: any) => state.profile)

    useEffect(() => {
        getProfile(user.profileId)
            .then((data: any) => {
                dispatch(setProfile(data));
            })
            .catch(error => console.log(error));
    }, []);

    const [edit, setEdit] = useState([false, false, false, false, false]);
    const [addExp, setAddExp] = useState(false);
    const [addCerti, setAddCerti] = useState(false);

    const handleEdit = (index: any) => {
        const newEdit = [...edit];
        newEdit[index] = !newEdit[index];
        setEdit(newEdit);
    }

    const handleAdd = () => {
        setAddExp(!addExp);
    }

    const handleCerti = () => {
        setAddCerti(!addCerti);
    }

    return <div className="w-4/5 mx-auto">
        <div className="relative">
            <img className="rounded-t-2xl" src="./Profile/banner.jpg" alt="" />
            <img className="rounded-full h-48 w-48 border-mine-shaft-950 border-8 absolute -bottom-1/3 left-3" src="./avatar.png" alt="" />
        </div>
        <div className="px-3 mt-20">
            <Info />
        </div>
        <Divider my="xl" />
        <div className='px-3'>
            <About />
        </div>

        <Divider size="xs" color="mine-shaft.7" my="xl" mx={"xs"} />

        <div className='px-3'>
            <Skills />
        </div>

        <Divider size="xs" color="mine-shaft.7" my="xl" mx={"xs"} />

        <div className='px-3'>
            <div className='text-2xl font-semibold mb-5 flex justify-between'>Experience
                <div className='flex gap-2 '>
                    <ActionIcon color='bright-sun.4' size="lg" variant="subtle" aria-label="Settings" onClick={handleAdd}>
                        <IconPlus className='h-4/5 w-4/5 ' />
                    </ActionIcon>

                    <ActionIcon color='bright-sun.4' size="lg" variant="subtle" aria-label="Settings" onClick={() => handleEdit(3)}>
                        {edit[3] ? <IconDeviceFloppy className='h-4/5 w-4/5' /> : <IconPencil className='h-4/5 w-4/5' />}
                    </ActionIcon>
                </div>
            </div>
            {addExp && <ExpInput setEdit={setAddExp} add />}
            <div className='flex flex-col gap-10'>
                {
                    profile?.experiences?.map((experience: any, index: any) => < ExpCard key={index} {...experience} edit={edit[3]} />)
                }
            </div>
        </div>
        <Divider size="xs" color="mine-shaft.7" my="xl" mx={"xs"} />
        <div className='px-3'>
            <div className='text-2xl font-semibold mb-5 flex justify-between'>Certifications
                <div className='flex gap-2 '>
                    <ActionIcon color='bright-sun.4' size="lg" variant="subtle" aria-label="Settings" onClick={handleCerti}>
                        <IconPlus className='h-4/5 w-4/5 ' />
                    </ActionIcon>

                    <ActionIcon color='bright-sun.4' size="lg" variant="subtle" aria-label="Settings" onClick={() => handleEdit(4)}>
                        {edit[4] ? <IconDeviceFloppy className='h-4/5 w-4/5' /> : <IconPencil className='h-4/5 w-4/5' />}
                    </ActionIcon>
                </div>
            </div>
            {addCerti && <CertiInput setEdit={setAddCerti} />}
            <div className='flex flex-col gap-1'>
                {
                    profile?.certifications?.map((certificate: any, index: any) => <CertiCard key={index} {...certificate} edit={edit[4]} />)
                }
            </div>
        </div>
    </div>
}

export default Profile;