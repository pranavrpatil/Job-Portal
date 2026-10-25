import { Textarea, Checkbox, Button } from '@mantine/core';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { MonthPickerInput } from '@mantine/dates';
import SelectInput from '../PostJobs/SelectInput';
import fields from '../../Data/Profile';

const ExpInput = (props: any) => {

    const form = useForm({
        mode: 'controlled',

        initialValues: {
            title: "",
            company: "",
            location: "",
            startDate: null,
            endDate: null,
            description: "",
            isWorking: true
        },
    });

    const [start, setStart] = useState<Date | null>(new Date());
    const [end, setEnd] = useState<Date | null>(new Date());
    const select = fields;
    const [checked, setChecked] = useState(false);
    const [desc, setDesc] = useState("");

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
            withAsterisk
            className='[&_value]:p-10'
            label="Summary"
            placeholder="Describe yourself"
            autosize
            value={desc}
            onChange={(event) => setDesc(event.currentTarget.value)}
            minRows={4}
        />

        <div className='flex gap-10 mb-5 mt-5 [&>*]:w-1/2'>
            <MonthPickerInput
                label="Start date"
                placeholder="Start Date"
                value={start}
                onChange={setStart}
                maxDate={end || undefined}
                withAsterisk
            />

            {
                !checked && <MonthPickerInput
                    label="End date"
                    placeholder="End Date"
                    value={end}
                    onChange={setEnd}
                    minDate={start || undefined}
                    withAsterisk
                />
            }
        </div>
        <Checkbox
            autoContrast
            label="Currently working here"
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
        />

        <div className='flex gap-5 mt-3'>
            <Button color="bright-sun.4" onClick={() => { props.setEdit(false) }} variant="outline">Save</Button>
            <Button color="red.8" onClick={() => { props.setEdit(false) }} variant="light">Cancle</Button>
        </div>
    </div>
}

export default ExpInput;