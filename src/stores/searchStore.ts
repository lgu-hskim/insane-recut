import { create } from 'zustand';

interface SearchState {
  searchTerm: string;
  isSearchOpen: boolean;
  searchResults: any;
  isSearching: boolean;
  setSearchTerm: (term: string) => void;
  setIsSearchOpen: (open: boolean) => void;
  setSearchResults: (results: any) => void;
  setIsSearching: (searching: boolean) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchTerm: '',
  isSearchOpen: false,
  searchResults: null,
  isSearching: false,
  setSearchTerm: (term) => set({ searchTerm: term }),
  setIsSearchOpen: (open) => set({ isSearchOpen: open }),
  setSearchResults: (results) => set({ searchResults: results }),
  setIsSearching: (searching) => set({ isSearching: searching }),
  clearSearch: () => set({ 
    searchTerm: '', 
    isSearchOpen: false, 
    searchResults: null, 
    isSearching: false 
  }),
})); 