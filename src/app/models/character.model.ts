export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[]; // Lista de URLs de episodios
  url: string; // URL del personaje
  created: string; // Fecha de creación en la base de datos
}

export interface CharacterLocation {
  name: string;
  url: string; 
}
