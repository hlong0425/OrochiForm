import { TextField } from "@shopify/polaris";
import React from 'react';
import { Controller } from 'react-hook-form';

export const ControlledTextField = ({
    name,
    control,
    type,
    label,
    suffix,
    rules,
}) => {
    return (
        <Controller
            rules={rules}
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    id={label}
                    label={label}
                    type={type}
                    suffix={suffix}
                    error={error?.message}
                />
            )}
        />

    )
}
