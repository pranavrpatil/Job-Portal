import { IconDeviceFloppy, IconPencil } from "@tabler/icons-react";
import { ActionIcon, TagsInput } from '@mantine/core';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { changeProfile } from "../../Slices/ProfileSlice";

const Skills = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);

    const [edit, setEdit] = useState(false);
    const form = useForm<{ skills: string[] }>({
        mode: 'controlled',
        initialValues: { skills: [] },
    });

    const handleEdit = () => {
        if (!edit) {
            setEdit(true);
            form.setValues({ skills: profile.skills });
        }
        else {
            setEdit(false);
            const updatedProfile = { ...profile, ...form.getValues() };
            dispatch(changeProfile(updatedProfile));
        }
    }

    return <>
        <div className='text-2xl font-semibold mb-3 flex justify-between'>Skills <ActionIcon color='bright-sun.4' size="lg" variant="subtle" aria-label="Settings" onClick={() => handleEdit()}>
            {edit ? <IconDeviceFloppy className='h-4/5 w-4/5' /> : <IconPencil className='h-4/5 w-4/5' />}
        </ActionIcon></div>
        <div className='flex flex-wrap gap-2'>
            {
                profile?.skills?.map((skill: any, index: any) =>
                    <div key={index} className='bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1'>{skill}</div>)
            }
        </div>
        {
            edit && <TagsInput
                className='mt-5'
                placeholder="Add skills"
                splitChars={[',', ' ', '|']}
                value={form.getValues().skills}
                onChange={(value) => form.setFieldValue('skills', value)}
            />
        }
    </>
}

export default Skills;