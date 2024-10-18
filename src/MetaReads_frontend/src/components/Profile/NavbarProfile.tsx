import DefaultProfile from "../../../public/assets/Default Profile.png";
import CurrencyLogo from "../../../public/assets/Currency Logo.png";
import { Tooltip } from "@mui/material"; // Import Tooltip from MUI
import { UserDataProps } from "../Props/model";
import { useCookie } from "../Hook/Cookie/useCookie";
import { useEffect, useState } from "react";
import { ToastError } from "../Form/Notifications/ErrorNotification";
import { User } from "../Props/userProps";

export default function NavbarProfile(
  // { data }: UserDataProps //Later
) {
  
  const { getIdentityfromCookie } = useCookie();
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState<boolean>(false);
  // const profilePicture = data && data.photo ? data.photo : DefaultProfile;
  const profilePicture = DefaultProfile;
  const formatMoney = (value: string | undefined) => {
    console.log(value);
    
    return value ? value.length > 5 ? `${value.slice(0, 7)}...` : value : 0;
  };

  useEffect(() => {
    async function getUserById() {
      setLoading(true);
      try {
        const user = await getIdentityfromCookie();
        setUser(user)
        console.log(user?.id.toString());
        
        console.log(user);
        console.log(user?.money.toString());
        
        
      } catch (error: any) {
        ToastError(error.message);
      }
      finally {
        setLoading(false);
      }
    }
    getUserById();
    
  }, []);

  return (
    <div >
      {
        loading ?
          ""
        :
        user ?
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
              <Tooltip title={user.username} arrow placement="top-start">
                <div className="max-w-[100px] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap">
                  <span>{user.username}</span>
                </div>
              </Tooltip>

              <div className="w-full">
                <Tooltip title={user.money.toString()} arrow placement="bottom">
                  <div
                    className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap"
                    style={{ color: "#3FF39D" }}
                  >
                    <span className="flex gap-2">
                      <div className="flex items-center">
                        <img src={CurrencyLogo} alt="Currency" className="w-5" />
                      </div>
                      {formatMoney(user?.money.toString())}
                    </span>
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        :
        <a href="/login">Login</a>
      }
    </div>
  );
}
