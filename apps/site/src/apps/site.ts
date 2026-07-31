import type { WebsiteProps } from "@decocms/apps/website/mod";

export interface Props extends WebsiteProps {
}

export default function Site(props: Props) {
  return { state: props };
}
