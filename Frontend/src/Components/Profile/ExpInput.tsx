import { Textarea, Checkbox, Button } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { isNotEmpty, useForm } from '@mantine/form';
import { MonthPickerInput } from '@mantine/dates';
import { useEffect } from 'react';
import SelectInput from '../PostJobs/SelectInput';
import fields from '../../Data/Profile';
import { changeProfile } from '../../Slices/ProfileSlice';

const ExpInput = (props: any) => {

    const select = fields;
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);

    const form = useForm({
        mode: 'controlled',
        validateInputOnChange: true,
        initialValues: {
            title: "",
            company: "",
            location: "",
            startDate: new Date(),
            endDate: new Date(),
            description: "",
            isWorking: false
        },
        validate: {
            title: isNotEmpty("Title is required"),
            company: isNotEmpty("Company name is required"),
            location: isNotEmpty("Location is required"),
            description: isNotEmpty("Description is required")
        }
    });

    useEffect(() => {
        if (!props.add) form.setValues({
            title: props.title,
            company: props.company,
            location: props.location,
            startDate: new Date(props.startDate),
            endDate: props.endDate ? new Date(props.endDate) : new Date(),
            description: props.description,
            isWorking: props.isWorking
        });
    }, []);

    const handleSave = () => {
        form.validate();
        if (!form.isValid()) return;
        let experiences = [...profile.experiences]
        if (props.add) {
            experiences.push(form.getValues());
            experiences[experiences.length - 1].startDate = experiences[experiences.length - 1].startDate.toISOString();
            experiences[experiences.length - 1].isWorking ? experiences[experiences.length - 1].endDate = null : experiences[experiences.length - 1].endDate = experiences[experiences.length - 1].endDate.toISOString();
        }
        else {
            experiences[props.index] = form.getValues();
            experiences[props.index].startDate = experiences[props.index].startDate.toISOString();
            experiences[props.index].isWorking ? experiences[props.index].endDate = null : experiences[props.index].endDate = experiences[props.index].endDate.toISOString();
        }

        let updatedProfile = { ...profile, experiences: experiences };
        dispatch(changeProfile(updatedProfile));
        props.setEdit(false);
    }

    return <div className='flex flex-col'>
        <div className='text-lg font-semibold mb-5 flex justify-between'>{props.add ? "Add Experience" : "Edit Experience"}</div>
        <div className='flex gap-10 mb-5 [&>*]:w-1/2'>
            <SelectInput form={form} name={"title"} {...select[0]} />
            <SelectInput form={form} name={"company"} {...select[1]} />
        </div>
        <div className='flex gap-10 mb-5 [&>*]:w-1/2'>
            <SelectInput form={form} name={"location"} {...select[2]} />
        </div>

        <Textarea
            {...form.getInputProps('description')}
            withAsterisk
            className='[&_value]:p-10'
            label="Summary"
            placeholder="Describe yourself"
            autosize
            minRows={4}
        />

        <div className='flex gap-10 mb-5 mt-5 [&>*]:w-1/2'>
            <MonthPickerInput
                {...form.getInputProps('startDate')}
                label="Start date"
                placeholder="Start Date"
                maxDate={form.getValues().endDate || undefined}
                withAsterisk
            />

            {
                !form.getValues().isWorking && <MonthPickerInput
                    {...form.getInputProps('endDate')}
                    label="End date"
                    placeholder="End Date"
                    minDate={form.getValues().startDate || undefined}
                    disabled={form.getValues().isWorking}
                    withAsterisk
                />
            }
        </div>
        <Checkbox
            {...form.getInputProps('isWorking')}
            autoContrast
            label="Currently working here"
            checked={form.getValues().isWorking}
            onChange={(event) => form.setFieldValue("isWorking", event.currentTarget.checked)}
        />

        <div className='flex gap-5 mt-3'>
            <Button color="green.8" onClick={handleSave} variant="light">Save</Button>
            <Button color="red.8" onClick={() => { props.setEdit(false) }} variant="light">Cancle</Button>
        </div>
    </div>
}

export default ExpInput;