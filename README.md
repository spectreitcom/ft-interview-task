# FM Interview Task

Projekt techniczny zbudowany przy użyciu frameworka NestJS, wykorzystujący Prismę jako ORM, Redis (BullMQ) do przetwarzania zadań w tle oraz AWS S3 do przechowywania plików.

## Wymagania wstępne

- **Node.js**: zalecana wersja 24.x (zgodnie z `package.json`)
- **Docker** i **Docker Compose**: do uruchomienia bazy danych i Redisa
- **Konto AWS** (S3): do przechowywania przesłanych obrazów

## Instalacja

1. Sklonuj repozytorium:

   ```bash
   git clone https://github.com/spectreitcom/ft-interview-task
   cd ft-interview-task
   ```

2. Zainstaluj zależności:
   ```bash
   npm install
   ```

## Konfiguracja środowiska

1. Skopiuj plik przykładowy `.env-example` do `.env`:

   ```bash
   cp .env-example .env
   ```

2. Uzupełnij brakujące dane w pliku `.env`, w szczególności dane do AWS S3:
   - `AWS_REGION`
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_BUCKET`

   Domyślne wartości dla PostgreSQL i Redisa są ustawione pod konfigurację Docker Compose.

## Uruchomienie infrastruktury

Uruchom bazę danych (PostgreSQL) oraz Redis przy pomocy Docker Compose:

```bash
docker-compose up -d
```

## Baza danych (Prisma)

Przed uruchomieniem aplikacji należy wygenerować klienta Prismy i wykonać migracje:

1. Generowanie klienta Prisma:

   ```bash
   npm run prisma:generate
   ```

2. Wykonanie migracji bazy danych:
   ```bash
   npm run prisma:migrate
   ```

## Uruchomienie aplikacji

### Tryb deweloperski

```bash
npm run start:dev
```

### Tryb produkcyjny

```bash
npm run build
npm run start:prod
```

## Testy

Projekt zawiera testy jednostkowe oraz E2E:

- Testy jednostkowe: `npm run test`
- Pokrycie testami: `npm run test:cov`
