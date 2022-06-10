const CustomInput = ({
    name,
    onChange,
    type,
    value,
    error,
    label,
    placeholder,
    wrapperStyles,
    resetError,
    onBlur,
  }) => {
  
  
    const validateInput = (text) => {
      if (text === "") return true;
  
      if (type === "number") {
        const match = text.match(/\d+/g);
        if (match && match.length === 1 && match[0].length === text.length) {
          return true;
        }
        return false;
      }
      return true;
    };
  
    const handleChange = (e) => {
      const value = e.target.value;
      if (!validateInput(value)) return
      if (resetError) {
        resetError();
      }
      onChange(value);
    };
  
    return (
      <div className="flex flex-col w-full" style={wrapperStyles}>
        <div className="flex">
          {label ? <label>{label}</label> : <div />}
          {error ? <span className="text-xs text-error mb-1">{error}</span> : null}
        </div>
        <div className={`w-full border-[1px] py-2 px-3 ${error ? 'border-error' : 'border-primary' }  rounded-xl`}>
          <input
            className="w-full text-primary-text   outline-none focus:outline-none"
            onChange={handleChange}
            value={value}
            placeholder={placeholder}
            name={name}
            type={type === "number" ? "text" : type}
            onBlur={onBlur}
          />
        </div>
      </div>
    );
  };
  
  export default CustomInput;
  