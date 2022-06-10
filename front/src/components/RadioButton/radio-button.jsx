import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

const RadioButton = ({
    onChange,
    value,
    error,
    label,
    resetError,
    options,
    wrapperStyles,
    onBlur
}) => {


    const handleChange = (value) => {
        if (resetError) {
            resetError();
        }
        onChange(value);
    };

    return (
        <div className="flex flex-col" style={wrapperStyles}>
            <div className="flex-col">
                {label ? <label className="mb-1">{label}</label> : <div />}
                {error ? <p className="text-xs text-error mb-1">{error}</p> : null}
            </div>
            <RadioGroup onBlur={onBlur} value={value} onChange={handleChange}>
                <Stack spacing={5} direction='row'>
                    {
                        options.map((option) => {
                            return <Radio key={option.value} value={option.value}>
                                {option.label}
                            </Radio>
                        })
                    }

                </Stack>
            </RadioGroup>
        </div>
    );
};

export default RadioButton;
