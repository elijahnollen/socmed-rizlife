# José Rizal Social Profiles

An interactive, fact-checked educational reconstruction of José Rizal's:

- Facebook-style personal profile
- LinkedIn-style professional profile

The project imagines that these social platforms existed during Rizal's lifetime. It uses familiar profile interfaces while keeping the people, dates, places, publications, education, and professional work grounded in historical sources.

## Included

- Separate personal and professional profile photos, with an explanation for each choice
- Five personal posts based on documented moments in Rizal's life
- Three period-appropriate comments on every Facebook-style post
- Expandable historical basis and source link for every post
- Working Posts, About, Friends, and Photos profile tabs
- LinkedIn-style About, Activity, Experience, Education, Publications, and Skills sections
- Public-domain and Creative Commons historical images
- Built-in historical-source and image-credit panel
- Responsive desktop, tablet, and mobile layouts
- No login form, password collection, database, or personal-data collection

## Factual and creative content

Historical facts include Rizal's dates, schools, travel and research locations, medical work, publications, La Liga Filipina, and activities in Dapitan.

The first-person captions, comments, reaction totals, follower/connection counts, and interface actions are creative reconstructions. They are labeled in the site and are not presented as authentic quotations.

## Run locally

Requirements:

- Node.js 22.13 or newer
- npm

```bash
npm install
npm run dev
```

Then open the local address shown in the terminal.

Production check:

```bash
npm run build
```

## Main files

- `app/page.tsx` — profile content, interactions, historical notes, and sources
- `app/globals.css` — Facebook-style and LinkedIn-style responsive interfaces
- `public/images/` — historical image assets used by the profiles

## Core historical references

- [NHCP: José Rizal biographical marker](https://philhistoricsites.nhcp.gov.ph/registry_database/jose-protacio-rizal-1861-1896/)
- [NHCP: La Liga Filipina historical marker](https://philhistoricsites.nhcp.gov.ph/registry_database/la-liga-filipina/)
- [National Library of the Philippines: The Making of Noli Me Tangere](https://web.nlp.gov.ph/noli-berlin-ed/)
- [Library of Congress: Philippines — A Country Study](https://tile.loc.gov/storage-services/master/frd/frdcstdy/ph/philippinescount00dola_0/philippinescount00dola_0.pdf)
- [Philippine Embassy in Berlin: Retracing Rizal's Journey Through Germany](https://philippine-embassy.de/2017/07/06/retracing-rizals-journey-through-germany/)
- [American Academy of Ophthalmology: José Rizal, MD](https://www.aao.org/biographies-detail/jose-rizal-md)
- [Ateneo archival study: Rizal's Record at the Ateneo](https://archium.ateneo.edu/cgi/viewcontent.cgi?article=3965&context=phstudies)
- [University of Santo Tomas: University History](https://www.ust.edu.ph/university-history/)

Full image credits and links are available inside the site's **Facts & image credits** panel.

## Educational-use notice

Facebook and LinkedIn names and interface cues are used only for a noncommercial class activity. This project is not affiliated with or endorsed by Meta or LinkedIn.
