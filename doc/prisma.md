# Setup con Prisma 7 + Neon (dentro il progetto Next):

```
npm install -D prisma@7 dotenv
npm install @prisma/client@7 @prisma/adapter-neon
npx prisma init --datasource-provider postgresql
```

prisma init crea la cartella prisma/ con schema.prisma e il file prisma.config.ts. Poi:

- Metti in .env la DATABASE_URL di Neon
- Scrivi il model Book in schema.prisma
- npx prisma migrate dev --name init
- npx prisma generate
- npx prisma studio

- npx prisma migrate reset (svuota le tabelle)

---

aggiornare package.json con questa stringa sotto "scripts"

- "postinstall": "prisma generate"

questo fa si che l'app prisma venga generata
