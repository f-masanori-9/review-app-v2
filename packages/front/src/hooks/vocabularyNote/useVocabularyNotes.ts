import { useCallback, useState } from 'react';
import useSWR, { mutate } from 'swr';
import useSWRImmutable from 'swr/immutable';
import type { VocabularyNote } from '@/app/vocabularyNotes/types';
import { tRPCClient } from '@/libs/tRPCClient';
export const generateSWRKey = () => {
  return {
    path: 'vocabulary-notes',
  } as const;
};

export const fetcher = async () => {
  const { vocabularyNotes } =
    await tRPCClient.vocabularyNotes.getVocabularyNotes.query({});

  return vocabularyNotes;
};

export const useVocabularyNotes = () => {
  return useSWR(generateSWRKey(), () => {
    return fetcher();
  });
};

export const useVocabularyNotesSWRImmutable = () => {
  return useSWRImmutable(generateSWRKey(), () => fetcher());
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

  // ローカルのswrキャッシュのみを更新する関数
  const mutateVocabularyNotesLocalOnly = useCallback(
    async (
      updatedVN: {
        id: string;
        frontContent?: string;
        backContent?: string;
      },
      addDummyLog?: boolean,
    ) => {
      mutate(
        generateSWRKey(),
        (prevData: VocabularyNote[] | undefined) => {
          if (!prevData) return prevData;

          return prevData.map((vn) => {
            if (vn.id === updatedVN.id) {
              return {
                ...vn,
                frontContent: updatedVN.frontContent ?? vn.frontContent,
                backContent: updatedVN.backContent ?? vn.backContent,
                reviewLogs: addDummyLog
                  ? [
                      ...vn.reviewLogs,
                      {
                        id: crypto.randomUUID(),
                        createdAt: new Date(),
                      },
                    ]
                  : vn.reviewLogs,
              };
            }
            return vn;
          });
        },
        false,
      );
    },
    [],
  );

  return {
    mutate: mutateVocabularyNotes,
    mutateVocabularyNotesLocalOnly,
    isLoading,
  };
};
