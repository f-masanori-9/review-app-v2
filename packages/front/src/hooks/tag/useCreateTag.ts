import { useCallback } from 'react';
import { tRPCClient } from '@/libs/tRPCClient';
import { useMutateTags } from './useTags';

export const useCreateTag = () => {
  const { mutateTags } = useMutateTags();
  const createTag = useCallback(
    async ({ tagName }: { tagName: string }) => {
      await tRPCClient.tags.createTag.mutate({
        tagName,
      });

      await mutateTags();
    },
    [mutateTags],
  );

  const createTagWithId = useCallback(
    async ({ tagName, tagId }: { tagName: string; tagId: string }) => {
      await tRPCClient.tags.createTag.mutate({
        tagName,
        tagId,
      });
      await mutateTags();
    },
    [mutateTags],
  );

  return { createTag, createTagWithId };
};
