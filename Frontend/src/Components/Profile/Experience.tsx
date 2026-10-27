import { IconPencil, IconPlus, IconX } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExpCard from './ExpCard';
import ExpInput from './ExpInput';


const Experience = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile)

    const [edit, setEdit] = useState(false);
    const [experience, setExperience] = useState([]);
    const [addExp, setAddExp] = useState(false);

    const handleAdd = () => {
        setAddExp(!addExp);
    }

    const handleClick = () => {
        setEdit(!edit);
    }

    const handleEdit = () => {
        if (!edit) {
            setEdit(true);
            setExperience(profile?.experiences)
        }
    }

    const handleCancel = () => {
        setEdit(false);
        return;
    }

    return <>
        <div className='text-2xl font-semibold mb-5 flex justify-between'>Experience
            <div className='flex gap-2 '>
                <ActionIcon color='bright-sun.4' size="lg" variant="subtle" aria-label="Settings" onClick={handleAdd}>
                    <IconPlus className='h-4/5 w-4/5 ' />
                </ActionIcon>

                <ActionIcon color={edit ? 'red.8' : 'bright-sun.4'} size="lg" variant="subtle" aria-label="Settings" onClick={() => handleClick()}>
                    {edit ? <IconX className='h-4/5 w-4/5' /> : <IconPencil className='h-4/5 w-4/5' />}
                </ActionIcon>
            </div>
        </div>
        {addExp && <ExpInput setEdit={setAddExp} add />}
        <div className='flex flex-col gap-10'>
            {
                profile?.experiences?.map((experience: any, index: any) => < ExpCard key={index} {...experience} edit={edit} index={index} />)
            }
        </div>

    </>
}

export default Experience;