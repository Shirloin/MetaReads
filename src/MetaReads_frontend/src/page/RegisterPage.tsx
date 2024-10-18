import MetaReadsLogo from "../../public/assets/Meta Reads Logo.png";
import PrimaryButton from "../components/Form/Button/PrimaryButton";
import InputField from "../components/Form/Input/TextField/InputField";
import { Title } from "../components/Utility/TitleUtility";

export default function RegisterPage() {
  const handleRegister = () => { };
  const redirectLogin = () => {
    window.location.href = "/login";
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
              Already have an account ?{" "}
              <div
                className="cursor-pointer text-blue-400 underline"
                onClick={redirectLogin}
              >
                Login
              </div>
            </div>
          </div>
          <div>
            <InputField label={"Username"} size={"medium"} value={"test"} onChange={() => { }} />
          </div>
          <div>
            <InputField label={"Password"} size={"medium"} type={"password"} value={"test"} onChange={() => { }} />
          </div>
          <div>
            <InputField
              label={"Confirm Password"}
              size={"medium"}
              type={"password"}
              value={"test"}
              onChange={() => { }}
            />
          </div>
          <div className="flex justify-center">
            <PrimaryButton text={"Create Account"} onClick={() => { }} />
          </div>
        </div>
      </div>
    </>
  );
}
