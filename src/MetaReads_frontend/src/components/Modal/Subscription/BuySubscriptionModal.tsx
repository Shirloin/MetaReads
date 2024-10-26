import { useRef } from "react";
import { ToastError } from "../../Form/Notifications/ErrorNotification";
import { ToastSuccess } from "../../Form/Notifications/SuccessNotification";
import { ToastLoading } from "../../Form/Notifications/LoadingNotification";
import { toast } from "react-toastify";
import GenreForm from "../../Form/Layout/GenreForm";
import BaseModal from "../BaseModal";
import { useCreateGenre } from "../../Hook/Data/Genre/useCreateGenre";
import { FormModalProps } from "../../Props/modalProps";
import useCreateSubscription from "../../Hook/Data/Subscription/useCreateSubscription";
import { Title } from "../../Utility/TitleUtility";
import SecondaryButton from "../../Form/Button/SecondaryButton";
import AlertButton from "../../Form/Button/AlertButton";
import SubscribeButton from "../../Form/Button/SubscribeButton";
import ShimmerButton from "../../Form/Button/ShimmerButton";

interface BuySubscriptionModal extends FormModalProps {
  userId: string;
  planId: string;
  isYearly: "Yearly" | "Monthly";
}
export default function BuySubscriptionModal({
  open,
  handleClose,
  fetchData,
  userId,
  planId,
  isYearly,
}: BuySubscriptionModal) {
  const { createSubscription, error } = useCreateSubscription();
  const loadingToastId = useRef(null);

  const handleCreate = async () => {
    // @ts-ignores
    loadingToastId.current = ToastLoading("Loading..");
    try {
      const success = await createSubscription(userId, planId, isYearly);
      if (success) {
        ToastSuccess("Genre Created Successfully");
        fetchData();
      } else {
        if (error) ToastError(error as string);
      }
    } finally {
      if (loadingToastId.current) {
        toast.dismiss(loadingToastId.current);
        loadingToastId.current = null;
      }
    }
  };

  return (
    <BaseModal open={open} handleClose={handleClose}>
      <Title text={`Do you want to buy this ${isYearly} plan?`} />

      <div className="h-[100px]"></div>
      <div className="flex w-full justify-center gap-3">
        {/* <button
          onClick={handleClose}
          className="rounded-md bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
        >
          Back
        </button> */}
        <ShimmerButton text={"Check Out"} onClick={handleCreate} />
      </div>
    </BaseModal>
  );
}
