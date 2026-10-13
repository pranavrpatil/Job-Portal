import { IconPencil, IconDeviceFloppy } from '@tabler/icons-react';
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
        else {
            setEdit(false);
            const updatedProfile = { ...profile, ...form.getValues() };
            dispatch(changeProfile(updatedProfile));
        }
    }

    return <>
        <div className='text-2xl font-semibold mb-3 flex justify-between'>About <ActionIcon color='bright-sun.4' size="lg" variant="subtle" aria-label="Settings" onClick={() => handleEdit()}>
            {edit ? <IconDeviceFloppy className='h-4/5 w-4/5' /> : <IconPencil className='h-4/5 w-4/5' />}
        </ActionIcon></div>

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