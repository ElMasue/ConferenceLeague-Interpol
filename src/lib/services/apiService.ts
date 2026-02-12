import type { Player, Criminal, Person } from '$lib/types';
import { get } from 'svelte/store';
import { currentLanguage } from '$lib/stores/i18n';

const API_BASE_URL = import.meta.env.PROD ? '' : '';

export const apiService = {
  // Obtener todos los jugadores
  async getPlayers(): Promise<Player[]> {
    try {
      const lang = get(currentLanguage);
      const fileName = lang === 'es' ? 'players.json' : `players.${lang}.json`;
      const response = await fetch(`${API_BASE_URL}/api/${fileName}`);
      
      // Si no existe el archivo traducido, usar el español por defecto
      if (!response.ok) {
        if (lang !== 'es') {
          const fallbackResponse = await fetch(`${API_BASE_URL}/api/players.json`);
          if (!fallbackResponse.ok) throw new Error('Error al obtener jugadores');
          return await fallbackResponse.json();
        }
        throw new Error('Error al obtener jugadores');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching players:', error);
      return [];
    }
  },

  // Obtener todos los criminales
  async getCriminals(): Promise<Criminal[]> {
    try {
      const lang = get(currentLanguage);
      const fileName = lang === 'es' ? 'criminals.json' : `criminals.${lang}.json`;
      const response = await fetch(`${API_BASE_URL}/api/${fileName}`);
      
      // Si no existe el archivo traducido, usar el español por defecto
      if (!response.ok) {
        if (lang !== 'es') {
          const fallbackResponse = await fetch(`${API_BASE_URL}/api/criminals.json`);
          if (!fallbackResponse.ok) throw new Error('Error al obtener criminales');
          return await fallbackResponse.json();
        }
        throw new Error('Error al obtener criminales');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching criminals:', error);
      return [];
    }
  },

  // Obtener una persona aleatoria (jugador o criminal)
  async getRandomPerson(excludeIds: string[] = []): Promise<Person | null> {
    try {
      const [players, criminals] = await Promise.all([
        this.getPlayers(),
        this.getCriminals()
      ]);

      let allPeople: Person[] = [...players, ...criminals];
      
      // Filtrar personas ya mostradas
      if (excludeIds.length > 0) {
        allPeople = allPeople.filter(person => !excludeIds.includes(person.id));
      }
      
      if (allPeople.length === 0) return null;

      const randomIndex = Math.floor(Math.random() * allPeople.length);
      return allPeople[randomIndex];
    } catch (error) {
      console.error('Error fetching random person:', error);
      return null;
    }
  },

  // Obtener una persona por ID
  async getPersonById(id: string): Promise<Person | null> {
    try {
      const [players, criminals] = await Promise.all([
        this.getPlayers(),
        this.getCriminals()
      ]);

      const allPeople: Person[] = [...players, ...criminals];
      return allPeople.find(person => person.id === id) || null;
    } catch (error) {
      console.error('Error fetching person by id:', error);
      return null;
    }
  }
};
