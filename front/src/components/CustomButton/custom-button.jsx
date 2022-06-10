import {Spinner} from '@chakra-ui/spinner'


const CustomButton = ({
    onClick,
    title,
    disabled,
    loading,
    type
}) => {
    return (
        <button className={`relative flex justify-center items-center w-full  ${disabled ? 'bg-disabled' : 'bg-action'} py-2 rounded-xl`} type={type} disabled={disabled} onClick={disabled ? undefined : onClick}>
            {
                loading &&
                <div className="absolute left-3">
                    <Spinner color="white"/>
                </div>
            }
            <span className="uppercase font-semibold text-base text-white">
                {title}
            </span>
        </button>
    )
}



export default CustomButton