// DMRC station & network data — rebuilt from Delhi_Metro_Complete_303.csv
// Source: Delhi Open Transit Data (otd.delhi.gov.in) + NMRC
// License: Open Government Data (OGD) India. Attribution required in-app.
import type { Line, LineKey, Station, Stop, Edge } from '@/types/metro';

// ─── Line definitions ──────────────────────────────────────────────────────
export const LINES: Line[] = [
  { id: 'red',     name_en: 'Red Line',        name_hi: 'लाल लाइन'           },
  { id: 'amber',   name_en: 'Yellow Line',      name_hi: 'पीली लाइन'          },
  { id: 'blue',    name_en: 'Blue Line',        name_hi: 'नीली लाइन'          },
  { id: 'green',   name_en: 'Green Line',       name_hi: 'हरी लाइन'           },
  { id: 'violet',  name_en: 'Violet Line',      name_hi: 'बैंगनी लाइन'        },
  { id: 'pink',    name_en: 'Pink Line',        name_hi: 'गुलाबी लाइन'        },
  { id: 'magenta', name_en: 'Magenta Line',     name_hi: 'मैजेंटा लाइन'       },
  { id: 'aqua',    name_en: 'Aqua Line',        name_hi: 'एक्वा लाइन'         },
  { id: 'orange',  name_en: 'Airport Express',  name_hi: 'एयरपोर्ट एक्सप्रेस' },
  { id: 'grey',    name_en: 'Grey Line',        name_hi: 'ग्रे लाइन'          },
];

type RawStation = Omit<Station, 'lines'>;

const RAW: RawStation[] = [
  // ── Red Line (29 stations: Shaheed Sthal ↔ Rithala) ───────────────────────
  { id: 'SHT',  code: 'SHT',  name_en: 'Shaheed Sthal (New Bus Adda)',       name_hi: 'शहीद स्थल (नया बस अड्डा)',     lat: 28.6761, lon: 77.4156 },
  { id: 'HNR',  code: 'HNR',  name_en: 'Hindon River',                       name_hi: 'हिंडन नदी',                    lat: 28.6754, lon: 77.4008 },
  { id: 'ARL',  code: 'ARL',  name_en: 'Arthala',                            name_hi: 'अर्थला',                        lat: 28.6770, lon: 77.3919 },
  { id: 'MHN',  code: 'MHN',  name_en: 'Mohan Nagar',                        name_hi: 'मोहन नगर',                     lat: 28.6804, lon: 77.3768 },
  { id: 'SYP',  code: 'SYP',  name_en: 'Shyam Park',                         name_hi: 'श्याम पार्क',                  lat: 28.6845, lon: 77.3627 },
  { id: 'MMS',  code: 'MMS',  name_en: 'Major Mohit Sharma Rajendra Nagar',  name_hi: 'मेजर मोहित शर्मा राजेंद्र नगर', lat: 28.6812, lon: 77.3501 },
  { id: 'RJB',  code: 'RJB',  name_en: 'Raj Bagh',                           name_hi: 'राज बाग',                      lat: 28.6776, lon: 77.3379 },
  { id: 'SNG',  code: 'SNG',  name_en: 'Shaheed Nagar',                      name_hi: 'शहीद नगर',                     lat: 28.6736, lon: 77.3267 },
  { id: 'DSG',  code: 'DSG',  name_en: 'Dilshad Garden',                     name_hi: 'दिलशाद गार्डन',                lat: 28.6759, lon: 77.3214 },
  { id: 'JHM',  code: 'JHM',  name_en: 'Jhilmil',                            name_hi: 'झिलमिल',                       lat: 28.6758, lon: 77.3124 },
  { id: 'MSP',  code: 'MSP',  name_en: 'Mansarovar Park',                    name_hi: 'मानसरोवर पार्क',               lat: 28.6754, lon: 77.3010 },
  { id: 'SHD',  code: 'SHD',  name_en: 'Shahdara',                           name_hi: 'शाहदरा',                       lat: 28.6735, lon: 77.2896 },
  { id: 'WLC',  code: 'WLC',  name_en: 'Welcome',                            name_hi: 'वेलकम',                        lat: 28.6721, lon: 77.2779 },
  { id: 'SLM',  code: 'SLM',  name_en: 'Seelampur',                          name_hi: 'सीलमपुर',                      lat: 28.6699, lon: 77.2667 },
  { id: 'SHP',  code: 'SHP',  name_en: 'Shastri Park',                       name_hi: 'शास्त्री पार्क',               lat: 28.6680, lon: 77.2499 },
  { id: 'KSG',  code: 'KSG',  name_en: 'Kashmere Gate',                      name_hi: 'कश्मीरी गेट',                  lat: 28.6675, lon: 77.2282 },
  { id: 'THS',  code: 'THS',  name_en: 'Tis Hazari',                         name_hi: 'तीस हजारी',                    lat: 28.6671, lon: 77.2165 },
  { id: 'PLB',  code: 'PLB',  name_en: 'Pulbangash',                         name_hi: 'पुलबंगश',                      lat: 28.6664, lon: 77.2073 },
  { id: 'PRT',  code: 'PRT',  name_en: 'Pratap Nagar',                       name_hi: 'प्रताप नगर',                   lat: 28.6666, lon: 77.1988 },
  { id: 'SHN',  code: 'SHN',  name_en: 'Shastri Nagar',                      name_hi: 'शास्त्री नगर',                 lat: 28.6700, lon: 77.1817 },
  { id: 'IND',  code: 'IND',  name_en: 'Inderlok',                           name_hi: 'इंदरलोक',                      lat: 28.6734, lon: 77.1699 },
  { id: 'KNY',  code: 'KNY',  name_en: 'Kanhaiya Nagar',                     name_hi: 'कन्हैया नगर',                  lat: 28.6825, lon: 77.1646 },
  { id: 'KPR',  code: 'KPR',  name_en: 'Keshav Puram',                       name_hi: 'केशव पुरम',                    lat: 28.6889, lon: 77.1616 },
  { id: 'PPR',  code: 'PPR',  name_en: 'Madhuban Chowk',                     name_hi: 'मधुबन चौक',                    lat: 28.7032, lon: 77.1322 },
  { id: 'NSP',  code: 'NSP',  name_en: 'Netaji Subhash Place',               name_hi: 'नेताजी सुभाष प्लेस',           lat: 28.6959, lon: 77.1526 },
  { id: 'KTE',  code: 'KTE',  name_en: 'Kohat Enclave',                      name_hi: 'कोहाट एन्क्लेव',               lat: 28.6981, lon: 77.1402 },
  { id: 'RHE',  code: 'RHE',  name_en: 'Rohini East',                        name_hi: 'रोहिणी ईस्ट',                  lat: 28.7076, lon: 77.1259 },
  { id: 'RHW',  code: 'RHW',  name_en: 'Rohini West',                        name_hi: 'रोहिणी वेस्ट',                 lat: 28.7148, lon: 77.1147 },
  { id: 'RTH',  code: 'RTH',  name_en: 'Rithala',                            name_hi: 'रिठाला',                       lat: 28.7207, lon: 77.1071 },

  // ── Yellow Line (37 stations: Samaypur Badli ↔ Millennium City Centre) ────
  { id: 'SBD',  code: 'SBD',  name_en: 'Samaypur Badli',                     name_hi: 'समयपुर बादली',                 lat: 28.7446, lon: 77.1383 },
  { id: 'RSN',  code: 'RSN',  name_en: 'Rohini Sector 18-19',                name_hi: 'रोहिणी सेक्टर 18-19',          lat: 28.7383, lon: 77.1398 },
  { id: 'HBM',  code: 'HBM',  name_en: 'Haiderpur Badli Mor',                name_hi: 'हैदरपुर बादली मोड़',            lat: 28.7301, lon: 77.1494 },
  { id: 'JHP',  code: 'JHP',  name_en: 'Jahangirpuri',                       name_hi: 'जहाँगीरपुरी',                  lat: 28.7259, lon: 77.1627 },
  { id: 'ANP',  code: 'ANP',  name_en: 'Adarsh Nagar',                       name_hi: 'आदर्श नगर',                    lat: 28.7164, lon: 77.1705 },
  { id: 'AZP',  code: 'AZP',  name_en: 'Azadpur',                            name_hi: 'आजादपुर',                      lat: 28.7073, lon: 77.1800 },
  { id: 'MDT',  code: 'MDT',  name_en: 'Model Town',                         name_hi: 'मॉडल टाउन',                    lat: 28.7028, lon: 77.1936 },
  { id: 'GTB',  code: 'GTB',  name_en: 'Guru Teg Bahadur Nagar',             name_hi: 'गुरु तेग बहादुर नगर',          lat: 28.6979, lon: 77.2072 },
  { id: 'VVD',  code: 'VVD',  name_en: 'Vishwavidyalaya',                    name_hi: 'विश्वविद्यालय',                 lat: 28.6948, lon: 77.2148 },
  { id: 'VHS',  code: 'VHS',  name_en: 'Vidhan Sabha',                       name_hi: 'विधान सभा',                    lat: 28.6880, lon: 77.2214 },
  { id: 'CVL',  code: 'CVL',  name_en: 'Civil Lines',                        name_hi: 'सिविल लाइन्स',                 lat: 28.6769, lon: 77.2250 },
  // KSG shared with Red, Violet
  { id: 'CCW',  code: 'CCW',  name_en: 'Chandni Chowk',                      name_hi: 'चाँदनी चौक',                   lat: 28.6579, lon: 77.2301 },
  { id: 'CWB',  code: 'CWB',  name_en: 'Chawri Bazar',                       name_hi: 'चावड़ी बाज़ार',                 lat: 28.6493, lon: 77.2264 },
  { id: 'NDL',  code: 'NDL',  name_en: 'New Delhi',                          name_hi: 'नई दिल्ली',                    lat: 28.6431, lon: 77.2214 },
  { id: 'RJC',  code: 'RJC',  name_en: 'Rajiv Chowk',                        name_hi: 'राजीव चौक',                    lat: 28.6328, lon: 77.2183 },
  { id: 'PCK',  code: 'PCK',  name_en: 'Patel Chowk',                        name_hi: 'पटेल चौक',                     lat: 28.6230, lon: 77.2139 },
  { id: 'CSS',  code: 'CSS',  name_en: 'Central Secretariat',                name_hi: 'केंद्रीय सचिवालय',             lat: 28.6147, lon: 77.2119 },
  { id: 'UDB',  code: 'UDB',  name_en: 'Seva Teerth (Udyog Bhawan)',         name_hi: 'सेवा तीर्थ (उद्योग भवन)',      lat: 28.6117, lon: 77.2120 },
  { id: 'LKM',  code: 'LKM',  name_en: 'Lok Kalyan Marg',                    name_hi: 'लोक कल्याण मार्ग',             lat: 28.5973, lon: 77.2109 },
  { id: 'JRB',  code: 'JRB',  name_en: 'Jor Bagh',                           name_hi: 'जोर बाग',                      lat: 28.5871, lon: 77.2121 },
  { id: 'INA',  code: 'INA',  name_en: 'Dilli Haat - INA',                   name_hi: 'दिल्ली हाट - आईएनए',           lat: 28.5753, lon: 77.2094 },
  { id: 'AIM',  code: 'AIM',  name_en: 'AIIMS',                              name_hi: 'एम्स',                         lat: 28.5689, lon: 77.2077 },
  { id: 'GRP',  code: 'GRP',  name_en: 'Green Park',                         name_hi: 'ग्रीन पार्क',                  lat: 28.5598, lon: 77.2068 },
  { id: 'HKS',  code: 'HKS',  name_en: 'Hauz Khas',                          name_hi: 'हौज खास',                      lat: 28.5434, lon: 77.2067 },
  { id: 'MLN',  code: 'MLN',  name_en: 'Malviya Nagar',                      name_hi: 'मालवीय नगर',                   lat: 28.5280, lon: 77.2057 },
  { id: 'SKT',  code: 'SKT',  name_en: 'Saket',                              name_hi: 'साकेत',                        lat: 28.5206, lon: 77.2014 },
  { id: 'QMN',  code: 'QMN',  name_en: 'Qutab Minar',                        name_hi: 'क़ुतुब मीनार',                  lat: 28.5130, lon: 77.1865 },
  { id: 'CHT',  code: 'CHT',  name_en: 'Chhatarpur',                         name_hi: 'छतरपुर',                       lat: 28.5067, lon: 77.1748 },
  { id: 'SLT',  code: 'SLT',  name_en: 'Sultanpur',                          name_hi: 'सुल्तानपुर',                   lat: 28.4993, lon: 77.1615 },
  { id: 'GHT',  code: 'GHT',  name_en: 'Ghitorni',                           name_hi: 'घीटोरनी',                      lat: 28.4938, lon: 77.1492 },
  { id: 'AGH',  code: 'AGH',  name_en: 'Arjan Garh',                         name_hi: 'अर्जन गढ़',                    lat: 28.4808, lon: 77.1258 },
  { id: 'GDN',  code: 'GDN',  name_en: 'Guru Dronacharya',                   name_hi: 'गुरु द्रोणाचार्य',             lat: 28.4820, lon: 77.1023 },
  { id: 'SKP',  code: 'SKP',  name_en: 'Sikanderpur',                        name_hi: 'सिकंदरपुर',                    lat: 28.4818, lon: 77.0924 },
  { id: 'MGR',  code: 'MGR',  name_en: 'MG Road',                            name_hi: 'एमजी रोड',                     lat: 28.4796, lon: 77.0801 },
  { id: 'IFC',  code: 'IFC',  name_en: 'IFFCO Chowk',                        name_hi: 'इफ्को चौक',                    lat: 28.4721, lon: 77.0718 },
  { id: 'HCC',  code: 'HCC',  name_en: 'Millennium City Centre Gurugram',    name_hi: 'मिलेनियम सिटी सेंटर गुरुग्राम', lat: 28.4593, lon: 77.0727 },

  // ── Blue Line (50 stations: Dwarka Sec 21 ↔ Noida Electronic City) ────────
  { id: 'D21',  code: 'D21',  name_en: 'Dwarka Sector 21',                   name_hi: 'द्वारका सेक्टर 21',            lat: 28.5523, lon: 77.0583 },
  { id: 'DS8',  code: 'DS8',  name_en: 'Dwarka Sector 8',                    name_hi: 'द्वारका सेक्टर 8',             lat: 28.5658, lon: 77.0671 },
  { id: 'DS9',  code: 'DS9',  name_en: 'Dwarka Sector 9',                    name_hi: 'द्वारका सेक्टर 9',             lat: 28.5749, lon: 77.0645 },
  { id: 'DS10', code: 'D10',  name_en: 'Dwarka Sector 10',                   name_hi: 'द्वारका सेक्टर 10',            lat: 28.5807, lon: 77.0568 },
  { id: 'DS11', code: 'D11',  name_en: 'Dwarka Sector 11',                   name_hi: 'द्वारका सेक्टर 11',            lat: 28.5866, lon: 77.0493 },
  { id: 'DS12', code: 'D12',  name_en: 'Dwarka Sector 12',                   name_hi: 'द्वारका सेक्टर 12',            lat: 28.5923, lon: 77.0405 },
  { id: 'DS13', code: 'D13',  name_en: 'Dwarka Sector 13',                   name_hi: 'द्वारका सेक्टर 13',            lat: 28.5972, lon: 77.0333 },
  { id: 'DS14', code: 'D14',  name_en: 'Dwarka Sector 14',                   name_hi: 'द्वारका सेक्टर 14',            lat: 28.6022, lon: 77.0259 },
  { id: 'DWK',  code: 'DWK',  name_en: 'Dwarka',                             name_hi: 'द्वारका',                      lat: 28.6156, lon: 77.0220 },
  { id: 'DMR',  code: 'DMR',  name_en: 'Dwarka Mor',                         name_hi: 'द्वारका मोड़',                  lat: 28.6193, lon: 77.0333 },
  { id: 'NWD',  code: 'NWD',  name_en: 'Nawada',                             name_hi: 'नवादा',                        lat: 28.6203, lon: 77.0451 },
  { id: 'UNW',  code: 'UNW',  name_en: 'Uttam Nagar West',                   name_hi: 'उत्तम नगर वेस्ट',              lat: 28.6218, lon: 77.0558 },
  { id: 'UNE',  code: 'UNE',  name_en: 'Uttam Nagar East',                   name_hi: 'उत्तम नगर ईस्ट',               lat: 28.6248, lon: 77.0654 },
  { id: 'JPW',  code: 'JPW',  name_en: 'Janakpuri West',                     name_hi: 'जनकपुरी वेस्ट',                lat: 28.6294, lon: 77.0777 },
  { id: 'JPE',  code: 'JPE',  name_en: 'Janakpuri East',                     name_hi: 'जनकपुरी ईस्ट',                 lat: 28.6331, lon: 77.0867 },
  { id: 'TLK',  code: 'TLK',  name_en: 'Tilak Nagar',                        name_hi: 'तिलक नगर',                     lat: 28.6366, lon: 77.0965 },
  { id: 'SBN',  code: 'SBN',  name_en: 'Subhash Nagar',                      name_hi: 'सुभाष नगर',                    lat: 28.6404, lon: 77.1050 },
  { id: 'TGD',  code: 'TGD',  name_en: 'Tagore Garden',                      name_hi: 'टैगोर गार्डन',                 lat: 28.6438, lon: 77.1128 },
  { id: 'RJG',  code: 'RJG',  name_en: 'Rajouri Garden',                     name_hi: 'राजौरी गार्डन',                lat: 28.6490, lon: 77.1227 },
  { id: 'RMN',  code: 'RMN',  name_en: 'Ramesh Nagar',                       name_hi: 'रमेश नगर',                     lat: 28.6527, lon: 77.1316 },
  { id: 'MTN',  code: 'MTN',  name_en: 'Moti Nagar',                         name_hi: 'मोती नगर',                     lat: 28.6578, lon: 77.1425 },
  { id: 'KTN',  code: 'KTN',  name_en: 'Kirti Nagar',                        name_hi: 'कीर्ति नगर',                   lat: 28.6558, lon: 77.1506 },
  { id: 'SDP',  code: 'SDP',  name_en: 'Shadipur',                           name_hi: 'शादीपुर',                      lat: 28.6516, lon: 77.1582 },
  { id: 'PTG',  code: 'PTG',  name_en: 'Patel Nagar',                        name_hi: 'पटेल नगर',                     lat: 28.6450, lon: 77.1693 },
  { id: 'RDP',  code: 'RDP',  name_en: 'Rajendra Place',                     name_hi: 'राजेंद्र प्लेस',               lat: 28.6425, lon: 77.1782 },
  { id: 'KRB',  code: 'KRB',  name_en: 'Karol Bagh',                         name_hi: 'करोल बाग',                     lat: 28.6440, lon: 77.1886 },
  { id: 'JND',  code: 'JND',  name_en: 'Jhandewalan',                        name_hi: 'झंडेवालान',                    lat: 28.6444, lon: 77.1999 },
  { id: 'RAK',  code: 'RAK',  name_en: 'Ramakrishna Ashram Marg',            name_hi: 'रामकृष्ण आश्रम मार्ग',         lat: 28.6392, lon: 77.2084 },
  // RJC shared with Yellow
  { id: 'BRK',  code: 'BRK',  name_en: 'Barakhamba Road',                    name_hi: 'बाड़ाखंभा रोड',                lat: 28.6300, lon: 77.2244 },
  { id: 'MDH',  code: 'MDH',  name_en: 'Mandi House',                        name_hi: 'मंडी हाउस',                    lat: 28.6259, lon: 77.2341 },
  { id: 'PGM',  code: 'PGM',  name_en: 'Supreme Court (Pragati Maidan)',     name_hi: 'सुप्रीम कोर्ट (प्रगति मैदान)', lat: 28.6234, lon: 77.2425 },
  { id: 'IDP',  code: 'IDP',  name_en: 'Indraprastha',                       name_hi: 'इंद्रप्रस्थ',                  lat: 28.6205, lon: 77.2500 },
  { id: 'YMB',  code: 'YMB',  name_en: 'Yamuna Bank',                        name_hi: 'यमुना बैंक',                   lat: 28.6233, lon: 77.2679 },
  { id: 'AKD',  code: 'AKD',  name_en: 'Akshardham',                         name_hi: 'अक्षरधाम',                     lat: 28.6181, lon: 77.2787 },
  { id: 'MPH',  code: 'MPH',  name_en: 'Mayur Vihar-I',                      name_hi: 'मयूर विहार-I',                 lat: 28.6044, lon: 77.2946 },
  { id: 'MPE',  code: 'MPE',  name_en: 'Mayur Vihar Extension',              name_hi: 'मयूर विहार एक्सटेंशन',         lat: 28.5942, lon: 77.2946 },
  { id: 'NAN',  code: 'NAN',  name_en: 'New Ashok Nagar',                    name_hi: 'नया अशोक नगर',                 lat: 28.5892, lon: 77.3020 },
  { id: 'N15',  code: 'N15',  name_en: 'Noida Sector 15',                    name_hi: 'नोएडा सेक्टर 15',              lat: 28.5851, lon: 77.3114 },
  { id: 'N16',  code: 'N16',  name_en: 'Noida Sector 16',                    name_hi: 'नोएडा सेक्टर 16',              lat: 28.5782, lon: 77.3176 },
  { id: 'N18',  code: 'N18',  name_en: 'Noida Sector 18',                    name_hi: 'नोएडा सेक्टर 18',              lat: 28.5708, lon: 77.3261 },
  { id: 'BOT',  code: 'BOT',  name_en: 'Botanical Garden',                   name_hi: 'बोटैनिकल गार्डन',              lat: 28.5641, lon: 77.3342 },
  { id: 'GCN',  code: 'GCN',  name_en: 'Golf Course',                        name_hi: 'गोल्फ कोर्स',                  lat: 28.5671, lon: 77.3460 },
  { id: 'NCC',  code: 'NCC',  name_en: 'Noida City Centre',                  name_hi: 'नोएडा सिटी सेंटर',             lat: 28.5747, lon: 77.3561 },
  { id: 'N34',  code: 'N34',  name_en: 'Noida Sector 34',                    name_hi: 'नोएडा सेक्टर 34',              lat: 28.5757, lon: 77.3669 },
  { id: 'N52',  code: 'N52',  name_en: 'Noida Sector 52',                    name_hi: 'नोएडा सेक्टर 52',              lat: 28.5956, lon: 77.3699 },
  { id: 'N61',  code: 'N61',  name_en: 'Noida Sector 61',                    name_hi: 'नोएडा सेक्टर 61',              lat: 28.6072, lon: 77.3739 },
  { id: 'N59',  code: 'N59',  name_en: 'Noida Sector 59',                    name_hi: 'नोएडा सेक्टर 59',              lat: 28.6145, lon: 77.3706 },
  { id: 'N62',  code: 'N62',  name_en: 'Noida Sector 62',                    name_hi: 'नोएडा सेक्टर 62',              lat: 28.6270, lon: 77.3682 },
  { id: 'NEC',  code: 'NEC',  name_en: 'Noida Electronic City',              name_hi: 'नोएडा इलेक्ट्रॉनिक सिटी',     lat: 28.6395, lon: 77.3710 },
  // Blue Line Branch
  { id: 'LXN',  code: 'LXN',  name_en: 'Laxmi Nagar',                        name_hi: 'लक्ष्मी नगर',                  lat: 28.6306, lon: 77.2775 },
  { id: 'NVH',  code: 'NVH',  name_en: 'Nirman Vihar',                       name_hi: 'निर्माण विहार',                lat: 28.6366, lon: 77.2868 },
  { id: 'PVH',  code: 'PVH',  name_en: 'Preet Vihar',                        name_hi: 'प्रीत विहार',                  lat: 28.6417, lon: 77.2954 },
  { id: 'KKD',  code: 'KKD',  name_en: 'Karkarduma',                         name_hi: 'कड़कड़डूमा',                    lat: 28.6485, lon: 77.3056 },
  { id: 'AVH',  code: 'AVH',  name_en: 'Anand Vihar ISBT',                   name_hi: 'आनंद विहार आईएसबीटी',          lat: 28.6470, lon: 77.3160 },
  { id: 'KSM',  code: 'KSM',  name_en: 'Kaushambi',                          name_hi: 'कौशाम्बी',                     lat: 28.6454, lon: 77.3243 },
  { id: 'VAI',  code: 'VAI',  name_en: 'Vaishali',                           name_hi: 'वैशाली',                       lat: 28.6500, lon: 77.3397 },

  // ── Green Line (22 stations: Inderlok ↔ Brigadier Hoshiyar Singh) ─────────
  { id: 'APM',  code: 'APM',  name_en: 'Ashok Park Main',                    name_hi: 'अशोक पार्क मेन',               lat: 28.6715, lon: 77.1553 },
  { id: 'SRS',  code: 'SRS',  name_en: 'Satguru Ram Singh Marg',             name_hi: 'सतगुरु राम सिंह मार्ग',        lat: 28.6610, lon: 77.1575 },
  // KTN shared with Blue
  { id: 'PBE',  code: 'PBE',  name_en: 'Punjabi Bagh',                       name_hi: 'पंजाबी बाग',                   lat: 28.6729, lon: 77.1461 },
  { id: 'PBW',  code: 'PBW',  name_en: 'Punjabi Bagh West',                  name_hi: 'पंजाबी बाग वेस्ट',             lat: 28.6760, lon: 77.1350 },
  { id: 'SJP',  code: 'SJP',  name_en: 'Shivaji Park',                       name_hi: 'शिवाजी पार्क',                 lat: 28.6749, lon: 77.1306 },
  { id: 'MDP',  code: 'MDP',  name_en: 'Madipur',                            name_hi: 'मदीपुर',                       lat: 28.6773, lon: 77.1197 },
  { id: 'PVE',  code: 'PVE',  name_en: 'Paschim Vihar East',                 name_hi: 'पश्चिम विहार ईस्ट',            lat: 28.6773, lon: 77.1123 },
  { id: 'PVW',  code: 'PVW',  name_en: 'Paschim Vihar West',                 name_hi: 'पश्चिम विहार वेस्ट',           lat: 28.6786, lon: 77.1023 },
  { id: 'PGA',  code: 'PGA',  name_en: 'Peeragarhi',                         name_hi: 'पीरागढ़ी',                     lat: 28.6796, lon: 77.0926 },
  { id: 'UNR',  code: 'UNR',  name_en: 'Udyog Nagar',                        name_hi: 'उद्योग नगर',                   lat: 28.6809, lon: 77.0808 },
  { id: 'MSS',  code: 'MSS',  name_en: 'Maharaja Surajmal Stadium',          name_hi: 'महाराजा सूरजमल स्टेडियम',      lat: 28.6818, lon: 77.0739 },
  { id: 'NGL',  code: 'NGL',  name_en: 'Nangloi',                            name_hi: 'नांगलोई',                      lat: 28.6823, lon: 77.0647 },
  { id: 'NRS',  code: 'NRS',  name_en: 'Nangloi Railway Station',            name_hi: 'नांगलोई रेलवे स्टेशन',         lat: 28.6821, lon: 77.0560 },
  { id: 'RPK',  code: 'RPK',  name_en: 'Rajdhani Park',                      name_hi: 'राजधानी पार्क',                lat: 28.6822, lon: 77.0438 },
  { id: 'MDK',  code: 'MDK',  name_en: 'Mundka',                             name_hi: 'मुंडका',                       lat: 28.6832, lon: 77.0313 },
  { id: 'MIA',  code: 'MIA',  name_en: 'Mundka Industrial Area',             name_hi: 'मुंडका औद्योगिक क्षेत्र',      lat: 28.6834, lon: 77.0171 },
  { id: 'GHV',  code: 'GHV',  name_en: 'Ghevra',                             name_hi: 'घेवड़ा',                       lat: 28.6852, lon: 76.9962 },
  { id: 'TKK',  code: 'TKK',  name_en: 'Tikri Kalan',                        name_hi: 'टिकरी कलां',                   lat: 28.6869, lon: 76.9772 },
  { id: 'TKB',  code: 'TKB',  name_en: 'Tikri Border',                       name_hi: 'टिकरी बॉर्डर',                 lat: 28.6880, lon: 76.9641 },
  { id: 'PSR',  code: 'PSR',  name_en: 'Pandit Shree Ram Sharma',            name_hi: 'पंडित श्री राम शर्मा',         lat: 28.6893, lon: 76.9512 },
  { id: 'BHG',  code: 'BHG',  name_en: 'Bahadurgarh City',                   name_hi: 'बहादुरगढ़ सिटी',               lat: 28.6908, lon: 76.9355 },
  { id: 'BHS',  code: 'BHS',  name_en: 'Brigadier Hoshiyar Singh',           name_hi: 'ब्रिगेडियर होशियार सिंह',      lat: 28.6975, lon: 76.9192 },

  // ── Violet Line (34 stations: Kashmere Gate ↔ Raja Nahar Singh) ────────────
  // KSG shared with Red, Yellow
  { id: 'LAL',  code: 'LAL',  name_en: 'Lal Qila',                           name_hi: 'लाल क़िला',                    lat: 28.6561, lon: 77.2408 },
  { id: 'JMS',  code: 'JMS',  name_en: 'Jama Masjid',                        name_hi: 'जामा मस्जिद',                  lat: 28.6500, lon: 77.2377 },
  { id: 'DLG',  code: 'DLG',  name_en: 'Delhi Gate',                         name_hi: 'दिल्ली गेट',                   lat: 28.6401, lon: 77.2404 },
  { id: 'ITO',  code: 'ITO',  name_en: 'ITO',                                name_hi: 'आईटीओ',                        lat: 28.6305, lon: 77.2414 },
  // MDH shared with Blue
  { id: 'JNP',  code: 'JNP',  name_en: 'Janpath',                            name_hi: 'जनपथ',                         lat: 28.6257, lon: 77.2207 },
  // CSS shared with Yellow
  { id: 'KMK',  code: 'KMK',  name_en: 'Khan Market',                        name_hi: 'खान मार्केट',                  lat: 28.6028, lon: 77.2283 },
  { id: 'JLN',  code: 'JLN',  name_en: 'Jawaharlal Nehru Stadium',           name_hi: 'जवाहरलाल नेहरू स्टेडियम',      lat: 28.5904, lon: 77.2333 },
  { id: 'JPG',  code: 'JPG',  name_en: 'Jangpura',                           name_hi: 'जंगपुरा',                      lat: 28.5843, lon: 77.2377 },
  { id: 'LJN',  code: 'LJN',  name_en: 'Lajpat Nagar',                       name_hi: 'लाजपत नगर',                    lat: 28.5708, lon: 77.2365 },
  { id: 'MLC',  code: 'MLC',  name_en: 'Moolchand',                          name_hi: 'मूलचंद',                       lat: 28.5642, lon: 77.2342 },
  { id: 'KLC',  code: 'KLC',  name_en: 'Kailash Colony',                     name_hi: 'कैलाश कॉलोनी',                 lat: 28.5553, lon: 77.2421 },
  { id: 'NHP',  code: 'NHP',  name_en: 'Nehru Place',                        name_hi: 'नेहरू प्लेस',                  lat: 28.5515, lon: 77.2515 },
  { id: 'KKM',  code: 'KKM',  name_en: 'Kalkaji Mandir',                     name_hi: 'कालकाजी मंदिर',                lat: 28.5501, lon: 77.2584 },
  { id: 'GPR',  code: 'GPR',  name_en: 'Govindpuri',                         name_hi: 'गोविंदपुरी',                   lat: 28.5445, lon: 77.2640 },
  { id: 'HNO',  code: 'HNO',  name_en: 'Harkesh Nagar Okhla',               name_hi: 'हर केश नगर ओखला',              lat: 28.5429, lon: 77.2750 },
  { id: 'JAP',  code: 'JAP',  name_en: 'Jasola Apollo',                      name_hi: 'जसोला अपोलो',                  lat: 28.5382, lon: 77.2832 },
  { id: 'SNV',  code: 'SNV',  name_en: 'Sarita Vihar',                       name_hi: 'सरिता विहार',                  lat: 28.5288, lon: 77.2883 },
  { id: 'MOH',  code: 'MOH',  name_en: 'Mohan Estate',                       name_hi: 'मोहन एस्टेट',                  lat: 28.5194, lon: 77.2939 },
  { id: 'TGV',  code: 'TGV',  name_en: 'Tughlakabad Station',                name_hi: 'तुगलकाबाद स्टेशन',             lat: 28.5025, lon: 77.2993 },
  { id: 'BDB',  code: 'BDB',  name_en: 'Badarpur Border',                    name_hi: 'बदरपुर बॉर्डर',                lat: 28.4933, lon: 77.3031 },
  { id: 'SRN',  code: 'SRN',  name_en: 'Sarai',                              name_hi: 'सराय',                         lat: 28.4798, lon: 77.3097 },
  { id: 'NPC',  code: 'NPC',  name_en: 'NHPC Chowk',                         name_hi: 'एनएचपीसी चौक',                 lat: 28.4612, lon: 77.3147 },
  { id: 'MMP',  code: 'MMP',  name_en: 'Mewla Maharajpur',                   name_hi: 'मेवला महाराजपुर',              lat: 28.4419, lon: 77.3158 },
  { id: 'S28',  code: 'S28',  name_en: 'Sector 28 Faridabad',                name_hi: 'सेक्टर 28 फरीदाबाद',           lat: 28.4285, lon: 77.3167 },
  { id: 'BKM',  code: 'BKM',  name_en: 'Badkhal Mor',                        name_hi: 'बड़खल मोड़',                   lat: 28.4228, lon: 77.3103 },
  { id: 'OFD',  code: 'OFD',  name_en: 'Old Faridabad',                      name_hi: 'पुराना फरीदाबाद',              lat: 28.4077, lon: 77.3104 },
  { id: 'NCA',  code: 'NCA',  name_en: 'Neelam Chowk Ajronda',              name_hi: 'नीलम चौक अजरौंदा',             lat: 28.3975, lon: 77.3124 },
  { id: 'BAK',  code: 'BAK',  name_en: 'Bata Chowk',                         name_hi: 'बाटा चौक',                     lat: 28.3858, lon: 77.3135 },
  { id: 'ESM',  code: 'ESM',  name_en: 'Escorts Mujesar',                    name_hi: 'एस्कॉर्ट्स मुजेसर',            lat: 28.3702, lon: 77.3149 },
  { id: 'SIS',  code: 'SIS',  name_en: 'Sant Surdas (Sihi)',                  name_hi: 'संत सूरदास (सिही)',             lat: 28.3547, lon: 77.3162 },
  { id: 'RNS',  code: 'RNS',  name_en: 'Raja Nahar Singh (Ballabhgarh)',     name_hi: 'राजा नाहर सिंह (बल्लभगढ़)',    lat: 28.3400, lon: 77.3164 },

  // ── Pink Line (46 stations: Majlis Park ↔ Shiv Vihar + Phase 4 ring) ───────
  { id: 'MJP',  code: 'MJP',  name_en: 'Majlis Park',                        name_hi: 'मजलिस पार्क',                  lat: 28.7244, lon: 77.1820 },
  { id: 'SHB',  code: 'SHB',  name_en: 'Shalimar Bagh',                      name_hi: 'शालीमार बाग',                  lat: 28.7175, lon: 77.1509 },
  // AZP shared with Yellow | NSP shared with Red
  { id: 'SHK',  code: 'SHK',  name_en: 'Shakurpur',                          name_hi: 'शकूरपुर',                      lat: 28.6858, lon: 77.1496 },
  // PBW shared with Green | RJG shared with Blue
  { id: 'ESI',  code: 'ESI',  name_en: 'ESI - Basaidarapur',                 name_hi: 'ईएसआई - बसाईदारापुर',          lat: 28.6581, lon: 77.1273 },
  { id: 'MYP',  code: 'MYP',  name_en: 'Mayapuri',                           name_hi: 'माया पुरी',                    lat: 28.6372, lon: 77.1297 },
  { id: 'NRV',  code: 'NRV',  name_en: 'Naraina Vihar',                      name_hi: 'नारायणा विहार',                lat: 28.6273, lon: 77.1403 },
  { id: 'DCT',  code: 'DCT',  name_en: 'Delhi Cantonment',                   name_hi: 'दिल्ली छावनी',                 lat: 28.5938, lon: 77.1350 },
  { id: 'DGD',  code: 'DGD',  name_en: 'Durgabai Deshmukh South Campus',    name_hi: 'दुर्गाबाई देशमुख दक्षिण परिसर', lat: 28.5894, lon: 77.1691 },
  { id: 'SMV',  code: 'SMV',  name_en: 'Sir M. Vishweshwaraiah Moti Bagh',  name_hi: 'सर एम. विश्वेश्वरैया मोती बाग', lat: 28.5785, lon: 77.1757 },
  { id: 'BCP',  code: 'BCP',  name_en: 'Bhikaji Cama Place',                 name_hi: 'भीकाजी कामा प्लेस',            lat: 28.5679, lon: 77.1870 },
  { id: 'SJN',  code: 'SJN',  name_en: 'Sarojini Nagar',                     name_hi: 'सरोजिनी नगर',                  lat: 28.5742, lon: 77.1954 },
  // INA shared with Yellow | LJN shared with Violet
  { id: 'SEX',  code: 'SEX',  name_en: 'South Extension',                    name_hi: 'साउथ एक्सटेंशन',               lat: 28.5810, lon: 77.2109 },
  { id: 'VBP',  code: 'VBP',  name_en: 'Vinobapuri',                         name_hi: 'विनोबापुरी',                   lat: 28.5670, lon: 77.2492 },
  { id: 'ASH',  code: 'ASH',  name_en: 'Ashram',                             name_hi: 'आश्रम',                        lat: 28.5724, lon: 77.2586 },
  { id: 'HNZ',  code: 'HNZ',  name_en: 'Sarai Kale Khan - Hazrat Nizamuddin', name_hi: 'सराय काले खां - हजरत निजामुद्दीन', lat: 28.5887, lon: 77.2572 },
  { id: 'MPK',  code: 'MPK',  name_en: 'Shree Ram Mandir Mayur Vihar',       name_hi: 'श्री राम मंदिर मयूर विहार',   lat: 28.6040, lon: 77.3028 },
  // MPH shared with Blue
  { id: 'TSL',  code: 'TSL',  name_en: 'Trilokpuri - Sanjay Lake',           name_hi: 'त्रिलोकपुरी - संजय लेक',      lat: 28.6135, lon: 77.3089 },
  { id: 'VNE',  code: 'VNE',  name_en: 'East Vinod Nagar - Mayur Vihar II', name_hi: 'पूर्व विनोद नगर - मयूर विहार II', lat: 28.6200, lon: 77.3054 },
  { id: 'MWV',  code: 'MWV',  name_en: 'Mandawali - West Vinod Nagar',       name_hi: 'मंडावली - वेस्ट विनोद नगर',   lat: 28.6250, lon: 77.3045 },
  { id: 'IPX',  code: 'IPX',  name_en: 'IP Extension',                       name_hi: 'आईपी एक्सटेंशन',              lat: 28.6289, lon: 77.3102 },
  // AVH shared with Blue Branch | KKD shared with Blue Branch
  { id: 'KRC',  code: 'KRC',  name_en: 'Karkarduma Court',                   name_hi: 'कड़कड़डूमा कोर्ट',             lat: 28.6536, lon: 77.2958 },
  { id: 'KRN',  code: 'KRN',  name_en: 'Krishna Nagar',                      name_hi: 'कृष्णा नगर',                   lat: 28.6578, lon: 77.2902 },
  { id: 'EAN',  code: 'EAN',  name_en: 'East Azad Nagar',                    name_hi: 'पूर्व आजाद नगर',               lat: 28.6647, lon: 77.2849 },
  // WLC shared with Red
  { id: 'JFB',  code: 'JFB',  name_en: 'Jaffrabad',                          name_hi: 'जाफराबाद',                     lat: 28.6827, lon: 77.2748 },
  { id: 'MJR',  code: 'MJR',  name_en: 'Maujpur - Babarpur',                 name_hi: 'मौजपुर - बाबरपुर',             lat: 28.6920, lon: 77.2796 },
  { id: 'GKP',  code: 'GKP',  name_en: 'Gokulpuri',                          name_hi: 'गोकुलपुरी',                    lat: 28.7025, lon: 77.2861 },
  { id: 'JRP',  code: 'JRP',  name_en: 'Johri Enclave',                      name_hi: 'जौहरी एन्क्लेव',               lat: 28.7129, lon: 77.2861 },
  { id: 'SVH',  code: 'SVH',  name_en: 'Shiv Vihar',                         name_hi: 'शिव विहार',                    lat: 28.7225, lon: 77.2871 },
  // Pink Phase 4 ring
  { id: 'BJP',  code: 'BJP',  name_en: 'Bhajanpura',                         name_hi: 'भजनपुरा',                      lat: 28.6979, lon: 77.2639 },
  { id: 'YVH',  code: 'YVH',  name_en: 'Yamuna Vihar',                       name_hi: 'यमुना विहार',                  lat: 28.7007, lon: 77.2503 },
  { id: 'KJK',  code: 'KJK',  name_en: 'Khajuri Khas',                       name_hi: 'खजूरी खास',                    lat: 28.7098, lon: 77.2267 },
  { id: 'NSV',  code: 'NSV',  name_en: 'Nanaksar - Sonia Vihar',             name_hi: 'नानकसर - सोनिया विहार',        lat: 28.7148, lon: 77.2104 },
  { id: 'JGW',  code: 'JGW',  name_en: 'Jagatpur - Wazirabad',               name_hi: 'जगतपुर - वजीराबाद',            lat: 28.7195, lon: 77.1955 },
  { id: 'JHD',  code: 'JHD',  name_en: 'Jharoda Majra',                      name_hi: 'झड़ोदा माजरा',                 lat: 28.7210, lon: 77.1889 },
  { id: 'BUR',  code: 'BUR',  name_en: 'Burari',                             name_hi: 'बुराड़ी',                      lat: 28.7218, lon: 77.1878 },

  // ── Magenta Line (26 stations: Krishna Park Ext ↔ Botanical Garden) ────────
  { id: 'KPE',  code: 'KPE',  name_en: 'Krishna Park Extension',             name_hi: 'कृष्णा पार्क एक्सटेंशन',      lat: 28.6349, lon: 77.0863 },
  // JPW shared with Blue
  { id: 'DBM',  code: 'DBM',  name_en: 'Dabri Mor - Janakpuri South',        name_hi: 'डाबड़ी मोड़ - जनकपुरी साउथ',  lat: 28.6158, lon: 77.0852 },
  { id: 'DSP',  code: 'DSP',  name_en: 'Dashrath Puri',                      name_hi: 'दशरथपुरी',                     lat: 28.6019, lon: 77.0824 },
  { id: 'PAL',  code: 'PAL',  name_en: 'Palam',                              name_hi: 'पालम',                         lat: 28.5919, lon: 77.0828 },
  { id: 'SBT',  code: 'SBT',  name_en: 'Sadar Bazar Cantonment',             name_hi: 'सदर बाज़ार छावनी',             lat: 28.5772, lon: 77.1112 },
  { id: 'IGI',  code: 'IGI',  name_en: 'Terminal 1 IGI Airport',             name_hi: 'टर्मिनल 1 आईजीआई एयरपोर्ट',  lat: 28.5722, lon: 77.1070 },
  { id: 'SKV',  code: 'SKV',  name_en: 'Shankar Vihar',                      name_hi: 'शंकर विहार',                   lat: 28.5574, lon: 77.1397 },
  { id: 'VSV',  code: 'VSV',  name_en: 'Vasant Vihar',                       name_hi: 'वसंत विहार',                   lat: 28.5607, lon: 77.1608 },
  { id: 'MNK',  code: 'MNK',  name_en: 'Munirka',                            name_hi: 'मुनीरका',                      lat: 28.5549, lon: 77.1711 },
  { id: 'RKP',  code: 'RKP',  name_en: 'RK Puram',                           name_hi: 'आरके पुरम',                    lat: 28.5514, lon: 77.1847 },
  { id: 'IIT',  code: 'IIT',  name_en: 'IIT Delhi',                          name_hi: 'आईआईटी दिल्ली',                lat: 28.5448, lon: 77.1899 },
  // HKS shared with Yellow
  { id: 'PSP',  code: 'PSP',  name_en: 'Panchsheel Park',                    name_hi: 'पंचशील पार्क',                 lat: 28.5434, lon: 77.2141 },
  { id: 'CHD',  code: 'CHD',  name_en: 'Chirag Delhi',                       name_hi: 'चिराग दिल्ली',                 lat: 28.5381, lon: 77.2281 },
  { id: 'GK1',  code: 'GK1',  name_en: 'Greater Kailash',                    name_hi: 'ग्रेटर कैलाश',                 lat: 28.5419, lon: 77.2385 },
  { id: 'NEN',  code: 'NEN',  name_en: 'Nehru Enclave',                      name_hi: 'नेहरू एन्क्लेव',               lat: 28.5461, lon: 77.2515 },
  // KKM shared with Violet
  { id: 'ONS',  code: 'ONS',  name_en: 'Okhla NSIC',                         name_hi: 'ओखला एनएसआईसी',               lat: 28.5545, lon: 77.2648 },
  { id: 'SKW',  code: 'SKW',  name_en: 'Sukhdev Vihar',                      name_hi: 'सुखदेव विहार',                 lat: 28.5597, lon: 77.2749 },
  { id: 'JMI',  code: 'JMI',  name_en: 'Jamia Millia Islamia',               name_hi: 'जामिया मिल्लिया इस्लामिया',   lat: 28.5585, lon: 77.2812 },
  { id: 'OVH',  code: 'OVH',  name_en: 'Okhla Vihar',                        name_hi: 'ओखला विहार',                   lat: 28.5613, lon: 77.2919 },
  { id: 'JSB',  code: 'JSB',  name_en: 'Jasola Vihar Shaheen Bagh',          name_hi: 'जसोला विहार शाहीन बाग',        lat: 28.5458, lon: 77.2967 },
  { id: 'KLK',  code: 'KLK',  name_en: 'Kalindi Kunj',                       name_hi: 'कालिंदी कुंज',                 lat: 28.5452, lon: 77.3060 },
  { id: 'OBS',  code: 'OBS',  name_en: 'Okhla Bird Sanctuary',               name_hi: 'ओखला पक्षी अभयारण्य',         lat: 28.5529, lon: 77.3216 },
  // BOT shared with Blue
  // Magenta Phase 4
  { id: 'DPC',  code: 'DPC',  name_en: 'Deepali Chowk',                      name_hi: 'दीपाली चौक',                   lat: 28.6934, lon: 77.1386 },
  // PPR (Madhuban Chowk) shared with Red
  { id: 'UPV',  code: 'UPV',  name_en: 'Uttari Pitampura - Prashant Vihar', name_hi: 'उत्तरी पीतमपुरा - प्रशांत विहार', lat: 28.7076, lon: 77.1460 },
  { id: 'HPV',  code: 'HPV',  name_en: 'Haiderpur Village',                  name_hi: 'हैदरपुर विलेज',                lat: 28.7148, lon: 77.1494 },
  { id: 'BLW',  code: 'BLW',  name_en: 'Bhalaswa',                           name_hi: 'भलस्वा',                       lat: 28.7218, lon: 77.1620 },
  // HBM shared with Yellow | MJP shared with Pink

  // ── Aqua Line / NMRC (20 stations: Noida Sec 52 ↔ GNIDA Office) ───────────
  // N52 shared with Blue Line (interchange)
  { id: 'NS51', code: 'N51', name_en: 'Noida Sector 51',                     name_hi: 'नोएडा सेक्टर 51',              lat: 28.5957, lon: 77.3753 },
  { id: 'NS50', code: 'N50', name_en: 'Noida Sector 50',                     name_hi: 'नोएडा सेक्टर 50',              lat: 28.5935, lon: 77.3910 },
  { id: 'NS76', code: 'N76', name_en: 'Noida Sector 76',                     name_hi: 'नोएडा सेक्टर 76',              lat: 28.5687, lon: 77.3827 },
  { id: 'NS101',code: 'N101',name_en: 'Noida Sector 101',                    name_hi: 'नोएडा सेक्टर 101',             lat: 28.5564, lon: 77.3848 },
  { id: 'NS81', code: 'N81', name_en: 'Noida Sector 81',                     name_hi: 'नोएडा सेक्टर 81',              lat: 28.5398, lon: 77.3909 },
  { id: 'NSZ',  code: 'NSZ', name_en: 'NSEZ Noida',                          name_hi: 'एनएसईजेड नोएडा',              lat: 28.5239, lon: 77.3956 },
  { id: 'NS83', code: 'N83', name_en: 'Noida Sector 83',                     name_hi: 'नोएडा सेक्टर 83',              lat: 28.5241, lon: 77.3973 },
  { id: 'NS137',code: 'N137',name_en: 'Noida Sector 137',                    name_hi: 'नोएडा सेक्टर 137',             lat: 28.5091, lon: 77.4090 },
  { id: 'NS142',code: 'N142',name_en: 'Noida Sector 142',                    name_hi: 'नोएडा सेक्टर 142',             lat: 28.4981, lon: 77.4200 },
  { id: 'NS143',code: 'N143',name_en: 'Noida Sector 143',                    name_hi: 'नोएडा सेक्टर 143',             lat: 28.4894, lon: 77.4289 },
  { id: 'NS144',code: 'N144',name_en: 'Noida Sector 144',                    name_hi: 'नोएडा सेक्टर 144',             lat: 28.4800, lon: 77.4369 },
  { id: 'NS145',code: 'N145',name_en: 'Noida Sector 145',                    name_hi: 'नोएडा सेक्टर 145',             lat: 28.4706, lon: 77.4448 },
  { id: 'NS146',code: 'N146',name_en: 'Noida Sector 146',                    name_hi: 'नोएडा सेक्टर 146',             lat: 28.4638, lon: 77.4510 },
  { id: 'NS147',code: 'N147',name_en: 'Noida Sector 147',                    name_hi: 'नोएडा सेक्टर 147',             lat: 28.4570, lon: 77.4570 },
  { id: 'NS148',code: 'N148',name_en: 'Noida Sector 148',                    name_hi: 'नोएडा सेक्टर 148',             lat: 28.4494, lon: 77.4632 },
  { id: 'KP2',  code: 'KP2', name_en: 'Knowledge Park II',                   name_hi: 'नॉलेज पार्क II',               lat: 28.4682, lon: 77.4943 },
  { id: 'PC',   code: 'PC',  name_en: 'Pari Chowk',                          name_hi: 'परी चौक',                      lat: 28.4631, lon: 77.5081 },
  { id: 'A1N',  code: 'A1',  name_en: 'Alpha 1 Greater Noida',               name_hi: 'अल्फा 1 ग्रेटर नोएडा',        lat: 28.4709, lon: 77.5127 },
  { id: 'D1N',  code: 'D1',  name_en: 'Delta 1 Greater Noida',               name_hi: 'डेल्टा 1 ग्रेटर नोएडा',       lat: 28.4744, lon: 77.5040 },
  { id: 'GNO',  code: 'GNO', name_en: 'GNIDA Office',                        name_hi: 'जीएनआईडीए ऑफिस',              lat: 28.4720, lon: 77.5020 },

  // ── Airport Express / Orange Line (7 stations) ────────────────────────────
  // NDL shared with Yellow | D21 shared with Blue
  { id: 'SJM',  code: 'SJM', name_en: 'Shivaji Stadium',                     name_hi: 'शिवाजी स्टेडियम',             lat: 28.6290, lon: 77.2119 },
  { id: 'DKN',  code: 'DKN', name_en: 'Dhaula Kuan',                         name_hi: 'ढौला कुआँ',                    lat: 28.5918, lon: 77.1616 },
  { id: 'DAC',  code: 'DAC', name_en: 'Delhi Aerocity',                      name_hi: 'दिल्ली एयरोसिटी',              lat: 28.5488, lon: 77.1209 },
  { id: 'IGA',  code: 'IGA', name_en: 'IGI Airport T2/T3',                   name_hi: 'आईजीआई एयरपोर्ट T2/T3',       lat: 28.5569, lon: 77.0867 },
  // D21 shared with Blue
  { id: 'YDS',  code: 'YDS', name_en: 'Yashobhoomi Dwarka Sector 25',        name_hi: 'यशोभूमि द्वारका सेक्टर 25',   lat: 28.5580, lon: 77.0440 },

  // ── Grey Line (4 stations: Dwarka ↔ Dhansa Bus Stand) ─────────────────────
  // DWK shared with Blue
  { id: 'NLG',  code: 'NLG', name_en: 'Nangli',                              name_hi: 'नांगली',                       lat: 28.5851, lon: 77.0195 },
  { id: 'NJF',  code: 'NJF', name_en: 'Najafgarh',                           name_hi: 'नजफगढ़',                       lat: 28.6123, lon: 76.9824 },
  { id: 'DHB',  code: 'DHB', name_en: 'Dhansa Bus Stand',                    name_hi: 'ढांसा बस स्टैंड',              lat: 28.6011, lon: 76.9640 },
];

// ─── Line sequences with actual travel times from CSV ─────────────────────
// travelMins[i] = minutes to travel FROM station[i-1] TO station[i]; index 0 = 0
export type LineSeq = { lineId: LineKey; stations: string[]; travelMins: number[] };

export const SEQUENCES: LineSeq[] = [
  // Red Line: Shaheed Sthal → Rithala (29 stations)
  { lineId: 'red', stations: [
    'SHT','HNR','ARL','MHN','SYP','MMS','RJB','SNG',
    'DSG','JHM','MSP','SHD','WLC','SLM','SHP','KSG',
    'THS','PLB','PRT','SHN','IND','KNY','KPR','PPR',
    'NSP','KTE','RHE','RHW','RTH'],
    travelMins: [0,3,2,2,2,2,2,2,2,2,2,2,2,2,3,3,2,2,2,3,2,2,2,2,2,2,2,2,2] },

  // Yellow Line: Samaypur Badli → Millennium City Centre (37 stations)
  { lineId: 'amber', stations: [
    'SBD','RSN','HBM','JHP','ANP','AZP','MDT','GTB','VVD','VHS','CVL','KSG',
    'CCW','CWB','NDL','RJC','PCK','CSS','UDB','LKM','JRB','INA','AIM','GRP',
    'HKS','MLN','SKT','QMN','CHT','SLT','GHT','AGH','GDN','SKP','MGR','IFC','HCC'],
    travelMins: [0,2,3,2,2,3,2,3,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,3,3,2,3,2,3,2,4,4,2,2,2,2] },

  // Blue Line: Dwarka Sector 21 → Noida Electronic City (50 stations)
  { lineId: 'blue', stations: [
    'D21','DS8','DS9','DS10','DS11','DS12','DS13','DS14','DWK',
    'DMR','NWD','UNW','UNE','JPW','JPE','TLK','SBN','TGD','RJG',
    'RMN','MTN','KTN','SDP','PTG','RDP','KRB','JND','RAK','RJC',
    'BRK','MDH','PGM','IDP','YMB','AKD','MPH','MPE','NAN',
    'N15','N16','N18','BOT','GCN','NCC','N34','N52','N61','N59','N62','NEC'],
    travelMins: [0,3,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,3,2,2,2,2,2,2,2,2,2,3,2,2,2,2] },

  // Blue Line Branch: Yamuna Bank → Vaishali (8 stations)
  { lineId: 'blue', stations: ['YMB','LXN','NVH','PVH','KKD','AVH','KSM','VAI'],
    travelMins: [0,2,2,2,2,2,2,3] },

  // Green Line: Inderlok → Brigadier Hoshiyar Singh (22 stations)
  { lineId: 'green', stations: [
    'IND','APM','PBE','PBW','SJP','MDP','PVE','PVW',
    'PGA','UNR','MSS','NGL','NRS','RPK','MDK','MIA',
    'GHV','TKK','TKB','PSR','BHG','BHS'],
    travelMins: [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,2,3,3] },

  // Green Line Branch: Ashok Park Main → Kirti Nagar (3 stations)
  { lineId: 'green', stations: ['APM','SRS','KTN'],
    travelMins: [0,2,2] },

  // Violet Line: Kashmere Gate → Raja Nahar Singh (34 stations)
  { lineId: 'violet', stations: [
    'KSG','LAL','JMS','DLG','ITO','MDH','JNP','CSS','KMK','JLN',
    'JPG','LJN','MLC','KLC','NHP','KKM','GPR','HNO','JAP','SNV',
    'MOH','TGV','BDB','SRN','NPC','MMP','S28','BKM','OFD','NCA',
    'BAK','ESM','SIS','RNS'],
    travelMins: [0,3,2,2,2,2,2,2,3,2,2,3,2,2,2,2,2,2,2,2,2,3,2,3,4,3,3,2,3,3,2,2,3,3] },

  // Pink Line: Majlis Park → Shiv Vihar (38 stations)
  { lineId: 'pink', stations: [
    'MJP','SHB','AZP','NSP','SHK','PBW','ESI','RJG','MYP','NRV',
    'DCT','DGD','SMV','BCP','SJN','INA','SEX','LJN','VBP','ASH',
    'HNZ','MPH','MPK','TSL','VNE','MWV','IPX','AVH','KKD','KRC',
    'KRN','EAN','WLC','JFB','MJR','GKP','JRP','SVH'],
    travelMins: [0,3,3,2,2,3,4,2,2,3,3,5,2,3,2,2,2,3,2,2,3,4,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2] },

  // Pink Line Phase 4 ring: Maujpur → Majlis Park (via ring, 9 stations)
  { lineId: 'pink', stations: ['MJR','BJP','YVH','KJK','NSV','JGW','JHD','BUR','MJP'],
    travelMins: [0,2,2,3,3,3,2,2,2] },

  // Magenta Line: Krishna Park Extension → Botanical Garden (26 stations)
  { lineId: 'magenta', stations: [
    'KPE','JPW','DBM','DSP','PAL','SBT','IGI','SKV','VSV','MNK',
    'RKP','IIT','HKS','PSP','CHD','GK1','NEN','KKM','ONS','SKW',
    'JMI','OVH','JSB','KLK','OBS','BOT'],
    travelMins: [0,4,3,2,2,4,2,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,3,3] },

  // Magenta Line Phase 4: Deepali Chowk → Majlis Park (7 stations)
  { lineId: 'magenta', stations: ['DPC','PPR','UPV','HPV','BLW','HBM','MJP'],
    travelMins: [0,2,2,2,2,2,4] },

  // Aqua Line (NMRC): Noida Sector 52 → GNIDA Office (20 stations)
  // N52 shared with Blue Line — creates interchange edge automatically
  { lineId: 'aqua', stations: [
    'N52','NS51','NS50','NS76','NS101','NS81','NSZ','NS83',
    'NS137','NS142','NS143','NS144','NS145','NS146','NS147','NS148',
    'KP2','PC','A1N','D1N','GNO'],
    travelMins: [0,2,2,2,2,2,3,2,2,2,2,2,2,3,2,3,4,2,2,3,2] },

  // Airport Express: New Delhi → Yashobhoomi Dwarka Sector 25 (7 stations)
  { lineId: 'orange', stations: ['NDL','SJM','DKN','DAC','IGA','D21','YDS'],
    travelMins: [0,3,7,5,3,3,3] },

  // Grey Line: Dwarka → Dhansa Bus Stand (4 stations)
  { lineId: 'grey', stations: ['DWK','NLG','NJF','DHB'],
    travelMins: [0,3,4,3] },
];

// ─── Build stops & edges from sequences ───────────────────────────────────
function buildStopsAndEdges(sequences: LineSeq[]): { stops: Stop[]; edges: Edge[] } {
  const stopsMap = new Map<string, Stop>();
  const edgeSet  = new Set<string>();
  const edges: Edge[] = [];

  for (const { lineId, stations, travelMins } of sequences) {
    const lineStops: Stop[] = [];

    for (let i = 0; i < stations.length; i++) {
      const stationId = stations[i];
      const stopId    = `${lineId}_${stationId}`;

      if (!stopsMap.has(stopId)) {
        const seq  = stopsMap.size + 1;
        const stop: Stop = { id: stopId, station_id: stationId, line_id: lineId, sequence: seq };
        stopsMap.set(stopId, stop);
      }
      lineStops.push(stopsMap.get(stopId)!);
    }

    // Bidirectional edges between consecutive stops with actual travel times
    for (let i = 0; i < lineStops.length - 1; i++) {
      const a          = lineStops[i].id;
      const b          = lineStops[i + 1].id;
      const travelMin  = travelMins[i + 1] ?? 2;

      for (const [from, to] of [[a, b], [b, a]]) {
        const key = `${from}→${to}`;
        if (!edgeSet.has(key)) {
          edgeSet.add(key);
          edges.push({ from_stop_id: from, to_stop_id: to, travel_min: travelMin });
        }
      }
    }
  }

  return { stops: Array.from(stopsMap.values()), edges };
}

const { stops: _STOPS, edges: _EDGES } = buildStopsAndEdges(SEQUENCES);

// ─── Derive lines[] for each station ──────────────────────────────────────
const stationLinesMap = new Map<string, Set<LineKey>>();
for (const stop of _STOPS) {
  const s = stationLinesMap.get(stop.station_id) ?? new Set<LineKey>();
  s.add(stop.line_id);
  stationLinesMap.set(stop.station_id, s);
}

export const STATIONS: Station[] = RAW.map(raw => ({
  ...raw,
  lines: Array.from(stationLinesMap.get(raw.id) ?? []),
}));

export const STOPS: Stop[]  = _STOPS;
export const EDGES: Edge[]  = _EDGES;

// ─── Pre-built O(1) lookup maps for fast search ────────────────────────────
export const STATION_BY_ID = new Map<string, Station>(STATIONS.map(s => [s.id, s]));

export const STATION_BY_NAME = new Map<string, Station>(
  STATIONS.flatMap(s => [
    [s.name_en.toLowerCase(), s],
    [s.name_hi, s],
  ])
);
