# Projektrapport – RecipeAPI
**Kurs:** Backend-utveckling med .NET och React  
**Skola:** NBI Handelsakademin, Göteborg  
**Student:** Mirjana Ristic  
**Datum:** 2026
## 1. Vad jag byggde och varför
Jag valde att bygga en **Recepthanterare** (RecipeApp) – en fullstack-webbapplikation där användare kan bläddra, skapa och dela recept. Temat valdes för att det är praktiskt, tydligt avgränsat och passar bra för att visa upp alla tekniska krav i uppgiften.

Applikationen har två användarroller:
- **User** – kan bläddra recept, skapa egna, redigera sina och spara favoriter
- **Admin** – kan hantera allt innehåll, inklusive andra användares recept
## 2. Arkitektur – hur API:et och frontend hänger ihop

Applikationen är uppdelad i två delar som kommunicerar via HTTP:
**Backend – ASP.NET Core Web API**
- Körs på `https://localhost:7288`
- Hanterar all affärslogik, databas och autentisering
- Exponerar RESTful endpoints för recept, kategorier och favoriter
**Frontend – React (Vite)**
- Körs på `http://localhost:5173`
- Hämtar data från API:et med `fetch()`
- Skickar JWT-token i Authorization-headern för skyddade anrop
- React (port 5173)
↕ HTTP + JWT
ASP.NET Core API (port 7288)
↕ EF Core
SQL Server Express (RecipeDB)
**Datamodeller (5 st):**
- `User` – användare med roll
- `Recipe` – recept kopplat till kategori och användare
- `Category` – receptkategori
- `Ingredient` – ingrediens kopplad till recept
- `FavoriteRecipe` – koppling mellan användare och favoritrecept

## 3. Vad som gick bra

- **JWT-autentisering** fungerade bra med rollbaserad åtkomst
- **Entity Framework Core** med Code-First migrationer var smidigt att arbeta med
- **React-routing** med skyddade sidor fungerade som förväntat
- **CORS-konfigurationen** löstes enkelt i Program.cs
- **Clean code** – controllers är tunna, logik ligger i services, DTOs skyddar modellerna

## 4. Vad som var klurigt

- **Cascade delete-problemet** med FavoriteRecipe-tabellen krävde att man satte `OnDelete(DeleteBehavior.NoAction)` för att undvika cirkulära beroenden
- **BCrypt i seed data** genererade olika hash varje gång vilket EF Core inte gillade – löstes med `ConfigureWarnings`
- **Att köra backend och frontend samtidigt** kräver två separata processer vilket kan vara förvirrande i början

## 5. Vad jag hade förbättrat med mer tid

- Lägga till paginering och sökning på API-nivå
- Möjlighet att ladda upp bilder till recept
- Automatiserade tester för API-endpoints
- Deployment till Azure 
- Möjlighet för admin att skapa och ta bort kategorier via UI

## 6. Individuell reflektion

Det här projektet gav mig en helhetsbild av hur en fullstack-applikation fungerar i praktiken. 
Att koppla ihop en .NET-backend med en React-frontend och få JWT-autentiseringen att fungera korrekt var den mest lärorika delen.
Jag förstår nu hur request/response-cykeln fungerar, hur tokens flödar mellan klient och server, och hur man strukturerar ett projekt med separation of concerns. 
Jag är stolt över att ha byggt hela applikationen på egen hand.

























