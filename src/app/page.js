"use client";
import React, { useState, useEffect } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import usestore from '../store/store';  // Adjust the path based on your directory structure
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis
} from "../components/ui/pagination";

const PokemonApp = () => {
  const [query, setQuery] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [view, setView] = useState('search');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const caughtPokemons = usestore((state) => state.caughtPokemons);
  const addPokemon = usestore((state) => state.addPokemon);
  const releasePokemon = usestore((state) => state.releasePokemon);

  const handleSearch = async () => {
    if (query.trim()) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
        if (response.ok) {
          const data = await response.json();
          setSelectedPokemon(data);
          setPokemons([]); // Clear the list of the first 20 Pokémon when searching for a specific one
          fetchSpeciesData(data.species.url);
          addPokemon(data);
        } else {
          setSelectedPokemon(null);
          alert('Pokemon not found!');
        }
      } catch (error) {
        console.error('Error fetching the Pokémon:', error);
      }
    }
  };

  const handleClick = async (pokemonName) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedPokemon(data);
        fetchSpeciesData(data.species.url);
        addPokemon(data);
      } else {
        alert('Pokemon not found!');
      }
    } catch (error) {
      console.error('Error fetching the Pokémon:', error);
    }
  };

  const fetchSpeciesData = async (url) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setSpeciesData(data);
      } else {
        setSpeciesData(null);
        alert('Species data not found!');
      }
    } catch (error) {
      console.error('Error fetching the species data:', error);
    }
  };

  const switchToCaughtPage = () => {
    setView('caught');
  };

  const switchToSearchPage = () => {
    setView('search');
  };

  useEffect(() => {
    if (view === 'search') {
      const fetchPokemons = async () => {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`);
          const data = await response.json();

          const pokemonDetails = await Promise.all(
            data.results.map(async (pokemon) => {
              const detailsResponse = await fetch(pokemon.url);
              return await detailsResponse.json();
            })
          );

          setPokemons(pokemonDetails);
          setTotalPages(Math.ceil(data.count / 20));
        } catch (error) {
          console.error('Error fetching the Pokémon:', error);
        }
      };

      fetchPokemons();
    }
  }, [view, page]);

  return (
    <div>
      <div className="flex m-8">
        {view === 'search' && (
          <>
            <Input
              className="w-1/2"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a Pokemon..."
            />
            <Button className="mx-8" onClick={handleSearch}>
              Search
            </Button>
          </>
        )}
        {view === 'caught' && (
          <Button className="mx-8" onClick={switchToSearchPage}>
            Back to Search
          </Button>
        )}
        <Button className="mx-8" onClick={switchToCaughtPage}>
          Caught Pokémons
        </Button>
      </div>
      {view === 'search' ? (
        <div>
          {selectedPokemon ? (
            <div className="bg-white shadow-md rounded-lg p-4">
              <div className="flex justify-center">
                <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} className="w-24 h-24 object-contain mb-4" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-center">{selectedPokemon.name}</h3>
              <p className="text-sm text-center">Weight: {selectedPokemon.weight}</p>
              <p className="text-sm text-center">Height: {selectedPokemon.height}</p>
              <p className="text-sm text-center">Types: {selectedPokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
              <p className="text-sm text-center">Stats:</p>
              <ul className="text-sm text-center">
                {selectedPokemon.stats.map(stat => (
                  <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
                ))}
              </ul>
              {speciesData && (
                <p className="text-sm text-center">
                  Description: {
                    speciesData.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text
                  }
                </p>
              )}
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-4">20 Pokémons:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {pokemons.map((pokemon) => (
                  <div
                    key={pokemon.name}
                    className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
                    onClick={() => handleClick(pokemon.name)}
                  >
                    <div className="flex justify-center">
                      <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-24 h-24 object-contain mb-4" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-center">{pokemon.name}</h3>
                    <p className="text-sm text-center">Weight: {pokemon.weight}</p>
                    <p className="text-sm text-center">Height: {pokemon.height}</p>
                    <p className="text-sm text-center">Types: {pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
                  </div>
                ))}
              </div>
              <Pagination className="flex justify-center mt-4">
                <PaginationContent>
                  <PaginationPrevious onClick={() => setPage(page - 1)} disabled={page === 1} />
                  {page > 2 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
                  {page > 1 && (
                    <PaginationItem>
                      <PaginationLink onClick={() => setPage(page - 1)}>{page - 1}</PaginationLink>
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink isActive>{page}</PaginationLink>
                  </PaginationItem>
                  {page < totalPages && (
                    <PaginationItem>
                      <PaginationLink onClick={() => setPage(page + 1)}>{page + 1}</PaginationLink>
                    </PaginationItem>
                  )}
                  {page < totalPages - 1 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
                  <PaginationNext onClick={() => setPage(page + 1)} disabled={page === totalPages} />
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Caught Pokémon:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {caughtPokemons.map((pokemon) => (
              <div key={pokemon.name} className="bg-white shadow-md rounded-lg p-4">
                <div className="flex justify-center">
                  <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-24 h-24 object-contain mb-4" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-center">{pokemon.name}</h3>
                <p className="text-sm text-center">Weight: {pokemon.weight}</p>
                <p className="text-sm text-center">Height: {pokemon.height}</p>
                <p className="text-sm text-center">Types: {pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
                <Button className="mt-4" onClick={() => releasePokemon(pokemon.name)}>
                  Release
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonApp;
