# Moderation

---

## 🛡️ Usage

Basic moderation commands:

- `/ban {user} {reason}` — Bans a user from the server
- `/kick {user} {reason}` — Kicks a user from the server

---

## ⚙️ Automod

Use `/automod {option}` to configure automatic moderation settings.  
Available `{option}` values:

- `spam_threshold` — Number of messages before spam is detected
- `mention_limit` — Max allowed mentions per message
- `warn_threshold` — Number of warnings before action is taken
- `mute_duration` — Time (in minutes) to mute a user after threshold is reached

---

## 🔗 Link Filtering

Block or allow specific links on your server:

- `/blacklist-link {link}` — Blocks a link  
  _Example: `/blacklist-link https://discord.gg`_
- `/whitelist-link {link}` — Allows a specific link  
  _Example: `/whitelist-link https://grueneeule.de`_

---

## 🚫 Word Filtering

Prevent unwanted words from being used:

- `/blacklist-word {word}` — Blocks a specific word from being used

---

## 📜 Tip

You can combine link and word filters with automod thresholds to automatically warn or mute users when they break rules!

---

## 📜 Info

This is currently in beta!