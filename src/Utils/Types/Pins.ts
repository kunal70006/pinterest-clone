export interface pinsState {
  title: string;
  imageUrl: string;
  createdBy: string;
  id: string;
  comments?: [];
  category?: string;
}

export type pinsArr = pinsState[];
