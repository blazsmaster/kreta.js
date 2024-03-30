import raw from '../assets/DirtyWords.json';

interface Item {
	type: number;
	text: string;
}

/**
 * @description Készít egy véletlenszerű sértést a híres Kréta DirtyWords.xml fájl alapján
 * @param prefix - A sértés elé illesztendő szöveg (alap: "Te")
 */
export const createKretaInsult = (prefix?: string) => {
	const p = prefix || 'Te';
	const txts = raw as Array<Item>;
	const a = txts.filter((txt: Item) => txt.type === 1);
	const n = txts.filter((txt: Item) => txt.type === 2);

	const random = (arr: Array<Item>) => arr[Math.floor(Math.random() * arr.length)];
	return `${p} ${random(a).text.toLowerCase()} ${random(n).text.toLowerCase()}!`.trim();
};
