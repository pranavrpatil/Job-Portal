import { IconPencil, IconDeviceFloppy, IconCheck, IconX } from '@tabler/icons-react';
import { ActionIcon, Textarea } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { changeProfile } from '../../Slices/ProfileSlice';

const About = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);

    const [edit, setEdit] = useState(false);
    const form = useForm({
        mode: 'controlled',
        initialValues: { about: '' },
    });

    const handleEdit = () => {
        if (!edit) {
            setEdit(true);
            form.setValues({ about: profile.about });
        }
    }

    const handleSave = () => {
        setEdit(false);
        const updatedProfile = { ...profile, ...form.getValues() };
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
                value={form.getValues().about}
                onChange={(event) => form.setFieldValue('about', event.currentTarget.value)}
                minRows={4}
            /> : <div className='text-sm text-mine-shaft-300 text-justify mb-5'>{profile?.about}</div>
        }
    </>
}

export default About;