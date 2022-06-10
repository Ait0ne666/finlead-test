import { Formik } from "formik"
import { useState } from "react";
import * as yup from 'yup'
import RadioButton from "../RadioButton/radio-button";
import CustomInput from "../CustomInput/custom-input";
import CustomButton from "../CustomButton/custom-button";
import Datepicker from "../Datepicker/datepicker";
import FileInput from "../FileInput/file-input";
import { register } from "../../data/api/user";
import { useCustomToast } from "../../hooks/toast";

const validationSchema = yup.object().shape({
    email: yup.string().trim().email("Некорректный формат").required('Обязательное поле'),
    username: yup.string().trim().required('Обязательное поле'),
    birthday: yup.date().required('Обязательное поле').typeError("Обязательное поле"),
    sex: yup.string().trim().required('Обязательное поле'),
    password: yup
        .string()
        .trim()
        .required('Обязательное поле'),
    avatar: yup.mixed().required('Обязательное поле')
});


const INITIAL_VALUES = {
    email: "",
    username: "",
    password: "",
    birthday: "",
    sex: "",
    avatar: undefined
}




const Register = ({ navigateToAuth }) => {
    const [loading, setLoading] = useState(false)
    const showToast = useCustomToast()


    const handleRegistration = async (values) => {

        if (loading) return

        setLoading(true)
        const result = await register(values);
        if (typeof result === "string") {
            setLoading(false);
            showToast("", "error", result);
        } else {
            showToast("", "success", "Успешная регистрация");
            setLoading(false)
            if (navigateToAuth) {
                navigateToAuth()
            }
        }
    }



    return (
        <div className="flex flex-col items-center justify-center rounded-xl shadow-xl bg-white px-7 py-10 w-full max-w-lg">
            <Formik
                initialValues={INITIAL_VALUES}
                validationSchema={validationSchema}
                onSubmit={handleRegistration}
                validateOnChange={false}
            >


                {({
                    values,
                    handleSubmit,
                    errors,
                    setFieldValue,
                    setFieldError,
                    validateField,

                }) => {
                
                    const hasErrors = (errors.email || errors.password || errors.avatar || errors.birthday || errors.sex || errors.username) ? true : false
                    const hasValues = values.email && values.avatar && values.birthday && values.password && values.sex && values.username
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
                                type="email"
                                name="email"
                                placeholder="Ваш email"
                                value={values.email}
                                onChange={(value) => setFieldValue("email", value)}
                                error={errors.email}
                                wrapperStyles={{
                                    marginBottom: '1.25rem'
                                }}
                                resetError={() => setFieldError("email", '')}
                                onBlur={() => validateField('email')}
                            />
                            <CustomInput
                                placeholder="Ваш пароль"
                                name="password"
                                type={"password"}
                                value={values.password}
                                onChange={(value) => setFieldValue("password", value)}
                                error={errors.password}
                                wrapperStyles={{
                                    marginBottom: '1.25rem'
                                }}
                                resetError={() => setFieldError("password", '')}
                                onBlur={() => validateField('password')}
                            />
                            <Datepicker
                                value={values.birthday}
                                onChange={(value) => setFieldValue("birthday", value)}
                                error={errors.birthday}
                                wrapperStyles={{
                                    marginBottom: '1.25rem'
                                }}
                                resetError={() => setFieldError("birthday", '')}
                                placeholder="Дата рождения"
                                onBlur={() => validateField('birthday')}
                            />
                            <RadioButton
                                label={'Пол'}
                                value={values.sex}
                                onChange={(value) => setFieldValue("sex", value)}
                                error={errors.sex}
                                wrapperStyles={{
                                    marginBottom: '2.5rem'
                                }}
                                resetError={() => setFieldError("sex", '')}
                                options={[
                                    {
                                        label: 'Мужской',
                                        value: 'male'
                                    },
                                    {
                                        label: 'Женский',
                                        value: 'female'
                                    },
                                ]}
                                onBlur={() => validateField('sex')}
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
                            <CustomButton type="submit" loading={loading} title='Зарегистрироваться' disabled={hasErrors || !hasValues} />

                        </form>
                    )
                }}


            </Formik>
        </div>
    )
}


export default Register