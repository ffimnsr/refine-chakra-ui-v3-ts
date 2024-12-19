import type { BoxProps } from "@chakra-ui/react"

export const layoutProps: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  minHeight: "100dvh",
  padding: "16px",
}

export const cardProps: BoxProps = {
  width: "100%",
  maxWidth: "400px",
  borderRadius: "12px",
  padding: "32px",
}

export const titleProps: BoxProps = {
  textAlign: "center",
  fontSize: "24px",
}
