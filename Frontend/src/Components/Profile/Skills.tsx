import { IconPencil, IconCheck, IconX } from "@tabler/icons-react";
import { ActionIcon, TagsInput } from '@mantine/core';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { changeProfile } from "../../Slices/ProfileSlice";
import { SuccessNotification, FailureNotification } from '../../Services/NotificationService';

const Skills = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);

    const [edit, setEdit] = useState(false);
    const [skills, setSkills] = useState<string[]>([]);

    const handleEdit = () => {
        if (!edit) {
            setEdit(true);
            setSkills(profile?.skills);
        }
    }

    const handleSave = () => {
        setEdit(false);
        const updatedProfile = { ...profile, skills: skills };
        console.log("updated profile", profile);
        dispatch(changeProfile(updatedProfile));
    }

    const handleCancel = () => {
        setEdit(false);
        return;
    }

    return <>
        <div className='text-2xl font-semibold mb-3 flex justify-between'>Skills
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
        <div className='flex flex-wrap gap-2'>
            {
                profile?.skills?.map((skill: any, index: any) =>
                    <div key={index} className='bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1'>{skill}
                    </div>)
            }
        </div>
        {
            edit && <TagsInput
                className='mt-5'
                placeholder="Add skills"
                splitChars={[',', ' ', '|']}
                value={skills}
                onChange={(value) => setSkills(value)}
            />
        }
    </>
}

export default Skills;