import { differenceInYears, parse } from 'date-fns'


const Card = ({
    username,
    birthday,
    avatar
}) => {


    const calculateAge = () => {
        const date = parse(birthday, "dd-MM-yyyy", new Date())
        const now = new Date()


        const diff = differenceInYears(now, date)



        return diff


    }

    return (
        <div className="flex flex-row items-center bg-white rounded-xl shadow-xl px-7 py-7 w-full h-40">
            <div className="mr-3">
                <img src={avatar} alt='avatar' className="rounded-full min-w-[5rem] w-20 h-20 object-cover" />
            </div>
            <div className="flex flex-col">
                <p className="mb-3 ">
                    Имя пользователя: <strong>{username}</strong>
                </p>
                <p>
                    Возраст: <strong>
                        {calculateAge()}
                    </strong>
                </p>
            </div>
        </div>
    )
}




export default Card