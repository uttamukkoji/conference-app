# Contentstack React Starter App

A modern React starter application powered by [Contentstack](https://www.contentstack.com/) headless CMS, featuring a fully-functional conference website with dynamic content management.

## Features

- **Contentstack Integration** - Seamless content delivery via Contentstack SDK
- **Live Preview** - Real-time content preview support
- **Conference Pages** - Complete conference website with:
  - Landing page with hero, speakers, sponsors, and CTA sections
  - Program schedule with day-wise session listings
  - Speakers directory with individual speaker profiles
  - Session detail pages with speaker info and related sessions
- **Reusable Components** - Modular component architecture
- **TypeScript Support** - Full type safety throughout the application
- **Responsive Design** - Mobile-first responsive layouts

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Contentstack account with configured stack

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd contentstack-react-starter-app-master
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```env
   REACT_APP_CONTENTSTACK_API_KEY=your_api_key
   REACT_APP_CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token
   REACT_APP_CONTENTSTACK_ENVIRONMENT=your_environment
   REACT_APP_CONTENTSTACK_REGION=your_region
   ```

4. **Start the development server**

   ```bash
   npm start
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ConferenceHeader.tsx
│   ├── ConferenceFooter.tsx
│   ├── CTASection.tsx
│   ├── PageHero.tsx
│   ├── SpeakerCard.tsx
│   ├── SessionCard.tsx
│   └── ...
├── pages/                # Page components
│   ├── conference.tsx    # Main conference landing page
│   ├── program.tsx       # Program schedule page
│   ├── speakers.tsx      # Speakers listing page
│   ├── speaker-detail.tsx# Individual speaker page
│   ├── session-detail.tsx# Individual session page
│   └── ...
├── helper/               # Helper functions and SDK utilities
├── sdk/                  # Contentstack SDK configuration
├── styles/               # CSS stylesheets
├── typescript/           # TypeScript type definitions
│   ├── conference-types.ts
│   └── ...
└── context/              # React context providers
```

## Available Scripts

| Command         | Description                                      |
| --------------- | ------------------------------------------------ |
| `npm start`     | Runs the app in development mode                 |
| `npm run build` | Builds the app for production                    |
| `npm test`      | Launches the test runner                         |
| `npm run eject` | Ejects from Create React App (one-way operation) |

## Content Types

The application uses the following Contentstack content types:

### 1. Speaker (`speaker`)

| Field Name    | Field UID       | Data Type   | Required | Description                  |
| ------------- | --------------- | ----------- | -------- | ---------------------------- |
| Title         | `title`         | Single Line | Yes      | Display name                 |
| URL           | `url`           | Single Line | Yes      | URL slug (e.g., `/john-doe`) |
| Full Name     | `full_name`     | Single Line | Yes      | Speaker's full name          |
| Tags          | `tags`          | Single Line | No       | Comma-separated tags         |
| Is Featured   | `is_featured`   | Boolean     | No       | Featured speaker flag        |
| Profile Image | `profile_image` | File        | No       | Speaker photo                |
| Bio           | `bio`           | Multi Line  | No       | Speaker biography            |

### 2. Section (`section`)

| Field Name   | Field UID      | Data Type   | Required | Description                          |
| ------------ | -------------- | ----------- | -------- | ------------------------------------ |
| Title        | `title`        | Single Line | Yes      | Day identifier (e.g., "Day 1")       |
| Name         | `name`         | Single Line | Yes      | Display name (e.g., "Tuesday")       |
| URL          | `url`          | Single Line | Yes      | URL slug (e.g., `day-1`)             |
| Section Time | `section_time` | Group       | Yes      | Contains `start_time` and `end_time` |

### 3. Session (`session`)

| Field Name   | Field UID      | Data Type   | Required | Description                          |
| ------------ | -------------- | ----------- | -------- | ------------------------------------ |
| Title        | `title`        | Single Line | Yes      | Session title                        |
| Session ID   | `session_id`   | Number      | Yes      | Unique numeric identifier            |
| Description  | `description`  | Rich Text   | No       | Session description (HTML)           |
| Type         | `type`         | Single Line | Yes      | Type (e.g., "Talk", "Workshop")      |
| Is Popular   | `is_popular`   | Boolean     | No       | Popular/featured session flag        |
| Session Time | `session_time` | Group       | Yes      | Contains `start_time` and `end_time` |
| Speakers     | `speakers`     | Reference   | No       | Reference to `speaker` content type  |
| Room         | `room`         | Reference   | No       | Reference to `room` content type     |

### 4. Room (`room`) - Optional

| Field Name | Field UID | Data Type   | Required | Description     |
| ---------- | --------- | ----------- | -------- | --------------- |
| Title      | `title`   | Single Line | Yes      | Room name       |
| URL        | `url`     | Single Line | No       | Room identifier |

### 5. Conference (`conference`)

Main conference information for the landing page.

| Field Name        | Field UID           | Data Type   | Required | Description                               |
| ----------------- | ------------------- | ----------- | -------- | ----------------------------------------- |
| Title             | `title`             | Single Line | Yes      | Conference name (e.g., "Conference 2026") |
| Timezone          | `timezone`          | Single Line | No       | Timezone (e.g., "US")                     |
| Description       | `description`       | Rich Text   | No       | Conference description (HTML)             |
| Conference Images | `conferecne_images` | File        | No       | Multiple images for hero section          |
| Conference Links  | `conference_links`  | Group       | No       | Array of links (href, title)              |
| Conference Event  | `conference_event`  | Group       | Yes      | Contains `start_time` and `end_time`      |

### 6. Sponsor (`sponsor`)

Sponsor/partner information.

| Field Name    | Field UID       | Data Type   | Required | Description                      |
| ------------- | --------------- | ----------- | -------- | -------------------------------- |
| Title         | `title`         | Single Line | Yes      | Sponsor name                     |
| Area Focus    | `area_focus`    | Single Line | No       | Category (e.g., "CMS", "Jobs")   |
| Bio           | `bio`           | Multi Line  | No       | Sponsor description              |
| Booth Number  | `booth_number`  | Number      | No       | Booth number at venue            |
| Display Image | `display_image` | File        | No       | Sponsor banner image             |
| Logo          | `logo`          | File        | No       | Sponsor logo                     |
| Link          | `link`          | Group       | No       | Website link (href, title)       |
| Participation | `participation` | Single Line | No       | Level (e.g., "Gold", "Platinum") |
| Sort Order    | `sort_order`    | Number      | No       | Display order                    |

### 7. Feature (`feature`)

Conference highlights/features.

| Field Name  | Field UID     | Data Type   | Required | Description                |
| ----------- | ------------- | ----------- | -------- | -------------------------- |
| Title       | `title`       | Single Line | Yes      | Feature title              |
| Icon        | `icon`        | Single Line | No       | Emoji or icon (e.g., "⚔️") |
| Description | `description` | Multi Line  | No       | Feature description        |

---

## Importing Content Using CLI

You can import content types, assets, and entries using the [Contentstack CLI](https://www.contentstack.com/docs/developers/cli/import-content-using-the-cli).

### Prerequisites

1. Install Contentstack CLI globally:

```bash
npm install -g @contentstack/cli
```

2. Authenticate the CLI:

```bash
csdx auth:login
```

3. Create a management token in your stack (Settings → Tokens → Management Tokens)

### Import All Content

To import all modules (content types, assets, entries, etc.) from an exported folder:

```bash
csdx cm:stacks:import -k <stack_api_key> -d <path_to_exported_content>
```

**Example:**

```bash
csdx cm:stacks:import -k bltxxxxxxxxxxxxxx -d "./contentstack-export"
```

### Import Specific Modules

Use the `--module` flag to import specific modules:

```bash
# Import only content types
csdx cm:stacks:import -k <stack_api_key> -d <path> --module content-types

# Import only assets
csdx cm:stacks:import -k <stack_api_key> -d <path> --module assets

# Import only entries
csdx cm:stacks:import -k <stack_api_key> -d <path> --module entries --backup-dir <backup_dir>
```

**Available modules:** `assets`, `content-types`, `entries`, `environments`, `extensions`, `global-fields`, `labels`, `locales`, `webhooks`, `workflows`, `custom-roles`, `taxonomies`

### Using Management Token

```bash
# Using alias
csdx cm:stacks:import -a <management_token_alias> -d <path_to_content>

# With configuration file
csdx cm:stacks:import -a <alias> -c "./config.json"
```

> **Note:** When importing entries multiple times, use `--backup-dir` flag to avoid import errors due to module inter-dependencies.

For more details, see the [official CLI import documentation](https://www.contentstack.com/docs/developers/cli/import-content-using-the-cli).

---

## Creating Assets and Entries

After importing content types, you need to create assets and entries in Contentstack.

### Creating Assets

1. Navigate to your stack in Contentstack
2. Go to **Assets** in the left sidebar
3. Click **+ New Asset** or drag and drop files
4. Upload speaker profile images and other media
5. Organize assets into folders (e.g., `speakers/`, `sessions/`)

**Recommended Assets:**

- Speaker profile photos (recommended size: 400x400px)
- Session thumbnails
- Sponsor logos

### Creating Entries

Create entries in the following order (to satisfy references):

#### Step 1: Create Speakers

1. Go to **Content Models** → **Speaker**
2. Click **+ New Entry**
3. Fill in the fields:
   - **Title**: "John Doe"
   - **URL**: "/john-doe"
   - **Full Name**: "John Doe"
   - **Tags**: "React, TypeScript"
   - **Is Featured**: Yes/No
   - **Profile Image**: Select uploaded asset
   - **Bio**: Speaker biography text
4. Click **Save** and **Publish**

#### Step 2: Create Sections (Program Days)

1. Go to **Content Models** → **Section**
2. Click **+ New Entry**
3. Fill in the fields:
   - **Title**: "Day 1"
   - **Name**: "Tuesday"
   - **URL**: "day-1"
   - **Section Time**:
     - Start Time: `2026-08-26T09:00:00`
     - End Time: `2026-08-26T18:00:00`
4. Click **Save** and **Publish**
5. Repeat for Day 2, Day 3, etc.

#### Step 3: Create Sessions

1. Go to **Content Models** → **Session**
2. Click **+ New Entry**
3. Fill in the fields:
   - **Title**: "Building Modern React Apps"
   - **Session ID**: 101
   - **Description**: Session details (Rich Text)
   - **Type**: "Talk" or "Workshop"
   - **Is Popular**: Yes/No
   - **Session Time**:
     - Start Time: `2026-08-26T10:00:00`
     - End Time: `2026-08-26T11:00:00`
   - **Speakers**: Reference to speaker entries
   - **Room**: Reference to room entry (optional)
4. Click **Save** and **Publish**

### Publishing Entries

After creating entries, publish them to make them available via the Delivery API:

1. Select entries to publish
2. Click **Publish**
3. Select the environment (e.g., `development`, `production`)
4. Confirm publish

> **Tip:** Use bulk publish to publish multiple entries at once via **Content** → Select entries → **Publish**

## Routes

| Route                 | Description               |
| --------------------- | ------------------------- |
| `/`                   | Conference landing page   |
| `/program`            | Program schedule          |
| `/speakers`           | All speakers listing      |
| `/speakers/:url`      | Individual speaker detail |
| `/session/:sessionId` | Individual session detail |

## Technologies

- [React 18](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [React Router DOM](https://reactrouter.com/) - Client-side routing
- [Contentstack SDK](https://www.contentstack.com/docs/developers/sdks) - Content delivery
- [Contentstack Live Preview](https://www.contentstack.com/docs/developers/set-up-live-preview) - Real-time preview

## License

MIT License - see [LICENSE](LICENSE) for details.
