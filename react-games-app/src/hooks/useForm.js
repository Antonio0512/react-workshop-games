import { useState } from "react";

export const useForm = (onSubmitHandler, initialValues) => {
    const [values, setValues] = useState(initialValues);

    const onChangeHandler = (e) => {
        setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        reset()
        onSubmitHandler();
        
    };

    const reset = function() {
        setValues(initialValues)
    }

    return {
        values,
        onChangeHandler,
        onSubmit,
    };
};
