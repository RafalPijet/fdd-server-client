import React from 'react';
import Header from '../../common/Header/Header';
import HeaderLinks from '../../features/HeaderLinks/HeaderLinksLoginPage';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import { useStyles } from './StatutPageStyle';
import image from '../../../images/statutBackground.jpg';

const StatutPage: React.FC = () => {
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
                <Typography
                  variant="h6"
                  align="center"
                  className={classes.title}
                >
                  Statut Fundacji DOROŚLI DZIECIOM
                </Typography>
                <Typography align="justify" className={classes.content}>
                  Fundacja pod nazwą „DOROŚLI DZIECIOM” zwana dalej Fundacją,
                  ustanowiona została Aktem Notarialnym z dnia 8 lipca 2005r
                  Rep.A Nr 2892/2005 sporządzonym przez notariusza Jacka Samelę
                  w jego kancelarii notarialnej w Starachowicach przy ul.
                  Staszica 13
                </Typography>
                <Typography align="center" className={classes.title}>
                  § 1 Postanowienia ogólne
                </Typography>
                <Typography align="justify" className={classes.content}>
                  1.Fundacja działa w oparciu o ustawę z dn. 6 kwietnia 1984r o
                  Fundacjach /tekst jednolity Dz.U. nr 46 z 1991r poz.203 z
                  późniejszymi zmianami oraz postanowienia niniejszego statutu.
                </Typography>
                <Typography align="justify" className={classes.content}>
                  2.Siedzibą Fundacji jest miasto Starachowice.
                </Typography>
                <Typography align="justify" className={classes.content}>
                  3.Fundacja działa na terenie Rzeczpospolitej Polskiej i za
                  granicą.
                </Typography>
                <Typography align="justify" className={classes.content}>
                  4.Fundacja może tworzyć swoje oddziały, przedstawicielstwa i
                  inne ośrodki zamiejscowe w kraju i za granicą.
                </Typography>
                <Typography align="justify" className={classes.content}>
                  5.Fundacja została ustanowiona na czas nieokreślony.
                </Typography>
                <Typography align="justify" className={classes.content}>
                  6.Nadzór nad Fundacją sprawuje Minister Pracy i Polityki
                  Socjalnej.
                </Typography>
                <Typography align="center" className={classes.title}>
                  § 2 Cele Fundacji
                </Typography>
                <Typography align="justify" className={classes.content}>
                  1.Celami Fundacji jest realizacja zadań statutowych w
                  zakresie: pomocy społecznej, w tym pomocy rodzinom i osobom
                  wychowującym dzieci, będącym w trudnej sytuacji życiowej,
                  prowadzenia i wspierania działalności charytatywnej na rzecz
                  dzieci i młodzieży, ochrony i promocji zdrowia, działalności
                  na rzecz dzieci niepełnosprawnych , nauki, edukacji, oświaty i
                  wychowania, krajoznawstwa oraz wypoczynku dzieci i młodzieży,
                  wspierania finansowego placówek opiekuńczo-wychowawczych,
                  upowszechniania kultury fizycznej i sportu wśród dzieci i
                  młodzieży, pomocy ofiarom katastrof, klęsk żywiołowych,
                  konfliktów zbrojnych i wojen w kraju i za granicą, promocji i
                  organizacji wolontariatu, działalności wspomagającej
                  technicznie, szkoleniowo, informacyjnie lub finansowo
                  organizacje pozarządowe, pomocy dzieciom i młodzieży, będących
                  ofiarami patologii społecznych, działalności wspierającej
                  finansowo pomoc w leczeniu i rehabilitacji dzieci.
                </Typography>
                <Typography align="justify" className={classes.content}>
                  2.Realizacja celów statutowych Fundacji polega na
                  organizowaniu i finansowaniu następujących rodzajów
                  przedsięwzięć: naukowych, poprzez promowanie rozwoju wiedzy
                  wśród dzieci i młodzieży, czyli przekazywanie darowizn dla
                  ośrodków naukowych, wychowawczych, edukacyjnych, programów
                  badawczych i funduszy stypendialnych, oświatowych, poprzez
                  kształcenie i przekazywanie środków przeznaczonych na
                  upowszechnianie wykształcenia i kultury wśród dzieci i
                  młodzieży, przygotowujących je do życia w warunkach wspólnoty
                  europejskiej, dobroczynności, poprzez przekazywanie środków
                  przeznaczonych dla osób i instytucji zajmujących się
                  wspieraniem dzieci i młodzieży będących w niedostatku i
                  potrzebujących pomocy, ochrony zdrowia, poprzez przekazywanie
                  środków przeznaczonych dla ośrodków zdrowia, szpitali,
                  zakładów rehabilitacyjnych, hospicjów, umożliwiających
                  dzieciom i młodzieży korzystanie z opieki lekarskiej oraz
                  zakup lekarstw, pomocy społecznej, poprzez przekazywanie
                  środków przeznaczonych na zaspokajanie niezbędnych potrzeb
                  życiowych dzieciom i młodzieży oraz umożliwiania im bytowania
                  w warunkach odpowiadających godności człowieka, doprowadzania
                  do życiowego usamodzielniania na poziomie standardów
                  europejskich, w zakresie kultury fizycznej i sportu, poprzez
                  przekazywanie środków przeznaczonych na podnoszenie i
                  nabywanie sprawności fizycznej wśród dzieci i młodzieży, czyli
                  darowizny dla klubów sportowych, stypendia sportowe,
                  wspomaganie zawodów sportowych, w tym zawodów osób
                  niepełnosprawnych,
                </Typography>
                <Typography align="justify" className={classes.content}>
                  3.Fundacja realizuje swoje cele poprzez: gromadzenie środków
                  finansowych i dóbr materialnych na potrzeby Fundacji,
                  pochodzące z darowizn, spadków, zapisów, zbiórek i subwencji
                  osób prawnych, prowadzenie działalności informacyjnej i
                  promocyjnej, ze szczególnym naciskiem na wsparcie medialne,
                  współpracę z organami władzy państwowej, samorządowej oraz
                  instytucjami, przedsiębiorstwami i osobami fizycznymi w
                  zakresie niezbędnym dla realizacji celów Fundacji,
                </Typography>
                <Typography align="center" className={classes.title}>
                  § 3 Organy Fundacji
                </Typography>
                <Typography align="justify" className={classes.content}>
                  1.Zarząd Fundacji
                </Typography>
                <Typography align="justify" className={classes.content}>
                  2.Rada Fundacji
                </Typography>
                <Typography align="center" className={classes.title}>
                  § 4 Zarząd Fundacji
                </Typography>
                <Typography align="justify" className={classes.content}>
                  1.Zarząd Fundacji składa się z 2 do 7 osób.
                </Typography>
                <Typography align="justify" className={classes.content}>
                  2.Zarząd Fundacji powoływany jest na dwuletnią łączną
                  kadencję, przez Fundatorów.
                </Typography>
                <Typography align="justify" className={classes.content}>
                  3.Zarząd wybiera ze swojego grona Prezesa Zarządu.
                </Typography>
                <Typography align="justify" className={classes.content}>
                  4.Strukturę organizacyjną, tryb działania Zarządu oraz zasady
                  wynagradzania określa Regulamin Zarządu, zatwierdzony przez
                  fundatorów.
                </Typography>
                <Typography align="center" className={classes.title}>
                  § 5
                </Typography>
                <Typography align="justify" className={classes.content}>
                  1.Zarząd Fundacji zwany dalej "Zarządem", kieruje
                  działalnością Fundacji i reprezentuje ją na zewnątrz.
                </Typography>
                <Typography align="justify" className={classes.content}>
                  2.Oświadczenie woli w imieniu Fundacji składają dwaj
                  Członkowie Zarządu lub jeden Członek Zarządu i pełnomocnik
                  powołany przez Zarząd.
                </Typography>
                <Typography align="justify" className={classes.content}>
                  3.Do obowiązków Zarządu należy realizowanie celów Fundacji
                  oraz uchwał podejmowanych przez Fundatorów.
                </Typography>
                <Typography align="justify" className={classes.content}>
                  4.Do zadań Zarządu należy w szczególności: uchwalanie rocznych
                  planów finansowych, kierowanie działalnością Fundacji,
                  przyjmowanie darowizn, spadków, zapisów oraz innych subwencji,
                  podejmowanie decyzji w sprawach nie zastrzeżonych do
                  kompetencji innych organów, sporządzanie rocznych sprawozdań z
                  działalności Fundacji, uchwalenie Regulaminu Zarządu.
                </Typography>
                <Typography align="justify" className={classes.content}>
                  5.a. Zarząd podejmuje swoje decyzje w formie uchwał
                  zapadających bezwzględną większością głosów, przy czym za
                  bezwzględną większość głosów rozumie się więcej głosów oddana
                  „za” niż „przeciw” i "wstrzymania się"
                </Typography>
                <Typography align="justify" className={classes.content}>
                  5.b. Uchwały zarządu zapadają w głosowaniu jawnym. Tajne
                  głosowanie zarządza się na wniosek chociażby jednego z
                  głosujących.
                </Typography>
                <Typography align="center" className={classes.title}>
                  § 6 Rada Fundacji
                </Typography>
                <Typography align="justify" className={classes.content}>
                  1.Rada Fundacji składa się z 2 do 5 osób.
                </Typography>
                <Typography align="justify" className={classes.content}>
                  2.Radę Fundacji powołują Fundatorzy na czteroletnią łączną
                  kadencję.
                </Typography>
                <Typography align="justify" className={classes.content}>
                  3.Rada Fundacji wybiera ze swego grona Przewodniczącego.
                </Typography>
                <Typography align="justify" className={classes.content}>
                  4.Członkowie Rady Fundacji nie mogą być jednocześnie członkami
                  organu zarządzającego Fundacji ani pozostawać z nimi w
                  stosunku pokrewieństwa, powinowactwa lub podległości z tytułu
                  zatrudnienia.
                </Typography>
                <Typography align="justify" className={classes.content}>
                  5.Członek Rady Fundacji nie może być skazany prawomocnym
                  wyrokiem za przestępstwo z winy umyślnej,
                </Typography>
                <Typography align="justify" className={classes.content}>
                  6.Członek Rady Fundacji nie może otrzymywać z tytułu
                  członkowstwa w Radzie Fundacji zwrotu uzasadnionych kosztów
                  lub wynagrodzenia w wysokości wyższej niż określone w art.8
                  pkt.8 ustawy z dnia 3 marca 2000r o wynagradzaniu osób
                  kierujących niektórymi podmiotami prawnymi.
                </Typography>
                <Typography align="justify" className={classes.content}>
                  7.Zasady działania Rady Fundacji określa Regulamin Rady
                  Fundacji zatwierdzany uchwałą fundatorów.
                </Typography>
                <Typography align="center" className={classes.title}>
                  § 7
                </Typography>
                <Typography align="justify" className={classes.content}>
                  1.Rada Fundacji jest organem nadzoru.
                </Typography>
                <Typography align="justify" className={classes.content}>
                  2.Do kompetencji Rady Fundatorów należy w szczególności:
                  <br />- Nadzór nad realizacją celów Fundacji przez Zarząd,
                  <br />- Nadzór nad realizacją przez Zarząd uchwał fundatorów,
                  <br />- Nadzór nad wykonywaniem przez Zarząd jego statutowych
                  zadań,
                  <br />- Uchwalanie Regulaminu Rady Fundacji,
                </Typography>
                <Typography align="justify" className={classes.content}>
                  3.Rada Fundacji podejmuje swoje decyzje w formie uchwał
                  zapadających bezwzględną większością głosów, przy czym za
                  bezwzględną większość głosów rozumie się więcej głosów
                  oddanych "za" niż "przeciw" i "wstrzymujących się",
                </Typography>
                <Typography align="justify" className={classes.content}>
                  4.Uchwały Rady Fundacji zapadają w głosowaniu jawnym. Tajne
                  głosowanie zarządza się na wniosek chociażby jednego z
                  głosujących.
                </Typography>
                <Typography align="center" className={classes.title}>
                  § 8 Majątek Fundacji oraz działalność gospodarcza Fundacji
                </Typography>
                <Typography align="justify" className={classes.content}>
                  1. Majątek Fundacji stanowi fundusz założycielski w kwocie
                  2.500,00 zł oraz wszystkie składniki majątkowe uzyskane
                  poprzez Fundację ze swojej działalności statutowej.
                  <br />
                  2. Fundacja prowadzi działalność finansową i księgową zgodnie
                  z obowiązu- jącymi na terenie RP przepisami w tym zakresie.
                  <br />
                  3.1.Fundacja może prowadzić działalność gospodarczą w
                  rozmiarach służą- cych realizacji jej celów statutowych, na
                  zasadach określonych w odręb- nych przepisach.
                  <br />
                  3.2. Przedmiot działalności gospodarczej Fundacji stanowi:
                  <br /> a) sprzedaż detaliczna pozostałych towarów prowadzona
                  na straganach i tar- gowiskach (PKD 52.62.B)
                  <br />
                  b) sprzedaż detaliczna bezpośrednia prowadzona poza siecią
                  sklepową (PKD 52.63.A)”.
                  <br />
                  4. Cały uzyskany dochód z działalności gospodarczej
                  przeznaczany jest reali- zację celów statutowych.
                  <br />
                  5. Fundacji zabrania się:
                  <br /> a) udzielania pożyczek lub zabezpieczania zobowiązań
                  jej majątkiem w stosunku do członków organów lub pracowników
                  oraz osób, z którymi pozostają w związku małżeńskim albo w
                  stosunku pokrewieństwa lub powinowactwa w linii prostej,
                  pokrewieństwa lub powinowactwa w linii bocznej do drugiego
                  stopnia albo są związani z tytułu przysposobienia, opieki lub
                  kurateli, zwanych dalej „osobami bliskimi”,
                  <br />
                  b) przekazywania jej majątku na rzecz członków organów,
                  pracowników oraz ich osób bliskich, na zasadach innych niż w
                  stosunku do osób trzecich, w szczególności jeżeli przekazanie
                  to następuje bezpłatnie lub na preferencyjnych warunkach,
                  <br />
                  c) wykorzystywania majątku na rzecz członków organów lub
                  pracowników oraz ich osób bliskich na zasadach innych niż w
                  stosunku do osób trzecich, chyba że to wykorzystanie wynika
                  bezpośrednio ze statutowego celu Fundacji,
                  <br /> d) zakupu na szczególnych zasadach towarów lub usług od
                  podmiotów, w których uczestniczą członkowie organów lub
                  pracownicy oraz osoby im bliskie.
                </Typography>
                <Typography align="center" className={classes.title}>
                  § 9
                </Typography>
                <Typography align="justify" className={classes.content}>
                  Fundacja może ustanawiać nagrody i wyróżnienia, które będą
                  przyznawane za osiągnięcia w dziedzinie obejmującej statutowy
                  zakres działania Fundacji.
                </Typography>
                <Typography align="center" className={classes.title}>
                  § 10 Likwidacja Fundacji
                </Typography>
                <Typography align="justify" className={classes.content}>
                  1.Likwidacja Fundacji odbywa się w trybie i na zasadach
                  określonych w ustawie o Fundacjach.
                  <br />
                  2.Likwidację przeprowadza wyznaczony przez Zarząd likwidator,
                  który przejmuje na okres likwidacji prawa i obowiązki Zarządu.
                  <br />
                  3.Majątek Fundacji, pozostały do jej likwidacji, przeznacza
                  się na cele statutowe.
                </Typography>
                <Typography align="center" className={classes.title}>
                  § 11
                </Typography>
                <Typography align="justify" className={classes.content}>
                  Organizację i wewnętrzny podział kompetencji w Fundacji
                  określa "Regulamin Organizacyjny" uchwalany przez Zarząd
                  Fundacji.
                </Typography>
                <Typography align="center" className={classes.title}>
                  § 12
                </Typography>
                <Typography align="justify" className={classes.content}>
                  Zmian w statucie Fundacji dokonują Fundatorzy w drodze uchwały
                  podjętej jednogłośnie.
                </Typography>
              </GridItem>
            </GridContainer>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default StatutPage;
