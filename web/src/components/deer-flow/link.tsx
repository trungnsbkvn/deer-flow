import { useMemo } from "react";
import { useStore, useToolCalls } from "~/core/store";
import { Tooltip } from "./tooltip";
import { WarningFilled } from "@ant-design/icons";

export const Link = ({
  href,
  children,
  checkLinkCredibility = false,
}: {
  href: string | undefined;
  children: React.ReactNode;
  checkLinkCredibility: boolean;
}) => {
  const toolCalls = useToolCalls();
  const responding = useStore((state) => state.responding);

  const credibleLinks = useMemo(() => {
    const links = new Set<string>();
    if (!checkLinkCredibility) return links;

    (toolCalls || []).forEach((call) => {
      if (call && call.name === "web_search" && call.result) {
        const result = JSON.parse(call.result) as Array<{ url: string }>;
        result.forEach((r) => {
          links.add(r.url);
        });
      }
    });
    return links;
  }, [toolCalls]);

  const isCredible = useMemo(() => {
    return checkLinkCredibility && href && !responding
      ? credibleLinks.has(href)
      : true;
  }, [credibleLinks, href, responding, checkLinkCredibility]);

  return (
    <span className="flex items-center gap-1.5">
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
      {!isCredible && (
        <Tooltip
          title="Liên kết này có thể là sản phẩm tưởng tượng từ mô hình AI và có thể không đáng tin cậy."
          delayDuration={300}
        >
          <WarningFilled className="text-sx transition-colors hover:!text-yellow-500" />
        </Tooltip>
      )}
    </span>
  );
};
