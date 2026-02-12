import { writable } from 'svelte/store';

// Helper para detectar si estamos en el navegador
const browser = typeof window !== 'undefined';

export type Language = 'es' | 'en' | 'fr' | 'de' | 'ru';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  es: {
    // General
    'app.title': 'Conference League o Interpol',
    'app.subtitle': '¿Puedes distinguir entre un jugador de fútbol y un criminal?',
    
    // Game Card
    'game.conferenceButton': 'Conference League',
    'game.interpolButton': 'Interpol',
    'game.nextButton': 'Siguiente Persona',
    'game.imageAlt': 'Persona misteriosa',
    
    // Result Card
    'result.correct': '¡CORRECTO!',
    'result.wrong': '¡INCORRECTO!',
    'result.wasPlayer': 'Era un jugador de Conference League',
    'result.wasCriminal': 'Era un criminal de Interpol',
    'result.playerInfo': 'Jugador',
    'result.criminalInfo': 'Criminal',
    'result.team': 'Equipo',
    'result.crime': 'Crimen',
    'result.country': 'País',
    
    // Data prefixes
    'data.criminal': 'Criminal',
    'data.player': 'Futbolista',
    'data.crime': 'Crimen',
    'data.of': 'del',
    
    // Nationalities
    'nationality.español': 'español',
    'nationality.israelí': 'israelí',
    'nationality.ruso': 'ruso',
    'nationality.estadounidense': 'estadounidense',
    'nationality.checo': 'checo',
    'nationality.kosovar': 'kosovar',
    'nationality.ucraniano': 'ucraniano',
    'nationality.serbio': 'serbio',
    'nationality.alemán': 'alemán',
    'nationality.croata': 'croata',
    'nationality.polaco': 'polaco',
    'nationality.italiano': 'italiano',
    'nationality.francés': 'francés',
    'nationality.portugués': 'portugués',
    'nationality.brasileño': 'brasileño',
    'nationality.argentino': 'argentino',
    'nationality.chileno': 'chileno',
    'nationality.colombiano': 'colombiano',
    'nationality.mexicano': 'mexicano',
    'nationality.turco': 'turco',
    'nationality.griego': 'griego',
    'nationality.búlgaro': 'búlgaro',
    'nationality.rumano': 'rumano',
    'nationality.húngaro': 'húngaro',
    'nationality.austriaco': 'austriaco',
    'nationality.suizo': 'suizo',
    'nationality.belga': 'belga',
    'nationality.holandés': 'holandés',
    'nationality.danés': 'danés',
    'nationality.sueco': 'sueco',
    'nationality.noruego': 'noruego',
    'nationality.finlandés': 'finlandés',
    'nationality.escocés': 'escocés',
    'nationality.galés': 'galés',
    'nationality.irlandés': 'irlandés',
    'nationality.inglés': 'inglés',
    'nationality.bosnio': 'bosnio',
    'nationality.albanés': 'albanés',
    'nationality.macedonio': 'macedonio',
    'nationality.esloveno': 'esloveno',
    'nationality.eslovaco': 'eslovaco',
    
    // Streak
    'streak.current': 'Racha Actual',
    'streak.record': 'Récord',
    
    // Settings Modal
    'settings.title': 'Configuración',
    'settings.darkMode': 'Modo Oscuro',
    'settings.darkModeDesc': 'Cambia entre tema claro y oscuro',
    'settings.language': 'Idioma',
    'settings.languageDesc': 'Selecciona el idioma de la aplicación',
    'settings.animations': 'Animaciones',
    'settings.animationsDesc': 'Activar animaciones visuales',
    
    // Languages
    'lang.es': 'Español',
    'lang.en': 'English',
    'lang.fr': 'Français',
    'lang.de': 'Deutsch',
    'lang.ru': 'Русский',
    
    // Share Modal
    'share.title': '¡INCREÍBLE!',
    'share.message': '¡Alcanzaste una racha de {streak} aciertos perfectos! 🔥',
    'share.shareText': '¡Conseguí una racha de {streak} aciertos en Conference League o Interpol! ⚽🚨',
    'share.shareButton': 'Compartir',
    'share.twitterButton': 'Compartir en X',
    'share.continueButton': 'Continuar Jugando',
    'share.copied': '¡Texto copiado al portapapeles!',
    
    // Completion Modal
    'completion.title': '¡FELICIDADES!',
    'completion.allCompleted': '¡HAS COMPLETADO TODO!',
    'completion.message': 'Has adivinado correctamente TODAS las personas del juego con una racha perfecta de {streak} aciertos. ¡Eres un maestro distinguiendo entre jugadores de Conference League y criminales de Interpol!',
    'completion.shareText': '¡Completé TODAS las personas en Conference League o Interpol con {streak} aciertos perfectos! 🏆⚽🚨',
    'completion.shareQuestion': '¿Puedes hacerlo tú?',
    'completion.shareButton': 'Compartir Logro',
    'completion.twitterButton': 'Compartir en X',
    'completion.restartButton': 'Jugar de nuevo',
  },
  en: {
    // General
    'app.title': 'Conference League or Interpol',
    'app.subtitle': 'Can you tell the difference between a football player and a criminal?',
    
    // Game Card
    'game.conferenceButton': 'Conference League',
    'game.interpolButton': 'Interpol',
    'game.nextButton': 'Next Person',
    'game.imageAlt': 'Mystery person',
    
    // Result Card
    'result.correct': 'CORRECT!',
    'result.wrong': 'WRONG!',
    'result.wasPlayer': 'It was a Conference League player',
    'result.wasCriminal': 'It was an Interpol criminal',
    'result.playerInfo': 'Player',
    'result.criminalInfo': 'Criminal',
    'result.team': 'Team',
    'result.crime': 'Crime',
    'result.country': 'Country',
    
    // Data prefixes
    'data.criminal': 'Criminal',
    'data.player': 'Footballer',
    'data.crime': 'Crime',
    'data.of': 'of',
    
    // Streak
    'streak.current': 'Current Streak',
    'streak.record': 'Record',
    
    // Settings Modal
    'settings.title': 'Settings',
    'settings.darkMode': 'Dark Mode',
    'settings.darkModeDesc': 'Switch between light and dark theme',
    'settings.language': 'Language',
    'settings.languageDesc': 'Select application language',
    'settings.animations': 'Animations',
    'settings.animationsDesc': 'Enable visual animations',
    
    // Languages
    'lang.es': 'Español',
    'lang.en': 'English',
    'lang.fr': 'Français',
    'lang.de': 'Deutsch',
    'lang.ru': 'Русский',
    
    // Share Modal
    'share.title': 'AMAZING!',
    'share.message': 'You reached a streak of {streak} perfect answers! 🔥',
    'share.shareText': 'I got a streak of {streak} correct answers in Conference League or Interpol! ⚽🚨',
    'share.shareButton': 'Share',
    'share.twitterButton': 'Share on X',
    'share.continueButton': 'Continue Playing',
    'share.copied': 'Text copied to clipboard!',
    
    // Completion Modal
    'completion.title': 'CONGRATULATIONS!',
    'completion.allCompleted': 'YOU COMPLETED EVERYTHING!',
    'completion.message': 'You guessed ALL the people in the game correctly with a perfect streak of {streak} correct answers. You are a master at distinguishing between Conference League players and Interpol criminals!',
    'completion.shareText': 'I completed ALL people in Conference League or Interpol with {streak} perfect correct answers! 🏆⚽🚨',
    'completion.shareQuestion': 'Can you do it?',
    'completion.shareButton': 'Share Achievement',
    'completion.twitterButton': 'Share on X',
    'completion.restartButton': 'Play Again',
  },
  fr: {
    // General
    'app.title': 'Conference League ou Interpol',
    'app.subtitle': 'Pouvez-vous faire la différence entre un footballeur et un criminel ?',
    
    // Game Card
    'game.conferenceButton': 'Conference League',
    'game.interpolButton': 'Interpol',
    'game.nextButton': 'Personne Suivante',
    'game.imageAlt': 'Personne mystérieuse',
    
    // Result Card
    'result.correct': 'CORRECT !',
    'result.wrong': 'INCORRECT !',
    'result.wasPlayer': 'C\'était un joueur de Conference League',
    'result.wasCriminal': 'C\'était un criminel d\'Interpol',
    'result.playerInfo': 'Joueur',
    'result.criminalInfo': 'Criminel',
    'result.team': 'Équipe',
    'result.crime': 'Crime',
    'result.country': 'Pays',
    
    // Data prefixes
    'data.criminal': 'Criminel',
    'data.player': 'Footballeur',
    'data.crime': 'Crime',
    'data.of': 'du',
    
    // Streak
    'streak.current': 'Série Actuelle',
    'streak.record': 'Record',
    
    // Settings Modal
    'settings.title': 'Paramètres',
    'settings.darkMode': 'Mode Sombre',
    'settings.darkModeDesc': 'Basculer entre thème clair et sombre',
    'settings.language': 'Langue',
    'settings.languageDesc': 'Sélectionner la langue de l\'application',
    'settings.animations': 'Animations',
    'settings.animationsDesc': 'Activer les animations visuelles',
    
    // Languages
    'lang.es': 'Español',
    'lang.en': 'English',
    'lang.fr': 'Français',
    'lang.de': 'Deutsch',
    'lang.ru': 'Русский',
    
    // Share Modal
    'share.title': 'INCROYABLE !',
    'share.message': 'Vous avez atteint une série de {streak} réponses parfaites ! 🔥',
    'share.shareText': 'J\'ai obtenu une série de {streak} bonnes réponses dans Conference League ou Interpol ! ⚽🚨',
    'share.shareButton': 'Partager',
    'share.twitterButton': 'Partager sur X',
    'share.continueButton': 'Continuer à Jouer',
    'share.copied': 'Texte copié dans le presse-papiers !',
    
    // Completion Modal
    'completion.title': 'FÉLICITATIONS !',
    'completion.allCompleted': 'VOUS AVEZ TOUT COMPLÉTÉ !',
    'completion.message': 'Vous avez deviné correctement TOUTES les personnes du jeu avec une série parfaite de {streak} bonnes réponses. Vous êtes un maître pour distinguer les joueurs de Conference League des criminels d\'Interpol !',
    'completion.shareText': 'J\'ai complété TOUTES les personnes dans Conference League ou Interpol avec {streak} réponses parfaites ! 🏆⚽🚨',
    'completion.shareQuestion': 'Pouvez-vous le faire ?',
    'completion.shareButton': 'Partager la Réussite',
    'completion.twitterButton': 'Partager sur X',
    'completion.restartButton': 'Rejouer',
  },
  de: {
    // General
    'app.title': 'Conference League oder Interpol',
    'app.subtitle': 'Können Sie zwischen einem Fußballspieler und einem Kriminellen unterscheiden?',
    
    // Game Card
    'game.conferenceButton': 'Conference League',
    'game.interpolButton': 'Interpol',
    'game.nextButton': 'Nächste Person',
    'game.imageAlt': 'Mysteriöse Person',
    
    // Result Card
    'result.correct': 'RICHTIG!',
    'result.wrong': 'FALSCH!',
    'result.wasPlayer': 'Es war ein Conference League Spieler',
    'result.wasCriminal': 'Es war ein Interpol Krimineller',
    'result.playerInfo': 'Spieler',
    'result.criminalInfo': 'Krimineller',
    'result.team': 'Team',
    'result.crime': 'Verbrechen',
    'result.country': 'Land',
    
    // Data prefixes
    'data.criminal': 'Krimineller',
    'data.player': 'Fußballspieler',
    'data.crime': 'Verbrechen',
    'data.of': 'von',
    
    // Streak
    'streak.current': 'Aktuelle Serie',
    'streak.record': 'Rekord',
    
    // Settings Modal
    'settings.title': 'Einstellungen',
    'settings.darkMode': 'Dunkler Modus',
    'settings.darkModeDesc': 'Zwischen hellem und dunklem Thema wechseln',
    'settings.language': 'Sprache',
    'settings.languageDesc': 'Anwendungssprache auswählen',
    'settings.animations': 'Animationen',
    'settings.animationsDesc': 'Visuelle Animationen aktivieren',
    
    // Languages
    'lang.es': 'Español',
    'lang.en': 'English',
    'lang.fr': 'Français',
    'lang.de': 'Deutsch',
    'lang.ru': 'Русский',
    
    // Share Modal
    'share.title': 'UNGLAUBLICH!',
    'share.message': 'Sie haben eine Serie von {streak} perfekten Antworten erreicht! 🔥',
    'share.shareText': 'Ich habe eine Serie von {streak} richtigen Antworten in Conference League oder Interpol erreicht! ⚽🚨',
    'share.shareButton': 'Teilen',
    'share.twitterButton': 'Auf X teilen',
    'share.continueButton': 'Weiterspielen',
    'share.copied': 'Text in Zwischenablage kopiert!',
    
    // Completion Modal
    'completion.title': 'GLÜCKWUNSCH!',
    'completion.allCompleted': 'SIE HABEN ALLES ABGESCHLOSSEN!',
    'completion.message': 'Sie haben ALLE Personen im Spiel richtig erraten mit einer perfekten Serie von {streak} richtigen Antworten. Sie sind ein Meister darin, Conference League Spieler von Interpol Kriminellen zu unterscheiden!',
    'completion.shareText': 'Ich habe ALLE Personen in Conference League oder Interpol mit {streak} perfekten richtigen Antworten abgeschlossen! 🏆⚽🚨',
    'completion.shareQuestion': 'Können Sie das auch?',
    'completion.shareButton': 'Erfolg teilen',
    'completion.twitterButton': 'Auf X teilen',
    'completion.restartButton': 'Erneut spielen',
  },
  ru: {
    // General
    'app.title': 'Лига Конференций или Интерпол',
    'app.subtitle': 'Можете ли вы отличить футболиста от преступника?',
    
    // Game Card
    'game.conferenceButton': 'Лига Конференций',
    'game.interpolButton': 'Интерпол',
    'game.nextButton': 'Следующий человек',
    'game.imageAlt': 'Таинственный человек',
    
    // Result Card
    'result.correct': 'ПРАВИЛЬНО!',
    'result.wrong': 'НЕПРАВИЛЬНО!',
    'result.wasPlayer': 'Это был игрок Лиги Конференций',
    'result.wasCriminal': 'Это был преступник Интерпола',
    'result.playerInfo': 'Игрок',
    'result.criminalInfo': 'Преступник',
    'result.team': 'Команда',
    'result.crime': 'Преступление',
    'result.country': 'Страна',
    
    // Data prefixes
    'data.criminal': 'Преступник',
    'data.player': 'Футболист',
    'data.crime': 'Преступление',
    'data.of': 'из',
    
    // Streak
    'streak.current': 'Текущая серия',
    'streak.record': 'Рекорд',
    
    // Settings Modal
    'settings.title': 'Настройки',
    'settings.darkMode': 'Темный режим',
    'settings.darkModeDesc': 'Переключение между светлой и темной темой',
    'settings.language': 'Язык',
    'settings.languageDesc': 'Выберите язык приложения',
    'settings.animations': 'Анимации',
    'settings.animationsDesc': 'Включить визуальные анимации',
    
    // Languages
    'lang.es': 'Español',
    'lang.en': 'English',
    'lang.fr': 'Français',
    'lang.de': 'Deutsch',
    'lang.ru': 'Русский',
    
    // Share Modal
    'share.title': 'НЕВЕРОЯТНО!',
    'share.message': 'Вы достигли серии из {streak} идеальных ответов! 🔥',
    'share.shareText': 'Я получил серию из {streak} правильных ответов в Лиге Конференций или Интерполе! ⚽🚨',
    'share.shareButton': 'Поделиться',
    'share.twitterButton': 'Поделиться в X',
    'share.continueButton': 'Продолжить игру',
    'share.copied': 'Текст скопирован в буфер обмена!',
    
    // Completion Modal
    'completion.title': 'ПОЗДРАВЛЯЕМ!',
    'completion.allCompleted': 'ВЫ ЗАВЕРШИЛИ ВСЁ!',
    'completion.message': 'Вы правильно угадали ВСЕХ людей в игре с идеальной серией из {streak} правильных ответов. Вы мастер в различении игроков Лиги Конференций и преступников Интерпола!',
    'completion.shareText': 'Я завершил ВСЕХ людей в Лиге Конференций или Интерполе с {streak} идеальными правильными ответами! 🏆⚽🚨',
    'completion.shareQuestion': 'Сможете ли вы это сделать?',
    'completion.shareButton': 'Поделиться достижением',
    'completion.twitterButton': 'Поделиться в X',
    'completion.restartButton': 'Играть снова',
  },
};

// Obtener idioma inicial del localStorage o del navegador
function getInitialLanguage(): Language {
  if (browser) {
    const saved = localStorage.getItem('language') as Language;
    if (saved && translations[saved]) {
      return saved;
    }
    
    // Intentar detectar del navegador
    const browserLang = navigator.language.split('-')[0];
    if (translations[browserLang]) {
      return browserLang as Language;
    }
  }
  return 'es'; // Por defecto español
}

// Store del idioma actual
export const currentLanguage = writable<Language>(getInitialLanguage());

// Función para cambiar el idioma
export function setLanguage(lang: Language) {
  currentLanguage.set(lang);
  if (browser) {
    localStorage.setItem('language', lang);
  }
}

// Función para obtener traducción (usar con get() o en contextos no reactivos)
function getTranslation(lang: Language, key: string, replacements?: Record<string, string | number>): string {
  let text = translations[lang]?.[key] || translations['es'][key] || key;
  
  // Reemplazar variables {variable} en el texto
  if (replacements) {
    Object.keys(replacements).forEach(key => {
      text = text.replace(`{${key}}`, String(replacements[key]));
    });
  }
  
  return text;
}

// Store derivado para traducciones reactivas
export const t = {
  subscribe: (run: (value: (key: string, replacements?: Record<string, string | number>) => string) => void) => {
    return currentLanguage.subscribe((lang) => {
      run((key: string, replacements?: Record<string, string | number>) => {
        return getTranslation(lang, key, replacements);
      });
    });
  }
};
