import { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { useRouter } from "next/router";
import * as yup from "yup";
import {
  Container,
  Button,
  Input,
  Stack,
  Error,
  FormikInput,
} from "components/FormComponents";
import { addInfo } from "redux/slices/profileSlice";

export const Form = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [topLevelError, setTopLevelError] = useState("");

  const initialValues = {
    username: "",
    twitterUsername: "",
    discordHandle: "",
    githubUsername: "",
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={infoFormSchema}
      onSubmit={(data, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        dispatch(
          addInfo({
            data,
            successFunction: () => {
              setTopLevelError("");
            },
            errorFunction: (errorMessage: string) => {
              setTopLevelError(errorMessage);
            },
            finalFunction: () => {
              setSubmitting(false);
            },
          })
        );
      }}
    >
      {({
        values,
        errors,
        isSubmitting: loading,
        handleChange,
        handleBlur,
        resetForm,
        handleSubmit,
      }) => {
        const sharedProps = {
          onChange: handleChange,
          onBlur: handleBlur,
          disabled: loading,
          values,
          errors,
        };
        return (
          <Container onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <FormikInput name="username" {...sharedProps} />
              <FormikInput name="twitterUsername" {...sharedProps} />
              <FormikInput name="discordHandle" {...sharedProps} />
              <FormikInput name="githubUsername" {...sharedProps} />
              <Error
                onClick={() => setTopLevelError("")}
                show={Boolean(topLevelError)}
                description={topLevelError}
              />
              <Stack direction="row" spacing={3} className="pt-2 ml-auto">
                <Button
                  variant="accent"
                  outline
                  onClick={resetForm}
                  disabled={loading}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  variant="secondary"
                  loading={loading}
                  disableOnLoading
                >
                  Next
                </Button>
              </Stack>
            </Stack>
          </Container>
        );
      }}
    </Formik>
  );
};

const infoFormSchema = yup.object({
  username: yup.string().required(),
  twitterUsername: yup.string().required(),
  githubUsername: yup.string().required(),
  discordHandle: yup.string().required(),
});

//             {error && (
//               <div className="pt-4">
//                 <div className="alert alert-error shadow-lg">
//                   <span>{error}</span>
//                 </div>
//               </div>
//             )}
