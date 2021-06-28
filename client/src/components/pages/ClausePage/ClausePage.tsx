import React from 'react';
import Header from '../../common/Header/Header';
import HeaderLinks from '../../features/HeaderLinks/HeaderLinksLoginPage';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import { useStyles } from './ClausePageStyle';
import image from '../../../images/jumbotronParent.jpg';
import pass from '../../../images/pass.png';

const ClausePage: React.FC = () => {
  const classes = useStyles();
  return (
    <div>
      <Header
        isSpiner={false}
        absolute
        color="transparent"
        brand="Fundacja Dorośli Dzieciom"
        rightLinks={<HeaderLinks isSpiner={false} />}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: 'url(' + image + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      >
        <div className={classes.container}>
          <Paper elevation={3} className={classes.root}>
            <GridContainer>
              <GridItem xs={12} sm={12} lg={12}>
                <Typography align="center" className={classes.title}>
                  KLAUZULA INFORMACYJNA DLA PODPISUJĄCYCH POROZUMIENIE Z
                  FUNDACJĄ
                </Typography>
                <Typography align="justify" className={classes.content}>
                  Zgodnie z art. 13 ust. 1 i 2 Rozporządzenia Parlamentu
                  Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r.
                  w sprawie ochrony osób fizycznych w związku z przetwarzaniem
                  danych osobowych i w sprawie swobodnego przepływu takich
                  danych oraz uchylenia dyrektywy 95/46/WE (Dz. Urz. UE L 119/1
                  z 04.05.2016 r.), dalej jako „RODO”, informuję, że:
                  <br />
                  1) Administratorem Pani/Pana danych osobowych jest Fundacja
                  Dorośli Dzieciom z siedzibą w Starachowicach (27-200) przy ul.
                  Kilińskiego 26;
                  <br />
                  2) Administrator powołał Inspektora Ochrony Danych Osobowych;
                  kontakt do IOD: fundacja@doroslidzieciom.org;
                  <br />
                  3) Pani/Pana dane osobowe będą przetwarzane w celu realizacji
                  Porozumienia - na podstawie art. 6 ust. 1 lit. b RODO oraz w
                  celu prowadzenia ksiąg rachunkowych i dokumentacji podatkowej,
                  na podstawie art. 6 ust. 1 lit. c RODO w zw. z art. 74 ust. 2
                  ustawy z dnia 29 września 1994 r. o rachunkowości; Pani/Pana
                  dane osobowe oraz wizerunek mogą być również przetwarzane w
                  celu informowania w mediach i publikacjach o działalności
                  Administratora, na podstawie art. 6 ust. 1 lit. a RODO, tj.
                  odrębnej zgody; w przypadku ewentualnych sporów Pani/Pana dane
                  osobowe mogą być również przetwarzane w celu dochodzenia
                  roszczeń bądź obrony praw Administratora - na podstawie art. 6
                  ust. 1 lit. f RODO, co stanowi tzw. prawnie uzasadniony
                  interes, którym jest dochodzenie roszczeń i obrona praw
                  Administratora;
                  <br />
                  4) odbiorcą Pani/Pana danych osobowych będą wyłącznie podmioty
                  uprawnione do uzyskania danych osobowych na podstawie
                  odrębnych przepisów prawa, upoważnieni
                  pracownicy/współpracownicy Administratora, dostawcy usług
                  technicznych i organizacyjnych;
                  <br />
                  5) Pani/Pana dane osobowe nie będą przekazywane odbiorcy w
                  państwie trzecim lub organizacji międzynarodowej;
                  <br />
                  6) Pani/Pana dane osobowe będą przechowywane przez okres 5 lat
                  liczonych od rozwiązania/wygaśnięcia Porozumienia, a w
                  przypadku danych przetwarzanych na podstawie zgody - do
                  momentu jej odwołania; dane osobowe przetwarzane w celu
                  dokonywania rozliczeń będą przechowywane przez Administratora
                  przez okres przechowywania dokumentacji księgowej i podatkowej
                  wynikający z przepisów prawa; dane przetwarzane w celu
                  dochodzenia roszczeń (np. w postępowaniach sądowych) będą
                  przechowywane przez okres przedawnienia roszczeń, wynikający z
                  przepisów kodeksu cywilnego;
                  <br />
                  7) posiada Pani/Pan prawo dostępu do treści swoich danych oraz
                  prawo ich sprostowania, usunięcia, ograniczenia przetwarzania,
                  prawo do przenoszenia danych, prawo wniesienia sprzeciwu,
                  prawo do cofnięcia zgody w dowolnym momencie bez wpływu na
                  zgodność z prawem przetwarzania, którego dokonano na podstawie
                  zgody przed jej cofnięciem;
                  <br />
                  8) ma Pani/Pan prawo wniesienia skargi do organu nadzorczego –
                  Prezesa Urzędu Ochrony Danych Osobowych, gdy uzna Pani/Pan, że
                  przetwarzanie przez Administratora danych osobowych Pani/Pana
                  dotyczących narusza przepisy RODO;
                  <br />
                  9) podanie danych osobowych jest dobrowolne, jednakże odmowa
                  podania danych w Porozumieniu może skutkować odmową jego
                  zawarcia;
                  <br />
                  10) wobec Pani/Pana nie będą podejmowane zautomatyzowane
                  decyzje (decyzje bez udziału człowieka), w tym Pani/Pana dane
                  nie będą podlegały profilowaniu.
                </Typography>
                <Typography align="center" className={classes.title}>
                  KLAUZULA INFORMACYJNA do przetwarzania danych osobowych
                </Typography>
                <Typography align="justify" className={classes.content}>
                  „Fundacja Dorośli Dzieciom” informuje, iż od 25 maja 2018 r.
                  mają zastosowanie przepisy Rozporządzenia Parlamentu
                  Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r.
                  w sprawie ochrony osób fizycznych w związku z przetwarzaniem
                  danych osobowych i w sprawie swobodnego przepływu takich
                  danych oraz uchylenia dyrektywy 95/46/WE (ogólne
                  rozporządzenie o ochronie danych), zwane, poniżej jako "RODO".
                </Typography>
                <Typography align="justify" className={classes.content}>
                  W niniejszej klauzuli Fundacja informuje o wszelkich formach
                  przetwarzania danych osobowych w odniesieniu do osób
                  fizycznych będących:
                  <br />
                  a) członkami Stowarzyszenia,
                  <br />
                  b) Beneficjentami pomocy, w tym potencjalnymi beneficjentami,
                  <br />
                  c) pracownikami, przedstawicielami ustawowymi, pełnomocnikami
                  lub reprezentantami takich beneficjentów, oraz
                  <br />
                  d) innymi osobami, których dane przetwarzamy w celach
                  organizacji przedsięwzięć realizowanych przez Fundację.
                  <br />W związku ze współpracą pomiędzy Państwem a Fundacją,
                  mogącą polegać w szczególności na: przyjmowaniu wniosków o
                  przyznanie pomocy, doradztwie dla beneficjentów, przyjmowaniu
                  deklaracji członkowskich i zgłoszeń do udziału w
                  organizowanych wydarzeniach, zawieraniu umów na wykonanie
                  zleconych czynności, możemy przetwarzać podane przez Państwa
                  dane osobowe, takie jak:
                  <br />
                  a) dane identyfikacyjne (imię i nazwisko),
                  <br />
                  b) adres prowadzenia działalności gospodarczej,
                  <br />
                  c) adresy korespondencyjne,
                  <br />
                  d) numery posiadane we właściwych rejestrach (np. numer NIP
                  lub REGON),
                  <br />
                  e) numer PESEL,
                  <br />
                  f) dane kontaktowe, takie jak adres e-mail lub numer telefonu,
                  <br />
                  g) numer rachunku bankowego.
                  <br />
                  Zachęcamy do zapoznania się z poniższą informacją, a w razie
                  wątpliwości, prosimy o kontakt!
                </Typography>
                <Typography align="center" className={classes.title}>
                  INFORMACJA O OCHRONIE DANYCH OSOBOWYCH
                </Typography>
                <Typography align="justify" className={classes.content}>
                  1. Administratorem Państwa danych osobowych jest: Fundacja
                  Dorośli Dzieciom, ul. Kilińskiego 26, 27-200 Starachowice,
                  <br />
                  2. W celu przekazania wszelkich pytań, oświadczeń, żądań
                  dotyczących przetwarzania Państwa danych można się kontaktować
                  pod numerami telefonu 692089011 lub pod adresem email :
                  fundacja@doroslidzieciom.org
                  <br />
                  3. Administrator przetwarza Państwa dane osobowe w ściśle
                  określonym, minimalnym zakresie niezbędnym do osiągnięcia
                  celu:
                  <br />
                  a) na podstawie wyrażenia stosownych zgód (art. 6 ust. 1lit. a
                  RODO),
                  <br />
                  b) wypełnienia obowiązku prawnego ciążącego na Fundacji
                  (dotyczy to przypadków udostępnienia danych beneficjentów,
                  pracowników, współpracowników itp. na żądanie właściwych
                  organów lub sądów) (art. 6 ust. 1 lit. c RODO),
                  <br />
                  c) wykonania umowy lub podjęcia działań niezbędnych dla
                  zawarcia i wykonania umowy, np. kontakt telefoniczny lub
                  e-mail w celu ustalenia, odwołania lub zmiany terminu,
                  zakresu, sposobu wykonania usługi (jeżeli są Państwo stroną
                  umowy zawartej z Fundacją) (art. 6 ust. 1 lit. b RODO),
                  <br />
                  d) wynikającego z prawnie uzasadnionych interesów
                  realizowanych przez Fundację lub przez stronę trzecią (np.
                  weryfikacja Beneficjentów pomocy w publicznych rejestrach;
                  kontakt z beneficjentami pomocy, uczestnikami aktywności
                  prowadzonymi przez Fundację, w tym prowadzenie wewnętrznych
                  rejestrów beneficjentów i osób współpracujących lub
                  korzystających z pomocy służących umożliwieniu kontaktu
                  Fundacji z w/w osobami) (art. 6 ust. 1 lit. f RODO) w tym
                  ustalenia, zabezpieczenia, obrony, dochodzenia roszczeń w
                  ramach prowadzonej działalności statutowej Fundacji.
                  <br />
                  4. Okres przechowywania danych. Dane osobowe przetwarzane
                  przez Fundację Dorośli Dzieciom przechowywane będą przez okres
                  niezbędny do realizacji celu, dla jakiego zostały zebrane – w
                  przypadku projektów – w okresie trwałości danego projektu i
                  konieczności zachowania dokumentacji projektu do celów
                  kontrolnych lub do czasu wniesienia sprzeciwu wobec
                  przetwarzania, o ile nie występują prawnie uzasadnione
                  podstawy dalszego przetwarzania danych. Po upływie powyższych
                  okresów dane będą archiwizowane.
                  <br />
                  5. W szczególnych sytuacjach Administrator może
                  przekazać/powierzyć Państwa dane innym podmiotom, np. do
                  wymiaru sprawiedliwości, organów administracji publicznej:
                  Policja, administracja skarbowa, ZUS, Poczty Polskiej,
                  instytucji związanych z obsługą szeroko pojętych. Podstawą
                  przekazania/powierzenia danych są przepisy prawa.
                  <br />
                  6. Państwa dane osobowe nie podlegają zautomatyzowanemu
                  podejmowaniu decyzji, w tym profilowaniu oraz co do zasady,
                  nie będą przekazywane do państw trzecich.
                  <br />
                  7. W zależności od sfery, w której przetwarzane są dane
                  osobowe w Fundacji, podanie danych osobowych jest: dobrowolne
                  lub podyktowane wymogiem ustawowym lub umownym lub warunkiem
                  zawarcia umowy.
                  <br />
                  8. Dane zbierane z innych źródeł: a) Możemy pozyskiwać Państwa
                  dane osobowe z publicznie dostępnych źródeł, takich jak
                  rejestry przedsiębiorców CEIDG lub KRS w celu weryfikacji
                  informacji podanych przez beneficjentów.
                  <br />
                  Zgodnie z przepisami RODO informujemy, że przysługuje Państwu
                  prawo:
                  <br />
                  a) dostępu do Państwa danych (art. 15 RODO),
                  <br />
                  b) żądania sprostowania Państwa danych (art. 16 RODO),
                  <br />
                  c) żądania usunięcia Państwa danych (art. 17 RODO),
                  <br />
                  d) żądania ograniczenia przetwarzania Państwa danych (art. 18
                  RODO),
                  <br />
                  e) cofnięcia zgody w dowolnym momencie bez wpływu na zgodność
                  z prawem przetwarzania, którego dokonano na podstawie zgody
                  przed jej cofnięciem w przypadku, gdy przetwarzanie odbywa się
                  na postawie udzielonej przez Państwa zgody (art. 13 ust. 2
                  lit. c RODO),
                  <br />
                  f) do przeniesienia Państwa danych (art. 20 RODO),
                  <br />
                  g) wniesienia sprzeciwu wobec przetwarzania Państwa danych
                  (art. 21 RODO).
                  <br />
                  h) wniesienia skargi do organu nadzorczego właściwego do spraw
                  ochrony danych osobowych.
                  <br />Z powyższych uprawnień można skorzystać w siedzibie
                  Administratora, pisząc na adres Fundacji lub drogą
                  elektroniczną kierując korespondencję na adres
                  fundacja@doroslidzieciom.org
                  <br />
                  10. Przysługuje Państwu prawo wniesienia skargi do organu
                  nadzorczego na niezgodne z RODO przetwarzanie Państwa danych
                  osobowych przez Fundację Dorośli Dzieciom. Organem właściwym
                  dla ww. skargi jest Prezes Urzędu Ochrony Danych Osobowych
                  <br />
                  11. Zmiana przepisów. W przypadku zmiany treści lub zmiany
                  interpretacji przepisów RODO, a także zmiany treści lub zmiany
                  interpretacji innych przepisów prawa związanych z przepisami
                  RODO lub ochroną danych osobowych, Administrator może zmienić
                  lub uzupełnić niniejszą informację o ochronie danych
                  osobowych.
                </Typography>
                <Typography align="center" className={classes.title}>
                  KLAUZULA INFORMACYJNA DLA DARCZYŃCY
                </Typography>
                <Typography align="justify" className={classes.content}>
                  Zgodnie z art. 13 ust. 1 i 2 Rozporządzenia Parlamentu
                  Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r.
                  w sprawie ochrony osób fizycznych w związku z przetwarzaniem
                  danych osobowych i w sprawie swobodnego przepływu takich
                  danych oraz uchylenia dyrektywy 95/46/WE (Dz. Urz. UE L 119/1
                  z 04.05.2016 r.), dalej jako „RODO”, informuję, że:
                  <br />
                  1) Administratorem Pani/Pana danych osobowych jest Fundacja
                  Dorośli Dzieciom z siedzibą w Starachowicach (27-200) przy ul.
                  Kilińskiego 26;
                  <br />
                  2) Administrator powołał Inspektora Ochrony Danych Osobowych;
                  kontakt do IOD: fundacja@doroslidzieciom.org;
                  <br />
                  3) Pani/Pana dane osobowe przetwarzane będą w celu prowadzenia
                  ksiąg rachunkowych i dokumentacji podatkowej, na podstawie
                  art. 6 ust. 1 lit. c RODO w związku z art. 74 ust. 2 ustawy z
                  dnia 29 września 1994 r. o rachunkowości oraz w związku z art.
                  26 ust. 7 ustawy z dnia 26 lipca 1991 r. o podatku dochodowym
                  od osób fizycznych; Pani/Pana dane osobowe mogą być również
                  przetwarzane w celach kontaktowych z Administratorem, na
                  postawie art. 6 ust. 1 lit. a RODO, tj. odrębnej zgody;
                  <br />
                  4) Administrator przetwarza następujące kategorie Pani/Pana
                  danych osobowych: imię i nazwisko, dane adresowe, numer
                  rachunku bankowego, inne dane zawarte w tytule wpłaty;
                  Pani/Pana dane osobowe zostały przekazane Administratorowi
                  przez banki, z którymi Administrator zawarł umowy na
                  świadczenie usług bankowych; pozostałe dane osobowe (m.in.
                  adres email, telefon) przetwarzane będą na podstawie wyrażonej
                  przez Panią/Pana odrębnie dobrowolnej zgody;
                  <br />
                  5) odbiorcą Pani/Pana danych osobowych będą wyłącznie podmioty
                  uprawnione do uzyskania danych osobowych na podstawie
                  odrębnych przepisów prawa, upoważnieni
                  pracownicy/współpracownicy Administratora, dostawcy usług
                  technicznych i organizacyjnych;
                  <br />
                  6) Pani/Pana dane osobowe nie będą przekazywane odbiorcy w
                  państwie trzecim lub organizacji międzynarodowej;
                  <br />
                  7) Pani/Pana dane osobowe będą przechowywane przez okres
                  przechowywania dokumentacji księgowej i podatkowej wynikający
                  z przepisów prawa, a w przypadku danych przetwarzanych na
                  podstawie zgody - do momentu jej odwołania;
                  <br />
                  8) posiada Pani/Pan prawo dostępu do treści swoich danych oraz
                  prawo ich sprostowania, usunięcia, ograniczenia przetwarzania,
                  prawo do przenoszenia danych, prawo wniesienia sprzeciwu,
                  prawo do cofnięcia zgody w dowolnym momencie bez wpływu na
                  zgodność z prawem przetwarzania, którego dokonano na podstawie
                  zgody przed jej cofnięciem;
                  <br />
                  9) ma Pani/Pan prawo wniesienia skargi do organu nadzorczego –
                  Prezesa Urzędu Ochrony Danych Osobowych, gdy uzna Pani/Pan, że
                  przetwarzanie przez Administratora danych osobowych Pani/Pana
                  dotyczących narusza przepisy RODO;
                  <br />
                  10) podanie danych osobowych objętych treścią odrębnej zgody
                  jest dobrowolne, jednakże niezbędne do realizacji wyżej
                  wskazanego celu;
                  <br />
                  11) wobec Pani/Pana nie będą podejmowane zautomatyzowane
                  decyzje (decyzje bez udziału człowieka), w tym Pani/Pana dane
                  nie będą podlegały profilowaniu.
                </Typography>
                <Typography align="center" className={classes.title}>
                  KLAUZULA INFORMACYJNA DLA UCZESTNIKÓW IMPREZY
                </Typography>
                <Typography align="justify" className={classes.content}>
                  1. Organizatorem Imprezy jest Fundacja Dorośli Dzieciom z
                  siedzibą w Starachowicach przy ul. Kilińskiego 26, wpisana
                  przez Sąd Rejonowy w Kielcach, XIII Wydział Gospodarczy
                  Krajowego Rejestru Sądowego pod numerem KRS 0000243743, NIP:
                  6642031979, Regon: 260059492.
                  <br />
                  2. Uczestnikiem Imprezy jest każda osoba fizyczna, która
                  bierze udział w Imprezie (dalej jako „Uczestnik”).
                  <br />
                  3. Istnieje możliwość, iż przebieg Imprezy, w tym wizerunek
                  osób w niej uczestniczących, będzie utrwalany za pomocą
                  urządzeń rejestrujących obraz i dźwięk.
                  <br />
                  4. Biorąc udział w Imprezie Uczestnik wyraża nieodpłatnie
                  zgodę na wykorzystanie, w tym rozpowszechnianie przez Fundację
                  Dorośli Dzieciom jego wizerunku, utrwalonego w trakcie Imprezy
                  za pomocą urządzeń rejestrujących obraz i dźwięk, poprzez jego
                  publikację w całości lub we fragmentach na profilach
                  społecznościowych (m.in. Facebook, Youtube) i stronach
                  internetowych Fundacji Dorośli Dzieciom oraz podmiotów z nią
                  współdziałających w zakresie realizacji jej celów statutowych,
                  jak również w pochodzących od Fundacji Dorośli Dzieciom lub
                  wykonanych na jej zlecenie publikacjach, prezentacjach,
                  materiałach filmowych, oraz innego rodzaju materiałach
                  informacyjnych (także w wersji drukowanej i elektronicznej)
                  rozpowszechnianych przez Fundację Dorośli Dzieciom w związku z
                  organizacją Imprezy lub dotyczącą jej działalnością
                  informacyjną lub promocyjną.
                  <br />
                  5. Zgodnie z art. 13 ust. 1 i 2 Rozporządzenia Parlamentu
                  Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r.
                  w sprawie ochrony osób fizycznych w związku z przetwarzaniem
                  danych osobowych i w sprawie swobodnego przepływu takich
                  danych oraz uchylenia dyrektywy 95/46/WE (Dz. Urz. UE L 119/1
                  z 04.05.2016 r.), dalej jako „RODO”, informuję, że:
                  <br />
                  1) Administratorem danych osobowych Uczestników jest Fundacja
                  Dorośli Dzieciom z siedzibą w Starachowicach przy ul.
                  Kilińskiego 26;
                  <br />
                  2) Administrator powołał Inspektora Ochrony Danych Osobowych;
                  kontakt do IOD: fundacja@doroslidzieciom.org;
                  <br />
                  3) dane osobowe Uczestników w postaci wizerunku przetwarzane
                  będą w celu informowania w mediach oraz publikacjach o
                  działalności Administratora, na podstawie art. 6 ust. 1 lit. a
                  RODO, tj. odrębnej zgody, o której mowa w pkt. 4 powyżej;
                  <br />
                  4) odbiorcami danych osobowych będą podmioty uprawnione do
                  uzyskania danych osobowych na podstawie odrębnych przepisów
                  prawa, upoważnieni pracownicy/współpracownicy Administratora,
                  dostawcy usług technicznych i organizacyjnych, oraz podmioty,
                  którym Administrator powierzył przetwarzanie danych osobowych
                  – z zachowaniem wszelkich gwarancji zapewniających
                  bezpieczeństwo przekazywanych danych;
                  <br />
                  5) dane osobowe Uczestników w postaci wizerunku będą
                  przekazywane do państw trzecich (spoza Europejskiego Obszaru
                  Gospodarczego), co do których Komisja Europejska wydała
                  decyzję o stwierdzeniu odpowiedniego stopnia ochrony danych
                  osobowych; w takich przypadkach dane będą przekazywane zgodnie
                  z powszechnie obowiązującymi przepisami prawa z zapewnieniem
                  odpowiednich zabezpieczeń, na podstawie standardowych klauzul
                  ochrony danych przyjętych przez Komisję Europejską; Uczestnik
                  może uzyskać kopię danych osobowych przekazywanych do państwa
                  trzeciego;
                  <br />
                  6) dane osobowe Uczestników przechowywane będą do momentu
                  odwołania zgody;
                  <br />
                  7) Uczestnicy posiadają prawo dostępu do treści swoich danych
                  oraz prawo ich sprostowania, usunięcia, ograniczenia
                  przetwarzania, prawo do przenoszenia danych, prawo wniesienia
                  sprzeciwu, prawo do cofnięcia zgody w dowolnym momencie bez
                  wpływu na zgodność z prawem przetwarzania, którego dokonano na
                  podstawie zgody przed jej cofnięciem;
                  <br />
                  8) Uczestnikom przysługuje prawo wniesienia skargi do organu
                  nadzorczego – Prezesa Urzędu Ochrony Danych Osobowych w
                  przypadku, gdy przy przetwarzaniu danych osobowych
                  Administrator narusza przepisy dotyczące ochrony danych
                  osobowych;
                  <br />
                  9) podanie danych osobowych jest dobrowolne, jednakże
                  niezbędne do uczestnictwa w Imprezie;
                  <br />
                  10) wobec Uczestników nie będą podejmowane zautomatyzowane
                  decyzje (decyzje bez udziału człowieka), w tym ich dane nie
                  będą podlegały profilowaniu.
                </Typography>
                <Typography align="center" className={classes.title}>
                  KLAUZULA INFORMACYJNA KORESPONDENCJA
                </Typography>
                <Typography align="justify" className={classes.content}>
                  Zgodnie z art. 13 ust. 1 i 2 Rozporządzenia Parlamentu
                  Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r.
                  w sprawie ochrony osób fizycznych w związku z przetwarzaniem
                  danych osobowych i w sprawie swobodnego przepływu takich
                  danych oraz uchylenia dyrektywy 95/46/WE (Dz. Urz. UE L 119/1
                  z 04.05.2016 r.), dalej jako „RODO”, informuję, że:
                  <br />
                  1) Administratorem Pani/Pana danych osobowych jest Fundacja
                  Dorośli Dzieciom z siedzibą w Starachowicach (27-200) przy ul.
                  Kilińskiego 26;
                  <br />
                  2) Administrator powołał Inspektora Ochrony Danych Osobowych;
                  fundacja@doroslidzieciom.org,
                  <br />
                  3) Pani/Pana dane osobowe przetwarzane będą w celu prowadzenia
                  korespondencji, na podstawie art. 6 ust. 1 lit. a, tj.
                  odrębnej zgody wynikającej z zainicjowania kontaktu z
                  Administratorem; w przypadku ewentualnych sporów Pani/Pana
                  dane osobowe mogą być również przetwarzane w celu dochodzenia
                  roszczeń bądź obrony praw Administratora - na podstawie art. 6
                  ust. 1 lit. f RODO, co stanowi tzw. prawnie uzasadniony
                  interes, którym jest dochodzenie roszczeń i obrona praw
                  Administratora;
                  <br />
                  4) odbiorcą Pani/Pana danych osobowych będą wyłącznie podmioty
                  uprawnione do uzyskania danych osobowych na podstawie
                  odrębnych przepisów prawa, upoważnieni
                  pracownicy/współpracownicy Administratora, dostawcy usług
                  technicznych i organizacyjnych;
                  <br />
                  5) Pani/Pana dane osobowe nie będą przekazywane odbiorcy w
                  państwie trzecim lub organizacji międzynarodowej;
                  <br />
                  6) Pani/Pana dane osobowe będą przechowywane przez okres
                  prowadzenia korespondencji bądź do momentu wcześniejszego
                  odwołania zgody; dane przetwarzane w celu dochodzenia roszczeń
                  (np. w postępowaniach sądowych) będą przechowywane przez okres
                  przedawnienia roszczeń, wynikający z przepisów kodeksu
                  cywilnego;
                  <br />
                  7) posiada Pani/Pan prawo dostępu do treści swoich danych oraz
                  prawo ich sprostowania, usunięcia, ograniczenia przetwarzania,
                  prawo do przenoszenia danych, prawo wniesienia sprzeciwu,
                  prawo do cofnięcia zgody w dowolnym momencie bez wpływu na
                  zgodność z prawem przetwarzania, którego dokonano na podstawie
                  zgody przed jej cofnięciem;
                  <br />
                  8) ma Pani/Pan prawo wniesienia skargi do organu nadzorczego –
                  Prezesa Urzędu Ochrony Danych Osobowych, gdy uzna Pani/Pan, że
                  przetwarzanie przez Administratora danych osobowych Pani/Pana
                  dotyczących narusza przepisy RODO;
                  <br />
                  9) podanie danych osobowych jest dobrowolne, jednakże
                  niezbędne do realizacji wyżej wskazanego celu;
                  <br />
                  10) wobec Pani/Pana nie będą podejmowane zautomatyzowane
                  decyzje (decyzje bez udziału człowieka), w tym Pani/Pana dane
                  nie będą podlegały profilowaniu.
                </Typography>
                <img
                  src={pass}
                  alt="pass"
                  style={{ maxWidth: '1130px', paddingTop: 10 }}
                />
              </GridItem>
            </GridContainer>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default ClausePage;
