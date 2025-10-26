'use client';

import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import type { FC } from 'react';
import { Loading } from '@/components/Loading';
import type { TagsPresenterProps } from '../types/tag';

export const TagsPresenter: FC<TagsPresenterProps> = ({
  tags,
  isLoading,
  onAddTag,
  onDeleteTag,
}) => {
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box
      sx={{
        height: 'calc(100vh - 64px)',
        overflow: 'auto',
        p: 1,
        bgcolor: 'background.default',
      }}
    >
      <Stack spacing={2}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" component="h1" fontWeight="bold">
            タグ管理
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddTag}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 'bold',
            }}
          >
            新しいタグを追加
          </Button>
        </Box>

        {tags.length === 0 ? (
          <Card
            sx={{
              textAlign: 'center',
              py: 8,
              bgcolor: 'grey.50',
              border: '2px dashed',
              borderColor: 'grey.300',
            }}
          >
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                タグがありません
              </Typography>
              <Typography variant="body2" color="text.secondary">
                「新しいタグを追加」ボタンから最初のタグを作成しましょう
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Stack spacing={1} pb={'100px'}>
            {tags.map((tag) => (
              <Card
                key={tag.id}
                variant="outlined"
                sx={{
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    boxShadow: 2,
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 1,
                    '&:last-child': { pb: 1 },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'medium',
                      color: 'text.primary',
                    }}
                  >
                    {tag.name}
                  </Typography>
                  <IconButton
                    color="error"
                    onClick={() => onDeleteTag(tag.id)}
                    sx={{
                      '&:hover': {
                        bgcolor: 'error.light',
                        color: 'white',
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Stack>
    </Box>
  );
};
