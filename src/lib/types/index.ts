export interface Player {
  id: string;
  name: string;
  position: string;
  team: string;
  imageUrl: string;
  type: 'conference';
}

export interface Criminal {
  id: string;
  name: string;
  crime: string;
  imageUrl: string;
  type: 'interpol';
}

export type Person = Player | Criminal;
