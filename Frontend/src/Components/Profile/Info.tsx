import { IconBriefcase, IconMapPin, IconPencil, IconDeviceFloppy, IconPlus, IconCheck, IconX } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectInput from '../PostJobs/SelectInput';
import fields from '../../Data/Profile';
import { changeProfile, setProfile } from '../../Slices/ProfileSlice';

const Info = () => {

    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    const profile = useSelector((state: any) => state.profile)
    const select = fields;

    const [edit, setEdit] = useState(false);
    const form = useForm({
        mode: 'controlled',
        initialValues: { role: '', company: '', location: '' },
    });

    const handleEdit = () => {
        if (!edit) {
            setEdit(true);
            form.setValues({ role: profile.role, company: profile.company, location: profile.location })
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
        <div className='text-3xl font-semibold flex justify-between'>
            {user?.name}
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
            edit ? <>
                <div className='flex gap-10 mb-5 [&>*]:w-1/2'>
                    <SelectInput form={form} name={"role"} {...select[0]} />
                    <SelectInput form={form} name={"company"} {...select[1]} />
                </div>
                <div className='flex gap-10 mb-5 [&>*]:w-1/2'>
                    <SelectInput form={form} name={"location"} {...select[2]} />
                </div></> : <>
                <div className='text-xl flex items-center gap-1'>
                    <IconBriefcase className="h-5 w-5" /> {profile?.role} &bull; {profile?.company}</div>
                <div className='flex gap-1 text-lg text-mine-shaft-300 items-center'>
                    <IconMapPin stroke={1.5} className='h-5 w-5' /> {profile?.location}
                </div>
            </>
        }
    </>
}

export default Info;