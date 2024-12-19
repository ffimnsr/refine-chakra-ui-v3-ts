import { Accordion, HStack, type HTMLChakraProps } from "@chakra-ui/react"
import type { Accordion as ArkAccordion } from "@ark-ui/react"
import * as React from "react"
import { LuChevronDown } from "react-icons/lu"

export interface ChakraAccordionItemProps
  extends HTMLChakraProps<"div", ArkAccordion.ItemBaseProps> {}
export declare const ChakraAccordionItem: React.ForwardRefExoticComponent<
  ChakraAccordionItemProps & React.RefAttributes<HTMLDivElement>
>
export interface ChakraAccordionItemContentProps
  extends HTMLChakraProps<"div", ArkAccordion.ItemContentBaseProps> {}
export interface ChakraAccordionItemTriggerProps
  extends HTMLChakraProps<"button", ArkAccordion.ItemTriggerBaseProps> {}
export declare const ChakraAccordionItemTrigger: React.ForwardRefExoticComponent<
  ChakraAccordionItemTriggerProps & React.RefAttributes<HTMLButtonElement>
>
export interface ChakraAccordionItemIndicatorProps
  extends HTMLChakraProps<"button", ArkAccordion.ItemIndicatorBaseProps> {}
export declare const ChakraAccordionItemIndicator: React.ForwardRefExoticComponent<
  ChakraAccordionItemIndicatorProps & React.RefAttributes<HTMLDivElement>
>

interface AccordionItemTriggerProps extends ChakraAccordionItemTriggerProps {
  indicatorPlacement?: "start" | "end"
}

export const AccordionItemTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionItemTriggerProps
>(function AccordionItemTrigger(props, ref) {
  const { children, indicatorPlacement = "end", ...rest } = props
  return (
    <ChakraAccordionItemTrigger {...rest} ref={ref}>
      {indicatorPlacement === "start" && (
        <ChakraAccordionItemIndicator
          rotate={{ base: "-90deg", _open: "0deg" }}
        >
          <LuChevronDown />
        </ChakraAccordionItemIndicator>
      )}
      <HStack gap="4" flex="1" textAlign="start" width="full">
        {children}
      </HStack>
      {indicatorPlacement === "end" && (
        <ChakraAccordionItemIndicator>
          <LuChevronDown />
        </ChakraAccordionItemIndicator>
      )}
    </ChakraAccordionItemTrigger>
  )
})

interface AccordionItemContentProps extends ChakraAccordionItemContentProps {}

export const AccordionItemContent = React.forwardRef<
  HTMLDivElement,
  AccordionItemContentProps
>(function AccordionItemContent(props, ref) {
  return (
    <Accordion.ItemContent>
      <Accordion.ItemBody {...props} ref={ref} />
    </Accordion.ItemContent>
  )
})

export const AccordionRoot = Accordion.Root
export const AccordionItem = ChakraAccordionItem
