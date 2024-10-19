import PageLayout from "../components/Layout/PageLayout";
import SubscriptionCard from "../components/Subscriptions/SubscriptionCard";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";

export default function SubscriptionPage() {
  return (
    <PageLayout>
      <div
        className="m-16 flex items-center justify-center"
        style={{ gap: "10%" }}
      >
        <div className="text-center text-white">
          <TextGenerateEffect words={"Unlock Your Reading Potential!"} />
          <p className="mt-4 w-[700px] text-xl font-semibold">
            Pick the best plan today and embark on your reading journey with us!
            Enjoy exclusive benefits and a world of knowledge at your
            fingertips.
          </p>
        </div>
      </div>
      <div
        className="mt-40 flex items-center justify-center"
        style={{ gap: "10%" }}
      >
        <SubscriptionCard
          title="Free"
          price="200"
          benefits={["Access to limited books", "Basic reader features"]}
        />
        <SubscriptionCard
          title="Basic"
          price="300"
          benefits={[
            "Access to more books",
            "Basic reader features",
            "Highlighting and note-taking",
          ]}
        />
        <SubscriptionCard
          title="Premium"
          price="500"
          benefits={[
            "Access to entire book library",
            "Basic reader features",
            "Highlighting and note-taking",
            "Priority support",
            "Personalized recommendations",
          ]}
        />
      </div>
    </PageLayout>
  );
}
