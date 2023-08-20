import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm);

  const [formValidation, setformValidation] = useState({});
  const [isSubmited, setIsSubmited] = useState(false);

  const isFormValid = useMemo(() => {
    for (const formField of Object.keys(formState)) {
      if (formValidations[formField]) {
        const [fn, errorMessage = "Error de validacion"] =
          formValidations[formField];
        const resFn = fn(formState[formField]);
        if (!resFn) {
          return false;
        }
      }
    }
    return true;
  }, [formValidation]);

  const createValidators = () => {
    const formCheckedValues = {};
    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage = "Error de validacion"] =
        formValidations[formField];
      const resFn = fn(formState[formField]);
      formCheckedValues[`${formField}Valid`] = resFn
        ? null
        : isSubmited
        ? errorMessage
        : null;
    }
    setformValidation(formCheckedValues);
  };
  const onResetForm = () => {
    setFormState(initialForm);
  };
  const onInputChange = ({ target }) => {
    const { name, value } = target; 
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  useEffect(() => {
    createValidators();
  }, [formState, isSubmited]);
  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  return {
    //ESTADO
    formState,
    ...formState,
    isFormValid,
    ...formValidation,
    // METODOS
    setIsSubmited,
    onInputChange,
    onResetForm,
  };
};
