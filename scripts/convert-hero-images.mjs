import { resolve } from 'node:path'
import sharp from 'sharp'

const assetDir = resolve(process.cwd(), 'src/assets')

const monthFiles = [
  'hero-january',
  'hero-february',
  'hero-march',
  'hero-april',
  'hero-may',
  'hero-june',
  'hero-july',
  'hero-august',
  'hero-september',
  'hero-october',
  'hero-november',
  'hero-december',
]

async function run() {
  await Promise.all(
    monthFiles.map(async (fileBase) => {
      const inputPath = resolve(assetDir, `${fileBase}.jpg`)
      const outputPath = resolve(assetDir, `${fileBase}.webp`)

      await sharp(inputPath)
        .webp({ quality: 78, effort: 6 })
        .toFile(outputPath)

      console.log(`Converted ${fileBase}.jpg -> ${fileBase}.webp`)
    }),
  )
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
