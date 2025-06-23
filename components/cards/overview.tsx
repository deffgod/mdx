"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Card = {
  id: number;
  title: string;
  description: string;
  sm: string;
  color: string;
};

const CARDS: Card[] = [
  {
    id: 1,
    title: "The Odyssey",
    sm: "Explore unknown galaxies.",
    color: "bg-blue-500",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis, justo id ullamcorper fermentum, felis lectus facilisis ex, sed consectetur lectus nisi in metus.",
  },
  {
    id: 2,
    title: "Angry Rabbit",
    sm: "They are coming for you.",
    color: "bg-red-500",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis, justo id ullamcorper fermentum, felis lectus facilisis ex, sed consectetur lectus nisi in metus.",
  },
  {
    id: 3,
    title: "Ghost Town",
    sm: "Scary ghost.",
    color: "bg-purple-500",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis, justo id ullamcorper fermentum, felis lectus facilisis ex, sed consectetur lectus nisi in metus.",
  },
  {
    id: 4,
    title: "Pirates in the Jungle",
    sm: "Find the treasure.",
    color: "bg-green-500",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis, justo id ullamcorper fermentum, felis lectus facilisis ex, sed consectetur lectus nisi in metus.",
  },
  {
    id: 5,
    title: "Lost in the Mountains",
    sm: "Be careful.",
    color: "bg-orange-500",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lobortis, justo id ullamcorper fermentum, felis lectus facilisis ex, sed consectetur lectus nisi in metus.",
  },
];

const Overview = () => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  return (
    <div className="h-full flex items-center justify-center w-full relative">
      <motion.ul
        className={`flex flex-col gap-4 justify-center items-center max-w-md w-full`}
        layout
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {CARDS.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => setSelectedCard(card)}
          />
        ))}
      </motion.ul>
      <Modal card={selectedCard} onClick={() => setSelectedCard(null)} />
    </div>
  );
};

function Card(props: { card: Card; onClick: () => void }) {
  return (
    <motion.li
      key={props.card.title}
      className="w-full text-primary-foreground cursor-pointer"
      layoutId={`card-${props.card.id}`}
      onClick={props.onClick}
    >
      <div className="flex gap-6 h-20">
        <div className={`min-w-20 h-20 rounded-3xl w-20 ${props.card.color}`} />
        <div className="border-b h-full items-start justify-center flex flex-col  flex-1 dark:border-neutral-800 border-neutral-200">
          <div className="flex items-center justify-between w-full">
            <div>
              <motion.h2
                className="font-semibold text-xl text-secondary-foreground"
                layoutId={`title-${props.card.id}`}
              >
                {props.card.title}
              </motion.h2>
              <motion.p
                className="text-muted-foreground"
                layoutId={`title-sm-${props.card.id}`}
              >
                {props.card.sm}
              </motion.p>
            </div>
            <button className="py-1 px-3 rounded-full bg-blue-50 text-blue-500 text-sm font-semibold">
              Get
            </button>
          </div>
        </div>
      </div>
      <motion.span layoutId={`description-${props.card.id}`} />
    </motion.li>
  );
}

function Modal(props: { card: Card | null; onClick: () => void }) {
  return (
    <>
      <AnimatePresence>
        {!!props.card && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-0 bg-secondary/50"
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!!props.card && (
          <motion.div
            className="fixed inset-0 z-10 flex flex-col justify-center items-center"
            onClick={props.onClick}
          >
            <motion.div
              className="p-4 w-fit  relative overflow-hidden flex items-center justify-center flex-col bg-background rounded-3xl"
              layoutId={`card-${props.card.id}`}
            >
              <div className="max-w-xl mx-auto flex flex-col gap-4">
                <div className="flex gap-4">
                  <div className={`min-w-20 h-20 rounded-3xl w-20 ${props.card.color}`} />
                  <div className="h-full items-start justify-center flex flex-col  flex-1">
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <motion.h2
                          className="font-semibold text-xl text-secondary-foreground"
                          layoutId={`title-${props.card.id}`}
                        >
                          {props.card.title}
                        </motion.h2>
                        <motion.p
                          className="text-muted-foreground"
                          layoutId={`title-sm-${props.card.id}`}
                        >
                          {props.card.sm}
                        </motion.p>
                      </div>
                      <button className="py-1 px-3 rounded-full bg-blue-50 text-blue-500 text-sm font-semibold">
                        Get
                      </button>
                    </div>
                  </div>
                </div>
                <motion.p
                  className="text-[#969799] font-medium text-[15px]"
                  layoutId={`description-${props.card.id}`}
                >
                  {props.card.description}
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Overview;