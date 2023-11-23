import { readdirSync } from "fs";

function libraryChecker(basePath: string){
	return readdirSync(basePath)
}

export {
	libraryChecker
}
