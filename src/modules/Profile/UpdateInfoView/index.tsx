import React from "react";
import {
  Button,
  Container,
  FormikInput,
  Input,
  Stack,
} from "components/FormComponents";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { updateProfileInfo } from "redux/slices/profileSlice";

const Form = () => {
  const dispatch = useDispatch();
  const profileData = useSelector(
    (state: RootStateOrAny) => state.profile.data
  );
  const { username, bio } = profileData;
  const initialValues = {
    username,
    bio,
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validateOnChange={false}
      validateOnBlur={false}
      // validationSchema={infoFormSchema}
      onSubmit={(data, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        dispatch(
          updateProfileInfo({
            data,
            successFunction: () => {},
            errorFunction: () => {},
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
              {/* <FormikInput name="twitterUsername" {...sharedProps} />
              <FormikInput name="discordHandle" {...sharedProps} />
              <FormikInput name="githubUsername" {...sharedProps} /> */}
              <FormikInput type="textarea" name="bio" {...sharedProps} />
              {/* <Error
                onClick={() => setTopLevelError("")}
                show={Boolean(topLevelError)}
                description={topLevelError}
              /> */}
              <Stack direction="row" spacing={3} className="pt-5 ml-auto">
                <Button
                  type="submit"
                  variant="secondary"
                  loading={loading}
                  disableOnLoading
                >
                  Update
                </Button>
              </Stack>
            </Stack>
          </Container>
        );
      }}
    </Formik>
  );
};

const UpdateInfoView = () => {
  return (
    <div>
      <h3 className="font-bold text-2xl pb-5">Edit Profile</h3>
      <Form />
    </div>
  );
};

export default UpdateInfoView;
