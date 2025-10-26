import type { PrismaClient } from '../../prisma/generated/prisma-client';
import { NoteToTagRelation } from '../models/NoteToTagRelation';
import { VocabularyNote } from '../models/VocabularyNote';

export class CreateVocabularyNoteService {
  constructor(private dbClient: PrismaClient) {}

  async createVocabularyNote({
    vocabularyNoteId,
    userId,
    frontContent,
    backContent,
    relatedTagIds,
  }: {
    vocabularyNoteId: string;
    userId: string;
    frontContent: string;
    backContent: string;
    relatedTagIds?: string[];
  }) {
    const vocabularyNote = VocabularyNote.createNew({
      id: vocabularyNoteId,
      userId,
      frontContent,
      backContent,
    });
    const tagIds = relatedTagIds || [];

    await this.dbClient.vocabularyNote.create({ data: { ...vocabularyNote } });
    if (tagIds.length > 0) {
      await this.dbClient.noteToTagRelation.createMany({
        data: tagIds.map((tagId) => ({
          ...NoteToTagRelation.createNew({
            userId,
            tagId,
            vocabularyNoteId: vocabularyNote.id,
          }),
        })),
      });
    }
    return vocabularyNote;
  }
}
