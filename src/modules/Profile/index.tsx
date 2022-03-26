import React from "react";
import { Button, Input, Stack } from "components/FormComponents";

export const ProfileView = () => {
  return (
    <div className="flex flex-col gap-4 p-10 border border-brandblack rounded-3xl">
      <span className="font-bold text-2xl">Edit Profile</span>
      <Stack spacing={3}>
        <Input name="username" />
        <Input name="twitterUsername" />
        <Input name="githubUsername" />
        <Input name="discordHandle" />
        <Input type="textarea" name="bio" />
        <Button wrap>Update</Button>
      </Stack>
    </div>
  );
};
