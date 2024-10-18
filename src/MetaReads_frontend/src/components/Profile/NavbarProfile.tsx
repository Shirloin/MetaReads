import DefaultProfile from "../../../public/assets/Default Profile.png";
import CurrencyLogo from "../../../public/assets/Currency Logo.png";
import { Tooltip } from "@mui/material"; // Import Tooltip from MUI
import { UserDataProps } from "../Props/model";

export default function NavbarProfile(
  // { data }: UserDataProps //Later
) {
  const name = "Vasang 123 Vasang 123";
  const money = "10000,00";
  // const profilePicture = data && data.photo ? data.photo : DefaultProfile;
  const profilePicture = DefaultProfile;
  const formatMoney = (value: string) => {
    return value.length > 5 ? `${value.slice(0, 7)}...` : value;
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <Tooltip
        title={
          <img
            src={profilePicture}
            alt="Profile Preview"
            className="h-32 w-32"
          />
        } // Tooltip displays larger image
        arrow
        placement="bottom"
      >
        <img
          src={profilePicture}
          alt="Profile Picture"
          className="w-12 cursor-pointer" // Added cursor pointer for better UX
        />
      </Tooltip>

      <div className="flex items-center">
        <div className="flex flex-col items-center">
          <Tooltip title={name} arrow placement="top-start">
            <div className="max-w-[100px] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap">
              <span>{name}</span>
            </div>
          </Tooltip>

          <div className="w-full">
            <Tooltip title={money} arrow placement="bottom">
              <div
                className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap"
                style={{ color: "#3FF39D" }}
              >
                <span className="flex gap-2">
                  <div className="flex items-center">
                    <img src={CurrencyLogo} alt="Currency" className="w-5" />
                  </div>
                  {formatMoney(money)}
                </span>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
