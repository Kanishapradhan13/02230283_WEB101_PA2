import {create} from 'zustand';

const useStore = create((set) => ({
  caughtPokemons: JSON.parse(localStorage.getItem('caughtPokemons')) || [],
  addPokemon: (pokemon) =>
    set((state) => {
      const caughtPokemons = [...state.caughtPokemons, pokemon];
      localStorage.setItem('caughtPokemons', JSON.stringify(caughtPokemons));
      return { caughtPokemons };
    }),
  releasePokemon: (pokemonName) =>
    set((state) => {
      const caughtPokemons = state.caughtPokemons.filter((p) => p.name !== pokemonName);
      localStorage.setItem('caughtPokemons', JSON.stringify(caughtPokemons));
      return { caughtPokemons };
    }),
}));
  
export default useStore;
