import { Formik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup'
import { login } from '../../data/api/user';
import CustomInput from '../CustomInput/custom-input';
import {useQueryClient} from 'react-query'
import { useUser } from '../../data/queries/user';
import CustomButton from '../CustomButton/custom-button';
import { useCustomToast } from '../../hooks/toast';

const validationSchema = yup.object().shape({
    email: yup.string().trim().email("Некорректный формат").required('Обязательное поле'),
    
    password: yup
        .string()
        .trim()
        .required('Обязательное поле'),
});



const INITIAL_VALUES = {
    email: "",
    password: "",
};

const Auth = () => {
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();
    const showToast = useCustomToast()
    const { isLoading } = useUser();

    const handleAuth = async (values) => {
        if (loading) return;
        setLoading(true);

        const result = await login(values.email, values.password);


        if (typeof result === "string") {
          
            setLoading(false);
            showToast("", "error", result);
        } else {
            queryClient.invalidateQueries("user", { exact: true });
        }
    };




    return (
        <div className="flex flex-col items-center justify-center rounded-xl shadow-xl bg-white px-7 py-10 w-full max-w-md">
            <Formik
                initialValues={INITIAL_VALUES}
                onSubmit={handleAuth}
                validateOnBlur={true}
                validateOnChange={false}

                validationSchema={validationSchema}
                isInitialValid={false}
            >
                {({
                    values,
                    handleSubmit,
                    errors,
                    setFieldValue,
                    setFieldError,
                    validateField,

                }) => {

                    const hasErrors = (errors.email || errors.password) ? true : false
                    return (
                        <form className="w-full" onSubmit={handleSubmit}>
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
                                    marginBottom: '2.5rem'
                                }}
                                resetError={() => setFieldError("password", '')}
                                onBlur={() => validateField('password')}
                            />
                            <CustomButton type="submit" loading={loading || isLoading} title='Войти' disabled={hasErrors || values.email === '' || values.password === ''} />

                        </form>
                    )
                }}
            </Formik>
        </div>
    );
};

export default Auth;