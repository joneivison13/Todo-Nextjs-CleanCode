import React, { ComponentProps, ReactSVGElement } from "react";
import { tv } from "tailwind-variants";
import Badge, { BadgeProps } from "../Badge";
import Image from "next/image";

// import { Container } from './styles';

const buttonStyles = tv({
  base: "relative flex gap-4 items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",
  variants: {
    type: {
      base: "",
      circle: "p-3 rounded-full",
    },
  },
  defaultVariants: {},
});

export type ButtonProps = ComponentProps<"button"> & {
  variants?: "base" | "circle" | undefined;
  // badge?: {
  //   position:
  //     | "top-left"
  //     | "top-right"
  //     | "top"
  //     | "left"
  //     | "right"
  //     | "bottom-right"
  //     | "bottom"
  //     | "bottom-left";
  //   content: string;
  // };
  badge?: BadgeProps;
  icon?: {
    icon: string | any;
    description: string;
    width?: number | 50;
    height?: number | 50;
  };
  text?: string;
};

const Buttons = ({
  variants = "base",
  icon,
  text,
  badge,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      type="button"
      className={buttonStyles({ type: variants }) + " " + props.className}
    >
      {typeof icon?.icon === "string" ? (
        <Image
          src={icon?.icon}
          alt={icon?.description}
          width={icon.width || 50}
          height={icon.height || 50}
        />
      ) : (
        icon?.icon
      )}
      {text}
      <span className="sr-only">{icon?.description}</span>
      <Badge
        content={badge?.content || ""}
        position={badge?.position || "top-left"}
        activity={badge?.activity}
      />
    </button>
  );
};

export default Buttons;
