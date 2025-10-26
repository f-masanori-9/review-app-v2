import { useCallback } from 'react';
import { tRPCClient } from '@/libs/tRPCClient';
import { useMutateTags } from './useTags';

export const useDeleteTag = () => {
  const { mutateTags } = useMutateTags();
  const deleteTag = useCallback(
    async ({ tagId }: { tagId: string }) => {
      await tRPCClient.tags.deleteTag.mutate({
        tagId,
      });
      await mutateTags();
    },
    [mutateTags],
  );

  return { deleteTag };
};
