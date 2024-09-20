import { Heading } from "../components/Heading";
import { Button } from "./Button";
import { InputBox } from "./InputBox";
import { SubHeading } from "./SubHeading";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const SignUpState = {
  username: "",
  password: "",
  confirm_password: "",
};

const SignInState = {
  username: "admin@gmail.com",
  password: "admintest",
};

export const Auth = ({ type }) => {
  const { useLogin, useSignUp } = useAuth();
  const [UserInputs, setUserInputs] = useState(
    type === "signup" ? SignUpState : SignInState
  );
  const [flag, setFlag] = useState(true);

  const handleSignUpClick = async () => {
    // Check if passwords match
    if (UserInputs.password !== UserInputs.confirm_password) {
      setFlag(false); // Invert flag if passwords do not match
    } else {
      setFlag(true); // Reset flag if passwords match
      await useSignUp(UserInputs); // Call the sign-up API handler
    }
  };

  const handleSignInClick = async () => {
    await useLogin(UserInputs);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col max-w-md w-full shadow-2xl rounded-lg p-5">
        {type === "signup" ? (
          <Heading label="Sign Up" />
        ) : (
          <Heading label="Sign In" />
        )}

        <div className="py-2">
          {type === "signup" ? (
            <SubHeading label="Create an account" />
          ) : (
            <SubHeading label="Provide your credentials to login" />
          )}
        </div>
        <div>
          {type === "signup" ? (
            <div>
              <div>
                <InputBox
                  label="username"
                  placeholder="username"
                  onChange={(e) => {
                    setUserInputs({ ...UserInputs, username: e.target.value });
                  }}
                  type="email"
                />
              </div>
              <div>
                <InputBox
                  label="password"
                  placeholder="password"
                  onChange={(e) => {
                    setUserInputs({ ...UserInputs, password: e.target.value });
                  }}
                  type="password"
                />
              </div>
              <div>
                <InputBox
                  label="confirm password"
                  placeholder="confirm password"
                  onChange={(e) => {
                    setUserInputs({
                      ...UserInputs,
                      confirm_password: e.target.value,
                    });
                  }}
                  type="password"
                />
              </div>
              <div>
                <Button
                  label="Sign Up"
                  onClick={handleSignUpClick}
                  color="bg-lime-500"
                />
              </div>
              <div>
                {!flag && (
                  <div className="text-center py-2 text-red-500">
                    Passwords do not match
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div>
                <InputBox
                  label="username"
                  placeholder="username"
                  value={UserInputs.username}
                  onChange={(e) => {
                    setUserInputs({ ...UserInputs, username: e.target.value });
                  }}
                  type="email"
                />
              </div>
              <div>
                <InputBox
                  label="password"
                  placeholder="password"
                  value={UserInputs.password}
                  onChange={(e) => {
                    setUserInputs({ ...UserInputs, password: e.target.value });
                  }}
                  type="password"
                />
              </div>
              <div>
                <Button
                  label="Sign In"
                  onClick={handleSignInClick}
                  color="bg-blue-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};