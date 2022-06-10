import { useRef } from "react";

const FileInput = ({
    name,
    onChange,
    type,
    value,
    error,
    label,
    placeholder,
    wrapperStyles,
    resetError,
}) => {
    const uploadRef = useRef()


    const handleFileUpload = (e) => {
        if (e.target.files) {
            const file = e.target.files[0];

            if (resetError) {
                resetError()
            }

            onChange(file)


            if (uploadRef.current) {
                uploadRef.current.value = null
            }

        }
    }

    return (
        <div className="flex flex-col w-full" style={wrapperStyles}>
            <div className="flex">
                {label ? <label>{label}</label> : <div />}
                {error ? <span className="text-xs text-error mb-1">{error}</span> : null}
            </div>
            <input type="file"
                id={name}
                hidden
                onChange={handleFileUpload}
                accept="image/jpg, image/jpeg"
                ref={uploadRef} />
            <label htmlFor={name} className="cursor-pointer w-20 h-20 flex justify-center items-center rounded-full bg-[#dddddd] min-h-[5rem] overflow-hidden" >
                {
                    value ?
                        <img src={typeof value === "string" ? value : URL.createObjectURL(value)} alt='avatar' />

                        :
                        <span className="text-white">
                            {placeholder}
                        </span>
                }
            </label>
        </div>
    );
};

export default FileInput;
