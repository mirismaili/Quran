#! /usr/bin/env -S node --experimental-json-modules

import {readFile, writeFile} from 'node:fs/promises'
import revelationOrderedSuwarInfo from '../suwar-info-(revelation-order).json'
import {range} from './util.js'

/**
 * Created on 1400/10/18 (2022/1/8).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */

const suwar = await Promise.all(
  range({start: 1, size: 114}).map(index => readFile(`text/surah-${index}.txt`, 'utf-8')),
)

const quranText = suwar.join('\n\n')
writeFile('Quran.txt', quranText).then()

writeFile('Quran-(without-special-symbols).txt', omitSpecialSymbols(quranText)).then()

const revelationOrderedSuwar = await Promise.all(
  revelationOrderedSuwarInfo.map(({index}) => readFile(`text/surah-${index}.txt`, 'utf-8')),
)

const revelationOrderedQuranText = revelationOrderedSuwar.join('\n\n')
writeFile('Quran-(revelation-order).txt', revelationOrderedQuranText).then()
writeFile('Quran-(revelation-order)-(without-special-symbols).txt', omitSpecialSymbols(revelationOrderedQuranText))
  .then()

function omitSpecialSymbols(quranText) {
  return quranText.replace(/[ۖۗ۩ۜۘۙۚۛـ]/g, '').replaceAll('  ', ' ')
}
