import PageLayout from "../components/Layout/PageLayout";
import { BackgroundBeamsWithCollision } from "../components/ui/background-beams-with-collision";
import { ShootingStars } from "../components/ui/background/shooting-stars";
import { StarsBackground } from "../components/ui/background/stars-background";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import { motion } from "framer-motion";
export default function HomePage() {
  const asd: string = "asd";
  return (
    <PageLayout>
      <BackgroundBeamsWithCollision>
        <div className="flex flex-col items-center justify-center">
          <h2 className="relative z-20 text-center font-sans text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl lg:text-7xl">
            <TypewriterEffectSmooth
              words={[
                { text: "Welcome" },
                { text: "To" },
                {
                  text: "Metareads",
                  className: " text-[#EFAF21] quantico-font",
                },
                { text: "!" },
              ]}
            />
          </h2>

          <motion.button
            initial={{ y: "2vw", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 3.5 }}
            className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-neutral-400 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-neutral-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            Discover New Worlds
          </motion.button>
        </div>

        <ShootingStars />
        <StarsBackground />
      </BackgroundBeamsWithCollision>
    </PageLayout>
  );
}
