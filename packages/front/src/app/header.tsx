"use client";

import { usePathname, useRouter } from "next/navigation";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useUser } from "@auth0/nextjs-auth0";

export const Header = () => {
  const pathName = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const isAccount = pathName.includes("/account");
  const isNotes = pathName.includes("/notes");
  const onClickToAccount = () => {
    router.push("/account");
  };
  if (!user) {
    return <HeaderForNotLogin />;
  }
  return (
    <div className="fixed z-50 top-0 w-full bg-white">
      <div className="container mx-auto px-3 border-b-2">
        <header className={`flex  py-1`}>
          <div>
            <h1>F</h1>
          </div>
          <div className="flex-1 flex justify-center">
            {isAccount && <span className="">アカウント</span>}
            {isNotes && <span className="">ノート管理</span>}
          </div>
          <div>
            <div
              className="flex justify-center items-center flex-1"
              onClick={onClickToAccount}
            >
              <MdOutlineAccountCircle color="black" size={30} />
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

const HeaderForNotLogin = () => {
  const router = useRouter();

  return (
    <div className="fixed z-50 top-0 w-full bg-white">
      <div className="container mx-auto px-3 border-b-2">
        <header className={`flex py-1 justify-between`}>
          <div>
            <h1>F</h1>
          </div>
          <div>
            <button
              className="text-primary"
              onClick={() => router.push("/login")}
            >
              登録/ログイン
            </button>
          </div>
        </header>
      </div>
    </div>
  );
};
