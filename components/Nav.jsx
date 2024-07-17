"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import useIsDesktop from "@utils/useIsDesktop";

function Nav() {
  const isDesktop = useIsDesktop();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [isUserLoggedin, setIsUserLoggedIn] = useState(false);

  const logIn = () => {
    setIsUserLoggedIn(true);
  };

  const logOut = () => {
    setIsUserLoggedIn(false);
  };

  const LoginContainer = () => {
    const [isOpen, setIsOpen] = useState(false);

    const ButtonSubmit = () => (
      <button
        type="button"
        onClick={() => (isDesktop ? setIsOpen(!isOpen) : null)}
        key="login"
        className="black_btn"
      >
        Log In
      </button>
    );

    // if (isDesktop) {
    //   return (
    //     <>
    //       <ButtonSubmit />
    //       <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
    //         <LoginForm />
    //       </Modal>
    //     </>
    //   );
    // }

    return <Link href="/login">{<ButtonSubmit />}</Link>;
  };

  return (
    <nav className="flex-between w-full m-0 pt-5 pl-10 pr-10">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="assets/images/logo.svg"
          alt="LOGO!"
          width={30}
          height={30}
          className="object-contain"
        />
        <h3 className="logo_text"> IMTIAZ </h3>
      </Link>
      <div className="sm:flex hidden">
        {isUserLoggedin ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/transaction" className="black_btn">
              Transaction
            </Link>
            <Link href="/">
              <button type="button" onClick={logOut} className="outline_btn">
                Log Out
              </button>
            </Link>
            <Link href="/account">
              <Image
                src="/assets/images/logo.svg"
                width={37}
                height={37}
                alt="Account"
              />
            </Link>
          </div>
        ) : (
          <div className="flex gap-3 md:gap-5">
            <Link href="/payment" className="black_btn">
              Payment
            </Link>
            <LoginContainer />
          </div>
        )}
      </div>

      <div className="sm:hidden flex relative ">
        {isUserLoggedin ? (
          <div className="flex gap-3 md:gap-5">
            <Image
              src="/assets/images/logo.svg"
              width={37}
              height={37}
              alt="Account"
              onClick={() => setToggleDropdown((perv) => !perv)}
            />
            {toggleDropdown && (
              <div className="dropdown content-center">
                <Link
                  href="/account"
                  className="dropdown_link "
                  onClick={() => {
                    setToggleDropdown(false);
                  }}
                >
                  Account
                </Link>
                <Link
                  href="/transaction"
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropdown(false);
                  }}
                >
                  Transaction
                </Link>
                <Link href="/">
                  <button
                    type="button"
                    onClick={logOut}
                    className="outline_btn"
                  >
                    Log Out
                  </button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-3 md:gap-5">
            <Link href="/payment" className="black_btn">
              Payment
            </Link>
            <Link href="/login">
              <button
                type="button"
                key=""
                onClick={logIn}
                className="black_btn"
              >
                Log In
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Nav;
