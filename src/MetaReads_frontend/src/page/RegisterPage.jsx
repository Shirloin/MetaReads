import { useState } from "react";
import MetaReadsLogo from "../../public/assets/Meta Reads Logo.png";
import PrimaryButton from "../components/Form/Button/PrimaryButton";
import InputField from "../components/Form/Input/TextField/InputField";
import { Title } from "../components/Utility/TitleUtility";
import { useCreateUser } from "../components/Hook/Data/User/useCreateUser";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const { createUser } = useCreateUser();
  const handleRegister = async () => {
    await createUser(username);
    window.location.href = "/";
  };
  return (
    <>
      <div className="flex h-[100vh] w-[100vw] flex-col items-center justify-center">
        <div
          className="flex w-[30%] flex-col gap-10 rounded-md px-4 py-10"
          style={{ backgroundColor: "#14181E" }}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center gap-2">
              <img src={MetaReadsLogo} alt="Full Logo" width={40} />
              <div>
                <Title text={"Register"} />
              </div>
            </div>
            <div className="flex w-full justify-center">
              <hr className="w-[150px]" />
            </div>
            <div className="flex justify-center gap-2 text-white">
              Hello, before you get in, let us know your name
            </div>
          </div>
          <div>
            <InputField label={"Username"} onChange={(e) => setUsername(e.target.value)} size={"medium"} />
          </div>
          
          <div className="flex justify-center">
            <PrimaryButton onClick={handleRegister} text={"Create Account"} />
          </div>
        </div>
      </div>
    </>
  );
}
