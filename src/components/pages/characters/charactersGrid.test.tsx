import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore, { MockStoreEnhanced } from 'redux-mock-store'
import CharactersGrid from './CharactersGrid'
import { fetchCharacters } from '@/redux/slices/characters'
import '@testing-library/jest-dom'

jest.mock('@/redux/slices/characters', () => ({
  fetchCharacters: jest.fn(),
  setCurrentPage: jest.fn(),
}))

const mockStore = configureStore([])

describe('CharactersGrid Component', () => {
  let store: MockStoreEnhanced<unknown>

  beforeEach(() => {
    store = mockStore({
      characters: {
        results: [
          {
            id: 1,
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            gender: 'Male',
            origin: { name: 'Earth' },
            location: { name: 'Citadel of Ricks' },
            image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
            created: '2017-11-04T18:48:46.250Z',
            url: 'https://rickandmortyapi.com/api/character/1',
          },
        ],
        currentPage: 1,
        pages: 10,
      },
    })
    store.dispatch = jest.fn()
  })

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <CharactersGrid />
      </Provider>
    )
  }

  it('renders character cards', () => {
    renderComponent()
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
    expect(screen.getByText(/Species:/)).toBeInTheDocument()
    expect(screen.getByText(/Origin:/)).toBeInTheDocument()
    expect(screen.getByText(/Location:/)).toBeInTheDocument()
  })

  it('dispatches fetchCharacters on mount', () => {
    renderComponent()
    expect(store.dispatch).toHaveBeenCalledWith(fetchCharacters(1))
  })
})
