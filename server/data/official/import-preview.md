# Rajasthan DTE College Import Preview

Generated: 2026-11-23 (offline preview; database not queried).

> **Preview only.** The importer was not executed, `--apply` was not used, no MongoDB connection was made, and no records were written. Dataset status remains `pending-human-review`.

## Sources and scope

- College listing: [https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) (accessed 2026-11-23; page last updated 2026-10-15).
- First-year admissions information: [https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/31012](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/31012) (accessed 2026-11-23; page last updated 2026-10-15).
- DAP student page: [https://daprajasthan.co.in/Student/StudentHome/Index](https://daprajasthan.co.in/Student/StudentHome/Index) (accessed 2026-11-23; page title observed: DAP-2026).

The DTE listing contains 72 data rows. One exact duplicate (Government Polytechnic College, Kelwara, Baran; source data rows 7–8) was removed, leaving 71 candidates. The duplicate was removed during dataset preparation, not by a database match.

Every candidate is present on the official DTE listing, but its record is **not independently cross-checked** against the individual college or a second public college roster. The supplied admissions and DAP pages do not publish such a roster. Names, type labels, addresses, contact strings, and slugs below are preserved as published; apparent anomalies (including `CoEd` for some Women Polytechnic entries and camp-office address text) have not been corrected.

Additional source-quality flags require review: establishment year is published as `0` for source rows 17, 19, 20, 21, and 23; the phone values `293` (row 19) and `NA` (row 32) are not reliable contact numbers; and several rows under district Bikaner have names/addresses referencing Sri Ganganagar, Alwar, Pali, Neemrana, Nawa, or Tonk. These values are preserved verbatim and are not treated as verified corrections.

The listing says `Diploma` as a general course type; it does not enumerate branches. The 2026–27 booklet gives only general first-year eligibility (RBSE secondary or equivalent) and an age-limit note. Neither is assigned to individual Course records. Course branches, duration, course-specific eligibility, and current admission dates remain unavailable. No 2026–27 date is represented as current.

## College candidates

Contact values are shown exactly as published, including the listing’s `[dot]` / `[at]` email obfuscation. `Unavailable in source listing` means that value was not present for that row.

| # | College name | District / `location` | Established | College type | Address as published | Contact email as published | Contact phone as published | Source URL | Verification |
|---:|---|---|---:|---|---|---|---|---|---|
| 1 | Government Polytechnic College, Ajmer | Ajmer | 1958 | CoEd | Makhupura, Nasirabad Road, Ajmer-305002 | gpc[dot]ajmer[at]rajasthan[dot]gov[dot]in | 0145-2695195 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 2 | GOVERNMENT WOMEN POLYTECHNIC COLLEGE, AJMER | Ajmer | 1988 | CoEd | MAKHUPURA, AJMER | GWPC[dot]AJMER[at]RAJASTHAN[dot]GOV[dot]IN | 0145-2695231 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 3 | Govt.women polytechnic college Alwar | Alwar | 2025 | CoEd | camp office:- Govt.polytechnic college Alwar | gwpc[dot]alwar[at]gmail[dot]com | Unavailable in source listing | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 4 | Government Polytechnic College Bagidora, Banswara | Banswara | 1951 | CoEd | Village Katariya, PO Balawara, Tehsil Bagidora, District Banswara, Rajasthan 327603 | GPC[dot]BAGIDORA[at]RAJASTHAN[dot]GOV[dot]IN | 8824423664 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 5 | Government Polytechnic College, Banswara | Banswara | 1992 | CoEd | Opposite Mayur Mill, Lodha Banswara, 327001 | GPC[dot]BANSWARA[at]RAJASTHAN[dot]GOV[dot]IN | 2962254729 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 6 | Government Polytechnic College, Baran | Baran | 2010 | CoEd | NH-27, Village - Batawadi, Distt. - Baran (Raj.) PIN - 325205 | gpc[dot]baran[at]rajasthan[dot]gov[dot]in | 0745-3297011 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 7 | Government Polytechnic College, Kelwara | Baran | 2019 | CoEd | Village - Pahari, Tehsil - Shabad, District - Baran, Pin Code- 325216 | gpc[dot]kelwara[at]gmail[dot]com | 8079040149 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 8 | GOVERNMENT POLYTECHNIC COLLEGE GUDAMALANI - CAMP BARMER | Barmer | 2025 | CoEd | GOVERNMENT POLYTECHNIC COLLEGE GUDAMALANI (CAMP BARMER) | GPC[dot]GUDAMALANI[at]RAJASTHAN[dot]GOV[dot]IN | Unavailable in source listing | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 9 | Government Polytechnic College, Barmer | Barmer | 1988 | CoEd | NH-68, Jaisalmer Road, Barmer (Raj.) Pin code 344001 | GPC[dot]BARMER[at]rajasthan[dot]gov[dot]in | 02982-220634 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 10 | Govt Polytechnic College Beawer | Beawar | 2025 | CoEd | Camp office: Govt Polytechnic College Ajmer | gpc[dot]beawar[at]rajasthan[dot]gov[dot]in | 1452695195 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 11 | GOVERNMENT WOMEN POLYTECHNIC COLLEGE BHARATPUR | Bharatpur | 2010 | CoEd | NEAR DALMIYA DAIRY, NH-21, SEWAR ROAD | gwpc[dot]bharatpur[at]rajasthan[dot]gov[dot]in | 0564-4297002 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 12 | Shri Gokul Verma Government Polytechnic College Bharatpur | Bharatpur | 1984 | CoEd | Near Dalmia Dairy, Sewar Bypass Road, NH-11, Bharatpur - 321001 (Rajasthan) | gpc[dot]bharatpur[at]rajasthan[dot]gov[dot]in | 0564-4297015 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 13 | Government Polytechnic College Uchchain | Bharatpur | 2021 | CoEd | Campus at Shri Gokul Verma Government Polytechnic College, Bharatpur Near Dalmia Dairy, Bharatpur - 321001 (Rajasthan) | gpc[dot]uchchain[at]rajasthan[dot]gov[dot]in | 5644297015 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 14 | Govt. Women Polytechnic college Bhilwara | Bhilwara | 2025 | CoEd | CAMP GOVT. POLYTECHNIC COLLEGE, BHILWARA | gwpc[dot]bhilwara[at]rajasthan[dot]gov[dot]in | Unavailable in source listing | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 15 | Government Polytechnic College Bhilwara | Bhilwara | 2012 | CoEd | Government Polytechnic College, Tilak nagar, Bhilwara Pin Code 311001 | gpc[dot]bhilwara[at]rajasthan[dot]gov[dot]in | 0148-2250111 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 16 | C.M.R.B. GOVERNMENT POLYTECHNIC COLLEGE, SRI GANGANAGAR | Bikaner | 0 (source value; verify) | CoEd | Jasssa Singh Road ,Bhambhu Colony, Setia Farm, Sri Ganganagar, Rajasthan 335001 | GPC[dot]SRIGANGANAGAR[at]RAJASTHAN[dot]GOV[dot]IN | 0154-2943900 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 17 | Government Polytechnic College, Alwar | Bikaner | 1960 | CoEd | Near Itarana Flyover ,Alwar- 301001 | gpc[dot]alwar[at]rajasthan[dot]gov[dot]in | 0144-2701645 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 18 | Government Polytechnic College Pali | Bikaner | 0 (source value; verify) | CoEd | Government Polytechnic College Pali, Sumerpur Road, Pali, 306401 | gpc[dot]pali[at]rajasthan[dot]gov[dot]in | 293 (source value; verify) | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 19 | Government Polytechnic College Neemrana (Kotputli Behror)-Rajasthan | Bikaner | 0 (source value; verify) | CoEd | VILLAGE KUNDANSINGH PURA TEH. Neemrana Dist. Alwar | gpc[dot]neemrana[at]rajasthan[dot]gov[dot]in | 1494299300 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 20 | Government Polytechnic College Nawa | Bikaner | 0 (source value; verify) | CoEd | NEAR TOLL PLAZA,VILLAGE POST GOVINDI,TEHSIL NAWA,DIST DIDWANA-KUCHAMAN | gpc[dot]nawa[at]rajasthan[dot]gov[dot]in | 1586299643 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 21 | SGBB Government Polytechnic College Sirohi (Raj.) | Bikaner | 2026 | CoEd | Near Village Mandwa, Sirohi (Raj.) | gpc[dot]sirohi[at]rajasthan[dot]gov[dot]in | 0297-2222401 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 22 | Govt. Polytechnic College Dholpur | Bikaner | 0 (source value; verify) | CoEd | Near NH -11B , Purani Chhawni , Dholpur , Rajasthan , 328001 | gpc[dot]dholpur[at]rajasthan[dot]gov[dot]in | 9460526984 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 23 | Government Women Polytechnic College, Bikaner | Bikaner | 1988 | CoEd | Dungar College Road, Sadul Ganj, Bikaner (Raj.) 334001 | gwpc[dot]bikaner[at]rajasthan[dot]gov[dot]in | 0151-2528874 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 24 | GOVERNMENT POLYTECHNIC COLLEGE, BIKANER | Bikaner | 1960 | CoEd | Old Shivbari Road Sadul Ganj, Bikaner Rajasthan Pin 334003 | gpc[dot]bikaner[at]rajasthan[dot]gov[dot]in | 0151-2542064 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 25 | Government Polytechnic College, Tonk | Bikaner | 2011 | CoEd | Village Borkhandi Khurd Near Banas Bridge Jaipur Road Tonk 304021 | gpc[dot]tonk[at]rajasthan[dot]gov[dot]in | 9460986360 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 26 | GOVT.POLYTECHNIC COLLEGE, INDERGARH | Bundi | 2025 | CoEd | CAMP OFFICE: GOVT.POLYTECHNIC COLLEGE, BUNDI | gpc[dot]indergarh[at]rajasthan[dot]gov[dot]in | Unavailable in source listing | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 27 | GOVERNMENT POLYTECHNIC COLLEGE BUNDI | Bundi | 2014 | CoEd | Government Polytechnic College, Gram- Daulatpura, District- Bundi, Pin-323001, Rajasthan | gpc[dot]bundi[at]rajasthan[dot]gov[dot]in | 0747-2970021 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 28 | Government Polytechnic College Chittorgarh | Chittorgarh | 1988 | CoEd | Village-Bojunda Udaipur Road Chittorgarh-312025 | gpc[dot]chittorgarh[at]rajasthan[dot]gov[dot]in | 0147-2240992 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 29 | GOVERNMENT POLYTECHNIC COLLEGE, CHURU | Churu | 2005 | CoEd | INDUSTRIAL AREA, ROAD NO. 5, HANUMANGARI ROAD, CHURU. PIN NO.-331001 | gpc[dot]churu[at]rajasthan[dot]gov[dot]in | 0156-2257794 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 30 | Rajesh Pilot Government Polytechnic College, Dausa | Dausa | 2013 | CoEd | JIROTA KHURD ROAD,DAUSA, Pin Code-303303,Office Contact No-9414240680 | GPC[dot]DAUSA[at]RAJASTHAN[dot]GOV[dot]IN | 9414240680 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 31 | Govt Polytechnic College Bandikui Camp-Dausa | Dausa | 2025 | CoEd | Camp Office : Rajesh Pilot Govt Polytechnic College Dausa | gpc[dot]bandikui[at]rajasthan[dot]gov[dot]in | NA (source value; not a usable phone; verify) | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 32 | GOVT.POLYTECHNIC COLLEGE, DEEG | Deeg | 2025 | CoEd | CAMP OFFICE: GOVT.POLYTECHNIC COLLEGE, bharatpur | gpc[dot]deeg[at]rajasthan[dot]gov[dot]in | Unavailable in source listing | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 33 | GOVERNMENT POLYTECHNIC COLLEGE DUNGARPUR | Dungarpur | 2010 | CoEd | VILLAGE-DEVAL,DIST-DUNGARPUR | gpc[dot]dungarpur[at]rajasthan[dot]gov[dot]in | 6414364351 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 34 | Government Polytechnic College Hanumangarh | Hanumangarh | 2013 | CoEd | Sangaria By-Pass, Near DIET or Kendriya Vidyalaya, Hanumangarh Junction-335512 | gpc[dot]hanumangarh[at]rajasthan[dot]gov[dot]in | 0155-2260044 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 35 | GOVERNMENT WOMEN POLYTECHNIC COLLEGE , SANGANER | Jaipur | 2006 | CoEd | SECTOR -8 , HALDI GHATI MARG, PRATAP NAGAR , SANGANER , JAIPUR , RAJASTHAN -302033 | gwpc[dot]sanganer[at]rajasthan[dot]gov[dot]in | 0141-2791411 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 36 | government polytechnic college phagi dudu camp khetan jaipur | Jaipur | 2025 | CoEd | camp office RC Khetan Ploytechnic College Jhanlana dungri jaipur | gpc[dot]phagi[at]rajasthan[dot]gov[dot]in | Unavailable in source listing | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 37 | Government Women Polytechnic College Gandhinagar Jaipur | Jaipur | 1981 | CoEd | GANDHI CIRCLE, GANDHI NAGAR, JAIPUR | gwpc[dot]jaipur[at]rajasthan[dot]gov[dot]in | 0141-2706688 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 38 | Government Ram Chandra Khaitan Polytechnic College Jaipur | Jaipur | 1978 | CoEd | Jhalana Institutionl Area, Near RTO Office | gpc[dot]jaipur[at]rajasthan[dot]gov[dot]in | 0141-2707829 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 39 | Government Engineering College Jaipur | Jaipur | 2023 | CoEd | Government Engineering College, Government R.C. Khaitan Polytechnic College Campus Jaipur | principal[dot]gecjpr[at]gmail[dot]com | 1412993598 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 40 | GOVERNMENT POLYTECHNIC COLLEGE, JAISALMER | Jaisalmer | 2010 | CoEd | NEAR CENTRAL JAIL RAMGARH ROAD JAISALMER 345001 RAJASTHAN | GPC[dot]JAISALMER[at]RAJASTHAN[dot]GOV[dot]IN | 02992-251500 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 41 | GOVERNMENT POLYTECHNIC COLLEGE, JALORE | Jalore | 2011 | CoEd | Government Polytechnic College, Jalore, Ahore Road, Godan, Jalore-307029 | gpc[dot]jalore[at]rajasthan[dot]gov[dot]in | 8058139685 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 42 | Government Polytechnic College RIICO Industrial Area Jhalawar | Jhalawar | 2006 | CoEd | RIICO INDUSTRIAL AREA NEAR INDUSTRIAL TRAINING INSTITUTE JHALAWAR-326001 | gpc[dot]jhalawar[at]rajasthan[dot]gov[dot]in | 7432-233282 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 43 | Government Polytechnic College, Jhunjhunu | Jhunjhunu | 2013 | CoEd | Abusar Ka Bas, Mandawa Road, Jhunjhunu (Rajasthan). PIN-333001 | gpc[dot]jhunjhunu[at]rajasthan[dot]gov[dot]in | 0159-2297007 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 44 | GOVT. POLYTECHNIC COLLEGE PILANI | Jhunjhunu | 2021 | CoEd | Govt. Polytechnic College Pilani ( GPC jhunjhunu) | GPC[dot]PILANI2021[at]RAJASTHAN[dot]GOV[dot]IN | 8233650466 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 45 | GOVT. POLYTECHNIC COLLEGE, BALOTRA | Jodhpur | 2025 | CoEd | CAMP GOVT. POLYTECHNIC COLLEGE, JODHPUR | gpc[dot]balotra[at]rajasthan[dot]gov[dot]in | Unavailable in source listing | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 46 | Government Residential Women Polytechnic College, Jodhpur | Jodhpur | 1991 | CoEd | GAURAV PATH, RESIDENCY ROAD , JODHPUR | PRINCIPAL[dot]GWPC[dot]JDH[at]RAJASTHAN[dot]GOV[dot]IN | 0291-2434187 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 47 | Teachers Training Center and Learning Resource Development Center | Jodhpur | 1991 | CoEd | Hostel No 3 and 4 Polytechnic College campus Residency Road Jodhpur Rajasthan 342001 | ttc[dot]jodhpur[at]rajasthan[dot]gov[dot]in | 0291-2431072 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 48 | Government Polytechnic College, Jodhpur | Jodhpur | 1951 | CoEd | Residency Road Jodhpur | gpc[dot]jodhpur[at]rajasthan[dot]gov[dot]in | 0291-2649439 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 49 | Government Polytechnic College Mandore | Jodhpur | 2021 | CoEd | Residency Road | gpc[dot]mandore[at]rajasthan[dot]gov[dot]in | 2912649439 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 50 | Government Polytechnic College, Karauli | Karauli | 2011 | CoEd | Behind Govt. PG College,Near Kendriya Vidyalaya, karauli.(322241) | gpc[dot]karoli[at]rajasthan[dot]gov[dot]in | 0144-2701645 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 51 | GOVERNMENT POLYTECHNIC COLLEGE BHIWADI | Khairthal-Tijara | 2025 | CoEd | CAMP OFFICE: GOVT.POLYTECHNIC COLLEGE, NEEMRANA | gpcbhiwadi[dot]tizara[at]gmail[dot]com | Unavailable in source listing | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 52 | GOVT. WOMEN POLYTECHNIC COLLEGE, TAPUKARA | Khairthal-Tijara | 2025 | CoEd | Jhiwana Road, Tapukara, Khairthal-Tijara | gwpc[dot]tapukara[at]rajasthan[dot]gov[dot]in | Unavailable in source listing | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 53 | GOVT. POLYTECHNIC COLLEGE LADPURA | Kota | 2025 | CoEd | camp office Govt polytechnic college kota | gpc[dot]ladpura[at]rajasthan[dot]gov[dot]in | Unavailable in source listing | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 54 | Government Polytechnic College, RAMGANJMANDI | Kota | 2025 | CoEd | CAMP OFFICE : GOVT.POLYTECHNIC COLLEGE JHALAWAR | GPC[dot]RAMGANJMANDI[at]RAJASTHAN[dot]GOV[dot]IN | Unavailable in source listing | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 55 | GOVERNMENT POLYTECHNIC COLLEGE KANWAAS | Kota | 2025 | CoEd | CAMP GPC BARAN, NH27 VILLAGE BATAWADI, DISTRICT BARAN | GPC[dot]KANWAAS[at]RAJASTHAN[dot]GOV[dot]IN | Unavailable in source listing | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 56 | Government Polytechnic College, Kota (Rajasthan) | Kota | 1959 | CoEd | DCM Road, Kota (Rajasthan), India, Pin-324007 | GPC[dot]KOTA[at]RAJASTHAN[dot]GOV[dot]IN | 0744-2365538 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 57 | Government Women Polytechnic College, Kota | Kota | 1993 | CoEd | GOVT. WOMEN POLYTECHNIC COLLEGE BEHIND MAHESHWARI BHAWAN VIGYAN NAGAR JHALAWAR ROAD - KOTA - RAJASTHAN, Pin - 324005 | gwpc[dot]kota[at]rajasthan[dot]gov[dot]in | 0744-2420313 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 58 | GOVERNMENT POLYTECHNIC COLLEGE, NAGAUR | Nagaur | 2013 | CoEd | BEHIND DTO , RIICO INDUSTRIAL AREA, BALWA ROAD, NAGAUR | gpc[dot]nagaur[at]rajasthan[dot]gov[dot]in | 0158-2247505 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 59 | Govt. Polytechnic College, Merta City Camp-Nagaur | Nagaur | 2025 | CoEd | camp office : Govt.Polytechnic college, Nagaur | gpc[dot]merta[at]rajasthan[dot]gov[dot]in | Unavailable in source listing | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 60 | GOVT. POLYTECHNIC COLLEGE MARWAR JUNCTION | Pali | 2025 | CoEd | CAMP OFFICE :Govt. Polytechnic College Pali | gpc[dot]marwarjn[at]rajasthan[dot]gov[dot]in | Unavailable in source listing | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 61 | GOVT.POLYTECHNIC COLLEGE, PHALODI | Phalodi | 2025 | CoEd | CAMP OFFICE: GOVT.POLYTECHNIC COLLEGE, BIKANER | GPC[dot]PHALODI[at]RAJASTHAN[dot]GOV[dot]IN | Unavailable in source listing | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 62 | Government Polytechnic College Pratapgarh | Pratapgarh | 2010 | CoEd | Dhariyawad Road , Near Police Line, Pratapgarh - 312605 | gpc[dot]pratapgarh[at]rajasthan[dot]gov[dot]in | 9785541733 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 63 | Government Polytechnic College, Rajsamand | Rajsamand | 2006 | CoEd | Opposite Mecson Marble, N. H.- 8, Village- Jawad, Rajsamand- 313324 | gpc[dot]rajsamand[at]rajasthan[dot]gov[dot]in | 0295-2221197 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 64 | GOVT.POLYTECHNIC COLLEGE, SALUMBAR | Salumbar | 2025 | CoEd | CAMP OFFICE: GOVT.POLYTECHNIC COLLEGE, DUNGARPUR | gpc[dot]salumbar[at]rajasthan[dot]gov[dot]in | Unavailable in source listing | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 65 | GOVT. POLYTECHNIC COLLEGE SAWAI MADHOPUR | Sawai Madhopur | 1988 | CoEd | GOVT POLYTECHNIC COLLEGE, THINGLA, SAWAI MADHOPUR | gpc[dot]smadhopur[at]rajasthan[dot]gov[dot]in | 7462220891 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 66 | Government Polytechnic College,Sikar | Sikar | 2006 | CoEd | Jaipur Bikaner By-Pass, Chandpura Via - Bajajgram,Sikar-332021 | gpc[dot]sikar[at]rajasthan[dot]gov[dot]in | 01572-274020 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 67 | Government Women Polytechnic College, Sikar | Sikar | 2025 | CoEd | Camp GPC Sikar, Jaipur-Bikaner bypass, Chandpura | gwpc[dot]sikar[at]gmail[dot]com | Unavailable in source listing | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 68 | Government Polytechnic College, Niwai | Tonk | 2025 | CoEd | Camp Office: Government Polytechnic College, Tonk | gpc[dot]niwai[at]rajasthan[dot]gov[dot]in | Unavailable in source listing | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 69 | GOVERNMENT POLYTECHNIC COLLEGE, VALLABHNAGAR | Udaipur | 2025 | CoEd | CAMP GPC, UDAIPUR | gpc Vallabhnagar [at]rajasthan[dot]gov[dot]in | Unavailable in source listing | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 70 | Government Polytechnic College, Udaipur | Udaipur | 2018 | CoEd | Revenue Village-Jogi Talab, South Ext. Scheme, Udaipur . Office no- 8560905817 | gpc[dot]udaipur[at]rajasthan[dot]gov[dot]in | 9829744932 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |
| 71 | GOVERNMENT WOMEN POLYTECHNIC COLLEGE UDAIPUR | Udaipur | 1986 | CoEd | PRATAPNAGAR UDAIPUR | gwpc[dot]udaipur[at]rajasthan[dot]gov[dot]in | 0294-2491575 | [DTE listing](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469) | Official-list value; not independently cross-checked |

## Source keys and provenance preview

The importer’s per-candidate provenance upsert contains `sourceKey`, `targetModel: "College"`, `targetId`, `sourceUrl`, `accessedAt`, `sourceRow`, `verifiedFields`, and `unavailableFields`, plus Mongoose `createdAt` / `updatedAt` timestamps. `verifiedFields` is the row’s full `verifiedFields` object from the dataset (including the raw college slug, listed course type, and available contact values); unavailable contact values are named in `unavailableFields`.

`targetId` cannot be finalized offline: it will be the existing matched College `_id`, if one is found, or the deterministic candidate `_id` below when a new College is inserted. The source URL and access date are the DTE listing URL and the date shown above for every row.

| # | Stable source key | Raw source slug | Listed course type (not a branch) | Source row | Candidate `_id` if inserted | Unavailable fields for this row |
|---:|---|---|---|---:|---|---|
| 1 | `rajasthan-dte-college:gpcajmer` | gpcajmer | Diploma | 1 | `e1e516be1d87e9f577877b42` | course branches, course duration, course-specific eligibility, current admission dates |
| 2 | `rajasthan-dte-college:gwpcajmer` | gwpcajmer | Diploma | 2 | `008d3b91811ca3a62205acb6` | course branches, course duration, course-specific eligibility, current admission dates |
| 3 | `rajasthan-dte-college:alwar` | Alwar | Diploma | 3 | `b04ada7c39146c6d04d69033` | course branches, course duration, course-specific eligibility, current admission dates, contact phone |
| 4 | `rajasthan-dte-college:gpcbagidora` | gpcbagidora | Diploma | 4 | `cc83a6b3556b1f6c7a23fdc0` | course branches, course duration, course-specific eligibility, current admission dates |
| 5 | `rajasthan-dte-college:gpcbanswara` | gpcbanswara | Diploma | 5 | `2f6ed0329714dcf43798f4f3` | course branches, course duration, course-specific eligibility, current admission dates |
| 6 | `rajasthan-dte-college:gpcbaran` | gpcbaran | Diploma | 6 | `d23ff811de7661f7d51866c8` | course branches, course duration, course-specific eligibility, current admission dates |
| 7 | `rajasthan-dte-college:gpckelwara` | gpckelwara | Diploma | 7 | `4f465e4f2696e038431770f1` | course branches, course duration, course-specific eligibility, current admission dates |
| 8 | `rajasthan-dte-college:gudamalani` | GUDAMALANI | Diploma | 9 | `418a76191552981a1861b157` | course branches, course duration, course-specific eligibility, current admission dates, contact phone |
| 9 | `rajasthan-dte-college:gpcbarmer` | gpcbarmer | Diploma | 10 | `cb3f8781354f9623f423016a` | course branches, course duration, course-specific eligibility, current admission dates |
| 10 | `rajasthan-dte-college:beawer` | Beawer | Diploma | 11 | `2ebbf2d2c039d0cdc9e15a72` | course branches, course duration, course-specific eligibility, current admission dates |
| 11 | `rajasthan-dte-college:gwpcbharatpur` | gwpcbharatpur | Diploma | 12 | `fbee8958d04a392e08aa9810` | course branches, course duration, course-specific eligibility, current admission dates |
| 12 | `rajasthan-dte-college:gpcbharatpur` | gpcbharatpur | Diploma | 13 | `358998e04a9e19c298e5a34f` | course branches, course duration, course-specific eligibility, current admission dates |
| 13 | `rajasthan-dte-college:gpcuchchain` | gpcuchchain | Diploma | 14 | `4f979ebd218bfbe373dc028e` | course branches, course duration, course-specific eligibility, current admission dates |
| 14 | `rajasthan-dte-college:bhilwara` | BHILWARA | Diploma | 15 | `88d0683ae72e8ac0f745df3b` | course branches, course duration, course-specific eligibility, current admission dates, contact phone |
| 15 | `rajasthan-dte-college:gpcbhilwara` | gpcbhilwara | Diploma | 16 | `06b01d34e71445f717ac1b01` | course branches, course duration, course-specific eligibility, current admission dates |
| 16 | `rajasthan-dte-college:gpcsriganganagar` | gpcsriganganagar | Diploma | 17 | `e777300d434c99b2bb690e91` | course branches, course duration, course-specific eligibility, current admission dates |
| 17 | `rajasthan-dte-college:gpcalwar` | gpcalwar | Diploma | 18 | `fa82302ac14cf0e7494dcc24` | course branches, course duration, course-specific eligibility, current admission dates |
| 18 | `rajasthan-dte-college:gpcpali` | gpcpali | Diploma | 19 | `e56b906e5283cc384ab5deb0` | course branches, course duration, course-specific eligibility, current admission dates |
| 19 | `rajasthan-dte-college:gpcneemrana` | gpcneemrana | Diploma | 20 | `ee108f15e32f1255e0bf38d4` | course branches, course duration, course-specific eligibility, current admission dates |
| 20 | `rajasthan-dte-college:gpcnawa` | gpcnawa | Diploma | 21 | `47653147289ca8b5129feb2f` | course branches, course duration, course-specific eligibility, current admission dates |
| 21 | `rajasthan-dte-college:gpcsirohi` | gpcsirohi | Diploma | 22 | `eef66bc17f4e0fd4ee429f61` | course branches, course duration, course-specific eligibility, current admission dates |
| 22 | `rajasthan-dte-college:www-gpcdholpur-com` | www.gpcdholpur.com | Diploma | 23 | `ea09834eb9ace7814a6d1df9` | course branches, course duration, course-specific eligibility, current admission dates |
| 23 | `rajasthan-dte-college:gwpcbikaner` | gwpcbikaner | Diploma | 24 | `985a52172c59aeacfafc9aa6` | course branches, course duration, course-specific eligibility, current admission dates |
| 24 | `rajasthan-dte-college:gpcbikaner` | gpcbikaner | Diploma | 25 | `3dc2b3ca80c9ae9aae90900c` | course branches, course duration, course-specific eligibility, current admission dates |
| 25 | `rajasthan-dte-college:gpctonk` | gpctonk | Diploma | 26 | `7363870749fb9fe5f99c1db1` | course branches, course duration, course-specific eligibility, current admission dates |
| 26 | `rajasthan-dte-college:gpcindergarh` | GPCIndergarh | Diploma | 27 | `ef6a946060cb94b170be0417` | course branches, course duration, course-specific eligibility, current admission dates, contact phone |
| 27 | `rajasthan-dte-college:gpcbundi` | gpcbundi | Diploma | 28 | `a1bc41196fde724223e129f6` | course branches, course duration, course-specific eligibility, current admission dates |
| 28 | `rajasthan-dte-college:gpcchittorgarh` | gpcchittorgarh | Diploma | 29 | `4036c6b5f82d66c5329b1d37` | course branches, course duration, course-specific eligibility, current admission dates |
| 29 | `rajasthan-dte-college:gpcchuru` | gpcchuru | Diploma | 30 | `0c848ab0a9ed5bd9a2e3d86f` | course branches, course duration, course-specific eligibility, current admission dates |
| 30 | `rajasthan-dte-college:gpcdausa` | gpcdausa | Diploma | 31 | `d7e5f69ff372c5a6e3c2592d` | course branches, course duration, course-specific eligibility, current admission dates |
| 31 | `rajasthan-dte-college:bandikui` | Bandikui | Diploma | 32 | `357cd09298d84450eded9c81` | course branches, course duration, course-specific eligibility, current admission dates |
| 32 | `rajasthan-dte-college:deeg` | DEEG | Diploma | 33 | `199b94b7778c92b4d9da97ba` | course branches, course duration, course-specific eligibility, current admission dates, contact phone |
| 33 | `rajasthan-dte-college:gpcdungarpur` | gpcdungarpur | Diploma | 34 | `9a17e31ec489210b451157bb` | course branches, course duration, course-specific eligibility, current admission dates |
| 34 | `rajasthan-dte-college:gpchanumangarh` | gpchanumangarh | Diploma | 35 | `a3f0baa02008e57d858f34ae` | course branches, course duration, course-specific eligibility, current admission dates |
| 35 | `rajasthan-dte-college:gwpcsanganer` | gwpcsanganer | Diploma | 36 | `42f66e73c26368941ee0ad29` | course branches, course duration, course-specific eligibility, current admission dates |
| 36 | `rajasthan-dte-college:phagi` | phagi | Diploma | 37 | `989e68b598430a828bf5d148` | course branches, course duration, course-specific eligibility, current admission dates, contact phone |
| 37 | `rajasthan-dte-college:gwpcjaipur` | gwpcjaipur | Diploma | 38 | `b670b9cce639f82bf5684949` | course branches, course duration, course-specific eligibility, current admission dates |
| 38 | `rajasthan-dte-college:gpcjaipur` | gpcjaipur | Diploma | 39 | `3e75a144b18bb6da922fd736` | course branches, course duration, course-specific eligibility, current admission dates |
| 39 | `rajasthan-dte-college:gecjaipur` | gecjaipur | Diploma | 40 | `c68a1cdffe146da3225ba367` | course branches, course duration, course-specific eligibility, current admission dates |
| 40 | `rajasthan-dte-college:gpcjaisalmer` | gpcjaisalmer | Diploma | 41 | `71131b87abac8128304d6e23` | course branches, course duration, course-specific eligibility, current admission dates |
| 41 | `rajasthan-dte-college:gpcjalore` | gpcjalore | Diploma | 42 | `fc487965d080d43aa9914378` | course branches, course duration, course-specific eligibility, current admission dates |
| 42 | `rajasthan-dte-college:gpcjhalawar` | gpcjhalawar | Diploma | 43 | `a30c28a641a3ae16370b23b7` | course branches, course duration, course-specific eligibility, current admission dates |
| 43 | `rajasthan-dte-college:gpcjhunjhunu` | gpcjhunjhunu | Diploma | 44 | `9f130c0c0a8ed421202966a9` | course branches, course duration, course-specific eligibility, current admission dates |
| 44 | `rajasthan-dte-college:gpcpilani` | gpcpilani | Diploma | 45 | `c9223a4ed03867db4337f498` | course branches, course duration, course-specific eligibility, current admission dates |
| 45 | `rajasthan-dte-college:balotra` | BALOTRA | Diploma | 46 | `1829b08d6498a46627bae771` | course branches, course duration, course-specific eligibility, current admission dates, contact phone |
| 46 | `rajasthan-dte-college:gwpcjodhpur` | gwpcjodhpur | Diploma | 47 | `2841f8d4eba0c6a748279423` | course branches, course duration, course-specific eligibility, current admission dates |
| 47 | `rajasthan-dte-college:ttcjodhpur` | ttcjodhpur | Diploma | 48 | `fac703dccb57eb1fc22a1b54` | course branches, course duration, course-specific eligibility, current admission dates |
| 48 | `rajasthan-dte-college:gpcjodhpur` | gpcjodhpur | Diploma | 49 | `ba48934b2e9aa42ea091d560` | course branches, course duration, course-specific eligibility, current admission dates |
| 49 | `rajasthan-dte-college:gpcmandore` | gpcmandore | Diploma | 50 | `c873f488e7ceba19047dcfad` | course branches, course duration, course-specific eligibility, current admission dates |
| 50 | `rajasthan-dte-college:gpckaroli` | gpckaroli | Diploma | 51 | `bd43e07500f1bfe3258389fb` | course branches, course duration, course-specific eligibility, current admission dates |
| 51 | `rajasthan-dte-college:bhiwadi` | BHIWADI | Diploma | 52 | `c7eb37e82aec3823c9083e7e` | course branches, course duration, course-specific eligibility, current admission dates, contact phone |
| 52 | `rajasthan-dte-college:gwpctapukara` | GWPCTapukara | Diploma | 53 | `1a9fd2f30d945f15f2afa447` | course branches, course duration, course-specific eligibility, current admission dates, contact phone |
| 53 | `rajasthan-dte-college:ladpura` | LADPURA | Diploma | 54 | `cdae674813d5e0509b052a5f` | course branches, course duration, course-specific eligibility, current admission dates, contact phone |
| 54 | `rajasthan-dte-college:gpcramganjmandi` | GPCRamganjmandi | Diploma | 55 | `d9f1a542c622883bba85b583` | course branches, course duration, course-specific eligibility, current admission dates, contact phone |
| 55 | `rajasthan-dte-college:gpckanwaas` | GPCKanwaas | Diploma | 56 | `f0812799307269799804724b` | course branches, course duration, course-specific eligibility, current admission dates, contact phone |
| 56 | `rajasthan-dte-college:gpckota` | gpckota | Diploma | 57 | `88b63eeee6696273713dd112` | course branches, course duration, course-specific eligibility, current admission dates |
| 57 | `rajasthan-dte-college:gwpckota` | gwpckota | Diploma | 58 | `d51cf1012a66d40d453d3733` | course branches, course duration, course-specific eligibility, current admission dates |
| 58 | `rajasthan-dte-college:gpcnagaur` | gpcnagaur | Diploma | 59 | `8dc4511e5f544f5b58fe15db` | course branches, course duration, course-specific eligibility, current admission dates |
| 59 | `rajasthan-dte-college:nagaur` | Nagaur | Diploma | 60 | `f81053e34510adb2c05cccce` | course branches, course duration, course-specific eligibility, current admission dates, contact phone |
| 60 | `rajasthan-dte-college:gpcmarwarjunction` | GPCMarwarJunction | Diploma | 61 | `6ad8d32d46e83a02747fdd9b` | course branches, course duration, course-specific eligibility, current admission dates, contact phone |
| 61 | `rajasthan-dte-college:gpcphalodi` | GPCPhalodi | Diploma | 62 | `700406d82cd832bc52163808` | course branches, course duration, course-specific eligibility, current admission dates, contact phone |
| 62 | `rajasthan-dte-college:gpcpratapgarp` | gpcpratapgarp | Diploma | 63 | `7902d2e3a909bdf8146852b2` | course branches, course duration, course-specific eligibility, current admission dates |
| 63 | `rajasthan-dte-college:gpcrajsamand` | gpcrajsamand | Diploma | 64 | `cfe64070a98ee15bfc0e48dd` | course branches, course duration, course-specific eligibility, current admission dates |
| 64 | `rajasthan-dte-college:gpcsalumbar` | GPCSalumbar | Diploma | 65 | `18da5b8c984160bb4f42b246` | course branches, course duration, course-specific eligibility, current admission dates, contact phone |
| 65 | `rajasthan-dte-college:gpcsawaimadhopur` | gpcsawaimadhopur | Diploma | 66 | `43e01de80fd9f00ad66eadc7` | course branches, course duration, course-specific eligibility, current admission dates |
| 66 | `rajasthan-dte-college:gpcsikar` | gpcsikar | Diploma | 67 | `d6e6d75f9c1dd5e90d0a02f6` | course branches, course duration, course-specific eligibility, current admission dates |
| 67 | `rajasthan-dte-college:gwpcsikar` | GWPCSikar | Diploma | 68 | `0980df26c276e0e7b0296397` | course branches, course duration, course-specific eligibility, current admission dates, contact phone |
| 68 | `rajasthan-dte-college:gpcniwai` | GPCNiwai | Diploma | 69 | `6f142ea343683ca159cfba66` | course branches, course duration, course-specific eligibility, current admission dates, contact phone |
| 69 | `rajasthan-dte-college:gpcvallabhnagar` | GPCVallabhnagar | Diploma | 70 | `d10cbf1dc2718e5e86f7da39` | course branches, course duration, course-specific eligibility, current admission dates, contact phone |
| 70 | `rajasthan-dte-college:gpcudaipur` | gpcudaipur | Diploma | 71 | `87d5813a5df7566d44ca8c51` | course branches, course duration, course-specific eligibility, current admission dates |
| 71 | `rajasthan-dte-college:gwpcudaipur` | gwpcudaipur | Diploma | 72 | `785e5b2ad2290da41875611b` | course branches, course duration, course-specific eligibility, current admission dates |

### Exact College document shape

For a candidate with no existing College match, the insert-only payload is the College model’s supported fields below. The `_id` is assigned by the importer from the stable source key; it is stored as a BSON ObjectId and shown here in hexadecimal. Mongoose generates timestamps. For an existing name/location match, **no College fields are updated** (`$setOnInsert`); the existing `_id`, description, courses, and other values remain untouched.

```json
{
  "_id": "e1e516be1d87e9f577877b42",
  "collegeName": "Government Polytechnic College, Ajmer",
  "location": "Ajmer",
  "description": "",
  "courses": [],
  "createdAt": "<generated on insert>",
  "updatedAt": "<generated on insert>"
}
```

The same shape applies to all 71 rows, substituting each row’s college name, district, and candidate `_id` from the tables. No address, year, college type, contact data, source key, or unverified course value is added to the College document; these source details are retained in provenance.

### Example provenance record

This is the exact field shape for the first candidate; the preceding table lists the corresponding key, target-ID candidate, source row, and unavailable fields for all candidates. The example assumes no existing match; otherwise `targetId` is the matched College’s BSON ObjectId. ObjectIds are shown in hexadecimal.

```json
{
  "sourceKey": "rajasthan-dte-college:gpcajmer",
  "targetModel": "College",
  "targetId": "e1e516be1d87e9f577877b42",
  "sourceUrl": "https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469",
  "accessedAt": "2026-11-23T00:00:00.000Z",
  "sourceRow": 1,
  "verifiedFields": {
    "collegeName": "Government Polytechnic College, Ajmer",
    "collegeUrlSlug": "gpcajmer",
    "district": "Ajmer",
    "establishmentYear": "1958",
    "addressAsPublished": "Makhupura, Nasirabad Road, Ajmer-305002",
    "collegeType": "CoEd",
    "listedCourseType": "Diploma",
    "contactEmailAsPublished": "gpc[dot]ajmer[at]rajasthan[dot]gov[dot]in",
    "contactPhoneAsPublished": "0145-2695195"
  },
  "unavailableFields": ["courseBranches", "courseDuration", "courseSpecificEligibility", "currentAdmissionDates"],
  "createdAt": "<generated by Mongoose>",
  "updatedAt": "<generated by Mongoose>"
}
```

For each other candidate, the same provenance shape is used with the values in its row. The importer creates or updates provenance by the unique `sourceKey`; its unique index is initialized before processing. Stable College IDs and the provenance key prevent duplicate records on retries. More than one existing case-insensitive name/location match, or a source-key/College identity conflict, safely aborts the import.

## Database matching and record counts

Database matching requires MongoDB. It was intentionally not attempted, so current match-based counts are **unknown**; this preview does not claim that any record has been imported.

| Outcome | Preview count / status |
|---|---|
| Valid offline College candidates | 71 |
| New College inserts | Unknown; 0–71 depending on existing matches |
| Existing College documents updated | 0 by design; matching documents are reused without field updates |
| Provenance inserts | Unknown; depends on existing `sourceKey` records |
| Provenance updates | Unknown; depends on existing `sourceKey` records |
| Database-match skips | 0 in normal flow; a matched College still receives a provenance upsert |
| Database-dependent rejects / aborts | Unknown; ambiguous matches or identity conflicts stop processing |
| Exact duplicate source row removed before import | 1 |
| Course records | 0 |
| Actual writes in this preview | 0 |

If every candidate processes successfully, the importer will handle 71 College candidates and 71 provenance upserts. Their insert/update split cannot be known without database matching. The importer is not transactional, so an apply run interrupted by a database error may have partial writes; stable IDs and provenance keys are intended to make a retry safe.

## Manual decisions before approval

1. Confirm the 71 official-list entries and the published `CoEd` labels, including entries named Women Polytechnic; decide whether the source values should remain verbatim or require additional official corroboration.
2. Review camp-office address text and rows with missing contact details; these are preserved as published, not inferred or corrected.
3. Decide whether storing addresses only in provenance (the current schema has no address field) is acceptable. The College `description` remains empty to avoid reinterpreting address text or changing API semantics.
4. Obtain an official branch/seat-matrix source before preparing Course records. Branches, duration, and course-specific eligibility are not present in this dataset.
5. Confirm that no 2026–27 admission dates are to be represented as current; none are included here.
6. After approval, run the importer only after a MongoDB match preview and review of any ambiguous existing records. The dataset remains `pending-human-review`; this report does not approve it.
