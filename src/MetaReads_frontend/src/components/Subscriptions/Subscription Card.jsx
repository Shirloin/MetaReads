import { BsFillCheckCircleFill } from "react-icons/bs";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import SubscribeButton from "../Form/Button/SubscribeButton";
import CurrencyLogo from "../../../public/assets/Currency Logo.png";

export default function SubscriptionCard({ title, price, benefits }) {
  return (
    <Card
      sx={{
        width: "20%",
        backgroundColor: "#14181E",
        minHeight: "500px",
        maxHeight: "1000px",
        display: "flex",
        flexDirection: "column",
        borderRadius: "5px",
        boxShadow: "0px 10px 40px rgba(72, 79, 90, 0.6)",
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Typography
          component="div"
          sx={{
            color: "white",
            fontWeight: "500",
            fontSize: "25px",
            textTransform: "uppercase",
          }}
          className="flex justify-center"
        >
          {title}
        </Typography>
        <div class="mb-5 flex justify-center rounded-md">
          <hr
            class="w-[20px] border-t-2"
            style={{
              borderColor: "#EFAF21",
            }}
          />
        </div>
        <div className="mb-6">
          <Typography
            variant="body2"
            sx={{ color: "white", fontSize: "34px", fontWeight: "600" }}
            className="flex justify-center"
          >
            <span className="gap flex gap-2">
              <div className="flex items-center">
                <img src={CurrencyLogo} alt="Currency" className="w-6" />
              </div>
              {price}
            </span>
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "white", fontSize: "12px" }}
            className="flex justify-center"
            DC
          >
            Per Month
          </Typography>
        </div>
        <div class="mb-5 flex justify-center rounded-md">
          <hr
            class="border-t-1 w-full"
            style={{
              borderColor: "gray",
              opacity: "0.5",
            }}
          />
        </div>
        <div className="max-h-[220px] overflow-y-auto">
          {" "}
          {/* Set a max height and enable vertical scrolling */}
          <ul className="flex flex-col space-y-2">
            {" "}
            {/* Use flex column layout for vertical alignment */}
            {benefits.map((benefit, index) => (
              <li
                key={index}
                className="flex items-center p-2 text-sm text-gray-600"
              >
                <div className="mr-2">
                  <BsFillCheckCircleFill color="#EFAF21" size={19} />
                </div>
                <div className="text-white" style={{ fontSize: "16px" }}>
                  {benefit}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div></div>
      </CardContent>
      <CardActions className="m-4 flex items-center justify-center">
        <SubscribeButton text={"Select Plan"} />
      </CardActions>
    </Card>
  );
}
