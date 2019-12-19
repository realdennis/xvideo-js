import * as fs from "fs";

const filename = "fav";

const backupData = async () => {
  await fs.promises.copyFile(
    `./${filename}.json`,
    `./${filename}-backup-${Date.now()}.json`
  );
};
const writeData = async data => {
  await backupData();
  await fs.promises.writeFile(`./${filename}.json`, JSON.stringify(data));
};
const readData = async () => {
  const fav = await fs.promises.readFile(`./${filename}.json`, "utf8");
  return JSON.parse(fav);
};
const resetStorage = async () => {
  await writeData([]);
};
export { resetStorage, backupData, readData, writeData };
