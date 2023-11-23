export type StateFunctionProp <T> = ((arg: T) => void);
export type HandlerHowl <T> = ((howl: Howl, state : StateFunctionProp<T>) => void) | null;
export type UpdateCurrentMusic = { 
  currentMusicId ?: number, 
  updateQueueMusics ?: string[] 
};