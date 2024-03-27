GorillaPresenter.currentLanguage = "en";

GorillaPresenter.translateUI = function(){
  let language = GorillaPresenter.currentLanguage;
  let elements = document.getElementsByClassName("translatable");
  for(let i=0;i<elements.length;i++){
    let element = elements[i];
    let text = element.innerText;
    console.log("translating " + text);
    let translation = GorillaPresenter.translations[language][text];
    if(translation !== undefined){
        element.innerHTML = "<bdi>" + translation + "</bdi>";
      }
    }
  }

GorillaPresenter.translate = function(phrase,language) {
  if (GorillaPresenter.translations[language][phrase]) {
    return GorillaPresenter.translations[language][phrase];
    }
   else return phrase;
}

GorillaPresenter.loadLanguage = function(){
  if(BrowserFileSystem.fileExists("userdata/language") === false){
    GorillaPresenter.currentLanguage = "en";
  }
  else {
    GorillaPresenter.currentLanguage = BrowserFileSystem.readInternalTextFile("userdata/language").trim();
  }
}

GorillaPresenter.setLanguage = function(language){
  GorillaPresenter.currentLanguage = language;
  if(language !== "en"){
    GorillaPresenter.warn(GorillaPresenter.translate("Support for languages other than English is experimental. Please report any issues at",language) + " https://github.com/pulpgrinder/GorillaPresenter",3000);
  }
  GorillaPresenter.saveLanguage();
}


GorillaPresenter.selectLanguage = function(event){
  console.log("in selectLanguage");
  GorillaPresenter.setLanguage(event.target.value);
  console.log("language set to " + event.target.value);
  GorillaPresenter.renderMainMenu();
  GorillaPresenter.renderPrinterDialog();
  GorillaPresenter.showMainMenu();
}

GorillaPresenter.saveLanguage = function(){
  BrowserFileSystem.writeInternalTextFile("userdata/language",GorillaPresenter.currentLanguage);
}

GorillaPresenter.renderLanguages = function(mainMenu){
  GorillaPresenter.loadLanguage();
    let languageDiv = document.createElement("div")
    languageDiv.className = "gorilla-presenter-main-menu-item link";
    let langHTML = "<span class='translatable'>Language</span>: <select title='Language Selector' id='gorilla-presenter-language-selector' onchange='GorillaPresenter.selectLanguage(this.value)'>"
      let languageList = Object.keys(GorillaPresenter.translations);
      let selected = "";
      for(let i=0;i<languageList.length;i++){
        let language = languageList[i];
        if(language === GorillaPresenter.currentLanguage){
          selected = " selected";
        }
        else {
          selected = "";
        }
        langHTML += "<option value='" + language + "'" + selected + ">" + language + "</option>";
      }
      langHTML += "</select>";
      languageDiv.innerHTML = langHTML;
      mainMenu.appendChild(languageDiv);
      document.getElementById("gorilla-presenter-language-selector").onchange = GorillaPresenter.selectLanguage;
      GorillaPresenter.translateUI();
}
/* languages and phrase list
en, it, ar, bn, de, es, fa, fr, gu,hi, ja, ko, pt, ru, tr, zh-cn, zh-tw
Support for languages other than English is experimental. Please report any issues at
Heading
Body
Code
No slides. You'll have to make some first.
At first slide.
At last slide.
Theme
Slide Show
Enter/Exit Full Screen
Slide Editor
Media Library
Save Presentation
Theme Editor
Done
Documentation
About
Language
Print
Extra Settings
Paper Size
Slides Per Page
US Letter
In the print dialog, please set landscape orientation for one slide per page and portrait orientation for six slides per page
Slide List
*/
   
GorillaPresenter.translations = {
    "en": {
        "rtl": false,
        "About": "About",
        "At first slide.": "At first slide.",
        "At last slide.": "At last slide.",
        "Body": "Body",
        "Body Font": "Body Font",
        "Code": "Code",
        "Code Font": "Code Font",
        "Documentation": "Documentation",
        "Done": "Done",
        "Enter/Exit Full Screen": "Enter/Exit Full Screen",
        "Extra Settings": "Extra Settings",
        "Heading": "Heading",
        "Heading Font": "Heading Font",
        "In the print dialog, please set landscape orientation for one slide per page and portrait orientation for six slides per page": "In the print dialog, please set landscape orientation for one slide per page and portrait orientation for six slides per page",
        "Language": "Language",
        "Media Library": "Media Library",
        "No slides. You'll have to make some first.": "No slides. You'll have to make some first.",
        "Paper Size": "Paper Size",
        "Print": "Print",
        "Save Presentation": "Save Presentation",
        "Slide Editor": "Slide Editor",
        "Slide List": "Slide List",
        "Slide Show": "Slide Show",
        "Slides Per Page": "Slides Per Page",
        "Support for languages other than English is experimental. Please report any issues at": "Support for languages other than English is experimental. Please report any issues at",
        "Theme": "Theme",
        "Theme Editor": "Theme Editor",
        "US Letter": "US Letter"
    },
    "ar": {
        "rtl": true,
        "About": "حول",
        "At first slide.": "عند الشريحة الأولى.",
        "At last slide.": "عند الشريحة الأخيرة.",
        "Body": "النص",
        "Body Font": "خط النص",
        "Code": "كود",
        "Code Font": "خط الكود",
        "Documentation": "التوثيق",
        "Done": "تم",
        "Enter/Exit Full Screen": "دخول/خروج من وضع الشاشة الكاملة",
        "Extra Settings": "إعدادات إضافية",
        "Heading": "العنوان",
        "Heading Font": "خط العنوان",
        "In the print dialog, please set landscape orientation for one slide per page and portrait orientation for six slides per page": "في مربع حوار الطباعة، يرجى ضبط التوجيه الأفقي لشريحة واحدة لكل صفحة والتوجيه الرأسي لست شرائح لكل صفحة",
        "Language": "اللغة",
        "Media Library": "مكتبة الوسائط",
        "No slides. You'll have to make some first.": "لا توجد شرائح. يجب عليك إنشاء بعضها أولاً.",
        "Paper Size": "حجم الورق",
        "Print": "طباعة",
        "Save Presentation": "حفظ العرض",
        "Slide Editor": "محرر الشرائح",
        "Slide List": "قائمة الشرائح",
        "Slide Show": "عرض الشرائح",
        "Slides Per Page": "الشرائح لكل صفحة",
        "Support for languages other than English is experimental. Please report any issues at": "الدعم للغات غير الإنجليزية تجريبي. يرجى الإبلاغ عن أي مشاكل في",
        "Theme": "الثيم",
        "Theme Editor": "محرر الثيم"
    },
    "bn": {
        "rtl": false,
        "About": "সম্পর্কে",
        "At first slide.": "প্রথম স্লাইডে.",
        "At last slide.": "শেষ স্লাইডে.",
        "Body": "বডি",
        "Body Font": "বডি ফন্ট",
        "Code": "কোড",
        "Code Font": "কোড ফন্ট",
        "Documentation": "ডকুমেন্টেশন",
        "Done": "সম্পন্ন",
        "Enter/Exit Full Screen": "পূর্ণ স্ক্রিনে প্রবেশ/প্রস্থান",
        "Extra Settings": "অতিরিক্ত সেটিংস",
        "Heading": "শিরোনাম",
        "Heading Font": "হেডিং ফন্ট",
        "In the print dialog, please set landscape orientation for one slide per page and portrait orientation for six slides per page": "প্রিন্ট ডায়ালগে, দয়া করে এক পৃষ্ঠা প্রতি একটি স্লাইডের জন্য ল্যান্ডস্কেপ অভিমুখ এবং ছয় স্লাইডের জন্য পোর্ট্রেট অভিমুখ সেট করুন",
        "Language": "ভাষা",
        "Media Library": "মিডিয়া লাইব্রেরি",
        "No slides. You'll have to make some first.": "কোন স্লাইড নেই। আপনাকে প্রথমে কিছু তৈরি করতে হবে।",
        "Paper Size": "কাগজের আকার",
        "Print": "প্রিন্ট",
        "Save Presentation": "প্রেজেন্টেশন সংরক্ষণ করুন",
        "Slide Editor": "স্লাইড সম্পাদক",
        "Slide List": "স্লাইড তালিকা",
        "Slide Show": "স্লাইড শো",
        "Slides Per Page": "প্রতি পৃষ্ঠায় স্লাইড",
        "Support for languages other than English is experimental. Please report any issues at": "ইংরেজি ছাড়া অন্যান্য ভাষার জন্য সমর্থন পরীক্ষামূলক। অনুগ্রহ করে কোনো সমস্যা জানান",
        "Theme": "থিম",
        "Theme Editor": "থিম সম্পাদক",
        "US Letter": "ইউএস লেটার"
    },
    "de": {
        "rtl": false,
        "About": "Über",
        "At first slide.": "Bei der ersten Folie.",
        "At last slide.": "Bei der letzten Folie.",
        "Body": "Körper",
        "Body Font": "Textkörper-Schriftart",
        "Code": "Code",
        "Code Font": "Code-Schriftart",
        "Documentation": "Dokumentation",
        "Done": "Fertig",
        "Enter/Exit Full Screen": "Vollbild ein/aus",
        "Extra Settings": "Zusätzliche Einstellungen",
        "Heading": "Überschrift",
        "Heading Font": "Überschrift-Schriftart",
        "In the print dialog, please set landscape orientation for one slide per page and portrait orientation for six slides per page": "Bitte stellen Sie im Druckdialog die Landschaftsausrichtung für eine Folie pro Seite und die Porträtausrichtung für sechs Folien pro Seite ein",
        "Language": "Sprache",
        "Media Library": "Medienbibliothek",
        "No slides. You'll have to make some first.": "Keine Folien. Sie müssen zuerst einige erstellen.",
        "Paper Size": "Papiergröße",
        "Print": "Drucken",
        "Save Presentation": "Präsentation speichern",
        "Slide Editor": "Folien-Editor",
        "Slide List": "Folienliste",
        "Slide Show": "Diashow",
        "Slides Per Page": "Folien pro Seite",
        "Support for languages other than English is experimental. Please report any issues at": "Die Unterstützung für andere Sprachen als Englisch ist experimentell. Bitte melden Sie Probleme unter",
        "Theme": "Thema",
        "Theme Editor": "Thema-Editor",
        "US Letter": "US-Brief"
    },
    "es": {
      "rtl": false,
      "About": "Acerca de",
      "At first slide.": "En la primera diapositiva.",
      "At last slide.": "En la última diapositiva.",
      "Body": "Cuerpo",
      "Body Font": "Fuente del cuerpo",
      "Code": "Código",
      "Code Font": "Fuente del código",
      "Documentation": "Documentación",
      "Done": "Hecho",
      "Enter/Exit Full Screen": "Entrar/Salir de pantalla completa",
      "Extra Settings": "Configuraciones extras",
      "Heading": "Encabezado",
      "Heading Font": "Fuente del encabezado",
      "In the print dialog, please set landscape orientation for one slide per page and portrait orientation for six slides per page": "En el cuadro de diálogo de impresión, por favor establezca orientación horizontal para una diapositiva por página y orientación vertical para seis diapositivas por página",
      "Language": "Idioma",
      "Media Library": "Biblioteca de medios",
      "No slides. You'll have to make some first.": "No hay diapositivas. Tendrás que crear algunas primero.",
      "Paper Size": "Tamaño de papel",
      "Print": "Imprimir",
      "Save Presentation": "Guardar presentación",
      "Slide Editor": "Editor de diapositivas",
      "Slide List": "Lista de diapositivas",
      "Slide Show": "Presentación de diapositivas",
      "Slides Per Page": "Diapositivas por página",
      "Support for languages other than English is experimental. Please report any issues at": "El soporte para idiomas diferentes al inglés es experimental. Por favor, reporta cualquier problema en",
      "Theme": "Tema",
      "Theme Editor": "Editor de tema",
      "US Letter": "Carta US"
  },
      "fa": {
        "rtl": true,
        "About": "درباره",
        "At first slide.": "در اسلاید اول.",
        "At last slide.": "در آخرین اسلاید.",
        "Body": "متن اصلی",
        "Body Font": "فونت متن",
        "Code": "کد",
        "Code Font": "فونت کد",
        "Documentation": "مستندات",
        "Done": "انجام شد",
        "Enter/Exit Full Screen": "ورود/خروج از تمام صفحه",
        "Extra Settings": "تنظیمات اضافی",
        "Heading": "سرفصل",
        "Heading Font": "فونت سرفصل",
        "In the print dialog, please set landscape orientation for one slide per page and portrait orientation for six slides per page": "در پنجره چاپ، لطفاً جهت صفحه را برای یک اسلاید در هر صفحه افقی و برای شش اسلاید در هر صفحه عمودی تنظیم کنید",
        "Language": "زبان",
        "Media Library": "کتابخانه رسانه",
        "No slides. You'll have to make some first.": "اسلایدی وجود ندارد. ابتدا باید برخی را ایجاد کنید.",
        "Paper Size": "اندازه کاغذ",
        "Print": "چاپ",
        "Save Presentation": "ذخیره ارائه",
        "Slide Editor": "ویرایشگر اسلاید",
        "Slide List": "لیست اسلایدها",
        "Slide Show": "نمایش اسلاید",
        "Slides Per Page": "اسلایدها در هر صفحه",
        "Support for languages other than English is experimental. Please report any issues at": "پشتیبانی از زبان‌های غیر انگلیسی آزمایشی است. لطفاً هرگونه مشکلی را گزارش دهید",
        "Theme": "تم",
        "Theme Editor": "ویرایشگر تم",
        "US Letter": "نامه US"
    },
    "fr": {
        "rtl": false,
        "About": "À propos",
        "At first slide.": "À la première diapositive.",
        "At last slide.": "À la dernière diapositive.",
        "Body": "Corps",
        "Body Font": "Police du corps",
        "Code": "Code",
        "Code Font": "Police du code",
        "Documentation": "Documentation",
        "Done": "Terminé",
        "Enter/Exit Full Screen": "Entrer/Sortir du plein écran",
        "Extra Settings": "Paramètres supplémentaires",
        "Heading": "En-tête",
        "Heading Font": "Police de l'en-tête",
        "In the print dialog, please set landscape orientation for one slide per page and portrait orientation for six slides per page": "Dans la boîte de dialogue d'impression, veuillez régler l'orientation paysage pour une diapositive par page et l'orientation portrait pour six diapositives par page",
        "Language": "Langue",
        "Media Library": "Bibliothèque de médias",
        "No slides. You'll have to make some first.": "Pas de diapositives. Vous devrez en créer quelques-unes d'abord.",
        "Paper Size": "Taille du papier",
        "Print": "Imprimer",
        "Save Presentation": "Sauvegarder la présentation",
        "Slide Editor": "Éditeur de diapositives",
        "Slide List": "Liste des diapositives",
        "Slide Show": "Diaporama",
        "Slides Per Page": "Diapositives par page",
        "Support for languages other than English is experimental. Please report any issues at": "Le support pour les langues autres que l'anglais est expérimental. Veuillez signaler tout problème à",
        "Theme": "Thème",
        "Theme Editor": "Éditeur de thème",
        "US Letter": "Lettre US"
    },
"hi": {
  "rtl": false,
  "About": "के बारे में",
  "At first slide.": "पहले स्लाइड पर।",
  "At last slide.": "अंतिम स्लाइड पर।",
  "Body": "बॉडी",
  "Body Font": "बॉडी फॉन्ट",
  "Code": "कोड",
  "Code Font": "कोड फॉन्ट",
  "Documentation": "दस्तावेज़ीकरण",
  "Done": "हो गया",
  "Enter/Exit Full Screen": "पूर्ण स्क्रीन में प्रवेश करें/बाहर निकलें",
  "Extra Settings": "अतिरिक्त सेटिंग्स",
  "Heading": "शीर्षक",
  "Heading Font": "शीर्षक फॉन्ट",
  "In the print dialog, please set landscape orientation for one slide per page and portrait orientation for six slides per page": "प्रिंट डायलॉग में, कृपया एक पृष्ठ पर एक स्लाइड के लिए लैंडस्केप ओरिएंटेशन सेट करें और छह स्लाइड्स पर पोर्ट्रेट ओरिएंटेशन सेट करें",
  "Language": "भाषा",
  "Media Library": "मीडिया लाइब्रेरी",
  "No slides. You'll have to make some first.": "कोई स्लाइड्स नहीं हैं। आपको पहले कुछ बनाना होगा।",
  "Paper Size": "कागज का आकार",
  "Print": "प्रिंट",
  "Save Presentation": "प्रस्तुतिकरण सहेजें",
  "Slide Editor": "स्लाइड संपादक",
  "Slide List": "स्लाइड सूची",
  "Slide Show": "स्लाइड शो",
  "Slides Per Page": "प्रति पृष्ठ स्लाइड्स",
  "Support for languages other than English is experimental. Please report any issues at": "अंग्रेजी के अलावा अन्य भाषाओं के लिए समर्थन प्रयोगात्मक है। कृपया किसी भी समस्या की रिपोर्ट करें",
  "Theme": "थीम",
  "Theme Editor": "थीम संपादक",
  "US Letter": "यूएस लेटर"
},
"ja": {
  "rtl": false,
  "About": "約",
  "At first slide.": "最初のスライドで。",
  "At last slide.": "最後のスライドで。",
  "Body": "ボディ",
  "Body Font": "ボディフォント",
  "Code": "コード",
  "Code Font": "コードフォント",
  "Documentation": "ドキュメンテーション",
  "Done": "完了",
  "Enter/Exit Full Screen": "全画面表示を入力/終了",
  "Extra Settings": "追加設定",
  "Heading": "見出し",
  "Heading Font": "見出しフォント",
  "In the print dialog, please set landscape orientation for one slide per page and portrait orientation for six slides per page": "印刷ダイアログでは、1ページにつき1スライドの場合はランドスケープ向きを、6スライドの場合はポートレート向きを設定してください",
  "Language": "言語",
  "Media Library": "メディアライブラリ",
  "No slides. You'll have to make some first.": "スライドがありません。最初にいくつか作成する必要があります。",
  "Paper Size": "紙のサイズ",
  "Print": "印刷",
  "Save Presentation": "プレゼンテーションを保存",
  "Slide Editor": "スライドエディタ",
  "Slide List": "スライドリスト",
  "Slide Show": "スライドショー",
  "Slides Per Page": "ページあたりのスライド数",
  "Support for languages other than English is experimental. Please report any issues at": "英語以外の言語に対するサポートは実験的です。問題があれば報告してください",
  "Theme": "テーマ",
  "Theme Editor": "テーマエディター",
  "US Letter": "USレター"
},
"ko": {
  "rtl": false,
  "About": "정보",
  "At first slide.": "첫 번째 슬라이드에서.",
  "At last slide.": "마지막 슬라이드에서.",
  "Body": "본문",
  "Body Font": "본문 글꼴",
  "Code": "코드",
  "Code Font": "코드 글꼴",
  "Documentation": "문서",
  "Done": "완료",
  "Enter/Exit Full Screen": "전체 화면 입력/종료",
  "Extra Settings": "추가 설정",
  "Heading": "제목",
  "Heading Font": "제목 글꼴",
  "In the print dialog, please set landscape orientation for one slide per page and portrait orientation for six slides per page": "인쇄 대화 상자에서 한 페이지에 슬라이드 하나는 가로 방향을, 여섯 슬라이드는 세로 방향을 설정해 주세요",
  "Language": "언어",
  "Media Library": "미디어 라이브러리",
  "No slides. You'll have to make some first.": "슬라이드가 없습니다. 먼저 몇 개 만들어야 합니다.",
  "Paper Size": "용지 크기",
  "Print": "인쇄",
  "Save Presentation": "발표 저장",
  "Slide Editor": "슬라이드 편집기",
  "Slide List": "슬라이드 목록",
  "Slide Show": "슬라이드 쇼",
  "Slides Per Page": "페이지당 슬라이드 수",
  "Support for languages other than English is experimental. Please report any issues at": "영어 이외의 언어 지원은 실험적입니다. 문제가 있으면 보고해 주세요",
  "Theme": "테마",
  "Theme Editor": "테마 편집기",
  "US Letter": "US 레터"
},
"pt": {
  "rtl": false,
  "About": "Sobre",
  "At first slide.": "Na primeira slide.",
  "At last slide.": "Na última slide.",
  "Body": "Corpo",
  "Body Font": "Fonte do corpo",
  "Code": "Código",
  "Code Font": "Fonte do código",
  "Documentation": "Documentação",
  "Done": "Concluído",
  "Enter/Exit Full Screen": "Entrar/Sair da tela cheia",
  "Extra Settings": "Configurações extras",
  "Heading": "Cabeçalho",
  "Heading Font": "Fonte do cabeçalho",
  "In the print dialog, please set landscape orientation for one slide per page and portrait orientation for six slides per page": "No diálogo de impressão, por favor, configure a orientação paisagem para uma slide por página e a orientação retrato para seis slides por página",
  "Language": "Idioma",
  "Media Library": "Biblioteca de mídia",
  "No slides. You'll have to make some first.": "Sem slides. Você terá que fazer alguns primeiro.",
  "Paper Size": "Tamanho do papel",
  "Print": "Imprimir",
  "Save Presentation": "Salvar apresentação",
  "Slide Editor": "Editor de slides",
  "Slide List": "Lista de slides",
  "Slide Show": "Apresentação de slides",
  "Slides Per Page": "Slides por página",
  "Support for languages other than English is experimental. Please report any issues at": "O suporte para idiomas além do inglês é experimental. Por favor, reporte quaisquer problemas em",
  "Theme": "Tema",
  "Theme Editor": "Editor de tema",
  "US Letter": "Carta US"
},
"ru": {
  "rtl": false,
  "About": "О программе",
  "At first slide.": "На первом слайде.",
  "At last slide.": "На последнем слайде.",
  "Body": "Тело",
  "Body Font": "Шрифт тела",
  "Code": "Код",
  "Code Font": "Шрифт кода",
  "Documentation": "Документация",
  "Done": "Готово",
  "Enter/Exit Full Screen": "Войти/Выйти из полноэкранного режима",
  "Extra Settings": "Дополнительные настройки",
  "Heading": "Заголовок",
  "Heading Font": "Шрифт заголовков",
  "In the print dialog, please set landscape orientation for one slide per page and portrait orientation for six slides per page": "В диалоговом окне печати, пожалуйста, установите альбомную ориентацию для одного слайда на страницу и портретную ориентацию для шести слайдов на страницу",
  "Language": "Язык",
  "Media Library": "Медиатека",
  "No slides. You'll have to make some first.": "Слайдов нет. Сначала вам нужно создать некоторые.",
  "Paper Size": "Размер бумаги",
  "Print": "Печать",
  "Save Presentation": "Сохранить презентацию",
  "Slide Editor": "Редактор слайдов",
  "Slide List": "Список слайдов",
  "Slide Show": "Слайд-шоу",
  "Slides Per Page": "Слайдов на страницу",
  "Support for languages other than English is experimental. Please report any issues at": "Поддержка языков, отличных от английского, носит экспериментальный характер. Пожалуйста, сообщайте о любых проблемах",
  "Theme": "Тема",
  "Theme Editor": "Редактор тем",
  "US Letter": "Американский лист"
},
"tr": {
  "rtl": false,
  "About": "Hakkında",
  "At first slide.": "İlk slaytta.",
  "At last slide.": "Son slaytta.",
  "Body": "Gövde",
  "Body Font": "Gövde Yazı Tipi",
  "Code": "Kod",
  "Code Font": "Kod Yazı Tipi",
  "Documentation": "Dokümantasyon",
  "Done": "Tamamlandı",
  "Enter/Exit Full Screen": "Tam Ekranı Aç/Kapat",
  "Extra Settings": "Ekstra Ayarlar",
  "Heading": "Başlık",
  "Heading Font": "Başlık Yazı Tipi",
  "In the print dialog, please set landscape orientation for one slide per page and portrait orientation for six slides per page": "Yazdırma diyalogunda, lütfen bir sayfada bir slayt için manzara yönünü ve altı slayt için portre yönünü ayarlayın",
  "Language": "Dil",
  "Media Library": "Medya Kütüphanesi",
  "No slides. You'll have to make some first.": "Slayt yok. Önce birkaç tane yapmanız gerekecek.",
  "Paper Size": "Kağıt Boyutu",
  "Print": "Yazdır",
  "Save Presentation": "Sunumu Kaydet",
  "Slide Editor": "Slayt Düzenleyici",
  "Slide List": "Slayt Listesi",
  "Slide Show": "Slayt Gösterisi",
  "Slides Per Page": "Sayfa Başına Slayt",
  "Support for languages other than English is experimental. Please report any issues at": "İngilizce dışındaki diller için destek deneyseldir. Lütfen herhangi bir sorunu bildirin",
  "Theme": "Tema",
  "Theme Editor": "Tema Düzenleyici",
  "US Letter": "US Mektup"
},
"zh-cn": {
  "rtl": false,
  "About": "关于",
  "At first slide.": "在第一张幻灯片。",
  "At last slide.": "在最后一张幻灯片。",
  "Body": "正文",
  "Body Font": "正文字体",
  "Code": "代码",
  "Code Font": "代码字体",
  "Documentation": "文档",
  "Done": "完成",
  "Enter/Exit Full Screen": "进入/退出全屏",
  "Extra Settings": "额外设置",
  "Heading": "标题",
  "Heading Font": "标题字体",
  "In the print dialog, please set landscape orientation for one slide per page and portrait orientation for six slides per page": "在打印对话框中，请为每页一张幻灯片设置横向布局，为每页六张幻灯片设置纵向布局",
  "Language": "语言",
  "Media Library": "媒体库",
  "No slides. You'll have to make some first.": "没有幻灯片。你首先需要制作一些。",
  "Paper Size": "纸张大小",
  "Print": "打印",
  "Save Presentation": "保存演示",
  "Slide Editor": "幻灯片编辑器",
  "Slide List": "幻灯片列表",
  "Slide Show": "幻灯片放映",
  "Slides Per Page": "每页幻灯片数",
  "Support for languages other than English is experimental. Please report any issues at": "对非英语语言的支持是实验性的。请报告任何问题",
  "Theme": "主题",
  "Theme Editor": "主题编辑器",
  "US Letter": "美国信纸"
},
"zh-tw": {
  "rtl": false,
  "About": "關於",
  "At first slide.": "在第一張幻燈片。",
  "At last slide.": "在最後一張幻燈片。",
  "Body": "正文",
  "Body Font": "正文字體",
  "Code": "代碼",
  "Code Font": "代碼字體",
  "Documentation": "文檔",
  "Done": "完成",
  "Enter/Exit Full Screen": "進入/退出全屏",
  "Extra Settings": "額外設置",
  "Heading": "標題",
  "Heading Font": "標題字體",
  "In the print dialog, please set landscape orientation for one slide per page and portrait orientation for six slides per page": "在打印對話框中，請為每頁一張幻燈片設置橫向佈局，為每頁六張幻燈片設置縱向佈局",
  "Language": "語言",
  "Media Library": "媒體庫",
  "No slides. You'll have to make some first.": "沒有幻燈片。您首先需要製作一些。",
  "Paper Size": "紙張大小",
  "Print": "打印",
  "Save Presentation": "保存演示",
  "Slide Editor": "幻燈片編輯器",
  "Slide List": "幻燈片列表",
  "Slide Show": "幻燈片放映",
  "Slides Per Page": "每頁幻燈片數",
  "Support for languages other than English is experimental. Please report any issues at": "對非英語語言的支持是實驗性的。請報告任何問題",
  "Theme": "主題",
  "Theme Editor": "主題編輯器",
  "US Letter": "美國信紙"
},

}