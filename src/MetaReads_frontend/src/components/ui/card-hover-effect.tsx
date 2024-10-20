import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string | React.ReactNode;
    onClick: () => void;
    backgroundImage?: string | null;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 py-10 md:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className="group relative block h-full w-full p-2"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => item?.onClick()}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 block h-full w-full rounded-3xl bg-neutral-200 dark:bg-slate-800/[0.8]"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card backgroundImage={item.backgroundImage}>
            <CardTitle className="text-center text-lg">{item.title}</CardTitle>
            <CardDescription className="text-pretty text-center text-base">
              {item.description}
            </CardDescription>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
  backgroundImage,
}: {
  className?: string;
  children: React.ReactNode;
  backgroundImage?: string | null;
}) => {
  const [dominantColor, setDominantColor] = useState<string>("rgba(0,0,0,0.5)");
  const [showDescription, setShowDescription] = useState<boolean>(false);

  useEffect(() => {
    setShowDescription(false);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = backgroundImage ? backgroundImage : "";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;

      if (ctx) {
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, 1, 1).data;
        const red = imageData[0];
        const green = imageData[1];
        const blue = imageData[2];
        const dominantColor = `rgba(${red}, ${green}, ${blue}, 0.8)`;
        setDominantColor(dominantColor);
      }
    };
  }, [backgroundImage]);
  return (
    <div
      className={cn(
        "relative z-20 h-full w-full overflow-hidden rounded-2xl border border-transparent bg-black p-5 group-hover:border-slate-700 dark:border-slate-700",
        className,
      )}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {}
      }
    >
      <div
        className="absolute inset-0 z-30"
        style={{
          background: `linear-gradient(to bottom, ${dominantColor}, rgba(0, 0, 0, 0.2))`,
          padding: 0,
          margin: 0,
        }}
      ></div>

      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("mt-4 font-bold tracking-wide text-zinc-100", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-sm leading-relaxed tracking-wide text-zinc-400",
        className,
      )}
    >
      {children}
    </p>
  );
};
