"use client";

import { Loading } from "@/components/Loading";
import { FC, Fragment, useEffect, useRef, useState } from "react";

import { CreatableAutoComplete } from "@/components/CreatableAutoComplete";
import { useEditNoteToTagRelations } from "@/hooks/noteToTagRelation/useEditNoteToTagRelations";
import {
  useMutateNoteToTagRelations,
  useNoteToTagRelations,
} from "@/hooks/noteToTagRelation/useNoteToTagRelations";
import { useCreateTag } from "@/hooks/tag/useCreateTag";
import { useMutateTags, useTags } from "@/hooks/tag/useTags";
import { useUpdateVocabularyNoteDebounced } from "@/hooks/useUpdateVocabularyNoteDebounced";
import { useMutateVocabularyNotes } from "@/hooks/vocabularyNote/useVocabularyNotes";
import { tRPCClient } from "@/libs/tRPCClient";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";

export const EditVocabularyNoteDialogCore: FC<{
  vocabularyNoteId: string;
  onClose: () => void;
}> = ({ onClose, vocabularyNoteId }) => {
  const isFirstFetched = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [vocabularyNote, setVocabularyNote] = useState<{
    readonly id: string;
    readonly frontContent: string;
    readonly backContent: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
  } | null>(null);

  useEffect(() => {
    if (isFirstFetched.current) return;
    setIsLoading(true);
    isFirstFetched.current = true;
    // const vocabularyNote =
    //     await
    tRPCClient.vocabularyNotes.getVocabularyNote
      .query({
        vocabularyNoteId,
      })
      .then((response) => {
        setVocabularyNote(response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [vocabularyNoteId]);

  if (isLoading || !vocabularyNote) return <Loading />;

  return (
    <EditVocabularyNoteDialog
      vocabularyNote={vocabularyNote}
      onClose={onClose}
    />
  );
};

const EditVocabularyNoteDialog: FC<{
  vocabularyNote: {
    readonly id: string;
    readonly frontContent: string;
    readonly backContent: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
  };
  onClose: () => void;
}> = ({ vocabularyNote, onClose }) => {
  const { updateVocabularyNoteDebounced } = useUpdateVocabularyNoteDebounced();
  const { data: tags = [] } = useTags();
  const {
    data: noteToTagsRelations = [],
    isLoading: isLoadingNoteToTagRelations,
  } = useNoteToTagRelations({
    noteId: vocabularyNote.id,
  });
  const { mutateNoteToTagRelations } = useMutateNoteToTagRelations();
  const { mutateTags } = useMutateTags();
  const { mutate: mutateVocabularyNotes } = useMutateVocabularyNotes();

  const { editNoteToTagRelations } = useEditNoteToTagRelations();
  const isOpen = !!vocabularyNote;

  const { createTagWithId } = useCreateTag();
  const [content, setContent] = useState({
    frontContent: vocabularyNote?.frontContent || "",
    backContent: vocabularyNote?.backContent || "",
  });

  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="transition duration-100 ease-out"
      enterFrom="transform translate-y-4 opacity-0"
      enterTo="transform translate-y-0 opacity-100"
      leave="transition duration-75 ease-in"
      leaveFrom="transform translate-y-0 opacity-100"
      leaveTo="transform translate-y-4 opacity-0"
    >
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center">
          <DialogPanel className="w-screen max-w-sm rounded bg-white  p-2">
            <DialogTitle>単語帳編集</DialogTitle>
            <div className="h-10">
              {isLoadingNoteToTagRelations ? (
                <Loading />
              ) : (
                <CreatableAutoComplete
                  onCreateItem={async (item) => {
                    createTagWithId({
                      tagId: item.value,
                      tagName: item.label,
                    }).then(() => {
                      mutateTags();
                    });
                  }}
                  defaultValueIds={noteToTagsRelations.map((r) => r.tagId)}
                  onChange={(e) => {
                    console.log(e);
                    editNoteToTagRelations({
                      noteId: vocabularyNote.id,
                      tagIds: e.map((v) => v.value),
                    }).then(() => {
                      mutateNoteToTagRelations({
                        noteId: vocabularyNote.id,
                      });
                      mutateVocabularyNotes();
                    });
                  }}
                  options={[
                    ...tags.map((tag) => {
                      return {
                        value: tag.id,
                        label: tag.name,
                      };
                    }),
                  ]}
                  placeholder="タグを選択"
                />
              )}
            </div>
            <Description>
              <textarea
                className="w-full h-20 p-2 border border-gray-300 rounded p-1"
                value={content.frontContent}
                onChange={(e) => {
                  const newContent = e.target.value;
                  setContent({
                    ...content,
                    frontContent: newContent,
                  });
                  updateVocabularyNoteDebounced({
                    noteId: vocabularyNote.id,
                    kind: "frontContent",
                    content: newContent,
                  });
                }}
                placeholder="表面"
              />
              <textarea
                className="w-full h-40 p-2 border border-gray-300 rounded"
                value={content.backContent}
                onChange={(e) => {
                  const newContent = e.target.value;
                  setContent({
                    ...content,
                    backContent: newContent,
                  });
                  updateVocabularyNoteDebounced({
                    noteId: vocabularyNote.id,
                    kind: "backContent",
                    content: newContent,
                  });
                }}
                placeholder="裏面"
              />
            </Description>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
};
