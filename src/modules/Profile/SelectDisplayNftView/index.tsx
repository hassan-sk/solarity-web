import { Button, Input, Stack } from "components/FormComponents";
import React from "react";

const SelectDisplayNftView = () => {
  return (
    <div>
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

export default SelectDisplayNftView;
