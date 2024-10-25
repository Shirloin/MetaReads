"use client";
import { useState } from "react";
import { motion } from "framer-motion";

type Card = {
    id: number;
    name: string;
    designation: string;
    content: React.ReactNode;
};

export const CardStack = ({
    items,
    offset,
    scaleFactor,
}: {
    items: Card[];
    offset?: number;
    scaleFactor?: number;
}) => {
    const CARD_OFFSET = offset || 10;
    const SCALE_FACTOR = scaleFactor || 0.06;
    const [cards, setCards] = useState<Card[]>(items);

    const handleNext = () => {
        setCards((prevCards: Card[]) => {
            const newArray = [...prevCards];
            newArray.unshift(newArray.pop()!); // Move the last element to the front
            return newArray;
        });
    };

    const handlePrev = () => {
        setCards((prevCards: Card[]) => {
            const newArray = [...prevCards];
            newArray.push(newArray.shift()!); // Move the first element to the back
            return newArray;
        });
    };

    return (
        <div className="relative">
            <div className="relative h-80 w-60 md:h-60 md:w-96">
                {cards.map((card, index) => {
                    return (
                        <motion.div
                            key={card.id}
                            className="absolute dark:bg-black bg-white h-60 w-60 md:h-60 md:w-96 rounded-3xl p-4 shadow-xl border border-neutral-200 dark:border-white/[0.1] shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
                            style={{
                                transformOrigin: "top center",
                            }}
                            animate={{
                                top: index * -CARD_OFFSET,
                                scale: 1 - index * SCALE_FACTOR, // Decrease scale for cards that are behind
                                zIndex: cards.length - index, // Decrease z-index for the cards that are behind
                            }}
                        >
                            <div className="font-normal text-neutral-700 dark:text-neutral-200 max-h-70 overflow-y-auto">
                                {card.content}
                            </div>
                            <div>
                                <p className="text-neutral-500 font-medium dark:text-white">
                                    {card.name}
                                </p>
                                <p className="text-neutral-400 font-normal dark:text-neutral-200">
                                    {card.designation}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
            <div className="mt-4 flex justify-center space-x-4">
                <button
                    className="px-4 py-2 dark:bg-black text-white rounded-md"
                    onClick={handlePrev}
                >
                    Prev
                </button>
                <button
                    className="px-4 py-2 dark:bg-black text-white rounded-md"
                    onClick={handleNext}
                >
                    Next
                </button>
            </div>
        </div>
    );
};
