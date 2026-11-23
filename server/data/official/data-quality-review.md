# Rajasthan DTE College Data-Quality Review

- Review date: 2026-11-23.
- Dataset: 71 candidate records; status remains `pending-human-review`.
- Primary source: [https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469](https://hte.rajasthan.gov.in/DepartmentofTechnicalEducation/91469), accessed 2026-11-23; last updated 2026-10-15.
- Scope: values in the dataset, source manifest, and prior import preview. No replacements were inferred and no external source was used to correct a record.
- No dataset, manifest, importer, model, or API changes were made. No database or `.env` access was performed.

> Recommendations below are review actions only. All quoted source values should remain unchanged until confirmed by another official source.

## 1. Establishment year published as `0`

5 records have `establishmentYear: "0"`. Treat the year as unverified, not as an actual establishment date.

| Source row | Exact college name | District | Exact published year | Why review is needed | Recommended action |
| --- | --- | --- | --- | --- | --- |
| 17 | `C.M.R.B. GOVERNMENT POLYTECHNIC COLLEGE, SRI GANGANAGAR` | Bikaner | `0` | Zero is likely a missing/invalid year value; the source does not explain it. | Exclude this year value from downstream use pending verification; preserve raw `0` in provenance. |
| 19 | `Government Polytechnic College Pali` | Bikaner | `0` | Zero is likely a missing/invalid year value; the source does not explain it. | Exclude this year value from downstream use pending verification; preserve raw `0` in provenance. |
| 20 | `Government Polytechnic College Neemrana (Kotputli Behror)-Rajasthan` | Bikaner | `0` | Zero is likely a missing/invalid year value; the source does not explain it. | Exclude this year value from downstream use pending verification; preserve raw `0` in provenance. |
| 21 | `Government Polytechnic College Nawa` | Bikaner | `0` | Zero is likely a missing/invalid year value; the source does not explain it. | Exclude this year value from downstream use pending verification; preserve raw `0` in provenance. |
| 23 | `Govt. Polytechnic College Dholpur` | Bikaner | `0` | Zero is likely a missing/invalid year value; the source does not explain it. | Exclude this year value from downstream use pending verification; preserve raw `0` in provenance. |

## 2. Suspicious or unusually short phone values

Two non-empty phone values are not reliable telephone numbers. No replacement is inferred.

| Source row | Exact college name | Exact published phone | Why review is needed | Recommended action |
| --- | --- | --- | --- | --- |
| 19 | `Government Polytechnic College Pali` | `293` | Three digits is unusually short for a college telephone number. | Exclude as a usable phone number pending verification; preserve the exact source value. |
| 32 | `Govt Polytechnic College Bandikui Camp-Dausa` | `NA` | The source value `NA` is not a usable phone number. | Exclude as a usable phone number pending verification; preserve the exact source value. |

## 3. Women Polytechnic names listed as `CoEd`

12 names include “Women Polytechnic” while the official `collegeType` value is exactly `CoEd`. This is a source-label conflict, not a basis for correcting either field.

| Source row | Exact published college name | District | Exact college type | Why review is needed | Recommended action |
| --- | --- | --- | --- | --- | --- |
| 2 | `GOVERNMENT WOMEN POLYTECHNIC COLLEGE, AJMER` | Ajmer | `CoEd` | The name indicates a women polytechnic while the source type says CoEd. | Verify with another official source; preserve `CoEd` until confirmed. |
| 3 | `Govt.women polytechnic college Alwar` | Alwar | `CoEd` | The name indicates a women polytechnic while the source type says CoEd. | Verify with another official source; preserve `CoEd` until confirmed. |
| 12 | `GOVERNMENT WOMEN POLYTECHNIC COLLEGE BHARATPUR` | Bharatpur | `CoEd` | The name indicates a women polytechnic while the source type says CoEd. | Verify with another official source; preserve `CoEd` until confirmed. |
| 15 | `Govt. Women Polytechnic college Bhilwara` | Bhilwara | `CoEd` | The name indicates a women polytechnic while the source type says CoEd. | Verify with another official source; preserve `CoEd` until confirmed. |
| 24 | `Government Women Polytechnic College, Bikaner` | Bikaner | `CoEd` | The name indicates a women polytechnic while the source type says CoEd. | Verify with another official source; preserve `CoEd` until confirmed. |
| 36 | `GOVERNMENT WOMEN POLYTECHNIC COLLEGE , SANGANER` | Jaipur | `CoEd` | The name indicates a women polytechnic while the source type says CoEd. | Verify with another official source; preserve `CoEd` until confirmed. |
| 38 | `Government Women Polytechnic College Gandhinagar Jaipur` | Jaipur | `CoEd` | The name indicates a women polytechnic while the source type says CoEd. | Verify with another official source; preserve `CoEd` until confirmed. |
| 47 | `Government Residential Women Polytechnic College, Jodhpur` | Jodhpur | `CoEd` | The name indicates a women polytechnic while the source type says CoEd. | Verify with another official source; preserve `CoEd` until confirmed. |
| 53 | `GOVT. WOMEN POLYTECHNIC COLLEGE, TAPUKARA` | Khairthal-Tijara | `CoEd` | The name indicates a women polytechnic while the source type says CoEd. | Verify with another official source; preserve `CoEd` until confirmed. |
| 58 | `Government Women Polytechnic College, Kota` | Kota | `CoEd` | The name indicates a women polytechnic while the source type says CoEd. | Verify with another official source; preserve `CoEd` until confirmed. |
| 68 | `Government Women Polytechnic College, Sikar` | Sikar | `CoEd` | The name indicates a women polytechnic while the source type says CoEd. | Verify with another official source; preserve `CoEd` until confirmed. |
| 72 | `GOVERNMENT WOMEN POLYTECHNIC COLLEGE UDAIPUR` | Udaipur | `CoEd` | The name indicates a women polytechnic while the source type says CoEd. | Verify with another official source; preserve `CoEd` until confirmed. |

## 4. Potential name, district, and address inconsistencies

### District/name/address conflicts

8 records list district `Bikaner` while the college name or address explicitly identifies another place. The table reproduces the source values without deciding which field is correct.

| Source row | Exact college name | Exact district | Exact address as published | Why review is needed | Recommended action |
| --- | --- | --- | --- | --- | --- |
| 17 | `C.M.R.B. GOVERNMENT POLYTECHNIC COLLEGE, SRI GANGANAGAR` | `Bikaner` | `Jasssa Singh Road ,Bhambhu Colony, Setia Farm, Sri Ganganagar, Rajasthan 335001` | The college name/address names a different place than the District column. | Verify both fields with another official source; exclude the location from downstream use if unresolved. |
| 18 | `Government Polytechnic College, Alwar` | `Bikaner` | `Near Itarana Flyover ,Alwar- 301001` | The college name/address names a different place than the District column. | Verify both fields with another official source; exclude the location from downstream use if unresolved. |
| 19 | `Government Polytechnic College Pali` | `Bikaner` | `Government Polytechnic College Pali, Sumerpur Road, Pali, 306401` | The college name/address names a different place than the District column. | Verify both fields with another official source; exclude the location from downstream use if unresolved. |
| 20 | `Government Polytechnic College Neemrana (Kotputli Behror)-Rajasthan` | `Bikaner` | `VILLAGE KUNDANSINGH PURA TEH. Neemrana Dist. Alwar` | The college name/address names a different place than the District column. | Verify both fields with another official source; exclude the location from downstream use if unresolved. |
| 21 | `Government Polytechnic College Nawa` | `Bikaner` | `NEAR TOLL PLAZA,VILLAGE POST GOVINDI,TEHSIL NAWA,DIST DIDWANA-KUCHAMAN` | The college name/address names a different place than the District column. | Verify both fields with another official source; exclude the location from downstream use if unresolved. |
| 22 | `SGBB Government Polytechnic College Sirohi (Raj.)` | `Bikaner` | `Near Village Mandwa, Sirohi (Raj.)` | The college name/address names a different place than the District column. | Verify both fields with another official source; exclude the location from downstream use if unresolved. |
| 23 | `Govt. Polytechnic College Dholpur` | `Bikaner` | `Near NH -11B , Purani Chhawni , Dholpur , Rajasthan , 328001` | The college name/address names a different place than the District column. | Verify both fields with another official source; exclude the location from downstream use if unresolved. |
| 26 | `Government Polytechnic College, Tonk` | `Bikaner` | `Village Borkhandi Khurd Near Banas Bridge Jaipur Road Tonk 304021` | The college name/address names a different place than the District column. | Verify both fields with another official source; exclude the location from downstream use if unresolved. |

### Name/district spelling variation

| Source row | Exact college name | Exact district | Exact address as published | Why review is needed | Recommended action |
| --- | --- | --- | --- | --- | --- |
| 11 | `Govt Polytechnic College Beawer` | `Beawar` | `Camp office: Govt Polytechnic College Ajmer` | The name spells the place `Beawer`; the district is `Beawar`. The address also identifies a camp office in Ajmer. | Verify the registered college name and district with another official source; preserve the listing until confirmed. |

### Camp-office / temporary-address text

20 address values explicitly contain “camp”. These may describe a temporary/camp office rather than the permanent college location.

| Source row | Exact college name | District | Exact address as published | Why review is needed | Recommended action |
| --- | --- | --- | --- | --- | --- |
| 3 | `Govt.women polytechnic college Alwar` | `Alwar` | `camp office:- Govt.polytechnic college Alwar` | The address explicitly identifies a camp office/camp location; permanence is not established by this listing. | Verify the permanent campus address with another official source; preserve this text as published. |
| 9 | `GOVERNMENT POLYTECHNIC COLLEGE GUDAMALANI - CAMP BARMER` | `Barmer` | `GOVERNMENT POLYTECHNIC COLLEGE GUDAMALANI (CAMP BARMER)` | The address explicitly identifies a camp office/camp location; permanence is not established by this listing. | Verify the permanent campus address with another official source; preserve this text as published. |
| 11 | `Govt Polytechnic College Beawer` | `Beawar` | `Camp office: Govt Polytechnic College Ajmer` | The address explicitly identifies a camp office/camp location; permanence is not established by this listing. | Verify the permanent campus address with another official source; preserve this text as published. |
| 15 | `Govt. Women Polytechnic college Bhilwara` | `Bhilwara` | `CAMP GOVT. POLYTECHNIC COLLEGE, BHILWARA` | The address explicitly identifies a camp office/camp location; permanence is not established by this listing. | Verify the permanent campus address with another official source; preserve this text as published. |
| 27 | `GOVT.POLYTECHNIC COLLEGE, INDERGARH` | `Bundi` | `CAMP OFFICE: GOVT.POLYTECHNIC COLLEGE, BUNDI` | The address explicitly identifies a camp office/camp location; permanence is not established by this listing. | Verify the permanent campus address with another official source; preserve this text as published. |
| 32 | `Govt Polytechnic College Bandikui Camp-Dausa` | `Dausa` | `Camp Office : Rajesh Pilot Govt Polytechnic College Dausa` | The address explicitly identifies a camp office/camp location; permanence is not established by this listing. | Verify the permanent campus address with another official source; preserve this text as published. |
| 33 | `GOVT.POLYTECHNIC COLLEGE, DEEG` | `Deeg` | `CAMP OFFICE: GOVT.POLYTECHNIC COLLEGE, bharatpur` | The address explicitly identifies a camp office/camp location; permanence is not established by this listing. | Verify the permanent campus address with another official source; preserve this text as published. |
| 37 | `government polytechnic college phagi dudu camp khetan jaipur` | `Jaipur` | `camp office RC Khetan Ploytechnic College Jhanlana dungri jaipur` | The address explicitly identifies a camp office/camp location; permanence is not established by this listing. | Verify the permanent campus address with another official source; preserve this text as published. |
| 46 | `GOVT. POLYTECHNIC COLLEGE, BALOTRA` | `Jodhpur` | `CAMP GOVT. POLYTECHNIC COLLEGE, JODHPUR` | The address explicitly identifies a camp office/camp location; permanence is not established by this listing. | Verify the permanent campus address with another official source; preserve this text as published. |
| 52 | `GOVERNMENT POLYTECHNIC COLLEGE BHIWADI` | `Khairthal-Tijara` | `CAMP OFFICE: GOVT.POLYTECHNIC COLLEGE, NEEMRANA` | The address explicitly identifies a camp office/camp location; permanence is not established by this listing. | Verify the permanent campus address with another official source; preserve this text as published. |
| 54 | `GOVT. POLYTECHNIC COLLEGE LADPURA` | `Kota` | `camp office Govt polytechnic college kota` | The address explicitly identifies a camp office/camp location; permanence is not established by this listing. | Verify the permanent campus address with another official source; preserve this text as published. |
| 55 | `Government Polytechnic College, RAMGANJMANDI` | `Kota` | `CAMP OFFICE : GOVT.POLYTECHNIC COLLEGE JHALAWAR` | The address explicitly identifies a camp office/camp location; permanence is not established by this listing. | Verify the permanent campus address with another official source; preserve this text as published. |
| 56 | `GOVERNMENT POLYTECHNIC COLLEGE KANWAAS` | `Kota` | `CAMP GPC BARAN, NH27 VILLAGE BATAWADI, DISTRICT BARAN` | The address explicitly identifies a camp office/camp location; permanence is not established by this listing. | Verify the permanent campus address with another official source; preserve this text as published. |
| 60 | `Govt. Polytechnic College, Merta City Camp-Nagaur` | `Nagaur` | `camp office : Govt.Polytechnic college, Nagaur` | The address explicitly identifies a camp office/camp location; permanence is not established by this listing. | Verify the permanent campus address with another official source; preserve this text as published. |
| 61 | `GOVT. POLYTECHNIC COLLEGE MARWAR JUNCTION` | `Pali` | `CAMP OFFICE :Govt. Polytechnic College Pali` | The address explicitly identifies a camp office/camp location; permanence is not established by this listing. | Verify the permanent campus address with another official source; preserve this text as published. |
| 62 | `GOVT.POLYTECHNIC COLLEGE, PHALODI` | `Phalodi` | `CAMP OFFICE: GOVT.POLYTECHNIC COLLEGE, BIKANER` | The address explicitly identifies a camp office/camp location; permanence is not established by this listing. | Verify the permanent campus address with another official source; preserve this text as published. |
| 65 | `GOVT.POLYTECHNIC COLLEGE, SALUMBAR` | `Salumbar` | `CAMP OFFICE: GOVT.POLYTECHNIC COLLEGE, DUNGARPUR` | The address explicitly identifies a camp office/camp location; permanence is not established by this listing. | Verify the permanent campus address with another official source; preserve this text as published. |
| 68 | `Government Women Polytechnic College, Sikar` | `Sikar` | `Camp GPC Sikar, Jaipur-Bikaner bypass, Chandpura` | The address explicitly identifies a camp office/camp location; permanence is not established by this listing. | Verify the permanent campus address with another official source; preserve this text as published. |
| 69 | `Government Polytechnic College, Niwai` | `Tonk` | `Camp Office: Government Polytechnic College, Tonk` | The address explicitly identifies a camp office/camp location; permanence is not established by this listing. | Verify the permanent campus address with another official source; preserve this text as published. |
| 70 | `GOVERNMENT POLYTECHNIC COLLEGE, VALLABHNAGAR` | `Udaipur` | `CAMP GPC, UDAIPUR` | The address explicitly identifies a camp office/camp location; permanence is not established by this listing. | Verify the permanent campus address with another official source; preserve this text as published. |

### Shared-campus address

| Source row | Exact college name | District | Exact address as published | Why review is needed | Recommended action |
| --- | --- | --- | --- | --- | --- |
| 14 | `Government Polytechnic College Uchchain` | `Bharatpur` | `Campus at Shri Gokul Verma Government Polytechnic College, Bharatpur Near Dalmia Dairy, Bharatpur - 321001 (Rajasthan)` | The address says the college is on another institution’s campus; verify that this is the current official campus address. | Verify with another official source; preserve the shared-campus wording until confirmed. |

## 5. Missing contact information

0 records have no published email. 19 records have an empty phone field. The `NA` phone in source row 32 is non-empty but unusable and is counted in section 2, not as an empty field.

| Source row | Exact college name | Email as published | Phone as published | Why review is needed | Recommended action |
| --- | --- | --- | --- | --- | --- |
| 3 | `Govt.women polytechnic college Alwar` | gwpc[dot]alwar[at]gmail[dot]com | No value published (empty field) | At least one contact value is absent in the source listing. | Verify through another official source if contact is required; otherwise preserve the missing field as unavailable. |
| 9 | `GOVERNMENT POLYTECHNIC COLLEGE GUDAMALANI - CAMP BARMER` | GPC[dot]GUDAMALANI[at]RAJASTHAN[dot]GOV[dot]IN | No value published (empty field) | At least one contact value is absent in the source listing. | Verify through another official source if contact is required; otherwise preserve the missing field as unavailable. |
| 15 | `Govt. Women Polytechnic college Bhilwara` | gwpc[dot]bhilwara[at]rajasthan[dot]gov[dot]in | No value published (empty field) | At least one contact value is absent in the source listing. | Verify through another official source if contact is required; otherwise preserve the missing field as unavailable. |
| 27 | `GOVT.POLYTECHNIC COLLEGE, INDERGARH` | gpc[dot]indergarh[at]rajasthan[dot]gov[dot]in | No value published (empty field) | At least one contact value is absent in the source listing. | Verify through another official source if contact is required; otherwise preserve the missing field as unavailable. |
| 33 | `GOVT.POLYTECHNIC COLLEGE, DEEG` | gpc[dot]deeg[at]rajasthan[dot]gov[dot]in | No value published (empty field) | At least one contact value is absent in the source listing. | Verify through another official source if contact is required; otherwise preserve the missing field as unavailable. |
| 37 | `government polytechnic college phagi dudu camp khetan jaipur` | gpc[dot]phagi[at]rajasthan[dot]gov[dot]in | No value published (empty field) | At least one contact value is absent in the source listing. | Verify through another official source if contact is required; otherwise preserve the missing field as unavailable. |
| 46 | `GOVT. POLYTECHNIC COLLEGE, BALOTRA` | gpc[dot]balotra[at]rajasthan[dot]gov[dot]in | No value published (empty field) | At least one contact value is absent in the source listing. | Verify through another official source if contact is required; otherwise preserve the missing field as unavailable. |
| 52 | `GOVERNMENT POLYTECHNIC COLLEGE BHIWADI` | gpcbhiwadi[dot]tizara[at]gmail[dot]com | No value published (empty field) | At least one contact value is absent in the source listing. | Verify through another official source if contact is required; otherwise preserve the missing field as unavailable. |
| 53 | `GOVT. WOMEN POLYTECHNIC COLLEGE, TAPUKARA` | gwpc[dot]tapukara[at]rajasthan[dot]gov[dot]in | No value published (empty field) | At least one contact value is absent in the source listing. | Verify through another official source if contact is required; otherwise preserve the missing field as unavailable. |
| 54 | `GOVT. POLYTECHNIC COLLEGE LADPURA` | gpc[dot]ladpura[at]rajasthan[dot]gov[dot]in | No value published (empty field) | At least one contact value is absent in the source listing. | Verify through another official source if contact is required; otherwise preserve the missing field as unavailable. |
| 55 | `Government Polytechnic College, RAMGANJMANDI` | GPC[dot]RAMGANJMANDI[at]RAJASTHAN[dot]GOV[dot]IN | No value published (empty field) | At least one contact value is absent in the source listing. | Verify through another official source if contact is required; otherwise preserve the missing field as unavailable. |
| 56 | `GOVERNMENT POLYTECHNIC COLLEGE KANWAAS` | GPC[dot]KANWAAS[at]RAJASTHAN[dot]GOV[dot]IN | No value published (empty field) | At least one contact value is absent in the source listing. | Verify through another official source if contact is required; otherwise preserve the missing field as unavailable. |
| 60 | `Govt. Polytechnic College, Merta City Camp-Nagaur` | gpc[dot]merta[at]rajasthan[dot]gov[dot]in | No value published (empty field) | At least one contact value is absent in the source listing. | Verify through another official source if contact is required; otherwise preserve the missing field as unavailable. |
| 61 | `GOVT. POLYTECHNIC COLLEGE MARWAR JUNCTION` | gpc[dot]marwarjn[at]rajasthan[dot]gov[dot]in | No value published (empty field) | At least one contact value is absent in the source listing. | Verify through another official source if contact is required; otherwise preserve the missing field as unavailable. |
| 62 | `GOVT.POLYTECHNIC COLLEGE, PHALODI` | GPC[dot]PHALODI[at]RAJASTHAN[dot]GOV[dot]IN | No value published (empty field) | At least one contact value is absent in the source listing. | Verify through another official source if contact is required; otherwise preserve the missing field as unavailable. |
| 65 | `GOVT.POLYTECHNIC COLLEGE, SALUMBAR` | gpc[dot]salumbar[at]rajasthan[dot]gov[dot]in | No value published (empty field) | At least one contact value is absent in the source listing. | Verify through another official source if contact is required; otherwise preserve the missing field as unavailable. |
| 68 | `Government Women Polytechnic College, Sikar` | gwpc[dot]sikar[at]gmail[dot]com | No value published (empty field) | At least one contact value is absent in the source listing. | Verify through another official source if contact is required; otherwise preserve the missing field as unavailable. |
| 69 | `Government Polytechnic College, Niwai` | gpc[dot]niwai[at]rajasthan[dot]gov[dot]in | No value published (empty field) | At least one contact value is absent in the source listing. | Verify through another official source if contact is required; otherwise preserve the missing field as unavailable. |
| 70 | `GOVERNMENT POLYTECHNIC COLLEGE, VALLABHNAGAR` | gpc Vallabhnagar [at]rajasthan[dot]gov[dot]in | No value published (empty field) | At least one contact value is absent in the source listing. | Verify through another official source if contact is required; otherwise preserve the missing field as unavailable. |

## 6. Other suspicious values

These format issues are not normalized by this review.

| Source row | Field | Exact published value | Why review is needed | Recommended action |
| --- | --- | --- | --- | --- |
| 23 | College URL / slug | `www.gpcdholpur.com` | The value looks like a complete domain rather than the slug-like values used by other rows; it determines the stable import key after normalization. | Verify the source identifier with another official source; preserve the raw value and do not rewrite the key manually. |
| 70 | Contact email | `gpc Vallabhnagar [at]rajasthan[dot]gov[dot]in` | The published email string contains an embedded space and may not be a valid address as written. | Verify with another official source; preserve the exact published string and do not silently remove spaces. |
| 31 | Address/contact text | `JIROTA KHURD ROAD,DAUSA, Pin Code-303303,Office Contact No-9414240680` | The address text includes `Office Contact No-9414240680`, while the separate phone field is `9414240680`. | Verify whether this contact number belongs in the address field; preserve both source fields until confirmed. |

## Findings by category

| Category | Count |
|---|---:|
| Establishment year `0` | 5 |
| Suspicious phone values (`293`, `NA`) | 2 |
| Women Polytechnic name with type `CoEd` | 12 |
| Bikaner district/name/address conflict candidates | 8 |
| Name/district spelling variation (`Beawer` / `Beawar`) | 1 |
| Explicit camp-address entries | 20 |
| Shared-campus address entries | 1 |
| Missing phone values | 19 |
| Missing email values | 0 |
| Other field-format anomalies (URL-like slug, spaced email, phone repeated in address) | 3 |

Counts overlap: a candidate may appear in multiple categories. These are review findings, not corrected records or approval decisions.

## Manual decisions still required

1. Confirm or reject the five establishment-year `0` values; until then do not use `0` as an establishment year.
2. Confirm phone values `293` and `NA`, and decide whether the 19 empty phone fields should remain unavailable or be sourced from another official page.
3. Verify the 12 Women Polytechnic `CoEd` labels without changing the source value absent confirmation.
4. Reconcile the eight Bikaner district/name/address candidates and the Beawer/Beawar variation against official college records.
5. Confirm whether each camp/shared-campus address is a permanent address or only a temporary office location.
6. Verify the URL-like Dholpur source slug, the spaced Vallabhnagar email, and Dausa’s repeated contact number in its address text.
7. Keep the dataset pending review; do not add course branches, durations, eligibility, or current admission dates without official evidence.
