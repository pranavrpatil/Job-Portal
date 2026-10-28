import { IconPencil, IconPlus, IconX } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CertiCard from './CertiCard';
import CertiInput from './CertiInput';

const Certifications = () => {

    const [edit, setEdit] = useState(false);
    const [addCerti, setAddCerti] = useState(false);

    const profile = useSelector((state: any) => state.profile);

    const handleCerti = () => {
        setAddCerti(!addCerti);
    }

    const handleEdit = () => {
        setEdit(!edit);
    }

    return <>
        <div className='text-2xl font-semibold mb-5 flex justify-between'>Certifications
            <div className='flex gap-2 '>
                <ActionIcon color='bright-sun.4' size="lg" variant="subtle" aria-label="Settings" onClick={handleCerti}>
                    <IconPlus className='h-4/5 w-4/5 ' />
                </ActionIcon>

                <ActionIcon color={edit ? 'red.8' : 'bright-sun.4'} size="lg" variant="subtle" aria-label="Settings" onClick={() => handleEdit()}>
                    {edit ? <IconX className='h-4/5 w-4/5' /> : <IconPencil className='h-4/5 w-4/5' />}
                </ActionIcon>
            </div>
        </div>
        {addCerti && <CertiInput setEdit={setAddCerti} />}
        <div className='flex flex-col gap-1'>
            {
                profile?.certifications?.map((certificate: any, index: any) => <CertiCard key={index} {...certificate} edit={edit} index={index} />)
            }
        </div>
    </>
}

export default Certifications;