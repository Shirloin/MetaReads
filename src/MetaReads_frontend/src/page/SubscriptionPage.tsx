import { useState } from "react";
import PageLayout from "../components/Layout/PageLayout";
import SubscriptionCard from "../components/Subscriptions/SubscriptionCard";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import { Tabs } from "../components/ui/tabs";

export default function SubscriptionPage() {
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
            <SubscriptionCard
              title="Free"
              price="0"
              benefits={["Access to limited books", "Basic reader features"]}
              type="Month"
            />
            <SubscriptionCard
              title="Basic"
              price="1"
              benefits={[
                "Access to more books",
                "Basic reader features",
                "Highlighting and note-taking",
              ]}
              type="Month"
            />
            <SubscriptionCard
              title="Premium"
              price="2"
              benefits={[
                "Access to entire book library",
                "Basic reader features",
                "Highlighting and note-taking",
                "Priority support",
                "Personalized recommendations",
              ]}
              type="Month"
            />
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
            <SubscriptionCard
              title="Free"
              price="0"
              benefits={["Access to limited books", "Basic reader features"]}
              type="Year"
            />
            <SubscriptionCard
              title="Basic"
              price="1"
              benefits={[
                "Access to more books",
                "Basic reader features",
                "Highlighting and note-taking",
              ]}
              type="Year"
            />
            <SubscriptionCard
              title="Premium"
              price="2"
              benefits={[
                "Access to entire book library",
                "Basic reader features",
                "Highlighting and note-taking",
                "Priority support",
                "Personalized recommendations",
              ]}
              type="Year"
            />
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
        <div className="relative flex max-w-full flex-col items-start justify-start md:h-[40rem]">
          <Tabs tabs={tabs} />
        </div>
      </div>
    </PageLayout>
  );
}
