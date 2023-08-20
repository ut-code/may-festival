import { Box } from "@chakra-ui/react";
import React from "react";

type DrawCircleProps = {
  color: string;
  value: string;
  absoluteX: number;
  absoluteY: number;
};

export function DrawCircle(props: DrawCircleProps) {
  return (
    <Box
      color="black"
      backgroundColor={props.color}
      width="60px"
      height="60px"
      borderRadius="50%"
      border="1px solid black"
      textAlign="center"
      lineHeight="60px"
      position="absolute"
      top={props.absoluteY - 30}
      left={props.absoluteX - 30}
      zIndex={2}
    >
      <div>
        {props.value.split("\n").map((line, idx) => (
          <>
            <div style={{ marginBottom: "0.5px" }}>
              {/* ここの marginBottom の値を調整してください */}
              {line}
            </div>
            {/* {idx !== props.value.split("\n").length - 1 && <br />} */}
          </>
        ))}
      </div>
    </Box>
  );
}
