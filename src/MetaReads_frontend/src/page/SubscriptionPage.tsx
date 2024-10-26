import { useEffect, useState } from "react";
import PageLayout from "../components/Layout/PageLayout";
import SubscriptionCard from "../components/Subscriptions/SubscriptionCard";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import { Tabs } from "../components/ui/tabs";
import useGetAllPlan from "../components/Hook/Plan/useGetAllPlan";

export default function SubscriptionPage() {
  const [activePlan, setActivePlan] = useState<boolean>(false);
  const [data, fetchData] = useGetAllPlan();
  const benefits = {
    Free: ["Access to limited books", "Basic reader features"],
    Standard: [
      "Access to more books",
      "Basic reader features",
      "Highlighting and note-taking",
    ],
    Premium: [
      "Access to entire book library",
      "Basic reader features",
      "Highlighting and note-taking",
      "Priority support",
      "Personalized recommendations",
    ],
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    console.log(data);
  }, [data]);
  const renderSubscriptionCards = (isYearly: boolean) =>
    data.map((plan) => (
      <SubscriptionCard
        key={plan.id.toString()}
        title={plan.name}
        price={
          isYearly
            ? plan.price_per_year.toString()
            : plan.price_per_month.toString()
        }
        benefits={benefits[plan.name as keyof typeof benefits]}
        type={isYearly ? "Year" : "Month"}
      />
    ));

  const tabs = [
    {
      title: "Monthly",
      value: "Monthly",
      content: (
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br font-bold text-white">
          <div
            className="flex items-center justify-center"
            style={{ gap: "10%" }}
          >
            {renderSubscriptionCards(false)}
          </div>
        </div>
      ),
    },
    {
      title: "Yearly",
      value: "Yearly",
      content: (
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br font-bold text-white">
          <div
            className="flex items-center justify-center"
            style={{ gap: "10%" }}
          >
            {renderSubscriptionCards(true)}
          </div>
        </div>
      ),
    },
  ];

  return (
    <PageLayout>
      <div className="relative max-h-[100vh] w-full overflow-y-auto bg-white bg-dot-black/[0.2] dark:bg-black dark:bg-dot-white/[0.2]">
        <div
          className="m-16 flex items-center justify-center overflow-y-auto"
          style={{ gap: "10%" }}
        >
          <div className="w-full text-center text-white">
            <div className="flex justify-center">
              <TypewriterEffectSmooth
                words={[
                  { text: "Unlock" },
                  { text: "Your" },
                  { text: "Reading" },
                  { text: "Potential" },
                  { text: "!" },
                ]}
              />
            </div>
            <p className="flex w-[full] flex-col gap-2 text-xl font-semibold">
              <div>
                Pick the best plan today and embark on your reading journey with
                us!
              </div>
              <div>
                Enjoy exclusive benefits and a world of knowledge at your
                fingertips.
              </div>
            </p>
          </div>
        </div>
        {data.length > 0 && (
          <div className="relative flex max-w-full flex-col items-start justify-start md:h-[40rem]">
            <Tabs tabs={tabs} />
          </div>
        )}
      </div>
    </PageLayout>
  );
}
