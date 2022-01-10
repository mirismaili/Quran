#! /usr/bin/env -S node --experimental-json-modules

import {writeFile} from 'node:fs/promises'
/**
 * ref: {@link https://ar.wikipedia.org/wiki/قائمة_سور_القرآن_الكريم} {@link https://wiki.ahlolbait.com/فهرست_قرآن}
 *   {@link https://wiki.ahlolbait.com/ترتیب_نزول_سوره_ها} {@link http://al-quran.info/}
 */
import suwarInfo from '../suwar-info.json' // All other version of `suwar-info` (csv, tsv, revelation-order, ...) will
// be generated based on this file

/**
 * Created on 1400/10/17 (2022/1/7).
 *
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */

const tsv = generateTsv(suwarInfo)

writeFile('suwar-info.tsv', tsv).then()
writeFile('suwar-info.csv', tsv.replaceAll('\t', ',')).then()

const revelationOrderedSuwarInfo = suwarInfo
  .map((surah, i) => ({...surah, index: i + 1}))
  .sort((surah1, surah2) => surah1.revelationOrder - surah2.revelationOrder)
  .map(surah => {
    const {revelationOrder, revelationOrder2, ...rest} = surah
    return {...rest}
  })

writeFile('suwar-info-(revelation-order).json', JSON.stringify(revelationOrderedSuwarInfo, null, '\t')).then()

const revelationOrderedTsv = generateTsv(revelationOrderedSuwarInfo)

writeFile('suwar-info-(revelation-order).tsv', revelationOrderedTsv).then()
writeFile('suwar-info-(revelation-order).csv', revelationOrderedTsv.replaceAll('\t', ',')).then()

function generateTsv(data) {
  return Object.keys(data[0]).join('\t') + '\n' +
    data.map(surahInfo =>
      Object.values(surahInfo).join('\t').replaceAll(',', '|'),
    ).join('\n')
}

