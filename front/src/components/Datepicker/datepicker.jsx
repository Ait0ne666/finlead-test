import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";





// const CustomInput = forwardRef((props, ref) => {
//   return (
//     <BorderContainer filled={props.filled} onClick={props.onClick} ref={ref}>
//       <InputContainer filled={props.filled} style={props.containerStyles}>
//         <input

//           value={props.value}
//           type="text"
//           readOnly={true}
//           placeholder={props.placeholder}
//         />

//         {props.postfix && <PostfixContainer>{props.postfix}</PostfixContainer>}
//       </InputContainer>
//     </BorderContainer>
//   );
// });

const Datepicker = ({
    onChange,
    value,
    placeholder,
    wrapperStyles,
    error,
    resetError,
    onBlur
}) => {
    const handleChange = (date) => {
        if (resetError) {
            resetError()
        }
        if (!date) {
            onChange(undefined);
        } else {
            onChange(date);
        }
    };
    
    return (
        <div className="w-full flex flex-col" onBlur={onBlur}>
            <div className="flex">
                {error ? <span className="text-xs text-error mb-1">{error}</span> : null}
            </div>
            <div style={wrapperStyles} className={`w-full border-[1px] py-2 px-3 ${error ? 'border-error' : 'border-primary'}  rounded-xl`}>
                <ReactDatePicker
                    selected={value}
                    onChange={handleChange}
                    dateFormat={"dd.MM.yyyy"}
                    placeholderText={placeholder ?? "__.__.____"}
                    maxDate={new Date()}
                    className="w-full text-primary-text   outline-none focus:outline-none"
                />
            </div>
        </div>
    );
};

export default Datepicker;