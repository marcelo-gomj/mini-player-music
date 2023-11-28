import Store from "electron-store";

type StoreType = {
  "volume" : number,
  "is_suffle" : boolean,
  "repeat_mode" : string
}

const store = new Store<StoreType>({
  schema: {
    "volume" : {
      type: "number",
      maximum: 1,
      minimum: 0,
      default: 1
    },
    "is_suffle" : {
      type: "boolean",
      default: false
    },
    "repeat_mode" : {
      type: "string",
      enum: ["one_turn", "repeat", "repeat_one"],
      default: "one_turn"
    }
  }
})

function config<K extends keyof StoreType>(
  key: K, 
  value ?: StoreType[K]
){
  
  if(value){
    store.set(key, value);
  }

  return store.get(key) ;
}

export default config