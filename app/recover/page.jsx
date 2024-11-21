"use client";

// import Feed from "@components/feed";
import Input from "@components/Input/Input";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ButtonComponent from "@components/button";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import InputComponent from "@components/input";
import { Heading } from "@chakra-ui/react";

function Home() {
  const router = useRouter();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const inputDataSet = [
    {
      icon: <UserCircleIcon className="h-6 w-6" />,
      name: "email",
      label: "Email",
      type: "text",
      placeholder: "Enter email",
      value: email,
      onChange: setEmail,
    },
  ];

  function handleSubmit(stopLoading) {
    setTimeout(() => stopLoading(), 500);
  }

  function handleBack() {
    router.back();
  }

  return (
    <section className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 w-1/2">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" /> */}
          <Heading size="md">Recover Account</Heading>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            {
              /** authentication fields */
              inputDataSet.map((dataSet) => (
                <InputComponent key={dataSet.key} {...dataSet} />
              ))
            }

            <div className="mt-10 w-full">
              <ButtonComponent
                label="Submit"
                loadingLabel="Processing"
                onClick={handleSubmit}
              />
            </div>
            <ButtonComponent
              label="Back"
              variant="secondary"
              onClick={handleBack}
            />
          </form>
        </div>
      </div>
    </section>
  );
}

export default Home;
