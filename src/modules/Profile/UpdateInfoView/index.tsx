import React, { FC, useState } from "react";
import {
  Button,
  Container,
  FormikInput,
  FormikTextArea,
  Stack,
} from "components/FormComponents";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { updateProfileInfo } from "redux/slices/profileSlice";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { apiCaller, getErrorMessage } from "utils/fetcher";

const UsernameInput: FC<{
  sharedProps: any;
  setFieldError: Function;
  setLoading: (loading: Boolean) => void;
}> = ({ sharedProps, setFieldError, setLoading }) => {
  // status:
  // 1 - Checked
  // 2 - Checking
  // 3 - Error
  const [status, setStatus] = useState<1 | 2 | 3>(1);

  const checkUsernameAvailability = () => {
    const { username } = sharedProps.values;
    setLoading(true);
    setStatus(2);
    apiCaller
      .get(`profile/usernameAvailability/${username}`)
      .then(() => {
        setStatus(1);
        setFieldError("username", undefined);
      })
      .catch((err) => {
        const message = getErrorMessage(err);
        setFieldError("username", message);
        setStatus(3);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <FormikInput
      name="username"
      {...sharedProps}
      onStopTypingInterval={800}
      onStopTyping={checkUsernameAvailability}
      absoluteElement={
        <div className="absolute top-[50%] right-4 translate-y-[-50%]">
          {status == 1 && <AiFillCheckCircle color="green" />}
          {status == 2 && (
            <AiOutlineLoading3Quarters className="animate-spin" />
          )}
          {status == 3 && <AiFillCloseCircle color="red" />}
        </div>
      }
    />
  );
};

export const ProfileFields: FC<{
  sharedProps: any;
  setFieldError: Function;
  setStatus: Function;
  ignoreBio?: Boolean;
}> = ({ sharedProps, setFieldError, setStatus, ignoreBio = false }) => {
  return (
    <>
      <UsernameInput
        sharedProps={sharedProps}
        setFieldError={setFieldError}
        setLoading={(loading) =>
          setStatus(loading ? "checkingUsername" : undefined)
        }
      />
      <FormikInput name="twitterUsername" {...sharedProps} />
      <FormikInput name="discordHandle" {...sharedProps} />
      <FormikInput name="githubUsername" {...sharedProps} />
      {!ignoreBio && <FormikTextArea name="bio" {...sharedProps} />}
    </>
  );
};

const Form = () => {
  const dispatch = useDispatch();
  const profileData = useSelector(
    (state: RootStateOrAny) => state.profile.data
  );
  const { username, bio, githubUsername, twitterUsername, discordHandle } =
    profileData;
  const initialValues = {
    username,
    bio,
    githubUsername,
    twitterUsername,
    discordHandle,
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
        status,
        isSubmitting: loading,
        setStatus,
        handleChange,
        handleBlur,
        setFieldError,
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
              <ProfileFields
                sharedProps={sharedProps}
                setFieldError={setFieldError}
                setStatus={setStatus}
              />

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
                  disabled={status === "checkingUsername"}
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
      <h3 className="font-bold text-2xl pb-5">Update Profile</h3>
      <Form />
    </div>
  );
};

export default UpdateInfoView;
