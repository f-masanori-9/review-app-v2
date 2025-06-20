import useSWR, { mutate } from "swr";
import { useCallback, useState } from "react";
import { tRPCClient } from "@/libs/tRPCClient";

export const generateSWRKey = () => {
  return {
    path: "vocabulary-notes",
  } as const;
};
export const fetcher = async ({ path }: { path: "vocabulary-notes" }) => {
  const { vocabularyNotes } =
    await tRPCClient.vocabularyNotes.getVocabularyNotes.query({});

  return vocabularyNotes;
};

export const useVocabularyNotes = () => {
  return useSWR(generateSWRKey(), (key) => fetcher(key));
};

export const useMutateVocabularyNotes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const mutateVocabularyNotes = useCallback(async () => {
    try {
      setIsLoading(true);
      await mutate(generateSWRKey());
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { mutate: mutateVocabularyNotes, isLoading };
};
