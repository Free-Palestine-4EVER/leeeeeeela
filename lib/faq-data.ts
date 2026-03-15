export interface FAQ {
  q: string;
  a: string;
  keywords: string[];
  category: string;
}

export const faqData: FAQ[] = [
  // === DOSTAVA / DELIVERY (1-15) ===
  { q: "Koliko traje dostava?", a: "Dostava unutar BiH traje 1-3 radna dana. Za inostranstvo 5-10 radnih dana.", keywords: ["dostava", "traje", "koliko", "delivery", "shipping"], category: "dostava" },
  { q: "Gdje vršite dostavu?", a: "Dostavljamo u cijelu BiH, Hrvatsku, Srbiju, Crnu Goru i cijelu Europu. Za ostale zemlje kontaktirajte nas.", keywords: ["gdje", "dostava", "dostavljate", "deliver", "where"], category: "dostava" },
  { q: "Koliko košta dostava?", a: "Dostava unutar BiH je 7 KM. Za Europu cijena zavisi od zemlje – kontaktirajte nas za tačnu cijenu.", keywords: ["cijena", "košta", "dostava", "cost", "shipping cost"], category: "dostava" },
  { q: "Da li je dostava besplatna?", a: "Besplatna dostava za narudžbe preko 200 KM unutar BiH! Za inostranstvo kontaktirajte nas.", keywords: ["besplatna", "free", "dostava", "gratis"], category: "dostava" },
  { q: "Koja kurirska služba dostavlja?", a: "Koristimo BH Post i ekspresne kurirske službe. Za EU koristimo DHL i GLS.", keywords: ["kurir", "pošta", "kurirska", "courier", "dhl"], category: "dostava" },
  { q: "Mogu li pratiti pošiljku?", a: "Da! Nakon slanja dobijate tracking broj putem SMS-a ili WhatsApp-a.", keywords: ["pratiti", "tracking", "pošiljka", "track", "praćenje"], category: "dostava" },
  { q: "Da li dostavljate u Hrvatsku?", a: "Da, dostavljamo u Hrvatsku! Dostava obično traje 3-5 radnih dana.", keywords: ["hrvatska", "croatia", "zagreb"], category: "dostava" },
  { q: "Da li dostavljate u Srbiju?", a: "Da, dostavljamo u Srbiju. Rok isporuke je 3-5 radnih dana.", keywords: ["srbija", "serbia", "beograd"], category: "dostava" },
  { q: "Da li dostavljate u Njemačku?", a: "Da! Dostava u Njemačku traje 5-7 radnih dana putem DHL-a.", keywords: ["njemačka", "germany", "deutschland"], category: "dostava" },
  { q: "Mogu li preuzeti narudžbu lično?", a: "Da, lično preuzimanje je moguće u našem showroomu u Sarajevu uz prethodni dogovor.", keywords: ["lično", "preuzimanje", "pickup", "osobno", "showroom"], category: "dostava" },
  { q: "Da li šaljete i van Europe?", a: "Da, šaljemo u USA, Kanadu, Australiju i UAE. Kontaktirajte nas za cijenu i rokove.", keywords: ["van", "europe", "usa", "amerika", "australija", "kanada"], category: "dostava" },
  { q: "Koliko traje dostava u Sarajevu?", a: "Za Sarajevo obično isporučujemo isti ili naredni radni dan!", keywords: ["sarajevo", "brza", "isti dan"], category: "dostava" },
  { q: "Da li mogu dobiti dostavu na adresu posla?", a: "Naravno! Navedite adresu ureda pri narudžbi i dostavit ćemo tamo.", keywords: ["posao", "ured", "firma", "office"], category: "dostava" },
  { q: "Šta ako nisam kod kuće kad stigne paket?", a: "Kurir će vas kontaktirati telefonom. Ako niste dostupni, pokušat će ponovo naredni dan.", keywords: ["kuće", "paket", "nisu", "nema", "missed"], category: "dostava" },
  { q: "Da li mogu naručiti za nekoga drugog kao poklon?", a: "Da! Možemo zapakovati narudžbu kao poklon i dostaviti na drugu adresu.", keywords: ["poklon", "gift", "neko drugi", "wrap"], category: "dostava" },

  // === PERIKE / WIGS (16-35) ===
  { q: "Koje perike imate?", a: "Imamo perike od prirodne ljudske kose (premium) i perike od proteinskog vlakna. Preko 15 modela u ponudi!", keywords: ["perike", "koje", "wigs", "ponuda", "asortiman"], category: "perike" },
  { q: "Koliko koštaju perike od prirodne kose?", a: "Perike od prirodne ljudske kose kreću se od 800 KM do 1.700 KM, ovisno o dužini i stilu.", keywords: ["cijena", "perika", "prirodna", "košta", "price"], category: "perike" },
  { q: "Koliko koštaju perike od proteinskog vlakna?", a: "Perike od proteinskog vlakna su pristupačnije – od 160 KM do 180 KM.", keywords: ["proteinsko", "vlakno", "cijena", "protein", "synthetic"], category: "perike" },
  { q: "Koja je razlika između prirodne i proteinske perike?", a: "Prirodna kosa se može farbati, peglati i uvijati kao vlastita kosa. Proteinska perika je pristupačnija, lagana i zadržava oblik, ali ne podnosi visoke temperature.", keywords: ["razlika", "prirodna", "proteinska", "difference"], category: "perike" },
  { q: "Mogu li farbati periku od prirodne kose?", a: "Da! Perike od prirodne ljudske kose možete farbati, fenirati, peglati i uvijati.", keywords: ["farbati", "dye", "boja", "color", "perika"], category: "perike" },
  { q: "Koliko dugo traje perika od prirodne kose?", a: "Uz pravilnu njegu, perika od prirodne kose može trajati 1-3 godine.", keywords: ["traje", "trajanje", "koliko", "lifetime", "vijek"], category: "perike" },
  { q: "Da li izrađujete perike po želji?", a: "Da! Naša najpopularnija usluga – pošaljite sliku željenog stila i izradićemo periku po mjeri.", keywords: ["po želji", "custom", "mjera", "izrada", "narudžba"], category: "perike" },
  { q: "Koliko traje izrada perike po želji?", a: "Izrada perike po želji traje 2-4 sedmice, ovisno o kompleksnosti.", keywords: ["izrada", "koliko", "traje", "custom", "vrijeme"], category: "perike" },
  { q: "Da li perike izgledaju prirodno?", a: "Apsolutno! Naše perike od prirodne kose imaju mono bazu za realističan razdjeljak i prirodno stapanje.", keywords: ["prirodno", "izgleda", "realističan", "natural", "look"], category: "perike" },
  { q: "Kako odabrati pravu nijansu?", a: "Pošaljite nam sliku vaše kose na WhatsApp i pomoći ćemo vam odabrati idealnu nijansu.", keywords: ["nijansa", "boja", "shade", "color", "odabir"], category: "perike" },
  { q: "Da li imate bob perike?", a: "Da! Imamo bob perike od prirodne kose u raznim nijansama – piano, balayage i jednobojne.", keywords: ["bob", "kratka", "short"], category: "perike" },
  { q: "Imate li perike za medicinsku upotrebu?", a: "Da, naše perike su pogodne i za medicinsku upotrebu. Lagane su, udobne i izgledaju potpuno prirodno.", keywords: ["medicinska", "medical", "hemoterapija", "alopecija", "gubitak kose"], category: "perike" },
  { q: "Da li perike imaju kapu za podešavanje veličine?", a: "Da, sve naše perike imaju podesive trake i klipse za sigurno i udobno nošenje.", keywords: ["kapa", "veličina", "podešavanje", "cap", "adjustable", "size"], category: "perike" },
  { q: "Da li mogu nositi periku svaki dan?", a: "Naravno! Naše perike su dizajnirane za svakodnevno nošenje – lagane su i prozračne.", keywords: ["svaki dan", "daily", "svakodnevno", "nositi"], category: "perike" },
  { q: "Koje boje perika imate?", a: "Imamo: crnu, smeđu, ash blonde, platinum, ombre, balayage, piano pramenove i mnoge druge!", keywords: ["boje", "colors", "nijanse", "paleta"], category: "perike" },

  // === REPOVI / PONYTAILS (36-45) ===
  { q: "Koliko koštaju repovi za kosu?", a: "Repovi za kosu koštaju 65-70 KM. Trenutno su na akciji po 65 KM!", keywords: ["rep", "repovi", "cijena", "ponytail", "košta"], category: "repovi" },
  { q: "Koje dužine repova imate?", a: "Imamo repove u dužinama 75cm, 80cm i 85-90cm (premium).", keywords: ["dužina", "repovi", "length", "cm"], category: "repovi" },
  { q: "Da li su repovi od prirodne kose?", a: "Naši repovi su od visokokvalitetnog umjetnog vlakna koje izgleda kao prirodna kosa. Imamo i opcije od prirodne kose.", keywords: ["rep", "prirodna", "umjetno", "vlakno", "natural"], category: "repovi" },
  { q: "Kako se pričvršćuje rep?", a: "Rep se pričvršćuje pomoću gumice i češljića – postavljanje traje samo 30 sekundi!", keywords: ["pričvrstiti", "postaviti", "attach", "how", "gumica", "češljić"], category: "repovi" },
  { q: "Da li repove mogu koristiti za vjenčanje?", a: "Apsolutno! Naši repovi su savršeni za svadbe, mature i posebne prilike.", keywords: ["vjenčanje", "svadba", "wedding", "matura", "posebna prilika"], category: "repovi" },
  { q: "Imate li ravne repove?", a: "Da! Imamo ravne repove u svim bojama – 75cm dužine, po akcijskoj cijeni 65 KM.", keywords: ["ravni", "straight", "rep"], category: "repovi" },
  { q: "Imate li kovrčave repove?", a: "Da! Kovrčavi repovi 75cm dostupni su u crnoj, smeđoj, plavoj, ombre i piano varijanti.", keywords: ["kovrčavi", "curly", "rep", "lokne"], category: "repovi" },
  { q: "Imate li uvijene repove?", a: "Da! Uvijeni repovi od 80cm dostupni su u raznim nijansama. Daju elegantan, voluminozan izgled.", keywords: ["uvijeni", "wavy", "rep", "valovi"], category: "repovi" },
  { q: "Da li rep oštećuje kosu?", a: "Ne! Naši repovi se pričvršćuju gumicom i češljićem – nema ljepila, nema oštećenja.", keywords: ["oštećuje", "damage", "hair damage", "kosa"], category: "repovi" },
  { q: "Mogu li prati rep za kosu?", a: "Da, blago operite u hladnoj vodi sa šamponom. Pustite da se prirodno osuši.", keywords: ["prati", "wash", "održavanje", "čišćenje"], category: "repovi" },

  // === EKSTENZIJE / EXTENSIONS (46-55) ===
  { q: "Koje vrste ekstenzija imate?", a: "Imamo tape-in, keratin i klipse ekstenzije – od prirodne ljudske kose i umjetnog vlakna.", keywords: ["ekstenzije", "vrste", "extensions", "types"], category: "ekstenzije" },
  { q: "Koliko koštaju ekstenzije od prirodne kose?", a: "Ekstenzije od prirodne ljudske kose (65cm, 1kg) koštaju oko 1.200 KM.", keywords: ["ekstenzije", "cijena", "prirodna", "cost", "price"], category: "ekstenzije" },
  { q: "Koliko koštaju klipse ekstenzije?", a: "Klipse ekstenzije od umjetnog vlakna su 60-70 KM. Trenutno na akciji po 60 KM!", keywords: ["klipse", "clip-in", "cijena", "umjetno"], category: "ekstenzije" },
  { q: "Kako se postavljaju tape-in ekstenzije?", a: "Tape-in ekstenzije se postavljaju lijepljenjem na prirodnu kosu. Preporučujemo profesionalno postavljanje u salonu.", keywords: ["tape-in", "postavljanje", "kako", "apply"], category: "ekstenzije" },
  { q: "Kako se postavljaju keratin ekstenzije?", a: "Keratin ekstenzije se postavljaju toplinom u salonu. Traju 3-6 mjeseci uz pravilnu njegu.", keywords: ["keratin", "postavljanje", "toplina", "salon"], category: "ekstenzije" },
  { q: "Da li ekstenzije oštećuju kosu?", a: "Ne, ako se pravilno postave i skidaju. Preporučujemo profesionalnu ugradnju.", keywords: ["oštećuju", "damage", "kosa", "ekstenzije"], category: "ekstenzije" },
  { q: "Koliko dugo traju ekstenzije?", a: "Keratin: 3-6 mjeseci. Tape-in: 6-8 sedmica (pa se prebacuju). Klipse: neograničeno uz njegu.", keywords: ["traju", "koliko", "lifetime", "trajanje", "ekstenzije"], category: "ekstenzije" },
  { q: "Mogu li farbati ekstenzije?", a: "Ekstenzije od prirodne kose – da! Umjetne – ne preporučujemo.", keywords: ["farbati", "dye", "bojiti", "ekstenzije"], category: "ekstenzije" },
  { q: "Kolika je dužina vaših ekstenzija?", a: "Naše ekstenzije od prirodne kose dolaze u dužini od 65cm.", keywords: ["dužina", "length", "cm", "ekstenzije"], category: "ekstenzije" },
  { q: "Da li imate šiškice?", a: "Da! Šiškice od prirodne ljudske kose – samo 45 KM (sniženo sa 55 KM). Jednostavno postavljanje jednim češljićem.", keywords: ["šiškice", "bangs", "fringe", "šiške"], category: "ekstenzije" },

  // === TOPERI / TOPPERS (56-65) ===
  { q: "Šta je topper za kosu?", a: "Topper je mali dodatak koji prekriva tjeme – idealan za prorijeđenu kosu ili manjak volumena, bez nošenja pune perike.", keywords: ["topper", "šta", "what", "tjeme"], category: "toperi" },
  { q: "Koliko koštaju toperi?", a: "Mono toperi od prirodne ljudske kose kreću se od 200-400 KM, ovisno o veličini i nijansi.", keywords: ["topper", "toperi", "cijena", "price"], category: "toperi" },
  { q: "Da li su toperi od prirodne kose?", a: "Da! Svi naši mono toperi su od 100% prirodne ljudske kose sa mono bazom za realističan razdjeljak.", keywords: ["topper", "prirodna", "kosa", "natural"], category: "toperi" },
  { q: "Kako se postavlja topper?", a: "Topper se postavlja klipsama na tjeme – jednostavno i brzo, bez ljepila!", keywords: ["topper", "postaviti", "klipse", "attach"], category: "toperi" },
  { q: "Da li topper izgleda prirodno?", a: "Da! Mono baza stvara realističan izgled razdjeljka, tako da niko neće primijetiti da nosite topper.", keywords: ["topper", "prirodno", "natural", "realističan"], category: "toperi" },
  { q: "Koje veličine topera imate?", a: "Imamo mono topere veličine baze 3x5 u dužini 41cm – savršeno za prekrivanje tjemena.", keywords: ["veličina", "size", "topper", "baza", "3x5"], category: "toperi" },
  { q: "Koje boje topera imate?", a: "Ombre blonde, #10 smeđi, 613 plavi, #4/6 smeđi, platinum blonde, #4 tamno smeđi.", keywords: ["boja", "color", "topper", "nijanse"], category: "toperi" },
  { q: "Da li topper pomaže kod gubitka kose?", a: "Da! Toperi su idealno rješenje za prorijeđenu kosu, alopeciju i gubitak volumena.", keywords: ["gubitak", "kose", "prorijeđena", "alopecija", "hair loss"], category: "toperi" },
  { q: "Mogu li stilizirati topper?", a: "Da! Budući da je od prirodne kose, možete ga peglati, uvijati i fenirati.", keywords: ["stilizirati", "style", "topper", "peglati", "fenirati"], category: "toperi" },
  { q: "Koliko dugo traje topper?", a: "Uz pravilnu njegu, topper od prirodne kose traje 6-12 mjeseci svakodnevnog nošenja.", keywords: ["traje", "topper", "lifetime", "trajanje"], category: "toperi" },

  // === NJEGA / CARE (66-75) ===
  { q: "Kako perem periku?", a: "Perite blagim šamponom u hladnoj vodi. Nježno iscijedite bez uvrtanja i ostavite da se prirodno osuši.", keywords: ["pranje", "perem", "wash", "šampon", "perika"], category: "njega" },
  { q: "Kako skladištim periku kad je ne nosim?", a: "Čuvajte na stalku za perike ili u svilenoj vrećici. Izbjegavajte direktnu sunčevu svjetlost.", keywords: ["skladištiti", "čuvati", "store", "stalak"], category: "njega" },
  { q: "Koji šampon koristiti za periku?", a: "Koristite blagi, sulfate-free šampon i regenerator za prirodnu kosu. Izbjegavajte teške silikone.", keywords: ["šampon", "shampoo", "koji", "preporuka"], category: "njega" },
  { q: "Mogu li peglati periku od prirodne kose?", a: "Da, ali uvijek koristite zaštitu od toplote i temperaturu do 180°C.", keywords: ["peglati", "straighten", "toplina", "temperatura"], category: "njega" },
  { q: "Koliko često treba prati periku?", a: "Preporučujemo pranje svakih 7-14 dana, ovisno o učestalosti nošenja.", keywords: ["koliko", "često", "pranje", "frequently"], category: "njega" },
  { q: "Da li mogu koristiti regenerator?", a: "Da! Koristite leave-in regenerator ili ulje za kosu za dodatnu hidrataciju i sjaj.", keywords: ["regenerator", "conditioner", "ulje", "oil"], category: "njega" },
  { q: "Kako raspetljati periku?", a: "Koristite široki češalj, počnite od krajeva prema korijenu. Nikad ne čupajte!", keywords: ["raspetljati", "detangle", "češalj", "petljanje"], category: "njega" },
  { q: "Da li mogu spavati sa perikom?", a: "Ne preporučujemo. Skinite periku prije spavanja da produžite njen vijek trajanja.", keywords: ["spavati", "noć", "sleep", "night"], category: "njega" },
  { q: "Kako održavati rep za kosu?", a: "Perite u hladnoj vodi sa blagim šamponom. Ostavite da se osuši na zraku. Ne koristite fen na visokoj temperaturi.", keywords: ["rep", "održavanje", "pranje", "care"], category: "njega" },
  { q: "Da li se perika može prati u mašini?", a: "NE! Nikada ne perite periku u mašini za pranje. Uvijek ručno pranje u hladnoj vodi.", keywords: ["mašina", "washing machine", "ne", "pranje"], category: "njega" },

  // === NARUDŽBA / ORDERING (76-85) ===
  { q: "Kako naručiti?", a: "Možete naručiti putem WhatsApp-a (+387 67 149 7444), putem web shopa ili direktno u showroomu.", keywords: ["naručiti", "order", "kako", "kupiti", "buy"], category: "narudžba" },
  { q: "Da li mogu platiti pouzećem?", a: "Da! Plaćanje pouzećem dostupno je za narudžbe unutar BiH.", keywords: ["pouzeće", "cod", "cash", "gotovina"], category: "narudžba" },
  { q: "Koji načini plaćanja su dostupni?", a: "Pouzeće (BiH), bankovni transfer, PayPal i kartično plaćanje.", keywords: ["plaćanje", "payment", "kartica", "paypal", "transfer"], category: "narudžba" },
  { q: "Da li mogu otkazati narudžbu?", a: "Da, možete otkazati narudžbu u roku od 24h od narudžbe, prije slanja.", keywords: ["otkazati", "cancel", "otkaz", "poništiti"], category: "narudžba" },
  { q: "Da li mogu zamijeniti proizvod?", a: "Da, zamjena je moguća u roku od 7 dana od prijema, pod uvjetom da proizvod nije korišten.", keywords: ["zamjena", "exchange", "zamijeniti", "return"], category: "narudžba" },
  { q: "Da li imate povrat novca?", a: "Povrat je moguć u roku od 14 dana od prijema, pod uvjetom da je proizvod nekorišten i u originalnom pakovanju.", keywords: ["povrat", "refund", "novac", "return"], category: "narudžba" },
  { q: "Da li imate popuste za veće narudžbe?", a: "Da! Za narudžbe od 3+ proizvoda nudimo posebne popuste. Kontaktirajte nas za ponudu.", keywords: ["popust", "discount", "veća", "narudžba", "bulk"], category: "narudžba" },
  { q: "Da li imate akcije?", a: "Da! Pratite nas na Instagramu i Facebook-u za najnovije akcije i ponude. Trenutno su repovi na sniženju!", keywords: ["akcija", "sale", "sniženje", "popust"], category: "narudžba" },
  { q: "Da li šaljete fakturu?", a: "Da, uz svaku narudžbu šaljemo fiskalni račun.", keywords: ["faktura", "račun", "invoice", "fiskalni"], category: "narudžba" },
  { q: "Da li imam garanciju?", a: "Da, na sve proizvode od prirodne kose dajemo garanciju na kvalitet materijala.", keywords: ["garancija", "warranty", "guarantee"], category: "narudžba" },

  // === O NAMA / ABOUT (86-90) ===
  { q: "Gdje se nalazite?", a: "Nalazimo se u Sarajevu, Bosna i Hercegovina. Kontaktirajte nas za tačnu adresu showrooma.", keywords: ["gdje", "lokacija", "adresa", "location", "sarajevo"], category: "o-nama" },
  { q: "Da li imate fizičku radnju?", a: "Da! Imamo showroom u Sarajevu gdje možete isprobati proizvode uživo.", keywords: ["radnja", "shop", "fizička", "showroom"], category: "o-nama" },
  { q: "Koje je radno vrijeme?", a: "Radimo pon-pet 09:00-17:00 i sub 10:00-14:00. Za posjete van radnog vremena, dogovorite termin.", keywords: ["radno", "vrijeme", "sati", "hours", "working"], category: "o-nama" },
  { q: "Kako vas mogu kontaktirati?", a: "WhatsApp: +387 67 149 7444, Instagram: @eynna.hair, email: kontakt putem web stranice.", keywords: ["kontakt", "contact", "telefon", "phone", "whatsapp"], category: "o-nama" },
  { q: "Da li imate Instagram?", a: "Da! Pratite nas na @eynna.hair za najnovije modele, akcije i inspiraciju.", keywords: ["instagram", "ig", "social", "društvene"], category: "o-nama" },

  // === KVALITET / QUALITY (91-95) ===
  { q: "Odakle dolazi kosa?", a: "Koristimo pažljivo odabranu premium ljudsku kosu najviše kvalitete, koja zadržava prirodnu kutikulu.", keywords: ["odakle", "kosa", "izvor", "source", "origin"], category: "kvalitet" },
  { q: "Šta znači kvaliteta 16?", a: "Kvaliteta kose se ocjenjuje na skali – naša kosa je kvalitete do 16, što je među najvišim u industriji!", keywords: ["kvaliteta", "16", "quality", "grade"], category: "kvalitet" },
  { q: "Šta znači mono baza?", a: "Mono (monofilament) baza je prozračna mrežica koja imitira kožu glave – daje najprirodniji izgled razdjeljka.", keywords: ["mono", "monofilament", "baza", "base"], category: "kvalitet" },
  { q: "Da li je kosa hemijski tretirana?", a: "Ne! Naša premium kosa nije hemijski tretirana, što joj daje duži vijek i prirodniji izgled.", keywords: ["hemijski", "tretirana", "chemical", "processed"], category: "kvalitet" },
  { q: "Zašto su perike od prirodne kose skuplje?", a: "Prirodna kosa se može stilizirati, farbati i traje godinama. To je investicija u kvalitet i samopouzdanje!", keywords: ["skuplje", "expensive", "zašto", "cijena", "why"], category: "kvalitet" },

  // === OSTALO / OTHER (96-100) ===
  { q: "Da li radite saradnju sa salonima?", a: "Da! Nudimo posebne cijene za frizerske salone. Kontaktirajte nas za partnerstvo.", keywords: ["salon", "saradnja", "partnership", "veleprodaja", "wholesale"], category: "ostalo" },
  { q: "Da li imate program lojalnosti?", a: "Da! Stalne kupce nagrađujemo popustima i ekskluzivnim ponudama.", keywords: ["lojalnost", "loyalty", "stalni", "nagrada"], category: "ostalo" },
  { q: "Da li mogu dobiti savjet koji proizvod mi odgovara?", a: "Naravno! Pošaljite nam svoju sliku na WhatsApp i pomoći ćemo vam odabrati savršen proizvod.", keywords: ["savjet", "advice", "preporuka", "recommendation", "pomoć"], category: "ostalo" },
  { q: "Da li imate poklon kartice?", a: "Da! Poklon kartice su dostupne u raznim iznosima – savršen poklon za svaku ženu.", keywords: ["poklon", "kartica", "gift card", "voucher"], category: "ostalo" },
  { q: "Da li nudite usluge postavljanja perike?", a: "Da! U našem showroomu nudimo profesionalno postavljanje i prilagodbu perika.", keywords: ["postavljanje", "usluga", "fitting", "install", "profesionalno"], category: "ostalo" },
];
