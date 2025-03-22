import { useState } from "react";
import { UserCircleIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import InputComponent from "@components/input";
import ButtonComponent from "@components/button";
import { Box, Heading, Text } from "@chakra-ui/react";
import useUserHooks from "@hooks/userhooks";

const LoginForm = () => {
  const router = useRouter();
  const { signIn } = useUserHooks();

  const [email, setEmail] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [feedback, setFeedback] = useState(null);

  const inputDataSet = [
    {
      icon: <UserCircleIcon className="h-6 w-6" />,
      name: "email",
      label: "Email",
      type: "text",
      placeholder: "Enter email",
      value: email,
      setValue: setEmail,
    },
    {
      icon: <LockClosedIcon className="h-6 w-6" />,
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter password",
      value: password,
      setValue: setPassword,
    },
  ];

  function handleSignIn(e, stopLoading) {
  
    let form = new FormData();
    form.append("username", email);
    form.append("password", password);

    signIn(form, (status, feedback) => {
      if (!(status >= 200 && status < 300)) {
        stopLoading();
        return setFeedback(feedback);
      }

      stopLoading();
      router.push("/dashboard");
    });
  }

  return (
    <Box className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
      <Box w="18rem">
        <Heading size="lg">Sign in to your account</Heading>
      </Box>
      <Box className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="/dashboard" method="POST">
          {
            /** authentication fields */
            inputDataSet.map((dataSet, index) => (
              <Box key={index}>
                <InputComponent key={index} {...dataSet} />
              </Box>
            ))
          }
          <Box>
            {/* <div className="flex justify-end mb-5">
              <p
                type="submit"
                className="text-gray-500 cursor-pointer"
                onClick={() => router.push("/recover")}
              >
                Forgot password
              </p>
            </div> */}
            <ButtonComponent
              label="Sign in"
              loadingLabel="Processing"
              onClick={handleSignIn}
            />
            <Box className="flex justify-end mt-5">
              <Text
                type="submit"
                className="text-gray-500 cursor-pointer flex gap-2"
                onClick={() => router.push("/")}
              >
                Return to
                <span style={{ color: "teal", fontWeight: 600 }}>Home</span>
              </Text>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
