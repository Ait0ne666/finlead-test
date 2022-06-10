import { Formik } from "formik"
import { useEffect, useState } from "react";
import * as yup from 'yup'
import RadioButton from "../RadioButton/radio-button";
import CustomInput from "../CustomInput/custom-input";
import CustomButton from "../CustomButton/custom-button";
import Datepicker from "../Datepicker/datepicker";
import FileInput from "../FileInput/file-input";
import { register, update } from "../../data/api/user";
import { useCustomToast } from "../../hooks/toast";
import { useQueryClient } from "react-query";

const validationSchema = yup.object().shape({
    username: yup.string().trim().required('Обязательное поле'),
    oldPassword: yup
        .string()
        .when('newPassword', (value) => {
            if (value) {
                return yup.string().trim().required("Обязательное поле при смене пароля")
            }
        })
    ,
    newPassword: yup
        .string()
        .trim(),
    avatar: yup.mixed()
});


const INITIAL_VALUES = {
    username: "",
    oldPassword: "",
    newPassword: "",
    avatar: undefined
}




const Account = ({ user }) => {
    const [loading, setLoading] = useState(false)
    const showToast = useCustomToast()
    const queryClient = useQueryClient()
    
    const [initialValues, setInitialValues] = useState({
        ...INITIAL_VALUES,
        username: user.username,
        avatar: user.avatar
    })


    useEffect(() => {
        setInitialValues({
            ...INITIAL_VALUES,
            username: user.username,
            avatar: user.avatar
        })
    }, [user])




    const handleUpdate = async (values) => {

        if (loading) return

        setLoading(true)
        const result = await update(values);
        if (typeof result === "string") {
            setLoading(false);
            showToast("", "error", result);
        } else {
            showToast("", "success", "Данные успешно сохранены");
            setLoading(false)
            queryClient.invalidateQueries("user")
        }
    }



    return (
        <div className="flex flex-col items-center justify-center rounded-xl shadow-xl bg-white px-7 py-10 w-full max-w-lg">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleUpdate}
                validateOnChange={false}
                enableReinitialize
            >


                {({
                    values,
                    handleSubmit,
                    errors,
                    setFieldValue,
                    setFieldError,
                    validateField,

                }) => {
                  
                    const hasErrors = (errors.oldPassword || errors.newPassword || errors.avatar || errors.username) ? true : false
                    const hasValues = values.username && values.avatar
                    return (
                        <form className="w-full" onSubmit={handleSubmit}>
                            <CustomInput

                                type="text"
                                name="username"
                                placeholder="Ваше имя"
                                value={values.username}
                                onChange={(value) => setFieldValue("username", value)}
                                error={errors.username}
                                wrapperStyles={{
                                    marginBottom: '1.25rem'
                                }}
                                resetError={() => setFieldError("username", '')}
                                onBlur={() => validateField('username')}
                            />
                            <CustomInput
                                placeholder="Старый пароль"
                                name="oldPassword"
                                type={"oldPassword"}
                                value={values.oldPassword}
                                onChange={(value) => setFieldValue("oldPassword", value)}
                                error={errors.oldPassword}
                                wrapperStyles={{
                                    marginBottom: '1.25rem'
                                }}
                                resetError={() => setFieldError("oldPassword", '')}
                                onBlur={() => validateField('oldPassword')}
                            />
                            <CustomInput
                                placeholder="Новый пароль"
                                name="newPassword"
                                type={"newPassword"}
                                value={values.newPassword}
                                onChange={(value) => setFieldValue("newPassword", value)}
                                error={errors.newPassword}
                                wrapperStyles={{
                                    marginBottom: '1.25rem'
                                }}
                                resetError={() => setFieldError("newPassword", '')}
                                onBlur={() => validateField('newPassword')}
                            />
                            <FileInput
                                label="Фото профиля:"
                                value={values.avatar}
                                onChange={(value) => setFieldValue("avatar", value)}
                                error={errors.avatar}
                                wrapperStyles={{
                                    marginBottom: '1.25rem'
                                }}
                                resetError={() => setFieldError("avatar", '')}
                                placeholder="Фото"
                                name="avatar"
                                onBlur={() => validateField('avatar')}
                            />
                            <CustomButton type="submit" loading={loading} title='Сохранить' disabled={hasErrors || !hasValues} />

                        </form>
                    )
                }}


            </Formik>
        </div>
    )
}


export default Account