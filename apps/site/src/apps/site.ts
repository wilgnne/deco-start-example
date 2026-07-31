import type { WebsiteProps } from "@decocms/apps/website/mod";

/**
 * @title Site
 */
export interface Props extends WebsiteProps {
}

export default function Site(_props: Props) {
  return { state: _props };
}
