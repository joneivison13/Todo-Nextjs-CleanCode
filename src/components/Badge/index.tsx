import { usePlatformType } from "@/hooks/usePlatforms";
import React from "react";

// import { Container } from './styles';

export type BadgeProps = React.ComponentProps<"span"> & {
  position:
    | "top-left"
    | "top-right"
    | "top"
    | "left"
    | "right"
    | "bottom-right"
    | "bottom"
    | "bottom-left";
  content: string;
  activity?: ["hideon-mobile"];
};

const Badge = ({ content, position, activity }: BadgeProps) => {
  const platform = usePlatformType();

  const positionClasses = {
    "top-left": "absolute -top-3 -left-3",
    "top-right": "absolute -top-3 -right-3",
    top: "absolute -top-3 -left-1/2 transform -translate-x-1/2",
    left: "absolute -left-3 -top-1/2 transform -translate-y-1/2",
    right: "absolute -right-3 -top-1/2 transform -translate-y-1/2",
    "bottom-right": "absolute -bottom-3 -right-3",
    bottom: "absolute -bottom-3 -left-1/2 transform -translate-x-1/2",
    "bottom-left": "absolute -bottom-3 -left-3",
  };

  return (
    <>
      {activity?.includes("hideon-mobile") && platform === "mobile" ? (
        <></>
      ) : (
        <span
          className={
            positionClasses[position] + " bg-slate-700 px-2 rounded-md"
          }
        >
          {content}
        </span>
      )}
    </>
  );
};

export default Badge;
