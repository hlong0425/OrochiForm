import { Select } from "@shopify/polaris";
import React from 'react';
import { Controller } from 'react-hook-form';


export const ControlledSelectField = ({
    name,
    control,
    label,
    options,
}) => {

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Select
                    {...field}
                    options={options}
                    id={label}
                    label={label}
                />
            )}
        />

    )
}
