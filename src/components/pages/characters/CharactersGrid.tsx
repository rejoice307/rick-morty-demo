'use client'
import React from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Pagination,
  Stack,
  Typography,
} from '@mui/material'
import { useEffect, useState, type ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchCharacters, setCurrentPage } from '@/redux/slices/characters'
import type { AppDispatch, RootState } from '@/redux/store'
import type { CharacterType } from '@/types/data'
const CharactersGrid = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { results, currentPage, pages } = useSelector(
    (state: RootState) => state.characters
  )
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(fetchCharacters(currentPage))
  }, [dispatch, currentPage])

  const handlePageChange = (_: ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage(value))
    setPage(value)
  }

  return (
    <>
      <Grid container spacing={4}>
        {results.map((character: CharacterType) => (
          <Grid item xs={12} sm={6} md={4} key={character.id}>
            <Card
              sx={{
                display: 'flex',
                maxWidth: 500,
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <CardMedia
                component="img"
                alt={character.name}
                sx={{ width: 300, height: 'auto' }}
                image={character.image}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Typography variant="h6" component="div" gutterBottom>
                      {character.name}
                    </Typography>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Chip
                        label={character.status}
                        color={
                          character.status === 'Alive'
                            ? 'success'
                            : character.status === 'Dead'
                              ? 'error'
                              : 'default'
                        }
                      />
                      <Chip
                        label={character.gender}
                        color={
                          character.gender === 'Female'
                            ? 'secondary'
                            : character.gender === 'Male'
                              ? 'primary'
                              : 'default'
                        }
                      />
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Species:</strong> {character.species}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Origin:</strong> {character.origin.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Location:</strong> {character.location.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      <strong>Created:</strong>{' '}
                      {new Date(character.created).toLocaleDateString()}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 'auto' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      href={character.url}
                      target="_blank"
                      fullWidth
                    >
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      {!!results.length && (
        <Stack sx={{ alignItems: 'center', mt: 2 }}>
          <Pagination
            count={pages}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      )}
    </>
  )
}

export default CharactersGrid
