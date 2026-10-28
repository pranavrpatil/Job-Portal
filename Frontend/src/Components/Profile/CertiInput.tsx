import { TextInput, Button } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { MonthPickerInput } from '@mantine/dates';
import { useSelector, useDispatch } from 'react-redux';
import SelectInput from '../PostJobs/SelectInput';
import fields from '../../Data/Profile';
import { changeProfile } from '../../Slices/ProfileSlice';

const CertiInput = (props: any) => {

    const select = fields;
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);

    const form = useForm({
        mode: 'controlled',
        validateInputOnChange: true,
        initialValues: {
            name: "",
            issuer: "",
            issueDate: new Date(),
            certificateId: ""
        },
        validate: {
            name: isNotEmpty("Name is required"),
            issuer: isNotEmpty("Issuer is required")
        }
    });

    const handleSave = () => {
        form.validate();
        if (!form.isValid()) return;
        let certifications = [...profile.certifications];
        certifications.push(form.getValues());
        certifications[certifications.length - 1].issueDate = certifications[certifications.length - 1].issueDate.toISOString();
        const updatedProfile = { ...profile, certifications: certifications }
        dispatch(changeProfile(updatedProfile));
        props.setEdit(false)
    }

    return <div className='flex flex-col'>
        <div className='text-lg font-semibold mb-5 flex justify-between'>Add Certitificate</div>
        <div className='flex gap-10 mb-5 [&>*]:w-1/2'>
            <TextInput
                {...form.getInputProps('name')}
                label="Title"
                withAsterisk
                placeholder="Java Foundation"
            />
            <SelectInput form={form} name={"issuer"} {...select[1]} />
        </div>

        <div className='flex gap-10 mb-5 mt-5 [&>*]:w-1/2'>
            <MonthPickerInput
                {...form.getInputProps('issueDate')}
                label="Issue date"
                placeholder="Issue Date"
                maxDate={new Date()}
                withAsterisk
            />
            <TextInput
                {...form.getInputProps('certificateId')}
                label="Certificate ID"
                placeholder="Certificate ID"
            />
        </div>

        <div className='flex gap-5 mt-3'>
            <Button color="green.8" onClick={handleSave} variant="light">Save</Button>
            <Button color="red.8" onClick={() => { props.setEdit(false) }} variant="light">Cancle</Button>
        </div>

    </div>
}

export default CertiInput;