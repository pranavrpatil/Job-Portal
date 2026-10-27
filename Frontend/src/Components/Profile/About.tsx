import { IconPencil, IconDeviceFloppy, IconCheck, IconX } from '@tabler/icons-react';
import { ActionIcon, Textarea } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { changeProfile } from '../../Slices/ProfileSlice';

const About = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);

    const [edit, setEdit] = useState(false);
    const [about, setAbout] = useState('');

    const handleEdit = () => {
        if (!edit) {
            setEdit(true);
            setAbout(profile?.about);
        }
    }

    const handleSave = () => {
        setEdit(false);
        const updatedProfile = { ...profile, about };
        dispatch(changeProfile(updatedProfile));
    }

    const handleCancel = () => {
        setEdit(false);
        return;
    }

    return <>
        <div className='text-2xl font-semibold mb-3 flex justify-between'>About
            <div>
                {edit ? <>
                    <ActionIcon color='green.8' size="lg" variant="subtle" aria-label="Settings" onClick={() => handleSave()}>
                        <IconCheck className='h-4/5 w-4/5' stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon color='red.8' size="lg" variant="subtle" aria-label="Settings" onClick={() => handleCancel()}>
                        <IconX className='h-4/5 w-4/5' stroke={1.5} />
                    </ActionIcon>
                </> : <ActionIcon color='bright-sun.4' size="lg" variant="subtle" aria-label="Settings" onClick={() => handleEdit()}>
                    <IconPencil className='h-4/5 w-4/5' />
                </ActionIcon>}
            </div>
        </div>

        {
            edit ? <Textarea
                className='[&_value]:p-10'
                placeholder="Describe yourself"
                autosize
                value={about}
                onChange={(event) => setAbout(event.target.value)}
                minRows={4}
            /> : <div className='text-sm text-mine-shaft-300 text-justify mb-5'>{profile?.about}</div>
        }
    </>
}

export default About;