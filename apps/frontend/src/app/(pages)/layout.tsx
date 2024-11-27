import Page from "@/components/template/Page";
import { EventContextProvider } from "@/data/contexts/EventContext";

export default function Layout(props: any) {
  return (
    <EventContextProvider>
      <Page>{props.children}</Page>
    </EventContextProvider>
  )
}