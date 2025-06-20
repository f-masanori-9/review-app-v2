import { tRPCClient } from "@/libs/tRPCClient";
import { useCallback } from "react";
import useSWR, { mutate } from "swr";

export const generateSWRKey = () => {
  return {
    path: "useTags",
  } as const;
};

export const useTags = () => {
  return useSWR(generateSWRKey(), async () => {
    const { tags } = await tRPCClient.tags.getTags.query({});

    return tags;
  });
};

export const useMutateTags = () => {
  const mutateTags = useCallback(async () => {
    await mutate(generateSWRKey());
  }, []);

  return { mutateTags };
};
