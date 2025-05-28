// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Translation resources for 5 languages
const resources = {
  en: {
    translation: {
      // Common titles
      "dos-title": "Do's",
      "donts-title": "Don'ts",

      // Tsunami
      "tsunami-dos-1":
        "Move to higher ground immediately after a tsunami warning.",
      "tsunami-dos-2":
        "Follow evacuation orders from local authorities without delay.",
      "tsunami-dos-3":
        "Stay away from the coast and avoid watching the tsunami from the shore.",
      "tsunami-donts-1":
        "Don't go near the beach to observe the tsunami waves.",
      "tsunami-donts-2": "Don't ignore official warnings or sirens.",
      "tsunami-donts-3":
        "Don't return to coastal areas until authorities declare it safe.",

      // Earthquake
      "earthquake-dos-1": "Drop, cover, and hold on during shaking.",
      "earthquake-dos-2":
        "Stay indoors under a sturdy table or against an interior wall.",
      "earthquake-dos-3": "Prepare an emergency kit with essentials.",
      "earthquake-donts-1": "Don't run outside during shaking.",
      "earthquake-donts-2": "Don't use elevators during an earthquake.",
      "earthquake-donts-3": "Don't panic or spread rumors.",

      // Wildfire
      "wildfire-dos-1": "Evacuate when ordered by authorities.",
      "wildfire-dos-2": "Clear flammable materials around your home.",
      "wildfire-dos-3": "Stay informed via local news updates.",
      "wildfire-donts-1": "Don't start fires in dry conditions.",
      "wildfire-donts-2": "Don't stay if evacuation is advised.",
      "wildfire-donts-3": "Don't ignore smoke or fire warnings.",

      // Hurricane
      "hurricane-dos-1": "Stock up on supplies before the storm.",
      "hurricane-dos-2": "Evacuate if ordered by authorities.",
      "hurricane-dos-3": "Secure windows and doors with shutters.",
      "hurricane-donts-1": "Don't stay in low-lying areas during a cyclone.",
      "hurricane-donts-2": "Don't drive through flooded roads.",
      "hurricane-donts-3": "Don't ignore hurricane warnings.",

      // Landslide
      "landslide-dos-1": "Stay alert during heavy rains in hilly areas.",
      "landslide-dos-2": "Evacuate if you notice cracks or ground movement.",
      "landslide-dos-3": "Follow local authority advice promptly.",
      "landslide-donts-1": "Don't build near steep slopes or unstable areas.",
      "landslide-donts-2": "Don't ignore warning signs like tilting trees.",
      "landslide-donts-3": "Don't return until it's declared safe.",

      // Flood
      "flood-dos-1": "Move to higher ground during flooding.",
      "flood-dos-2": "Turn off electricity if safe to do so.",
      "flood-dos-3": "Follow evacuation orders promptly.",
      "flood-donts-1": "Don't walk or drive through floodwaters.",
      "flood-donts-2": "Don't ignore flood warnings or alerts.",
      "flood-donts-3": "Don't return until cleared by authorities.",
    },
  },
  ta: {
    translation: {
      "dos-title": "செய்ய வேண்டியவை",
      "donts-title": "செய்யக்கூடாதவை",
      "tsunami-dos-1":
        "ஒரு tsunami எச்சரிக்கைக்குப் பின் உடனடியாக உயரமான இடத்திற்கு செல்லவும்.",
      "tsunami-dos-2":
        "உள்ளூர் அதிகாரிகளின் அகற்றுமதி உத்தரவுகளை உடனடியாக பின்பற்றவும்.",
      "tsunami-dos-3":
        "கடற்கரையில் இருந்து tsunamiஐ பார்க்க வேண்டாம் என்று தவிர்க்கவும்.",
      "tsunami-donts-1": "tsunami அலைகளை பார்க்க கடற்கரைக்கு செல்ல வேண்டாம்.",
      "tsunami-donts-2":
        "அதிகாரபூர்வ எச்சரிக்கைகள் அல்லது சத்தங்களை புறக்கணிக்க வேண்டாம்.",
      "tsunami-donts-3":
        "அதிகாரிகள் பாதுகாப்பு உறுதி செய்யும் வரை கடற்கரை பகுதிகளுக்கு திரும்ப வேண்டாம்.",
      "earthquake-dos-1":
        "ஆட்டம் நடக்கும் போது விழுந்து, மறைந்து, பிடித்திருங்கள்.",
      "earthquake-dos-2":
        "உறுதியான மேசை அல்லது உள்ள அறை சுவரில் உள்ளே இருங்கள்.",
      "earthquake-dos-3": "அத்தியாவசிய பொருட்களுடன் அவசர கிட் தயார் செய்யவும்.",
      "earthquake-donts-1": "ஆட்டம் நடக்கும் போது வெளியே ஓட வேண்டாம்.",
      "earthquake-donts-2": "பூகம்பத்தின்போது லிஃப்ட்களை பயன்படுத்த வேண்டாம்.",
      "earthquake-donts-3":
        "பதற்றமடைய வேண்டாம் அல்லது பழமொழிகளை பரப்ப வேண்டாம்.",
      "wildfire-dos-1": "அதிகாரிகள் உத்தரவிட்டால் வெளியேறவும்.",
      "wildfire-dos-2":
        "உங்கள் வீட்டைச் சுற்றி எளிதில் எரியக்கூடிய பொருட்களை அகற்றவும்.",
      "wildfire-dos-3": "உள்ளூர் செய்தி புதுப்பிப்புகளின் மூலம் தகவல் பெறவும்.",
      "wildfire-donts-1": "ஈரமற்ற நிலைகளில் தீயை தொடங்க வேண்டாம்.",
      "wildfire-donts-2":
        "அகற்றுமதி அறிவுறுத்தப்பட்டால் அங்கு இருக்க வேண்டாம்.",
      "wildfire-donts-3": "புகை அல்லது தீ எச்சரிக்கைகளை புறக்கணிக்க வேண்டாம்.",
      "hurricane-dos-1": "புயல் முன் பொருட்களை சேகரிக்கவும்.",
      "hurricane-dos-2": "அதிகாரிகள் உத்தரவிட்டால் வெளியேறவும்.",
      "hurricane-dos-3":
        "சன்னல்கள் மற்றும் கதவுகளை அடைப்புகளால் பாதுகாக்கவும்.",
      "hurricane-donts-1": "சூறாவளியின் போது கீழ் நிலைகளில் இருக்க வேண்டாம்.",
      "hurricane-donts-2": "நீராவி பாதைகளை வழியாக ஓட்ட வேண்டாம்.",
      "hurricane-donts-3": "புயல் எச்சரிக்கைகளை புறக்கணிக்க வேண்டாம்.",
      "landslide-dos-1":
        "மலைப்பகுதிகளில் கனமழை நடக்கும் போது எச்சரிக்கையாக இருங்கள்.",
      "landslide-dos-2":
        "நிலத்தில் பிளவுகள் அல்லது நகர்வு இருந்தால் வெளியேறவும்.",
      "landslide-dos-3":
        "உள்ளூர் அதிகாரிகளின் அறிவுரைகளை உடனடியாக பின்பற்றவும்.",
      "landslide-donts-1":
        "கூரையான சரிவுகள் அல்லது நிலையற்ற பகுதிகளுக்கு அருகில் கட்டிடம் கட்ட வேண்டாம்.",
      "landslide-donts-2":
        "சாய்ந்த மரங்கள் போன்ற எச்சரிக்கை அறிகுறிகளை புறக்கணிக்க வேண்டாம்.",
      "landslide-donts-3":
        "பாதுகாப்பு உறுதி செய்யப்படும் வரை திரும்ப வேண்டாம்.",
      "flood-dos-1": "புயலின் போது உயரமான இடத்திற்கு செல்லவும்.",
      "flood-dos-2": "பாதுகாப்பாக இருந்தால் மின்சாரத்தை அணைக்கவும்.",
      "flood-dos-3": "அகற்றுமதி உத்தரவுகளை உடனடியாக பின்பற்றவும்.",
      "flood-donts-1": "புயல் நீரில் நடக்கவோ அல்லது ஓட்டுவதை தவிர்க்கவும்.",
      "flood-donts-2":
        "புயல் எச்சரிக்கைகள் அல்லது அலர்ட்களை புறக்கணிக்க வேண்டாம்.",
      "flood-donts-3": "அதிகாரிகள் அனுமதிக்கும் வரை திரும்ப வேண்டாம்.",
    },
  },
  te: {
    translation: {
      "dos-title": "చేయవలసినవి",
      "donts-title": "చేయకూడనివి",
      "tsunami-dos-1":
        "ట్సునామి హెచ్చరిక తర్వాత వెంటనే ఎత్తైన ప్రదేశానికి వెళ్ళండి.",
      "tsunami-dos-2":
        "స్థానిక అధికారుల ఎవాక్యుయేషన్ ఆదేశాలను వెంటనే పాటించండి.",
      "tsunami-dos-3":
        "తీరంలో ట్సునామిని చూడడం నుండి దూరంగా ఉండండి మరియు దానిని చూడవద్దు.",
      "tsunami-donts-1": "ట్సునామి అలలను చూడడానికి బీచ్ దగ్గరకు వెళ్ళవద్దు.",
      "tsunami-donts-2": "ప్రత్యేక హెచ్చరికలు లేదా సైరన్‌లను పట్టించుకోకూడదు.",
      "tsunami-donts-3":
        "అధికారులు సురక్షితమని ప్రకటించే వరకు తీర ప్రాంతాలకు తిరిగి వెళ్ళవద్దు.",
      "earthquake-dos-1": "కంపన సమయంలో కింద పడి, కవర్ చేసుకుని, పట్టుకోండి.",
      "earthquake-dos-2":
        "బలమైన టేబుల్ కింద లేదా లోపలి గోడకు దగ్గరగా లోపల ఉండండి.",
      "earthquake-dos-3": "తప్పనిసరి పనుల కోసం ఎమర్జెన్సీ కిట్ సిద్ధం చేయండి.",
      "earthquake-donts-1": "కంపన సమయంలో బయటకు ఓడించవద్దు.",
      "earthquake-donts-2": "భూకంప సమయంలో ఎలివేటర్‌లను ఉపయోగించవద్దు.",
      "earthquake-donts-3":
        "ఆందోళన చెందకూడదు లేదా పుకార్లను వ్యాప్తి చేయవద్దు.",
      "wildfire-dos-1": "అధికారుల ఆదేశం మేరకు వెళ్ళండి.",
      "wildfire-dos-2": "మీ ఇంటి చుట్టూ ఆకలేఖన బద్దలను శుభ్రం చేయండి.",
      "wildfire-dos-3": "స్థానిక న్యూస్ అప్‌డేట్‌ల ద్వారా తెలుసుకోండి.",
      "wildfire-donts-1": "ఎండిన పరిస్థితులలో అగ్నిని మొదలుపెట్టవద్దు.",
      "wildfire-donts-2": "ఎవాక్యుయేషన్ సలహా ఇవ్వబడినట్లయితే అక్కడ ఉండవద్దు.",
      "wildfire-donts-3": "పొగ లేదా అగ్ని హెచ్చరికలను పట్టించుకోకూడదు.",
      "hurricane-dos-1": "తుఫాన్ ముందు సరుకులను స్టాక్ చేయండి.",
      "hurricane-dos-2": "అధికారుల ఆదేశం మేరకు ఎవాక్యుయేట్ అవ్వండి.",
      "hurricane-dos-3": "విండోస్ మరియు డోర్స్‌ను షట్టర్‌లతో భద్రపరచండి.",
      "hurricane-donts-1": "సైక్లోన్ సమయంలో తక్కువ ప్రాంతాలలో ఉండవద్దు.",
      "hurricane-donts-2": "నీరు నిండిన రోడ్లలో డ్రైవ్ చేయవద్దు.",
      "hurricane-donts-3": "తుఫాన్ హెచ్చరికలను పట్టించుకోకూడదు.",
      "landslide-dos-1":
        "ఎత్తైన ప్రాంతాలలో భారీ వర్షాల సమయంలో జాగ్రత్తగా ఉండండి.",
      "landslide-dos-2":
        "పగుళ్లు లేదా గడ్డ కదలికలు గమనిస్తే ఎవాక్యుయేట్ అవ్వండి.",
      "landslide-dos-3": "స్థానిక అధికారి సలహాలను వెంటనే పాటించండి.",
      "landslide-donts-1":
        "తీవ్ర ఒడ్డుళ్ల లేదా అస్థిర ప్రాంతాలలో కట్టడాలు కట్టవద్దు.",
      "landslide-donts-2":
        "సాయిడ్ చెట్ల వంటి హెచ్చరిక గుర్తులను పట్టించుకోకూడదు.",
      "landslide-donts-3": "సురక్షితమని ప్రకటించే వరకు తిరిగి రావద్దు.",
      "flood-dos-1": "పంజా సమయంలో ఎత్తైన ప్రదేశానికి వెళ్ళండి.",
      "flood-dos-2": "సురక్షితంగా ఉంటే విద్యుత్తును ఆపండి.",
      "flood-dos-3": "ఎవాక్యుయేషన్ ఆదేశాలను వెంటనే పాటించండి.",
      "flood-donts-1": "పంజా నీటిలో నడవకండి లేదా డ్రైవ్ చేయవద్దు.",
      "flood-donts-2": "పంజా హెచ్చరికలు లేదా అలర్ట్‌లను పట్టించుకోకూడదు.",
      "flood-donts-3": "అధికారులు అనుమతించే వరకు తిరిగి రావద్దు.",
    },
  },
  ml: {
    translation: {
      "dos-title": "ചെയ്യേണ്ടവ",
      "donts-title": "ചെയ്യരുതാത്തവ",
      "tsunami-dos-1":
        "ടസുനാമി മുന്നറിയിപ്പിന് ശേഷം ഉടൻ ഉയർന്ന സ്ഥലത്തേക്ക് പോവുക.",
      "tsunami-dos-2": "ലോക്കൽ അധികൃതരുടെ വിമോചന ഉത്തരവുകൾ ഉടൻ പാലിക്കുക.",
      "tsunami-dos-3": "തീരത്ത് നിന്ന് ടസുനാമി കാണാൻ ഒഴിവാക്കുക.",
      "tsunami-donts-1": "ടസുനാമി തരംഗങ്ങൾ കാണാൻ ബീച്ചിന് സമീപം പോകരുത്.",
      "tsunami-donts-2":
        "ഔദ്യോഗിക മുന്നറിയിപ്പുകൾ അല്ലെങ്കിൽ സൈറനുകൾ അവഗണിക്കരുത്.",
      "tsunami-donts-3":
        "അധികൃതർ സുരക്ഷിതമാണെന്ന് പ്രഖ്യാപിക്കുന്നതുവരെ തീരപ്രദേശങ്ങളിലേക്ക് മടങ്ങരുത്.",
      "earthquake-dos-1": "നിലം നടുങ്ങുമ്പോൾ വീണ്, മൂടി, പിടിക്കുക.",
      "earthquake-dos-2":
        "ശക്തമായ ടേബിളിന് അടിയിലോ അകത്തെ ചുമരിനരികിലോ ഉണ്ടാകുക.",
      "earthquake-dos-3": "അവശ്യ വസ്തുക്കളോടെ ഒരു എമർജൻസി കിറ്റ് തയ്യാറാക്കുക.",
      "earthquake-donts-1": "നിലം നടുങ്ങുമ്പോൾ പുറത്തേക്ക് ഓടരുത്.",
      "earthquake-donts-2": "ഭൂകമ്പ സമയത്ത് ലിഫ്റ്റുകൾ ഉപയോഗിക്കരുത്.",
      "earthquake-donts-3":
        "ആശങ്കപ്പെടരുതോ അല്ലെങ്കിൽ വാർത്തകൾ പ്രചരിപ്പിക്കരുത്.",
      "wildfire-dos-1": "അധികൃതർ ഉത്തരവിടുമ്പോൾ ഒഴിഞ്ഞു പോവുക.",
      "wildfire-dos-2":
        "നിന്റെ വീടിന്റെ ചുറ്റുമുള്ള തീയിൽ എളുപ്പം കത്തുന്ന പदार्थങ്ങൾ നീക്കം ചെയ്യുക.",
      "wildfire-dos-3": "ലോക്കൽ ന്യൂസ് അപ്‌ഡേറ്റുകൾ വഴി വിവരങ്ങൾ നേടുക.",
      "wildfire-donts-1": "വരണ്ട സാഹചര്യങ്ങളിൽ തീ തുടങ്ങരുത്.",
      "wildfire-donts-2": "വിമോചനം ഉപദേശിക്കപ്പെട്ടാൽ അവിടെ തങ്ങരുത്.",
      "wildfire-donts-3": "പുകയോ തീ മുന്നറിയിപ്പുകളോ അവഗണിക്കരുത്.",
      "hurricane-dos-1": "കൊടുങ്കാറ്റിന് മുമ്പ് വസ്തുക്കൾ സ്റ്റോക്ക് ചെയ്യുക.",
      "hurricane-dos-2": "അധികൃതർ ഉത്തരവിട്ടാൽ ഒഴിഞ്ഞു പോവുക.",
      "hurricane-dos-3": "വിൻഡോസും ഡോറുകളും ഷട്ടേഴ്‌സോടെ സുരക്ഷിതമാക്കുക.",
      "hurricane-donts-1": "സൈക്ലോൺ സമയത്ത് കുറഞ്ഞ പ്രദേശങ്ങളിൽ തങ്ങരുത്.",
      "hurricane-donts-2": "വെള്ളം നിറഞ്ഞ റോഡുകളിൽ ഡ്രൈവ് ചെയ്യരുത്.",
      "hurricane-donts-3": "കൊടുങ്കാറ്റ് മുന്നറിയിപ്പുകൾ അവഗണിക്കരുത്.",
      "landslide-dos-1": "മലയിടങ്ങളിൽ ശക്തമായ മഴയ്ക്കിടെ ജാഗ്രത പാലിക്കുക.",
      "landslide-dos-2": "ച 귤ുകൾ അല്ലെങ്കിൽ നിലത്തിന്റെ ചലനം ശ്രദ്ധിക്കുക.",
      "landslide-dos-3": "ലോക്കൽ അധികൃതരുടെ നിർദ്ദേശങ്ങൾ ഉടൻ പാലിക്കുക.",
      "landslide-donts-1":
        "തീവ്ര ചരിവുകൾ അല്ലെങ്കിൽ അസ്ഥിരമായ പ്രദേശങ്ങളിൽ അരികിലായി പണിയാതിരിക്കുക.",
      "landslide-donts-2":
        "നീണ്ട മരങ്ങൾ പോലുള്ള മുന്നറിയിപ്പ് ലക്ഷണങ്ങൾ അവഗണിക്കരുത്.",
      "landslide-donts-3":
        "സുരക്ഷിതമാണെന്ന് പ്രഖ്യാപിക്കുന്നതുവരെ തിരിച്ച് വരരുത്.",
      "flood-dos-1": "വെള്ളപ്പൊക്ക സമയത്ത് ഉയർന്ന സ്ഥലത്തേക്ക് പോവുക.",
      "flood-dos-2": "സുരക്ഷിതമാണെങ്കിൽ വൈദ്യുതി ഓഫാക്കുക.",
      "flood-dos-3": "വിമോചന ഉത്തരവുകൾ ഉടൻ പാലിക്കുക.",
      "flood-donts-1": "വെള്ളപ്പൊക്കത്തിലൂടെ നടക്കരുതോ ഡ്രൈവ് ചെയ്യരുതോ.",
      "flood-donts-2":
        "വെള്ളപ്പൊക്ക മുന്നറിയിപ്പുകൾ അല്ലെങ്കിൽ അലർട്ടുകൾ അവഗണിക്കരുത്.",
      "flood-donts-3": "അധികൃതർ അനുവദിക്കുന്നതുവരെ തിരിച്ച് വരരുത്.",
    },
  },
  hi: {
    translation: {
      "dos-title": "करने योग्य बातें",
      "donts-title": "न करने योग्य बातें",
      "tsunami-dos-1": "ट्सुनामी की चेतावनी के बाद तुरंत ऊंचे स्थान पर जाएं।",
      "tsunami-dos-2":
        "स्थानीय अधिकारियों के निकासी आदेशों का तुरंत पालन करें।",
      "tsunami-dos-3": "तट से दूर रहें और ट्सुनामी को किनारे से देखने से बचें।",
      "tsunami-donts-1":
        "ट्सुनामी की लहरों को देखने के लिए समुद्र तट के पास न जाएं।",
      "tsunami-donts-2": "आधिकारिक चेतावनियों या सायरन को नजरअंदाज न करें।",
      "tsunami-donts-3":
        "अधिकारियों द्वारा सुरक्षित घोषित होने तक तटीय क्षेत्रों में वापस न आएं।",
      "earthquake-dos-1": "कंपन के दौरान झुकें, कवर करें और पकड़ें।",
      "earthquake-dos-2":
        "मजबूत मेज के नीचे या अंदरूनी दीवार के पास अंदर रहें।",
      "earthquake-dos-3": "आवश्यक वस्तुओं के साथ आपातकालीन किट तैयार करें।",
      "earthquake-donts-1": "कंपन के दौरान बाहर न भागें।",
      "earthquake-donts-2": "भूकंप के दौरान लिफ्ट का उपयोग न करें।",
      "earthquake-donts-3": "घबराएं नहीं या अफवाहें न फैलाएं।",
      "wildfire-dos-1": "जब अधिकारी कहें तो निकासी करें।",
      "wildfire-dos-2": "अपने घर के आसपास ज्वलनशील सामग्री को साफ करें।",
      "wildfire-dos-3": "स्थानीय समाचार अपडेट के माध्यम से सूचित रहें।",
      "wildfire-donts-1": "सूखे मौसम में आग न शुरू करें।",
      "wildfire-donts-2": "निकासी की सलाह दी जाए तो न रहें।",
      "wildfire-donts-3": "धुआं या आग की चेतावनियों को नजरअंदाज न करें।",
      "hurricane-dos-1": "तूफान से पहले आपूर्ति जमा करें।",
      "hurricane-dos-2": "अधिकारियों के आदेश पर निकासी करें।",
      "hurricane-dos-3": "खिड़कियों और दरवाजों को शटर से सुरक्षित करें।",
      "hurricane-donts-1": "चक्रवात के दौरान निचले क्षेत्रों में न रहें।",
      "hurricane-donts-2": "बाढ़ वाली सड़कों से ड्राइव न करें।",
      "hurricane-donts-3": "तूफान की चेतावनियों को नजरअंदाज न करें।",
      "landslide-dos-1": "पहाड़ी क्षेत्रों में भारी बारिश के दौरान सतर्क रहें।",
      "landslide-dos-2": "अगर दरारें या जमीन की गति दिखे तो निकासी करें।",
      "landslide-dos-3": "स्थानीय प्राधिकरण की सलाह का तुरंत पालन करें।",
      "landslide-donts-1":
        "खड़ी ढलानों या अस्थिर क्षेत्रों के पास निर्माण न करें।",
      "landslide-donts-2":
        "झुके हुए पेड़ों जैसे चेतावनी संकेतों को नजरअंदाज न करें।",
      "landslide-donts-3": "सुरक्षित घोषित होने तक वापस न आएं।",
      "flood-dos-1": "बाढ़ के दौरान ऊंचे स्थान पर जाएं।",
      "flood-dos-2": "सुरक्षित होने पर बिजली बंद करें।",
      "flood-dos-3": "निकासी आदेशों का तुरंत पालन करें।",
      "flood-donts-1": "बाढ़ के पानी से पैदल या गाड़ी न चलाएं।",
      "flood-donts-2": "बाढ़ की चेतावनियों या अलर्ट को नजरअंदाज न करें।",
      "flood-donts-3": "अधिकारियों की अनुमति तक वापस न आएं。",
    },
  },
};

i18n
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources,
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language if translation is missing
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
